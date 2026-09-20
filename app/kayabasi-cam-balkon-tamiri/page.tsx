import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const path = "/kayabasi-cam-balkon-tamiri";
const pageUrl = `${site.url}${path}`;
const whatsappText = "Merhaba, Kayabaşı'ndaki cam balkonumda bir sorun var. Fotoğraf gönderip bilgi almak istiyorum.";
const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`;

export const metadata: Metadata = {
  title: "Kayabaşı Cam Balkon Tamiri | Su Alma ve Ray Sorunları",
  description: "Kayabaşı ve Başakşehir'de cam balkon su alma, kapanmama, ray, fitil ve ayar sorunları için yerinde kontrol. Fotoğrafı WhatsApp'tan gönderin.",
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title: "Kayabaşı Cam Balkon Tamiri | Çalışan Yapı",
    description: "Cam balkon su alma, kapanmama ve ray sorunları için Kayabaşı'nda yerinde kontrol ve çözüm.",
    images: [{ url: "/landing/kayabasi-cam-balkon/hero.webp", alt: "Kayabaşı cam balkon tamiri" }],
  },
};

const issues = [
  ["Su alma", "Yağış sonrası oluşan sızıntının birleşim, tahliye, fitil ve montaj noktaları birlikte kontrol edilir."],
  ["Kapanmama", "Kanatların birbirini karşılamadığı veya kilidin oturmadığı durumlarda sistem dengesi incelenir."],
  ["Ray ve sürgü", "Ray üzerinde takılma, ses yapma ve düzensiz ilerleme nedenleri yerinde değerlendirilir."],
  ["Zor hareket", "Ağırlaşan kanatlar, teker ve taşıyıcı parçalar sistemin yapısına göre kontrol edilir."],
  ["Fitil boşlukları", "Cam araları ve birleşimlerdeki yıpranmış ya da yerinden çıkmış fitiller gözden geçirilir."],
  ["Ayar ve bakım", "Kullanımla oluşan ayar bozuklukları ve genel bakım gereksinimleri net biçimde açıklanır."],
];

const faqs = [
  ["Cam balkon su alma problemi neden olur?", "Tahliye kanallarındaki tıkanıklık, fitil ve silikon yıpranması, eğim veya montaj detayları su almaya neden olabilir. Doğru müdahale için önce suyun giriş noktası belirlenmelidir."],
  ["Cam balkon kapanmıyorsa ne yapılır?", "Kanatları zorlamak yerine ray, teker, kilit ve kanat ayarının kontrol edilmesi gerekir. Zorlama, mevcut arızayı büyütebilir."],
  ["Yerinde kontrol sağlanıyor mu?", "Kayabaşı ve Başakşehir çevresinde, paylaşılan ön bilgiye göre uygunluk değerlendirilerek yerinde kontrol planlanabilir."],
  ["WhatsApp üzerinden fotoğraf gönderebilir miyim?", "Evet. Sorunlu bölgenin yakın ve genel görünümünü gönderirseniz ilk değerlendirmeyi daha sağlıklı yapabiliriz."],
];

export default function KayabasiCamBalkonTamiriPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${pageUrl}#service`, name: "Kayabaşı Cam Balkon Tamiri", serviceType: "Cam balkon tamiri", description: metadata.description, provider: { "@id": `${site.url}/#organization` }, areaServed: [{ "@type": "Place", name: "Kayabaşı, Başakşehir" }, { "@type": "AdministrativeArea", name: "Başakşehir, İstanbul" }], url: pageUrl },
      { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url }, { "@type": "ListItem", position: 2, name: "Cam Balkon", item: `${site.url}/hizmetler/cam-balkon` }, { "@type": "ListItem", position: 3, name: "Kayabaşı Cam Balkon Tamiri", item: pageUrl }] },
    ],
  };

  return <>
    <JsonLd data={schema}/>
    <SiteHeader hideMobileConversion/>
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src="/landing/kayabasi-cam-balkon/hero.webp" alt="Kayabaşı'nda modern cam balkon sistemi" fill priority sizes="100vw" className={styles.heroImage}/>
        <div className={styles.heroShade}/>
        <div className={styles.heroContent}>
          <p className={styles.location}><MapPin size={15}/> Kayabaşı · Başakşehir</p>
          <h1>Kayabaşı Cam<br/>Balkon Tamiri</h1>
          <p className={styles.heroLead}>Cam balkonunuz su mu alıyor, zor mu kapanıyor veya teknik sorunlar mı çıkarıyor? Kayabaşı ve çevresinde yerinde kontrol ve çözüm için bize ulaşın.</p>
          <div className={styles.actions}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.primaryCta}><MessageCircle size={19}/> WhatsApp&apos;tan Ulaş</a>
            <a href={`tel:${site.phone}`} className={styles.secondaryCta}><Phone size={18}/> Hemen Ara</a>
          </div>
          <p className={styles.microcopy}><ShieldCheck size={15}/> Kayabaşı ve yakın çevrede yerinde kontrol</p>
        </div>
      </section>

      <section className={styles.visualStory} aria-label="Cam balkon tamiri uygulama detayları">
        <figure className={styles.mainVisual}><Image src="/landing/kayabasi-cam-balkon/teknik-kontrol.webp" alt="Cam balkon ray ve fitil kontrolü" fill sizes="(max-width: 800px) 100vw, 58vw"/><figcaption>Ray, fitil ve hareket kontrolü</figcaption></figure>
        <figure className={styles.waterVisual}><Image src="/landing/kayabasi-cam-balkon/su-alma.webp" alt="Cam balkon alt rayında su alma problemi" fill sizes="(max-width: 800px) 100vw, 42vw"/><figcaption>Su alma ve sızdırmazlık kontrolü</figcaption></figure>
      </section>

      <section className={styles.intro}>
        <div><p className={styles.eyebrow}>Yerinde değerlendirme</p><h2>Kayabaşı&apos;nda Cam Balkon Sorunlarına Pratik Çözümler</h2></div>
        <div><p>Cam balkon sistemlerinde benzer görünen iki sorun farklı nedenlerden kaynaklanabilir. Su alma, kapanmama veya zor çalışma şikâyetinde yalnız görünen parçaya değil; ray, teker, fitil, tahliye ve kanat ayarının bütününe bakıyoruz.</p><p>Kayabaşı ve Başakşehir çevresindeki konutlarda sorunu önce fotoğraf üzerinden dinliyor, uygun durumlarda yerinde kontrol ederek gerekli müdahaleyi açıkça paylaşıyoruz.</p></div>
      </section>

      <section className={styles.issues}>
        <header><p className={styles.eyebrow}>Sık karşılaşılan durumlar</p><h2>Hangi Cam Balkon Problemlerinde Hizmet Veriyoruz?</h2></header>
        <div className={styles.issueList}>{issues.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className={styles.funnel}>
        <div className={styles.funnelCopy}><p className={styles.eyebrowLight}>Hızlı ön değerlendirme</p><h2>Sorununuzu<br/><em>Fotoğrafla Gönderin</em></h2><p>Cam balkonunuzdaki sorunu WhatsApp üzerinden bize iletin. Uygunsa fotoğraf gönderin, durumu birlikte değerlendirelim.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta}><MessageCircle size={20}/> WhatsApp&apos;tan Fotoğraf Gönder <ArrowRight size={18}/></a></div>
        <ol className={styles.steps}>
          <li><b>01</b><div><strong>Sorunu fotoğraflayın</strong><span>Yakın detay ve balkonun genel görünümü yeterli.</span></div></li>
          <li><b>02</b><div><strong>WhatsApp&apos;tan gönderin</strong><span>Konumunuzu ve yaşadığınız sorunu kısaca yazın.</span></div></li>
          <li><b>03</b><div><strong>Bilgi ve yönlendirme alın</strong><span>Uygun müdahale ve yerinde kontrol seçeneğini konuşalım.</span></div></li>
        </ol>
      </section>

      <section className={styles.trust}>
        <div><p className={styles.eyebrow}>Sade ve açık hizmet</p><h2>Neden Çalışan Yapı?</h2></div>
        <div className={styles.trustText}><p><b>Bölgeyi biliyoruz.</b> Kayabaşı ve Başakşehir&apos;deki konut tipi cam balkon uygulamalarına odaklanıyoruz.</p><p><b>Önce sorunu dinliyoruz.</b> Fotoğraf ve kısa bilgiyle başlayıp gereksiz işlem önermeden uygun yolu belirliyoruz.</p><p><b>Yerinde ve düzenli çalışıyoruz.</b> Sistemi bütün olarak inceliyor, yapılabilecek işlemi anlaşılır biçimde aktarıyoruz.</p></div>
      </section>

      <section className={styles.area}>
        <figure className={styles.areaVisual}><Image src="/landing/kayabasi-cam-balkon/kayabasi-konutlari.webp" alt="Kayabaşı Başakşehir konut blokları" fill sizes="(max-width: 900px) 100vw, 50vw"/><figcaption>Kayabaşı konut bölgesi · Görsel kaynağı: TOKİ</figcaption></figure>
        <div><p className={styles.eyebrow}>Kayabaşı · Başakşehir</p><h2>Bölgenizde en uygun yapı çözümleri</h2><p>Kayabaşı&apos;ndaki farklı konut tiplerinin cam balkon sistemleri de farklı bakım ve ayar ihtiyaçları doğurur. Başakşehir, Bahçeşehir, İkitelli ve yakın çevrede sorunu bulunduğu yerde değerlendiriyoruz.</p><div className={styles.tags}><span>Kayabaşı</span><span>Başakşehir</span><span>Bahçeşehir</span><span>İkitelli</span><span>Yakın çevre</span></div></div>
      </section>

      <section className={styles.faq}>
        <header><p className={styles.eyebrow}>Merak edilenler</p><h2>Sık Sorulan Sorular</h2></header>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}>
        <Image src="/landing/kayabasi-cam-balkon/hero.webp" alt="" fill sizes="100vw" className={styles.finalImage}/><div className={styles.finalShade}/>
        <div className={styles.finalContent}><p className={styles.eyebrowLight}>Çalışan Yapı güvencesi</p>
        <h2>Başakşehir bölgesinde hızlı ve güvenilir çözümler</h2>
        <p>Cam balkonunuzdaki su alma ve teknik problemler için doğrudan ekibimize ulaşın.</p>
        <div className={styles.finalActions}><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta}><MessageCircle size={20}/> WhatsApp&apos;tan Mesaj Gönder</a><a href={`tel:${site.phone}`}><Phone size={17}/> {site.phoneLabel}</a></div>
        </div>
      </section>
    </main>
    <SiteFooter hideLead/>
    <aside className={styles.mobileContact} aria-label="Hızlı iletişim"><a href={`tel:${site.phone}`}><Phone/><span>Ara</span></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle/><span>WhatsApp</span></a></aside>
  </>;
}
