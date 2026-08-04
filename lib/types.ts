export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  basePrice: number;
  pricePerM2: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  active: boolean;
};

export type ColorOption = { id: string; slug: string; name: string; hex: string; price: number; active: boolean };
export type FeatureOption = { id: string; slug: string; name: string; price: number; active: boolean };
export type PricingSettings = { vatRate: number; shippingFee: number; freeShippingThreshold: number; installationFee: number };
export type Catalog = { products: Product[]; colors: ColorOption[]; features: FeatureOption[]; settings: PricingSettings };

export type QuoteItemInput = {
  id: string;
  openingType: "window" | "door" | "glass-balcony" | "other";
  label: string;
  productSlug: string;
  width: number;
  height: number;
  quantity: number;
  colorSlug: string;
  featureSlugs: string[];
  photoPath?: string;
};

export type Fulfilment =
  | { type: "shipping"; city: string; district: string; address: string }
  | { type: "installation"; city: "İstanbul"; district: string; address: string };

export type CustomerInput = { name: string; phone: string; email?: string; notes?: string };
export type QuoteInput = { items: QuoteItemInput[]; fulfilment: Fulfilment; customer: CustomerInput; kvkkAccepted: true; website?: string };

export type PricedItem = QuoteItemInput & { unitPrice: number; lineTotal: number; productName: string; colorName: string; featureNames: string[] };
export type QuotePricing = { items: PricedItem[]; productsSubtotal: number; serviceFee: number; subtotal: number; vat: number; total: number };
