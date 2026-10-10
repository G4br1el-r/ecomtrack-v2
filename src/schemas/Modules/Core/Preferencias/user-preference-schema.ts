import { z } from "zod";

export const userPreferenceSchema = z.object({
  key: z.string(),
  value: z.unknown(),
  updatedAt: z.string(),
});

export type UserPreference = z.infer<typeof userPreferenceSchema>;
