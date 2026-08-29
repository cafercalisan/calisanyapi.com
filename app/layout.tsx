import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import { Measurement } from "@/components/Measurement";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "Çalışan Yapı",
  title: { default: "Çalışan Yapı | PVC Pencere ve Yapı Sistemleri İstanbul", template: "%s | Çalışan Yapı" },
  description: "İstanbul genelinde PVC kapı-pencere, cam balkon, sineklik, korkuluk ve dış mekân sistemleri için yerinde keşif, ölçü ve planlı uygulama hizmeti alın.",
  keywords: ["PVC pencere İstanbul", "cam balkon", "sineklik", "kış bahçesi", "pergola", "korkuluk", "yapı sistemleri"],
  authors: [{ name: "Çalışan Yapı", url: site.url }],
  creator: "Çalışan Yapı",
  publisher: "Çalışan Yapı",
  category: "Yapı ve tadilat hizmetleri",
  openGraph: { type: "website", locale: "tr_TR", url: site.url, title: "Çalışan Yapı | PVC Pencere ve Yapı Sistemleri İstanbul", description: "PVC kapı-pencere, cam balkon, sineklik ve tamamlayıcı yapı sistemlerinde İstanbul genelinde yerinde keşif ve ölçüye özel uygulama.", siteName: "Çalışan Yapı", images: [{ url: "/brand/calisan-yapi-hero.webp", width: 1672, height: 941, alt: "Çalışan Yapı PVC pencere, cam balkon ve yapı sistemleri" }] },
  twitter: { card: "summary_large_image", title: "Çalışan Yapı | İstanbul Yapı Sistemleri", description: "PVC pencere, cam balkon, sineklik ve yapı sistemlerinde keşif ve ölçüye özel uygulama.", images: ["/brand/calisan-yapi-hero.webp"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><head><script dangerouslySetInnerHTML={{__html:"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});"}}/></head><body className={`${display.variable} ${body.variable}`}>{children}<Measurement /></body></html>;
}
