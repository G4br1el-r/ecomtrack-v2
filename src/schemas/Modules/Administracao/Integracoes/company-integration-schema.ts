import { z } from "zod";

import { integrationKindSchema } from "./integration-provider-schema";

export const companyIntegrationSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  providerCode: z.string(),
  providerName: z.string(),
  kind: integrationKindSchema,
  name: z.string(),
  isActive: z.boolean(),
  isPlatform: z.boolean(),
  values: z.record(z.string(), z.string()),
  updatedAt: z.string().nullable(),
});

export type CompanyIntegration = z.infer<typeof companyIntegrationSchema>;
