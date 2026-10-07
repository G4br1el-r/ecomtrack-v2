import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { userSchema } from "./user-schema";

export const usersPageSchema = pagedResultSchema(
  userSchema,
  z.object({ active: z.number(), invited: z.number(), inactive: z.number() }),
);

export type UsersPage = z.infer<typeof usersPageSchema>;
