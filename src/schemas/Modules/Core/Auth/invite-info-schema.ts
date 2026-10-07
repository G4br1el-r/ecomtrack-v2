import { z } from "zod";

export const inviteInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  companyName: z.string().nullable(),
  expiresAt: z.string(),
});

export type InviteInfo = z.infer<typeof inviteInfoSchema>;
