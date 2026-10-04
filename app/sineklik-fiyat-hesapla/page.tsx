import type { Metadata } from "next";
import { SineklikQuoteFlow } from "@/components/SineklikQuoteFlow";

export const metadata: Metadata = {
  title: "Sineklik Ölçünü Gir, Fiyatını Gör",
  description: "Kapı veya pencereniz için sineklik modelini ve ölçüsünü seçin, adım adım ön teklif alın.",
  alternates: { canonical: "/sineklik-fiyat-hesapla" },
};

export default function Page() {
  return <SineklikQuoteFlow />;
}
