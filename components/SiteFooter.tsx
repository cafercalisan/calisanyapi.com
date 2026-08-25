import Link from "next/link";
import { districts, services, site } from "@/lib/site";

export function SiteFooter() {
  return <footer className="site-footer">
    <section className="footer-experience" aria-label="Uma Yapı tecrübesi"><div><p className="kicker light">Ustalık ve güven</p><h2 className="font-display">20 yıllık PVC tecrübesi,<br/><em>işe göre uzman ekip.</em></h2></div><div><p>PVC kapı-pencereden cam balkon ve dış mekân sistemlerine kadar her talebi kendi alanında deneyimli ekiple değerlendiriyoruz.</p><Link href="/hakkimizda">Uma Yapı’yı tanıyın <span>↗</span></Link></div></section>
    <div className="footer-lead"><p className="kicker">Bir sonraki adım</p><h2 className="font-display">Alanınızı birlikte<br/><em>değerlendirelim.</em></h2><Link href="/teklif-al" className="btn-light">Fotoğrafla yaklaşık fiyat iste <span>↗</span></Link></div>
    <div className="footer-grid"><div><b>Hizmetler</b>{services.map(s => <Link key={s.slug} href={`/hizmetler/${s.slug}`}>{s.name}</Link>)}</div><div><b>Kurumsal ve yasal</b><Link href="/kurumsal">Kurumsal</Link><Link href="/hakkimizda">Hakkımızda</Link><Link href="/sss">Sık sorulan sorular</Link><Link href="/istanbul">İstanbul hizmet bölgeleri</Link><Link href="/teklif-al">Yaklaşık fiyat iste</Link><Link href="/gizlilik">Gizlilik politikası</Link><Link href="/kvkk-aydinlatma">KVKK aydınlatma metni</Link><Link href="/cerez-politikasi">Çerez politikası</Link><Link href="/kullanim-kosullari">Kullanım koşulları</Link></div><div><b>İletişim</b><a href={`tel:${site.phone}`}>{site.phoneLabel}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={`https://wa.me/${site.phone.replace("+", "")}`} target="_blank" rel="noreferrer">WhatsApp’tan yazın</a><span>İstanbul, Türkiye</span><span>Hafta içi ve Cumartesi</span></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Uma Yapı</span><span>{districts.length} ilçede planlı keşif ve uygulama</span></div>
  </footer>;
}
