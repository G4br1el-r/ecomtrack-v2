import { z } from "zod";

export const permissionMenuPageSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  route: z.string().nullable(),
  order: z.number(),
  showInMenu: z.boolean(),
  enabled: z.boolean(),
});

export type PermissionMenuPage = z.infer<typeof permissionMenuPageSchema>;
