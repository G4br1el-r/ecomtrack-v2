import { z } from "zod";

export const inviteStatusSchema = z.enum(["Pending", "Expired", "Accepted"]);

export const inviteSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  profileId: z.string().nullable(),
  profileName: z.string().nullable(),
  status: inviteStatusSchema,
  invitedByName: z.string(),
  sentAt: z.string(),
  expiresAt: z.string(),
  acceptedAt: z.string().nullable(),
});

export type InviteStatus = z.infer<typeof inviteStatusSchema>;
export type Invite = z.infer<typeof inviteSchema>;
