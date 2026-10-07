import { z } from "zod";

import { COMPANY_NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

const CPF_DIGITS = 11;
const CNPJ_DIGITS = 14;
const NON_DIGITS = /\D/g;

export const companyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da empresa.")
    .max(COMPANY_NAME_MAX_LENGTH, "Use no máximo 150 caracteres."),
  document: z
    .string()
    .trim()
    .refine((document) => {
      const digits = document.replace(NON_DIGITS, "").length;
      return document === "" || digits === CPF_DIGITS || digits === CNPJ_DIGITS;
    }, "Informe um CNPJ (14 números) ou CPF (11 números)."),
  planId: z.string().min(1, "Escolha o plano da empresa."),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
