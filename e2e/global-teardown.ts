import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { COVERAGE_HITS_FILE, COVERAGE_REPORT_FILE } from "./constants";
import { buildCoverageReport } from "./support/build-coverage-report";

export default function globalTeardown() {
  if (!existsSync(COVERAGE_HITS_FILE)) return;
  const hits = readFileSync(COVERAGE_HITS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const { missing, markdown } = buildCoverageReport(hits);
  writeFileSync(COVERAGE_REPORT_FILE, markdown);
  console.log(`\nRelatório de cobertura: ${COVERAGE_REPORT_FILE}`);
  if (missing.length > 0) throw new Error(`Endpoints sem teste E2E: ${missing.join(", ")}`);
}
