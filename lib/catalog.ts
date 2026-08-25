import type { Catalog } from "./types";

export const DEFAULT_CATALOG: Catalog = {
  products: [
    ["sabit-citcitli", "Sabit Sineklik", "Açılmasına gerek olmayan pencere ve küçük açıklıklar için yalın çözüm.", 650, 950, 30, 160, 30, 220],
    ["pliseli-pencere", "Pliseli Pencere", "Pencerede zarif, kompakt ve gündelik kullanıma uygun.", 850, 1200, 30, 160, 30, 220],
    ["pliseli-kapi", "Pliseli Kapı", "Balkon ve teras geçişleri için rahat kullanım.", 1450, 1400, 60, 200, 140, 260],
    ["akordiyon", "Akordiyon", "Geniş açıklıklarda yatay katlanan klasik sistem.", 1200, 1300, 30, 180, 30, 220],
    ["menteseli", "Menteşeli", "Sık kullanılan kapı ve pencerelerde pratik çözüm.", 950, 1100, 40, 130, 40, 220],
    ["surme", "Sürme", "Ray üzerinde sessizce kayan geniş yüzey çözümü.", 1100, 1200, 60, 250, 60, 200],
    ["duble", "Duble Sineklik", "Geniş kapı ve cam balkonlarda iki kanatlı çözüm.", 1750, 1500, 100, 400, 100, 280],
    ["roller", "Roller (Storlu)", "Kullanılmadığında üst kasada toplanan sistem.", 1050, 1250, 40, 160, 40, 220],
  ].map(([slug, name, description, basePrice, pricePerM2, minWidth, maxWidth, minHeight, maxHeight]) => ({
    id: String(slug), slug: String(slug), name: String(name), shortName: String(name), description: String(description),
    basePrice: Number(basePrice), pricePerM2: Number(pricePerM2), minWidth: Number(minWidth), maxWidth: Number(maxWidth),
    minHeight: Number(minHeight), maxHeight: Number(maxHeight), active: true,
  })),
  colors: [
    { id: "beyaz", slug: "beyaz", name: "Kırık Beyaz", hex: "#ece9df", price: 0, active: true },
    { id: "antrasit", slug: "antrasit", name: "Antrasit", hex: "#30363a", price: 0, active: true },
    { id: "siyah", slug: "siyah", name: "Mat Siyah", hex: "#171a1b", price: 80, active: true },
    { id: "kahve", slug: "kahve", name: "Toprak Kahve", hex: "#665044", price: 0, active: true },
    { id: "ahsap", slug: "ahsap", name: "Altın Meşe", hex: "#a17848", price: 120, active: true },
  ],
  features: [
    { id: "polen", slug: "polen", name: "Polen filtreli tül", price: 180, active: true },
    { id: "pet", slug: "pet", name: "Güçlendirilmiş pet tülü", price: 220, active: true },
    { id: "kilit", slug: "kilit", name: "Güvenlik kilidi", price: 150, active: true },
    { id: "miknatis", slug: "miknatis", name: "Mıknatıslı kapanma", price: 120, active: true },
  ],
  settings: { vatRate: 0.2, shippingFee: 250, freeShippingThreshold: 7500, installationFee: 600 },
};
