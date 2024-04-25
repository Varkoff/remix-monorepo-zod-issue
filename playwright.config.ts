import { defineConfig, devices } from "@playwright/test";

import "dotenv/config";
const PORT = process.env.PORT || "3000";
const baseURL = `http://localhost:${PORT}`;
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./frontend/tests/e2e",
  timeout: 15 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 3 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI
      ? `PORT=${PORT} npm run start:mocks`
      : `PORT=${PORT} npm run dev:mocks`,
    // command: `PORT=${PORT} npm run start:mocks`,
    // url: `http://127.0.0.1:${PORT}`,
    // url: baseURL,
    port: Number(PORT),
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      PORT,
    },
    timeout: 15 * 1000,
  },
});
