import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: 'https://haleema123-web.github.io/brew-haven/',
    trace: 'on',              // ✅ Har test ka trace
    screenshot: 'on',         // ✅ Har test ka screenshot
    video: 'on',              // ✅ Har test ki video
    headless: false,          // ✅ Headed mode (browser visible)
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});