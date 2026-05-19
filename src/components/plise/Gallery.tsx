"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  galleryImages,
  galleryCategories,
  type GalleryCategory,
} from "@/data/galleryImages";

type Filter = GalleryCategory | "all";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter]
  );

  // Counts per category for badges
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: galleryImages.length };
    for (const g of galleryImages) c[g.category] = (c[g.category] ?? 0) + 1;
    return c;
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, filtered.length]);

  return (
    <section id="galeri" className="bg-[#0a0e16] py-24 px-5 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
      <div className="max-w-[1200px] mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
              Galeri
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,46px)] text-white font-bold leading-[1.1] tracking-tight">
              Ürün ve uygulama görselleri
            </h2>
            <p className="text-white/45 text-[14px] md:text-[15px] mt-4 leading-relaxed">
              Plise, menteşeli ve sürme sineklik sistemlerinden seçilmiş
              örnekler. Görsele tıklayarak yakından inceleyin.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {galleryCategories.map((c) => {
              const active = c.value === filter;
              const count = counts[c.value] ?? 0;
              return (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[12px] font-semibold border transition-all ${
                    active
                      ? "bg-accent text-[#0a0e16] border-accent"
                      : "bg-white/[0.04] text-white/65 border-white/[0.08] hover:text-white hover:border-white/20"
                  }`}
                >
                  {c.label}
                  <span
                    className={`text-[10px] font-bold ${
                      active ? "text-[#0a0e16]/60" : "text-white/40"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((g, i) => (
            <motion.button
              type="button"
              key={g.src}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
              onClick={() => setOpenIdx(i)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] hover:border-accent/40 transition-colors"
            >
              <Image
                src={g.src}
                alt={g.product}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <div className="text-[9.5px] uppercase tracking-[2px] text-accent/80 font-bold">
                  {g.categoryLabel}
                </div>
                <div className="text-[12.5px] text-white font-semibold mt-1 leading-tight">
                  {g.product}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-white/40 py-12 text-[13px]">
            Bu kategoride henüz görsel yok.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIdx !== null && filtered[openIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenIdx(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIdx(null);
              }}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Kapat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIdx((i) =>
                  i === null ? null : (i - 1 + filtered.length) % filtered.length
                );
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Önceki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIdx((i) =>
                  i === null ? null : (i + 1) % filtered.length
                );
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Sonraki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <motion.div
              key={filtered[openIdx].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-[1100px] w-full max-h-[88vh] aspect-[4/5] md:aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[openIdx].src}
                alt={filtered[openIdx].product}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <div className="text-[10px] uppercase tracking-[2px] text-accent/80 font-bold">
                  {filtered[openIdx].categoryLabel}
                </div>
                <div className="text-white text-[14px] font-semibold mt-1">
                  {filtered[openIdx].product}
                </div>
                <div className="text-white/40 text-[11px] mt-0.5">
                  {openIdx + 1} / {filtered.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
