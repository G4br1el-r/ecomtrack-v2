import { z } from "zod";

export const notificationPartSchema = z.enum(["Header", "Footer", "Message"]);

export const notificationSummarySchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  part: notificationPartSchema,
  channel: z.string(),
  canBeDisabled: z.boolean(),
  isEnabled: z.boolean(),
  isCustom: z.boolean(),
  hasCompanyDefault: z.boolean(),
  updatedAt: z.string().nullable(),
});

export type NotificationPart = z.infer<typeof notificationPartSchema>;
export type NotificationSummary = z.infer<typeof notificationSummarySchema>;
