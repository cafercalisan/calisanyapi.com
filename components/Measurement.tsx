"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };
const STORAGE_KEY = "cy_consent_v1";
const denied: Consent = { necessary: true, analytics: false, marketing: false };

function readConsent(): Consent | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Consent | null; }
  catch { return null; }
}

export function Measurement() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const pathname = usePathname();

  useEffect(() => { queueMicrotask(() => setConsent(readConsent())); }, []);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("phone_click", { location: location.pathname });
      else if (href.includes("wa.me") || href.includes("whatsapp")) track("whatsapp_click", { location: location.pathname });
      else if (href.includes("teklif-al") || href.startsWith("#teklif")) track("cta_click", { href, location: location.pathname });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  useEffect(() => {
    if (pathname.startsWith("/hizmetler/")) track("view_service", { path: pathname });
    if (pathname.startsWith("/kampanya/")) track("view_campaign", { path: pathname });
  }, [pathname]);
  useEffect(() => {
    const forward = (raw: Event) => {
      if (!consent?.marketing || !window.fbq) return;
      const detail = (raw as CustomEvent<{event:string;payload:Record<string,unknown>}>).detail;
      if (detail.event === "lead_success") window.fbq("track", "Lead", detail.payload, { eventID: detail.payload.event_id });
      else if (["phone_click", "whatsapp_click"].includes(detail.event)) window.fbq("trackCustom", "Contact", detail.payload);
    };
    window.addEventListener("cy:analytics", forward);
    return () => window.removeEventListener("cy:analytics", forward);
  }, [consent]);

  function save(next: Consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["consent", "update", {
      analytics_storage: next.analytics ? "granted" : "denied",
      ad_storage: next.marketing ? "granted" : "denied",
      ad_user_data: next.marketing ? "granted" : "denied",
      ad_personalization: next.marketing ? "granted" : "denied",
    }]);
  }

  return <>
    {consent?.analytics && gaId && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
    </>}
    {consent?.marketing && pixelId && <Script id="meta-pixel" strategy="afterInteractive">{`
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');
    `}</Script>}
    {consent?.analytics && clarityId && <Script id="clarity" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${clarityId}');
    `}</Script>}
    {consent === null && <aside className="consent-banner" aria-label="Çerez tercihleri">
      <div><b>Gizliliğiniz bizim için önemli.</b><p>Zorunlu çerezler siteyi çalıştırır. Analiz ve reklam ölçümü yalnız izninizle etkinleşir.</p><a href="/cerez-politikasi">Ayrıntıları inceleyin</a></div>
      <div><button onClick={() => save(denied)}>Yalnız zorunlu</button><button className="accept" onClick={() => save({ necessary: true, analytics: true, marketing: true })}>Tümünü kabul et</button></div>
    </aside>}
  </>;
}
