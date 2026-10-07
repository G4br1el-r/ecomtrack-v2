import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { companyIntegrationSchema } from "./company-integration-schema";

export const integrationsPageSchema = pagedResultSchema(
  companyIntegrationSchema,
  z.object({ active: z.number(), inactive: z.number() }),
);

export type IntegrationsPage = z.infer<typeof integrationsPageSchema>;
