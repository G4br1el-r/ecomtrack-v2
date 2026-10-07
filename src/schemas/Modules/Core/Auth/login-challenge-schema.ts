import { z } from "zod";

export const loginChallengeSchema = z.object({
  challengeId: z.string(),
  maskedEmail: z.string(),
  expiresAt: z.string(),
  resendAvailableAt: z.string(),
});

export type LoginChallenge = z.infer<typeof loginChallengeSchema>;
