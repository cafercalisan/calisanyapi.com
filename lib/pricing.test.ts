import { describe, expect, it } from "vitest";
import { DEFAULT_CATALOG } from "./catalog";
import { calculateQuote } from "./pricing";

const item = { id: "1", openingType: "window" as const, label: "Pencere", productSlug: "pliseli-pencere", width: 100, height: 120, quantity: 1, colorSlug: "beyaz", featureSlugs: [] };
describe("calculateQuote", () => {
  it("calculates item, shipping and VAT", () => { const result=calculateQuote([item],"shipping",DEFAULT_CATALOG); expect(result.productsSubtotal).toBe(2290); expect(result.serviceFee).toBe(250); expect(result.vat).toBe(508); expect(result.total).toBe(3048); });
  it("uses free shipping threshold", () => { const result=calculateQuote([{...item,quantity:4}],"shipping",DEFAULT_CATALOG); expect(result.serviceFee).toBe(0); });
  it("uses installation instead of shipping", () => { const result=calculateQuote([item],"installation",DEFAULT_CATALOG); expect(result.serviceFee).toBe(600); });
  it("rejects out-of-range sizes", () => { expect(()=>calculateQuote([{...item,width:999}],"shipping",DEFAULT_CATALOG)).toThrow(/ölçüleri/); });
  it("prices multiple configured items", () => { const result=calculateQuote([item,{...item,id:"2",quantity:2,colorSlug:"siyah",featureSlugs:["pet"]}],"shipping",DEFAULT_CATALOG); expect(result.items).toHaveLength(2); expect(result.productsSubtotal).toBeGreaterThan(7000); });
});
