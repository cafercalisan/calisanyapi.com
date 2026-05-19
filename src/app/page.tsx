import HeroVideo from "@/components/plise/HeroVideo";
import DoorRevealScroll from "@/components/plise/DoorRevealScroll";
import Showcase from "@/components/plise/Showcase";
import Gallery from "@/components/plise/Gallery";
import Configurator from "@/components/plise/Configurator";
import HowToMeasure from "@/components/plise/HowToMeasure";
import SocialProof from "@/components/plise/SocialProof";
import FAQ from "@/components/plise/FAQ";
import MobileStickyCTA from "@/components/plise/MobileStickyCTA";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DoorRevealScroll />
      <Showcase />
      <Gallery />
      <Configurator />
      <HowToMeasure />
      <SocialProof />
      <FAQ />
      <CTASection />
      <MobileStickyCTA />
    </>
  );
}
