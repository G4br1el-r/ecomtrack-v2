import { describe, expect, it } from "vitest";

import { getInitials } from "./get-initials";

describe("getInitials", () => {
  it("usa a primeira letra do primeiro e do último nome", () => {
    expect(getInitials("Ana Paula Martins")).toBe("AM");
  });

  it("usa as duas primeiras letras de nome único", () => {
    expect(getInitials("carlos")).toBe("CA");
  });

  it("ignora espaços extras e nome vazio", () => {
    expect(getInitials("  João   Pereira ")).toBe("JP");
    expect(getInitials("")).toBe("");
  });
});
