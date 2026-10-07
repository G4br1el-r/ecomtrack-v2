import { z } from "zod";

const BRAND_NAME_MIN_LENGTH = 2;
const BRAND_NAME_MAX_LENGTH = 40;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(BRAND_NAME_MIN_LENGTH, "Informe ao menos 2 caracteres.")
    .max(BRAND_NAME_MAX_LENGTH, "Use no máximo 40 caracteres."),
  slug: z.string().trim().regex(SLUG_PATTERN, "Use letras minúsculas, números e hífens."),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
