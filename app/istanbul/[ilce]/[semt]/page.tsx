import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { ContentTracker } from "@/components/ContentTracker";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getNeighborhood, neighborhoods } from "@/lib/content";
import { getDistrict, services, site } from "@/lib/site";

type Props = { params: Promise<{ ilce: string; semt: string }> };
export function generateStaticParams() { return neighborhoods.map(item => ({ ilce:item.districtSlug, semt:item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const {ilce,semt}=await params; const item=getNeighborhood(ilce,semt); const district=getDistrict(ilce); if(!item||!district)return{}; return { title:`${item.name} PVC Pencere ve Cam Balkon Hizmetleri`, description:`${item.name}, ${district.name} bölgesinde PVC pencere, cam balkon, sineklik ve yapı sistemleri için yerinde keşif, ölçü ve planlı uygulama hizmeti alın.`, alternates:{canonical:`/istanbul/${ilce}/${semt}`} }; }

export default async function NeighborhoodPage({ params }: Props) {
  const {ilce,semt}=await params; const item=getNeighborhood(ilce,semt); const district=getDistrict(ilce); if(!item||!district)notFound(); const path=`/istanbul/${ilce}/${semt}`; const url=`${site.url}${path}`;
  return <><ContentTracker type="neighborhood" slug={semt} district={ilce} neighborhood={semt}/><JsonLd data={{"@context":"https://schema.org","@graph":[{"@type":"Service",name:`${item.name} yapı uygulamaları`,areaServed:{"@type":"Place",name:`${item.name}, ${district.name}`},provider:{"@id":`${site.url}/#organization`},url},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Ana Sayfa",item:site.url},{"@type":"ListItem",position:2,name:"İstanbul",item:`${site.url}/istanbul`},{"@type":"ListItem",position:3,name:district.name,item:`${site.url}/istanbul/${ilce}`},{"@type":"ListItem",position:4,name:item.name,item:url}]}]}}/><SiteHeader/><main className="inner-page"><section className="geo-hero technical-paper"><div><p className="kicker">İstanbul · {district.name} · {item.name}</p><h1 className="font-display">{item.name}’nda<br/><em>ölçüye özel uygulama.</em></h1></div><div><p>{item.summary}</p><Link className="btn-primary" href={`/teklif-al?ilce=${ilce}&from=${encodeURIComponent(path)}`}>{item.name} için keşif iste <ArrowUpRight size={16}/></Link></div></section><section className="geo-proof"><div><span>01</span><h2 className="font-display">Yerinde ölçü</h2><p>Uygulama alanını, bağlantı yüzeylerini ve kullanım beklentinizi birlikte değerlendiririz.</p></div><div><span>02</span><h2 className="font-display">Açık kapsam</h2><p>Malzeme, sistem, söküm ve montaj detaylarını işe başlamadan önce netleştiririz.</p></div><div><span>03</span><h2 className="font-display">Planlı uygulama</h2><p>Üretim ve montaj adımlarını alanın koşullarına göre programlarız.</p></div></section><section className="geo-services"><header><p className="kicker">Hizmetler</p><h2 className="font-display">Dokuz uzmanlık,<br/><em>tek keşif.</em></h2></header><div>{services.map(service=><Link key={service.slug} href={`/hizmetler/${service.slug}`}><Check size={16}/><span><b>{service.name}</b><small>{service.summary}</small></span><ArrowUpRight size={16}/></Link>)}</div></section></main><SiteFooter/></>;
}
