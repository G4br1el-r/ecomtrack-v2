import { describe, expect, it } from "vitest";

import { parseGenerationFields } from "./parse-generation-fields";

describe("parseGenerationFields", () => {
  it("separa em campos o JSON devolvido pela IA", () => {
    expect(parseGenerationFields('{"titulo":"Hades","slug":"hades","tags":["roguelike"]}')).toEqual([
      { key: "titulo", value: "Hades" },
      { key: "slug", value: "hades" },
      { key: "tags", value: '["roguelike"]' },
    ]);
  });

  it("aceita o JSON dentro de bloco de código", () => {
    expect(parseGenerationFields('```json\n{"titulo":"Hades"}\n```')).toEqual([{ key: "titulo", value: "Hades" }]);
  });

  it("devolve nulo para texto livre ou JSON que não é objeto", () => {
    expect(parseGenerationFields("roguelike, ação, indie")).toBeNull();
    expect(parseGenerationFields('["a","b"]')).toBeNull();
  });
});
