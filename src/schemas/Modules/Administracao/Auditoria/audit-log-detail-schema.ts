import { z } from "zod";

import { auditLogSchema } from "./audit-log-schema";

export const auditLogDetailSchema = z.object({
  summary: auditLogSchema,
  oldValues: z.unknown(),
  newValues: z.unknown(),
  ip: z.string().nullable(),
  userAgent: z.string().nullable(),
  correlationId: z.string().nullable(),
});

export type AuditLogDetail = z.infer<typeof auditLogDetailSchema>;
