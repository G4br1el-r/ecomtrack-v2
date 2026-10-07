import { z } from "zod";

export const planDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  companyCount: z.number(),
  pages: z.array(z.string()),
  components: z.array(z.string()),
});

export type PlanDetail = z.infer<typeof planDetailSchema>;
