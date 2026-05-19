"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Elif K.",
    place: "Kadıköy",
    rating: 5,
    text: "Antrasit profil tercih ettim, pencere ile birebir uyum sağladı. Açıkken neredeyse görünmüyor.",
  },
  {
    name: "Mehmet Y.",
    place: "Beşiktaş",
    rating: 5,
    text: "Balkon kapısı için çift kanat plise yaptırdık. Çocuk için bile kullanımı çok kolay, ses yok.",
  },
  {
    name: "Selin A.",
    place: "Şişli",
    rating: 5,
    text: "WhatsApp'tan ölçü gönderdim, 4 günde montaj. Ücretsiz keşif ve fiyat tutarlılığı için teşekkürler.",
  },
  {
    name: "Burak T.",
    place: "Ataşehir",
    rating: 5,
    text: "Pet-proof tül seçtim, kediler artık fileyi tırmalayamıyor. Sağlam ve gerçekten görünmüyor.",
  },
];

const stats = [
  { n: "1.200+", l: "Yıllık üretim" },
  { n: "4.9 / 5", l: "Müşteri puanı" },
  { n: "5 gün", l: "Ortalama montaj" },
  { n: "%98", l: "Tekrar tavsiye oranı" },
];

export default function SocialProof() {
  return (
    <section className="bg-[#0a0e16] py-24 px-5 lg:px-10 relative">
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="max-w-[1180px] mx-auto relative">
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
            Müşterilerimiz
          </div>
          <h2 className="font-display text-white text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-tight">
            Binlerce evde sessizce çalışıyor
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 text-center"
            >
              <div className="font-display text-white font-bold text-[28px] tracking-tight leading-none">
                {s.n}
              </div>
              <div className="text-white/40 text-[11px] mt-2 uppercase tracking-[1.5px]">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6"
            >
              <div className="flex gap-0.5 mb-3 text-accent">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/75 text-[14px] leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="text-white/45 text-[12px] mt-4 font-medium">
                {r.name} · {r.place}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
