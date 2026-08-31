import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";

type LocalServiceShowcaseProps = {
  placeName: string;
};

const projectImages: Record<string, { before: string; after: string }> = {
  "pvc-kapi-pencere": {
    before: "/projects/generated/pvc-kaldir-sur-oncesi.webp",
    after: "/projects/generated/pvc-kaldir-sur-sonrasi.webp",
  },
  "cam-balkon": {
    before: "/projects/generated/cam-balkon-katlanir-oncesi.webp",
    after: "/projects/generated/cam-balkon-katlanir-sonrasi.webp",
  },
  kupeste: {
    before: "/projects/generated/kupeste-duvar-tutamak-oncesi.webp",
    after: "/projects/generated/kupeste-duvar-tutamak-sonrasi.webp",
  },
  korkuluk: {
    before: "/projects/generated/korkuluk-cam-oncesi.webp",
    after: "/projects/generated/korkuluk-cam-sonrasi.webp",
  },
  "asma-tavan": {
    before: "/projects/generated/asma-tavan-baffle-oncesi.webp",
    after: "/projects/generated/asma-tavan-baffle-sonrasi.webp",
  },
  sineklik: {
    before: "/projects/generated/plise-pencere-oncesi.webp",
    after: "/projects/generated/plise-pencere-sonrasi.webp",
  },
  "kis-bahcesi": {
    before: "/projects/generated/kis-bahcesi-cam-catili-oncesi.webp",
    after: "/projects/generated/kis-bahcesi-cam-catili-sonrasi.webp",
  },
  pergola: {
    before: "/projects/generated/pergola-motorlu-oncesi.webp",
    after: "/projects/generated/pergola-motorlu-sonrasi.webp",
  },
  "giyotin-cam": {
    before: "/projects/generated/giyotin-cam-uc-panel-oncesi.webp",
    after: "/projects/generated/giyotin-cam-uc-panel-sonrasi.webp",
  },
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
        {services.map((service, index) => {
          const images = projectImages[service.slug];

          return <Link
            className="local-showcase-card"
            href={`/hizmetler/${service.slug}#hizmet-baslangici`}
            key={service.slug}
          >
            <div className="local-showcase-image">
              <figure>
                <Image
                  src={images.before}
                  alt={`${placeName} ${service.name} uygulama öncesi`}
                  fill
                  sizes="(max-width: 520px) 50vw, (max-width: 900px) 25vw, 17vw"
                />
                <figcaption>Öncesi</figcaption>
              </figure>
              <figure>
                <Image
                  src={images.after}
                  alt={`${placeName} ${service.name} uygulama sonrası`}
                  fill
                  sizes="(max-width: 520px) 50vw, (max-width: 900px) 25vw, 17vw"
                />
                <figcaption>Sonrası</figcaption>
              </figure>
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
          </Link>;
        })}
      </div>
    </section>
  );
}
