import { z } from "zod";

export const profileKindSchema = z.enum(["Owner", "Master", "Company"]);

export type ProfileKind = z.infer<typeof profileKindSchema>;
