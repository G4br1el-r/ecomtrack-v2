import { API_ENDPOINTS } from "../../src/constants/Modules/Core/Api/api-endpoints";
import { FIRST_SERVER_ERROR, TOO_MANY_REQUESTS } from "../constants";

type Hit = { key: string; status: number; test: string };

export function buildCoverageReport(hits: Hit[]): { missing: string[]; markdown: string } {
  const rows = Object.entries(API_ENDPOINTS).flatMap(([group, actions]) =>
    Object.entries(actions).map(([action, endpoint]) => {
      const key = `${group}.${action}`;
      const own = hits.filter((hit) => hit.key === key);
      const ok = own.some((hit) => hit.status < FIRST_SERVER_ERROR && hit.status !== TOO_MANY_REQUESTS);
      const statuses = [...new Set(own.map((hit) => hit.status))].sort().join(", ");
      const tests = [...new Set(own.map((hit) => hit.test))].join("; ");
      return {
        key,
        ok,
        line: `| ${ok ? "✅" : "❌"} | ${endpoint.method} | \`${endpoint.path}\` | ${statuses || "—"} | ${tests || "—"} |`,
      };
    }),
  );
  const covered = rows.filter((row) => row.ok).length;
  const markdown = [
    `# Cobertura E2E dos endpoints: ${covered}/${rows.length}`,
    "",
    "| | Método | Caminho | Status recebidos | Testes |",
    "|---|---|---|---|---|",
    ...rows.map((row) => row.line),
    "",
  ].join("\n");
  return { missing: rows.filter((row) => !row.ok).map((row) => row.key), markdown };
}
