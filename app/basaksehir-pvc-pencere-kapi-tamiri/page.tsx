import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const path = "/basaksehir-pvc-pencere-kapi-tamiri";
const pageUrl = `${site.url}${path}`;
const whatsappText = "Merhaba, Başakşehir PVC pencere ve kapı tamiri sayfanızdan ulaşıyorum. PVC doğramamda bir problem var, fotoğrafları iletiyorum.";
const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`;

export const metadata: Metadata = {
  title: "Başakşehir PVC Pencere ve Kapı Tamiri",
  description: "Başakşehir ve çevresinde PVC pencere ve kapılarda su sızdırma, kapanmama, sürtme, kol ve kilit problemleri için Çalışan Yapı’ya ulaşın. Sorunun fotoğrafını WhatsApp’tan gönderin.",
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title: "Başakşehir PVC Pencere ve Kapı Tamiri | Çalışan Yapı",
    description: "Başakşehir’de PVC pencere ve kapı arızaları için fotoğrafla ön değerlendirme ve yerinde kontrol.",
    images: [{ url: "/landing/basaksehir-pvc-tamiri/hero.webp", alt: "Başakşehir PVC pencere ve kapı tamiri" }],
  },
};

const issues = [
  ["Pencere veya kapının zor kapanması", "Pencere ya da kapı tam oturmuyor, kol zor dönüyor veya kilit tutmuyorsa nerede takıldığını kontrol ediyoruz."],
  ["Kanat sarkması ve sürtme", "Açıp kapatırken çerçeveye sürtüyorsa kanadın duruşunu ve bağlantılarını inceliyoruz."],
  ["Su sızdırma ve conta problemleri", "Yağmurda içeri su giriyorsa contaları, pencere kenarlarını ve suyun çıkması gereken kanalları kontrol ediyoruz."],
  ["Kol ve kilit arızaları", "Kol boşa dönüyor, kilit tutmuyor veya pencere açılmıyorsa arızalı parçayı belirliyoruz."],
  ["Menteşe ve ayar problemleri", "Pencere ya da kapı yerinden kaymış veya zor hareket ediyorsa menteşeleri ve açılma ayarını kontrol ediyoruz."],
  ["Sürme PVC kapı ve ray sorunları", "Balkon kapısı ray üzerinde zor ilerliyor veya kapanmıyorsa rayı, tekerleri ve kilidi inceliyoruz."],
];

const faqs = [
  ["PVC pencere neden zor kapanır?", "Pencere kanadı yerinden kaymış, menteşesi gevşemiş veya kilidi sıkışmış olabilir. Zorlamadan önce sorunun nerede olduğunu kontrol etmek gerekir."],
  ["Pencere yağmurda su sızdırıyorsa ne yapılır?", "Contalar, pencerenin kenarları ve su tahliye kanalları kontrol edilir. Su sızıntısının kaynağı görülmeden yapılacak işlem hakkında kesin konuşmak doğru olmaz."],
  ["PVC pencere kolu ve kilidi tamir edilir mi?", "Soruna göre ayar veya parça değişimi gerekebilir. Kol ve kilidin durumu incelendikten sonra uygun işlem belirlenir."],
  ["Başakşehir’de yerinde kontrol sağlıyor musunuz?", "Başakşehir başta olmak üzere Kayaşehir, Bahçeşehir, İkitelli ve yakın çevrede, paylaşılan ön bilgiye göre yerinde kontrol planlanabilir."],
  ["WhatsApp üzerinden fotoğraf gönderebilir miyim?", "Evet. Sorunlu parçanın yakın görüntüsünü ve pencere veya kapının tamamını gösteren bir fotoğrafı göndermeniz ilk değerlendirmeyi kolaylaştırır."],
];

export default function BasaksehirPvcTamiriPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${pageUrl}#service`, name: "Başakşehir PVC Pencere ve Kapı Tamiri", serviceType: "PVC pencere ve kapı tamiri", description: metadata.description, provider: { "@id": `${site.url}/#organization` }, areaServed: [{ "@type": "AdministrativeArea", name: "Başakşehir, İstanbul" }, { "@type": "Place", name: "Kayaşehir, Başakşehir" }, { "@type": "Place", name: "Bahçeşehir, Başakşehir" }, { "@type": "Place", name: "İkitelli, Başakşehir" }], url: pageUrl },
      { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url }, { "@type": "ListItem", position: 2, name: "PVC Kapı ve Pencere", item: `${site.url}/hizmetler/pvc-kapi-pencere` }, { "@type": "ListItem", position: 3, name: "Başakşehir PVC Pencere ve Kapı Tamiri", item: pageUrl }] },
    ],
  };

  return <>
    <JsonLd data={schema}/>
    <SiteHeader hideMobileConversion/>
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src="/landing/basaksehir-pvc-tamiri/hero.webp" alt="Başakşehir’de PVC pencere ayarı yapan teknik servis uzmanı" fill priority sizes="100vw" className={styles.heroImage}/>
        <div className={styles.heroShade}/>
        <div className={styles.heroContent}>
          <p className={styles.location}><MapPin size={15}/> Başakşehir · İstanbul</p>
          <h1>Başakşehir<br/>PVC Pencere ve<br/>Kapı Tamiri</h1>
          <p className={styles.heroLead}>PVC pencereniz veya kapınız su sızdırıyor, zor kapanıyor, sürtüyor ya da kol ve kilidinde sorun mu var? Fotoğrafını gönderin, Başakşehir ve çevresinde birlikte değerlendirelim.</p>
          <div className={styles.actions}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.primaryCta} data-cta-id="hero_photo"><MessageCircle size={19}/> Sorunun Fotoğrafını Gönder</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.secondaryCta} data-cta-id="hero_whatsapp"><MessageCircle size={18}/> WhatsApp’tan İletişime Geç</a>
          </div>
          <p className={styles.microcopy}><ShieldCheck size={15}/> Başakşehir · Kayaşehir · Yakın Çevre</p>
        </div>
      </section>

      <section className={styles.visualStory} aria-label="PVC pencere tamiri uygulama detayları">
        <figure className={styles.mainVisual}><Image src="/landing/basaksehir-pvc-tamiri/teknik-kontrol.webp" alt="PVC pencere menteşe ve conta ayarı" fill sizes="(max-width: 800px) 100vw, 58vw"/><figcaption>Menteşe, conta ve kanat ayarı</figcaption></figure>
        <figure><Image src="/services/pvc-kapi-pencere-v2.webp" alt="Bakımlı beyaz PVC pencere ve balkon kapısı" fill sizes="(max-width: 800px) 100vw, 42vw"/><figcaption>Pencere ve kapılarda düzgün çalışma</figcaption></figure>
      </section>

      <section className={styles.intro}>
        <div><p className={styles.eyebrow}>Yerinde değerlendirme</p><h2>Başakşehir’de PVC Doğrama Sorunlarına Pratik Çözümler</h2></div>
        <div><p>PVC pencere veya kapınız zor kapanıyor, sürtüyor ya da su sızdırıyorsa sorunun nedeni ilk bakışta anlaşılmayabilir. Kanadın duruşunu, menteşeleri, contaları ve kilidi birlikte kontrol ederek sorunun nereden kaynaklandığını anlamaya çalışıyoruz.</p><p>Başakşehir’de sorunu önce fotoğraf üzerinden değerlendiriyor, uygun durumlarda yerinde kontrol ederek yapılabilecek işlemi açıkça paylaşıyoruz.</p></div>
      </section>

      <section className={styles.issues}>
        <header><p className={styles.eyebrow}>Sık karşılaşılan durumlar</p><h2>Hangi PVC Pencere ve Kapı Problemlerinde Hizmet Veriyoruz?</h2></header>
        <div className={styles.issueList}>{issues.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.problemCta} data-cta-id="problems_whatsapp">Sorununuzu WhatsApp’tan anlatın <ArrowRight size={16}/></a>
      </section>

      <section className={styles.funnel}>
        <div className={styles.funnelCopy}><p className={styles.eyebrowLight}>Hızlı ön değerlendirme</p><h2>Sorununuzu<br/><em>Fotoğrafla Gönderin</em></h2><p>PVC pencere veya kapınızdaki problemi WhatsApp üzerinden bize iletin. Sorunlu bölgenin yakın fotoğrafı ve pencerenin veya kapının genel görünümü, ilk değerlendirme için yeterli olabilir.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta} data-cta-id="photo_funnel_whatsapp"><MessageCircle size={20}/> Fotoğrafı WhatsApp’tan Gönder <ArrowRight size={18}/></a></div>
        <ol className={styles.steps}>
          <li><b>01</b><div><strong>Sorunun fotoğrafını çekin</strong><span>Sorunlu yerin yakından ve tamamının uzaktan görünmesi yeterli.</span></div></li>
          <li><b>02</b><div><strong>WhatsApp’tan bize gönderin</strong><span>Başakşehir’deki konumunuzu ve yaşadığınız sorunu kısaca yazın.</span></div></li>
          <li><b>03</b><div><strong>İlk değerlendirmeyi alın</strong><span>Olası problem ve uygun yönlendirme hakkında birlikte konuşalım.</span></div></li>
        </ol>
      </section>

      <section className={styles.trust}>
        <div><p className={styles.eyebrow}>Sade ve açık hizmet</p><h2>Neden Çalışan Yapı?</h2></div>
        <div className={styles.trustText}><p><b>Önce sorunu anlamaya çalışıyoruz.</b> Ne zaman ve nasıl ortaya çıktığını dinliyor, pencere veya kapının durumuna bakıyoruz.</p><p><b>Fotoğraf üzerinden ilk değerlendirmeyi yapıyoruz.</b> Sorunlu yeri önceden görmek, yerinde kontrol için hazırlanmamıza yardımcı oluyor.</p><p><b>Problemin kaynağına odaklanıyoruz.</b> Gereksiz işlem önermeden hangi ayarın veya parçanın gerektiğini anlamaya çalışıyoruz.</p><p><b>Başakşehir ve çevresinde yerinde hizmet veriyoruz.</b> Uygun durumlarda yerinde kontrol planlıyoruz.</p></div>
      </section>

      <section className={styles.area}>
        <figure className={styles.areaVisual}><Image src="/landing/basaksehir-pvc-tamiri/basaksehir-konutlari.webp" alt="Başakşehir’de modern konut blokları ve PVC pencere sistemleri" fill sizes="(max-width: 900px) 100vw, 50vw"/><figcaption>Başakşehir konut bölgesini temsil eden görsel</figcaption></figure>
        <div><p className={styles.eyebrow}>Başakşehir · İstanbul</p><h2>Bölgenizde PVC Pencere ve Kapı Servisi</h2><p><strong>Başakşehir başta olmak üzere</strong> Kayaşehir ve yakın çevrede PVC pencere ve kapı tamiri taleplerini değerlendiriyoruz. Bahçeşehir ve İkitelli’den gelen talepler için de uygunluğu görüşebilirsiniz.</p><div className={styles.tags}><span className={styles.primaryTag}>Başakşehir</span><span>Kayaşehir</span><span>Bahçeşehir</span><span>İkitelli</span></div></div>
      </section>

      <section className={styles.faq}>
        <header><p className={styles.eyebrow}>Merak edilenler</p><h2>Sık Sorulan Sorular</h2></header>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}>
        <Image src="/landing/basaksehir-pvc-tamiri/hero.webp" alt="" fill sizes="100vw" className={styles.finalImage}/><div className={styles.finalShade}/>
        <div className={styles.finalContent}><p className={styles.eyebrowLight}>Çalışan Yapı güvencesi</p><h2>Başakşehir PVC Pencere ve Kapı Tamiri İçin Bize Ulaşın</h2><p>Su sızdırma, kapanmama, sürtme, kol, kilit ve diğer teknik problemler için WhatsApp üzerinden fotoğraf göndererek iletişime geçebilirsiniz.</p><div className={styles.finalActions}><a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.lightCta} data-cta-id="bottom_whatsapp"><MessageCircle size={20}/> Sorunun Fotoğrafını Gönder</a><a href={`tel:${site.phone}`}><Phone size={17}/> {site.phoneLabel}</a></div></div>
      </section>
    </main>
    <SiteFooter hideLead/>
    <aside className={styles.mobileContact} aria-label="Hızlı iletişim"><a href={whatsappUrl} target="_blank" rel="noreferrer" data-cta-id="mobile_sticky_whatsapp"><MessageCircle/><span>WhatsApp’tan Fotoğraf Gönder</span></a></aside>
  </>;
}
