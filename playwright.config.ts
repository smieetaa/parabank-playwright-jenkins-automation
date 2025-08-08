import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://parabank.parasoft.com',
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'on',
  },
  reporter: [['html', { outputFolder: 'playwright-test-report' }]],
});
