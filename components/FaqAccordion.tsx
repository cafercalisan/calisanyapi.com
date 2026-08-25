import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string; icon: LucideIcon };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
    {items.map(({ question, answer, icon: Icon }, index) => <details key={question} className="group bg-white/30 open:bg-white/70">
      <summary className="grid cursor-pointer list-none grid-cols-[44px_1fr_28px] items-center gap-3 px-4 py-5 marker:content-none sm:grid-cols-[58px_1fr_32px] sm:px-6 sm:py-7">
        <span className="grid size-10 place-items-center border border-[var(--line)] text-[var(--teal-dark)] sm:size-12"><Icon size={19}/></span>
        <span><small className="mb-1 block text-[9px] font-bold tracking-[.14em] text-[var(--teal-dark)] uppercase">{String(index + 1).padStart(2, "0")}</small><strong className="font-display text-2xl font-medium sm:text-3xl">{question}</strong></span>
        <ChevronDown className="text-[var(--teal-dark)] transition-transform duration-300 group-open:rotate-180" size={21}/>
      </summary>
      <div className="grid grid-cols-[44px_1fr_28px] gap-3 px-4 pb-6 sm:grid-cols-[58px_1fr_32px] sm:px-6 sm:pb-8"><span/><p className="m-0 max-w-3xl text-sm leading-7 text-[var(--ink-soft)]">{answer}</p></div>
    </details>)}
  </div>;
}
