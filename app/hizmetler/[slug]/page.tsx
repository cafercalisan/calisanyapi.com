import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { getService, services, site } from "@/lib/site";
import { getCatalog } from "@/lib/data";
import { PRODUCT_IMAGES, SCREEN_SYSTEM_COPY } from "@/lib/product-images";
import { QuoteBuilder } from "@/components/QuoteBuilder";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const service = getService((await params).slug); if (!service) return {}; const url = `/hizmetler/${service.slug}`; return { title: service.seoTitle, description: service.metaDescription, alternates: { canonical: url }, openGraph: { title: service.seoTitle, description: service.metaDescription, url, images: [{ url: service.image, alt: `${service.name} uygulaması` }] } }; }

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug); if (!service) notFound();
  const screenCatalog = service.slug === "sineklik" ? await getCatalog() : null;
  const serviceUrl = `${site.url}/hizmetler/${service.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", "@id": `${serviceUrl}#service`, url: serviceUrl, name: service.name, serviceType: service.name, description: service.metaDescription, image: `${site.url}${service.image}`, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: "İstanbul" }, mainEntityOfPage: { "@id": `${serviceUrl}#webpage` } }, { "@type": "WebPage", "@id": `${serviceUrl}#webpage`, url: serviceUrl, name: service.seoTitle, description: service.metaDescription, dateModified: service.updatedAt, mainEntity: { "@id": `${serviceUrl}#service` } }, { "@type": "FAQPage", "@id": `${serviceUrl}#faq`, mainEntity: service.faq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url }, { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${site.url}/hizmetler` }, { "@type": "ListItem", position: 3, name: service.name, item: serviceUrl }] }] };
  return <><JsonLd data={schema}/><SiteHeader/><main className="inner-page">
    <section className="service-hero technical-paper"><div><p className="kicker">{service.eyebrow}</p><h1 className="font-display">{service.name}<br/><em>uygulamaları.</em></h1></div><div><p>{service.shortAnswer}</p><Link className="btn-primary" href={screenCatalog ? "#teklif" : `/teklif-al?hizmet=${service.slug}`}>{screenCatalog ? "Ölçüyle fiyat oluştur" : `${service.name} keşfi iste`} <ArrowUpRight size={17}/></Link></div></section>
    <figure className="service-visual"><Image src={service.image} alt={`${service.name} temsili uygulama görseli`} fill priority sizes="100vw"/><figcaption>Temsili uygulama görseli · Projenize özel sistem keşif sonrasında belirlenir.</figcaption></figure>
    {screenCatalog && <section className="screen-system-section"><div className="screen-system-head"><div><p className="kicker">Üç net çözüm</p><h2 className="font-display">Alanınızı seçin,<br/><em>ölçünüzle teklif alın.</em></h2></div><p>Kafa karıştıran model listeleri yerine yalnız üç kullanım çözümü sunuyoruz. Uygunluğu ekibimiz ölçü üzerinden kontrol eder.</p></div><div className="screen-system-grid">{screenCatalog.products.filter(product=>product.active&&["sabit-citcitli","surme","duble"].includes(product.slug)).map((product,index)=>{const copy=SCREEN_SYSTEM_COPY[product.slug];const title=product.slug==="duble"?"Duble sürgülü":copy?.title||product.name;return <a href="#teklif" key={product.slug}><figure><Image src={PRODUCT_IMAGES[product.slug]?.hero || "/services/sineklik-v2.png"} alt={`${title} sineklik çözümü`} fill sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"/></figure><span>0{index+1} · Çözüm</span><h3 className="font-display">{title}</h3><p>{copy?.description||product.description}</p><small>Uygun alan: <b>{copy?.bestFor||"Kapı ve pencere açıklıkları"}</b></small><strong>Ölçünü gir, teklifini gör <ArrowUpRight size={14}/></strong></a>})}</div></section>}
    <section className="detail-grid"><div><p className="kicker">Nerede kullanılır?</p><h2 className="font-display">İhtiyaca göre<br/><em>uygulama alanları.</em></h2></div><ul>{service.uses.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul><div><p className="kicker">Sistem seçenekleri</p><h2 className="font-display">Doğru detayı<br/><em>birlikte seçelim.</em></h2></div><ul>{service.systems.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul></section>
    <section className="faq-section"><div><p className="kicker">Sık sorulanlar</p><h2 className="font-display">Karar vermeden<br/><em>önce bilin.</em></h2></div><div>{service.faq.map(({question, answer}) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    {screenCatalog ? <QuoteBuilder catalog={screenCatalog}/> : <section className="inline-cta"><p className="kicker light">İstanbul genelinde keşif</p><h2 className="font-display">Alanınız için doğru sistemi<br/><em>birlikte belirleyelim.</em></h2><Link href={`/teklif-al?hizmet=${service.slug}`} className="btn-accent">Fotoğraf gönder, teklif al <ArrowUpRight size={18}/></Link></section>}
  </main><SiteFooter/></>;
}
