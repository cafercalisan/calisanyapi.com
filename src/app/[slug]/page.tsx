import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, Service } from "@/data/services";
import { districts, District } from "@/data/districts";
import { siteConfig } from "@/data/siteConfig";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";

interface Props {
  params: Promise<{ slug: string }>;
}

type ParseResult =
  | { type: "service"; service: Service }
  | { type: "service-district"; service: Service; district: District };

function parseSlug(slug: string): ParseResult | null {
  const service = services.find((s) => s.slug === slug);
  if (service) return { type: "service", service };

  for (const s of services) {
    for (const d of districts) {
      if (slug === `${s.slug}-${d.slug}`) {
        return { type: "service-district", service: s, district: d };
      }
    }
  }
  return null;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const service of services) {
    params.push({ slug: service.slug });
  }
  for (const service of services) {
    for (const district of districts) {
      params.push({ slug: `${service.slug}-${district.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "service") {
    const { service } = parsed;
    return {
      title: `${service.title} İstanbul | Montaj & Tamir`,
      description: `İstanbul'da ${service.title.toLowerCase()} montaj ve tamir hizmeti. ${service.description} Ücretsiz keşif için hemen arayın.`,
      keywords: service.keywords.join(", "),
      openGraph: {
        title: `${service.title} İstanbul | ${siteConfig.name}`,
        description: `İstanbul'da ${service.title.toLowerCase()} montaj, kurulum ve tamir. Ücretsiz keşif.`,
        url: `${siteConfig.domain}/${service.slug}`,
      },
      alternates: { canonical: `${siteConfig.domain}/${service.slug}` },
    };
  }

  const { service, district } = parsed;
  const title = `${district.name} ${service.shortTitle} | Montaj & Tamir`;
  const description = `${district.name}'de ${service.shortTitle.toLowerCase()} montaj ve tamir hizmeti. ${service.description} Ücretsiz keşif için hemen arayın. ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: `${service.shortTitle.toLowerCase()} ${district.name.toLowerCase()}, ${district.name.toLowerCase()} ${service.shortTitle.toLowerCase()} montaj`,
    openGraph: {
      title: `${district.name} ${service.shortTitle} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/${slug}`,
    },
    alternates: { canonical: `${siteConfig.domain}/${slug}` },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (parsed.type === "service") {
    return <ServicePage service={parsed.service} />;
  }
  return <ServiceDistrictPage service={parsed.service} district={parsed.district} />;
}

/* ─── SERVICE PAGE ─── */
function ServicePage({ service }: { service: Service }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.domain },
    areaServed: { "@type": "City", name: "İstanbul" },
    serviceType: service.title,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-primary pt-36 pb-20 px-5 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(0,212,255,0.05)_0%,transparent_60%)]" />
        <div className="dot-pattern absolute inset-0 opacity-50" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <Link href="/" className="text-[11px] text-white/25 no-underline hover:text-accent/60 transition-colors inline-flex items-center gap-1.5 mb-8 font-medium uppercase tracking-wider">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            Ana Sayfa
          </Link>
          <div className="w-14 h-14 bg-accent/[0.08] border border-accent/[0.12] rounded-2xl flex items-center justify-center text-accent/60 mb-5">
            <ServiceIcon slug={service.slug} size={28} />
          </div>
          <h1 className="font-display text-[clamp(36px,5vw,60px)] text-white font-bold leading-[1.05] tracking-tight mb-4">
            {service.title}
            <br />
            <span className="text-accent">İstanbul</span>
          </h1>
          <p className="text-[15px] text-white/35 leading-relaxed max-w-[580px] mb-8">
            {service.longDescription}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href={`tel:${siteConfig.phoneRaw}`} className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Ücretsiz Keşif
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-5 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[10px] text-accent font-bold tracking-[3px] uppercase mb-3">Özellikler</div>
          <h2 className="font-display text-[clamp(26px,3.5vw,38px)] text-white font-bold leading-[1.1] tracking-tight mb-8">
            {service.shortTitle} hizmet detayları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((f) => (
              <div key={f} className="glass rounded-xl p-6 hover:border-accent/15 transition-all">
                <div className="w-9 h-9 bg-accent/[0.06] border border-accent/[0.1] rounded-lg flex items-center justify-center text-accent/50 mb-3">
                  <ServiceIcon slug={service.slug} size={18} />
                </div>
                <div className="text-[14px] font-bold text-white">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair */}
      {service.hasRepair && (
        <section className="bg-primary-mid border-y border-edge py-16 px-5 lg:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-[10px] text-warm font-bold tracking-[3px] uppercase mb-3">Tamir Servisi</div>
            <h2 className="font-display text-[clamp(24px,3vw,34px)] text-white font-bold leading-[1.1] tracking-tight mb-3">
              {service.shortTitle} tamir hizmeti
            </h2>
            <p className="text-white/30 text-[13px] mb-6 max-w-[500px]">{service.repairDescription}</p>
            <div className="flex gap-2.5 flex-wrap">
              {["Aynı gün servis", "Uygun fiyat", "Garanti"].map((t) => (
                <span key={t} className="glass text-white/40 px-3.5 py-2 rounded-lg text-[11px] font-medium">{t}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Districts */}
      <section className="py-28 px-5 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[10px] text-accent font-bold tracking-[3px] uppercase mb-3">Hizmet Bölgeleri</div>
          <h2 className="font-display text-[clamp(24px,3vw,34px)] text-white font-bold leading-[1.1] tracking-tight mb-4">
            {service.shortTitle} hizmet verdiğimiz ilçeler
          </h2>
          <p className="text-white/25 text-[13px] mb-8">İstanbul&apos;un tüm ilçelerinde {service.shortTitle.toLowerCase()} montaj ve tamir hizmeti.</p>
          <div className="flex flex-wrap gap-2">
            {districts.map((d) => (
              <Link key={d.slug} href={`/${service.slug}-${d.slug}`} className="glass text-white/40 px-3.5 py-2 rounded-lg text-[12px] font-medium no-underline hover:text-accent hover:border-accent/20 transition-all">
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

/* ─── SERVICE-DISTRICT PAGE ─── */
function ServiceDistrictPage({ service, district }: { service: Service; district: District }) {
  const otherDistricts = districts.filter((d) => d.slug !== district.slug).slice(0, 15);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${district.name} ${service.title}`,
    description: `${district.name} bölgesinde ${service.title.toLowerCase()} montaj ve tamir hizmeti.`,
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.domain, telephone: siteConfig.phoneRaw },
    areaServed: { "@type": "Place", name: `${district.name}, İstanbul` },
    serviceType: service.title,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-primary pt-36 pb-20 px-5 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(0,212,255,0.05)_0%,transparent_60%)]" />
        <div className="dot-pattern absolute inset-0 opacity-50" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <Link href={`/${service.slug}`} className="text-[11px] text-white/25 no-underline hover:text-accent/60 transition-colors inline-flex items-center gap-1.5 mb-8 font-medium uppercase tracking-wider">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            {service.title}
          </Link>
          <div className="w-14 h-14 bg-accent/[0.08] border border-accent/[0.12] rounded-2xl flex items-center justify-center text-accent/60 mb-5">
            <ServiceIcon slug={service.slug} size={28} />
          </div>
          <h1 className="font-display text-[clamp(34px,5vw,56px)] text-white font-bold leading-[1.05] tracking-tight mb-4">
            {district.name}
            <br />
            <span className="text-accent">{service.shortTitle}</span>
          </h1>
          <p className="text-[15px] text-white/35 leading-relaxed max-w-[580px] mb-8">
            {district.name} bölgesinde profesyonel {service.shortTitle.toLowerCase()} montaj{service.hasRepair ? " ve tamir" : ""} hizmeti. İstanbul&apos;un {district.side === "anadolu" ? "Anadolu" : "Avrupa"} yakasında ücretsiz keşif.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href={`tel:${siteConfig.phoneRaw}`} className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Ücretsiz Keşif
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 px-5 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[10px] text-accent font-bold tracking-[3px] uppercase mb-3">Hizmet Detayı</div>
          <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-white font-bold leading-[1.1] tracking-tight mb-4">
            {district.name} {service.shortTitle.toLowerCase()} hizmetleri
          </h2>
          <p className="text-white/30 leading-relaxed text-[14px] mb-10 max-w-[650px]">
            {service.longDescription}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {service.features.map((f) => (
              <div key={f} className="glass rounded-xl p-6 hover:border-accent/15 transition-all">
                <div className="w-9 h-9 bg-accent/[0.06] border border-accent/[0.1] rounded-lg flex items-center justify-center text-accent/50 mb-3">
                  <ServiceIcon slug={service.slug} size={18} />
                </div>
                <div className="text-[14px] font-bold text-white">{f}</div>
              </div>
            ))}
          </div>

          {/* Repair */}
          {service.hasRepair && (
            <div className="glass rounded-2xl p-7 lg:p-10 mb-14 gradient-border">
              <div className="text-[10px] text-warm font-bold tracking-[3px] uppercase mb-3">Tamir</div>
              <h3 className="font-display text-[clamp(22px,3vw,30px)] text-white font-bold leading-[1.1] tracking-tight mb-3">
                {district.name} {service.shortTitle.toLowerCase()} tamiri
              </h3>
              <p className="text-white/30 text-[13px] mb-5">{service.repairDescription}</p>
            </div>
          )}

          {/* Why us mini */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {["Ücretsiz Keşif", "Hızlı Teslimat", `${siteConfig.experience} Yıl Tecrübe`, "Güvenilir Fiyat"].map((title) => (
              <div key={title} className="glass rounded-xl p-6 text-center">
                <div className="text-[13px] font-bold text-white">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-primary-mid border-y border-edge py-16 px-5 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10">
            <div className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-3">Diğer ilçelerde {service.shortTitle.toLowerCase()}</div>
            <div className="flex flex-wrap gap-2">
              {otherDistricts.map((d) => (
                <Link key={d.slug} href={`/${service.slug}-${d.slug}`} className="glass text-white/35 px-3.5 py-2 rounded-lg text-[11px] font-medium no-underline hover:text-accent hover:border-accent/20 transition-all">
                  {d.name}
                </Link>
              ))}
              <Link href={`/${service.slug}`} className="bg-accent/10 border border-accent/20 text-accent/70 px-3.5 py-2 rounded-lg text-[11px] font-bold no-underline hover:bg-accent/15 transition-colors">
                Tümü
              </Link>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-3">{district.name}&apos;de diğer hizmetler</div>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}-${district.slug}`} className="glass text-white/35 px-3.5 py-2 rounded-lg text-[11px] font-medium no-underline hover:text-accent hover:border-accent/20 transition-all">
                  {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
