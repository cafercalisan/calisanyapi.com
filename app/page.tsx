import { IntroScene } from "@/components/IntroScene";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { getCatalog } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const catalog = await getCatalog();
  return <main><IntroScene/><QuoteBuilder catalog={catalog}/><footer className="bg-[#10191b] px-6 py-10 text-white"><div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-6 md:flex-row"><div><span className="font-display text-3xl">Çalışan Yapı</span><p className="mt-2 text-xs text-white/45">Ölçüye özel sineklik sistemleri · Türkiye geneli teslimat</p></div><div className="text-xs leading-6 text-white/55"><a href="tel:+905393165217">0539 316 52 17</a><br/>İstanbul, Türkiye</div></div></footer></main>;
}
