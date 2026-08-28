import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Cat, Dog, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { services, site } from "@/lib/site";

const mainServices = services.filter((service) => service.slug !== "sineklik");
const inspirations = [
  { src: "/services/pvc-kapi-pencere-v2.webp", title: "Açılımı yaşamınıza göre seçin", label: "PVC kapı ve pencere · Beyaz" },
  { src: "/services/lifestyle/cam-korkuluk-01.jpg", title: "Görüşü kesmeyen güvenlik", label: "Cam korkuluk · Antrasit" },
  { src: "/services/lifestyle/balkon-yasam-ferah.webp", title: "Balkonda yeni bir yaşam alanı", label: "Cam balkon · Açık ton" },
];

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/brand/calisan-yapi-logo-header.webp`, telephone: site.phone, areaServed: { "@type": "City", name: "İstanbul" } }} />
    <SiteHeader />
    <main>
      <section className="home-hero grain">
        <Image src="/brand/calisan-yapi-hero.webp" alt="Cam balkon ve metal korkuluk uygulamasını gösteren temsili mimari görsel" fill preload quality={75} sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="kicker light">20 yıllık PVC ve yapı uygulama tecrübesi</p><h1 className="font-display">Evinize uyan çözüm,<br/><em>doğru ustayla başlar.</em></h1><p>PVC kapı ve pencere başta olmak üzere cam balkon, sineklik ve tamamlayıcı yapı sistemlerinde ölçüden montaja kadar açık bir süreç.</p><div className="hero-buttons"><Link href="/teklif-al" className="btn-accent">Fotoğrafla fiyat iste <ArrowUpRight size={18}/></Link><a href="#hizmetler" className="btn-glass">Hizmetleri incele <ArrowDown size={18}/></a></div></div>
      </section>

      <section id="hizmetler" className="bg-[var(--paper)] px-5 py-20 sm:px-8 lg:px-[7vw] lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:items-end lg:mb-16">
            <div><p className="kicker">Hizmetlerimiz</p><h2 className="font-display max-w-3xl text-5xl leading-[.9] font-medium tracking-[-.04em] sm:text-6xl lg:text-8xl">Alanınıza göre<br/><em className="font-normal text-[var(--teal)]">doğru çözüm.</em></h2></div>
            <p className="max-w-md text-sm leading-7 text-[var(--ink-soft)]">PVC doğramadan cam ve dış mekân sistemlerine kadar ihtiyacınızı doğru ekiple eşleştiriyor, kapsamı uygulamadan önce netleştiriyoruz.</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden bg-[var(--line)] sm:grid-cols-2">
            {mainServices.map((service, index) => <Link href={`/hizmetler/${service.slug}`} key={service.slug} className="group relative min-h-[480px] overflow-hidden bg-[var(--ink)] sm:min-h-[560px]">
              <Image src={service.image} alt={`${service.name} temsili uygulama görseli`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#10191b]/95 via-[#10191b]/15 to-transparent"/>
              <span className="absolute top-6 left-6 text-xs font-bold tracking-[.15em] text-white/65">0{index + 1}</span>
              <div className="absolute right-6 bottom-7 left-6 text-white sm:right-8 sm:bottom-9 sm:left-8"><p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#7ee4dd] uppercase">{service.eyebrow}</p><div className="flex items-end justify-between gap-5"><div><h3 className="font-display text-4xl font-medium sm:text-5xl">{service.name}</h3><p className="mt-3 max-w-md text-xs leading-6 text-white/65">{service.summary}</p></div><span className="grid size-12 shrink-0 place-items-center border border-white/30 transition group-hover:border-[var(--teal)] group-hover:bg-[var(--teal)] group-hover:text-[var(--ink)]"><ArrowUpRight size={19}/></span></div></div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="technical-paper px-5 py-20 sm:px-8 lg:px-[7vw] lg:py-36">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div><p className="kicker">Uzman kadromuz</p><h2 className="font-display text-5xl leading-[.9] font-medium tracking-[-.04em] sm:text-6xl lg:text-8xl">20 yıldır işi<br/><em className="font-normal text-[var(--teal)]">yerinde çözüyoruz.</em></h2></div>
          <div className="flex flex-col justify-end"><p className="max-w-2xl text-base leading-8 text-[var(--ink-soft)] lg:text-lg">Çalışan Yapı’nın temeli PVC kapı ve pencere uygulamalarındaki 20 yıllık saha tecrübesine dayanır. Bugün her biri kendi işinde uzman ekiplerle cam, metal, tavan ve dış mekân sistemlerini aynı ölçü, açıklık ve işçilik disipliniyle yürütüyoruz.</p><div className="mt-10 grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-3"><div className="border-b border-[var(--line)] py-5 sm:border-r sm:border-b-0 sm:pr-5"><b className="block font-display text-3xl font-medium">20 yıl</b><span className="text-[11px] text-[var(--ink-soft)]">PVC ve uygulama tecrübesi</span></div><div className="border-b border-[var(--line)] py-5 sm:border-r sm:border-b-0 sm:px-5"><b className="block font-display text-3xl font-medium">39 ilçe</b><span className="text-[11px] text-[var(--ink-soft)]">Planlı keşif ve montaj</span></div><div className="py-5 sm:pl-5"><b className="block font-display text-3xl font-medium">Uzman ekipler</b><span className="text-[11px] text-[var(--ink-soft)]">İşe göre doğru ustalık</span></div></div><Link href="/hakkimizda" className="text-link w-fit">Nasıl çalıştığımızı görün <ArrowUpRight size={17}/></Link></div>
        </div>
      </section>

      <section className="bg-[var(--paper-deep)] px-5 py-20 sm:px-8 lg:px-[7vw] lg:py-32">
        <div className="mx-auto max-w-[1500px]"><div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="kicker">Uygulama fikirleri</p><h2 className="font-display text-5xl leading-[.9] font-medium tracking-[-.04em] sm:text-6xl">Malzeme, renk<br/><em className="font-normal text-[var(--teal)]">ve yaşam.</em></h2></div><p className="max-w-sm text-xs leading-6 text-[var(--ink-soft)]">Görseller uygulama ve renk fikri vermek içindir; projenize özel sistem keşifte belirlenir.</p></div><div className="grid grid-cols-1 gap-5 md:grid-cols-3">{inspirations.map((item, index) => <figure key={item.src} className={`group ${index === 1 ? "md:mt-14" : ""}`}><div className="relative aspect-[4/5] overflow-hidden bg-[var(--ink)]"><Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]"/></div><figcaption className="mt-4 flex items-start justify-between border-t border-[var(--line)] pt-4"><div><b className="font-display text-2xl font-medium">{item.title}</b><p className="mt-1 text-[10px] tracking-[.1em] text-[var(--ink-soft)] uppercase">{item.label}</p></div><span className="text-xs text-[var(--teal-dark)]">0{index + 1}</span></figcaption></figure>)}</div></div>
      </section>

      <section className="discovery-bridge px-5 py-16 text-white sm:px-8 lg:px-[7vw] lg:py-24"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><p className="kicker light">Ücretsiz ön değerlendirme</p><h2 className="font-display max-w-4xl text-5xl leading-[.9] font-medium tracking-[-.04em] sm:text-6xl lg:text-8xl">Alanı gösterin,<br/><em className="font-normal text-[#9cebe6]">biz değerlendirelim.</em></h2></div><div className="max-w-md"><p className="mb-6 text-sm leading-7 text-white/70">Hizmeti seçin; yaklaşık ölçüleri ve alan fotoğraflarını gönderin. Ekibimiz inceleyip sizinle iletişime geçsin.</p><Link href="/teklif-al" className="inline-flex min-h-14 items-center gap-8 bg-[var(--paper)] px-6 text-xs font-bold tracking-[.08em] text-[var(--ink)] uppercase transition hover:-translate-y-1">Ücretsiz keşif iste <ArrowRight size={18}/></Link></div></div></section>

      <section className="screen-showcase px-5 py-20 sm:px-8 lg:px-[7vw] lg:py-28"><div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.88fr_1.12fr] lg:items-center"><div><p className="kicker">Sineklik oluşturucu</p><h2 className="font-display text-5xl leading-[.88] font-medium tracking-[-.04em] sm:text-6xl lg:text-8xl">Ölçünü gir,<br/><em className="font-normal text-[var(--teal-dark)]">teklifini al.</em></h2><p className="mt-8 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">Önce kapı veya pencerenizi seçin. Ölçülerinize göre model oluşsun; profil rengini ve güçlendirilmiş pet tülünü ekleyerek yaklaşık fiyatınızı anında görün.</p><div className="mt-7 flex flex-wrap gap-2"><span className="screen-color-chip"><i className="bg-[#ece9df]"/>Kırık beyaz</span><span className="screen-color-chip"><i className="bg-[#30363a]"/>Antrasit</span><span className="screen-color-chip"><i className="bg-[#a17848]"/>Altın meşe</span></div><div className="screen-benefits mt-8 grid max-w-xl grid-cols-3 py-5 text-center"><div><Cat className="mx-auto mb-2"/><b>Kedi dostu</b></div><div><Dog className="mx-auto mb-2"/><b>Güçlü dokuma</b></div><div><ShieldCheck className="mx-auto mb-2"/><b>Ek dayanım</b></div></div><p className="mt-5 max-w-xl text-xs leading-6 text-[var(--ink-soft)]">Güçlendirilmiş pet tülü, evcil hayvan bulunan alanlar için standart tüle göre daha dayanıklı, isteğe bağlı bir seçenektir.</p><Link href="/hizmetler/sineklik#teklif" className="mt-9 inline-flex min-h-14 items-center gap-8 bg-[var(--ink)] px-6 text-xs font-bold tracking-[.08em] text-white uppercase transition hover:-translate-y-1">Ölçünü gir, teklifini al <ArrowRight size={18}/></Link></div><div className="screen-collage"><figure className="screen-collage-main"><Image src="/products/double-antrasit.webp" alt="Antrasit duble sineklik uygulaması" fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover"/><figcaption><span>01</span>Antrasit</figcaption></figure><figure className="screen-collage-top"><Image src="/products/double-beyaz.webp" alt="Beyaz duble sineklik uygulaması" fill sizes="(max-width:1024px) 55vw, 24vw" className="object-cover"/><figcaption><span>02</span>Kırık beyaz</figcaption></figure><figure className="screen-collage-bottom"><Image src="/products/altinmese-duble-sürmeli.webp" alt="Altın meşe duble sineklik uygulaması" fill sizes="(max-width:1024px) 55vw, 24vw" className="object-cover"/><figcaption><span>03</span>Altın meşe</figcaption></figure><figure className="screen-collage-pet"><Image src="/cat-outdoor-visuals/04-dayanikli-kedi-tulu-detay.webp" alt="Güçlendirilmiş kedi tülü detayı" fill sizes="(max-width:1024px) 45vw, 18vw" className="object-cover"/><figcaption><span>+</span>Pet tülü</figcaption></figure></div></div></section>
    </main>
    <SiteFooter />
  </>;
}
