import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { districts, anadoluDistricts, avrupaDistricts } from "@/data/districts";

export default function DistrictBanner() {
  return (
    <section className="bg-surface-card py-28 px-5 lg:px-10 border-y border-edge" id="ilceler">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3 flex items-center gap-2">
              <div className="w-6 h-px bg-accent/30" />
              Hizmet Bölgeleri
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] text-white font-bold leading-[1.1] tracking-tight mb-4">
              İstanbul&apos;un tüm ilçelerinde ücretsiz keşif
            </h2>
            <p className="text-[14px] text-white/30 leading-relaxed mb-8">
              {districts.length} ilçeye ücretsiz keşif.
            </p>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="btn-primary !text-[13px]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Keşif Talep Edin
            </a>
          </div>

          {/* Right */}
          <div>
            <div className="mb-6">
              <div className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-3 flex items-center gap-2">
                <div className="w-3 h-px bg-accent/20" />
                Avrupa Yakası
              </div>
              <div className="flex flex-wrap gap-2">
                {avrupaDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/sineklik-${d.slug}`}
                    className="glass text-white/40 px-3.5 py-2 rounded-lg text-[12px] font-medium no-underline hover:text-accent hover:border-accent/20 transition-all duration-200"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-3 flex items-center gap-2">
                <div className="w-3 h-px bg-warm/20" />
                Anadolu Yakası
              </div>
              <div className="flex flex-wrap gap-2">
                {anadoluDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/sineklik-${d.slug}`}
                    className="glass text-white/40 px-3.5 py-2 rounded-lg text-[12px] font-medium no-underline hover:text-accent hover:border-accent/20 transition-all duration-200"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
