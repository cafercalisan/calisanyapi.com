import {Audio} from "@remotion/media";
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

const INK = "#172326";
const PAPER = "#f3f0e8";
const TEAL = "#18a79f";
const DISPLAY = '"Avenir Next Condensed", "Avenir Next", sans-serif';
const HOOK_DISPLAY = '"DIN Condensed", "Futura Condensed ExtraBold", Impact, sans-serif';
const CONTACT_DISPLAY = '"Avenir Next", "Helvetica Neue", sans-serif';
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const PhoneIcon = () => <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
</svg>;

const WebIcon = () => <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>
</svg>;

const SourceVideo = ({startFrom = 0}: {startFrom?: number}) => <AbsoluteFill style={{background: INK, overflow: "hidden"}}>
  <OffthreadVideo
    src={staticFile("remotion/source/surme-sineklik-kaynak.webm")}
    startFrom={startFrom}
    muted
    style={{width: "100%", height: "100%", objectFit: "cover"}}
  />
</AbsoluteFill>;

const Opening = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 125}});
  return <AbsoluteFill>
    <SourceVideo/>
    <div style={{position: "absolute", top: 250, left: 44, width: 936, padding: "36px 42px 42px 54px", background: "rgba(23,35,38,.92)", borderLeft: `14px solid ${TEAL}`, color: PAPER, transform: `translateY(${interpolate(enter,[0,1],[80,0])}px) rotate(-1.2deg)`, opacity: enter, boxShadow: "0 24px 70px rgba(0,0,0,.26)"}}>
      <div style={{fontFamily: HOOK_DISPLAY, fontSize: 142, fontWeight: 900, lineHeight: .78, letterSpacing: -4}}>SÜRGÜLÜ<br/><span style={{color: TEAL}}>SİNEKLİK.</span></div>
    </div>
  </AbsoluteFill>;
};

const Demonstration = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [0, 65], [0, 1], clamp);
  return <AbsoluteFill>
    <SourceVideo/>
    <div style={{position: "absolute", left: 46, right: 46, top: 1040, padding: "34px 40px", background: PAPER, color: INK}}>
      <div style={{fontFamily: DISPLAY, fontSize: 70, fontWeight: 950, lineHeight: .9}}>TEK HAREKETLE<br/><span style={{color: TEAL}}>AÇ. KAPAT.</span></div>
      <div style={{marginTop: 28, width: `${Math.round(line*100)}%`, height: 10, background: TEAL}}/>
    </div>
  </AbsoluteFill>;
};

const CallToAction = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 115}});
  return <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}>
    <div style={{position: "absolute", inset: -70, filter: "blur(26px) saturate(.7) contrast(.9)", transform: "scale(1.08)", opacity: .42}}><SourceVideo startFrom={90}/></div>
    <AbsoluteFill style={{background: "linear-gradient(135deg,rgba(243,240,232,.90) 0%,rgba(243,240,232,.78) 58%,rgba(24,167,159,.14) 100%)"}}/>
    <div style={{position: "absolute", top: 120, left: 64, right: 64}}>
      <div style={{width: 760, height: 285, margin: "0 auto", overflow: "hidden"}}>
        <Img src={staticFile("brand/calisan-yapi-logo.png")} style={{width: 760, height: 318, objectFit: "contain", transform: "translateY(-20px)"}}/>
      </div>
      <div style={{marginTop: 130, fontFamily: DISPLAY, fontSize: 116, fontWeight: 950, lineHeight: .82, letterSpacing: -5, textAlign: "center", color: INK, transform: `translateY(${interpolate(enter,[0,1],[75,0])}px)`, opacity: enter}}>ÖLÇÜNÜ<br/><span style={{color: TEAL}}>GÖNDER.</span><br/>HAZIRLAYALIM.</div>
    </div>
    <div style={{position: "absolute", left: 64, right: 64, top: 1120, display: "flex", flexDirection: "column", gap: 16}}>
      <div style={{padding: "27px 34px", background: INK, color: PAPER, fontFamily: CONTACT_DISPLAY, fontSize: 52, fontWeight: 800, letterSpacing: 1, boxShadow: "0 22px 60px rgba(23,35,38,.18)", display: "flex", alignItems: "center", justifyContent: "center", gap: 24}}>
        <PhoneIcon/><span>0539 316 52 17</span>
      </div>
      <div style={{padding: "27px 34px", background: "rgba(243,240,232,.94)", border: `4px solid ${INK}`, color: INK, fontFamily: CONTACT_DISPLAY, fontSize: 48, fontWeight: 800, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 24}}>
        <WebIcon/><span>calisanyapi.com</span>
      </div>
    </div>
  </AbsoluteFill>;
};

export const SlidingScreenReel = () => <AbsoluteFill style={{background: INK}}>
  <Audio src={staticFile("remotion/audio/meta-bed.wav")} volume={.24} loop/>
  <Sequence from={0} durationInFrames={75}><Opening/></Sequence>
  <Sequence from={75} durationInFrames={150}><Demonstration/></Sequence>
  <Sequence from={225} durationInFrames={105}><CallToAction/></Sequence>
</AbsoluteFill>;
