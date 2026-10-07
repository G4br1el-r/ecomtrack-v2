import { z } from "zod";

export const emailPreviewSchema = z.object({ subject: z.string(), html: z.string() });

export type EmailPreview = z.infer<typeof emailPreviewSchema>;
