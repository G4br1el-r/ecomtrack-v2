import { z } from "zod";

import { profileKindSchema } from "@/schemas/Modules/Core/Access/profile-kind-schema";

export const profileDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  kind: profileKindSchema,
  isDefault: z.boolean(),
  version: z.number(),
  userCount: z.number(),
  pages: z.array(z.string()),
  components: z.array(z.string()),
});

export type ProfileDetail = z.infer<typeof profileDetailSchema>;
