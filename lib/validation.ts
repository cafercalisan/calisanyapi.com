import { z } from "zod";

const item = z.object({
  id: z.string().min(1).max(80), openingType: z.enum(["window", "door", "glass-balcony", "other"]), label: z.string().trim().min(1).max(80), productSlug: z.string().min(1).max(80),
  width: z.number().int().positive(), height: z.number().int().positive(), quantity: z.number().int().min(1).max(50),
  colorSlug: z.string().min(1).max(80), featureSlugs: z.array(z.string().max(80)).max(10), photoPath: z.string().max(500).optional(),
});
const address = { district: z.string().trim().min(2).max(80), address: z.string().trim().min(8).max(500) };
export const quoteSchema = z.object({
  items: z.array(item).length(1),
  fulfilment: z.discriminatedUnion("type", [
    z.object({ type: z.literal("shipping"), city: z.string().trim().min(2).max(80), ...address }),
    z.object({ type: z.literal("installation"), city: z.literal("İstanbul"), ...address }),
  ]),
  customer: z.object({ name: z.string().trim().min(2).max(100), phone: z.string().trim().regex(/^(\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/), email: z.string().email().optional().or(z.literal("")), notes: z.string().max(500).optional() }),
  kvkkAccepted: z.literal(true), website: z.string().max(0).optional(),
});
