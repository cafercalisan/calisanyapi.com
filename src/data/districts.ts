export interface District {
  slug: string;
  name: string;
  side: "anadolu" | "avrupa";
}

export const districts: District[] = [
  // Anadolu Yakası
  { slug: "kadikoy", name: "Kadıköy", side: "anadolu" },
  { slug: "uskudar", name: "Üsküdar", side: "anadolu" },
  { slug: "atasehir", name: "Ataşehir", side: "anadolu" },
  { slug: "maltepe", name: "Maltepe", side: "anadolu" },
  { slug: "kartal", name: "Kartal", side: "anadolu" },
  { slug: "pendik", name: "Pendik", side: "anadolu" },
  { slug: "tuzla", name: "Tuzla", side: "anadolu" },
  { slug: "sultanbeyli", name: "Sultanbeyli", side: "anadolu" },
  { slug: "cekmekoy", name: "Çekmeköy", side: "anadolu" },
  { slug: "sancaktepe", name: "Sancaktepe", side: "anadolu" },
  { slug: "umraniye", name: "Ümraniye", side: "anadolu" },
  { slug: "beykoz", name: "Beykoz", side: "anadolu" },
  { slug: "sile", name: "Şile", side: "anadolu" },
  { slug: "adalar", name: "Adalar", side: "anadolu" },
  // Avrupa Yakası
  { slug: "besiktas", name: "Beşiktaş", side: "avrupa" },
  { slug: "sisli", name: "Şişli", side: "avrupa" },
  { slug: "fatih", name: "Fatih", side: "avrupa" },
  { slug: "eyupsultan", name: "Eyüpsultan", side: "avrupa" },
  { slug: "beyoglu", name: "Beyoğlu", side: "avrupa" },
  { slug: "sariyer", name: "Sarıyer", side: "avrupa" },
  { slug: "bakirkoy", name: "Bakırköy", side: "avrupa" },
  { slug: "bagcilar", name: "Bağcılar", side: "avrupa" },
  { slug: "bahcelievler", name: "Bahçelievler", side: "avrupa" },
  { slug: "gungoren", name: "Güngören", side: "avrupa" },
  { slug: "kucukcekmece", name: "Küçükçekmece", side: "avrupa" },
  { slug: "avcilar", name: "Avcılar", side: "avrupa" },
  { slug: "beylikduzu", name: "Beylikdüzü", side: "avrupa" },
  { slug: "esenyurt", name: "Esenyurt", side: "avrupa" },
  { slug: "basaksehir", name: "Başakşehir", side: "avrupa" },
  { slug: "arnavutkoy", name: "Arnavutköy", side: "avrupa" },
  { slug: "gaziosmanpasa", name: "Gaziosmanpaşa", side: "avrupa" },
  { slug: "sultangazi", name: "Sultangazi", side: "avrupa" },
  { slug: "esenler", name: "Esenler", side: "avrupa" },
  { slug: "zeytinburnu", name: "Zeytinburnu", side: "avrupa" },
  { slug: "buyukcekmece", name: "Büyükçekmece", side: "avrupa" },
  { slug: "silivri", name: "Silivri", side: "avrupa" },
  { slug: "catalca", name: "Çatalca", side: "avrupa" },
  { slug: "kagithane", name: "Kağıthane", side: "avrupa" },
  { slug: "bayrampaşa", name: "Bayrampaşa", side: "avrupa" },
];

export const anadoluDistricts = districts.filter((d) => d.side === "anadolu");
export const avrupaDistricts = districts.filter((d) => d.side === "avrupa");
