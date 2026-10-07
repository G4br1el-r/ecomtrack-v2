import { z } from "zod";

export const companyStatusSchema = z.enum(["Active", "Suspended"]);

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  document: z.string().nullable(),
  status: companyStatusSchema,
  planId: z.string(),
  planName: z.string().nullable(),
  userCount: z.number(),
  createdAt: z.string(),
});

export type CompanyStatus = z.infer<typeof companyStatusSchema>;
export type Company = z.infer<typeof companySchema>;
