import { z } from "zod";

export const auditTypeSchema = z.enum([
  "Login",
  "Logout",
  "Create",
  "Update",
  "Delete",
  "View",
  "Export",
  "Permissions",
  "Settings",
  "Security",
  "Custom",
]);

export type AuditType = z.infer<typeof auditTypeSchema>;
