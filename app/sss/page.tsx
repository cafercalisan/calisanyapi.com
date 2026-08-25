import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Camera, CircleHelp, Clock3, CreditCard, MapPinned, Ruler, ShieldCheck, Wrench } from "lucide-react";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "Sık Sorulan Sorular", description: "PVC kapı-pencere, cam balkon, sineklik ve yapı uygulamalarında keşif, ölçü, fiyat, montaj ve garanti hakkında sık sorulan sorular.", alternates: { canonical: "/sss" } };

const items: FaqItem[] = [
  { icon: Camera, question: "Fotoğrafla yaklaşık fiyat alabilir miyim?", answer: "Evet. Alanın tamamını, bağlantı yüzeylerini ve mevcut kapı veya pencereyi gösteren fotoğraflar ilk değerlendirmeyi hızlandırır. Kesin fiyat; ölçü, ürün seçimi ve montaj koşulları doğrulandıktan sonra yazılı olarak paylaşılır." },
  { icon: Ruler, question: "Kesin ölçüyü benim almam gerekiyor mu?", answer: "Hayır. Formda yaklaşık ölçü vermeniz yeterlidir. Üretime girecek PVC, cam balkon veya sineklik gibi ölçüye özel sistemlerde kesin ölçü ekip tarafından doğrulanır." },
  { icon: Wrench, question: "Montaj ve eski sistemin sökümü fiyata dahil mi?", answer: "Söküm, yüzey hazırlığı, taşıma ve montaj kapsamı her işte değişebilir. Bu kalemler alan görüldükten sonra teklifte ayrı ve açık biçimde belirtilir." },
  { icon: Clock3, question: "Talebime ne zaman dönüş yapılır?", answer: "Mesai saatlerinde gelen taleplere aynı iş günü içinde dönüş yapmayı hedefliyoruz. Yoğunluk veya teknik inceleme gerektiren projelerde ilk bilgilendirme sonrasında keşif zamanı planlanır." },
  { icon: MapPinned, question: "İstanbul'un hangi ilçelerine hizmet veriyorsunuz?", answer: "İstanbul’un 39 ilçesinde planlı keşif ve uygulama yapıyoruz. Ekip ve uygulama tarihi; işin türüne, ilçeye ve mevcut programa göre netleştirilir." },
  { icon: ShieldCheck, question: "Garanti ve servis koşulları nasıl belirlenir?", answer: "Garanti kapsamı kullanılan sistem, ürün ve üretici koşullarına göre değişir. Teklif ve sözleşme aşamasında ürün, işçilik ve servis kapsamı açıkça belirtilir." },
  { icon: CreditCard, question: "Ödeme seçenekleri nelerdir?", answer: "Ödeme planı işin kapsamı ve uygulama takvimine göre teklif aşamasında belirlenir. Kart veya taksit seçeneği varsa, işlem öncesinde koşulları ayrıca paylaşılır." },
  { icon: CircleHelp, question: "Hangi sistemi seçmem gerektiğini bilmiyorum; yine de form gönderebilir miyim?", answer: "Evet. Teknik ürün adını bilmeniz gerekmez. Yapılacak alanı ve beklentinizi anlatmanız yeterlidir; ekip seçenekleri kullanım biçiminize göre açık bir dille karşılaştırır." },
];

export default function FaqPage(){return <><SiteHeader/><main className="inner-page"><section className="page-hero technical-paper"><p className="kicker">Açık cevaplar</p><h1 className="font-display">Aklınızdaki soruyu,<br/><em>iş başlamadan yanıtlayalım.</em></h1><p>Keşif, yaklaşık fiyat, ölçü, ürün seçimi ve montaj sürecinde en çok sorulan sorular.</p></section><section className="mx-auto max-w-[1180px] px-5 pb-24 sm:px-8 lg:pb-36"><FaqAccordion items={items}/><div className="mt-12 flex flex-col items-start justify-between gap-6 bg-[var(--ink)] p-6 text-white sm:flex-row sm:items-center sm:p-9"><div><p className="kicker light">Sorunuz burada yok mu?</p><h2 className="font-display mt-2 text-4xl font-medium">Alanı gösterin, birlikte bakalım.</h2></div><Link href="/teklif-al" className="btn-accent">Fotoğrafla fiyat iste <ArrowUpRight size={17}/></Link></div></section></main><SiteFooter/></>}
