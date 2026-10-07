import { z } from "zod";

export const permissionPageSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  route: z.string().nullable(),
  icon: z.string().nullable(),
  showInMenu: z.boolean(),
  sortOrder: z.number(),
  section: z
    .object({
      name: z.string(),
      icon: z.string().nullable(),
      sortOrder: z.number(),
    })
    .nullable(),
});

export type PermissionPage = z.infer<typeof permissionPageSchema>;
