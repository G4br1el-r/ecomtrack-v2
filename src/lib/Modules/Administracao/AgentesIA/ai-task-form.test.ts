import { describe, expect, it } from "vitest";

import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";

import { buildAiTaskPreferenceKey } from "./build-ai-task-preference-key";
import { buildAiTaskPreferenceValue } from "./build-ai-task-preference-value";
import { buildGenerationVariables } from "./build-generation-variables";
import { getAiTaskFormDefaults } from "./get-ai-task-form-defaults";
import { parseAiTaskPreference } from "./parse-ai-task-preference";

const TAGS_TASK: AiTask = {
  key: "tags",
  name: "Tags",
  description: "Sugere tags para o produto",
  defaultPrompt: "Gere tags para {titulo}",
  variables: [
    { name: "titulo", label: "Título" },
    { name: "generos", label: "Gêneros" },
  ],
};

describe("formulário da tarefa de IA", () => {
  it("monta a chave da preferência da tarefa", () => {
    expect(buildAiTaskPreferenceKey("product_info")).toBe("ai.task.product_info");
  });

  it("começa com o prompt padrão quando não há configuração salva", () => {
    expect(getAiTaskFormDefaults(TAGS_TASK, null)).toEqual({
      integrationId: "",
      model: "",
      prompt: "Gere tags para {titulo}",
      variables: { titulo: "", generos: "" },
    });
  });

  it("usa a conexão, o modelo e o prompt salvos", () => {
    expect(
      getAiTaskFormDefaults(TAGS_TASK, { integrationId: "ia-1", model: "gpt-5", prompt: "Meu prompt" }),
    ).toMatchObject({ integrationId: "ia-1", model: "gpt-5", prompt: "Meu prompt" });
  });

  it("salva prompt igual ao padrão e modelo vazio como nulos", () => {
    expect(
      buildAiTaskPreferenceValue(TAGS_TASK, {
        integrationId: "ia-1",
        model: "  ",
        prompt: " Gere tags para {titulo} ",
        variables: {},
      }),
    ).toEqual({ integrationId: "ia-1", model: null, prompt: null });
  });

  it("lê a preferência salva e descarta campo inválido", () => {
    expect(parseAiTaskPreference({ integrationId: "ia-1", model: 3, prompt: "x" })).toEqual({
      integrationId: "ia-1",
      model: null,
      prompt: "x",
    });
    expect(parseAiTaskPreference("texto")).toBeNull();
  });

  it("manda variável vazia como nula", () => {
    expect(buildGenerationVariables({ titulo: " Hades ", generos: "" })).toEqual({ titulo: "Hades", generos: null });
  });
});
