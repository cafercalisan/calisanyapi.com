import type { Catalog, QuoteItemInput, QuotePricing } from "./types";

export function calculateQuote(items: QuoteItemInput[], fulfilment: "shipping" | "installation", catalog: Catalog): QuotePricing {
  if (!items.length) throw new Error("En az bir ölçü kalemi ekleyin.");
  const priced = items.map((item) => {
    const product = catalog.products.find((entry) => entry.slug === item.productSlug && entry.active);
    const color = catalog.colors.find((entry) => entry.slug === item.colorSlug && entry.active);
    if (!product || !color) throw new Error("Seçilen ürün veya renk artık kullanılamıyor.");
    if (!Number.isInteger(item.width) || item.width < product.minWidth || item.width > product.maxWidth || !Number.isInteger(item.height) || item.height < product.minHeight || item.height > product.maxHeight) {
      throw new Error(`${product.name} ölçüleri izin verilen aralığın dışında.`);
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 50) throw new Error("Adet 1–50 arasında olmalı.");
    const selectedFeatures = catalog.features.filter((feature) => feature.active && item.featureSlugs.includes(feature.slug));
    if (selectedFeatures.length !== new Set(item.featureSlugs).size) throw new Error("Geçersiz ek özellik seçildi.");
    const area = (item.width * item.height) / 10000;
    const unitPrice = Math.round(product.basePrice + area * product.pricePerM2 + color.price + selectedFeatures.reduce((sum, feature) => sum + feature.price, 0));
    return { ...item, unitPrice, lineTotal: unitPrice * item.quantity, productName: product.name, colorName: color.name, featureNames: selectedFeatures.map((feature) => feature.name) };
  });
  const productsSubtotal = priced.reduce((sum, item) => sum + item.lineTotal, 0);
  const serviceFee = fulfilment === "installation" ? catalog.settings.installationFee : productsSubtotal >= catalog.settings.freeShippingThreshold ? 0 : catalog.settings.shippingFee;
  const subtotal = productsSubtotal + serviceFee;
  const vat = Math.round(subtotal * catalog.settings.vatRate);
  return { items: priced, productsSubtotal, serviceFee, subtotal, vat, total: subtotal + vat };
}

export const formatMoney = (value: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value);
