import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["400", "500", "600"], style: ["normal", "italic"] });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Çalışan Yapı | Ölçünü Gir, Sinekliğini Oluştur",
  description: "Pencere ve kapılarınız için ölçüye özel sineklik teklifinizi dakikalar içinde oluşturun.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
