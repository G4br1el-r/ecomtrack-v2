import { describe, expect, it } from "vitest";

import { isEditableTarget } from "./is-editable-target";

describe("isEditableTarget", () => {
  it("reconhece campos de digitação", () => {
    expect(isEditableTarget(document.createElement("input"))).toBe(true);
    expect(isEditableTarget(document.createElement("textarea"))).toBe(true);
    expect(isEditableTarget(document.createElement("select"))).toBe(true);
  });

  it("reconhece elemento com edição de conteúdo", () => {
    const element = document.createElement("div");
    element.contentEditable = "true";
    Object.defineProperty(element, "isContentEditable", { value: true });
    expect(isEditableTarget(element)).toBe(true);
  });

  it("ignora botões, o corpo da página e alvo vazio", () => {
    expect(isEditableTarget(document.createElement("button"))).toBe(false);
    expect(isEditableTarget(document.body)).toBe(false);
    expect(isEditableTarget(null)).toBe(false);
  });
});
