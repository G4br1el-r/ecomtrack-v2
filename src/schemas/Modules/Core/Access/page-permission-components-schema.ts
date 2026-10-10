import { z } from "zod";

import { permissionComponentSchema } from "./permission-component-schema";

export const pagePermissionComponentsSchema = z.object({
  pageCode: z.string(),
  pageEnabled: z.boolean(),
  components: z.array(permissionComponentSchema),
});

export type PagePermissionComponents = z.infer<typeof pagePermissionComponentsSchema>;
