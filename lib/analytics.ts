export type AnalyticsEvent =
  | "view_service"
  | "view_campaign"
  | "view_blog_post"
  | "view_geo_page"
  | "cta_click"
  | "phone_click"
  | "whatsapp_click"
  | "form_start"
  | "service_selected"
  | "district_selected"
  | "photo_added"
  | "form_validation_error"
  | "lead_success";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.("event", event, payload);
  window.dispatchEvent(new CustomEvent("cy:analytics", { detail: { event, payload } }));
}

export function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
