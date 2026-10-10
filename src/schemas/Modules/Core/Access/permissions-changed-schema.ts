import { z } from "zod";

export const permissionsChangedSchema = z.object({
  profileId: z.string(),
  version: z.number(),
});

export type PermissionsChanged = z.infer<typeof permissionsChangedSchema>;
