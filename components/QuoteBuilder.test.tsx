import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { DEFAULT_CATALOG } from "../lib/catalog";
import { QuoteBuilder } from "./QuoteBuilder";

describe("QuoteBuilder server rendering", () => {
  it("renders when the default product is absent from the catalog", () => {
    const catalog = {
      ...DEFAULT_CATALOG,
      products: DEFAULT_CATALOG.products.filter((product) => product.slug !== "sabit-citcitli"),
    };

    expect(renderToString(<QuoteBuilder catalog={catalog} />)).toContain("Ölçü");
  });

  it("keeps the service page available when no supported products exist", () => {
    const catalog = { ...DEFAULT_CATALOG, products: [] };

    expect(renderToString(<QuoteBuilder catalog={catalog} />)).toContain("Teklif seçenekleri hazırlanıyor");
  });
});
