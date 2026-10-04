import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { getService, services, site } from "@/lib/site";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.filter(({ slug }) => slug !== "sineklik").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const service = getService((await params).slug); if (!service) return {}; const url = `/hizmetler/${service.slug}`; return { title: service.seoTitle, description: service.metaDescription, alternates: { canonical: url }, openGraph: { title: service.seoTitle, description: service.metaDescription, url, images: [{ url: service.image, alt: `${service.name} uygulaması` }] } }; }

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug); if (!service) notFound();
  if (service.slug === "sineklik") redirect("/sineklik-fiyat-hesapla");
  const serviceUrl = `${site.url}/hizmetler/${service.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", "@id": `${serviceUrl}#service`, url: serviceUrl, name: service.name, serviceType: service.name, description: service.metaDescription, image: `${site.url}${service.image}`, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: "İstanbul" }, mainEntityOfPage: { "@id": `${serviceUrl}#webpage` } }, { "@type": "WebPage", "@id": `${serviceUrl}#webpage`, url: serviceUrl, name: service.seoTitle, description: service.metaDescription, dateModified: service.updatedAt, mainEntity: { "@id": `${serviceUrl}#service` } }, { "@type": "FAQPage", "@id": `${serviceUrl}#faq`, mainEntity: service.faq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url }, { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${site.url}/hizmetler` }, { "@type": "ListItem", position: 3, name: service.name, item: serviceUrl }] }] };
  return <><JsonLd data={schema}/><SiteHeader/><main className="inner-page">
    <section className="service-hero technical-paper"><div><p className="kicker">{service.eyebrow}</p><h1 className="font-display">{service.name}<br/><em>uygulamaları.</em></h1></div><div><p>{service.shortAnswer}</p><Link className="btn-primary" href="#teklif">Adım adım teklif oluştur <ArrowUpRight size={17}/></Link></div></section>
    <figure className="service-visual"><Image src={service.image} alt={`${service.name} temsili uygulama görseli`} fill sizes="100vw"/><figcaption>Temsili uygulama görseli · Projenize özel sistem keşif sonrasında belirlenir.</figcaption></figure>
    <section className="detail-grid"><div><p className="kicker">Nerede kullanılır?</p><h2 className="font-display">İhtiyaca göre<br/><em>uygulama alanları.</em></h2></div><ul>{service.uses.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul><div><p className="kicker">Sistem seçenekleri</p><h2 className="font-display">Doğru detayı<br/><em>birlikte seçelim.</em></h2></div><ul>{service.systems.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul></section>
    <section className="faq-section"><div><p className="kicker">Sık sorulanlar</p><h2 className="font-display">Karar vermeden<br/><em>önce bilin.</em></h2></div><div>{service.faq.map(({question, answer}) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section id="teklif" className="service-inquiry-section"><div className="service-inquiry-heading"><p className="kicker">İstanbul genelinde keşif</p><h2 className="font-display">Alanınız için doğru sistemi<br/><em>birlikte belirleyelim.</em></h2><p>Hizmetinizi seçin, alan bilgilerini ve fotoğrafı ekleyin. Ekibimiz talebinizi inceleyip sizinle iletişime geçsin.</p></div><ServiceRequestForm initialService={service.slug}/></section>
  </main><SiteFooter/></>;
}
