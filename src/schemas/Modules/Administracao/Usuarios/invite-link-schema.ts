import { z } from "zod";

export const inviteLinkSchema = z.object({ link: z.string(), expiresAt: z.string() });

export type InviteLink = z.infer<typeof inviteLinkSchema>;
