"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, DoorOpen, PanelsTopLeft, Rotate3D, Ruler, Wrench } from "lucide-react";
import styles from "./Sineklik3DConfigurator.module.css";

const Scene = dynamic(() => import("@/components/Flyscreen3DScene").then((module) => module.Flyscreen3DScene), {
  ssr: false,
  loading: () => <div className={styles.viewerLoading}><span/><b>3D model hazırlanıyor…</b></div>,
});

type Area = "window" | "door";
type System = "hinged" | "sliding";
type Finish = "white" | "anthracite" | "golden-oak";

const finishes: { id: Finish; name: string; code: string; value: string }[] = [
  { id: "white", name: "Beyaz", code: "RAL 9016 · #F1F0EA", value: "#F1F0EA" },
  { id: "anthracite", name: "Antrasit Gri", code: "RAL 7016 · #383E42", value: "#383E42" },
  { id: "golden-oak", name: "Altın Meşe", code: "Ahşap desen", value: "linear-gradient(135deg,#F0D7A4,#BC8950 55%,#E5C48C)" },
];

function safeDimension(value: string, fallback: number) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 600 ? parsed : fallback;
}

export function Sineklik3DConfigurator() {
  const [area, setArea] = useState<Area>("window");
  const [system, setSystem] = useState<System>("sliding");
  const [finish, setFinish] = useState<Finish>("anthracite");
  const [widthText, setWidthText] = useState("120");
  const [heightText, setHeightText] = useState("140");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [installed, setInstalled] = useState(false);
  const [mountAnimationKey, setMountAnimationKey] = useState(0);
  const [attribution, setAttribution] = useState("");
  const width = safeDimension(widthText, area === "door" ? 90 : 120);
  const height = safeDimension(heightText, area === "door" ? 205 : 140);
  const selectedFinish = finishes.find((item) => item.id === finish)!;

  useEffect(() => { setMountAnimationKey(0); }, [area, finish, height, system, width]);

  useEffect(() => {
    if (!demoActive) return;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      setProgress(step % 2 === 1 ? 1 : 0);
      if (step >= 6) {
        window.clearInterval(timer);
        setProgress(0);
        setDemoActive(false);
      }
    }, 650);
    return () => window.clearInterval(timer);
  }, [demoActive]);

  useEffect(() => {
    if (system !== "sliding" || demoStarted) return;
    const maybeStartOnScroll = () => {
      if (!window.matchMedia("(max-width: 900px)").matches) return;
      const bounds = viewerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const visibleHeight = Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0);
      if (visibleHeight >= bounds.height * .35) {
        setDemoStarted(true);
        setDemoActive(true);
        setProgress(0);
      }
    };
    window.addEventListener("scroll", maybeStartOnScroll, { passive: true });
    maybeStartOnScroll();
    return () => window.removeEventListener("scroll", maybeStartOnScroll);
  }, [demoStarted, system]);

  const startDemo = () => {
    if (system !== "sliding" || demoStarted) return;
    setDemoStarted(true);
    setDemoActive(true);
    setProgress(0);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of [...params.keys()]) if (!key.startsWith("utm_") && !["gclid", "fbclid"].includes(key)) params.delete(key);
    setAttribution(params.toString());
  }, []);

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams(attribution);
    params.set("area", area);
    params.set("system", system);
    params.set("finish", finish);
    params.set("width", String(width));
    params.set("height", String(height));
    return `/sineklik-fiyat-hesapla?${params.toString()}`;
  }, [area, attribution, finish, height, system, width]);

  return <section className={styles.configurator} aria-label="3D sineklik modelini özelleştir">
    <div className={styles.viewerPanel}>
      <div className={styles.viewerTop}><span>ETKİLEŞİMLİ 3D ÖN İZLEME</span><span><Rotate3D size={15}/> Sürükleyerek döndür</span></div>
      <div className={styles.sceneModes} role="group" aria-label="Model görünümü">
        <button type="button" className={!installed ? styles.activeSceneMode : ""} onClick={() => { setInstalled(false); setMountAnimationKey(0); }} aria-pressed={!installed}>Ürün</button>
        <button type="button" className={installed ? styles.activeSceneMode : ""} onClick={() => { setInstalled(true); setMountAnimationKey(0); }} aria-pressed={installed}>Montaj örneği</button>
      </div>
      <div className={styles.viewer} ref={viewerRef} onMouseEnter={startDemo}>
        <Scene area={area} system={system} finish={finish} width={width} height={height} open={open} progress={progress} onProgressChange={setProgress} dragEnabled={!demoActive} installed={installed} mountAnimationKey={mountAnimationKey}/>
        {system === "sliding" && <div className={styles.dragIndicator} aria-hidden="true"><ArrowLeft/><span>TUTMA PROFİLİNİ ÇEK</span><ArrowRight/></div>}
      </div>
      <div className={styles.viewerCaption}><span>{area === "window" ? "Pencere" : "Kapı / balkon"} · {system === "hinged" ? "Menteşeli plise" : "Plise"} · {selectedFinish.name}</span><span>{width} × {height} cm</span></div>
      <p className={styles.disclaimer}>{system === "hinged" ? "28 mm seri alüminyum çerçeve; pileli tül profilin içinde kalır. İki menteşe ve tek tutacak." : "28 mm seri profil içinde pileli tül ve boydan boya ince tutma oluğu gösterilir."}</p>
    </div>

    <div className={styles.controls}>
      <div className={styles.controlHeading}><p className={styles.eyebrow}>ÜRÜNÜNÜ TASARLA</p><h2>Önce nasıl<br/><em>açılacağını seç.</em></h2><p>Seçimlerinle 3D modeli anında güncelle.</p></div>
      <fieldset><legend><span>01</span> Uygulama alanı</legend><div className={styles.choiceRow}>
        <button type="button" className={area === "window" ? styles.selectedChoice : ""} onClick={() => setArea("window")} aria-pressed={area === "window"}><PanelsTopLeft/><span>Pencere</span></button>
        <button type="button" className={area === "door" ? styles.selectedChoice : ""} onClick={() => setArea("door")} aria-pressed={area === "door"}><DoorOpen/><span>Kapı</span></button>
      </div></fieldset>

      <fieldset><legend><span>02</span> Sineklik modeli</legend><div className={styles.modelChoices}>
        <button type="button" className={`${styles.modelChoice} ${system === "hinged" ? styles.selectedModel : ""}`} onClick={() => { setSystem("hinged"); setDemoActive(false); setDemoStarted(false); setProgress(0); }} aria-pressed={system === "hinged"}><i className={styles.hingeIcon}><b/></i><span><strong>Menteşeli</strong><small>Dışa doğru açılır</small></span></button>
        <button type="button" className={`${styles.modelChoice} ${system === "sliding" ? styles.selectedModel : ""}`} onClick={() => { setSystem("sliding"); setDemoActive(false); setDemoStarted(false); setProgress(0); }} aria-pressed={system === "sliding"}><i className={styles.pleatIcon}><b/><b/><b/><b/><b/></i><span><strong>Plise</strong><small>Yana katlanır</small></span></button>
      </div></fieldset>

      <fieldset><legend><span>03</span> Profil rengi</legend><div className={styles.finishChoices}>{finishes.map((item) => <button type="button" key={item.id} className={`${styles.finishChoice} ${finish === item.id ? styles.selectedFinish : ""}`} onClick={() => setFinish(item.id)} aria-pressed={finish === item.id}><i style={{ background: item.value }}/><span><strong>{item.name}</strong><small>{item.code}</small></span></button>)}</div></fieldset>

      <fieldset><legend><span>04</span> Yaklaşık ölçü</legend><div className={styles.dimensions}><label><span>En</span><div><input inputMode="decimal" value={widthText} onChange={(event) => setWidthText(event.target.value.replace(/[^\d.,]/g, ""))} aria-label="Genişlik santimetre"/><b>cm</b></div></label><label><span>Boy</span><div><input inputMode="decimal" value={heightText} onChange={(event) => setHeightText(event.target.value.replace(/[^\d.,]/g, ""))} aria-label="Yükseklik santimetre"/><b>cm</b></div></label></div></fieldset>

      <button type="button" className={styles.openButton} onClick={() => system === "hinged" ? setOpen((value) => !value) : setProgress((value) => value > .5 ? 0 : 1)}><ArrowDownRight/> {system === "hinged" ? (open ? "Modeli kapat" : "Menteşeyi hareket ettir") : (progress > .5 ? "Pliseyi kapat" : "Pliseyi aç")}</button>
      {system === "sliding" && <p className={styles.dragHint}>{demoActive ? "Plise hareketini izleyin…" : "Tutma profilini sağa sola sürükleyerek açıp kapatın."}{width > 200 ? " İki kanat ortada birleşir." : ""}</p>}
      {installed && <button type="button" className={styles.mountButton} onClick={() => setMountAnimationKey((key) => key + 1)}><Wrench size={15}/> Dört köşe vidasını tak</button>}
      <a className={styles.quoteButton} href={quoteHref}><span><Ruler size={16}/> Ölçülerimi teklife taşı</span><ArrowRight size={18}/></a>
    </div>
  </section>;
}
