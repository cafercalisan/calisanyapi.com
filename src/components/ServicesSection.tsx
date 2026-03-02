import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="hizmetler" className="py-28 px-5 lg:px-10 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[520px] mb-14">
          <div className="text-[11px] text-accent font-bold tracking-[3px] uppercase mb-3">
            Hizmetlerimiz
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] text-white font-bold leading-[1.1] tracking-tight">
            Montaj, kurulum ve
            <br />
            tamir hizmetleri
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
