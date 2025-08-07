import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://parabank.parasoft.com',
    browserName: 'chromium',
    headless: true,
  },
  reporter: [['html', { outputFolder: 'playwright-test-report' }]],
});
