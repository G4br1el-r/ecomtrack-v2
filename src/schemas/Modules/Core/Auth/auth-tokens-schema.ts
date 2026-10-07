import { z } from "zod";

import { currentUserSchema } from "./current-user-schema";

export const authTokensSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.string(),
  user: currentUserSchema,
});

export type AuthTokens = z.infer<typeof authTokensSchema>;
