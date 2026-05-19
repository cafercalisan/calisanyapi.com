"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import PliseBackdrop from "./PliseBackdrop";

/**
 * Full-screen video intro. Drop `/public/hero.mp4` to enable the video.
 * If missing, the CSS pleat backdrop is shown as a graceful fallback.
 */
export default function HeroVideo() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0e16]">
      {/* Video layer (graceful: 404 stays invisible thanks to bg) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Pleated-pattern fallback / atmosphere */}
      <div className="absolute inset-0 mix-blend-overlay opacity-60">
        <PliseBackdrop variant="transparent" />
      </div>

      {/* Vignette + dark wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-1.5 mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-[11px] tracking-[2.5px] uppercase text-white/80 font-semibold">
            Plise Sineklik · Üretim & Montaj
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-white font-bold leading-[1.02] tracking-tight text-[clamp(40px,7.5vw,96px)] max-w-[14ch]"
        >
          Sessizce kapanan,
          <br />
          <span className="text-accent">huzurla</span> açılan
          <br />
          plise sineklik.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/65 text-[15px] md:text-[17px] mt-7 max-w-[50ch] leading-relaxed"
        >
          Ölçünüze özel üretim, 5 iş gününde montaj. Aşağı kaydırın — kapı
          açıldığında sizi yapılandırma ekranı karşılayacak.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex gap-3 flex-wrap justify-center mt-9"
        >
          <a href="#yapilandir" className="btn-primary">
            Ölçü Ver, Fiyat Al
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            WhatsApp ile Görüş
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/55"
      >
        <span className="text-[10px] uppercase tracking-[3px]">Aşağı kaydır</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
