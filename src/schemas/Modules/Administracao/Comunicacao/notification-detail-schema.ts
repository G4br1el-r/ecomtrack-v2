import { z } from "zod";

import { notificationPartSchema } from "./notification-summary-schema";

export const notificationDetailSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  part: notificationPartSchema,
  canBeDisabled: z.boolean(),
  isEnabled: z.boolean(),
  isCustom: z.boolean(),
  subject: z.string().nullable(),
  contentHtml: z.string(),
  companyDefaultSubject: z.string().nullable(),
  companyDefaultContentHtml: z.string().nullable(),
  platformDefaultSubject: z.string().nullable(),
  platformDefaultContentHtml: z.string(),
  variables: z.array(z.object({ name: z.string(), description: z.string(), example: z.string() })),
});

export type NotificationDetail = z.infer<typeof notificationDetailSchema>;
