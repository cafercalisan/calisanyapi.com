"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FastForward } from "lucide-react";

export function IntroScene() {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const duration = useRef(8);
  const targetTime = useRef(0);
  const frame = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, .08, .36, .48], [0, 1, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [.58, .72, 1], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, .1, .4], [32, 0, -30]);

  useEffect(() => { queueMicrotask(() => setSeen(localStorage.getItem("cy_intro_seen") === "1")); }, []);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    targetTime.current = Math.max(0, Math.min(duration.current - .02, value * duration.current));
    if (!reduced && videoReady && frame.current === null) {
      const seek = () => {
        const element = video.current;
        if (!element) { frame.current = null; return; }
        const difference = targetTime.current - element.currentTime;
        if (Math.abs(difference) < .018) {
          element.currentTime = targetTime.current;
          frame.current = null;
          return;
        }
        element.currentTime += difference * .28;
        frame.current = requestAnimationFrame(seek);
      };
      frame.current = requestAnimationFrame(seek);
    }
    if (value > .85) localStorage.setItem("cy_intro_seen", "1");
  });
  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);
  const skip = () => { localStorage.setItem("cy_intro_seen", "1"); document.getElementById("teklif")?.scrollIntoView(); };

  if (seen) return (
    <section className="relative overflow-hidden bg-[#172326] px-5 py-3 text-white">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-white/60">Çalışan Yapı · Ölçüye özel sineklik</p>
        <button onClick={() => { localStorage.removeItem("cy_intro_seen"); setSeen(false); }} className="text-[10px] uppercase tracking-[.16em] text-[#78d5cf]">Açılışı tekrar izle</button>
      </div>
    </section>
  );

  return (
    <div ref={track} className="relative h-[360vh]">
      <section className="grain sticky top-0 h-screen overflow-hidden bg-[#10191b] text-white">
        {!reduced && <video ref={video} src="/intro/intro-scene.mp4" poster="/intro/intro-poster.jpg" muted playsInline preload="auto" disablePictureInPicture className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`} onLoadedMetadata={(event) => { const element=event.currentTarget; duration.current=Number.isFinite(element.duration)?element.duration:8; element.pause(); element.currentTime=.01; setVideoReady(true); }} />}
        {!videoReady && !reduced && <div className="absolute inset-0 bg-[url('/intro/intro-poster.jpg')] bg-cover bg-center" />}
        {reduced && <div className="absolute inset-0 bg-[url('/intro/intro-end.jpg')] bg-cover bg-center" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,18,20,.54),rgba(9,18,20,.16)_45%,rgba(9,18,20,.72))]" />
        <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-12">
          <span className="font-display text-2xl tracking-wide">Çalışan Yapı</span>
          <button onClick={skip} className="flex items-center gap-2 border border-white/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] backdrop-blur"><FastForward size={13}/> Teklife geç</button>
        </header>
        <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
          <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#78d5cf]">Pencerenize doğru çözüm</span>
            <h1 className="font-display mt-5 text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[.78] tracking-[-.04em]">Havayı içeri,<br/><i className="font-normal text-[#7edbd4]">sinekleri dışarı.</i></h1>
          </motion.div>
          <motion.div style={{ opacity: finalOpacity }} className="absolute max-w-3xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-[#78d5cf]">Ölçünüz hazırsa, başlayalım</p>
            <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[.84]">Sinekliğinizi<br/>kendiniz oluşturun.</h2>
            <button onClick={skip} className="mt-9 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-xs font-bold uppercase tracking-[.16em]">Teklifi oluştur <ArrowDown size={15}/></button>
          </motion.div>
        </div>
        <div className="absolute bottom-7 left-6 z-10 flex items-center gap-3 text-[9px] uppercase tracking-[.2em] text-white/55 md:left-12"><span className="h-px w-10 bg-[#78d5cf]"/> Kaydırdıkça pencere açılır</div>
      </section>
    </div>
  );
}
