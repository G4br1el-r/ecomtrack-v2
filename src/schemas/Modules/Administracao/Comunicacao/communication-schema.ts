import { z } from "zod";

import { notificationSummarySchema } from "./notification-summary-schema";

export const communicationSchema = z.object({
  layout: z.array(notificationSummarySchema),
  messages: z.array(notificationSummarySchema),
});

export type Communication = z.infer<typeof communicationSchema>;
