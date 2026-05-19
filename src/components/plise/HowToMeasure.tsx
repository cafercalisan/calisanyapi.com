"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Pencereyi temizleyin",
    body: "Profil etrafındaki çıtaları ve eski sineklik izlerini temizleyin. Metreyle ölçmeye hazır hale getirin.",
  },
  {
    n: "02",
    title: "Genişliği üç noktadan ölçün",
    body: "Üst, orta ve alttan ölçün; en küçük değeri esas alın. Plise için ~3 cm yan boşluk gerekir.",
  },
  {
    n: "03",
    title: "Yüksekliği iki kenardan ölçün",
    body: "Sol ve sağ kenardan iç netten ölçün; küçük değeri kullanın. Eşik varsa hesaba katın.",
  },
  {
    n: "04",
    title: "Bize iletin",
    body: "Ölçüleri yapılandırıcıya girin veya WhatsApp ile fotoğrafla paylaşın. Aynı gün dönüş yaparız.",
  },
];

export default function HowToMeasure() {
  return (
    <section id="olcu-alma" className="bg-[#f6f3ec] py-24 px-5 lg:px-10">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
              Ölçü Alma Rehberi
            </div>
            <h2 className="font-display text-[#0a0e16] text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-tight">
              4 adımda doğru ölçü
            </h2>
            <p className="text-[#0a0e16]/55 text-[14px] md:text-[15px] mt-5 leading-relaxed max-w-[44ch]">
              Yanlış ölçü, en sık karşılaşılan sipariş hatasıdır. Aşağıdaki
              kısa rehber 2 dakikada doğru ölçüyü almanızı sağlar.
            </p>
            <div className="mt-7 rounded-2xl bg-white border border-[#0a0e16]/[0.06] p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-accent font-bold mb-2">
                Emin değilseniz
              </div>
              <p className="text-[#0a0e16]/65 text-[13px] leading-relaxed">
                Ücretsiz keşif ekibimiz adresinize gelir, ölçüyü milimetrik
                alır ve yerinde fiyat verir. Hiçbir ücret talep edilmez.
              </p>
              <a
                href="#yapilandir"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#0a0e16] underline underline-offset-4 decoration-accent decoration-2"
              >
                Önce yapılandırıcıyı doldurun
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-5 rounded-2xl bg-white border border-[#0a0e16]/[0.06] p-5 md:p-6"
              >
                <div className="flex-none font-display text-accent text-[44px] font-bold leading-none tracking-tight">
                  {s.n}
                </div>
                <div>
                  <div className="font-display text-[#0a0e16] font-bold text-[18px] tracking-tight">
                    {s.title}
                  </div>
                  <p className="text-[#0a0e16]/55 text-[13.5px] leading-relaxed mt-1.5">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
