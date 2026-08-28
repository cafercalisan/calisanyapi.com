import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { ContentTracker } from "@/components/ContentTracker";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts, getBlogPost } from "@/lib/content";
import { getService, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const post = getBlogPost((await params).slug); if (!post) return {}; return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.publishedAt, modifiedTime: post.updatedAt } }; }

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).slug); if (!post) notFound();
  const service = getService(post.serviceSlug); const url = `${site.url}/blog/${post.slug}`;
  return <><ContentTracker type="blog" slug={post.slug}/><JsonLd data={{ "@context":"https://schema.org", "@type":"Article", headline:post.title, description:post.description, datePublished:post.publishedAt, dateModified:post.updatedAt, mainEntityOfPage:url, author:{"@id":`${site.url}/#organization`}, publisher:{"@id":`${site.url}/#organization`} }}/><SiteHeader/><main className="article-page"><header className="article-hero technical-paper"><div><p className="kicker">{post.eyebrow}</p><h1 className="font-display">{post.title}</h1></div><div><p>{post.intro}</p><div className="article-meta"><span><CalendarDays size={15}/>{new Intl.DateTimeFormat("tr-TR",{dateStyle:"long"}).format(new Date(post.publishedAt))}</span><span><Clock3 size={15}/>{post.readTime}</span></div></div></header><div className="article-layout"><aside><p>Bu rehberde</p>{post.sections.map((section,index)=><a key={section.title} href={`#bolum-${index+1}`}><span>0{index+1}</span>{section.title}</a>)}</aside><article>{post.sections.map((section,index)=><section id={`bolum-${index+1}`} key={section.title}><p className="section-no">0{index+1}</p><h2 className="font-display">{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}</article></div><section className="article-cta"><div><p className="kicker">Alanınıza özel değerlendirme</p><h2 className="font-display">Bilgiyi,<br/><em>doğru ölçüyle tamamlayın.</em></h2></div><div><p>{service?.name ?? "Yapı uygulaması"} için alan fotoğrafını ve yaklaşık ölçünüzü paylaşın; uygun sistemi birlikte değerlendirelim.</p><Link className="btn-accent" href={`/teklif-al?hizmet=${post.serviceSlug}&from=${encodeURIComponent(`/blog/${post.slug}`)}`}>Ücretsiz ön değerlendirme <ArrowUpRight size={16}/></Link></div></section></main><SiteFooter/></>;
}
