import { DEFAULT_CATALOG } from "./catalog";
import { dbRequest, isSupabaseConfigured } from "./supabase";
import type { Catalog, QuoteInput, QuotePricing } from "./types";

type ProductRow = { id: string; slug: string; name: string; short_name: string; description: string; base_price: number; price_per_m2: number; min_width: number; max_width: number; min_height: number; max_height: number; active: boolean };
type OptionRow = { id: string; slug: string; name: string; hex?: string; price: number; active: boolean };
type SettingsRow = { vat_rate: number; shipping_fee: number; free_shipping_threshold: number; installation_fee: number };

export async function getCatalog(): Promise<Catalog> {
  if (!isSupabaseConfigured()) return DEFAULT_CATALOG;
  try {
    const [products, colors, features, settings] = await Promise.all([
      dbRequest<ProductRow[]>("products?select=*&order=sort_order"), dbRequest<OptionRow[]>("product_colors?select=*&order=sort_order"),
      dbRequest<OptionRow[]>("product_features?select=*&order=sort_order"), dbRequest<SettingsRow[]>("pricing_settings?select=*&limit=1"),
    ]);
    return {
      products: products.map((p) => ({ id: p.id, slug: p.slug, name: p.name, shortName: p.short_name, description: p.description, basePrice: p.base_price, pricePerM2: p.price_per_m2, minWidth: p.min_width, maxWidth: p.max_width, minHeight: p.min_height, maxHeight: p.max_height, active: p.active })),
      colors: colors.map((c) => ({ id: c.id, slug: c.slug, name: c.name, hex: c.hex ?? "#888888", price: c.price, active: c.active })),
      features: features.map((f) => ({ id: f.id, slug: f.slug, name: f.name, price: f.price, active: f.active })),
      settings: settings[0] ? { vatRate: Number(settings[0].vat_rate), shippingFee: settings[0].shipping_fee, freeShippingThreshold: settings[0].free_shipping_threshold, installationFee: settings[0].installation_fee } : DEFAULT_CATALOG.settings,
    };
  } catch (error) {
    console.error("[catalog] fallback", error);
    return DEFAULT_CATALOG;
  }
}

export async function saveQuote(input: QuoteInput, pricing: QuotePricing) {
  if (!isSupabaseConfigured()) return { id: crypto.randomUUID(), reference: `CY-${Date.now().toString().slice(-6)}`, persisted: false };
  const reference = `CY-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const [quote] = await dbRequest<Array<{ id: string }>>("quotes", { method: "POST", body: JSON.stringify({ reference, status: "new", customer_name: input.customer.name, customer_phone: input.customer.phone, customer_email: input.customer.email || null, customer_notes: input.customer.notes || null, fulfilment_type: input.fulfilment.type, city: input.fulfilment.city, district: input.fulfilment.district, address: input.fulfilment.address, products_subtotal: pricing.productsSubtotal, service_fee: pricing.serviceFee, subtotal: pricing.subtotal, vat: pricing.vat, total: pricing.total, pricing_snapshot: pricing }) });
  await dbRequest("quote_items", { method: "POST", body: JSON.stringify(pricing.items.map((item) => ({ quote_id: quote.id, opening_type: item.openingType, label: item.label, product_slug: item.productSlug, product_name: item.productName, width: item.width, height: item.height, quantity: item.quantity, color_slug: item.colorSlug, color_name: item.colorName, feature_slugs: item.featureSlugs, feature_names: item.featureNames, unit_price: item.unitPrice, line_total: item.lineTotal, photo_path: item.photoPath || null }))) });
  return { id: quote.id, reference, persisted: true };
}

export async function listQuotes() {
  if (!isSupabaseConfigured() && process.env.DEMO_ADMIN_ENABLED === "true") return DEMO_QUOTES;
  if (!isSupabaseConfigured()) return [];
  return dbRequest<Array<Record<string, unknown>>>("quotes?select=*,quote_items(*)&order=created_at.desc&limit=250");
}

export async function listServiceRequests() {
  if (!isSupabaseConfigured()) return [];
  return dbRequest<Array<Record<string, unknown>>>("service_requests?select=*&order=created_at.desc&limit=250");
}

const DEMO_QUOTES: Array<Record<string, unknown>> = [
  {
    id: "demo-1", reference: "CY-DEMO01", status: "new", customer_name: "Ayşe Demir", customer_phone: "0532 111 22 33",
    customer_email: "ayse@example.com", fulfilment_type: "installation", city: "İstanbul", district: "Kadıköy",
    address: "Caferağa Mahallesi, Örnek Sokak No: 12", products_subtotal: 3820, service_fee: 600, subtotal: 4420, vat: 884, total: 5304,
    created_at: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    quote_items: [{ id: "demo-item-1", opening_type: "door", label: "Kapı", product_name: "Pliseli Kapı", width: 92, height: 212, quantity: 1, color_name: "Antrasit", line_total: 3820 }],
  },
  {
    id: "demo-2", reference: "CY-DEMO02", status: "contacted", customer_name: "Mehmet Kaya", customer_phone: "0544 222 33 44",
    customer_email: "", fulfilment_type: "shipping", city: "Ankara", district: "Çankaya",
    address: "Bahçelievler Mahallesi, Deneme Caddesi No: 8", products_subtotal: 2290, service_fee: 250, subtotal: 2540, vat: 508, total: 3048,
    created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    quote_items: [{ id: "demo-item-2", opening_type: "window", label: "Pencere", product_name: "Pliseli Pencere", width: 100, height: 120, quantity: 1, color_name: "Kırık Beyaz", line_total: 2290 }],
  },
];
