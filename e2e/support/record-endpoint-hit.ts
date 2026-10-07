import { appendFileSync, mkdirSync } from "node:fs";

import { COVERAGE_DIR, COVERAGE_HITS_FILE } from "../constants";
import { matchEndpointKey } from "./match-endpoint-key";

export function recordEndpointHit(method: string, url: string, status: number, test: string) {
  const key = matchEndpointKey(method, url);
  if (!key) return;
  mkdirSync(COVERAGE_DIR, { recursive: true });
  appendFileSync(COVERAGE_HITS_FILE, `${JSON.stringify({ key, status, test })}\n`);
}
