import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }],
    ['./tests/reporters/extent-html-reporter.ts', { outputFile: 'reports/extent-report.html' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.scriptedqa.com',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
