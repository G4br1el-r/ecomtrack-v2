import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { companySchema } from "./company-schema";

export const companiesPageSchema = pagedResultSchema(
  companySchema,
  z.object({ active: z.number(), suspended: z.number() }),
);

export type CompaniesPage = z.infer<typeof companiesPageSchema>;
