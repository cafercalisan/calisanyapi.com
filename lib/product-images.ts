export const PRODUCT_IMAGES: Record<string, { hero: string; card: string }> = {
  "sabit-citcitli": { hero: "/products/sabit-citcitli.jpg", card: "/products/sabit-citcitli.jpg" },
  "pliseli-pencere": { hero: "/products/lifestyle-pencere-plise.jpg", card: "/products/pencere-plise-1.webp" },
  "pliseli-kapi": { hero: "/products/lifestyle-kapi-plise.jpg", card: "/products/kapi-beyaz.webp" },
  akordiyon: { hero: "/products/lifestyle-akordiyon.jpg", card: "/products/akordiyon-2.webp" },
  menteseli: { hero: "/products/altin-mese-menteseli-kapi-pencere.webp", card: "/products/beyaz-menteseli-pencere.webp" },
  surme: { hero: "/products/surme.jpg", card: "/products/surme.jpg" },
  duble: { hero: "/products/duble-plise-ref.webp", card: "/products/double-beyaz.webp" },
  roller: { hero: "/products/roller.jpg", card: "/products/roller.jpg" },
};

export const SCREEN_SYSTEM_COPY: Record<string, { title: string; technical: string; description: string; bestFor: string }> = {
  "sabit-citcitli": { title: "Sabit", technical: "Sabit sineklik", description: "Açıp kapatmanız gerekmeyen alanlar için sade ve ekonomik çözüm.", bestFor: "Pencere ve küçük açıklıklar" },
  "pliseli-pencere": { title: "Pencere için yana katlanan", technical: "Plise pencere sinekliği", description: "Açarken kenara doğru katlanır. Az yer kaplar ve pencereyi sık kullanan evler için pratiktir.", bestFor: "Standart ve geniş pencereler" },
  "pliseli-kapi": { title: "Kapı için yana katlanan", technical: "Plise kapı sinekliği", description: "Balkon veya teras kapısından geçerken yana açılır, kullanılmadığında kenarda ince biçimde toplanır.", bestFor: "Balkon ve teras kapıları" },
  akordiyon: { title: "Körük gibi yana toplanan", technical: "Akordiyon sineklik", description: "Tülü bölümler hâlinde katlanarak yana çekilir. Daha geniş açıklıklarda rahat geçiş sağlar.", bestFor: "Geniş kapı ve balkon açıklıkları" },
  menteseli: { title: "Kapı gibi açılıp kapanan", technical: "Menteşeli sineklik", description: "Normal bir kapı kanadı gibi dışa veya içe açılır. Sık giriş çıkış yapılan alanlarda kullanımı kolaydır.", bestFor: "Mutfak, balkon ve bahçe kapıları" },
  surme: { title: "Ray üzerinde sağa sola kayan", technical: "Sürme sineklik", description: "Mevcut sürgülü kapı veya pencereye paralel biçimde ray üzerinde hareket eder.", bestFor: "Sürgülü doğrama ve cam balkonlar" },
  duble: { title: "Ortada birleşen çift kanat", technical: "Duble sineklik", description: "İki taraftan açılır ve ortada birleşir. Tek kanadın yetersiz kaldığı geniş geçişleri kapatır.", bestFor: "Geniş balkon kapıları ve cam balkonlar" },
  roller: { title: "Yukarı çekilince kasada toplanan", technical: "Stor / roller sineklik", description: "Perde gibi aşağı indirilir; kullanılmadığında yukarıdaki koruyucu kutunun içine toplanır.", bestFor: "Pencereler ve az kullanılan açıklıklar" },
};

export const COLOR_IMAGES: Record<string, Record<string, string>> = {
  "pliseli-kapi": {
    beyaz: "/products/kapi-beyaz.webp", antrasit: "/products/kapi-antrasit.webp", siyah: "/products/kapi-antrasit.webp",
    kahve: "/products/kapi-kahve.webp", ahsap: "/products/kapi-altin-mese.webp",
  },
  "pliseli-pencere": {
    beyaz: "/products/double-beyaz.webp", antrasit: "/products/double-antrasit.webp", siyah: "/products/double-antrasit.webp",
    kahve: "/products/kahverengi-double.webp", ahsap: "/products/pencere-plise-3.webp",
  },
  akordiyon: {
    beyaz: "/products/double-beyaz.webp", antrasit: "/products/double-antrasit.webp", siyah: "/products/double-antrasit.webp",
    kahve: "/products/kahverengi-double.webp", ahsap: "/products/akordiyon-1.webp",
  },
  surme: {
    beyaz: "/products/double-beyaz.webp", antrasit: "/products/double-antrasit.webp", siyah: "/products/double-antrasit.webp",
    kahve: "/products/kahverengi-double.webp", ahsap: "/products/surme.jpg",
  },
  menteseli: {
    beyaz: "/products/beyaz-menteseli-pencere.webp", antrasit: "/products/antrasit-menteseli-percere-1.webp",
    siyah: "/products/antrasit-menteseli-percere-2.webp", kahve: "/products/kahverengi-menteseli-kapi-pencere.webp",
    ahsap: "/products/altinmese-menteseli-pencere.webp",
  },
  duble: {
    beyaz: "/products/double-beyaz.webp", antrasit: "/products/double-antrasit.webp", siyah: "/products/double-antrasit.webp",
    kahve: "/products/kahverengi-double.webp", ahsap: "/products/duble-plise-ref.webp",
  },
};

export function productImage(productSlug: string, colorSlug?: string) {
  return (colorSlug && COLOR_IMAGES[productSlug]?.[colorSlug]) || PRODUCT_IMAGES[productSlug]?.hero || "/products/pliseli-pencere.jpg";
}
