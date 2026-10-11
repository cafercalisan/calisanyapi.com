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
    <main className="bg-[var(--paper)]">
      <section className="technical-paper px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16 lg:px-[7vw]">
        <div className="mx-auto max-w-[1500px]">
          <p className="kicker">SİNEKLİK MODELLERİ · 3D İNCELEME</p>
          <h1 className="font-display max-w-5xl text-5xl leading-[.9] font-medium tracking-[-.05em] sm:text-7xl lg:text-8xl">Modeli çevirin,<br/><em className="font-normal text-[var(--teal)]">size uyanı seçin.</em></h1>
          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-xl text-sm leading-7 text-[var(--ink-soft)]">Menteşeli ve plise sinekliği üç boyutlu görünümde inceleyin. Uygulama alanını, profil rengini ve yaklaşık ölçüyü değiştirerek modelin nasıl görüneceğini keşfedin.</p>
            <a href="#model" className="inline-flex min-h-12 items-center gap-5 border-b border-[var(--line)] text-xs font-bold text-[var(--ink)]">3D modeli incele <ArrowDown size={16}/></a>
          </div>
        </div>
      </section>
      <div id="model"><Sineklik3DConfigurator/></div>
      <section className="bg-[var(--ink)] px-5 py-16 text-white sm:px-8 lg:px-[7vw] lg:py-20">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="kicker light">3D ÖN İZLEME</p><h2 className="font-display max-w-3xl text-4xl leading-[.93] font-medium tracking-[-.045em] sm:text-6xl">Ekranda seçin,<br/><em className="font-normal text-[#9cebe6]">ölçünüzle teklife geçin.</em></h2></div>
          <p className="flex max-w-sm items-start gap-3 text-xs leading-6 text-white/60"><Rotate3D className="mt-1 shrink-0 text-[var(--teal)]" size={17}/> Modeli fareyle veya parmağınızla döndürebilir, yakınlaştırabilirsiniz. Hareketli açılım için model panelindeki düğmeyi kullanın.</p>
        </div>
        <div className="mx-auto mt-9 max-w-[1500px] border-t border-white/15 pt-5 text-[10px] leading-5 text-white/45"><Check className="mr-2 inline-block text-[var(--teal)]" size={14}/>3D görünüm ölçüye ve seçime göre şekillenen temsili bir modeldir. Kesin profil ve uygulama detayları ölçü kontrolünde netleştirilir.</div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
