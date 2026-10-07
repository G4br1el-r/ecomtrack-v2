import { z } from "zod";

export const userStatusSchema = z.enum(["Active", "Invited", "Inactive"]);

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
  status: userStatusSchema,
  profileId: z.string().nullable(),
  profileName: z.string().nullable(),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  invitedByName: z.string().nullable(),
});

export type UserStatus = z.infer<typeof userStatusSchema>;
export type User = z.infer<typeof userSchema>;
