import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { planSchema } from "./plan-schema";

export const plansPageSchema = pagedResultSchema(planSchema, z.object({ companies: z.number() }));

export type PlansPage = z.infer<typeof plansPageSchema>;
