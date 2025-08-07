import { test, expect } from '@playwright/test';
import { generateUsername } from '../../utils/createUser';

test('New user registration', async ({ page }) => {
  const username = generateUsername();
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
  await page.fill('#customer\\.firstName', 'John');
  await page.fill('#customer\\.lastName', 'Doe');
  await page.fill('#customer\\.address\\.street', '123 Street');
  await page.fill('#customer\\.address\\.city', 'TestCity');
  await page.fill('#customer\\.address\\.state', 'State');
  await page.fill('#customer\\.address\\.zipCode', '12345');
  await page.fill('#customer\\.phoneNumber', '1234567890');
  await page.fill('#customer\\.ssn', '123-45-6789');
  await page.fill('#customer\\.username', username);
  await page.fill('#customer\\.password', 'Password123');
  await page.fill('#repeatedPassword', 'Password123');
  await page.click('input[value="Register"]');

  await expect(page.locator('.title')).toContainText('Welcome');
});
