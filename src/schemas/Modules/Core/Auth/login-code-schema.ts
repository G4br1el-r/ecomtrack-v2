import { z } from "zod";

import { LOGIN_CODE_LENGTH } from "@/constants/Modules/Core/Auth/auth";

const DIGITS_ONLY_PATTERN = /^\d+$/;

export const loginCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .length(LOGIN_CODE_LENGTH, "O código tem 6 dígitos.")
    .regex(DIGITS_ONLY_PATTERN, "Use só números."),
});

export type LoginCodeFormValues = z.infer<typeof loginCodeSchema>;
