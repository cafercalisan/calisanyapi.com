import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/lib/site";

export const metadata: Metadata = { title: "PVC Kapı Pencere ve Yapı Sistemleri İstanbul", description: "PVC kapı-pencere, cam balkon, kış bahçesi, pergola, giyotin cam, korkuluk, küpeşte, asma tavan ve sineklik hizmetlerini inceleyin.", alternates: { canonical: "/hizmetler" } };
export default function ServicesPage() { return <><SiteHeader/><main className="inner-page"><section className="page-hero technical-paper"><p className="kicker">Hizmetler</p><h1 className="font-display">Mekâna göre düşünülen,<br/><em>ölçüye göre üretilen.</em></h1><p>İhtiyacınız olan uygulamanın seçeneklerini, kullanım alanlarını ve sürecini açık biçimde inceleyin.</p></section><section className="catalog-grid visual">{services.map((service, index) => <Link href={`/hizmetler/${service.slug}`} className="catalog-card" key={service.slug}><div className="catalog-image"><Image src={service.image} alt={`${service.name} temsili uygulama görseli`} fill sizes="(max-width: 900px) 100vw, 50vw"/></div><span>0{index + 1} · Temsili uygulama</span><p>{service.eyebrow}</p><h2 className="font-display">{service.name}</h2><div>{service.summary}</div><b>Hizmeti incele <ArrowUpRight size={16}/></b></Link>)}</section></main><SiteFooter/></> }
