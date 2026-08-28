export type Service = {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  shortAnswer: string;
  updatedAt: string;
  image: string;
  eyebrow: string;
  summary: string;
  description: string;
  uses: string[];
  systems: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "pvc-kapi-pencere",
    name: "PVC Kapı ve Pencere",
    seoTitle: "PVC Kapı ve Pencere Sistemleri İstanbul",
    metaDescription: "İstanbul'da açılır, çift açılım, sürme ve kaldır-sür PVC kapı pencere sistemleri. Ölçü, doğrama yenileme, cam ve montaj için ön değerlendirme alın.",
    shortAnswer: "PVC kapı ve pencere sistemlerini İstanbul genelinde açıklığın ölçüsüne, kullanım alışkanlığına, ısı-ses yalıtımı beklentisine ve mevcut duvar yapısına göre hazırlıyoruz. Açılır, çift açılım, sürme ve geniş açıklıklara uygun kaldır-sür çözümlerinde profil, cam, renk, aksesuar ve montaj kapsamını keşif sonrasında netleştiriyoruz.",
    updatedAt: "2026-08-11",
    image: "/services/pvc-kapi-pencere-v1.webp",
    eyebrow: "20 yıllık PVC uygulama tecrübesi",
    summary: "Evinize uygun açılır, çift açılım ve sürme PVC kapı-pencere sistemleriyle yalıtımı, güvenliği ve kullanım rahatlığını birlikte çözün.",
    description: "PVC doğramayı yalnız profil seçimi olarak görmüyoruz. Açılım yönünü, kullanım sıklığını, cam paketini, su tahliyesini, aksesuarı ve montaj yüzeyini birlikte değerlendirerek uzun ömürlü kapı ve pencere çözümleri uyguluyoruz.",
    uses: ["Konut kapı ve pencereleri", "Balkon ve teras çıkışları", "Eski doğrama yenileme", "Geniş sürme açıklıkları"],
    systems: ["Tek ve çift kanat açılır pencere", "Çift açılım pencere", "PVC sürme kapı ve pencere", "Kaldır-sür geniş açıklık sistemi", "Balkon kapısı", "Sabit ve vasistas pencere"],
    faq: [
      { question: "Hangi PVC pencere açılımı benim için uygun?", answer: "Odanın kullanım biçimi, perde ve mobilya yerleşimi, havalandırma ihtiyacı ve açıklığın ölçüsü birlikte değerlendirilir. Günlük kullanım için çift açılım; geniş geçişlerde sürme veya kaldır-sür sistemler tercih edilebilir." },
      { question: "Eski PVC kapı ve pencereler yenilenebilir mi?", answer: "Evet. Mevcut doğrama, duvar yüzeyi, mermer ve yalıtım detayları keşifte kontrol edilir; söküm, yüzey hazırlığı ve yeni montaj kapsamı teklif öncesinde açıklanır." },
      { question: "Isı ve ses yalıtımını neler etkiler?", answer: "Profil yapısı kadar doğru cam paketi, conta, aksesuar ayarı, montaj boşluklarının kapatılması ve doğramanın açıklığa uygun ölçülendirilmesi de belirleyicidir." },
    ],
  },
  {
    slug: "cam-balkon",
    name: "Cam Balkon",
    seoTitle: "Cam Balkon Sistemleri İstanbul",
    metaDescription: "İstanbul'da katlanır, sürme ve ısıcamlı cam balkon çözümleri. Yerinde keşif, ölçülendirme, sistem seçimi ve planlı montaj desteği alın.",
    shortAnswer: "Cam balkon sistemlerini İstanbul genelinde açıklığın ölçüsüne, kullanım biçimine ve yalıtım beklentisine göre projelendiriyoruz. Katlanır, sürme ve ısıcamlı seçenekleri yerinde keşifte karşılaştırıyor; cam, profil, açılım yönü ve montaj kapsamını uygulama öncesinde netleştiriyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/cam-balkon-v2.webp",
    eyebrow: "Dört mevsim daha fazla alan",
    summary: "Balkonunuzu mimariyle uyumlu, açılıp kapanabilen korunaklı bir yaşam alanına dönüştürün.",
    description: "Katlanır ve sürme cam balkon seçeneklerini açıklığın ölçüsü, kullanım biçimi ve yalıtım beklentinize göre projelendiriyoruz. Keşifte açılım yönünü, cam ve profil seçimini birlikte netleştiriyoruz.",
    uses: ["Balkon ve teras kapatma", "Kış bahçesi", "Kafe ve ticari alan", "Mevcut sistem yenileme"],
    systems: ["Katlanır cam balkon", "Sürme cam sistem", "Isıcamlı sistem", "Teras kapatma"],
    faq: [
      { question: "Hangi cam balkon sistemi bana uygun?", answer: "Açıklığın ölçüsü, kanatların toplanacağı alan, rüzgâr etkisi ve yalıtım beklentisi keşifte değerlendirilerek sistem seçilir." },
      { question: "Keşifte neler belirlenir?", answer: "Net ölçüler, zemin ve tavan durumu, profil rengi, cam seçimi, açılım yönü ve montaj koşulları belirlenir." },
    ],
  },
  {
    slug: "kupeste",
    name: "Küpeşte",
    seoTitle: "Küpeşte Sistemleri İstanbul",
    metaDescription: "İstanbul'da alüminyum, paslanmaz ve camlı küpeşte uygulamaları. Merdiven, balkon ve teras için ölçüye özel keşif ve montaj.",
    shortAnswer: "Küpeşte uygulamalarını İstanbul genelinde merdiven eğimi, sabitleme yüzeyi, kullanım yoğunluğu ve dış ortam koşullarına göre planlıyoruz. Alüminyum, paslanmaz ve camlı seçeneklerde bağlantı detaylarını, dönüşleri ve yüzey bitişlerini ölçü sonrasında belirliyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/kupeste-v2.webp",
    eyebrow: "Güvenliğin çizgisi",
    summary: "Merdiven, balkon ve teraslarda sağlamlığı temiz detaylarla birleştiren ölçüye özel çözümler.",
    description: "Alüminyum ve paslanmaz küpeşte uygulamalarını kullanım yoğunluğu, taşıyıcı yüzey ve mimari görünümle birlikte ele alıyoruz. Bağlantı detayları ve bitişler uygulama öncesinde netleştirilir.",
    uses: ["Merdivenler", "Balkon ve teraslar", "Apartman ortak alanları", "Ticari yapılar"],
    systems: ["Alüminyum küpeşte", "Paslanmaz küpeşte", "Camlı küpeşte", "Duvar tipi tutamak"],
    faq: [
      { question: "Küpeşte ölçüsü nasıl alınır?", answer: "Eğim, dönüşler, sabitleme yüzeyi ve toplam hat yerinde ölçülür; bağlantı noktaları uygulama öncesi işaretlenir." },
      { question: "İç ve dış mekânda aynı malzeme kullanılır mı?", answer: "Hayır. Dış ortam maruziyeti, bakım ihtiyacı ve yüzey dayanımı dikkate alınarak malzeme ve kaplama seçilir." },
    ],
  },
  {
    slug: "korkuluk",
    name: "Korkuluk",
    seoTitle: "Korkuluk Sistemleri İstanbul",
    metaDescription: "İstanbul'da cam, alüminyum ve metal korkuluk çözümleri. Balkon, teras, merdiven ve Fransız balkon için keşif ve uygulama.",
    shortAnswer: "Korkuluk sistemlerini İstanbul genelinde kullanım yeri, sabitleme zemini ve güvenlik gereksinimlerine göre projelendiriyoruz. Cam, alüminyum ve metal seçenekleri mimari görünümle birlikte değerlendiriyor; taşıyıcı ve bağlantı detaylarını yerinde keşifle netleştiriyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/korkuluk-v2.webp",
    eyebrow: "Koruma, görüşü kesmeden",
    summary: "Cephe ve iç mekân çizgisine uyum sağlayan cam, alüminyum ve metal korkuluk sistemleri.",
    description: "Korkuluk çözümünü yalnız görünüm üzerinden değil; kullanım yeri, sabitleme zemini ve güvenlik gereksinimleri üzerinden projelendiriyoruz. Cam ve metal detaylarını ölçüye özel hazırlıyoruz.",
    uses: ["Fransız balkon", "Teras ve balkon", "Merdiven boşluğu", "Bahçe ve sınır hattı"],
    systems: ["Cam korkuluk", "Alüminyum korkuluk", "Ferforje ve metal", "Fransız balkon korkuluğu"],
    faq: [
      { question: "Cam korkulukta hangi cam kullanılır?", answer: "Cam tipi ve kalınlığı uygulama yüksekliği, açıklık ve taşıyıcı sisteme göre teknik değerlendirmeyle belirlenir." },
      { question: "Mevcut zemine korkuluk uygulanabilir mi?", answer: "Zeminin taşıyıcılığı ve kenar mesafeleri keşifte kontrol edilir; uygun ankraj veya alternatif taşıyıcı detay seçilir." },
    ],
  },
  {
    slug: "asma-tavan",
    name: "Asma Tavan",
    seoTitle: "Asma Tavan Sistemleri İstanbul",
    metaDescription: "İstanbul'da alçıpan, taşyünü, metal ve baffle asma tavan uygulamaları. Konut ve ticari mekânlar için keşif ve planlama.",
    shortAnswer: "Asma tavan uygulamalarını İstanbul genelinde tavan yüksekliği, aydınlatma, akustik ve tesisat erişimini birlikte değerlendirerek planlıyoruz. Alçıpan, taşyünü, metal ve baffle sistemlerde gerekli kotu ve taşıyıcı çözümü yerinde inceleme sonrasında belirliyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/asma-tavan-v2.webp",
    eyebrow: "Mekâna ritim, tesisata düzen",
    summary: "Aydınlatma, akustik ve tesisat ihtiyaçlarını tek bir temiz tavan kurgusunda buluşturun.",
    description: "Konut ve ticari mekânlarda tavan yüksekliği, aydınlatma, akustik ve tesisat erişimini birlikte değerlendiriyoruz. Malzeme ve taşıyıcı sistemi kullanım senaryosuna göre seçiyoruz.",
    uses: ["Ofis ve mağaza", "Konut iç mekânı", "Restoran ve kafe", "Ortak alanlar"],
    systems: ["Alçıpan asma tavan", "Taşyünü tavan", "Metal tavan", "Lineer ve baffle tavan"],
    faq: [
      { question: "Asma tavan ne kadar kot kaybettirir?", answer: "Gerekli boşluk; taşıyıcı sistem, aydınlatma ve tesisat geçişlerine göre yerinde ölçüm sonrasında belirlenir." },
      { question: "Tesisata sonradan erişilebilir mi?", answer: "Modüler metal ve taşyünü sistemlerde erişim kolaydır; alçıpan uygulamalarda gerekli noktalara müdahale kapağı planlanır." },
    ],
  },
  {
    slug: "sineklik",
    name: "Sineklik Sistemleri",
    seoTitle: "Sineklik Sistemleri İstanbul",
    metaDescription: "İstanbul'da plise, menteşeli, sürme ve duble sineklik. Kapı ve pencereye özel ölçü, model seçimi ve montaj desteği.",
    shortAnswer: "Sineklik sistemlerini kapı veya pencerenin açılımına, kullanım sıklığına ve net ölçüsüne göre hazırlıyoruz. İstanbul genelinde plise, menteşeli, sürme ve duble modeller için ön değerlendirme sunuyor; kesin üretim ölçüsünü uygulama öncesinde doğruluyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/sineklik-v2.webp",
    eyebrow: "Hava girsin, sinek değil",
    summary: "Kapı ve pencerenize göre ölçülen plise, menteşeli, sürme ve duble sineklik çözümleri.",
    description: "Mevcut uzmanlığımızı ölçüye özel sineklik sistemlerinde sürdürüyoruz. Açılım tipine göre modeli seçebilir, çevrim içi teklif aracımızdan ön teklif oluşturabilirsiniz.",
    uses: ["Pencere", "Balkon kapısı", "Geniş açıklık", "Evcil hayvanlı evler"],
    systems: ["Plise sineklik", "Menteşeli sineklik", "Sürme sineklik", "Duble sineklik"],
    faq: [
      { question: "Ölçüyü kendim girebilir miyim?", answer: "Evet. Ön teklif için ölçülerinizi girebilir; kesin üretim öncesinde ölçü doğrulaması talep edebilirsiniz." },
      { question: "Hangi sineklik modeli daha kullanışlı?", answer: "Kapı veya pencerenin açılımı, kullanım sıklığı ve açıklığın ölçüsü model seçiminde belirleyicidir." },
    ],
  },
  {
    slug: "kis-bahcesi",
    name: "Kış Bahçesi",
    seoTitle: "Kış Bahçesi Sistemleri İstanbul",
    metaDescription: "İstanbul'da teras, bahçe ve ticari alanlar için ölçüye özel kış bahçesi çözümleri. Keşif, sistem seçimi ve uygulama planı.",
    shortAnswer: "Kış bahçesi çözümlerini İstanbul genelinde alanın taşıyıcı yapısı, güneş-rüzgâr etkisi, kullanım dönemi ve yalıtım beklentisine göre planlıyoruz. Cam kapama, çatı ve açılım seçeneklerini yerinde keşifte birlikte değerlendirerek uygulama kapsamını netleştiriyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/kis-bahcesi-v1.webp",
    eyebrow: "Dış mekânı dört mevsime taşıyın",
    summary: "Teras ve bahçe alanlarını ışığı koruyan, ölçüye özel kapalı yaşam alanlarına dönüştüren sistemler.",
    description: "Kış bahçesi uygulamalarını taşıyıcı yapı, çatı çözümü, cam sistemi ve iklim koşullarıyla birlikte ele alıyoruz. Kullanım beklentinize göre sabit ve açılır bölümleri keşif sonrasında projelendiriyoruz.",
    uses: ["Teras ve bahçe", "Villa ve müstakil konut", "Kafe ve restoran", "Çatı ve veranda alanı"],
    systems: ["Cam çatılı kış bahçesi", "Sabit cam kapama", "Sürme camlı sistem", "Yalıtımlı profil seçenekleri"],
    faq: [
      { question: "Kış bahçesi her terasa uygulanabilir mi?", answer: "Taşıyıcı yüzey, su tahliyesi, rüzgâr etkisi ve mevcut yapının durumu yerinde incelendikten sonra uygun sistem belirlenir." },
      { question: "Yaz aylarında alan nasıl havalandırılır?", answer: "Sürme veya katlanır açılımlar, çatı gölgelemesi ve doğal hava akışı kullanım senaryosuna göre birlikte planlanır." },
    ],
  },
  {
    slug: "pergola",
    name: "Pergola",
    seoTitle: "Pergola Sistemleri İstanbul",
    metaDescription: "İstanbul'da teras, bahçe, kafe ve restoranlar için açılır pergola sistemleri. Ölçüye özel keşif ve uygulama planlaması.",
    shortAnswer: "Pergola sistemlerini İstanbul genelinde açıklık ölçüsü, taşıyıcı yüzey, yağmur tahliyesi ve gölgeleme ihtiyacına göre planlıyoruz. Manuel veya motorlu açılım, kumaş ve profil seçeneklerini kullanım alanına göre karşılaştırıp montaj koşullarını keşifte belirliyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/pergola-v1.webp",
    eyebrow: "Gölgeyi ve açıklığı yönetin",
    summary: "Teras ve bahçelerde güneş ve yağmur kontrolü sağlayan, mekâna göre ölçülendirilmiş açılır sistemler.",
    description: "Pergola uygulamalarında açıklık, eğim, su tahliyesi, rüzgâr maruziyeti ve taşıyıcı yüzeyi birlikte değerlendiriyoruz. Sistem tipi ve otomasyon seçimi yerinde keşif sonrasında netleştirilir.",
    uses: ["Teras ve veranda", "Bahçe oturma alanı", "Kafe ve restoran", "Ticari açık alan"],
    systems: ["Motorlu pergola", "Manuel açılır pergola", "Duvara bağlı sistem", "Bağımsız taşıyıcılı sistem"],
    faq: [
      { question: "Pergola yağmurda kullanılabilir mi?", answer: "Kumaş, eğim ve drenaj detayı doğru seçildiğinde yağmur kontrolü sağlanabilir; kesin performans sistem ve saha koşullarına göre belirlenir." },
      { question: "Motorlu pergola için elektrik hazırlığı gerekir mi?", answer: "Motor ve kontrol ünitesinin konumuna göre güvenli bir elektrik hattı planlanır; ihtiyaç keşif sırasında belirlenir." },
    ],
  },
  {
    slug: "giyotin-cam",
    name: "Giyotin Cam",
    seoTitle: "Giyotin Cam Sistemleri İstanbul",
    metaDescription: "İstanbul'da balkon, teras, kafe ve restoranlar için motorlu giyotin cam sistemleri. Keşif, ölçü ve uygulama desteği.",
    shortAnswer: "Giyotin cam sistemlerini İstanbul genelinde açıklık ölçüsü, hareketli panel düzeni, güvenlik ve kullanım sıklığına göre projelendiriyoruz. Motor, cam, profil ve kumanda seçeneklerini saha koşullarıyla birlikte değerlendiriyor; bağlantı ve elektrik hazırlığını montajdan önce netleştiriyoruz.",
    updatedAt: "2026-08-10",
    image: "/services/giyotin-cam-v1.webp",
    eyebrow: "Tek hareketle açık ya da korunaklı",
    summary: "Manzarayı korurken açıklığı dikey hareketle yöneten, konut ve ticari alanlara özel motorlu cam çözümleri.",
    description: "Giyotin cam uygulamalarında panel ölçüsü, hareket senaryosu, motor seçimi ve bağlantı yüzeylerini birlikte değerlendiriyoruz. Güvenli kullanım ve çevre sistemlerle uyum keşif aşamasında planlanır.",
    uses: ["Balkon ve teras", "Kafe ve restoran", "Kış bahçesi", "Ticari cephe açıklığı"],
    systems: ["Motorlu giyotin cam", "İki hareketli panelli sistem", "Üç panelli sistem", "Korkuluk özellikli alt panel"],
    faq: [
      { question: "Giyotin cam manuel kullanılabilir mi?", answer: "Bu sistemler çoğunlukla motorlu çalışır; motor ve kontrol seçimi panel ağırlığına ve kullanım sıklığına göre yapılır." },
      { question: "Alt panel korkuluk olarak kullanılabilir mi?", answer: "Uygun sistem ve teknik detay seçildiğinde bu çözüm değerlendirilebilir; güvenlik gereksinimleri proje özelinde kontrol edilmelidir." },
    ],
  },
];

export const districts = [
  ["adalar", "Adalar"], ["arnavutkoy", "Arnavutköy"], ["atasehir", "Ataşehir"], ["avcilar", "Avcılar"],
  ["bagcilar", "Bağcılar"], ["bahcelievler", "Bahçelievler"], ["bakirkoy", "Bakırköy"], ["basaksehir", "Başakşehir"],
  ["bayrampasa", "Bayrampaşa"], ["besiktas", "Beşiktaş"], ["beykoz", "Beykoz"], ["beylikduzu", "Beylikdüzü"],
  ["beyoglu", "Beyoğlu"], ["buyukcekmece", "Büyükçekmece"], ["catalca", "Çatalca"], ["cekmekoy", "Çekmeköy"],
  ["esenler", "Esenler"], ["esenyurt", "Esenyurt"], ["eyupsultan", "Eyüpsultan"], ["fatih", "Fatih"],
  ["gaziosmanpasa", "Gaziosmanpaşa"], ["gungoren", "Güngören"], ["kadikoy", "Kadıköy"], ["kagithane", "Kağıthane"],
  ["kartal", "Kartal"], ["kucukcekmece", "Küçükçekmece"], ["maltepe", "Maltepe"], ["pendik", "Pendik"],
  ["sancaktepe", "Sancaktepe"], ["sariyer", "Sarıyer"], ["silivri", "Silivri"], ["sultanbeyli", "Sultanbeyli"],
  ["sultangazi", "Sultangazi"], ["sile", "Şile"], ["sisli", "Şişli"], ["tuzla", "Tuzla"],
  ["umraniye", "Ümraniye"], ["uskudar", "Üsküdar"], ["zeytinburnu", "Zeytinburnu"],
].map(([slug, name]) => ({ slug, name }));

export const site = {
  name: "Çalışan Yapı",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || "Çalışan Yapı",
  legalAddress: process.env.NEXT_PUBLIC_LEGAL_ADDRESS?.trim() || "İstanbul, Türkiye",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@calisanyapi.com",
  phone: "+905393165217",
  phoneLabel: "0539 316 52 17",
  url: getSiteUrl(),
};

function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return process.env.NODE_ENV === "production" ? "https://calisanyapi.com" : "http://localhost:3000";
}

export function getService(slug: string) { return services.find((item) => item.slug === slug); }
export function getDistrict(slug: string) { return districts.find((item) => item.slug === slug); }
