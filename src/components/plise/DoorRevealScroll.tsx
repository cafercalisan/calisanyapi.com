"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PliseBackdrop from "./PliseBackdrop";

/**
 * Two plise panels slide apart as the user scrolls, revealing the
 * interior message + CTA behind. Pattern: sticky stage anchored to a
 * tall outer container so scroll progress maps 1:1 to the open angle.
 */
export default function DoorRevealScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Panels close-to-open between 25% and 70% of progress
  const leftX = useTransform(scrollYProgress, [0.25, 0.7], ["0%", "-105%"]);
  const rightX = useTransform(scrollYProgress, [0.25, 0.7], ["0%", "105%"]);
  // Interior fades + scales in as panels move
  const innerOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const innerScale = useTransform(scrollYProgress, [0.35, 0.75], [0.92, 1]);
  // Caption hint disappears once doors open
  const hintOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0e16] h-[260vh]"
      aria-label="Plise sineklik kapı açılış demosu"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Interior: living room scene — clean, airy */}
        <motion.div
          style={{ opacity: innerOpacity, scale: innerScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f3ec] via-[#eee8dc] to-[#e1d9c8]" />
          {/* Soft window light streaks */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,255,255,0.7)_0%,transparent_70%)]" />
          {/* Wood floor hint */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#c8a988]/40 to-transparent" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0a0e16]/8 border border-[#0a0e16]/10 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[11px] tracking-[2.5px] uppercase text-[#0a0e16]/70 font-semibold">
                İçeride sizi bekleyen şey
              </span>
            </div>
            <h2 className="font-display text-[clamp(34px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight text-[#0a0e16] max-w-[16ch]">
              Ferah bir oda.
              <br />
              <span className="text-accent">Sıfır sinek.</span>
            </h2>
            <p className="text-[#0a0e16]/60 text-[15px] md:text-[17px] mt-6 max-w-[46ch] leading-relaxed">
              Plise sistemimiz ince akordeon kıvrımlarıyla manzaraya engel
              olmadan tüm böcekleri dışarıda tutar. Tek elle açılır, kendi
              kendine kapanır.
            </p>
            <a href="#yapilandir" className="btn-primary mt-9 !bg-[#0a0e16] !text-white">
              Ölçü Vererek Başla
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Left door panel */}
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 w-1/2 z-10 will-change-transform"
        >
          <PliseBackdrop variant="solid" side="left" />
        </motion.div>

        {/* Right door panel */}
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 w-1/2 z-10 will-change-transform"
        >
          <PliseBackdrop variant="solid" side="right" />
        </motion.div>

        {/* Hint over the closed doors */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-1.5 mb-4">
              <span className="text-[11px] tracking-[2.5px] uppercase text-white/80 font-semibold">
                Kaydırarak Açın
              </span>
            </div>
            <div className="font-display text-white text-[clamp(28px,4vw,44px)] font-bold tracking-tight">
              Kapıyı sizin için açıyoruz
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="mt-5 inline-block"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Door frame highlight */}
        <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-b from-white/10 via-white/[0.02] to-white/10 z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[6px] bg-gradient-to-b from-white/10 via-white/[0.02] to-white/10 z-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-white/10 via-white/[0.02] to-white/10 z-20 pointer-events-none" />
      </div>
    </section>
  );
}
