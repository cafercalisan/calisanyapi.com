"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, ArrowRight, Check, ChevronDown, DoorOpen, Palette, PanelsTopLeft, Plus, Ruler, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./SineklikPricePage.module.css";

type Area = "window" | "door";
type System = "hinged" | "sliding" | "double";
type Finish = "anthracite" | "gray" | "white" | "golden-oak" | "custom";
type EstimateItem = { id: string; area: Area; system: System; width: string; height: string; price: number; finish: Finish; paintCode: string };

const finishOptions: { value: Exclude<Finish, "custom">; label: string; swatch: string; edge?: string }[] = [
  { value: "anthracite", label: "Antrasit", swatch: "#414748" },
  { value: "gray", label: "Gri", swatch: "#aeb4b0" },
  { value: "white", label: "Beyaz", swatch: "#fbfcf9", edge: "#d8dfd9" },
  { value: "golden-oak", label: "Altın meşe", swatch: "linear-gradient(140deg, #f0d7a4 0%, #bc8950 48%, #e5c48c 100%)" },
];

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
  const [finish, setFinish] = useState<Finish>("white");
  const [paintCode, setPaintCode] = useState("");
  const [items, setItems] = useState<EstimateItem[]>([]);
  const systemRef = useRef<HTMLElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const parsedWidth = readMeasure(width);
  const parsedHeight = readMeasure(height);
  const dimensionsReady = parsedWidth !== null && parsedHeight !== null;
  const finishReady = finish !== "custom" || paintCode.trim().length > 0;
  const quoteReady = Boolean(area && system && dimensionsReady && finishReady);
  const quotePrice = area ? prices[area] : null;
  const quoteTotal = items.reduce((total, item) => total + item.price, 0);

  const whatsappUrl = useMemo(() => {
    if (items.length === 0) return "#";
    const lines = items.map((item, index) => {
      const areaName = item.area === "window" ? "Pencere" : "Kapı";
      const systemName = item.system === "hinged" ? "Menteşeli" : item.system === "double" ? "Duble sürgülü" : "Sürgülü";
      const colorName = item.finish === "custom" ? `Özel boya kodu ${item.paintCode}` : finishOptions.find((option) => option.value === item.finish)?.label ?? "Beyaz";
      return `${index + 1}. ${areaName} · ${systemName} · ${item.width} × ${item.height} cm · ${colorName} · ${money.format(item.price)} TL`;
    });
    const message = `Merhaba, sineklik fiyat teklifimi iletmek istiyorum.\n\n${lines.join("\n")}\n\nToplam (${items.length} ürün): ${money.format(quoteTotal)} TL`;
    return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }, [items, quoteTotal]);

  function addItem() {
    if (!quoteReady || !area || !system || !quotePrice || !parsedWidth || !parsedHeight) return;
    setItems((current) => [...current, {
      id: crypto.randomUUID(), area, system, width, height, price: quotePrice, finish,
      paintCode: finish === "custom" ? paintCode.trim() : "",
    }]);
    setWidth("");
    setHeight("");
    requestAnimationFrame(() => widthRef.current?.focus({ preventScroll: true }));
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function selectArea(next: Area) {
    setArea(next);
    setSystem(null);
    setWidth("");
    setHeight("");
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
            <Image src="/brand/calisan-yapi-logo-header.webp" alt="Çalışan Yapı" width={164} height={42} priority />
          </Link>
        </header>

        <section className={styles.intro}>
          <p className={styles.eyebrow}>Ölçünü gir · Fiyatını hemen gör</p>
          <h1>Sineklik fiyatını<br /><span>3 adımda öğren.</span></h1>
          <div className={styles.progress} aria-label="Üç adımda fiyat hesaplama">
            <span className={area ? styles.progressDone : styles.progressActive}><b>{area ? <Check size={13} /> : "1"}</b> Alan</span>
            <i />
            <span className={system ? styles.progressDone : area ? styles.progressActive : ""}><b>{system ? <Check size={13} /> : "2"}</b> Sistem</span>
            <i />
            <span className={quoteReady ? styles.progressDone : system ? styles.progressActive : ""}><b>{quoteReady ? <Check size={13} /> : "3"}</b> Ölçü & fiyat</span>
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

            <details className={styles.measureGuide}>
              <summary>
                <span className={styles.measureGuideIcon}><Ruler size={17} /></span>
                <span className={styles.measureGuideTitle}><strong>Ölçüyü nasıl almalıyım?</strong><small>Görselli kısa rehber</small></span>
                <ChevronDown className={styles.measureGuideChevron} size={18} />
              </summary>
              <div className={styles.measureGuideBody}>
                <div className={styles.measureScene}><strong>İç fitilden iç fitile ölç.</strong><span>Karşılıklı fitil kanallarının iç kenarları arası.</span><MeasurementGuideIllustration /></div>
                <div className={styles.measureGuideCopy}>
                  <p>Şöyle ölç</p>
                  <ol>
                    <li><b>Kanadı aç:</b> Fitil kanallarının göründüğü iç boşluğu bul.</li>
                    <li><b>En:</b> Sol fitilin iç kenarından sağ fitilin iç kenarına ölç.</li>
                    <li><b>Boy:</b> Üst fitilin iç kenarından alt fitilin iç kenarına ölç.</li>
                    <li>Santimetreyi gir. Yaklaşık değer yeterli.</li>
                  </ol>
                  <small>Ölçü çizgisi fitillerin iç kenarından başlar; dış çerçeveyi ölçme.</small>
                </div>
              </div>
            </details>

            <section className={`${styles.step} ${system && !dimensionsReady ? styles.stepCurrent : ""} ${!system ? styles.stepLocked : ""}`} aria-labelledby="step-measure">
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>{quoteReady ? <Check size={15} /> : "03"}</span>
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
              {quoteReady && quotePrice && <button type="button" className={styles.addItemAction} onClick={addItem}>
                <span><strong>Yeni ölçü ekle</strong><small>{area === "window" ? "Pencere" : "Kapı"} · {system === "hinged" ? "Menteşeli" : system === "double" ? "Duble sürgülü" : "Sürgülü"} · {money.format(quotePrice)} ₺</small></span>
                <span className={styles.addItemIcon}><Plus size={20} /></span>
              </button>}
              {parsedWidth !== null && parsedWidth > 200 && <div className={`${styles.doubleSuggestion} ${system === "double" ? styles.doubleSelected : ""}`}>
                <div className={styles.doubleModel} aria-hidden="true"><span /><span /><i>‹</i><b>›</b></div>
                <div className={styles.doubleText}><strong>Geniş açıklık için duble önerisi</strong><small>İki kanat ortadan ayrılarak iki yana açılır.</small></div>
                <button type="button" onClick={() => setSystem("double")} aria-pressed={system === "double"}>{system === "double" ? "Seçildi" : "Duble seç"}</button>
              </div>}
              <div className={styles.finishPicker}>
                <div className={styles.finishHeading}><span>Profil rengini seç</span><small>Açık tonlardan ilhamla</small></div>
                <div className={styles.finishGrid} role="group" aria-label="Sineklik profil rengi">
                  {finishOptions.map((option) => <button key={option.value} type="button" className={`${styles.finishOption} ${finish === option.value ? styles.finishSelected : ""}`} onClick={() => setFinish(option.value)} aria-pressed={finish === option.value}>
                    <span className={styles.finishSwatch} style={{ background: option.swatch, borderColor: option.edge || "transparent" }} />
                    <span>{option.label}</span>
                    {finish === option.value && <Check size={13} className={styles.finishCheck} />}
                  </button>)}
                </div>
                <button type="button" className={`${styles.customFinish} ${finish === "custom" ? styles.customFinishSelected : ""}`} onClick={() => setFinish("custom")} aria-pressed={finish === "custom"}>
                  <span className={styles.customFinishIcon}><Palette size={16} /></span>
                  <span><strong>İsteğe özel boya kodu</strong><small>RAL, NCS veya renk kodu</small></span>
                  {finish === "custom" && <Check size={16} className={styles.finishCheck} />}
                </button>
                {finish === "custom" && <label className={styles.paintCodeField}><span>Boya kodu</span><input type="text" value={paintCode} onChange={(event) => setPaintCode(event.target.value.slice(0, 32))} placeholder="Örn. RAL 7016 veya #3D4142" maxLength={32} autoCapitalize="characters" autoComplete="off" /><small>Kod teklifine eklenir; renk üretim öncesi teyit edilir.</small></label>}
              </div>
              <p className={styles.measureHint}><Ruler size={14} /> Metreyle, çerçevenin içinden yaklaşık ölç.</p>
              {((width && !parsedWidth) || (height && !parsedHeight)) && <p className={styles.validation}>Ölçüyü 1 ile 600 cm arasında gir.</p>}
              {finish === "custom" && !paintCode.trim() && <p className={styles.validation}>Devam etmek için boya kodunu yaz.</p>}
              {dimensionsReady && <div className={styles.inlinePreview}>
                <p><i /> ÖLÇÜNE GÖRE CANLI MODEL</p>
                <FlyscreenDrawing area={area} system={system} finish={finish} paintCode={paintCode} width={parsedWidth} height={parsedHeight} />
                <span>{width} × {height} cm · {system === "sliding" ? "Sürgülü" : "Menteşeli"}</span>
              </div>}
            </section>

            {items.length > 0 && <section className={styles.itemsPanel} aria-live="polite" aria-labelledby="items-title">
              <div className={styles.itemsHeading}><div><p>ÖLÇÜLERİNİ TEK TEKLİFTE TOPLA</p><h2 id="items-title">Ürün listen</h2></div><span>{items.length} ürün</span></div>
              <div className={styles.itemList}>{items.map((item, index) => <div className={styles.itemRow} key={item.id}>
                <span className={styles.itemIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.itemDetails}><strong>{item.area === "window" ? "Pencere" : "Kapı"} · {item.system === "hinged" ? "Menteşeli" : item.system === "double" ? "Duble sürgülü" : "Sürgülü"}</strong><small>{item.width} × {item.height} cm · {item.finish === "custom" ? `Özel · ${item.paintCode}` : finishOptions.find((option) => option.value === item.finish)?.label}</small></div>
                <b className={styles.itemPrice}>{money.format(item.price)} ₺</b>
                <button type="button" className={styles.removeItem} onClick={() => removeItem(item.id)} aria-label={`${index + 1}. ürünü listeden kaldır`}><Trash2 size={15} /></button>
              </div>)}</div>
              <div className={styles.itemsTotal}><span>Teklif toplamı</span><strong>{money.format(quoteTotal)} <i>₺</i></strong></div>
              <a className={styles.itemsSubmit} href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="sineklik-calculator-whatsapp">{items.length} ürün için WhatsApp’tan teklif al <ArrowRight size={16} /></a>
            </section>}
          </div>

          <aside className={styles.preview} aria-live="polite">
            <div className={styles.previewTop}><span className={styles.previewLabel}><i /> CANLI ÖNİZLEME</span><span className={styles.previewIndex}>01 / 01</span></div>
            <div className={styles.drawing}>
              <FlyscreenDrawing area={area} system={system} finish={finish} paintCode={paintCode} width={parsedWidth} height={parsedHeight} />
            </div>
            <div className={styles.previewCaption}>
                <div><span>{area ? area === "window" ? "PENCERE SİNEKLİĞİ" : "KAPI SİNEKLİĞİ" : "SİNEKLİK MODELİ"}</span><strong>{system ? system === "hinged" ? "Menteşeli sistem" : system === "double" ? "Duble, iki yana açılır" : "Sürgülü sistem" : "Seçimlerinle şekillenir"}</strong><small className={styles.previewFinish}>{finish === "custom" ? `Özel renk · ${paintCode || "kod bekleniyor"}` : finishOptions.find((option) => option.value === finish)?.label}</small></div>
              {dimensionsReady && <span className={styles.dimensionTag}>{width} × {height} cm</span>}
            </div>
            <div className={styles.pricePanel}>
              <div className={styles.priceTop}><span>{quoteReady ? "BU ÜRÜNÜN FİYATI" : items.length > 0 ? "ÜRÜN LİSTENİN TOPLAMI" : "FİYATIN BURADA GÖRÜNECEK"}<small>{quoteReady ? "Ölçünle birlikte listene ekle" : items.length > 0 ? `${items.length} ürün · Teklif toplamı` : "3 kısa adım · Ücretsiz"}</small></span><span className={styles.priceIcon}><Check size={17} /></span></div>
              {quoteReady && quotePrice ? <strong className={styles.price}>{money.format(quotePrice)} <i>₺</i></strong> : items.length > 0 ? <strong className={styles.price}>{money.format(quoteTotal)} <i>₺</i></strong> : <div className={styles.pricePlaceholder}>— — — <i>₺</i></div>}
              {quoteReady && quotePrice ? <p className={styles.priceNote}>{items.length > 0 ? `Listedeki ${items.length} ürün: ${money.format(quoteTotal)} ₺. Yeni ölçüyü de ekleyebilirsin.` : "Tek ürün fiyatı · Farklı ölçülerle ürün ekleyebilirsin."}</p> : items.length > 0 ? <p className={styles.priceNote}>Ürünlerin ve ölçüleri teklif mesajına eklenir.</p> : <p className={styles.priceNote}>Önce alanını, sonra sistem ve ölçünü seç.</p>}
              {!quoteReady && items.length > 0 && <a className={styles.whatsappButton} href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="sineklik-calculator-whatsapp">WhatsApp’tan teklif al <ArrowRight size={17} /></a>}
            </div>
          </aside>
        </div>
        <section className={styles.mediaSection} aria-labelledby="application-title">
          <div className={styles.mediaHeading}><p>UYGULAMADAN</p><h2 id="application-title">Plise sineklik, yakından.</h2></div>
          <div className={styles.mediaGrid}>
            <video className={styles.applicationVideo} controls playsInline preload="metadata" poster="/products/pliseli-kapi-ref2.webp" aria-label="Plise sineklik uygulama videosu">
              <source src="/videos/plisemodelsineklik.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className={styles.mediaGallery}>
              <figure><Image src="/products/pliseli-kapi-ref2.webp" alt="Farklı renklerde plise sineklik profilleri" width={720} height={480} /><figcaption>Renk seçenekleri</figcaption></figure>
              <figure><Image src="/products/lifestyle-kapi-plise.jpg" alt="Balkon kapısında plise sineklik uygulaması" width={900} height={600} /><figcaption>Kapı uygulaması</figcaption></figure>
              <figure><Image src="/products/lifestyle-pencere-plise.jpg" alt="Pencerede plise sineklik uygulaması" width={900} height={600} /><figcaption>Pencere uygulaması</figcaption></figure>
            </div>
          </div>
          <p className={styles.serviceNote}>Ölçünü ve rengini seç, uygulama öncesi ekibimizle netleştir.</p>
        </section>
        <footer className={styles.footer}><span>Çalışan Yapı · İstanbul</span><a href={`tel:${site.phone}`}>{site.phoneLabel}</a></footer>
      </div>
    </main>
  );
}

function MeasurementGuideIllustration() {
  const gridId = `measureGrid-${useId().replace(/:/g, "")}`;

  return <svg className={styles.measureDiagram} viewBox="0 0 360 250" role="img" aria-label="Ölçülecek açıklıkta en yatay, boy dikey oklarla gösterilmiştir">
    <defs>
      <pattern id={gridId} width="7" height="7" patternUnits="userSpaceOnUse"><path d="M7 0H0V7" fill="none" stroke="#169c73" strokeWidth=".55" opacity=".38" /></pattern>
      <marker id={`${gridId}-arrow`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M0 0 7 3.5 0 7Z" fill="#087f59" /></marker>
    </defs>
    <rect x="2" y="2" width="356" height="246" rx="15" fill="#f5fbf7" />
    <path d="M62 37H267V185H62Z" fill="#e0e9e3" stroke="#3a5146" strokeWidth="8" strokeLinejoin="round" />
    <path d="M76 51H253V171H76Z" fill="#eef8f2" stroke="#82978b" strokeWidth="3" />
    <path d="M81 56H248V166H81Z" fill={`url(#${gridId})`} />
    <path d="M54 31H267M54 191H267" stroke="#91a59a" strokeWidth="3" strokeLinecap="round" />
    <path d="M81 166V207M248 166V207" stroke="#087f59" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M81 207H248" stroke="#087f59" strokeWidth="2" markerStart={`url(#${gridId}-arrow)`} markerEnd={`url(#${gridId}-arrow)`} />
    <rect x="140" y="205" width="50" height="27" rx="13.5" fill="#08a66b" />
    <text x="165" y="223" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="Arial, sans-serif">EN</text>
    <path d="M248 56H291M248 166H291" stroke="#087f59" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M291 56V166" stroke="#087f59" strokeWidth="2" markerStart={`url(#${gridId}-arrow)`} markerEnd={`url(#${gridId}-arrow)`} />
    <rect x="279" y="96" width="36" height="28" rx="14" fill="#f4a13c" />
    <text x="297" y="115" textAnchor="middle" fill="#4d2c07" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">BOY</text>
    <circle cx="81" cy="56" r="5" fill="#f4a13c" stroke="white" strokeWidth="2" />
    <circle cx="248" cy="166" r="5" fill="#08a66b" stroke="white" strokeWidth="2" />
  </svg>;
}

function FlyscreenDrawing({ area, system, finish, paintCode, width, height }: { area: Area | null; system: System | null; finish: Finish; paintCode: string; width: number | null; height: number | null }) {
  const meshId = `screenMesh-${useId().replace(/:/g, "")}`;
  const frameId = `frameLight-${useId().replace(/:/g, "")}`;
  const customHex = paintCode.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[0];
  const frameTones: Record<Finish, { light: string; shade: string; edge: string }> = {
    anthracite: { light: "#777e7e", shade: "#343a3b", edge: "#252b2c" },
    gray: { light: "#d3d7d3", shade: "#9da49f", edge: "#858c87" },
    white: { light: "#ffffff", shade: "#e0e6e1", edge: "#aab5ae" },
    "golden-oak": { light: "#f2d9a4", shade: "#a7763e", edge: "#926331" },
    custom: { light: customHex || "#edf4ef", shade: customHex || "#b9c9bf", edge: customHex || "#8a9b90" },
  };
  const tones = frameTones[finish];
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
        <linearGradient id={frameId} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={tones.light}/><stop offset="1" stopColor={tones.shade}/></linearGradient>
      </defs>
      <path d="M30 258H370" stroke="#e6e9e6" strokeWidth="1" />
      <path d={`M${x} 27v8m0-4h${frameWidth}m0-4v8`} stroke="#84928b" strokeWidth="1" />
      <text x="220" y="18" textAnchor="middle" fill="#64736c" fontSize="10" fontFamily="Arial, sans-serif">{width && width <= 600 ? `${width} cm` : "GENİŞLİK"}</text>
      <path d={`M65 ${y}h8m-4 0v${frameHeight}m-4 0h8`} stroke="#84928b" strokeWidth="1" />
      <text x="22" y="150" textAnchor="middle" fill="#64736c" fontSize="10" fontFamily="Arial, sans-serif" transform="rotate(-90 22 150)">{height && height <= 600 ? `${height} cm` : "YÜKSEKLİK"}</text>
      <rect x={x + 4} y={y + 5} width={frameWidth} height={frameHeight} rx="1" fill="#182421" opacity=".08" />
      <rect x={x} y={y} width={frameWidth} height={frameHeight} rx="2" fill={`url(#${frameId})`} stroke={tones.edge} strokeWidth={bar} />
      <rect x={x + bar * 1.7} y={y + bar * 1.7} width={frameWidth - bar * 3.4} height={frameHeight - bar * 3.4} fill="#e9efec" />
      <rect x={x + bar * 1.7} y={y + bar * 1.7} width={frameWidth - bar * 3.4} height={frameHeight - bar * 3.4} fill={`url(#${meshId})`} />
      {system === "sliding" || system === "double" ? <>
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
