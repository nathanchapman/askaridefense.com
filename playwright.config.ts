import { defineConfig } from "@playwright/test"

const port = process.env.CONDUCTOR_PORT || "3000"
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL,
    channel: "chrome",
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: `bun run dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
