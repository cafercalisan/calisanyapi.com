import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import { Measurement } from "@/components/Measurement";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Çalışan Yapı | İstanbul Yapı Sistemleri", template: "%s | Çalışan Yapı" },
  description: "İstanbul genelinde PVC kapı-pencere, cam balkon, sineklik, korkuluk, küpeşte, asma tavan ve dış mekân sistemleri için keşif ve uygulama.",
  openGraph: { type: "website", locale: "tr_TR", siteName: "Çalışan Yapı", images: [{ url: "/brand/calisan-yapi-hero.png", width: 1672, height: 941, alt: "Çalışan Yapı mimari uygulamalar" }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><head><script dangerouslySetInnerHTML={{__html:"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});"}}/></head><body className={`${display.variable} ${body.variable}`}>{children}<Measurement /></body></html>;
}
