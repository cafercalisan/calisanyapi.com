import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Yapı Rehberi", description: "PVC pencere, cam balkon, sineklik ve yapı sistemleri hakkında ölçü, seçim ve uygulama rehberleri.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return <><SiteHeader/><main className="inner-page"><section className="page-hero technical-paper"><p className="kicker">Çalışan Yapı · Bilgi merkezi</p><h1 className="font-display">Karardan önce<br/><em>doğru bilgi.</em></h1><p>Malzeme, ölçü, kullanım ve montaj kararlarını daha anlaşılır hale getiren saha odaklı rehberler.</p></section><section className="editorial-grid">{blogPosts.map((post, index) => <article key={post.slug} className={index === 0 ? "featured" : ""}><span className="article-index">{String(index + 1).padStart(2,"0")}</span><div><p className="kicker">{post.eyebrow}</p><h2 className="font-display">{post.title}</h2><p>{post.description}</p><footer><span><Clock3 size={14}/>{post.readTime}</span><Link href={`/blog/${post.slug}`}>Rehberi oku <ArrowUpRight size={15}/></Link></footer></div></article>)}</section></main><SiteFooter/></>;
}
