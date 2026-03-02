import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

export default function Hero() {
  return (
    <section className="min-h-[92vh] bg-primary relative flex items-center overflow-hidden">
      {/* Layered background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_90%_20%,rgba(0,212,255,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_10%_80%,rgba(240,192,64,0.03)_0%,transparent_50%)]" />
        {/* Dot pattern */}
        <div className="dot-pattern absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10 pt-36 pb-24 w-full">
        {/* Status badge */}
        <div className="animate-fade-up stagger-1">
          <div className="inline-flex items-center gap-2.5 bg-accent/[0.06] border border-accent/[0.12] text-accent/70 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
            İstanbul Geneli Hizmet Veriyoruz
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-end">
          <div>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] text-white font-bold leading-[1.05] mb-6 animate-fade-up stagger-2 tracking-tight">
              Sineklik, Cam Balkon
              <br />
              <span className="text-accent">& Doğrama</span> Çözümleri
            </h1>
            <p className="text-[16px] text-white/40 leading-relaxed max-w-[520px] mb-10 animate-fade-up stagger-3">
              İstanbul&apos;un tüm ilçelerinde profesyonel montaj, kurulum ve
              tamir hizmetleri. Ücretsiz keşif ile projenize en uygun çözümü
              birlikte belirleyelim.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3.5 flex-wrap animate-fade-up stagger-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="bg-accent text-primary px-8 py-4 rounded-xl text-[14px] font-bold no-underline inline-flex items-center gap-3 glow-accent-strong hover:bg-accent-light transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Ücretsiz Keşif İsteyin
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-white/70 px-8 py-4 rounded-xl text-[14px] font-medium no-underline inline-flex items-center gap-3 hover:text-accent hover:border-accent/20 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Yazın
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-5 mt-10 animate-fade-up stagger-5">
              {["Ücretsiz Keşif", "Garantili İşçilik", "10+ Yıl Tecrübe"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[11px] text-white/25 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent/40">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right - stats */}
          <div className="hidden lg:block animate-fade-up stagger-5">
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { num: String(siteConfig.districtCount), label: "İlçe", sub: "Hizmet Bölgesi" },
                { num: siteConfig.experience, label: "Yıl", sub: "Sektör Deneyimi" },
                { num: siteConfig.customerCount, label: "Müşteri", sub: "Memnuniyet" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5 text-center hover:border-accent/10 transition-all duration-300">
                  <div className="font-display text-[38px] text-white font-bold leading-none tracking-tight">
                    {s.num}
                  </div>
                  <div className="text-[10px] text-accent/50 uppercase tracking-[2px] mt-2 font-bold">
                    {s.label}
                  </div>
                  <div className="text-[9px] text-white/20 mt-0.5 font-medium">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {services.slice(0, 6).map((s) => (
                <div
                  key={s.slug}
                  className="glass rounded-lg px-3.5 py-2 text-[11px] text-white/30 font-medium hover:text-accent/60 hover:border-accent/10 transition-all duration-300"
                >
                  {s.shortTitle}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden grid grid-cols-3 gap-2.5 mt-12 animate-fade-up stagger-5">
          {[
            { num: String(siteConfig.districtCount), label: "İlçe" },
            { num: siteConfig.experience, label: "Yıl" },
            { num: siteConfig.customerCount, label: "Müşteri" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 text-center">
              <div className="font-display text-[26px] text-white font-bold leading-none">{s.num}</div>
              <div className="text-[9px] text-accent/40 uppercase tracking-[2px] mt-1 font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
