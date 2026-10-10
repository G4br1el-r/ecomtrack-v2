import { z } from "zod";

export const aiGenerationSchema = z.object({
  text: z.string(),
  integrationId: z.string(),
  providerCode: z.string(),
  model: z.string(),
});

export type AiGeneration = z.infer<typeof aiGenerationSchema>;
