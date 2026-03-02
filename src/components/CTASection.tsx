import { siteConfig } from "@/data/siteConfig";

export default function CTASection() {
  return (
    <section className="py-28 px-5 lg:px-10">
      <div className="max-w-[900px] mx-auto relative">
        <div className="gradient-border rounded-3xl bg-primary-mid px-8 py-16 lg:px-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />
          <div className="dot-pattern absolute inset-0 opacity-40" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/[0.06] border border-accent/[0.12] text-accent/60 px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-[2px] uppercase mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-glow-pulse" />
              Ücretsiz Keşif
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] text-white font-bold leading-[1.1] tracking-tight mb-4">
              Projenizi konuşalım
            </h2>
            <p className="text-white/30 text-[14px] mb-12 max-w-[420px] mx-auto">
              Arayın, aynı gün randevu oluşturalım.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
