import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const districtServicePages: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const district of districts) {
      districtServicePages.push({
        url: `${baseUrl}/${service.slug}-${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...servicePages, ...districtServicePages];
}
