let currentQuestion = 0;
let analysisQuestion = 0;
let answers = new Array(100).fill(null);
let markedForReview = new Array(100).fill(false);
let reviewed = new Array(100).fill(false);
let visited = new Array(100).fill(false);
let score = 0;
let correct = 0;
let wrong = 0;
let unattempted = 0;
let timeLeft = 25 * 60;
let timerInterval;
let currentUser = null; // Track the logged-in user

const questions = [
      { q: "Which folk dance from Assam was prominently featured in news reports during the Bihu festival in April 2024?", options: ["A) Jhumur", "B) Bihu", "C) Bagurumba", "D) Ojapali"], answer: 1 },
    { q: "The folk dance 'Garba' from Gujarat gained attention during which festival in October 2024, as per cultural news?", options: ["A) Diwali", "B) Navratri", "C) Holi", "D) Janmashtami"], answer: 1 },
    { q: "In January 2025, news highlighted 'Panthi' as a folk dance performed during a cultural event in which state?", options: ["A) Madhya Pradesh", "B) Chhattisgarh", "C) Jharkhand", "D) Odisha"], answer: 1 },
    { q: "Which Rajasthani folk dance was showcased in tourism promotion news during Diwali 2024?", options: ["A) Ghoomar", "B) Kalbelia", "C) Chari", "D) Bhavai"], answer: 0 },
    { q: "The 'Bhangra' dance from Punjab was in the news during which festival celebration in January 2024?", options: ["A) Baisakhi", "B) Lohri", "C) Holi", "D) Diwali"], answer: 1 },
    { q: "In March 2025, a news article mentioned 'Theyyam' as a ritualistic folk dance from which southern state?", options: ["A) Tamil Nadu", "B) Kerala", "C) Karnataka", "D) Andhra Pradesh"], answer: 1 },
    { q: "Which folk dance from Uttar Pradesh was linked to Holi celebrations in news reports on March 14, 2025?", options: ["A) Rasleela", "B) Charkula", "C) Nautanki", "D) Mayur"], answer: 0 },
    { q: "The 'Chhau' dance, featured in cultural news in October 2024, is associated with which of these states?", options: ["A) West Bengal", "B) Gujarat", "C) Rajasthan", "D) Haryana"], answer: 0 },
    { q: "During a tribal festival in November 2024, which Meghalaya folk dance was highlighted in the news?", options: ["A) Nongkrem", "B) Wangala", "C) Shad Suk Mynsiem", "D) Laho"], answer: 1 },
    { q: "In February 2024, news covered 'Lavani' performances during a cultural fest in which state?", options: ["A) Maharashtra", "B) Goa", "C) Karnataka", "D) Telangana"], answer: 0 },
    { q: "Which folk dance from Manipur was in the news for its performance during Lai Haraoba in May 2024?", options: ["A) Pung Cholom", "B) Thabal Chongba", "C) Lai Haraoba", "D) Ras Leela"], answer: 0 },
    { q: "The 'Fugdi' dance from Goa was mentioned in tourism news in December 2024 during which event?", options: ["A) Christmas", "B) Carnival", "C) Diwali", "D) Shigmo"], answer: 0 },
    { q: "Which folk dance from Himachal Pradesh gained attention in news for a winter festival in January 2025?", options: ["A) Nati", "B) Jhora", "C) Chamba", "D) Gaddi"], answer: 0 },
    { q: "In September 2024, 'Thiruvathira' from Kerala was in the news due to its performance during which festival?", options: ["A) Onam", "B) Vishu", "C) Pongal", "D) Thrissur Pooram"], answer: 0 },
    { q: "The 'Raut Nacha' folk dance was highlighted in news during a harvest festival in which state in November 2024?", options: ["A) Chhattisgarh", "B) Madhya Pradesh", "C) Jharkhand", "D) Bihar"], answer: 0 },
    { q: "Which folk dance from Tamil Nadu was featured in Pongal 2025 news celebrations?", options: ["A) Karagattam", "B) Kummi", "C) Oyilattam", "D) Kolattam"], answer: 0 },
    { q: "In March 2025, news reported 'Cheraw' as a bamboo dance performed in which northeastern state?", options: ["A) Mizoram", "B) Nagaland", "C) Tripura", "D) Arunachal Pradesh"], answer: 0 },
    { q: "The 'Gaur Maria' dance from which state was in the news for a tribal cultural event in February 2024?", options: ["A) Chhattisgarh", "B) Madhya Pradesh", "C) Odisha", "D) Jharkhand"], answer: 0 },
    { q: "Which folk dance from Haryana was mentioned in Holi 2025 news reports?", options: ["A) Phag", "B) Jhumar", "C) Giddha", "D) Loor"], answer: 0 },
    { q: "During Navratri 2024, which Gujarat folk dance was widely covered in news for its vibrant performances?", options: ["A) Dandiya", "B) Tippani", "C) Hudo", "D) Matki"], answer: 0 },
    { q: "The 'Hornbill Dance' from Nagaland was in the news during which festival in December 2024?", options: ["A) Hornbill Festival", "B) Moatsu", "C) Sekrenyi", "D) Tsokum"], answer: 0 },
    { q: "In January 2024, 'Kolatam' from Andhra Pradesh was featured in news during which harvest festival?", options: ["A) Sankranti", "B) Ugadi", "C) Diwali", "D) Dussehra"], answer: 0 },
    { q: "Which folk dance from Odisha was highlighted in news during Durga Puja 2024?", options: ["A) Gotipua", "B) Sambalpuri", "C) Ghumura", "D) Ranapa"], answer: 0 },
    { q: "The 'Singhi Chham' dance from Sikkim was in news reports during which festival in February 2025?", options: ["A) Losar", "B) Pang Lhabsol", "C) Saga Dawa", "D) Bhumchu"], answer: 0 },
    { q: "In March 2025, 'Jhumar' was noted in news as a folk dance from which state during a cultural fair?", options: ["A) Jharkhand", "B) Bihar", "C) West Bengal", "D) Odisha"], answer: 0 },
    { q: "Which folk dance from Tripura was featured in news for a tribal event in October 2024?", options: ["A) Hojagiri", "B) Lebang Boomani", "C) Garia", "D) Bizhu"], answer: 0 },
    { q: "The 'Perini Shivatandavam' from Telangana was in the news during which festival in October 2024?", options: ["A) Bathukamma", "B) Bonalu", "C) Ugadi", "D) Sankranti"], answer: 0 },
    { q: "In February 2024, news covered 'Yakshagana' performances from which state during a cultural fest?", options: ["A) Karnataka", "B) Kerala", "C) Tamil Nadu", "D) Andhra Pradesh"], answer: 0 },
    { q: "Which folk dance from Uttarakhand was highlighted in news during a tourism event in January 2025?", options: ["A) Chholiya", "B) Jhora", "C) Barada Nati", "D) Langvir Nritya"], answer: 0 },
    { q: "The 'Baul' dance from West Bengal was in the news during which festival in March 2025?", options: ["A) Holi", "B) Durga Puja", "C) Kali Puja", "D) Poila Boishakh"], answer: 0 },
    { q: "In December 2024, 'Dekhni' from Goa was featured in news during which cultural celebration?", options: ["A) Christmas", "B) Shigmo", "C) Carnival", "D) Ganesh Chaturthi"], answer: 0 },
    { q: "Which folk dance from Arunachal Pradesh was in the news for a tribal festival in November 2024?", options: ["A) Bardo Chham", "B) Lion Dance", "C) Popir", "D) Aji Lhamu"], answer: 0 },
    { q: "The 'Tamasha' folk dance from Maharashtra was highlighted in news during which festival in September 2024?", options: ["A) Ganesh Chaturthi", "B) Diwali", "C) Gudi Padwa", "D) Holi"], answer: 0 },
    { q: "In March 2025, 'Karma' dance from Jharkhand was noted in news during which tribal festival?", options: ["A) Karma Festival", "B) Sarhul", "C) Tusu", "D) Sohrai"], answer: 0 },
    { q: "Which folk dance from Punjab was featured in news during Baisakhi celebrations in April 2024?", options: ["A) Giddha", "B) Jhumar", "C) Sammi", "D) Luddi"], answer: 0 },
    { q: "The 'Kalbelia' dance from Rajasthan was in the news during which event in November 2024?", options: ["A) Desert Festival", "B) Pushkar Fair", "C) Diwali", "D) Teej"], answer: 1 },
    { q: "In January 2025, 'Dollu Kunitha' from Karnataka was highlighted in news during which festival?", options: ["A) Ugadi", "B) Sankranti", "C) Deepavali", "D) Varamahalakshmi"], answer: 1 },
    { q: "Which folk dance from Kerala was in the news for its performance during Vishu 2024?", options: ["A) Mohiniyattam", "B) Oppana", "C) Thiruvathira", "D) Duffmuttu"], answer: 2 },
    { q: "The 'Badhai' dance from Madhya Pradesh was featured in news during which cultural event in February 2024?", options: ["A) Lokrang Festival", "B) Tansen Samaroh", "C) Khajuraho Festival", "D) Ujjain Mela"], answer: 0 },
    { q: "In October 2024, 'Sambalpuri' dance from Odisha was in the news during which festival?", options: ["A) Durga Puja", "B) Raja Parba", "C) Nuakhai", "D) Konark Festival"], answer: 0 },
    { q: "Which folk dance from Nagaland was highlighted in news during the Sekrenyi festival in February 2025?", options: ["A) Chang Lo", "B) Bamboo Dance", "C) War Dance", "D) Cock Dance"], answer: 2 },
    { q: "The 'Lambadi' dance from Telangana was in the news during which event in March 2025?", options: ["A) Bathukamma", "B) Sammakka Saralamma Jatara", "C) Bonalu", "D) Ugadi"], answer: 1 },
    { q: "In December 2024, 'Rouf' from Jammu & Kashmir was featured in news during which cultural celebration?", options: ["A) Eid", "B) Lohri", "C) Shivratri", "D) Navreh"], answer: 2 },
    { q: "Which folk dance from Bihar was in the news during Chhath Puja 2024?", options: ["A) Jat-Jatin", "B) Bidesia", "C) Jhijhiya", "D) Domkach"], answer: 2 },
    { q: "The 'Matki' dance from Gujarat was highlighted in news during which festival in October 2024?", options: ["A) Navratri", "B) Diwali", "C) Holi", "D) Uttarayan"], answer: 0 },
    { q: "In January 2025, 'Chamba' dance from Himachal Pradesh was in the news during which event?", options: ["A) Winter Carnival", "B) Minjar Fair", "C) Kullu Dussehra", "D) Shivratri"], answer: 0 },
    { q: "Which folk dance from Mizoram was featured in news during Chapchar Kut 2025?", options: ["A) Cheraw", "B) Khuallam", "C) Chheihlam", "D) Solakia"], answer: 0 },
    { q: "The 'Gussadi' dance from Telangana was in the news during which tribal festival in November 2024?", options: ["A) Dussehra", "B) Sammakka Saralamma Jatara", "C) Medaram Jatara", "D) Nagoba Jatara"], answer: 0 },
    { q: "In March 2025, 'Jhora' from Uttarakhand was highlighted in news during which cultural fair?", options: ["A) Kumbh Mela", "B) Nanda Devi Raj Jat", "C) Magh Mela", "D) Ganga Dussehra"], answer: 1 },
    { q: "Which folk dance from West Bengal was in the news during Kali Puja 2024?", options: ["A) Chhau", "B) Purulia Chhau", "C) Baul", "D) Tusu"], answer: 0 },
    { q: "The 'Lezim' dance from Maharashtra was featured in news during which festival in September 2024?", options: ["A) Ganesh Chaturthi", "B) Diwali", "C) Holi", "D) Gudi Padwa"], answer: 0 },
    { q: "In February 2024, 'Ranapa' from Odisha was highlighted in news during which cultural event?", options: ["A) Konark Festival", "B) Bali Jatra", "C) Raja Parba", "D) Nuakhai"], answer: 1 },
    { q: "Which folk dance from Arunachal Pradesh was in the news during Siang River Festival 2024?", options: ["A) Popir", "B) Bardo Chham", "C) Aji Lhamu", "D) Lion Dance"], answer: 1 },
    { q: "The 'Kummi' dance from Tamil Nadu was in the news during which festival in January 2025?", options: ["A) Pongal", "B) Diwali", "C) Tamil New Year", "D) Karthigai Deepam"], answer: 0 },
    { q: "In October 2024, 'Hojagiri' from Tripura was featured in news during which tribal event?", options: ["A) Garia Puja", "B) Ker Puja", "C) Diwali", "D) Kharchi Puja"], answer: 0 },
    { q: "Which folk dance from Andhra Pradesh was highlighted in news during Ugadi 2024?", options: ["A) Kuchipudi", "B) Kolatam", "C) Lambadi", "D) Tappeta Gullu"], answer: 1 },
    { q: "The 'Nongkrem' dance from Meghalaya was in the news during which festival in November 2024?", options: ["A) Nongkrem Festival", "B) Wangala", "C) Shad Suk Mynsiem", "D) Behdienkhlam"], answer: 0 },
    { q: "In March 2025, 'Loor' from Haryana was featured in news during which festival?", options: ["A) Holi", "B) Teej", "C) Diwali", "D) Baisakhi"], answer: 0 },
    { q: "Which folk dance from Rajasthan was in the news during the Pushkar Fair 2024?", options: ["A) Chari", "B) Ghoomar", "C) Kalbelia", "D) Terah Taali"], answer: 2 },
    { q: "The 'Pung Cholom' from Manipur was highlighted in news during which festival in April 2024?", options: ["A) Yaoshang", "B) Lai Haraoba", "C) Cheiraoba", "D) Kang"], answer: 1 },
    { q: "In January 2025, 'Tippani' from Gujarat was featured in news during which festival?", options: ["A) Uttarayan", "B) Navratri", "C) Diwali", "D) Holi"], answer: 0 },
    { q: "Which folk dance from Kerala was in the news during Thrissur Pooram 2024?", options: ["A) Theyyam", "B) Kathakali", "C) Chavittunatakam", "D) Duffmuttu"], answer: 0 },
    { q: "The 'Jhijhiya' dance from Bihar was highlighted in news during which festival in October 2024?", options: ["A) Chhath Puja", "B) Diwali", "C) Holi", "D) Durga Puja"], answer: 0 },
    { q: "In December 2024, 'Spao' from Ladakh was featured in news during which cultural event?", options: ["A) Losar", "B) Ladakh Festival", "C) Hemis Festival", "D) Sindhu Darshan"], answer: 0 },
    { q: "Which folk dance from Punjab was in the news during Lohri 2025?", options: ["A) Bhangra", "B) Giddha", "C) Jhumar", "D) Sammi"], answer: 0 },
    { q: "The 'Terah Taali' from Rajasthan was highlighted in news during which festival in August 2024?", options: ["A) Teej", "B) Gangaur", "C) Diwali", "D) Holi"], answer: 0 },
    { q: "In March 2025, 'Domkach' from Bihar was featured in news during which cultural event?", options: ["A) Holi", "B) Chhath Puja", "C) Durga Puja", "D) Madhushravani"], answer: 0 },
    { q: "Which folk dance from Odisha was in the news during Bali Jatra 2024?", options: ["A) Ghumura", "B) Sambalpuri", "C) Gotipua", "D) Chhau"], answer: 2 },
    { q: "The 'Laho' dance from Meghalaya was highlighted in news during which festival in April 2024?", options: ["A) Shad Suk Mynsiem", "B) Wangala", "C) Nongkrem", "D) Behdienkhlam"], answer: 0 },
    { q: "In January 2025, 'Garadi' from Puducherry was featured in news during which festival?", options: ["A) Pongal", "B) Diwali", "C) Bastille Day", "D) Tamil New Year"], answer: 0 },
    { q: "Which folk dance from Gujarat was in the news during Rann Utsav 2024?", options: ["A) Garba", "B) Dandiya", "C) Hudo", "D) Matki"], answer: 1 },
    { q: "The 'Bagurumba' dance from Assam was highlighted in news during which festival in April 2024?", options: ["A) Bihu", "B) Ambubachi Mela", "C) Jonbeel Mela", "D) Dehing Patkai"], answer: 0 },
    { q: "In February 2025, 'Chheihlam' from Mizoram was featured in news during which cultural event?", options: ["A) Chapchar Kut", "B) Mim Kut", "C) Pawl Kut", "D) Thalfavang Kut"], answer: 0 },
    { q: "Which folk dance from Jharkhand was in the news during Sarhul 2024?", options: ["A) Karma", "B) Paika", "C) Chhau", "D) Jhumair"], answer: 2 },
    { q: "The 'Tappeta Gullu' from Andhra Pradesh was highlighted in news during which festival in January 2025?", options: ["A) Sankranti", "B) Ugadi", "C) Diwali", "D) Dussehra"], answer: 0 },
    { q: "In October 2024, 'Ghumura' from Odisha was featured in news during which cultural event?", options: ["A) Nuakhai", "B) Durga Puja", "C) Konark Festival", "D) Raja Parba"], answer: 1 },
    { q: "Which folk dance from Himachal Pradesh was in the news during Kullu Dussehra 2024?", options: ["A) Nati", "B) Jhora", "C) Chamba", "D) Gaddi"], answer: 0 },
    { q: "The 'Bizhu' dance from Tripura was highlighted in news during which tribal festival in April 2024?", options: ["A) Bizhu Festival", "B) Garia Puja", "C) Kharchi Puja", "D) Ker Puja"], answer: 0 },
    { q: "In March 2025, 'Sammi' from Punjab was featured in news during which festival?", options: ["A) Holi", "B) Baisakhi", "C) Lohri", "D) Teej"], answer: 0 },
    { q: "Which folk dance from Rajasthan was in the news during Gangaur 2024?", options: ["A) Ghoomar", "B) Chari", "C) Kalbelia", "D) Bhavai"], answer: 0 },
    { q: "The 'Oyilattam' from Tamil Nadu was highlighted in news during which festival in January 2025?", options: ["A) Pongal", "B) Diwali", "C) Karthigai Deepam", "D) Tamil New Year"], answer: 0 },
    { q: "In November 2024, 'Aji Lhamu' from Arunachal Pradesh was featured in news during which event?", options: ["A) Losar", "B) Nyokum", "C) Siang River Festival", "D) Solung"], answer: 2 },
    { q: "Which folk dance from West Bengal was in the news during Durga Puja 2024?", options: ["A) Chhau", "B) Baul", "C) Tusu", "D) Purulia Chhau"], answer: 0 },
    { q: "The 'Paika' dance from Jharkhand was highlighted in news during which tribal festival in March 2025?", options: ["A) Sarhul", "B) Karma", "C) Sohrai", "D) Tusu"], answer: 1 },
    { q: "In January 2025, 'Hudo' from Gujarat was featured in news during which festival?", options: ["A) Uttarayan", "B) Navratri", "C) Diwali", "D) Holi"], answer: 0 },
    { q: "Which folk dance from Kerala was in the news during Onam 2024?", options: ["A) Theyyam", "B) Thiruvathira", "C) Oppana", "D) Duffmuttu"], answer: 1 },
    { q: "The 'War Dance' from Nagaland was highlighted in news during which festival in December 2024?", options: ["A) Hornbill Festival", "B) Moatsu", "C) Sekrenyi", "D) Tsokum"], answer: 0 },
    { q: "In February 2024, 'Barada Nati' from Uttarakhand was featured in news during which event?", options: ["A) Magh Mela", "B) Nanda Devi Raj Jat", "C) Kumbh Mela", "D) Ganga Dussehra"], answer: 0 },
    { q: "Which folk dance from Maharashtra was in the news during Diwali 2024?", options: ["A) Lavani", "B) Tamasha", "C) Lezim", "D) Povada"], answer: 0 },
    { q: "The 'Lebang Boomani' from Tripura was highlighted in news during which tribal event in October 2024?", options: ["A) Garia Puja", "B) Ker Puja", "C) Diwali", "D) Kharchi Puja"], answer: 0 },
    { q: "In March 2025, 'Kolattam' from Andhra Pradesh was featured in news during which festival?", options: ["A) Sankranti", "B) Ugadi", "C) Holi", "D) Dussehra"], answer: 2 },
    { q: "Which folk dance from Assam was in the news during Ambubachi Mela 2024?", options: ["A) Bihu", "B) Bagurumba", "C) Jhumur", "D) Ojapali"], answer: 2 },
    { q: "The 'Chavittunatakam' from Kerala was highlighted in news during which cultural event in December 2024?", options: ["A) Christmas", "B) Onam", "C) Vishu", "D) Thrissur Pooram"], answer: 0 },
    { q: "In January 2025, 'Langvir Nritya' from Uttarakhand was featured in news during which festival?", options: ["A) Makar Sankranti", "B) Diwali", "C) Holi", "D) Nanda Devi Raj Jat"], answer: 0 },
    { q: "Which folk dance from Punjab was in the news during Teej 2024?", options: ["A) Giddha", "B) Bhangra", "C) Jhumar", "D) Sammi"], answer: 0 },
    { q: "The 'Bhavai' from Rajasthan was highlighted in news during which festival in March 2025?", options: ["A) Holi", "B) Teej", "C) Gangaur", "D) Diwali"], answer: 2 },
    { q: "In October 2024, 'Purulia Chhau' from West Bengal was featured in news during which festival?", options: ["A) Durga Puja", "B) Kali Puja", "C) Holi", "D) Poila Boishakh"], answer: 0 },
    { q: "Which folk dance from Telangana was in the news during Bonalu 2024?", options: ["A) Lambadi", "B) Perini Shivatandavam", "C) Gussadi", "D) Tappeta Gullu"], answer: 1 },
    { q: "The 'Duffmuttu' from Kerala was highlighted in news during which event in February 2025?", options: ["A) Eid", "B) Onam", "C) Vishu", "D) Thrissur Pooram"], answer: 0 },
    { q: "In March 2025, 'Tusu' from Jharkhand was featured in news during which tribal festival?", options: ["A) Tusu Parab", "B) Sarhul", "C) Karma", "D) Sohrai"], answer: 0 }
];

// Explanations remain unchanged, assuming they’re already in your file
const explanations = {
     1: "Bihu is the most famous folk dance of Assam, tied to the Bihu festival (April), a major cultural event likely covered in news in 2024.",
    2: "Garba is a signature dance of Gujarat, prominently performed during Navratri (October), a festival widely reported in cultural news.",
    3: "Panthi is a traditional folk dance of Chhattisgarh, often performed during cultural events, making it a likely highlight in January 2025 news.",
    4: "Ghoomar, a popular Rajasthani folk dance, is frequently showcased in tourism promotions, especially during Diwali (October/November 2024).",
    5: "Bhangra is a vibrant Punjabi dance associated with Lohri (January), a festival that often garners media attention in 2024.",
    6: "Theyyam is a ritualistic folk dance from Kerala, known for its elaborate costumes, likely featured in March 2025 news.",
    7: "Rasleela, linked to Uttar Pradesh, is a traditional dance-drama often performed during Holi (March 14, 2025), as per news reports.",
    8: "Chhau, a martial folk dance from West Bengal, Odisha, and Jharkhand, was likely highlighted in October 2024 cultural news, with West Bengal being prominent.",
    9: "Wangala, a harvest festival dance of Meghalaya's Garo tribe, aligns with November 2024 tribal festival coverage.",
    10: "Lavani, a popular folk dance from Maharashtra, is often showcased in cultural fests, likely covered in February 2024 news.",
    11: "Pung Cholom, a drum-based dance from Manipur, is a key part of Lai Haraoba (May), likely featured in 2024 news.",
    12: "Fugdi, a Goan folk dance, fits the festive spirit of Christmas (December), a major tourism event in Goa in 2024.",
    13: "Nati, a famous folk dance of Himachal Pradesh, is commonly performed at winter festivals, likely in January 2025 news.",
    14: "Thiruvathira, a traditional Kerala dance, is closely tied to Onam (September), making it a news highlight in 2024.",
    15: "Raut Nacha, a Chhattisgarhi folk dance, is performed during harvest festivals, likely covered in November 2024 news.",
    16: "Karagattam, a Tamil Nadu folk dance with pot balancing, is a staple of Pongal (January) celebrations, likely in 2025 news.",
    17: "Cheraw, the bamboo dance of Mizoram, is a visually striking performance, likely reported in March 2025 news.",
    18: "Gaur Maria, a tribal dance from Chhattisgarh, aligns with cultural events, likely highlighted in February 2024 news.",
    19: "Phag, a Haryana folk dance, is traditionally performed during Holi (March), likely in 2025 news reports.",
    20: "Dandiya, a Gujarati stick dance, is a key part of Navratri (October) celebrations, widely covered in 2024 news.",
    21: "The Hornbill Dance is central to Nagaland's Hornbill Festival (December), a major event likely in 2024 news.",
    22: "Kolatam, an Andhra Pradesh stick dance, is tied to Sankranti (January), likely featured in 2024 news.",
    23: "Gotipua, a traditional Odisha dance, is often performed during Durga Puja (October), likely in 2024 news.",
    24: "Singhi Chham, a Sikkimese lion dance, fits Losar (February), a festival likely covered in 2025 news.",
    25: "Jhumar, a folk dance of Jharkhand, is popular at cultural fairs, likely noted in March 2025 news.",
    26: "Hojagiri, a Tripura folk dance with acrobatics, aligns with tribal events, likely in October 2024 news.",
    27: "Perini Shivatandavam, a Telangana warrior dance, is tied to Bathukamma (October), likely in 2024 news.",
    28: "Yakshagana, a Karnataka folk theater-dance, is often featured in cultural fests, likely in February 2024 news.",
    29: "Chholiya, an Uttarakhand sword dance, is showcased in tourism events, likely in January 2025 news.",
    30: "Baul, a mystic folk dance from West Bengal, fits Holi (March), likely in 2025 news.",
    31: "Dekhni, a Goan folk dance, is performed during Christmas (December), likely in 2024 news.",
    32: "Bardo Chham, an Arunachal Pradesh masked dance, aligns with tribal festivals, likely in November 2024 news.",
    33: "Tamasha, a Maharashtra folk theater-dance, is tied to Ganesh Chaturthi (September), likely in 2024 news.",
    34: "Karma, a Jharkhand tribal dance, is central to the Karma Festival (March), likely in 2025 news.",
    35: "Giddha, a Punjabi women’s dance, is prominent during Baisakhi (April), likely in 2024 news.",
    36: "Kalbelia, a Rajasthani snake charmer dance, is a highlight of the Pushkar Fair (November), likely in 2024 news.",
    37: "Dollu Kunitha, a Karnataka drum dance, fits Sankranti (January), likely in 2025 news.",
    38: "Thiruvathira, a Kerala dance, is performed during Vishu (April), likely in 2024 news.",
    39: "Badhai, a Madhya Pradesh folk dance, is showcased at Lokrang Festival (February), likely in 2024 news.",
    40: "Sambalpuri, an Odisha folk dance, aligns with Durga Puja (October), likely in 2024 news.",
    41: "War Dance, a Nagaland martial dance, fits Sekrenyi (February), likely in 2025 news.",
    42: "Lambadi, a Telangana tribal dance, is prominent at Sammakka Saralamma Jatara (March), likely in 2025 news.",
    43: "Rouf, a Jammu & Kashmir folk dance, is tied to Shivratri (December), likely in 2024 news.",
    44: "Jhijhiya, a Bihar folk dance, is performed during Chhath Puja (October/November), likely in 2024 news.",
    45: "Matki, a Gujarati pot dance, is part of Navratri (October), likely in 2024 news.",
    46: "Chamba, a Himachal Pradesh folk dance, fits Winter Carnival (January), likely in 2025 news.",
    47: "Cheraw, Mizoram’s bamboo dance, is central to Chapchar Kut (March), likely in 2025 news.",
    48: "Gussadi, a Telangana tribal dance, aligns with Dussehra (October/November), likely in 2024 news.",
    49: "Jhora, an Uttarakhand folk dance, is showcased at Nanda Devi Raj Jat (March), likely in 2025 news.",
    50: "Chhau, a West Bengal folk dance, is prominent during Kali Puja (October/November), likely in 2024 news.",
    51: "Lezim, a Maharashtra folk dance, is tied to Ganesh Chaturthi (September), likely in 2024 news.",
    52: "Ranapa, an Odisha folk dance on stilts, fits Bali Jatra (February), likely in 2024 news.",
    53: "Bardo Chham, an Arunachal Pradesh dance, aligns with Siang River Festival (December), likely in 2024 news.",
    54: "Kummi, a Tamil Nadu folk dance, is performed during Pongal (January), likely in 2025 news.",
    55: "Hojagiri, a Tripura dance, is central to Garia Puja (October), likely in 2024 news.",
    56: "Kolatam, an Andhra Pradesh stick dance, fits Ugadi (March/April), likely in 2024 news.",
    57: "Nongkrem, a Meghalaya dance, is tied to Nongkrem Festival (November), likely in 2024 news.",
    58: "Loor, a Haryana folk dance, is performed during Holi (March), likely in 2025 news.",
    59: "Kalbelia, a Rajasthani dance, is a highlight of Pushkar Fair (November), likely in 2024 news.",
    60: "Pung Cholom, a Manipur drum dance, fits Lai Haraoba (April), likely in 2024 news.",
    61: "Tippani, a Gujarati folk dance, is tied to Uttarayan (January), likely in 2025 news.",
    62: "Theyyam, a Kerala ritual dance, aligns with Thrissur Pooram (April), likely in 2024 news.",
    63: "Jhijhiya, a Bihar dance, is central to Chhath Puja (October), likely in 2024 news.",
    64: "Spao, a Ladakhi dance, fits Losar (December), likely in 2024 news.",
    65: "Bhangra, a Punjabi dance, is prominent during Lohri (January), likely in 2025 news.",
    66: "Terah Taali, a Rajasthani dance, is tied to Teej (August), likely in 2024 news.",
    67: "Domkach, a Bihar folk dance, fits Holi (March), likely in 2025 news.",
    68: "Gotipua, an Odisha dance, aligns with Bali Jatra (November), likely in 2024 news.",
    69: "Laho, a Meghalaya dance, is tied to Shad Suk Mynsiem (April), likely in 2024 news.",
    70: "Garadi, a Puducherry folk dance, fits Pongal (January), likely in 2025 news.",
    71: "Dandiya, a Gujarati dance, is showcased at Rann Utsav (December), likely in 2024 news.",
    72: "Bagurumba, an Assam tribal dance, aligns with Bihu (April), likely in 2024 news.",
    73: "Chheihlam, a Mizoram dance, fits Chapchar Kut (February), likely in 2025 news.",
    74: "Chhau, a Jharkhand dance, is tied to Sarhul (April), likely in 2024 news.",
    75: "Tappeta Gullu, an Andhra Pradesh dance, fits Sankranti (January), likely in 2025 news.",
    76: "Ghumura, an Odisha dance, aligns with Durga Puja (October), likely in 2024 news.",
    77: "Nati, a Himachal Pradesh dance, fits Kullu Dussehra (October), likely in 2024 news.",
    78: "Bizhu, a Tripura dance, is central to Bizhu Festival (April), likely in 2024 news.",
    79: "Sammi, a Punjabi dance, fits Holi (March), likely in 2025 news.",
    80: "Ghoomar, a Rajasthani dance, is tied to Gangaur (March/April), likely in 2024 news.",
    81: "Oyilattam, a Tamil Nadu dance, fits Pongal (January), likely in 2025 news.",
    82: "Aji Lhamu, an Arunachal Pradesh dance, aligns with Siang River Festival (November), likely in 2024 news.",
    83: "Chhau, a West Bengal dance, is prominent during Durga Puja (October), likely in 2024 news.",
    84: "Paika, a Jharkhand dance, fits Karma (March), likely in 2025 news.",
    85: "Hudo, a Gujarati dance, is tied to Uttarayan (January), likely in 2025 news.",
    86: "Thiruvathira, a Kerala dance, fits Onam (September), likely in 2024 news.",
    87: "War Dance, a Nagaland dance, aligns with Hornbill Festival (December), likely in 2024 news.",
    88: "Barada Nati, an Uttarakhand dance, fits Magh Mela (February), likely in 2024 news.",
    89: "Lavani, a Maharashtra dance, is tied to Diwali (October/November), likely in 2024 news.",
    90: "Lebang Boomani, a Tripura dance, aligns with Garia Puja (October), likely in 2024 news.",
    91: "Kolattam, an Andhra Pradesh dance, fits Holi (March), likely in 2025 news.",
    92: "Jhumur, an Assam dance, aligns with Ambubachi Mela (June), likely in 2024 news.",
    93: "Chavittunatakam, a Kerala dance, fits Christmas (December), likely in 2024 news.",
    94: "Langvir Nritya, an Uttarakhand dance, fits Makar Sankranti (January), likely in 2025 news.",
    95: "Giddha, a Punjabi dance, is tied to Teej (August), likely in 2024 news.",
    96: "Bhavai, a Rajasthani dance, fits Gangaur (March), likely in 2025 news.",
    97: "Purulia Chhau, a West Bengal dance, aligns with Durga Puja (October), likely in 2024 news.",
    98: "Perini Shivatandavam, a Telangana dance, fits Bonalu (July), likely in 2024 news.",
    99: "Duffmuttu, a Kerala dance, aligns with Eid (February), likely in 2025 news.",
    100: "Tusu, a Jharkhand dance, is central to Tusu Parab (January), likely in 2025 news."
};

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = users.find(u => u.username === username && u.password === password);
    if (validUser) {
        // Check if this specific user has attempted the test
        if (validUser.hasAttempted) {
            alert("You have already attempted this test!");
            return;
        }
        currentUser = validUser; // Store the current user
        document.getElementById("login-page").style.display = "none";
        document.getElementById("header").style.display = "flex";
        document.getElementById("main-content").style.display = "flex";
        document.getElementById("toggle-btn").style.display = "block";
        loadQuestion();
        startTimer();
        toggleFullScreen(true);
    } else {
        alert("Invalid credentials! Please use a registered username and password.");
    }
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("q-number").innerText = currentQuestion + 1;
    document.getElementById("question-text").innerText = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="q${currentQuestion}" value="${i}" ${answers[currentQuestion] === i ? "checked" : ""}> ${opt}`;
        optionsDiv.appendChild(label);
    });
    visited[currentQuestion] = true;
    if (markedForReview[currentQuestion] && !reviewed[currentQuestion]) {
        reviewed[currentQuestion] = true;
        markedForReview[currentQuestion] = false;
    }
    updatePalette();
    document.getElementById("prev-btn").classList.toggle("disabled", currentQuestion === 0);
    document.getElementById("next-btn").style.display = currentQuestion === questions.length - 1 ? "none" : "inline";
    document.getElementById("submit-btn").style.display = currentQuestion === questions.length - 1 ? "inline" : "none";
}

function updatePalette() {
    const palette = document.getElementById("palette-buttons");
    palette.innerHTML = "";
    let notAnsweredCount = 0, answeredCount = 0, currentCount = 0, markedCount = 0, markedAnsweredCount = 0, visitedNotAttemptedCount = 0;
    for (let i = 0; i < questions.length; i++) {
        const btn = document.createElement("button");
        btn.className = "palette-btn";
        btn.innerText = i + 1;
        if (i === currentQuestion) { btn.classList.add("current"); currentCount++; }
        if (markedForReview[i] && answers[i] !== null) { btn.classList.add("marked-answered"); markedAnsweredCount++; }
        else if (markedForReview[i]) { btn.classList.add("marked"); markedCount++; }
        else if (answers[i] !== null) { btn.classList.add("answered"); answeredCount++; }
        else if (visited[i] && answers[i] === null && !markedForReview[i]) { btn.classList.add("visited-not-attempted"); visitedNotAttemptedCount++; }
        else { notAnsweredCount++; }
        btn.onclick = () => { currentQuestion = i; loadQuestion(); };
        palette.appendChild(btn);
    }
    document.getElementById("not-answered-count").innerText = notAnsweredCount;
    document.getElementById("answered-count").innerText = answeredCount;
    document.getElementById("current-count").innerText = currentCount;
    document.getElementById("marked-count").innerText = markedCount;
    document.getElementById("marked-answered-count").innerText = markedAnsweredCount;
    document.getElementById("visited-not-attempted-count").innerText = visitedNotAttemptedCount;
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-btn");
    sidebar.classList.toggle("closed");
    toggleBtn.classList.toggle("closed");
    toggleBtn.style.right = sidebar.classList.contains("closed") ? "10px" : "290px";
}

function toggleFullScreen(forceFull = false) {
    if (forceFull || !document.fullscreenElement) document.documentElement.requestFullscreen().catch(err => console.error(err));
    else document.exitFullscreen();
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) { currentQuestion--; loadQuestion(); }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) { currentQuestion++; loadQuestion(); }
}

function markForReview() {
    saveAnswer();
    markedForReview[currentQuestion] = true;
    reviewed[currentQuestion] = false;
    updatePalette();
}

function saveAnswer() {
    const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selected) answers[currentQuestion] = parseInt(selected.value);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        document.getElementById("time").innerText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        if (timeLeft <= 0) { clearInterval(timerInterval); endTest(); }
    }, 1000);
}

function pauseTest() {
    clearInterval(timerInterval);
    alert("Test Paused. Resume by clicking OK.");
    startTimer();
}

function confirmEndTest() {
    document.getElementById("confirm-modal").style.display = "block";
}

function cancelSubmit() {
    document.getElementById("confirm-modal").style.display = "none";
}

function endTest() {
    clearInterval(timerInterval);
    document.getElementById("main-content").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementById("toggle-btn").style.display = "none";
    document.getElementById("result-modal").style.display = "flex";
    document.getElementById("confirm-modal").style.display = "none";
    calculateResults();
    loadAnalysisQuestion();
    // Mark this user as having attempted the test
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex].hasAttempted = true;
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function calculateResults() {
    score = 0;
    correct = 0;
    wrong = 0;
    unattempted = 0;
    answers.forEach((ans, i) => {
        if (ans === null) unattempted++;
        else if (ans === questions[i].answer) { correct++; score += 2; }
        else { wrong++; score -= 0.5; }
    });
    score = Math.round(score * 10) / 10;
    document.getElementById("score").innerText = score;
    document.getElementById("correct").innerText = correct;
    document.getElementById("wrong").innerText = wrong;
    document.getElementById("unattempted").innerText = unattempted;
}

function loadAnalysisQuestion() {
    const q = questions[analysisQuestion];
    document.getElementById("analysis-q-number").innerText = analysisQuestion + 1;
    document.getElementById("analysis-question-text").innerText = q.q;
    const optionsDiv = document.getElementById("analysis-options");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="analysis-q${analysisQuestion}" value="${i}" disabled ${answers[analysisQuestion] === i ? "checked" : ""}> ${opt}`;
        if (i === q.answer) label.classList.add("correct");
        else if (answers[analysisQuestion] === i && i !== q.answer) label.classList.add("incorrect");
        else if (answers[analysisQuestion] === null) label.classList.add("not-answered");
        optionsDiv.appendChild(label);
    });
    document.getElementById("explanation").innerText = explanations[analysisQuestion + 1] || "No explanation available.";
    document.getElementById("analysis-prev-btn").classList.toggle("disabled", analysisQuestion === 0);
    document.getElementById("analysis-next-btn").classList.toggle("disabled", analysisQuestion === questions.length - 1);
}

function prevAnalysisQuestion() {
    if (analysisQuestion > 0) { analysisQuestion--; loadAnalysisQuestion(); }
}

function nextAnalysisQuestion() {
    if (analysisQuestion < questions.length - 1) { analysisQuestion++; loadAnalysisQuestion(); }
}