import { z } from "zod";

export const permissionComponentSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  enabled: z.boolean(),
});

export type PermissionComponent = z.infer<typeof permissionComponentSchema>;
