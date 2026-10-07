import { describe, expect, it } from "vitest";

import { formatFileSize } from "./format-file-size";

describe("formatFileSize", () => {
  it("mantém bytes sem casas decimais", () => {
    expect(formatFileSize(512)).toBe("512 B");
  });

  it("converte para KB com uma casa", () => {
    expect(formatFileSize(1536)).toBe("1,5 KB");
  });

  it("converte para MB", () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe("5 MB");
  });
});
