export type PliseSurface = "pencere" | "kapi" | "cati";
export type PliseOpening = "tek" | "cift";
export type PliseProfile = "beyaz" | "antrasit" | "kahve" | "siyah";
export type PliseMesh = "standart" | "evcil" | "ince";

export interface PliseOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
  swatch?: string;
}

export const surfaces: PliseOption<PliseSurface>[] = [
  { value: "pencere", label: "Pencere", hint: "Standart kanat pencere" },
  { value: "kapi", label: "Kapı / Balkon", hint: "Yüksekliği fazla" },
  { value: "cati", label: "Çatı / Tepe", hint: "Eğimli çatı pencere" },
];

export const openings: PliseOption<PliseOpening>[] = [
  { value: "tek", label: "Tek Açılım", hint: "Bir taraftan toplanır" },
  { value: "cift", label: "Çift Açılım", hint: "Ortadan iki yana açılır" },
];

export const profiles: PliseOption<PliseProfile>[] = [
  { value: "beyaz", label: "Beyaz", swatch: "#f4f4f1" },
  { value: "antrasit", label: "Antrasit", swatch: "#2c2f33" },
  { value: "kahve", label: "Kahve", swatch: "#5b3a23" },
  { value: "siyah", label: "Siyah", swatch: "#0a0a0a" },
];

export const meshes: PliseOption<PliseMesh>[] = [
  { value: "standart", label: "Standart Plise Tül", hint: "Siyah, ince örgü" },
  { value: "evcil", label: "Pet-Proof", hint: "Evcil dostu, dayanıklı" },
  { value: "ince", label: "Mikro Mesh", hint: "Küçük böcekler için sık dokuma" },
];

/**
 * Indicative pricing — final price set after measurement.
 * Base m² rates in TL.
 */
export const pricing = {
  base: { pencere: 2200, kapi: 2700, cati: 3100 } as Record<PliseSurface, number>,
  cift: 1.15,
  profile: { beyaz: 1, antrasit: 1.08, kahve: 1.08, siyah: 1.1 } as Record<PliseProfile, number>,
  mesh: { standart: 1, evcil: 1.18, ince: 1.12 } as Record<PliseMesh, number>,
  minOrder: 2500,
};

export const limits = {
  minCm: 30,
  maxWidth: { pencere: 200, kapi: 200, cati: 180 } as Record<PliseSurface, number>,
  maxHeight: { pencere: 200, kapi: 300, cati: 200 } as Record<PliseSurface, number>,
};

export function computePrice(input: {
  surface: PliseSurface;
  opening: PliseOpening;
  profile: PliseProfile;
  mesh: PliseMesh;
  widthCm: number;
  heightCm: number;
  qty: number;
}): number {
  const m2 = Math.max(0.5, (input.widthCm * input.heightCm) / 10000);
  const base = pricing.base[input.surface];
  const cift = input.opening === "cift" ? pricing.cift : 1;
  const profile = pricing.profile[input.profile];
  const mesh = pricing.mesh[input.mesh];
  const unit = base * m2 * cift * profile * mesh;
  const total = unit * Math.max(1, input.qty);
  return Math.max(pricing.minOrder, Math.round(total / 50) * 50);
}

export function formatTL(n: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);
}
