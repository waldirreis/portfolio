import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "e2e",
  use: { baseURL: "http://localhost:3123", channel: "chrome" },
  webServer: { command: "npx next start -p 3123", port: 3123, reuseExistingServer: true },
});
