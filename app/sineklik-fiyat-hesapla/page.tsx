import type { Metadata } from "next";
import { SineklikPricePage } from "@/components/SineklikPricePage";

export const metadata: Metadata = {
  title: "Sineklik Ölçünü Gir, Fiyatını Gör",
  description: "Kapı veya pencerenizi seçin, sineklik sistemini belirleyin ve ölçünüze göre fiyat teklifinizi hemen görün.",
  alternates: { canonical: "/sineklik-fiyat-hesapla" },
};

export default function Page() {
  return <SineklikPricePage />;
}
