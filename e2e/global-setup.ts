import { rmSync } from "node:fs";

import { COVERAGE_HITS_FILE } from "./constants";

export default function globalSetup() {
  rmSync(COVERAGE_HITS_FILE, { force: true });
}
