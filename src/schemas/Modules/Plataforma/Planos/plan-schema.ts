import { z } from "zod";

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  pageCount: z.number(),
  componentCount: z.number(),
  companyCount: z.number(),
});

export type Plan = z.infer<typeof planSchema>;
