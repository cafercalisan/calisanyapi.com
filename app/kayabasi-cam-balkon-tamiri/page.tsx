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
const whatsappText = "Merhaba, Kayabaşı cam balkon tamiri sayfanızdan ulaşıyorum. Cam balkonumda bir problem var, fotoğrafları iletiyorum.";
const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`;

export const metadata: Metadata = {
  title: "Kayabaşı Cam Balkon Tamiri",
  description: "Kayabaşı ve Başakşehir çevresinde cam balkon su alma, kapanmama, ray ve diğer teknik problemler için Çalışan Yapı'ya ulaşın. Sorunun fotoğrafını WhatsApp'tan gönderin.",
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
  ["Cam balkon su alma", "Yağmur sonrası oluşan sızıntının nereden geldiğini anlamak için fitil, tahliye ve birleşim noktalarına bakılır."],
  ["Kapanmama veya zor kapanma", "Kanatlar tam birleşmiyor ya da kilit oturmuyorsa sistemin ayarı ve hareketi kontrol edilir."],
  ["Ray ve sürgü problemleri", "Rayda takılma, ses yapma veya düzensiz ilerleme gibi kullanım sorunları değerlendirilir."],
  ["Kanatların zor hareket etmesi", "Ağırlaşan veya zorlanan cam kanatların hareket parçaları ve dengesi incelenir."],
  ["Fitil ve birleşim problemleri", "Yerinden çıkan, yıpranan veya boşluk bırakan fitiller ve birleşim noktaları kontrol edilir."],
  ["Genel ayar ve teknik bakım", "Kullanımla oluşan ayar bozuklukları ve bakım ihtiyaçları anlaşılır biçimde açıklanır."],
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
          <p className={styles.heroLead}>Kayabaşı&apos;nda cam balkonunuz yağmurda su alıyor, düzgün kapanmıyor veya teknik bir problem çıkarıyorsa sorunun fotoğrafını bize gönderin. Durumu birlikte değerlendirelim.</p>
          <div className={styles.actions}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.primaryCta} data-cta-id="hero_photo"><MessageCircle size={19}/> Sorunun Fotoğrafını Gönder</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.secondaryCta} data-cta-id="hero_whatsapp"><MessageCircle size={18}/> WhatsApp&apos;tan İletişime Geç</a>
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

      <section className={styles.introCta} aria-label="Cam balkon sorunu için iletişim">
        <div><p>İlk adımı fotoğrafla atalım</p><h2>Cam balkonunuzdaki sorunu gösterin.</h2></div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="intro_whatsapp"><MessageCircle size={19}/> Sorunun Fotoğrafını Gönder <ArrowRight size={17}/></a>
      </section>

      <section className={styles.issues}>
        <header><p className={styles.eyebrow}>Sık karşılaşılan durumlar</p><h2>Hangi Cam Balkon Problemlerinde Hizmet Veriyoruz?</h2></header>
        <div className={styles.issueList}>{issues.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.problemCta} data-cta-id="problem_whatsapp">Sorununuzu WhatsApp&apos;tan anlatın <ArrowRight size={16}/></a>
      </section>

      <section className={styles.funnel}>
        <div className={styles.funnelCopy}><p className={styles.eyebrowLight}>Hızlı ön değerlendirme</p><h2>Sorununuzu<br/><em>Fotoğrafla Gönderin</em></h2><p>Cam balkonunuzdaki problemi WhatsApp üzerinden bize iletin. Mümkünse sorunun göründüğü birkaç fotoğraf gönderin; durumu önceden değerlendirelim.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta} data-cta-id="photo_funnel_whatsapp"><MessageCircle size={20}/> Fotoğrafı WhatsApp&apos;tan Gönder <ArrowRight size={18}/></a></div>
        <ol className={styles.steps}>
          <li><b>01</b><div><strong>Sorunun fotoğrafını çekin</strong><span>Yakın detay ve balkonun genel görünümü yeterli.</span></div></li>
          <li><b>02</b><div><strong>WhatsApp&apos;tan bize gönderin</strong><span>Konumunuzu ve yaşadığınız sorunu kısaca yazın.</span></div></li>
          <li><b>03</b><div><strong>İlk değerlendirmeyi alın</strong><span>Problem ve uygun yönlendirme hakkında birlikte konuşalım.</span></div></li>
        </ol>
      </section>

      <section className={styles.trust}>
        <div><p className={styles.eyebrow}>Sade ve açık hizmet</p><h2>Neden Çalışan Yapı?</h2></div>
        <div className={styles.trustText}><p><b>Önce problemi anlamaya çalışıyoruz.</b> Şikâyeti ve sistemin mevcut durumunu birlikte değerlendiriyoruz.</p><p><b>Fotoğrafla ön değerlendirme yapıyoruz.</b> Sorunlu bölgeyi önceden görmek, yerinde kontrolü daha verimli hale getiriyor.</p><p><b>Sorunun kaynağına odaklanıyoruz.</b> Gereksiz işlem önermek yerine problemi oluşturan noktayı belirlemeye çalışıyoruz.</p><p><b>Kayabaşı çevresinde hizmet veriyoruz.</b> Kayabaşı ve Başakşehir&apos;de yerinde kontrol planlayabiliyoruz.</p></div>
      </section>

      <section className={styles.area}>
        <figure className={styles.areaVisual}><Image src="/landing/kayabasi-cam-balkon/kayabasi-konutlari.webp" alt="Kayabaşı Başakşehir konut blokları" fill sizes="(max-width: 900px) 100vw, 50vw"/><figcaption>Kayabaşı konut bölgesi · Görsel kaynağı: TOKİ</figcaption></figure>
        <div><p className={styles.eyebrow}>Kayabaşı · Başakşehir</p><h2>Bölgenizde en uygun yapı çözümleri</h2><p><strong>Kayabaşı başta olmak üzere</strong> Başakşehir ve yakın çevrede cam balkon tamiri ve teknik servis taleplerini değerlendiriyoruz.</p><div className={styles.tags}><span className={styles.primaryTag}>Kayabaşı</span><span>Başakşehir</span><span>Bahçeşehir</span><span>İkitelli</span></div></div>
      </section>

      <section className={styles.faq}>
        <header><p className={styles.eyebrow}>Merak edilenler</p><h2>Sık Sorulan Sorular</h2></header>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}>
        <Image src="/landing/kayabasi-cam-balkon/hero.webp" alt="" fill sizes="100vw" className={styles.finalImage}/><div className={styles.finalShade}/>
        <div className={styles.finalContent}><p className={styles.eyebrowLight}>Çalışan Yapı güvencesi</p>
        <h2>Kayabaşı Cam Balkon Tamiri İçin Bize Ulaşın</h2>
        <p>Su alma, kapanmama veya diğer teknik problemler için WhatsApp üzerinden fotoğraf göndererek iletişime geçebilirsiniz.</p>
        <div className={styles.finalActions}><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta} data-cta-id="bottom_whatsapp"><MessageCircle size={20}/> Sorunun Fotoğrafını Gönder</a><a href={`tel:${site.phone}`}><Phone size={17}/> {site.phoneLabel}</a></div>
        </div>
      </section>
    </main>
    <SiteFooter hideLead/>
    <aside className={styles.mobileContact} aria-label="Hızlı iletişim"><a href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="mobile_sticky_whatsapp"><MessageCircle/><span>WhatsApp&apos;tan Fotoğraf Gönder</span></a></aside>
  </>;
}
