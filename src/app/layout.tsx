import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | İstanbul Sineklik, Cam Balkon, PVC Doğrama, Kepenk Uzmanı`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "İstanbul'un tüm ilçelerinde sineklik, cam balkon, PVC doğrama, duşakabin, otomatik kepenk, akordiyon kapı hizmetleri. Ücretsiz ölçü ve keşif. 7/24 tamir servisi.",
  keywords:
    "sineklik istanbul, cam balkon istanbul, pimapen tamiri, doğrama tamiri, sineklik tamiri, cam balkon tamiri, kepenk tamiri, ücretsiz keşif istanbul",
  openGraph: {
    title: `${siteConfig.name} | İstanbul Sineklik & Cam Balkon Uzmanı`,
    description:
      "İstanbul'un tüm ilçelerinde ücretsiz keşif. Sineklik, cam balkon, PVC doğrama ve tamir hizmetleri.",
    type: "website",
    url: siteConfig.domain,
    locale: "tr_TR",
  },
  alternates: {
    canonical: siteConfig.domain,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "İstanbul sineklik, cam balkon, pimapen, duşakabin, doğrama ve tamir hizmetleri",
    url: siteConfig.domain,
    telephone: siteConfig.phoneRaw,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    areaServed: "İstanbul",
    serviceType: [
      "Sineklik",
      "Cam Balkon",
      "Pimapen",
      "Duşakabin",
      "Kepenk",
      "Doğrama Tamiri",
    ],
    openingHours: siteConfig.openingHours,
    priceRange: "₺₺",
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
