import { z } from "zod";

export const currentUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
  companyId: z.string().nullable(),
  profileId: z.string().nullable(),
  profileName: z.string().nullable(),
  isPlatformOwner: z.boolean(),
  hasPinFour: z.boolean(),
  hasPinSix: z.boolean(),
  isViewingAs: z.boolean(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;
