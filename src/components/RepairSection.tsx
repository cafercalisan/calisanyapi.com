import { repairServices } from "@/data/services";
import ServiceIcon from "./ServiceIcon";

const promises = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Aynı Gün Servis",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Uygun Fiyat",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Garantili İşçilik",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
      </svg>
    ),
    title: "39 İlçe Servis",
  },
];

export default function RepairSection() {
  return (
    <section className="bg-primary-mid py-28 px-5 lg:px-10 relative overflow-hidden" id="tamir">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(0,212,255,0.03)_0%,transparent_60%)]" />
      <div className="dot-pattern absolute inset-0 opacity-50" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-warm/[0.08] border border-warm/[0.15] text-warm/80 px-3.5 py-1.5 rounded-xl text-[10px] font-bold tracking-[2px] uppercase mb-5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Tamir Servisi
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] text-white font-bold leading-[1.1] tracking-tight mb-4">
              Hızlı ve uygun fiyatlı tamir
            </h2>
            <p className="text-[14px] text-white/30 leading-relaxed mb-10">
              Tüm marka ve model doğrama sistemleri için profesyonel tamir.
            </p>

            <div className="flex flex-col gap-3">
              {promises.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3.5 glass rounded-xl px-5 py-4 hover:border-accent/10 transition-all duration-300"
                >
                  <div className="text-warm/60 shrink-0">{item.icon}</div>
                  <div className="text-[13px] text-white/70 font-semibold">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repairServices.map((s) => (
              <div
                key={s.slug}
                className="group glass rounded-2xl p-7 hover:border-accent/15 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-accent/[0.06] border border-accent/[0.1] rounded-xl flex items-center justify-center text-accent/50 mb-4 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                  <ServiceIcon slug={s.slug} size={20} />
                </div>
                <div className="text-[15px] font-bold text-white/75 tracking-tight">
                  {s.shortTitle} Tamiri
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
