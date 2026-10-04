"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, DoorOpen, PanelsTopLeft, Phone, Plus, Ruler, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { districts, site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { FlyscreenDrawing, MeasurementGuideIllustration, type Area, type Finish, type System } from "@/components/SineklikPricePage";
import styles from "./SineklikQuoteFlow.module.css";

type Item = { id: string; area: Area; system: System; width: number; height: number; finish: Finish; paint: string };
type LeadState = "idle" | "sending" | "sent" | "error";
const steps = ["Nereye?", "Model", "Ölçü", "Renk", "Sonuç"];
const colors: { value: Finish; label: string; swatch: string; edge?: string }[] = [
  { value: "white", label: "Beyaz", swatch: "#fff", edge: "#d6dcda" },
  { value: "anthracite", label: "Antrasit", swatch: "#414748" },
  { value: "gray", label: "Gri", swatch: "#aeb5b5" },
  { value: "golden-oak", label: "Altın meşe", swatch: "linear-gradient(135deg,#f0d7a4,#bc8950 55%,#e5c48c)" },
];
const money = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
const lower = (item: Item) => item.area === "window" ? 1300 : 2200;
const upper = (item: Item) => item.area === "window" ? 1600 : 2600;
const systemName = (system: System) => system === "hinged" ? "Menteşeli" : system === "double" ? "Duble plise" : "Plise";

export function SineklikQuoteFlow() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [system, setSystem] = useState<System | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [finish, setFinish] = useState<Finish>("white");
  const [paint, setPaint] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const parsedWidth = Number(width.replace(",", "."));
  const parsedHeight = Number(height.replace(",", "."));
  const validSize = Number.isFinite(parsedWidth) && Number.isFinite(parsedHeight) && parsedWidth > 0 && parsedHeight > 0 && parsedWidth <= 600 && parsedHeight <= 600;
  const doubleSuggested = parsedWidth > 200 && system === "sliding";
  const quoteItems = items;
  const totalLow = quoteItems.reduce((sum, item) => sum + lower(item), 0);
  const totalHigh = quoteItems.reduce((sum, item) => sum + upper(item), 0);

  useEffect(() => {
    track("quote_started", { page: "sineklik-fiyat-hesapla" });
  }, []);
  useEffect(() => {
    track("quote_step_view", { step, step_name: steps[step - 1] });
  }, [step]);

  const whatsappUrl = useMemo(() => {
    const details = quoteItems.map((item, index) => `${index + 1}. ${item.area === "window" ? "Pencere" : "Kapı"} · ${systemName(item.system)} · ${item.width} × ${item.height} cm · ${item.finish === "custom" ? `RAL ${item.paint}` : colors.find((color) => color.value === item.finish)?.label}`).join("\n");
    const message = `Merhaba, sineklik ön teklifimi paylaşmak istiyorum.\n\n${details}\n\nTahmini toplam: ${money.format(totalLow)}–${money.format(totalHigh)} TL. Ölçü ve uygulama detaylarını netleştirebilir miyiz?`;
    return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }, [quoteItems, totalLow, totalHigh]);

  function chooseArea(value: Area) {
    setArea(value);
    setStep(2);
    track("quote_step_complete", { step: 1, choice: value });
  }
  function chooseSystem(value: System) {
    setSystem(value);
    setStep(3);
    track("quote_step_complete", { step: 2, choice: value });
  }
  function continueToColor() {
    if (!validSize || !area || !system) return;
    setStep(4);
    track("quote_step_complete", { step: 3 });
  }
  function addMeasuredItem() {
    if (!validSize || !area || !system || (finish === "custom" && !paint.trim())) return;
    const item: Item = { id: crypto.randomUUID(), area, system: doubleSuggested ? "double" : system, width: parsedWidth, height: parsedHeight, finish, paint: finish === "custom" ? paint.trim() : "" };
    setItems((current) => [...current, item]);
    setStep(5);
    setLeadState("idle");
    track("quote_step_complete", { step: 4, color: finish });
  }
  function addAnother() {
    setArea(null); setSystem(null); setWidth(""); setHeight(""); setPaint("");
    setStep(1);
    document.querySelector("main")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function removeItem(id: string) { setItems((current) => current.filter((item) => item.id !== id)); }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || items.length === 0) return;
    setLeadState("sending"); setLeadMessage("");
    track("quote_lead_submit", { item_count: items.length });
    try {
      const first = items[0];
      const productDetails = items.map((item, index) => `${index + 1}. ${item.area === "window" ? "Pencere" : "Kapı"}, ${systemName(item.system)}, ${item.width} × ${item.height} cm, ${item.finish === "custom" ? `Özel boya ${item.paint}` : colors.find((color) => color.value === item.finish)?.label}`).join(" | ");
      const response = await fetch("/api/service-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceSlug: "sineklik", district, width: first.width, height: first.height, unit: "cm", description: `Sineklik teklif geri arama talebi. Ürünler: ${productDetails}. Tahmini fiyat aralığını forma eklemeden, ölçü ve uygulama detaylarını konuşmak istiyor.`, photoPaths: [], customer: { name: name.trim(), phone: phone.trim() }, kvkkAccepted: true, website: "", attribution: { source: new URLSearchParams(location.search).get("utm_source") ?? "", medium: new URLSearchParams(location.search).get("utm_medium") ?? "", campaign: new URLSearchParams(location.search).get("utm_campaign") ?? "", landingPage: location.pathname, referrer: document.referrer } }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Talep iletilemedi. Lütfen telefonla arayın.");
      setLeadState("sent"); setLeadMessage("Talebiniz alındı. Ekibimiz sizinle iletişime geçecek.");
      track("lead_success", { form_id: "sineklik-quote-callback", item_count: items.length });
    } catch (error) {
      setLeadState("error"); setLeadMessage(error instanceof Error ? error.message : "Bir sorun oluştu. Lütfen tekrar deneyin.");
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.header}><Link href="/" aria-label="Çalışan Yapı ana sayfa"><Image src="/brand/calisan-yapi-logo-header.webp" alt="Çalışan Yapı" width={164} height={42} priority /></Link><a href={`tel:${site.phone}`} aria-label="Telefonla ara"><Phone size={17}/><span>{site.phoneLabel}</span></a></header>
      <section className={styles.hero}><h1>Sineklik teklifini<br/><span>adım adım oluştur.</span></h1><p>Seçimlerini yap, ölçünü gir; ön teklifini gör.</p></section>
      <nav className={styles.progress} aria-label={`Adım ${step}, toplam 5 adım`}>
        <div className={styles.progressTrack}><span style={{ width: `${step * 20}%` }}/></div>
        <div className={styles.progressMeta}><strong>{step}/5</strong><span>{steps[step - 1]}</span></div>
      </nav>

      <section className={styles.card} aria-live="polite">
        {step === 1 && <div className={styles.stepContent}><p className={styles.kicker}>01 · KONUM</p><h2>Nereye sineklik?</h2><p className={styles.subheading}>Uygulanacak alanı seç.</p><div className={styles.choiceGrid}>
          <button className={styles.choice} onClick={() => chooseArea("window")}><span className={styles.choiceIcon}><PanelsTopLeft/></span><span><strong>Pencere</strong><small>Oda ve mutfak pencereleri</small></span><ArrowRight/></button>
          <button className={styles.choice} onClick={() => chooseArea("door")}><span className={styles.choiceIcon}><DoorOpen/></span><span><strong>Kapı veya balkon</strong><small>Balkon ve dış mekân geçişleri</small></span><ArrowRight/></button>
        </div></div>}

        {step === 2 && <div className={styles.stepContent}><p className={styles.kicker}>02 · MODEL</p><h2>Hangi açılım?</h2><p className={styles.subheading}>Kısa bir dokunuşla seçimini yap.</p><div className={styles.modelGrid}>
          <button className={styles.modelCard} onClick={() => chooseSystem("hinged")}><Image src={area === "door" ? "/products/kapi-antrasit.webp" : "/products/antrasit-menteseli-percere-1.webp"} alt="Menteşeli sineklik örneği" width={420} height={280}/><span><strong>Menteşeli</strong><small>Kapı gibi açılır</small><ArrowRight/></span></button>
          <button className={styles.modelCard} onClick={() => chooseSystem("sliding")}><Image src={area === "door" ? "/products/kapi-plise-1.webp" : "/products/pencere-plise-ref.webp"} alt="Plise sineklik örneği" width={420} height={280}/><span><strong>Plise</strong><small>Yana doğru katlanır</small><ArrowRight/></span></button>
        </div><button type="button" className={styles.backButton} onClick={() => setStep(1)}><ArrowLeft/> Geri</button></div>}

        {step === 3 && <div className={styles.stepContent}><p className={styles.kicker}>03 · ÖLÇÜ</p><h2>En ve boy kaç cm?</h2><p className={styles.subheading}>Yaklaşık ölçüyle ön teklif oluşturabilirsin.</p>
          <details className={styles.measureGuide}><summary><Ruler size={18}/><span><strong>Ölçü nasıl alınır?</strong><small>Fitilin iç kenarından iç kenarına</small></span><span>+</span></summary><div className={styles.guideBody}><MeasurementGuideIllustration/><ol><li>Kanadı açıp karşılıklı fitil kanallarını bul.</li><li>Eni, sol fitilin içinden sağ fitilin içine ölç.</li><li>Boyu, üst fitilin içinden alt fitilin içine ölç.</li></ol><strong>Kesin ölçü uygulama öncesinde doğrulanır.</strong></div></details>
          <div className={styles.measureGrid}><label>Genişlik<input value={width} onChange={(event) => setWidth(event.target.value.replace(/[^\d.,]/g, ""))} inputMode="decimal" placeholder="Örn. 120"/><small>cm</small></label><label>Yükseklik<input value={height} onChange={(event) => setHeight(event.target.value.replace(/[^\d.,]/g, ""))} inputMode="decimal" placeholder="Örn. 140"/><small>cm</small></label></div>
          {parsedWidth > 200 && system === "sliding" && <button type="button" className={styles.doubleSuggestion} onClick={() => setSystem("double")}><span><strong>Geniş ölçü için duble plise</strong><small>Ortadan iki yana açılan model.</small></span><span>Seç</span></button>}
          {((width && !(parsedWidth > 0 && parsedWidth <= 600)) || (height && !(parsedHeight > 0 && parsedHeight <= 600))) && <p className={styles.errorText}>Ölçüleri 1–600 cm aralığında gir.</p>}
          <FlyscreenDrawing area={area} system={system} finish={finish} paintCode={paint} width={validSize ? parsedWidth : null} height={validSize ? parsedHeight : null}/>
          <div className={styles.actionRow}><button type="button" className={styles.backButton} onClick={() => setStep(2)}><ArrowLeft/> Geri</button><button type="button" className={styles.primaryButton} disabled={!validSize} onClick={continueToColor}>Renk seç <ArrowRight/></button></div>
        </div>}

        {step === 4 && <div className={styles.stepContent}><p className={styles.kicker}>04 · RENK</p><h2>Profil rengini seç.</h2><p className={styles.subheading}>Sineklik çerçevesinin rengini belirle.</p><div className={styles.colorGrid}>{colors.map((color) => <button type="button" key={color.value} className={`${styles.colorCard} ${finish === color.value ? styles.colorSelected : ""}`} onClick={() => setFinish(color.value)}><span style={{ background: color.swatch, borderColor: color.edge || "transparent" }}>{finish === color.value && <Check size={18}/>}</span><strong>{color.label}</strong></button>)}</div><button type="button" className={`${styles.ralChoice} ${finish === "custom" ? styles.ralSelected : ""}`} onClick={() => setFinish("custom")}>Özel RAL boya kodu</button>{finish === "custom" && <label className={styles.ralField}>RAL / boya kodu<input value={paint} onChange={(event) => setPaint(event.target.value.slice(0, 32))} placeholder="Örn. RAL 7016"/></label>}<p className={styles.priceDisclaimer}>Renk ve ölçü uygulama öncesinde teyit edilir.</p><div className={styles.actionRow}><button type="button" className={styles.backButton} onClick={() => setStep(3)}><ArrowLeft/> Geri</button><button type="button" className={styles.primaryButton} disabled={finish === "custom" && !paint.trim()} onClick={addMeasuredItem}>Ön teklifi gör <ArrowRight/></button></div></div>}

        {step === 5 && <div className={styles.stepContent}><p className={styles.kicker}>05 · ÖN TEKLİF</p><h2>Listen hazır.</h2><p className={styles.subheading}>Tutar, ölçü ve uygulama detayları doğrulanınca netleşir.</p><div className={styles.itemList}>{items.map((item, index) => <article className={styles.itemRow} key={item.id}><span className={styles.itemIndex}>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.area === "window" ? "Pencere" : "Kapı / balkon"} · {systemName(item.system)}</strong><small>{item.width} × {item.height} cm · {item.finish === "custom" ? `Özel ${item.paint}` : colors.find((color) => color.value === item.finish)?.label}</small></div><button type="button" onClick={() => removeItem(item.id)} aria-label="Ürünü sil"><Trash2 size={16}/></button></article>)}</div><button className={styles.addAnother} type="button" onClick={addAnother}><Plus size={18}/> Listeme ekle, başka bir ölçü gir</button><div className={styles.totalBox}><span>Yaklaşık toplam fiyat aralığı</span><strong>{money.format(totalLow)}–{money.format(totalHigh)} TL</strong><small>Kesin fiyat ölçü kontrolünden sonra netleşir.</small></div>
          <ul className={styles.trustList}><li><Check/> Kesin ölçü uygulama öncesinde doğrulanır</li><li><Check/> İstanbul’un 39 ilçesine hizmet</li><li><Check/> Uygulama kapsamı teklif sırasında netleşir</li></ul>
          <div className={styles.orderActions}><a className={styles.whatsappButton} href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: location.pathname, cta_id: "sineklik-quote-whatsapp" })} data-cta-id="sineklik-quote-whatsapp">WhatsApp’tan Sipariş Ver <ArrowRight/></a><Link className={styles.appointmentButton} href="/teklif-al">Keşif randevusu al <ArrowRight/></Link><a className={styles.callButton} href={`tel:${site.phone}`} onClick={() => track("phone_click", { location: location.pathname, cta_id: "sineklik-quote-call" })}>Hemen ara · {site.phoneLabel}</a></div>
          <form className={styles.leadForm} onSubmit={submitLead}><h3>Telefonunuza teklif isteyin</h3><p>Ön fiyat kaydedilmez; ekibimiz ayrıntıları sizinle netleştirir.</p><div className={styles.leadFields}><label>Ad soyad<input required minLength={2} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)}/></label><label>Telefon<input required type="tel" inputMode="tel" autoComplete="tel" pattern="(\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}" placeholder="05xx xxx xx xx" value={phone} onChange={(event) => setPhone(event.target.value)}/></label><label>İlçe<select required value={district} onChange={(event) => setDistrict(event.target.value)}><option value="">İlçeni seç</option>{districts.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label></div><label className={styles.consent}><input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)}/><span><Link href="/kvkk-aydinlatma-metni" target="_blank">KVKK aydınlatma metnini</Link> okudum; bilgilerimin talebim için işlenmesini kabul ediyorum.</span></label><button type="submit" className={styles.submitButton} disabled={leadState === "sending" || leadState === "sent"}>{leadState === "sending" ? "Gönderiliyor…" : leadState === "sent" ? "Talebiniz alındı" : "Beni arayın"}</button>{leadMessage && <p className={leadState === "error" ? styles.errorText : styles.successText} role="status">{leadMessage}</p>}</form>
        </div>}
      </section>

      {step === 5 && <section className={styles.mediaSection}><div><p className={styles.kicker}>UYGULAMA ÖRNEKLERİ</p><h2>Gerçek kapı ve pencere uygulamaları</h2></div><video controls playsInline preload="metadata" poster="/products/pliseli-kapi-ref2.webp"><source src="/videos/plisemodelsineklik.mp4" type="video/mp4"/>Video oynatılamıyor.</video><div className={styles.gallery}>{[["/products/lifestyle-kapi-plise.jpg", "Balkon kapısı"], ["/products/lifestyle-pencere-plise.jpg", "Pencere uygulaması"], ["/products/antrasit-menteseli-percere-1.webp", "Menteşeli model"]].map(([src, alt]) => <figure key={src}><Image src={src} alt={alt} width={720} height={480}/><figcaption>{alt}</figcaption></figure>)}</div></section>}
      <footer className={styles.footer}><Link href="/">Çalışan Yapı</Link><a href={`tel:${site.phone}`}>{site.phoneLabel}</a></footer>
    </div>
    {step === 5 && items.length > 0 && <aside className={styles.stickyBar}><span><small>Yaklaşık toplam</small><strong>{money.format(totalLow)}–{money.format(totalHigh)} TL</strong></span><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: location.pathname, cta_id: "sineklik-sticky-whatsapp" })}>WhatsApp’tan sipariş <ArrowRight size={16}/></a></aside>}
  </main>;
}
