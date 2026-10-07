import { z } from "zod";

export const integrationKindSchema = z.enum(["Email", "Ecommerce", "Supplier", "AI", "Bank", "Payment"]);

export const integrationFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.string(),
  required: z.boolean(),
  isSecret: z.boolean().optional(),
});

export const integrationProviderSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  kind: integrationKindSchema,
  allowsMultiple: z.boolean(),
  allowsPlatformDefault: z.boolean(),
  fields: z.array(integrationFieldSchema),
});

export type IntegrationField = z.infer<typeof integrationFieldSchema>;
export type IntegrationProvider = z.infer<typeof integrationProviderSchema>;
