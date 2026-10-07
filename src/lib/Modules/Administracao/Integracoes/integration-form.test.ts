import { describe, expect, it } from "vitest";

import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { integrationFormSchema } from "@/schemas/Modules/Administracao/Integracoes/integration-form-schema";
import type { IntegrationField } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

import { getIntegrationFormDefaults } from "./get-integration-form-defaults";
import { getStoredSecrets } from "./get-stored-secrets";

const FIELDS: IntegrationField[] = [
  { name: "storeUrl", label: "Endereço da loja", type: "url", required: true },
  { name: "apiKey", label: "Chave da API", type: "secret", required: true, isSecret: true },
  { name: "contact", label: "E-mail de contato", type: "email", required: false },
];

const SAVED: CompanyIntegration = {
  id: "i-1",
  providerId: "nuvem",
  providerCode: "nuvemshop",
  providerName: "Nuvemshop",
  kind: "Ecommerce",
  name: "Loja principal",
  isActive: true,
  isPlatform: false,
  values: { storeUrl: "https://loja.com.br", apiKey: "ab****9f", contact: "" },
  updatedAt: null,
};

describe("formulário de integração", () => {
  it("monta os valores iniciais sem expor o segredo mascarado", () => {
    expect(getIntegrationFormDefaults(FIELDS, SAVED)).toEqual({
      name: "Loja principal",
      isActive: true,
      values: { storeUrl: "https://loja.com.br", apiKey: "", contact: "" },
    });
    expect(getIntegrationFormDefaults(FIELDS, null).isActive).toBe(true);
  });

  it("exige os obrigatórios quando a conexão está ativa", () => {
    const result = integrationFormSchema(FIELDS, []).safeParse({ name: "", isActive: true, values: { storeUrl: "" } });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      "Informe Endereço da loja.",
      "Informe Chave da API.",
    ]);
  });

  it("aceita segredo em branco quando já existe um guardado", () => {
    const stored = getStoredSecrets(FIELDS, SAVED);

    expect(stored).toEqual(["apiKey"]);
    expect(
      integrationFormSchema(FIELDS, stored).safeParse({
        name: "x",
        isActive: true,
        values: { storeUrl: "https://loja.com.br", apiKey: "" },
      }).success,
    ).toBe(true);
  });

  it("libera tudo vazio com a conexão desativada, mas confere o formato", () => {
    expect(integrationFormSchema(FIELDS, []).safeParse({ name: "", isActive: false, values: {} }).success).toBe(true);
    const result = integrationFormSchema(FIELDS, []).safeParse({
      name: "",
      isActive: false,
      values: { storeUrl: "loja", contact: "contato" },
    });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      "Informe um endereço válido, começando com https://.",
      "Informe um e-mail válido.",
    ]);
  });
});
