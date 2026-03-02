"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary/90 backdrop-blur-sm border-b border-white/[0.04] py-2 px-3 sm:px-5">
        <div className="hidden sm:flex max-w-[1200px] mx-auto items-center justify-center gap-6 text-[11px] text-white/40 tracking-wide font-medium">
          <span>Pzt — Paz 08:00 — 20:00</span>
          <span className="w-px h-3 bg-white/[0.06]" />
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="text-accent font-semibold no-underline hover:text-accent-light transition-colors"
          >
            {siteConfig.phone}
          </a>
        </div>
        <div className="flex sm:hidden items-center justify-center gap-3 text-[10px] text-white/40 tracking-wide">
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-accent font-semibold no-underline text-[10.5px]">
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="glass border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-5 lg:px-10 py-3 max-w-[1200px] mx-auto">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 group-hover:border-accent/30 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="font-display text-[19px] text-white font-bold leading-none tracking-tight">
                {siteConfig.name}
              </div>
              <div className="text-[9px] text-accent/50 tracking-[3px] uppercase mt-0.5 font-semibold">
                Doğrama & Cam
              </div>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 list-none">
            {[
              { label: "Hizmetler", href: "/#hizmetler" },
              { label: "Tamir", href: "/#tamir" },
              { label: "Bölgeler", href: "/#ilceler" },
              { label: "Hakkımızda", href: "/#neden-biz" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/50 no-underline px-4 py-2 rounded-lg text-[13px] font-medium hover:text-accent hover:bg-white/[0.04] transition-all duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="btn-primary !py-2.5 !px-6 !text-[13px]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Hemen Arayın
              </a>
            </li>
          </ul>

          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="lg:hidden btn-primary !py-2.5 !px-5 !text-[12px]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Ara
          </a>
        </div>
      </nav>
    </header>
  );
}
