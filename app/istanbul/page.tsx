import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { districts } from "@/lib/site";
export const metadata: Metadata = { title: "İstanbul Hizmet Bölgeleri", description: "Uma Yapı'nın İstanbul'da keşif ve uygulama sunduğu 39 ilçeyi inceleyin.", alternates: { canonical: "/istanbul" } };
export default function IstanbulPage() { return <><SiteHeader/><main className="inner-page"><section className="page-hero technical-paper"><p className="kicker">Hizmet bölgeleri</p><h1 className="font-display">İstanbul’un 39 ilçesinde<br/><em>yerinde keşif.</em></h1><p>İlçenizi seçerek sunduğumuz hizmetleri ve keşif sürecini inceleyebilirsiniz.</p></section><section className="district-grid">{districts.map((district, index) => <Link href={`/istanbul/${district.slug}`} key={district.slug}><span>{String(index + 1).padStart(2,"0")}</span>{district.name}<b>↗</b></Link>)}</section></main><SiteFooter/></> }
