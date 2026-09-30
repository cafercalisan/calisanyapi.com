"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, ArrowRight, Check, DoorOpen, PanelsTopLeft, Ruler } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./SineklikPricePage.module.css";

type Area = "window" | "door";
type System = "hinged" | "sliding";

const prices: Record<Area, number> = { window: 1300, door: 2200 };
const money = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

function readMeasure(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 600 ? parsed : null;
}

export function SineklikPricePage() {
  const [area, setArea] = useState<Area | null>(null);
  const [system, setSystem] = useState<System | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const systemRef = useRef<HTMLElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const parsedWidth = readMeasure(width);
  const parsedHeight = readMeasure(height);
  const dimensionsReady = parsedWidth !== null && parsedHeight !== null;
  const quoteReady = Boolean(area && system && dimensionsReady);
  const quotePrice = area ? prices[area] : null;

  const whatsappUrl = useMemo(() => {
    if (!quoteReady || !area || !system || !quotePrice || !parsedWidth || !parsedHeight) return "#";
    const areaName = area === "window" ? "Pencere" : "Kapı";
    const systemName = system === "hinged" ? "Menteşeli" : "Sürgülü";
    const message = `Merhaba, sineklik fiyat teklifimi iletmek istiyorum.\n\nAlan: ${areaName}\nSistem: ${systemName}\nÖlçü: ${width} × ${height} cm\nFiyat: ${money.format(quotePrice)} TL`;
    return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }, [area, height, parsedHeight, parsedWidth, quotePrice, quoteReady, system, width]);

  function selectArea(next: Area) {
    setArea(next);
    setSystem(null);
    requestAnimationFrame(() => systemRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function selectSystem(next: System) {
    setSystem(next);
    requestAnimationFrame(() => widthRef.current?.focus({ preventScroll: true }));
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="Çalışan Yapı ana sayfa">
            <span className={styles.brandMark}>ÇY</span>
            <span>ÇALIŞAN YAPI<small>SİNEKLİK FİYAT HESAPLAMA</small></span>
          </Link>
          <span className={styles.headerNote}><i /> Ücretsiz fiyat hesabı</span>
        </header>

        <section className={styles.intro}>
          <p className={styles.eyebrow}>Ölçünü gir · Fiyatını hemen gör</p>
          <h1>Sineklik fiyatını<br /><span>3 adımda öğren.</span></h1>
          <p className={styles.introText}>Alanını ve sistemini seç. Yaklaşık ölçünü girince fiyatın hazır.</p>
          <div className={styles.progress} aria-label="Üç adımda fiyat hesaplama">
            <span className={area ? styles.progressDone : styles.progressActive}><b>{area ? <Check size={13} /> : "1"}</b> Alan</span>
            <i />
            <span className={system ? styles.progressDone : area ? styles.progressActive : ""}><b>{system ? <Check size={13} /> : "2"}</b> Sistem</span>
            <i />
            <span className={dimensionsReady ? styles.progressDone : system ? styles.progressActive : ""}><b>{dimensionsReady ? <Check size={13} /> : "3"}</b> Ölçü & fiyat</span>
          </div>
        </section>

        <div className={styles.workspace}>
          <div className={styles.steps}>
            <section className={`${styles.step} ${!area ? styles.stepCurrent : ""}`} aria-labelledby="step-area">
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>{area ? <Check size={15} /> : "01"}</span>
                <div><p>ÖNCE ALANINI SEÇ</p><h2 id="step-area">Nereye sineklik?</h2></div>
              </div>
              <div className={styles.choiceGrid}>
                <button type="button" onClick={() => selectArea("window")} aria-pressed={area === "window"} className={`${styles.choice} ${area === "window" ? styles.choiceSelected : ""}`}>
                  <span className={styles.choiceIcon}><PanelsTopLeft size={23} strokeWidth={1.7} /></span>
                  <span><strong>Pencere</strong><small>Oda penceresi</small></span>
                  {area === "window" && <Check className={styles.choiceCheck} size={17} />}
                </button>
                <button type="button" onClick={() => selectArea("door")} aria-pressed={area === "door"} className={`${styles.choice} ${area === "door" ? styles.choiceSelected : ""}`}>
                  <span className={styles.choiceIcon}><DoorOpen size={23} strokeWidth={1.7} /></span>
                  <span><strong>Kapı</strong><small>Balkon veya giriş</small></span>
                  {area === "door" && <Check className={styles.choiceCheck} size={17} />}
                </button>
              </div>
            </section>

            <section ref={systemRef} className={`${styles.step} ${area && !system ? styles.stepCurrent : ""} ${!area ? styles.stepLocked : ""}`} aria-labelledby="step-system">
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>{system ? <Check size={15} /> : "02"}</span>
                <div><p>{area ? "KULLANIMINA UYGUN SİSTEM" : "ALAN SEÇİMİNDEN SONRA"}</p><h2 id="step-system">Açılım biçimi</h2></div>
              </div>
              <div className={styles.choiceGrid}>
                <button type="button" disabled={!area} onClick={() => selectSystem("hinged")} aria-pressed={system === "hinged"} className={`${styles.choice} ${system === "hinged" ? styles.choiceSelected : ""}`}>
                  <span className={styles.systemGlyph}><span className={styles.glyphHinged} /></span>
                  <span><strong>Menteşeli</strong><small>Kanat gibi açılır</small></span>
                  {system === "hinged" && <Check className={styles.choiceCheck} size={17} />}
                </button>
                <button type="button" disabled={!area} onClick={() => selectSystem("sliding")} aria-pressed={system === "sliding"} className={`${styles.choice} ${system === "sliding" ? styles.choiceSelected : ""}`}>
                  <span className={styles.systemGlyph}><ArrowLeftRight size={23} strokeWidth={1.7} /></span>
                  <span><strong>Sürgülü</strong><small>Yana doğru kayar</small></span>
                  {system === "sliding" && <Check className={styles.choiceCheck} size={17} />}
                </button>
              </div>
            </section>

            <section className={`${styles.step} ${system && !dimensionsReady ? styles.stepCurrent : ""} ${!system ? styles.stepLocked : ""}`} aria-labelledby="step-measure">
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>{dimensionsReady ? <Check size={15} /> : "03"}</span>
                <div><p>YAKLAŞIK ÖLÇÜ YETERLİ</p><h2 id="step-measure">En ve boyu gir</h2></div>
              </div>
              <div className={styles.measureGrid}>
                <label className={styles.measureField}>
                  <span>Genişlik</span>
                  <span className={styles.inputWrap}><input ref={widthRef} type="text" inputMode="decimal" autoComplete="off" placeholder="Örn. 120" value={width} onChange={(event) => setWidth(event.target.value.replace(/[^\d.,]/g, "").replace(/(,|\.).*(,|\.)/, "$1"))} disabled={!system} aria-label="Genişlik, santimetre" /><i>cm</i></span>
                </label>
                <label className={styles.measureField}>
                  <span>Yükseklik</span>
                  <span className={styles.inputWrap}><input type="text" inputMode="decimal" autoComplete="off" placeholder="Örn. 140" value={height} onChange={(event) => setHeight(event.target.value.replace(/[^\d.,]/g, "").replace(/(,|\.).*(,|\.)/, "$1"))} disabled={!system} aria-label="Yükseklik, santimetre" /><i>cm</i></span>
                </label>
              </div>
              <p className={styles.measureHint}><Ruler size={14} /> Metreyle, çerçevenin içinden yaklaşık ölç.</p>
              {((width && !parsedWidth) || (height && !parsedHeight)) && <p className={styles.validation}>Ölçüyü 1 ile 600 cm arasında gir.</p>}
              {dimensionsReady && <div className={styles.inlinePreview}>
                <p><i /> ÖLÇÜNE GÖRE CANLI MODEL</p>
                <FlyscreenDrawing area={area} system={system} width={parsedWidth} height={parsedHeight} />
                <span>{width} × {height} cm · {system === "sliding" ? "Sürgülü" : "Menteşeli"}</span>
              </div>}
            </section>
          </div>

          <aside className={styles.preview} aria-live="polite">
            <div className={styles.previewTop}><span className={styles.previewLabel}><i /> CANLI ÖNİZLEME</span><span className={styles.previewIndex}>01 / 01</span></div>
            <div className={styles.drawing}>
              <FlyscreenDrawing area={area} system={system} width={parsedWidth} height={parsedHeight} />
            </div>
            <div className={styles.previewCaption}>
              <div><span>{area ? area === "window" ? "PENCERE SİNEKLİĞİ" : "KAPI SİNEKLİĞİ" : "SİNEKLİK MODELİ"}</span><strong>{system ? system === "hinged" ? "Menteşeli sistem" : "Sürgülü sistem" : "Seçimlerinle şekillenir"}</strong></div>
              {dimensionsReady && <span className={styles.dimensionTag}>{width} × {height} cm</span>}
            </div>
            <div className={styles.pricePanel}>
              <div className={styles.priceTop}><span>{quoteReady ? "SİNEKLİĞİNİN TEK ÜRÜN FİYATI" : "FİYATIN BURADA GÖRÜNECEK"}<small>{quoteReady ? "Seçimine göre anında hesaplandı" : "3 kısa adım · Ücretsiz"}</small></span><span className={styles.priceIcon}><Check size={17} /></span></div>
              {quoteReady && quotePrice ? <strong className={styles.price}>{money.format(quotePrice)} <i>₺</i></strong> : <div className={styles.pricePlaceholder}>— — — <i>₺</i></div>}
              {quoteReady && quotePrice ? <p className={styles.priceNote}>Tek ürün fiyatıdır. Seçimlerin WhatsApp teklif mesajına eklenir.</p> : <p className={styles.priceNote}>Önce alanını, sonra sistem ve ölçünü seç.</p>}
              {quoteReady && <a className={styles.whatsappButton} href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="sineklik-calculator-whatsapp">Teklifimi WhatsApp’tan gönder <ArrowRight size={17} /></a>}
            </div>
            <p className={styles.footnote}>Fiyat: pencere {money.format(prices.window)} ₺ · kapı {money.format(prices.door)} ₺</p>
          </aside>
        </div>
        <footer className={styles.footer}><span>Çalışan Yapı · İstanbul</span><a href={`tel:${site.phone}`}>{site.phoneLabel}</a></footer>
      </div>
    </main>
  );
}

function FlyscreenDrawing({ area, system, width, height }: { area: Area | null; system: System | null; width: number | null; height: number | null }) {
  const meshId = `screenMesh-${useId().replace(/:/g, "")}`;
  const sourceWidth = width ?? (area === "door" ? 90 : 120);
  const sourceHeight = height ?? (area === "door" ? 205 : 140);
  const scale = Math.min(222 / sourceWidth, 204 / sourceHeight);
  const frameWidth = Math.max(52, sourceWidth * scale);
  const frameHeight = Math.max(52, sourceHeight * scale);
  const x = 220 - frameWidth / 2;
  const y = 148 - frameHeight / 2;
  const bar = Math.max(4, Math.min(7, frameWidth * 0.025));

  return (
    <svg className={styles.svg} viewBox="0 0 400 300" role="img" aria-label={`${area === "door" ? "Kapı" : "Pencere"} sinekliği, ${system === "sliding" ? "sürgülü" : "menteşeli"} sistem${width && height ? `, ${width} çarpı ${height} santimetre` : ""}`}>
      <defs>
        <pattern id={meshId} width="5" height="5" patternUnits="userSpaceOnUse"><path d="M 5 0 L 0 0 0 5" fill="none" stroke="#9da7a2" strokeWidth=".55" opacity=".75" /></pattern>
        <linearGradient id="frameLight" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fafbf9"/><stop offset="1" stopColor="#d9dfdc"/></linearGradient>
      </defs>
      <path d="M30 258H370" stroke="#e6e9e6" strokeWidth="1" />
      <path d={`M${x} 27v8m0-4h${frameWidth}m0-4v8`} stroke="#84928b" strokeWidth="1" />
      <text x="220" y="18" textAnchor="middle" fill="#64736c" fontSize="10" fontFamily="Arial, sans-serif">{width && width <= 600 ? `${width} cm` : "GENİŞLİK"}</text>
      <path d={`M65 ${y}h8m-4 0v${frameHeight}m-4 0h8`} stroke="#84928b" strokeWidth="1" />
      <text x="22" y="150" textAnchor="middle" fill="#64736c" fontSize="10" fontFamily="Arial, sans-serif" transform="rotate(-90 22 150)">{height && height <= 600 ? `${height} cm` : "YÜKSEKLİK"}</text>
      <rect x={x + 4} y={y + 5} width={frameWidth} height={frameHeight} rx="1" fill="#182421" opacity=".08" />
      <rect x={x} y={y} width={frameWidth} height={frameHeight} rx="2" fill="url(#frameLight)" stroke="#8d9992" strokeWidth={bar} />
      <rect x={x + bar * 1.7} y={y + bar * 1.7} width={frameWidth - bar * 3.4} height={frameHeight - bar * 3.4} fill="#e9efec" />
      <rect x={x + bar * 1.7} y={y + bar * 1.7} width={frameWidth - bar * 3.4} height={frameHeight - bar * 3.4} fill={`url(#${meshId})`} />
      {system === "sliding" ? <>
        <path d={`M${x + frameWidth / 2} ${y + bar}v${frameHeight - bar * 2}`} stroke="#89958f" strokeWidth={bar * 0.8} />
        <path d={`M${x + frameWidth * 0.3} ${y + frameHeight * 0.52}h-${Math.min(16, frameWidth * 0.1)}m0 0 4-4m-4 4 4 4M${x + frameWidth * 0.7} ${y + frameHeight * 0.52}h${Math.min(16, frameWidth * 0.1)}m0 0-4-4m4 4-4 4`} fill="none" stroke="#65746c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </> : <>
        <path d={`M${x + bar} ${y + frameHeight * 0.25}h${bar * 1.3}m-${bar * 1.3} 0v${Math.max(9, frameHeight * 0.07)}m0 0h${bar * 1.3}M${x + bar} ${y + frameHeight * 0.72}h${bar * 1.3}m-${bar * 1.3} 0v${Math.max(9, frameHeight * 0.07)}m0 0h${bar * 1.3}`} fill="none" stroke="#84928b" strokeWidth="1.2" />
        <rect x={x + frameWidth - bar * 3.4} y={y + frameHeight * 0.47} width={bar * 1.2} height={Math.max(12, frameHeight * 0.09)} rx="2" fill="#6b7871" />
      </>}
      <path d={`M${x - 4} ${y + frameHeight + 9}h${frameWidth + 8}`} stroke="#b7c0bb" strokeWidth="1.2" />
      <circle cx="344" cy="248" r="2" fill="#87958d" />
    </svg>
  );
}
