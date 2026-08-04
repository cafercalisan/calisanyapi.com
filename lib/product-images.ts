export const PRODUCT_IMAGES: Record<string, { hero: string; card: string }> = {
  "pliseli-pencere": { hero: "/products/lifestyle-pencere-plise.jpg", card: "/products/pencere-plise-1.webp" },
  "pliseli-kapi": { hero: "/products/lifestyle-kapi-plise.jpg", card: "/products/kapi-beyaz.webp" },
  akordiyon: { hero: "/products/lifestyle-akordiyon.jpg", card: "/products/akordiyon-2.webp" },
  menteseli: { hero: "/products/altin-mese-menteseli-kapi-pencere.webp", card: "/products/beyaz-menteseli-pencere.webp" },
  surme: { hero: "/products/surme.jpg", card: "/products/surme.jpg" },
  duble: { hero: "/products/duble-plise-ref.webp", card: "/products/double-beyaz.webp" },
  roller: { hero: "/products/roller.jpg", card: "/products/roller.jpg" },
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
