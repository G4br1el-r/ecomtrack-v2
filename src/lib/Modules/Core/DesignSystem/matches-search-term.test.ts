import { describe, expect, it } from "vitest";

import { matchesSearchTerm } from "./matches-search-term";

const FIELDS = ["Controle DualSense Édition", "PS5-CTRL-002"];

describe("matchesSearchTerm", () => {
  it("aceita tudo quando a busca está vazia", () => {
    expect(matchesSearchTerm(FIELDS, "   ")).toBe(true);
  });

  it("ignora maiúsculas e acentos", () => {
    expect(matchesSearchTerm(FIELDS, "edition")).toBe(true);
    expect(matchesSearchTerm(FIELDS, "DUALSENSE")).toBe(true);
  });

  it("busca em qualquer um dos campos", () => {
    expect(matchesSearchTerm(FIELDS, "ctrl-002")).toBe(true);
    expect(matchesSearchTerm(FIELDS, "xbox")).toBe(false);
  });
});
