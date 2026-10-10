import { describe, expect, it } from "vitest";

import { buildCoverageReport } from "./build-coverage-report";

const TOTAL_ENDPOINTS = 90;

describe("buildCoverageReport", () => {
  it("só conta o endpoint que respondeu sem erro de servidor nem limite", () => {
    const { missing, markdown } = buildCoverageReport([
      { key: "users.list", status: 200, test: "lista" },
      { key: "users.get", status: 404, test: "detalhe" },
      { key: "users.update", status: 429, test: "limite" },
      { key: "users.activate", status: 500, test: "quebrou" },
    ]);

    expect(missing).toHaveLength(TOTAL_ENDPOINTS - 2);
    expect(missing).toEqual(expect.arrayContaining(["users.update", "users.activate"]));
    expect(markdown).toContain(`Cobertura E2E dos endpoints: 2/${TOTAL_ENDPOINTS}`);
    expect(markdown).toContain("| ✅ | GET | `/users` | 200 | lista |");
  });
});
