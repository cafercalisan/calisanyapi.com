import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";

type LocalServiceShowcaseProps = {
  placeName: string;
};

export function LocalServiceShowcase({ placeName }: LocalServiceShowcaseProps) {
  return (
    <section className="local-showcase">
      <header className="local-showcase-heading">
        <div>
          <p className="kicker">{placeName} için çözümler</p>
          <h2 className="font-display">
            Alanınıza uygun<br />
            <em>dokuz uzmanlık.</em>
          </h2>
        </div>
        <p>
          Pencere ve balkonlardan teraslara, güvenlik elemanlarından iç mekân
          çözümlerine kadar uygulama seçeneklerini görselleriyle inceleyin.
        </p>
      </header>

      <div className="local-showcase-grid">
        {services.map((service, index) => (
          <Link
            className="local-showcase-card"
            href={`/hizmetler/${service.slug}`}
            key={service.slug}
          >
            <div className="local-showcase-image">
              <Image
                src={service.image}
                alt={`${placeName} ${service.name} uygulama örneği`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="local-showcase-copy">
              <p>{service.eyebrow}</p>
              <h3 className="font-display">{service.name}</h3>
              <div>
                <small>{service.summary}</small>
                <ArrowUpRight aria-hidden="true" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
