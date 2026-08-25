import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";

export const metadata: Metadata = { title: "Keşif ve Yaklaşık Teklif Al", description: "Hizmetinizi seçin; yaklaşık ölçüleri ve alan fotoğraflarını gönderin, ekibimiz sizi arasın.", alternates: { canonical: "/teklif-al" } };
export default async function QuotePage({ searchParams }: { searchParams: Promise<{ hizmet?: string; ilce?: string }> }) { const { hizmet, ilce } = await searchParams; return <><SiteHeader/><main className="quote-page"><section className="page-hero compact technical-paper"><p className="kicker">Fotoğraflı ön değerlendirme</p><h1 className="font-display">Alanı gösterin,<br/><em>çözümü birlikte bulalım.</em></h1><p>Üç kısa adımda hizmeti, yaklaşık ölçüleri ve varsa alan fotoğraflarını paylaşın. Form yaklaşık 2 dakika sürer; mesai saatlerinde gelen taleplere aynı iş günü içinde dönüş yapmayı hedefleriz.</p></section><ServiceRequestForm initialService={hizmet} initialDistrict={ilce}/></main><SiteFooter/></> }
