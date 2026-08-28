export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  serviceSlug: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pvc-pencere-seciminde-isi-ve-ses-yalitimi",
    title: "PVC pencere seçiminde ısı ve ses yalıtımı nasıl değerlendirilir?",
    description: "PVC pencere yenilerken profil, cam, conta, montaj ve açılım tipini birlikte değerlendirmenin pratik yolları.",
    eyebrow: "PVC rehberi",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    readTime: "6 dakika",
    serviceSlug: "pvc-kapi-pencere",
    intro: "İyi bir PVC pencere yalnız profil markasıyla seçilmez. Cam paketi, doğramanın ölçüsü, açılım biçimi, aksesuar ve montaj detayı aynı sistemin parçalarıdır.",
    sections: [
      { title: "Önce ihtiyacı doğru tarif edin", paragraphs: ["Yoğun trafik gören bir cephede ses kontrolü, kuzey cephede ısı kaybı, geniş balkon açıklığında ise kanat ağırlığı ve kullanım rahatlığı öncelik kazanabilir. Tek bir pencere tarifi her oda için aynı sonucu vermez."], bullets: ["Cephenin yönü ve rüzgâr etkisi", "Dış ortam gürültüsü", "Açıklığın eni ve yüksekliği", "Günlük havalandırma alışkanlığı"] },
      { title: "Cam ve profil birlikte çalışır", paragraphs: ["Profilin oda sayısı tek başına performans garantisi değildir. Cam kalınlığı, ara boşluk, kaplama seçimi ve doğramanın cam yükünü taşıyabilmesi birlikte değerlendirilmelidir.", "Mevcut mermer, duvar ve denizlik birleşimlerinde oluşan boşluklar iyi bir sistemi zayıflatabilir. Bu nedenle keşifte yalnız doğrama ölçüsü değil, montaj yüzeyi de kontrol edilmelidir."] },
      { title: "Teklifleri aynı kapsamla karşılaştırın", paragraphs: ["İki teklif arasında karar verirken söküm, moloz, yüzey tamiri, cam paketi, aksesuar, sineklik hazırlığı ve montaj sonrası ayarların kapsama dahil olup olmadığını sorun."], bullets: ["Profil ve destek sacı", "Cam paketinin açık tarifi", "Aksesuar ve açılım tipi", "Söküm ve montaj kapsamı", "Garanti ve servis koşulları"] },
    ],
  },
  {
    slug: "cam-balkon-sistemi-secerken-7-kritik-nokta",
    title: "Cam balkon sistemi seçerken 7 kritik nokta",
    description: "Katlanır, sürme ve ısıcamlı cam balkon seçeneklerini alanınıza göre karşılaştırmak için kontrol listesi.",
    eyebrow: "Cam balkon rehberi",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    readTime: "5 dakika",
    serviceSlug: "cam-balkon",
    intro: "Cam balkon seçimi yalnız görüntüyle yapılırsa açılım yönü, su tahliyesi ve kullanım alanı gibi önemli ayrıntılar gözden kaçabilir.",
    sections: [
      { title: "Açıklığı ve kullanım biçimini okuyun", paragraphs: ["Balkonun köşe sayısı, parapet yapısı, tavan yüzeyi ve panellerin toplanacağı alan sistem seçimini doğrudan etkiler."], bullets: ["Katlanma veya sürme yönü", "Panel park alanı", "Temizlik erişimi", "Rüzgâr ve yağmur maruziyeti"] },
      { title: "Yalıtım beklentisini gerçekçi kurun", paragraphs: ["Cam balkon yaşam alanını rüzgâr ve yağıştan korumaya yardımcı olur; ancak her sistem bir dış cephe doğramasıyla aynı ısı yalıtımını sunmaz. Kullanım amacı keşif sırasında açıkça konuşulmalıdır."] },
      { title: "Montaj detayını tekliften önce netleştirin", paragraphs: ["Rayların sabitleneceği yüzey, suyun tahliye yönü, profil rengi, cam tipi ve mevcut korkulukla birleşim çözümü teklifin teknik parçası olmalıdır."] },
    ],
  },
  {
    slug: "ev-icin-sineklik-olcusu-ve-model-secimi",
    title: "Ev için sineklik ölçüsü ve model seçimi",
    description: "Pencere ve balkon kapılarında plise, menteşeli ve sürme sineklik seçerken ölçü ve kullanım önerileri.",
    eyebrow: "Sineklik rehberi",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    readTime: "4 dakika",
    serviceSlug: "sineklik",
    intro: "Doğru sineklik modeli, açıklığın türüne ve ne sıklıkla kullanıldığına göre değişir. Ön ölçü fiyat fikri verir; üretim ölçüsü ise montaj yüzeyinde doğrulanmalıdır.",
    sections: [
      { title: "Modele açıklık karar verir", paragraphs: ["Sık kullanılan balkon kapılarında geçiş rahatlığı, küçük pencerelerde çerçeve payı, geniş açıklıklarda ise sistemin taşıyabileceği ölçü dikkate alınır."], bullets: ["Plise: sık kullanılan kapı ve pencereler", "Menteşeli: uygun açılım alanı bulunan pencereler", "Sürme: mevcut sürme doğramalar", "Duble plise: geniş geçişler"] },
      { title: "Ön ölçü nasıl alınır?", paragraphs: ["En ve boy ölçüsünü birden fazla noktadan alın; kasanın içten mi dıştan mı ölçüldüğünü not edin ve montajı engelleyebilecek kol, panjur veya mermer çıkıntılarını fotoğraflayın."] },
      { title: "Evcil hayvan varsa", paragraphs: ["Güçlendirilmiş pet tülü standart tüle göre daha dayanıklı olabilir; yine de sistemin çerçevesi, kilidi ve kullanım biçimi birlikte değerlendirilmelidir."] },
    ],
  },
];

export type Neighborhood = { slug: string; name: string; districtSlug: string; summary: string; updatedAt: string };
export const neighborhoods: Neighborhood[] = [
  { slug: "barbaros", name: "Barbaros", districtSlug: "atasehir", summary: "Konut ve ticari yapılarda doğrama yenileme, cam balkon ve tamamlayıcı yapı sistemleri için yerinde keşif.", updatedAt: "2026-08-28" },
  { slug: "icerenkoy", name: "İçerenköy", districtSlug: "atasehir", summary: "Apartman ve konutlarda PVC pencere, balkon kapısı, sineklik ve cam balkon ihtiyaçları için ölçüye dayalı planlama.", updatedAt: "2026-08-28" },
  { slug: "kayisdagi", name: "Kayışdağı", districtSlug: "atasehir", summary: "Konutlarda doğrama, balkon ve dış mekân sistemleri için saha koşullarına göre keşif ve uygulama desteği.", updatedAt: "2026-08-28" },
  { slug: "kozyatagi", name: "Kozyatağı", districtSlug: "kadikoy", summary: "Konut ve iş yerlerinde PVC doğrama, cam sistemleri ve ölçüye özel tamamlayıcı uygulamalar.", updatedAt: "2026-08-28" },
  { slug: "bostanci", name: "Bostancı", districtSlug: "kadikoy", summary: "Sahil etkisi ve yoğun kullanıma uygun doğrama, cam balkon, korkuluk ve sineklik çözümleri için keşif.", updatedAt: "2026-08-28" },
  { slug: "goztepe", name: "Göztepe", districtSlug: "kadikoy", summary: "Mevcut konutlarda pencere yenileme, balkon sistemleri ve iç-dış mekân uygulamaları için planlı çalışma.", updatedAt: "2026-08-28" },
];

export function getBlogPost(slug: string) { return blogPosts.find(post => post.slug === slug); }
export function getNeighborhood(districtSlug: string, slug: string) { return neighborhoods.find(item => item.districtSlug === districtSlug && item.slug === slug); }
export function getDistrictNeighborhoods(districtSlug: string) { return neighborhoods.filter(item => item.districtSlug === districtSlug); }
