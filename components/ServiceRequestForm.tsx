"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown, ImagePlus, LoaderCircle, MessageCircle, Phone, Ruler, X } from "lucide-react";
import { districts, services, site } from "@/lib/site";
import { newEventId, track } from "@/lib/analytics";

type Photo = { file: File; preview: string };
type Status = { type: "idle" | "loading" | "success" | "error"; message?: string; reference?: string };
type GalleryItem = { src: string; alt: string; tone: string };
const galleries: Record<string, GalleryItem[]> = {
  "pvc-kapi-pencere": [{ src: "/services/pvc-kapi-pencere-v1.webp", alt: "Antrasit PVC sürme balkon kapısı ve çift açılım pencere uygulaması", tone: "Sürme kapı · Antrasit PVC" }, { src: "/services/pvc-kapi-pencere-v2.webp", alt: "Beyaz PVC çift açılım pencere ve balkon kapısı uygulaması", tone: "Çift açılım · Beyaz PVC" }],
  "cam-balkon": [{ src: "/services/cam-balkon-v2.webp", alt: "Üst ve alt raylı, yana katlanan dikey profilsiz cam balkon sistemi", tone: "Katlanır sistem · Antrasit" }, { src: "/services/cam-balkon.png", alt: "Katlanmış cam panelleri görünen cam balkon", tone: "Panel detayı · Şeffaf cam" }, { src: "/brand/calisan-yapi-hero.webp", alt: "Konut terasında cam kapama sistemi", tone: "Teras kapama · Mimari uyum" }],
  kupeste: [{ src: "/services/kupeste-v2.webp", alt: "Kesintisiz tutamaklı paslanmaz merdiven küpeştesi", tone: "Paslanmaz · Doğal taş" }, { src: "/services/kupeste.png", alt: "İç mekânda paslanmaz küpeşte uygulaması", tone: "Yuvarlak hat · İç mekân" }, { src: "/services/lifestyle/kupeste-01.jpg", alt: "Taş merdivende metal küpeşte detayı", tone: "Metal · Gün ışığı" }, { src: "/services/lifestyle/kupeste-02.jpg", alt: "Modern mimaride geometrik küpeşte", tone: "Beyaz · Grafik çizgi" }],
  korkuluk: [{ src: "/services/korkuluk-v2.webp", alt: "Taban kanalına oturan lamine cam teras korkuluğu", tone: "Cam korkuluk · Taban kanal" }, { src: "/services/korkuluk.png", alt: "Postalı cam korkuluk ve merdiven bağlantısı", tone: "Antrasit posta · Şeffaf cam" }, { src: "/services/lifestyle/cam-korkuluk-01.jpg", alt: "Açık havada cam korkuluklu teras", tone: "Cam · Açık teras" }],
  "asma-tavan": [{ src: "/services/asma-tavan-v2.webp", alt: "Taşıyıcı ritmi ve erişim paneli görünen lineer metal asma tavan", tone: "Metal baffle · Sıcak ışık" }, { src: "/services/asma-tavan.png", alt: "Lineer baffle asma tavanlı modern iç mekân", tone: "Antrasit baffle · Oturma alanı" }, { src: "/services/lifestyle/asma-tavan-01.jpg", alt: "Özgün tavan tasarımlı çağdaş ofis", tone: "Modüler tavan · Ofis" }],
  sineklik: [{ src: "/services/sineklik-v2.webp", alt: "İnce alt kılavuzlu antrasit plise kapı sinekliği", tone: "Plise · Antrasit" }, { src: "/products/pliseli-kapi.jpg", alt: "Elle açılan plise kapı sinekliği", tone: "Plise kapı · Kullanım detayı" }, { src: "/products/lifestyle-kapi-plise.jpg", alt: "Yaşam alanında plise kapı sinekliği", tone: "Plise kapı · Yaşam alanı" }, { src: "/products/lifestyle-pencere-plise.jpg", alt: "Modern pencerede plise sineklik", tone: "Plise pencere · Beyaz" }],
};

export function ServiceRequestForm({ initialService, initialDistrict }: { initialService?: string; initialDistrict?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const eventId = useRef(newEventId());
  const [selectedService, setSelectedService] = useState(services.some(s => s.slug === initialService) ? initialService! : services[0].slug);
  const selected = useMemo(() => services.find(s => s.slug === selectedService) ?? services[0], [selectedService]);
  const initialDistrictName = districts.find(d => d.slug === initialDistrict || d.name === initialDistrict)?.name ?? "";
  const galleryImages = galleries[selectedService] ?? [{ src: selected.image, alt: `${selected.name} için temsili uygulama görseli`, tone: `${selected.name} · Uygulama fikri` }];

  useEffect(() => { track("form_start", { service: initialService || services[0].slug, path: location.pathname }); }, [initialService]);

  function addPhotos(event: ChangeEvent<HTMLInputElement>) { const incoming = Array.from(event.target.files ?? []).filter(file => file.size <= 5 * 1024 * 1024).slice(0, 4 - photos.length); setPhotos(current => [...current, ...incoming.map(file => ({ file, preview: URL.createObjectURL(file) }))]); if (incoming.length) track("photo_added", { count: incoming.length, service: selectedService }); event.target.value = ""; }
  function removePhoto(index: number) { setPhotos(current => { URL.revokeObjectURL(current[index].preview); return current.filter((_, itemIndex) => itemIndex !== index); }); }
  function goNext() {
    const form = formRef.current; if (!form) return;
    const requiredNames = step === 1 ? ["serviceSlug"] : ["district", "description"];
    for (const name of requiredNames) {
      const elements = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`));
      const invalidElement = elements.find((element) => !element.checkValidity());
      if (invalidElement) { invalidElement.reportValidity(); invalidElement.focus(); return; }
    }
    setStep(value => Math.min(3, value + 1)); form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (step < 3) { goNext(); return; } setStatus({ type: "loading" });
    const form = new FormData(event.currentTarget);
    try {
      const photoPaths: string[] = [];
      for (const photo of photos) { const upload = new FormData(); upload.append("file", photo.file); const response = await fetch("/api/uploads", { method: "POST", body: upload }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Fotoğraf yüklenemedi."); photoPaths.push(result.path); }
      const params = new URLSearchParams(location.search);
      const originPage = params.get("from") || `${location.pathname}${location.search}`;
      const payload = { serviceSlug: form.get("serviceSlug"), district: form.get("district"), width: form.get("width") || undefined, height: form.get("height") || undefined, depth: form.get("depth") || undefined, unit: "cm", description: form.get("description"), customer: { name: form.get("name"), phone: form.get("phone"), email: form.get("email") || undefined }, photoPaths, kvkkAccepted: form.get("kvkk") === "on", website: form.get("website") || "", eventId: eventId.current, attribution: { source: params.get("utm_source") || undefined, medium: params.get("utm_medium") || undefined, campaign: params.get("utm_campaign") || undefined, content: params.get("utm_content") || undefined, term: params.get("utm_term") || undefined, gclid: params.get("gclid") || undefined, fbclid: params.get("fbclid") || undefined, landingPage: originPage, referrer: document.referrer || undefined } };
      const response = await fetch("/api/service-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Talebiniz kaydedilemedi.");
      track("lead_success", { service: selectedService, district: String(form.get("district") || ""), origin_page: originPage, event_id: result.eventId });
      setStatus({ type: "success", reference: result.reference }); photos.forEach(photo => URL.revokeObjectURL(photo.preview)); setPhotos([]);
    } catch (error) { track("form_validation_error", { stage: "submit", service: selectedService }); setStatus({ type: "error", message: error instanceof Error ? error.message : "Bir hata oluştu." }); }
  }

  if (status.type === "success") { const message = encodeURIComponent(`Merhaba, ${status.reference} referans numaralı ön değerlendirme talebim hakkında görüşmek istiyorum.`); return <div className="request-success"><CheckCircle2/><p className="kicker">Talebiniz alındı</p><h2 className="font-display">Alanınızı birlikte<br/><em>değerlendireceğiz.</em></h2><p>Referans numaranız: <b>{status.reference}</b>. Mesai saatlerinde gelen taleplere aynı iş günü içinde dönüş yapmayı hedefliyoruz.</p><div className="success-actions"><a className="btn-primary" href={`https://wa.me/${site.phone.replace("+", "")}?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp’tan görüş</a><a className="btn-ghost" href={`tel:${site.phone}`}><Phone/> Hemen ara</a></div><button className="text-link" onClick={() => { setStatus({ type: "idle" }); setStep(1); }}>Yeni talep oluştur</button></div>; }

  return <form ref={formRef} className="request-form request-form-stepped" onSubmit={submit}>
    <div className="request-progress"><div><span>Yaklaşık 2 dakika</span><b>{step}/3</b></div><div className="progress-track"><i style={{ width: `${step / 3 * 100}%` }}/></div><ol>{["Hizmet", "Alan ve fotoğraf", "İletişim"].map((label, index) => <li key={label} className={step >= index + 1 ? "active" : ""}><Check size={12}/>{label}</li>)}</ol></div>

    <section className="form-panel" hidden={step !== 1} aria-labelledby="request-step-1">
      <div className="request-form-head"><div><p className="kicker">01 · Hizmet</p><h2 id="request-step-1" className="font-display">Ne yaptırmak<br/><em>istiyorsunuz?</em></h2></div><p>Yaklaşık bilgi yeterli. Sistemi kesinleştirmek zorunda değilsiniz; alanınıza uygun seçeneği birlikte belirleriz.</p></div>
      <fieldset className="service-choice-grid compact" aria-label="Hizmet seçimi">{services.map((service, index) => <label key={service.slug} className={selectedService === service.slug ? "selected" : ""}><input type="radio" name="serviceSlug" value={service.slug} checked={selectedService === service.slug} onChange={() => { setSelectedService(service.slug); track("service_selected", { service: service.slug }); }} required/><span>0{index + 1}</span><b>{service.name}</b><small>{service.eyebrow}</small></label>)}</fieldset>
      <button className="gallery-disclosure" type="button" aria-expanded={galleryOpen} onClick={() => setGalleryOpen(value => !value)}><span><small>Seçiminiz · {selected.name}</small><b>Uygulama fikirlerini {galleryOpen ? "gizle" : "gör"}</b></span><ChevronDown className={galleryOpen ? "open" : ""}/></button>
      {galleryOpen && <section className="selection-gallery compact-gallery" aria-live="polite"><div className="gallery-head"><div><p className="kicker">{selected.name}</p><h3 className="font-display">Malzeme ve<br/><em>uygulama fikirleri.</em></h3></div><div className="gallery-controls"><button type="button" aria-label="Önceki görseller" onClick={() => galleryRef.current?.scrollBy({ left: -440, behavior: "smooth" })}><ArrowLeft/></button><button type="button" aria-label="Sonraki görseller" onClick={() => galleryRef.current?.scrollBy({ left: 440, behavior: "smooth" })}><ArrowRight/></button></div></div><div className="gallery-track" ref={galleryRef}>{galleryImages.map((image, index) => <figure key={`${image.src}-${index}`}><div><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 82vw, 420px"/></div><figcaption><span>{String(index + 1).padStart(2,"0")}</span><b>{image.tone}</b></figcaption></figure>)}</div><p className="gallery-note">Görseller sistem, renk ve kullanım fikri vermek içindir. Uygulama detayı alanınıza göre belirlenir.</p></section>}
      <div className="form-nav"><span>Kesin ölçü gerekmez</span><button type="button" className="request-submit" onClick={goNext}>Alan bilgisine geç <ArrowRight/></button></div>
    </section>

    <section className="form-panel" hidden={step !== 2} aria-labelledby="request-step-2">
      <div className="request-step"><div><p className="kicker">02 · Alan ve fotoğraf</p><h3 id="request-step-2" className="font-display">Alanı kısaca<br/><em>anlatın.</em></h3><p className="step-note">Yaklaşık ölçüler ve karşıdan çekilmiş bir fotoğraf, ilk değerlendirmeyi hızlandırır.</p></div><div className="request-fields"><label><span className="label">İlçe *</span><select className="field" name="district" required defaultValue={initialDistrictName}><option value="" disabled>İlçe seçin</option>{districts.map(d => <option value={d.name} key={d.slug}>{d.name}</option>)}</select></label><div className="measure-row"><label><span className="label">Genişlik</span><div className="unit-field"><input className="field" name="width" inputMode="decimal" placeholder="örn. 320"/><span>cm</span></div></label><label><span className="label">Yükseklik</span><div className="unit-field"><input className="field" name="height" inputMode="decimal" placeholder="örn. 240"/><span>cm</span></div></label><label><span className="label">Derinlik</span><div className="unit-field"><input className="field" name="depth" inputMode="decimal" placeholder="varsa"/><span>cm</span></div></label></div><label><span className="label">Alanı ve beklentinizi anlatın *</span><textarea className="field request-textarea" name="description" required minLength={10} maxLength={1000} placeholder={`${selected.name} uygulanacak alanı ve beklentinizi kısaca anlatın.`}/></label><div className="photo-grid compact-photos">{photos.map((photo, index) => <div className="photo-preview" key={photo.preview} style={{ backgroundImage: `url(${photo.preview})` }}><button type="button" onClick={() => removePhoto(index)} aria-label="Fotoğrafı kaldır"><X size={16}/></button></div>)}{photos.length < 4 && <label className="photo-upload"><ImagePlus/><b>Fotoğraf ekle</b><span>İsteğe bağlı · En fazla 4 görsel</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos}/></label>}</div><p className="upload-count">{photos.length}/4 fotoğraf · JPEG, PNG veya WebP · En fazla 5 MB</p></div></div>
      <div className="form-nav"><button type="button" className="btn-ghost" onClick={() => setStep(1)}><ArrowLeft/> Geri</button><button type="button" className="request-submit" onClick={goNext}>İletişime geç <ArrowRight/></button></div>
    </section>

    <section className="form-panel" hidden={step !== 3} aria-labelledby="request-step-3">
      <div className="request-step contact-step"><div><p className="kicker">03 · İletişim</p><h3 id="request-step-3" className="font-display">Size nasıl<br/><em>ulaşalım?</em></h3><p className="step-note">Mesai saatlerinde gelen taleplere aynı iş günü içinde dönüş yapmayı hedefliyoruz.</p></div><div className="request-fields"><div className="contact-row"><label><span className="label">Ad soyad *</span><input className="field" name="name" autoComplete="name" required minLength={2}/></label><label><span className="label">Telefon *</span><input className="field" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" pattern="(\\+90|0)?5[0-9]{9}" title="Telefonu 05xxxxxxxxx biçiminde girin" required/></label></div><label><span className="label">E-posta</span><input className="field" name="email" type="email" autoComplete="email" placeholder="İsteğe bağlı"/></label><label className="consent"><input type="checkbox" name="kvkk" required/><span><Link href="/kvkk-aydinlatma-metni" target="_blank">KVKK aydınlatma metnini</Link> okudum; bilgilerimin talebimin değerlendirilmesi ve benimle iletişim kurulması amacıyla işlenmesini kabul ediyorum.</span></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off"/>{status.type === "error" && <p className="form-error">{status.message}</p>}<p className="form-disclaimer"><Ruler size={15}/>Bu form kesin fiyat oluşturmaz. Ölçü, malzeme ve montaj koşulları doğrulandıktan sonra kapsamlı teklif paylaşılır.</p></div></div>
      <div className="form-nav"><button type="button" className="btn-ghost" onClick={() => setStep(2)}><ArrowLeft/> Geri</button><button className="request-submit" disabled={status.type === "loading"}>{status.type === "loading" ? <><LoaderCircle className="spin"/>Gönderiliyor</> : <>Ön değerlendirme iste <ArrowRight/></>}</button></div>
    </section>
  </form>;
}
