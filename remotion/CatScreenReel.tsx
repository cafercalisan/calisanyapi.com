import {Audio} from "@remotion/media";
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

const INK = "#172326";
const PAPER = "#f3f0e8";
const TEAL = "#18a79f";
const DISPLAY = '"DIN Condensed", "Avenir Next Condensed", Impact, sans-serif';
const CONTACT = '"Avenir Next", "Helvetica Neue", sans-serif';
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const SourceVideo = ({startFrom = 0}: {startFrom?: number}) => <AbsoluteFill style={{background: INK, overflow: "hidden"}}>
  <OffthreadVideo src={staticFile("remotion/source/kedi-sinekligi-kaynak.mp4")} startFrom={startFrom} muted style={{width: "100%", height: "100%", objectFit: "cover"}}/>
</AbsoluteFill>;

const Logo = ({width = 540}: {width?: number}) => <Img src={staticFile("brand/umayapi-logo-corporate-transparent.png")} style={{width, height: width, objectFit: "contain"}}/>;

const Opening = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 17, stiffness: 125}});
  return <AbsoluteFill style={{background: INK, overflow: "hidden"}}>
    <SourceVideo startFrom={12}/>
    <AbsoluteFill style={{background: "linear-gradient(180deg,rgba(8,18,20,.1),rgba(8,18,20,.14) 46%,rgba(8,18,20,.82))"}}/>
    <div style={{position: "absolute", left: 48, right: 48, bottom: 230, padding: "42px 48px 48px", background: "rgba(23,35,38,.94)", borderTop: `12px solid ${TEAL}`, transform: `translateY(${interpolate(enter,[0,1],[90,0])}px)`, opacity: enter}}>
      <div style={{fontFamily: DISPLAY, color: PAPER, fontSize: 118, fontWeight: 950, lineHeight: .82, letterSpacing: -3}}>KEDİ OLAN EVDE<br/><span style={{color: TEAL}}>HER TÜL OLMAZ.</span></div>
    </div>
  </AbsoluteFill>;
};

const Detail = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame,[0,42],[0,1],clamp);
  return <AbsoluteFill style={{background: PAPER, overflow: "hidden"}}>
    <div style={{position: "absolute", inset: "0 0 720px"}}><SourceVideo startFrom={135}/></div>
    <div style={{position: "absolute", right: 44, top: 735, width: 430, height: 535, overflow: "hidden", border: `8px solid ${PAPER}`, boxShadow: "0 22px 70px rgba(0,0,0,.25)", transform: `translateX(${interpolate(reveal,[0,1],[180,0])}px)`}}>
      <Img src={staticFile("cat-outdoor-visuals/04-dayanikli-kedi-tulu-detay.png")} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
    </div>
    <div style={{position: "absolute", left: 54, top: 785, width: 580, padding: "42px 42px 48px", background: INK, color: PAPER}}>
      <div style={{fontFamily: DISPLAY, fontSize: 78, fontWeight: 950, lineHeight: .88}}>DAYANIKLI TÜL.<br/><span style={{color: TEAL}}>GÜVENLİ KAPANIŞ.</span></div>
    </div>
    <div style={{position: "absolute", left: 54, right: 54, bottom: 250, paddingTop: 34, borderTop: `8px solid ${TEAL}`, fontFamily: CONTACT, fontSize: 54, fontWeight: 800, lineHeight: 1.08, color: INK}}>Tül, kilit ve kullanım biçimi birlikte seçilir.</div>
  </AbsoluteFill>;
};

const PhoneIcon = () => <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/></svg>;
const WebIcon = () => <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>;

const CallToAction = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 115}});
  return <AbsoluteFill style={{background: INK, overflow: "hidden"}}>
    <div style={{position: "absolute", inset: -60, filter: "blur(18px) saturate(.72)", transform: "scale(1.08)"}}><SourceVideo startFrom={210}/></div>
    <AbsoluteFill style={{background: "linear-gradient(180deg,rgba(10,20,22,.60),rgba(10,20,22,.82))"}}/>
    <div style={{position: "absolute", top: 95, left: 80, right: 80, height: 950, padding: "42px 52px 58px", background: "rgba(243,240,232,.94)", borderTop: `12px solid ${TEAL}`, boxShadow: "0 28px 90px rgba(0,0,0,.32)"}}>
      <div style={{width: 650, height: 370, margin: "0 auto", overflow: "hidden"}}><Logo width={650}/></div>
      <div style={{marginTop: 24, textAlign: "center", transform: `translateY(${interpolate(enter,[0,1],[70,0])}px)`, opacity: enter}}>
        <div style={{fontFamily: DISPLAY, color: INK, fontSize: 92, fontWeight: 950, lineHeight: .84, letterSpacing: -3}}>SİZE EN UYGUN<br/>ÜRÜN İÇİN<br/><span style={{color: TEAL}}>ÖLÇÜNÜ GÖNDER.</span><br/>HAZIRLAYALIM.</div>
      </div>
    </div>
    <div style={{position: "absolute", left: 80, right: 80, top: 1110, display: "flex", flexDirection: "column", gap: 16}}>
      <div style={{padding: "28px 34px", background: INK, color: PAPER, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, fontFamily: CONTACT, fontSize: 50, fontWeight: 800}}><PhoneIcon/>0539 316 52 17</div>
      <div style={{padding: "28px 34px", background: PAPER, border: `4px solid ${INK}`, color: INK, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, fontFamily: CONTACT, fontSize: 48, fontWeight: 800}}><WebIcon/>calisanyapi.com</div>
    </div>
  </AbsoluteFill>;
};

export const CatScreenReel = () => <AbsoluteFill style={{background: INK}}>
  <Audio src={staticFile("remotion/audio/meta-bed.wav")} volume={.23} loop/>
  <Sequence from={0} durationInFrames={150}><Opening/></Sequence>
  <Sequence from={150} durationInFrames={270}><Detail/></Sequence>
  <Sequence from={420} durationInFrames={180}><CallToAction/></Sequence>
</AbsoluteFill>;
