import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  MapPinned,
  Ruler,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "Çalışan Yapı'nın 20 yıllık PVC tecrübesini, uzman uygulama ekiplerini, keşif ve montaj yaklaşımını inceleyin.",
  alternates: { canonical: "/kurumsal" },
};
const values = [
  {
    icon: BadgeCheck,
    title: "20 yıllık saha tecrübesi",
    text: "PVC kapı ve pencere uygulamalarından gelen ölçü, yalıtım ve montaj birikimi.",
  },
  {
    icon: UsersRound,
    title: "İşe göre uzman ekip",
    text: "PVC, cam, metal, tavan ve dış mekân işleri ilgili uygulama tecrübesine sahip ekiplerle yürütülür.",
  },
  {
    icon: ShieldCheck,
    title: "Açık kapsam",
    text: "Ürün, söküm, montaj ve uygulama koşulları işe başlamadan önce teklif içinde netleştirilir.",
  },
  {
    icon: MapPinned,
    title: "İstanbul genelinde",
    text: "39 ilçede iş türüne ve programa göre planlanan keşif ve uygulama desteği.",
  },
];
const steps = [
  {
    icon: Camera,
    title: "Alanı gönderin",
    text: "Hizmeti seçin; yaklaşık ölçü ve alan fotoğraflarını paylaşın.",
  },
  {
    icon: Ruler,
    title: "Uygunluğu netleştirelim",
    text: "Ekip kullanım biçimini, ölçüyü ve montaj yüzeyini değerlendirsin.",
  },
  {
    icon: Wrench,
    title: "Planlı uygulama",
    text: "Yazılı kapsam onayından sonra üretim ve montaj takvimi oluşturulsun.",
  },
];
export default function CorporatePage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <section className="page-hero technical-paper">
          <p className="kicker">Kurumsal</p>
          <h1 className="font-display">
            PVC’den bütün yapıya,
            <br />
            <em>aynı ustalık disiplini.</em>
          </h1>
          <p>
            Çalışan Yapı, 20 yıllık PVC uygulama tecrübesini her biri kendi alanında
            güçlü ekiplerle birleştirir; müşteriyi ihtiyaç duyduğu çözüme ve
            yaklaşık fiyat sürecine hızlıca ulaştırır.
          </p>
        </section>
        <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-px bg-[var(--line)] px-5 py-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-[7vw] lg:py-28">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-[var(--paper)] p-6 sm:p-8">
              <Icon className="text-[var(--teal-dark)]" />
              <h2 className="font-display mt-10 text-3xl font-medium">
                {title}
              </h2>
              <p className="mt-4 text-xs leading-6 text-[var(--ink-soft)]">
                {text}
              </p>
            </article>
          ))}
        </section>
        <section className="technical-paper px-5 py-20 sm:px-8 lg:px-[7vw] lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 grid gap-7 lg:grid-cols-2">
              <div>
                <p className="kicker">Çalışma biçimimiz</p>
                <h2 className="font-display text-5xl leading-[.9] font-medium sm:text-7xl">
                  Üç açık adım,
                  <br />
                  <em className="font-normal text-[var(--teal)]">
                    tek sorumlu süreç.
                  </em>
                </h2>
              </div>
              <p className="max-w-lg self-end text-sm leading-7 text-[var(--ink-soft)]">
                Teknik ürün adını bilmeniz gerekmez. Önce alanı ve ihtiyacı
                anlar, doğru sistemi ve ekibi birlikte belirleriz.
              </p>
            </div>
            <div className="grid gap-px bg-[var(--line)] md:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="bg-white/45 p-7">
                  <span className="text-[10px] font-bold text-[var(--teal-dark)]">
                    0{index + 1}
                  </span>
                  <Icon className="mt-12 text-[var(--teal-dark)]" />
                  <h3 className="font-display mt-5 text-3xl font-medium">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-[var(--ink-soft)]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
            <Link href="/teklif-al" className="btn-primary mt-10">
              Fotoğrafla yaklaşık fiyat iste <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
