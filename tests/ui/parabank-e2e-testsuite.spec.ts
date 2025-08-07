import { test, expect } from '@playwright/test';

test.describe('Parabank E2E Test Suite', () => {
    let savingsAccountNumber;

    test('Para bank end-to-end flow', async ({ page }) => {
        // Step 1: Navigate to Para bank application
        // await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        // await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');

        // Step 2: Create a new user
        await page.getByRole('link', { name: 'Register' }).click();
        await expect(page).toHaveURL(/register/);
        const uniqueId = Date.now().toString();
        const username = `testuser${uniqueId}`;
        const password = 'password123';
        await page.locator('#customer\\.firstName').fill('John');
        await page.locator('#customer\\.lastName').fill('Doe');
        await page.locator('#customer\\.address\\.street').fill('123 Main St');
        await page.locator('#customer\\.address\\.city').fill('Anytown');
        await page.locator('#customer\\.address\\.state').fill('CA');
        await page.locator('#customer\\.address\\.zipCode').fill('12345');
        await page.locator('#customer\\.phoneNumber').fill('555-1234');
        await page.locator('#customer\\.ssn').fill('123-45-6789');
        await page.locator('#customer\\.username').fill(username);
        await page.locator('#customer\\.password').fill(password);
        await page.locator('#repeatedPassword').fill(password);
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('.title')).toContainText(`Welcome ${username}`);
        // await expect(page.getByText(`Welcome ${username}`)).toBeVisible();
        console.log(`User created: ${username}`);

        // Step 3 & 4: Login and Verify Navigation Menu
        // (Playwright handles login automatically after registration in Para bank)
        await expect(page.getByRole('link', { name: 'Open New Account' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Transfer Funds' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Bill Pay' })).toBeVisible();

        // Step 5: Create a Savings account
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('1');
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.getByText('Congratulations, your new account is now open.')).toBeVisible();
        savingsAccountNumber = await page.locator('#newAccountId').textContent();
        expect(savingsAccountNumber).toBeTruthy();
        console.log(`New Savings Account Number: ${savingsAccountNumber}`);

        // Step 6: Validate Accounts Overview
        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        const savingsAccountRow = page.getByRole('row').filter({ has: page.getByText(savingsAccountNumber) });
        await expect(savingsAccountRow).toBeVisible();
        await expect(savingsAccountRow.getByText('Savings')).toBeVisible();
        await expect(savingsAccountRow.getByText('$100.00')).toBeVisible();

        // Step 7: Transfer funds
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('10');
        await page.locator('#fromAccountId').selectOption({ label: savingsAccountNumber });
        const toAccountId = await page.locator('#toAccountId option:not([value=""])').first().getAttribute('value');
        await page.locator('#toAccountId').selectOption(toAccountId);
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('Transfer Complete!')).toBeVisible();

        // Step 8: Pay the bill
        await page.getByRole('link', { name: 'Bill Pay' }).click();
        await page.locator('input[name="payee.name"]').fill('Electric Company');
        await page.locator('input[name="payee.address.street"]').fill('456 Power St');
        await page.locator('input[name="payee.address.city"]').fill('Cityville');
        await page.locator('input[name="payee.address.state"]').fill('NY');
        await page.locator('input[name="payee.address.zipCode"]').fill('54321');
        await page.locator('input[name="payee.phoneNumber"]').fill('888-999-0000');
        await page.locator('input[name="payee.accountNumber"]').fill('987654321');
        await page.locator('input[name="verifyAccount"]').fill('987654321');
        await page.locator('input[name="amount"]').fill('5');
        await page.locator('#fromAccountId').selectOption({ label: savingsAccountNumber });
        await page.getByRole('button', { name: 'Send Payment' }).click();
        await expect(page.getByText('Bill Payment Complete')).toBeVisible();
    });
});