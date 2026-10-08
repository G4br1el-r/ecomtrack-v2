import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { QUERY_CACHE_POLICY } from "./query-cache-policies";

const HOOKS_DIR = join(process.cwd(), "src/hooks");
const OWN_RULE_HOOKS = ["use-session.ts", "use-invite.ts", "use-notification-preview.ts"];

const listFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(join(dir, entry.name)) : [join(dir, entry.name)],
  );

describe("QUERY_CACHE_POLICY", () => {
  it("toda consulta escolhe uma política de cache", () => {
    const withoutPolicy = listFiles(HOOKS_DIR)
      .filter((file) => !file.endsWith(".test.ts") && !file.endsWith(".test.tsx"))
      .filter((file) => readFileSync(file, "utf8").includes("useQuery({"))
      .filter((file) => !OWN_RULE_HOOKS.some((name) => file.endsWith(name)))
      .filter((file) => !readFileSync(file, "utf8").includes("...QUERY_CACHE_POLICY."));

    expect(withoutPolicy).toEqual([]);
  });

  it("o detalhe para edição sempre busca o dado atual e não recarrega enquanto a pessoa edita", () => {
    expect(QUERY_CACHE_POLICY.edit).toEqual({ staleTime: 0, gcTime: 0, refetchOnWindowFocus: false });
  });

  it("o registro imutável nunca vence", () => {
    expect(QUERY_CACHE_POLICY.immutable.staleTime).toBe(Number.POSITIVE_INFINITY);
  });
});
