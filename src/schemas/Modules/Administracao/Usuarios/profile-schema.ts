import { z } from "zod";

import { profileKindSchema } from "@/schemas/Modules/Core/Access/profile-kind-schema";

export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  kind: profileKindSchema,
  isDefault: z.boolean(),
  version: z.number(),
  userCount: z.number(),
  updatedAt: z.string().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
