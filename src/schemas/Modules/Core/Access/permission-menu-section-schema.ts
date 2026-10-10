import { z } from "zod";

import { permissionMenuPageSchema } from "./permission-menu-page-schema";

export const permissionMenuSectionSchema = z.object({
  sectionId: z.string().nullable(),
  name: z.string(),
  icon: z.string().nullable(),
  order: z.number(),
  pages: z.array(permissionMenuPageSchema),
});

export type PermissionMenuSection = z.infer<typeof permissionMenuSectionSchema>;
