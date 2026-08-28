"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, CircleHelp, Menu, Phone, ShieldCheck, UsersRound, X } from "lucide-react";
import { services, site } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Çalışan Yapı ana sayfa">
        <Image src="/brand/calisan-yapi-logo-header.webp" alt="Çalışan Yapı" width={900} height={160}/>
      </Link>
      <nav aria-label="Ana menü">
        <div className="nav-services"><Link href="/hizmetler">Hizmetler</Link><div className="nav-popover">{services.map((service) => <Link key={service.slug} href={`/hizmetler/${service.slug}`}>{service.name}<ArrowUpRight size={14}/></Link>)}</div></div>
        <Link href="/istanbul">Hizmet Bölgeleri</Link>
        <Link href="/projeler">Projeler</Link>
        <Link href="/blog">Rehber</Link>
        <div className="nav-services"><Link href="/kurumsal">Kurumsal</Link><div className="nav-popover nav-corporate-popover"><Link href="/kurumsal"><Building2 size={15}/>Kurumsal<ArrowUpRight size={14}/></Link><Link href="/hakkimizda"><UsersRound size={15}/>Hakkımızda<ArrowUpRight size={14}/></Link><Link href="/sss"><CircleHelp size={15}/>Sık sorulan sorular<ArrowUpRight size={14}/></Link><Link href="/gizlilik"><ShieldCheck size={15}/>Gizlilik ve KVKK<ArrowUpRight size={14}/></Link></div></div>
      </nav>
      <div className="header-actions"><a className="phone-link" href={`tel:${site.phone}`} aria-label={`${site.phoneLabel} numarasını ara`}><span aria-hidden="true">🇹🇷</span><span className="phone-country">+90</span><Phone size={15}/><span className="phone-number">{site.phoneLabel}</span></a><button type="button" className="menu-toggle" aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
      <nav aria-label="Mobil menü">
        <Link href="/hizmetler" onClick={() => setMenuOpen(false)}>Tüm hizmetler <ArrowUpRight/></Link>
        <div className="mobile-service-links">{services.map(service => <Link key={service.slug} href={`/hizmetler/${service.slug}`} onClick={() => setMenuOpen(false)}>{service.name}</Link>)}</div>
        <Link href="/istanbul" onClick={() => setMenuOpen(false)}>Hizmet bölgeleri <ArrowUpRight/></Link>
        <Link href="/projeler" onClick={() => setMenuOpen(false)}>Projeler <ArrowUpRight/></Link>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>Yapı rehberi <ArrowUpRight/></Link>
        <Link href="/kurumsal" onClick={() => setMenuOpen(false)}>Kurumsal <ArrowUpRight/></Link>
        <Link href="/sss" onClick={() => setMenuOpen(false)}>Sık sorulan sorular <ArrowUpRight/></Link>
        <Link href="/hakkimizda" onClick={() => setMenuOpen(false)}>Hakkımızda <ArrowUpRight/></Link>
      </nav>
      <a className="mobile-menu-phone" href={`tel:${site.phone}`}><Phone/> Hemen arayın · {site.phoneLabel}</a>
    </div>
    <aside className="mobile-conversion-bar" aria-label="Hızlı iletişim">
      <a href={`tel:${site.phone}`}><Phone/><span>Ara</span></a>
      <Link href="/teklif-al"><span>Fiyat iste</span><ArrowUpRight/></Link>
    </aside>
  </>;
}
