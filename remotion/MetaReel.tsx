import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type HookVariant = "problem" | "curiosity" | "outcome";

const INK = "#252c2e";
const TEAL = "#08aeb7";
const PAPER = "#f7f7f5";
const DISPLAY = '"Helvetica Neue", Helvetica, sans-serif';

const hooks: Record<HookVariant, {top: string; accent: string; image: string}> = {
  problem: {
    top: "HAVA\nGİREBİLİR.",
    accent: "SİNEK\nGİREMEZ.",
    image: "products/lifestyle-kapi-plise.jpg",
  },
  curiosity: {
    top: "KAPIYI\nAÇIN.",
    accent: "HUZURU\nKAPATMAYIN.",
    image: "products/pliseli-kapi-ref2.webp",
  },
  outcome: {
    top: "TEMİZ HAVA\nİÇERİ.",
    accent: "SİNEKLER\nDIŞARI.",
    image: "products/lifestyle-pencere-plise.jpg",
  },
};

const reveal = (frame: number, delay: number, fps: number) => {
  const value = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 150, mass: 0.8}});
  return {
    opacity: interpolate(value, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(value, [0, 1], [95, 0])}px)`,
  };
};

const Logo = ({light = false}: {light?: boolean}) => (
  <div style={{display: "flex", alignItems: "center", gap: 20, color: light ? "white" : INK}}>
    <div style={{position: "relative", width: 58, height: 66}}>
      <div style={{position: "absolute", inset: "0 31px 0 0", background: TEAL, clipPath: "polygon(0 18%,100% 0,100% 100%,0 100%)"}} />
      <div style={{position: "absolute", inset: "9px 0 0 31px", border: `7px solid ${light ? "white" : INK}`}} />
    </div>
    <div style={{fontFamily: DISPLAY, fontSize: 30, fontWeight: 800, letterSpacing: 7, lineHeight: 1.05}}>ÇALIŞAN<br/><span style={{color: TEAL}}>YAPI</span></div>
  </div>
);

const HeroScene = ({variant}: {variant: HookVariant}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const hook = hooks[variant];
  const photoIn = spring({frame, fps, config: {damping: 20, stiffness: 90}});
  const line = interpolate(frame, [12, 55], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const zoom = interpolate(frame, [0, 105], [1.08, 1.0], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}>
      <div style={{position: "absolute", left: 0, right: 0, top: 0, height: 1010, overflow: "hidden", transform: `translateX(${interpolate(photoIn, [0, 1], [180, 0])}px)`}}>
        <Img src={staticFile(hook.image)} style={{width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`}} />
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.22))"}} />
        <div style={{position: "absolute", top: 70, left: 64}}><Logo light /></div>
      </div>

      <div style={{position: "absolute", left: 0, right: 0, bottom: 0, height: 980, background: PAPER, padding: "92px 64px 72px"}}>
        <div style={{width: 135, height: 10, background: TEAL, transformOrigin: "left", transform: `scaleX(${line})`, marginBottom: 48}} />
        {hook.top.split("\n").map((text, index) => (
          <div key={text} style={{...reveal(frame, 5 + index * 4, fps), fontFamily: DISPLAY, color: INK, fontWeight: 900, fontSize: 146, lineHeight: .84, letterSpacing: -8}}>{text}</div>
        ))}
        <div style={{height: 26}} />
        {hook.accent.split("\n").map((text, index) => (
          <div key={text} style={{...reveal(frame, 13 + index * 4, fps), fontFamily: DISPLAY, color: TEAL, fontWeight: 900, fontSize: 146, lineHeight: .84, letterSpacing: -8}}>{text}</div>
        ))}
        <div style={{position: "absolute", left: 64, bottom: 62, fontFamily: DISPLAY, color: INK, fontSize: 24, fontWeight: 600, letterSpacing: 2}}>SİNEKLİK  |  PVC PENCERE  |  PVC KAPI  |  CAM BALKON</div>
      </div>
    </AbsoluteFill>
  );
};

const ProductScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fold = interpolate(frame, [8, 72], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}>
      <Img src={staticFile("products/pliseli-kapi-ref.webp")} style={{width: "100%", height: "100%", objectFit: "cover", transform: `scale(${interpolate(frame, [0, 90], [1.04, 1.12])})`}} />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.1) 25%,rgba(0,0,0,.86) 100%)"}} />
      <div style={{position: "absolute", top: 76, left: 64}}><Logo light /></div>
      <div style={{position: "absolute", left: 64, right: 50, bottom: 190}}>
        <div style={{...reveal(frame, 0, fps), fontFamily: DISPLAY, color: "white", fontWeight: 900, fontSize: 154, lineHeight: .85, letterSpacing: -9}}>TEK<br/>HAREKETLE</div>
        <div style={{...reveal(frame, 7, fps), fontFamily: DISPLAY, color: TEAL, fontWeight: 900, fontSize: 154, lineHeight: .85, letterSpacing: -9}}>AÇILIR.</div>
        <div style={{width: `${Math.round(760 * fold)}px`, height: 12, background: TEAL, marginTop: 52}} />
      </div>
    </AbsoluteFill>
  );
};

const CtaScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const button = spring({frame: frame - 20, fps, config: {damping: 12, stiffness: 130}});
  return (
    <AbsoluteFill style={{background: PAPER, padding: "84px 64px"}}>
      <Logo />
      <div style={{marginTop: 245}}>
        <div style={{...reveal(frame, 0, fps), fontFamily: DISPLAY, fontWeight: 900, fontSize: 164, lineHeight: .84, letterSpacing: -10, color: INK}}>ÖLÇÜNÜ<br/>GİR.</div>
        <div style={{height: 32}} />
        <div style={{...reveal(frame, 7, fps), fontFamily: DISPLAY, fontWeight: 900, fontSize: 164, lineHeight: .84, letterSpacing: -10, color: TEAL}}>TEKLİFİNİ<br/>AL.</div>
      </div>
      <div style={{position: "absolute", left: 64, right: 64, bottom: 255, background: INK, color: "white", padding: "34px 42px", transform: `scale(${interpolate(button, [0, 1], [.82, 1])})`, opacity: button}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 43, letterSpacing: -1}}>umayapi.com</div>
      </div>
      <div style={{position: "absolute", left: 64, bottom: 105, fontFamily: DISPLAY, fontSize: 27, color: INK, fontWeight: 700, letterSpacing: 2}}>EVİNİZE ÖZEL ÜRETİM · HIZLI TEKLİF</div>
    </AbsoluteFill>
  );
};

export const MetaReel = ({hook}: {hook: HookVariant}) => (
  <AbsoluteFill style={{background: PAPER}}>
    <Audio src={staticFile("remotion/audio/meta-bed.wav")} volume={0.34} />
    <Sequence from={0} durationInFrames={120}><HeroScene variant={hook}/></Sequence>
    <Sequence from={120} durationInFrames={105}><ProductScene/></Sequence>
    <Sequence from={225} durationInFrames={105}><CtaScene/></Sequence>
  </AbsoluteFill>
);
