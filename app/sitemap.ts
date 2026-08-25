import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/hizmetler", "/istanbul", "/kurumsal", "/hakkimizda", "/sss", "/teklif-al", "/projeler"].map(path => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .7 })).concat(services.map(s => ({ url: `${site.url}/hizmetler/${s.slug}`, lastModified: new Date(s.updatedAt), changeFrequency: "monthly" as const, priority: .8 })),projects.map(project=>({url:`${site.url}/projeler/${project.slug}`,lastModified:new Date(project.updatedAt),changeFrequency:"monthly" as const,priority:.72}))); }
