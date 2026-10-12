import type { Metadata } from "next";
import { ArrowDown, Check, Rotate3D } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Sineklik3DConfigurator } from "@/components/Sineklik3DConfigurator";

export const metadata: Metadata = {
  title: "Sineklik Modellerini 3D İncele | Çalışan Yapı",
  description: "Pencere ve kapı sinekliklerini 3D olarak döndürerek inceleyin. Menteşeli veya plise modeli seçin; renk ve ölçüyü değiştirip teklif akışına geçin.",
  alternates: { canonical: "/sineklik-modelleri" },
  openGraph: { title: "Sineklik Modellerini 3D İncele", description: "Menteşeli ve plise sinekliği etkileşimli 3D ön izlemede inceleyin.", url: "/sineklik-modelleri", images: [{ url: "/services/sineklik-v2.webp", alt: "Kapı ve pencere sineklik modeli" }] },
};

export default function SineklikModelleriPage() {
  return <>
    <SiteHeader/>
    <main className="bg-[var(--paper)] flyscreen-model-page">
      <section className="technical-paper px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16 lg:px-[7vw] flyscreen-model-intro">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
          <div>
          <p className="kicker">SİNEKLİK MODELLERİ · 3D İNCELEME</p>
          <h1 className="font-display max-w-5xl text-5xl leading-[.9] font-medium tracking-[-.05em] sm:text-7xl lg:text-8xl">Modeli çevirin,<br/><em className="font-normal text-[var(--teal)]">size uyanı seçin.</em></h1>
          </div>
          <div className="border-t border-[var(--line)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="max-w-xl text-sm leading-7 text-[var(--ink-soft)]">Menteşeli ve plise modellerini 3D olarak inceleyin; rengi ve ölçüyü belirleyip hareketli açılımı deneyin.</p>
            <ol className="mt-5 grid grid-cols-3 gap-2 text-[10px] font-bold text-[var(--ink)] sm:gap-4">
              <li className="border-t border-[var(--line)] pt-3"><span className="mb-2 block text-[var(--teal)]">01</span>Modelini seç</li>
              <li className="border-t border-[var(--line)] pt-3"><span className="mb-2 block text-[var(--teal)]">02</span>Ölçünü gir</li>
              <li className="border-t border-[var(--line)] pt-3"><span className="mb-2 block text-[var(--teal)]">03</span>Açılımı dene</li>
            </ol>
            <a href="#model" className="mt-6 inline-flex min-h-12 items-center gap-5 bg-[var(--ink)] px-5 text-xs font-bold text-white">3D modeli incele <ArrowDown size={16}/></a>
          </div>
        </div>
      </section>
      <div id="model" className="flyscreen-model-config"><Sineklik3DConfigurator/></div>
      <section className="bg-[var(--ink)] px-5 py-16 text-white sm:px-8 lg:px-[7vw] lg:py-20">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="kicker light">3D ÖN İZLEME · KULLANIM ALANLARI</p><h2 className="font-display max-w-3xl text-4xl leading-[.93] font-medium tracking-[-.045em] sm:text-6xl">3 boyutlu ön izlemeyle<br/><em className="font-normal text-[#9cebe6]">ürünü ve kullanımını inceleyin.</em></h2></div>
          <p className="flex max-w-sm items-start gap-3 text-xs leading-6 text-white/60"><Rotate3D className="mt-1 shrink-0 text-[var(--teal)]" size={17}/> Modeli fareyle veya parmağınızla döndürün. Plise tutma profilini doğrudan sürükleyerek açıp kapatabilirsiniz.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1500px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article className="border border-white/15 bg-white/[.04] p-5 sm:p-6"><p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#9cebe6]">SABİT SİNEKLİK</p><h3 className="font-display text-2xl">Sürekli açık kalan alanlar</h3><p className="mt-3 text-xs leading-6 text-white/60">Zor erişilen veya havalandırma için sürekli açık tutulan pencere boşluklarında, yerinden oynamayan pratik koruma.</p></article>
          <article className="border border-white/15 bg-white/[.04] p-5 sm:p-6"><p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#9cebe6]">PLİSE SİSTEM</p><h3 className="font-display text-2xl">Yerden tasarruf, modern görünüm</h3><p className="mt-3 text-xs leading-6 text-white/60">Kullanılmadığında yana katlanan tül, pencere ve kapı geçişlerinde alanı boş bırakır.</p></article>
          <article className="border border-white/15 bg-white/[.04] p-5 sm:col-span-2 sm:p-6 lg:col-span-1"><p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#9cebe6]">GENİŞ AÇIKLIKLAR</p><h3 className="font-display text-2xl">Ortada buluşan çift sürme</h3><p className="mt-3 text-xs leading-6 text-white/60">Geniş alanlarda çerçeve içindeki iki plise kanat, sağ ve soldaki boydan boya tutma profillerinden çekilerek ortada birleşir.</p></article>
        </div>
        <div className="mx-auto mt-8 max-w-[1500px] border-t border-white/15 pt-5 text-[10px] leading-5 text-white/45"><Check className="mr-2 inline-block text-[var(--teal)]" size={14}/>3D görünüm ölçüye ve seçime göre şekillenen temsili bir modeldir. Kesin profil ve uygulama detayları ölçü kontrolünde netleştirilir.</div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
