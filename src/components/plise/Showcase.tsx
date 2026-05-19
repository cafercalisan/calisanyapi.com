"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "İnce akordeon kıvrım",
    body: "Açıkken neredeyse görünmez; manzaranızı bozmaz, ışığı kesmez.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4v16M7 4v16M11 4v16M15 4v16M19 4v16M23 4v16" />
      </svg>
    ),
  },
  {
    title: "Tek elle açılıp kapanır",
    body: "Yumuşak yaylı mekanizma sayesinde çocuk-dostu, sessiz kullanım.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11V6a3 3 0 0 1 6 0v5" />
        <path d="M5 11h14l-1 11H6z" />
      </svg>
    ),
  },
  {
    title: "Ölçüye özel üretim",
    body: "Pencere, kapı veya çatı; her ölçüde milimetrik hassasiyetle üretilir.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    title: "Dayanıklı alüminyum",
    body: "Elektrostatik boyalı profil; UV ve neme karşı renk solmaz.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Sinek, sivrisinek, polen",
    body: "Mikro mesh ve pet-proof seçenekleriyle tüm böcekler dışarıda.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    ),
  },
  {
    title: "5 iş gününde montaj",
    body: "Sipariş onayından kuruluma kadar tek ekipten süreç takibi.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Showcase() {
  return (
    <section className="bg-[#0a0e16] py-24 px-5 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
      <div className="max-w-[1180px] mx-auto relative">
        <div className="max-w-[640px] mb-14">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
            Neden Plise
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,46px)] text-white font-bold leading-[1.1] tracking-tight">
            Klasik sineklik değil.
            <br />
            <span className="text-white/50">Yaşamınızın bir parçası.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:border-accent/30 hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center text-accent mb-4">
                {f.icon}
              </div>
              <div className="font-display text-white font-bold text-[17px] tracking-tight">
                {f.title}
              </div>
              <p className="text-white/45 text-[13px] leading-relaxed mt-2">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
