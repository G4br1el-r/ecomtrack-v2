import { z } from "zod";

import { permissionPageSchema } from "./permission-page-schema";
import { profileKindSchema } from "./profile-kind-schema";

export const profilePermissionsSchema = z.object({
  profileId: z.string(),
  profileName: z.string(),
  version: z.number(),
  kind: profileKindSchema,
  pages: z.array(permissionPageSchema),
  components: z.array(z.string()),
});

export type ProfilePermissions = z.infer<typeof profilePermissionsSchema>;
