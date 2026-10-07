import { z } from "zod";

import { auditTypeSchema } from "@/schemas/Modules/Administracao/Auditoria/audit-type-schema";
import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

export const userActivitySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  type: auditTypeSchema,
  label: z.string().nullable(),
  summary: z.string().nullable(),
  ip: z.string().nullable(),
});

export const userActivityPageSchema = pagedResultSchema(
  userActivitySchema,
  z.object({ lastLoginAt: z.string().nullable(), lastActivityAt: z.string().nullable() }),
);

export type UserActivity = z.infer<typeof userActivitySchema>;
export type UserActivityPage = z.infer<typeof userActivityPageSchema>;
