"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import {
  surfaces,
  openings,
  profiles,
  meshes,
  limits,
  computePrice,
  formatTL,
  type PliseSurface,
  type PliseOpening,
  type PliseProfile,
  type PliseMesh,
} from "@/data/pliseConfig";

function clamp(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}

export default function Configurator() {
  const [surface, setSurface] = useState<PliseSurface>("pencere");
  const [opening, setOpening] = useState<PliseOpening>("tek");
  const [profile, setProfile] = useState<PliseProfile>("antrasit");
  const [mesh, setMesh] = useState<PliseMesh>("standart");
  const [widthCm, setWidthCm] = useState<number>(100);
  const [heightCm, setHeightCm] = useState<number>(140);
  const [qty, setQty] = useState<number>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const maxW = limits.maxWidth[surface];
  const maxH = limits.maxHeight[surface];

  const widthValid = widthCm >= limits.minCm && widthCm <= maxW;
  const heightValid = heightCm >= limits.minCm && heightCm <= maxH;
  const phoneValid = /^[0-9 +()-]{10,}$/.test(phone);
  const nameValid = name.trim().length >= 2;

  const price = useMemo(
    () =>
      computePrice({
        surface,
        opening,
        profile,
        mesh,
        widthCm: clamp(widthCm, limits.minCm, maxW),
        heightCm: clamp(heightCm, limits.minCm, maxH),
        qty: clamp(qty, 1, 20),
      }),
    [surface, opening, profile, mesh, widthCm, heightCm, qty, maxW, maxH]
  );

  const allValid = widthValid && heightValid && nameValid && phoneValid;

  const summaryLines = [
    `Ürün: Plise Sineklik (${surfaces.find((s) => s.value === surface)?.label})`,
    `Ölçü: ${widthCm} cm × ${heightCm} cm`,
    `Açılım: ${openings.find((o) => o.value === opening)?.label}`,
    `Profil: ${profiles.find((p) => p.value === profile)?.label}`,
    `Tül: ${meshes.find((m) => m.value === mesh)?.label}`,
    `Adet: ${qty}`,
    `Tahmini Fiyat: ${formatTL(price)}`,
    `Ad Soyad: ${name || "-"}`,
    `Telefon: ${phone || "-"}`,
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.phoneRaw.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(
    "Merhaba, plise sineklik siparişi oluşturmak istiyorum.\n\n" +
      summaryLines.join("\n") +
      "\n\nKeşif ve net fiyat için ne zaman uygun olursunuz?"
  )}`;

  return (
    <section
      id="yapilandir"
      className="relative bg-gradient-to-b from-[#f6f3ec] to-[#ece5d4] py-24 px-5 lg:px-10"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
            Yapılandırıcı
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,46px)] text-[#0a0e16] font-bold leading-[1.1] tracking-tight">
            Ölçüleri girin,{" "}
            <span className="text-accent">canlı fiyatı</span> görün
          </h2>
          <p className="text-[#0a0e16]/55 text-[14px] md:text-[15px] mt-4 leading-relaxed">
            Genişlik, yükseklik ve tercihlerinize göre tahmini fiyatınız anında
            güncellenir. Net teklif için WhatsApp ile sipariş özetinizi gönderin
            — ücretsiz keşif ekibimiz ölçüyü doğrular.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-9 shadow-[0_30px_80px_-30px_rgba(10,14,22,0.25)] border border-[#0a0e16]/[0.06]"
          >
            {/* Surface */}
            <Group title="1 · Ürün türü">
              <OptionGrid
                cols={3}
                items={surfaces}
                value={surface}
                onChange={(v) => {
                  setSurface(v);
                  setWidthCm((w) => clamp(w, limits.minCm, limits.maxWidth[v]));
                  setHeightCm((h) => clamp(h, limits.minCm, limits.maxHeight[v]));
                }}
              />
            </Group>

            {/* Dimensions */}
            <Group title="2 · Ölçüler" hint={`min ${limits.minCm} cm · max ${maxW}×${maxH} cm`}>
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  label="Genişlik"
                  unit="cm"
                  value={widthCm}
                  min={limits.minCm}
                  max={maxW}
                  onChange={setWidthCm}
                  error={!widthValid}
                />
                <NumberInput
                  label="Yükseklik"
                  unit="cm"
                  value={heightCm}
                  min={limits.minCm}
                  max={maxH}
                  onChange={setHeightCm}
                  error={!heightValid}
                />
              </div>
              <p className="text-[11px] text-[#0a0e16]/45 mt-2">
                Ölçüyü içeriden, kasanın iç netinden alın. Profil için ~3 cm
                tolerans bırakıyoruz.
              </p>
            </Group>

            {/* Opening */}
            <Group title="3 · Açılım yönü">
              <OptionGrid cols={2} items={openings} value={opening} onChange={setOpening} />
            </Group>

            {/* Profile color */}
            <Group title="4 · Profil rengi">
              <SwatchGrid items={profiles} value={profile} onChange={setProfile} />
            </Group>

            {/* Mesh */}
            <Group title="5 · Tül seçimi">
              <OptionGrid cols={3} items={meshes} value={mesh} onChange={setMesh} />
            </Group>

            {/* Qty */}
            <Group title="6 · Adet">
              <div className="inline-flex items-center gap-3 bg-[#0a0e16]/[0.04] rounded-xl p-1.5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg bg-white text-[#0a0e16] font-bold text-lg hover:bg-[#0a0e16] hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="font-display font-bold text-[#0a0e16] w-8 text-center text-lg">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="w-10 h-10 rounded-lg bg-white text-[#0a0e16] font-bold text-lg hover:bg-[#0a0e16] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </Group>

            {/* Contact */}
            <Group title="7 · İletişim bilgileriniz">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Ad Soyad"
                  value={name}
                  onChange={setName}
                  placeholder="Adınız"
                  error={name.length > 0 && !nameValid}
                />
                <TextInput
                  label="Telefon"
                  value={phone}
                  onChange={setPhone}
                  placeholder="0xxx xxx xx xx"
                  error={phone.length > 0 && !phoneValid}
                  type="tel"
                />
              </div>
            </Group>
          </motion.div>

          {/* Right: live summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl bg-[#0a0e16] text-white p-7 md:p-8 shadow-[0_30px_80px_-30px_rgba(10,14,22,0.45)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.12)_0%,transparent_70%)]" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[3px] text-accent/70 font-bold">
                  Sipariş Özeti
                </div>
                <div className="mt-3 text-white/60 text-[13px]">
                  Tahmini fiyatınız
                </div>
                <div className="mt-1 font-display text-[44px] md:text-[52px] font-bold leading-none tracking-tight">
                  {formatTL(price)}
                </div>
                <div className="text-[11px] text-white/40 mt-2">
                  KDV dahil · keşif sonrası nihai fiyat onaylanır
                </div>

                <ul className="mt-7 space-y-2 text-[13px] text-white/70">
                  <Row k="Ürün" v={surfaces.find((s) => s.value === surface)?.label ?? ""} />
                  <Row k="Ölçü" v={`${widthCm}×${heightCm} cm`} />
                  <Row k="Açılım" v={openings.find((o) => o.value === opening)?.label ?? ""} />
                  <Row k="Profil" v={profiles.find((p) => p.value === profile)?.label ?? ""} />
                  <Row k="Tül" v={meshes.find((m) => m.value === mesh)?.label ?? ""} />
                  <Row k="Adet" v={`${qty}`} />
                </ul>

                <a
                  href={allValid ? whatsappUrl : undefined}
                  onClick={(e) => {
                    if (!allValid) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-[14px] transition-all ${
                    allValid
                      ? "bg-[#25D366] text-white hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)]"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                  {allValid ? "WhatsApp ile Sipariş Ver" : "Bilgileri tamamlayın"}
                </a>

                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-[13px] border border-white/15 text-white/80 hover:bg-white/5 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {siteConfig.phone}
                </a>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  {[
                    { t: "Ücretsiz", s: "Keşif & Ölçü" },
                    { t: "5 gün", s: "Üretim & Montaj" },
                    { t: "2 yıl", s: "Garanti" },
                  ].map((b) => (
                    <div
                      key={b.t}
                      className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3"
                    >
                      <div className="font-display text-white font-bold text-[15px] leading-none">
                        {b.t}
                      </div>
                      <div className="text-[10px] text-white/45 mt-1.5 leading-tight">
                        {b.s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Group({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[11px] text-[#0a0e16]/55 font-bold tracking-[1.5px] uppercase">
          {title}
        </div>
        {hint && <div className="text-[10px] text-[#0a0e16]/35">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between border-b border-white/[0.06] pb-1.5">
      <span className="text-white/45">{k}</span>
      <span className="font-medium text-white/90">{v}</span>
    </li>
  );
}

function OptionGrid<T extends string>({
  cols,
  items,
  value,
  onChange,
}: {
  cols: number;
  items: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            type="button"
            key={it.value}
            onClick={() => onChange(it.value)}
            className={`text-left rounded-xl border px-3.5 py-3 transition-all ${
              active
                ? "border-[#0a0e16] bg-[#0a0e16] text-white"
                : "border-[#0a0e16]/10 bg-white text-[#0a0e16] hover:border-[#0a0e16]/30"
            }`}
          >
            <div className="text-[13px] font-semibold leading-tight">{it.label}</div>
            {it.hint && (
              <div className={`text-[10.5px] mt-0.5 ${active ? "text-white/55" : "text-[#0a0e16]/45"}`}>
                {it.hint}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SwatchGrid<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { value: T; label: string; swatch?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            type="button"
            key={it.value}
            onClick={() => onChange(it.value)}
            className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all ${
              active
                ? "border-[#0a0e16] bg-[#0a0e16] text-white"
                : "border-[#0a0e16]/10 bg-white text-[#0a0e16] hover:border-[#0a0e16]/30"
            }`}
          >
            <span
              className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
              style={{ background: it.swatch }}
            />
            <span className="text-[12.5px] font-semibold">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function NumberInput({
  label,
  unit,
  value,
  min,
  max,
  onChange,
  error,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  error?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] text-[#0a0e16]/55 font-bold tracking-[1px] uppercase">
        {label}
      </span>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-xl border bg-white px-3.5 ${
          error ? "border-red-400" : "border-[#0a0e16]/10 focus-within:border-[#0a0e16]"
        }`}
      >
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
          className="flex-1 bg-transparent py-3 text-[18px] font-display font-bold text-[#0a0e16] outline-none"
        />
        <span className="text-[12px] text-[#0a0e16]/45 font-semibold">{unit}</span>
      </div>
      {error && (
        <div className="text-[11px] text-red-500 mt-1">
          {min}–{max} {unit} aralığında olmalı
        </div>
      )}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] text-[#0a0e16]/55 font-bold tracking-[1px] uppercase">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-[14px] text-[#0a0e16] outline-none placeholder:text-[#0a0e16]/30 ${
          error ? "border-red-400" : "border-[#0a0e16]/10 focus:border-[#0a0e16]"
        }`}
      />
    </label>
  );
}
