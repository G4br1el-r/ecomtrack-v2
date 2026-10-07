import { z } from "zod";

import { profilePermissionsSchema } from "./profile-permissions-schema";

export const viewAsSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.string(),
  permissions: profilePermissionsSchema,
});

export type ViewAs = z.infer<typeof viewAsSchema>;
