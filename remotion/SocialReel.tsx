import {Audio} from "@remotion/media";
import {AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import type {SocialContent} from "./content";

const INK = "#172326";
const PAPER = "#f3f0e8";
const TEAL = "#18a79f";
const DISPLAY = '"Avenir Next Condensed", "Avenir Next", sans-serif';
const SERIF = '"Iowan Old Style", Baskerville, Georgia, serif';
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const fitHook = (text: string) => text.length > 58 ? 74 : text.length > 43 ? 84 : text.length > 30 ? 96 : 112;

const Brand = () => <div style={{display: "inline-flex", alignItems: "center", background: PAPER, padding: "17px 22px"}}>
  <Img src={staticFile("brand/umayapi-logo-header.webp")} style={{width: 270, height: "auto"}}/>
</div>;

const AnimatedImage = ({src, dark = .12}: {src: string; dark?: number}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 180], [1.07, 1], clamp);
  return <><Img src={staticFile(src)} style={{width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`}}/><AbsoluteFill style={{background: `rgba(8,18,20,${dark})`}}/></>;
};

const HookCard = ({item, hook, inverse = false}: {item: SocialContent; hook: string; inverse?: boolean}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 120}});
  return <div style={{width: 920, padding: "42px 46px 48px", background: inverse ? INK : PAPER, color: inverse ? PAPER : INK, transform: `translateY(${interpolate(enter,[0,1],[85,0])}px)`, opacity: enter, boxShadow: "0 22px 70px rgba(0,0,0,.2)"}}>
    <div style={{fontFamily: DISPLAY, fontSize: 30, fontWeight: 900, color: TEAL, lineHeight: 1}}>{item.kicker}</div>
    <div style={{marginTop: 24, fontFamily: DISPLAY, fontSize: fitHook(hook), fontWeight: 950, lineHeight: .88, letterSpacing: -4}}>{hook}</div>
  </div>;
};

const HookScene = ({item, hook}: {item: SocialContent; hook: string}) => {
  const frame = useCurrentFrame();
  if (item.template === "before-after") {
    const reveal = interpolate(frame, [7, 42], [10, 100], clamp);
    return <AbsoluteFill style={{background: INK, overflow: "hidden"}}><AnimatedImage src={item.asset} dark={.18}/><AbsoluteFill style={{filter: "grayscale(1) contrast(.88)", clipPath: `inset(0 ${100-reveal}% 0 0)`}}><AnimatedImage src={item.asset}/></AbsoluteFill><div style={{position: "absolute", top: 285, left: 46}}><HookCard item={item} hook={hook} inverse/></div><div style={{position: "absolute", top: 0, bottom: 0, left: `${reveal}%`, width: 8, background: TEAL}}/></AbsoluteFill>;
  }
  if (item.template === "mechanism") return <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}><AnimatedImage src={item.asset}/><div style={{position: "absolute", top: 290, left: 46}}><HookCard item={item} hook={hook}/></div><div style={{position: "absolute", top: 250, right: 0, width: 210, height: 12, background: TEAL}}/></AbsoluteFill>;
  if (item.template === "offer") return <AbsoluteFill style={{background: INK, overflow: "hidden"}}><AnimatedImage src={item.asset} dark={.1}/><AbsoluteFill style={{background: "linear-gradient(180deg,rgba(23,35,38,.03) 0%,rgba(23,35,38,.08) 48%,rgba(23,35,38,.78) 100%)"}}/><div style={{position: "absolute", top: 275, left: 46}}><HookCard item={item} hook={hook} inverse/></div></AbsoluteFill>;
  return <AbsoluteFill style={{background: INK, overflow: "hidden"}}><AnimatedImage src={item.asset} dark={.1}/><AbsoluteFill style={{background: "linear-gradient(90deg,rgba(23,35,38,.72) 0%,rgba(23,35,38,.35) 56%,rgba(23,35,38,.02) 100%)"}}/><div style={{position: "absolute", top: 285, left: 46}}><HookCard item={item} hook={hook} inverse/></div></AbsoluteFill>;
};

const ProofScene = ({item}: {item: SocialContent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 20, stiffness: 110}});
  return <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}><div style={{position: "absolute", inset: "0 0 860px 0"}}><AnimatedImage src={item.asset}/></div><div style={{position: "absolute", left: 0, right: 0, top: 900, bottom: 0, padding: "58px 64px", background: PAPER, borderTop: `12px solid ${TEAL}`}}><div style={{fontFamily: DISPLAY, fontSize: 32, fontWeight: 900, color: TEAL}}>{item.service}</div><div style={{marginTop: 26, maxWidth: 930, color: INK, fontFamily: SERIF, fontSize: 68, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2, transform: `translateY(${interpolate(enter,[0,1],[55,0])}px)`, opacity: enter}}>{item.proof}</div></div></AbsoluteFill>;
};

const CtaScene = ({item}: {item: SocialContent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 115}});
  return <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}><div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: 28, background: TEAL}}/><div style={{position: "absolute", top: 245, left: 64}}><Brand/></div><div style={{position: "absolute", top: 490, left: 64, right: 64}}><div style={{fontFamily: DISPLAY, fontSize: 32, fontWeight: 900, color: TEAL}}>ŞİMDİ</div><div style={{marginTop: 28, maxWidth: 940, color: INK, fontFamily: DISPLAY, fontSize: fitHook(item.cta)+14, fontWeight: 950, lineHeight: .86, letterSpacing: -5, transform: `translateY(${interpolate(enter,[0,1],[80,0])}px)`, opacity: enter}}>{item.cta}</div></div><div style={{position: "absolute", top: 1040, left: 64, background: INK, color: PAPER, padding: "28px 34px", fontFamily: DISPLAY, fontSize: 38, fontWeight: 900}}>umayapi.com</div></AbsoluteFill>;
};

export const SocialReel = ({item, variantIndex = 0}: {item: SocialContent; variantIndex?: number}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const hookFrames = Math.round(durationInFrames*.34);
  const proofFrames = Math.round(durationInFrames*.41);
  const ctaStart = hookFrames+proofFrames;
  const hook = item.hookVariants?.[variantIndex] ?? item.hook;
  return <AbsoluteFill style={{background: INK}}><Audio src={staticFile("remotion/audio/meta-bed.wav")} volume={item.paid?.34:.22} loop/><Sequence from={0} durationInFrames={hookFrames}><HookScene item={item} hook={hook}/></Sequence><Sequence from={hookFrames} durationInFrames={proofFrames}><ProofScene item={item}/></Sequence><Sequence from={ctaStart} durationInFrames={durationInFrames-ctaStart}><CtaScene item={item}/></Sequence><div style={{position: "absolute", zIndex: 20, left: 0, bottom: 0, width: `${interpolate(frame,[0,durationInFrames-1],[0,100],clamp)}%`, height: 10, background: TEAL}}/></AbsoluteFill>;
};
