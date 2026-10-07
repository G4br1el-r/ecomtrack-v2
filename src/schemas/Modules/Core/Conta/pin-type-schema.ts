import { z } from "zod";

export const pinTypeSchema = z.enum(["Four", "Six"]);

export type PinType = z.infer<typeof pinTypeSchema>;
