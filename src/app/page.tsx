import ShaderHero from "@/components/ui/hero";
import DistrictBanner from "@/components/DistrictBanner";
import ServicesSection from "@/components/ServicesSection";
import RepairSection from "@/components/RepairSection";
import WhyUs from "@/components/WhyUs";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <ShaderHero />
      <DistrictBanner />
      <ServicesSection />
      <RepairSection />
      <WhyUs />
      <CTASection />
    </>
  );
}
