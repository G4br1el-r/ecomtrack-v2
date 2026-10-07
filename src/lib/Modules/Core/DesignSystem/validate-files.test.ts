import { describe, expect, it } from "vitest";

import { MAX_FILE_SIZE_BYTES, MAX_FILES } from "@/constants/Modules/Core/DesignSystem/upload";

import { validateFiles } from "./validate-files";

function fakeFile(name: string, size = 10): File {
  const file = new File(["x"], name);
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("validateFiles", () => {
  it("aceita extensão permitida dentro do limite", () => {
    const result = validateFiles([fakeFile("pedidos.CSV")], 0);
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(0);
  });

  it("rejeita extensão não permitida", () => {
    expect(validateFiles([fakeFile("script.exe")], 0).rejected[0]?.reason).toBe("type");
  });

  it("rejeita arquivo maior que o limite", () => {
    expect(validateFiles([fakeFile("planilha.xlsx", MAX_FILE_SIZE_BYTES + 1)], 0).rejected[0]?.reason).toBe("size");
  });

  it("rejeita o que passa da quantidade máxima", () => {
    const result = validateFiles([fakeFile("a.pdf"), fakeFile("b.pdf")], MAX_FILES - 1);
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected[0]?.reason).toBe("limit");
  });
});
