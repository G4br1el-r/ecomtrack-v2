import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { auditLogSchema } from "./audit-log-schema";

export const auditLogsPageSchema = pagedResultSchema(
  auditLogSchema,
  z.object({ creates: z.number(), updates: z.number(), deletes: z.number(), others: z.number() }),
);

export type AuditLogsPage = z.infer<typeof auditLogsPageSchema>;
