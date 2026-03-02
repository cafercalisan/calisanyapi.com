import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { districts } from "@/data/districts";

export default function Footer() {
  const repairServices = services.filter((s) => s.hasRepair);

  return (
    <footer className="bg-primary pt-16 pb-8 px-5 lg:px-10 border-t border-edge">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-accent/[0.08] border border-accent/[0.12] rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/60">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <div className="font-display text-[17px] text-white font-bold leading-none tracking-tight">
                  {siteConfig.name}
                </div>
                <div className="text-[8px] text-accent/30 tracking-[2.5px] uppercase mt-0.5 font-bold">
                  Doğrama & Cam
                </div>
              </div>
            </div>
            <p className="text-[12px] text-white/20 leading-relaxed mb-5">
              İstanbul&apos;un tüm ilçelerinde profesyonel doğrama, cam balkon ve sineklik hizmetleri.
            </p>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="text-[12px] text-accent/60 no-underline hover:text-accent transition-colors font-semibold inline-flex items-center gap-2"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {siteConfig.phone}
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-5">Hizmetler</h4>
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="block text-white/20 no-underline text-[12px] mb-2.5 hover:text-accent/60 transition-colors">
                {s.shortTitle}
              </Link>
            ))}
          </div>

          {/* Repair */}
          <div>
            <h4 className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-5">Tamir Hizmetleri</h4>
            {repairServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="block text-white/20 no-underline text-[12px] mb-2.5 hover:text-accent/60 transition-colors">
                {s.shortTitle} Tamiri
              </Link>
            ))}
          </div>

          {/* Districts */}
          <div>
            <h4 className="text-[10px] text-white/25 font-bold tracking-[2px] uppercase mb-5">Hizmet Bölgeleri</h4>
            {districts.slice(0, 8).map((d) => (
              <Link key={d.slug} href={`/sineklik-${d.slug}`} className="block text-white/20 no-underline text-[12px] mb-2.5 hover:text-accent/60 transition-colors">
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-wrap justify-between items-center gap-4">
          <span className="text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </span>
          <div className="text-[9px] text-white/[0.03] max-w-[600px] leading-relaxed">
            Sineklik istanbul &middot; cam balkon istanbul &middot; pimapen tamiri &middot; sineklik tamiri &middot; cam balkon tamiri &middot; doğrama tamiri &middot; kepenk tamiri &middot; duşakabin istanbul &middot; alüminyum doğrama &middot; ücretsiz keşif istanbul
          </div>
        </div>
      </div>
    </footer>
  );
}
