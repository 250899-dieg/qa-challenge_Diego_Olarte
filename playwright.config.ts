import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1440, height: 900 }
      }
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13']
      }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
