import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/constants/Modules/Core/Auth/auth";

const LETTER_PATTERN = /\p{L}/u;
const DIGIT_PATTERN = /\d/;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, "Use pelo menos 10 caracteres.")
  .regex(LETTER_PATTERN, "Use pelo menos uma letra.")
  .regex(DIGIT_PATTERN, "Use pelo menos um número.");
