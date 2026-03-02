import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "./ServiceIcon";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}`}
      className="group relative bg-surface-card rounded-2xl overflow-hidden border border-edge hover:border-accent/20 transition-all duration-500 no-underline block"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,212,255,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        <div className="w-12 h-12 bg-accent/[0.08] border border-accent/[0.12] rounded-xl flex items-center justify-center text-accent/60 mb-6 group-hover:text-accent group-hover:border-accent/25 group-hover:bg-accent/[0.12] transition-all duration-500">
          <ServiceIcon slug={service.slug} />
        </div>
        <h3 className="text-[16px] font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 tracking-tight">
          {service.title}
        </h3>
        <p className="text-[13px] text-white/30 leading-relaxed mb-6 line-clamp-2">
          {service.description}
        </p>
        <span className="text-accent/60 text-[13px] font-medium inline-flex items-center gap-2 group-hover:gap-3 group-hover:text-accent transition-all duration-300">
          Detaylı Bilgi
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
