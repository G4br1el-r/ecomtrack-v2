import { z } from "zod";

import { auditTypeSchema } from "./audit-type-schema";

export const auditLogSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  type: auditTypeSchema,
  pageCode: z.string().nullable(),
  actionCode: z.string().nullable(),
  entityName: z.string().nullable(),
  entityId: z.string().nullable(),
  userId: z.string().nullable(),
  userName: z.string().nullable(),
  userEmail: z.string().nullable(),
  description: z.string().nullable(),
  changedFields: z.array(z.string()),
});

export type AuditLog = z.infer<typeof auditLogSchema>;
