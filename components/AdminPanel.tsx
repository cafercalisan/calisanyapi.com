"use client";
import { useMemo, useState } from "react";
import {
  ExternalLink,
  Images,
  PackageSearch,
  Phone,
  Search,
  Settings2,
} from "lucide-react";
import { formatMoney } from "@/lib/pricing";
import type { Catalog } from "@/lib/types";

const statusLabels: Record<string, string> = {
  new: "Yeni",
  contacted: "İletişime geçildi",
  verified: "Ölçü doğrulandı",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  cancelled: "İptal",
};
type Quote = Record<string, unknown> & {
  id: string;
  reference: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  total: number;
  city: string;
  district: string;
  created_at: string;
  quote_items?: Array<Record<string, unknown>>;
};
type ServiceLead = Record<string, unknown> & {
  id: string;
  reference: string;
  status: string;
  service_slug: string;
  district: string;
  description: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  photo_paths?: string[];
  created_at: string;
};
export function AdminPanel({
  initialQuotes,
  initialRequests,
  catalog,
}: {
  initialQuotes: Quote[];
  initialRequests: ServiceLead[];
  catalog: Catalog;
}) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Quote | null>(
    initialQuotes[0] || null,
  );
  const [tab, setTab] = useState<"requests" | "quotes" | "catalog">("requests");
  const filtered = useMemo(
    () =>
      quotes.filter((q) =>
        `${q.reference} ${q.customer_name} ${q.customer_phone}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [quotes, query],
  );
  const setStatus = async (id: string, status: string) => {
    const r = await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (r.ok) {
      setQuotes((q) => q.map((x) => (x.id === id ? { ...x, status } : x)));
      setSelected((s) => (s?.id === id ? { ...s, status } : s));
    }
  };
  return (
    <main className="min-h-screen bg-[#e9e5dc]">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-[var(--ink)] px-5 py-4 text-white md:px-8">
        <div>
          <span className="font-display text-2xl">Çalışan Yapı</span>
          <span className="ml-3 text-[9px] uppercase tracking-[.18em] text-white/40">
            Yönetim
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTab("requests")}
            className={`px-3 py-2 text-xs ${tab === "requests" ? "bg-white text-[var(--ink)]" : "text-white/60"}`}
          >
            <Images className="mr-2 inline" size={14} />
            Hizmet talepleri
          </button>
          <button
            onClick={() => setTab("quotes")}
            className={`px-3 py-2 text-xs ${tab === "quotes" ? "bg-white text-[var(--ink)]" : "text-white/60"}`}
          >
            <PackageSearch className="mr-2 inline" size={14} />
            Sineklik teklifleri
          </button>
          <button
            onClick={() => setTab("catalog")}
            className={`px-3 py-2 text-xs ${tab === "catalog" ? "bg-white text-[var(--ink)]" : "text-white/60"}`}
          >
            <Settings2 className="mr-2 inline" size={14} />
            Ürünler
          </button>
          <form action="/api/admin/logout" method="post">
            <button className="px-3 py-2 text-xs text-white/50">Çıkış</button>
          </form>
        </div>
      </header>
      {tab === "catalog" ? (
        <CatalogEditor catalog={catalog} />
      ) : tab === "requests" ? (
        <ServiceRequestInbox initial={requests} onChange={setRequests} />
      ) : (
        <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[380px_1fr]">
          <aside className="border-r border-black/10 bg-white/45 p-4">
            <label className="relative block">
              <Search
                className="absolute left-3 top-3 text-black/35"
                size={16}
              />
              <input
                className="field pl-10"
                placeholder="Teklif, müşteri veya telefon ara"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="mt-4 space-y-2">
              {filtered.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className={`w-full border p-4 text-left ${selected?.id === q.id ? "border-[var(--teal-dark)] bg-white" : "border-black/10 bg-white/30"}`}
                >
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-[.12em] text-[var(--teal-dark)]">
                    <span>{q.reference}</span>
                    <span>{statusLabels[q.status]}</span>
                  </div>
                  <strong className="mt-2 block text-sm">
                    {q.customer_name}
                  </strong>
                  <div className="mt-1 flex justify-between text-xs text-black/45">
                    <span>
                      {q.district}, {q.city}
                    </span>
                    <b>{formatMoney(Number(q.total))}</b>
                  </div>
                </button>
              ))}
            </div>
          </aside>
          <section className="p-5 md:p-9">
            {selected ? (
              <QuoteDetail quote={selected} setStatus={setStatus} />
            ) : (
              <p>Henüz teklif yok.</p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function ServiceRequestInbox({
  initial,
  onChange,
}: {
  initial: ServiceLead[];
  onChange: (items: ServiceLead[]) => void;
}) {
  const [selected, setSelected] = useState<ServiceLead | null>(
    initial[0] || null,
  );
  const leadStatuses: Record<string, string> = {
    new: "Yeni",
    contacted: "Ulaşıldı",
    quoted: "Teklif verildi",
    won: "Kazanıldı",
    lost: "Kaybedildi",
  };
  async function update(status: string) {
    if (!selected) return;
    const r = await fetch("/api/admin/service-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, status }),
    });
    if (r.ok) {
      const next = initial.map((x) =>
        x.id === selected.id ? { ...x, status } : x,
      );
      onChange(next);
      setSelected({ ...selected, status });
    }
  }
  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[380px_1fr]">
      <aside className="border-r border-black/10 bg-white/45 p-4">
        <p className="label">{initial.length} hizmet talebi</p>
        <div className="mt-4 space-y-2">
          {initial.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`w-full border p-4 text-left ${selected?.id === item.id ? "border-[var(--teal-dark)] bg-white" : "border-black/10 bg-white/30"}`}
            >
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-[.12em] text-[var(--teal-dark)]">
                <span>{item.reference}</span>
                <span>{leadStatuses[item.status]}</span>
              </div>
              <strong className="mt-2 block text-sm">
                {item.customer_name}
              </strong>
              <p className="m-0 mt-1 text-xs text-black/45">
                {item.service_slug} · {item.district}
              </p>
            </button>
          ))}
        </div>
      </aside>
      <section className="p-5 md:p-9">
        {selected ? (
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-between gap-5 border-b border-black/10 pb-7">
              <div>
                <p className="kicker">{selected.reference}</p>
                <h1 className="font-display text-5xl">
                  {selected.customer_name}
                </h1>
                <p className="text-xs text-black/45">
                  {new Date(selected.created_at).toLocaleString("tr-TR")}
                </p>
              </div>
              <select
                className="field max-w-56"
                value={selected.status}
                onChange={(e) => update(e.target.value)}
              >
                {Object.entries(leadStatuses).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-7 grid gap-6 md:grid-cols-[1fr_260px]">
              <div>
                <span className="label">Talep</span>
                <h2 className="font-display text-4xl">
                  {selected.service_slug} · {selected.district}
                </h2>
                <p className="mt-5 leading-7 text-black/60">
                  {selected.description}
                </p>
                {Boolean(selected.photo_paths?.length) && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.photo_paths!.map((path, index) => (
                      <a
                        key={path}
                        target="_blank"
                        className="btn-ghost"
                        href={`/api/admin/files?path=${encodeURIComponent(path)}`}
                      >
                        Fotoğraf {index + 1}
                        <ExternalLink size={13} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <aside className="h-fit border border-black/10 bg-white/60 p-5">
                <span className="label">İletişim</span>
                <a
                  className="mt-4 flex items-center gap-2 font-bold"
                  href={`tel:${selected.customer_phone}`}
                >
                  <Phone size={15} />
                  {selected.customer_phone}
                </a>
                {selected.customer_email && (
                  <a
                    className="mt-2 block text-xs text-black/50"
                    href={`mailto:${selected.customer_email}`}
                  >
                    {selected.customer_email}
                  </a>
                )}
              </aside>
            </div>
          </div>
        ) : (
          <p>Henüz hizmet talebi yok.</p>
        )}
      </section>
    </div>
  );
}
function QuoteDetail({
  quote,
  setStatus,
}: {
  quote: Quote;
  setStatus: (id: string, status: string) => void;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b border-black/10 pb-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--teal-dark)]">
            {quote.reference}
          </p>
          <h1 className="font-display mt-2 text-5xl">{quote.customer_name}</h1>
          <p className="mt-2 text-xs text-black/45">
            {new Date(quote.created_at).toLocaleString("tr-TR")}
          </p>
        </div>
        <select
          className="field max-w-56"
          value={quote.status}
          onChange={(e) => setStatus(quote.id, e.target.value)}
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-7 grid gap-6 md:grid-cols-[1fr_260px]">
        <div className="space-y-3">
          {quote.quote_items?.map((item, index) => (
            <div
              key={String(item.id)}
              className="border border-black/10 bg-white/50 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[.14em] text-black/40">
                    Kalem {index + 1}
                  </span>
                  <h2 className="font-display text-3xl">
                    {String(item.label)}
                  </h2>
                </div>
                <b>{formatMoney(Number(item.line_total))}</b>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-black/55 md:grid-cols-4">
                <span>{String(item.product_name)}</span>
                <span>
                  {String(item.width)} × {String(item.height)} cm
                </span>
                <span>{String(item.quantity)} adet</span>
                <span>{String(item.color_name)}</span>
              </div>
              {Boolean(item.photo_path) && (
                <a
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]"
                  target="_blank"
                  href={`/api/admin/files?path=${encodeURIComponent(String(item.photo_path))}`}
                >
                  Fotoğrafı aç <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
        <aside className="h-fit border border-black/10 bg-white/60 p-5 text-sm">
          <h3 className="font-display text-3xl">İletişim</h3>
          <a
            className="mt-5 flex items-center gap-2 font-bold"
            href={`tel:${quote.customer_phone}`}
          >
            <Phone size={15} />
            {quote.customer_phone}
          </a>
          {Boolean(quote.customer_email) && (
            <a
              className="mt-2 block text-xs text-black/50"
              href={`mailto:${quote.customer_email}`}
            >
              {String(quote.customer_email)}
            </a>
          )}
          <p className="mt-5 text-xs leading-5 text-black/55">
            {String(quote.district)}, {String(quote.city)}
          </p>
          <div className="mt-6 border-t border-black/10 pt-5">
            <span className="label">Genel toplam</span>
            <strong className="font-display text-4xl text-[var(--teal-dark)]">
              {formatMoney(Number(quote.total))}
            </strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
function CatalogEditor({ catalog }: { catalog: Catalog }) {
  const [products, setProducts] = useState(catalog.products);
  const save = async (product: Catalog["products"][number]) => {
    const r = await fetch("/api/admin/catalog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    alert(r.ok ? "Ürün güncellendi." : "Güncelleme başarısız.");
  };
  return (
    <section className="mx-auto max-w-5xl p-5 md:p-10">
      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--teal-dark)]">
        Fiyat yönetimi
      </p>
      <h1 className="font-display mt-2 text-6xl">Ürün kataloğu</h1>
      <p className="mt-3 text-sm text-black/50">
        Baz fiyat ve m² bedeli KDV hariçtir. Değişiklikler yalnızca yeni
        tekliflere uygulanır.
      </p>
      <div className="mt-8 space-y-3">
        {products.map((p, index) => (
          <div
            key={p.id}
            className="grid items-end gap-4 border border-black/10 bg-white/50 p-5 md:grid-cols-[1fr_150px_150px_auto]"
          >
            <div>
              <strong className="font-display text-2xl">{p.name}</strong>
              <label className="mt-2 flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={p.active}
                  onChange={(e) =>
                    setProducts((x) =>
                      x.map((q, i) =>
                        i === index ? { ...q, active: e.target.checked } : q,
                      ),
                    )
                  }
                />{" "}
                Satışta
              </label>
            </div>
            <label>
              <span className="label">Baz fiyat</span>
              <input
                className="field"
                type="number"
                value={p.basePrice}
                onChange={(e) =>
                  setProducts((x) =>
                    x.map((q, i) =>
                      i === index
                        ? { ...q, basePrice: Number(e.target.value) }
                        : q,
                    ),
                  )
                }
              />
            </label>
            <label>
              <span className="label">m² fiyatı</span>
              <input
                className="field"
                type="number"
                value={p.pricePerM2}
                onChange={(e) =>
                  setProducts((x) =>
                    x.map((q, i) =>
                      i === index
                        ? { ...q, pricePerM2: Number(e.target.value) }
                        : q,
                    ),
                  )
                }
              />
            </label>
            <button
              onClick={() => save(products[index])}
              className="btn-primary"
            >
              Kaydet
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
