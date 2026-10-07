import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

import { E2E_PORT } from "./e2e/constants";

const E2E_ENV_FILE = ".env.e2e.local";
const ONE_MINUTE_IN_MS = 60_000;
const SERVER_START_MINUTES = 5;
const SERVER_START_TIMEOUT_MS = SERVER_START_MINUTES * ONE_MINUTE_IN_MS;
const TEST_TIMEOUT_MINUTES = 4;
const ACTION_TIMEOUT_MS = 90_000;
const EXPECT_TIMEOUT_MS = 90_000;
const TEST_TIMEOUT_MS = TEST_TIMEOUT_MINUTES * ONE_MINUTE_IN_MS;

if (existsSync(E2E_ENV_FILE)) process.loadEnvFile(E2E_ENV_FILE);

export default defineConfig({
  testDir: "e2e",
  testMatch: "**/*.spec.ts",
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  fullyParallel: false,
  workers: 1,
  timeout: TEST_TIMEOUT_MS,
  expect: { timeout: EXPECT_TIMEOUT_MS },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: ACTION_TIMEOUT_MS,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm build && NODE_EXTRA_CA_CERTS=.certs/localhost.pem pnpm start -p ${E2E_PORT}`,
    url: `http://localhost:${E2E_PORT}/login`,
    reuseExistingServer: true,
    timeout: SERVER_START_TIMEOUT_MS,
  },
});
