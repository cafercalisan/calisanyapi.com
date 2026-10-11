"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, DoorOpen, PanelsTopLeft, Rotate3D, Ruler } from "lucide-react";
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
  const [attribution, setAttribution] = useState("");
  const width = safeDimension(widthText, area === "door" ? 90 : 120);
  const height = safeDimension(heightText, area === "door" ? 205 : 140);
  const selectedFinish = finishes.find((item) => item.id === finish)!;

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
      <div className={styles.viewer}><Scene area={area} system={system} finish={finish} width={width} height={height} open={open}/></div>
      <div className={styles.viewerCaption}><span>{area === "window" ? "Pencere" : "Kapı / balkon"} · {system === "hinged" ? "Menteşeli" : "Plise"} · {selectedFinish.name}</span><span>{width} × {height} cm</span></div>
      <p className={styles.disclaimer}>{system === "hinged" ? "Menteşeli model: 17 × 25 mm alüminyum profil ve kontrast tonda, ikişer delikli köşe bağlantıları." : "Profil rengi değişir; file alanı açık ve şeffaf kalır. Model temsili 3D ön izlemedir."}</p>
    </div>

    <div className={styles.controls}>
      <div className={styles.controlHeading}><p className={styles.eyebrow}>ÜRÜNÜNÜ TASARLA</p><h2>Önce nasıl<br/><em>açılacağını seç.</em></h2><p>Seçimlerinle 3D modeli anında güncelle.</p></div>
      <fieldset><legend><span>01</span> Uygulama alanı</legend><div className={styles.choiceRow}>
        <button type="button" className={area === "window" ? styles.selectedChoice : ""} onClick={() => setArea("window")} aria-pressed={area === "window"}><PanelsTopLeft/><span>Pencere</span></button>
        <button type="button" className={area === "door" ? styles.selectedChoice : ""} onClick={() => setArea("door")} aria-pressed={area === "door"}><DoorOpen/><span>Kapı</span></button>
      </div></fieldset>

      <fieldset><legend><span>02</span> Sineklik modeli</legend><div className={styles.modelChoices}>
        <button type="button" className={`${styles.modelChoice} ${system === "hinged" ? styles.selectedModel : ""}`} onClick={() => setSystem("hinged")} aria-pressed={system === "hinged"}><i className={styles.hingeIcon}><b/></i><span><strong>Menteşeli</strong><small>Dışa doğru açılır</small></span></button>
        <button type="button" className={`${styles.modelChoice} ${system === "sliding" ? styles.selectedModel : ""}`} onClick={() => setSystem("sliding")} aria-pressed={system === "sliding"}><i className={styles.pleatIcon}><b/><b/><b/><b/><b/></i><span><strong>Plise</strong><small>Yana katlanır</small></span></button>
      </div></fieldset>

      <fieldset><legend><span>03</span> Profil rengi</legend><div className={styles.finishChoices}>{finishes.map((item) => <button type="button" key={item.id} className={`${styles.finishChoice} ${finish === item.id ? styles.selectedFinish : ""}`} onClick={() => setFinish(item.id)} aria-pressed={finish === item.id}><i style={{ background: item.value }}/><span><strong>{item.name}</strong><small>{item.code}</small></span></button>)}</div></fieldset>

      <fieldset><legend><span>04</span> Yaklaşık ölçü</legend><div className={styles.dimensions}><label><span>En</span><div><input inputMode="decimal" value={widthText} onChange={(event) => setWidthText(event.target.value.replace(/[^\d.,]/g, ""))} aria-label="Genişlik santimetre"/><b>cm</b></div></label><label><span>Boy</span><div><input inputMode="decimal" value={heightText} onChange={(event) => setHeightText(event.target.value.replace(/[^\d.,]/g, ""))} aria-label="Yükseklik santimetre"/><b>cm</b></div></label></div></fieldset>

      <button type="button" className={styles.openButton} onClick={() => setOpen((value) => !value)}><ArrowDownRight/> {open ? "Modeli kapat" : system === "hinged" ? "Menteşeyi hareket ettir" : "Plise açılımını göster"}</button>
      <a className={styles.quoteButton} href={quoteHref}><span><Ruler size={16}/> Ölçülerimi teklife taşı</span><ArrowRight size={18}/></a>
    </div>
  </section>;
}
