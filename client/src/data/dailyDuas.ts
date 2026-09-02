// Daily inspiring, soulful & peaceful du'as / quotes (Urdu, Hindi, English transliteration & translation)
export interface DailyDuaQuote {
  id: string;
  theme: string;
  arabic?: string;
  urdu: string;
  hindi: string;
  english: string;
  blessing: string;
}

export const dailyQuotesAndDuas: DailyDuaQuote[] = [
  {
    id: "quote-1",
    theme: "Sukoon & Barkat (Peace & Blessings)",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    urdu: "اے میرے رب! میرے سینے کو کھول دے اور میرے کام کو آسان فرما۔",
    hindi: "हे मेरे रब! मेरे सीने को खोल दे और मेरे हर काम को आसान बना दे।",
    english: "O my Lord! Open up for me my heart and ease for me my task.",
    blessing: "✨ دعا: اللہ آپ کے دل کو سکون، چہرے پر مسکراہٹ اور ہر معاملے میں برکت عطا فرمائے۔ آمین!"
  },
  {
    id: "quote-2",
    theme: "Rizq & Khair (Abundance & Goodness)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    urdu: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتا ہوں۔",
    hindi: "हे ईश्वर! मुझे लाभदायक ज्ञान, पवित्र आजीविका और स्वीकार्य कर्म प्रदान करें।",
    english: "O God, I ask You for beneficial knowledge, good provision, and acceptable deeds.",
    blessing: "🤲 دعا: اللہ پاک آپ کے رزق، صحت، اور زندگی میں بے حساب برکت اور خیر عطا فرمائے۔"
  },
  {
    id: "quote-3",
    theme: "Mushkilat Ka Hal (Ease in Hardship)",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    urdu: "اللہ ہمارے لیے کافی ہے اور وہ بہترین کارساز ہے۔",
    hindi: "ईश्वर हमारे लिए पर्याप्त है और वह सबसे उत्तम कार्यसाधक है।",
    english: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    blessing: "🌟 دعا: آج کا دن آپ کے لیے خوشیوں، آسانیوں اور ہر غم سے نجات کا سبب بنے۔"
  },
  {
    id: "quote-4",
    theme: "Shukar & Rehmat (Gratitude & Mercy)",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    urdu: "اے میرے رب! مجھے توفیق دے کہ میں تیری اس نعمت کا شکر ادا کروں جو تو نے مجھ پر کی۔",
    hindi: "हे प्रभु! मुझे शक्ति दे कि मैं तेरी उन नेमतों का शुक्रगुज़ार रहूँ जो तूने मुझे बख्शी हैं।",
    english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
    blessing: "🌸 دعا: خدا آپ کو اور آپ کے تمام پیاروں کو ہمیشہ ہنستا مسکراتا اور سلامت رکھے۔"
  },
  {
    id: "quote-5",
    theme: "Hidayat & Noor (Light & Guidance)",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا",
    urdu: "اے اللہ! میرے دل میں نور پیدا فرما اور میری نگاہوں میں روشنی عطا فرما۔",
    hindi: "हे ईश्वर! मेरे दिल में नूर भर दे और मेरी आँखों में रोशनी प्रदान कर।",
    english: "O Allah, place light in my heart, and light in my sight.",
    blessing: "💫 دعا: آپ کی سوچ میں نکھار، گفتگو میں مٹھاس اور زندگی کے ہر فیصلے میں کامیابی ہو۔"
  },
  {
    id: "quote-6",
    theme: "Afiyat & Salamati (Health & Well-being)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    urdu: "اے اللہ! میں تجھ سے دنیا اور آخرت میں معافی اور عافیت مانگتا ہوں۔",
    hindi: "हे प्रभु! मैं तुझसे दुनिया और परलोक दोनों में सुरक्षा और भलाई की प्रार्थना करता हूँ।",
    english: "O Allah, I ask You for forgiveness and well-being in this world and the hereafter.",
    blessing: "🌹 دعا: اللہ آپ کو ہر بری نظر، بیماری اور پریشانی سے اپنی پناہ میں رکھے۔ آمین!"
  },
  {
    id: "quote-7",
    theme: "Umeed & Himmat (Hope & Strength)",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    urdu: "بیشک ہر مشکل کے بعد آسانی ہے۔",
    hindi: "निश्चय ही हर कठिनाई के बाद सरलता और सहजता है।",
    english: "Indeed, with hardship comes ease.",
    blessing: "🌻 دعا: آپ کی زندگی کا ہر اندھیرا امید کی خوبصورت صبح میں بدل جائے۔ خوش رہیں!"
  }
];

export function getDailyQuote(): DailyDuaQuote {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return dailyQuotesAndDuas[dayOfYear % dailyQuotesAndDuas.length];
}
