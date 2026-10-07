import { z } from "zod";

export const companyContextSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
});

export type CompanyContext = z.infer<typeof companyContextSchema>;
