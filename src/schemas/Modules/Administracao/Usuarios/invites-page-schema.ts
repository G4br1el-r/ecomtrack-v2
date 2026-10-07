import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { inviteSchema } from "./invite-schema";

export const invitesPageSchema = pagedResultSchema(
  inviteSchema,
  z.object({ pending: z.number(), expired: z.number(), accepted: z.number() }),
);

export type InvitesPage = z.infer<typeof invitesPageSchema>;
