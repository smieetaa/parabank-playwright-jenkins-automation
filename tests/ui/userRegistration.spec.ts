import { test, expect } from '@playwright/test';
import { generateUsername } from '../../utils/createUser';

// 1. Navigate to Para bank application.
// 2. Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test
// execution).
// 3. Login to the application with the user created in step 2.
// 4. Verify if the Global navigation menu in home page is working as expected.
// 5. Create a Savings account from “Open New Account Page” and capture the account number.
// 6. Validate if Accounts overview page is displaying the balance details as expected.
// 7. Transfer funds from account created in step 5 to another account.
// 8. Pay the bill with account created in step 5.
// 9. Add necessary assertions at each test step whenever it is needed.

test('New user registration', async ({ page }) => {
  const username = generateUsername();
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
//   title: ParaBank | Register for Free Online Account Access
// await expect(page).toHaveTitle(/Playwright/);
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
