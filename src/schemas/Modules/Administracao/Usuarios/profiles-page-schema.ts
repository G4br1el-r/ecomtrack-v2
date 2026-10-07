import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { profileSchema } from "./profile-schema";

export const profilesPageSchema = pagedResultSchema(profileSchema, z.object({ assignedUsers: z.number() }));

export type ProfilesPage = z.infer<typeof profilesPageSchema>;
