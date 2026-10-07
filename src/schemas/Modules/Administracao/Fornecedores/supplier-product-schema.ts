import { z } from "zod";

export const supplierProductSchema = z.object({
  id: z.string(),
  integrationId: z.string(),
  providerCode: z.string(),
  providerName: z.string(),
  externalId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  platform: z.string().nullable(),
  region: z.string().nullable(),
  languages: z.array(z.string()),
  currency: z.string(),
  price: z.number().nullable(),
  minPrice: z.number(),
  maxPrice: z.number(),
  commission: z.number().nullable(),
  quantity: z.number(),
  isOnDemand: z.boolean(),
  syncedAt: z.string(),
  isIntegrated: z.boolean(),
  integratedAt: z.string().nullable(),
});

export type SupplierProduct = z.infer<typeof supplierProductSchema>;
