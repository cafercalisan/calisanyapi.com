"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Plise sineklik nedir, klasik sineklikten farkı nedir?",
    a: "Plise sineklik, akordeon gibi katlanan bir tül sistemidir. Klasik rulo veya kanatlı sinekliklerden farklı olarak; açıkken görünmez, alanı engellemez, hem dar hem büyük açıklıklara uygulanabilir. Yumuşak yaylı mekanizması sayesinde sessiz ve çocuk dostudur.",
  },
  {
    q: "Hangi ölçülere kadar üretilebilir?",
    a: "Pencere plise için 200×200 cm, kapı plise için 200×300 cm'e kadar tek kanat üretim yapıyoruz. Daha büyük açıklıklarda çift kanat çözüm öneririz. Çatı pencereleri için 180×200 cm üst limittir.",
  },
  {
    q: "Profil renkleri neler? Pencere rengime uyar mı?",
    a: "Standart olarak beyaz, antrasit, kahve ve siyah seçenekleri stokta. RAL kataloğundaki özel renkler 7 iş günü ek süreyle üretilebilir. Doğrama renginize göre tavsiyemizi WhatsApp'tan paylaşırız.",
  },
  {
    q: "Tül çeşitleri arasında ne fark var?",
    a: "Standart tül günlük kullanım için yeterlidir; sinek, sivrisinek, polen geçirmez. Pet-Proof tül evcil hayvanların pençelerine dayanır. Mikro Mesh ise çok sık dokumalı olup en küçük böcekleri bile geçirmez.",
  },
  {
    q: "Fiyat hesaplama nasıl çalışıyor?",
    a: "Yapılandırıcıdaki fiyat, m² bazlı tahmini fiyattır ve KDV dahildir. Net fiyat, ücretsiz keşif sonrası ölçüler doğrulanınca verilir. Hesaplamanın altında kalan veya stoklu üretimler için indirim uygulanabilir.",
  },
  {
    q: "Montaj kaç gün sürer?",
    a: "Sipariş onayından itibaren ortalama 5 iş günü içinde üretim ve montaj tamamlanır. Montaj 30–60 dakika sürer, hiçbir kırma-yıkma yapılmaz. Eski sineklik varsa sökümü de biz yaparız.",
  },
  {
    q: "Garanti şartları nedir?",
    a: "Profil ve mekanizmada 2 yıl, tül kumaşta 1 yıl garanti veriyoruz. Garanti dahilinde tüm parçalar ücretsiz değiştirilir. Doğal aşınma veya hatalı kullanım garanti dışıdır.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#f6f3ec] py-24 px-5 lg:px-10">
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
            Sık Sorulan Sorular
          </div>
          <h2 className="font-display text-[#0a0e16] text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] tracking-tight">
            Aklınızdaki soruların cevabı
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <div
                key={f.q}
                className="rounded-2xl bg-white border border-[#0a0e16]/[0.06] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                >
                  <span className="font-display text-[#0a0e16] font-semibold text-[15px] md:text-[16px] tracking-tight">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-none w-8 h-8 rounded-full bg-[#0a0e16]/[0.04] flex items-center justify-center text-[#0a0e16]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 text-[#0a0e16]/65 text-[13.5px] leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
