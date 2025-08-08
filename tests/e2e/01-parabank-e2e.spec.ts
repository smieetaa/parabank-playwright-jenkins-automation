// tests/parabank.spec.ts
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { BillPayPage } from '../pages/BillPayPage';
import { writeSharedData } from '../utils/dataUtils';
import { userDetails } from '../fixtures/userDetails';
import { transactionDetails } from '../fixtures/transactionDetails';

test.describe('Parabank end-to-end flow with Page Objects', () => {

    test('should allow new user registration', async ({ page }) => {
        // 1. Navigate to Para bank application
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goToRegistrationPage();

        // 2. Create a new user
        await registrationPage.registerUser();

        // Assertion: Verify successful registration and login
        await expect(registrationPage.successfulSignupText).toBeVisible();

        const homePage = new HomePage(page);
        await expect(homePage.welcomeMessage(userDetails.username)).toBeVisible();

        // logout registered user to perform login in subsequent test
        await expect(homePage.logoutLink).toBeVisible();
        await homePage.logoutUser();
    });


    test('should allow newly created user to login and perform different operations', async ({ page }) => {
        // 3. Login to the application 
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();

        // login with valid credentials
        await loginPage.login(userDetails.username, userDetails.password);
        await expect(loginPage.welcomeText).toBeVisible();

        // 4. Verify Global navigation menu
        const homePage = new HomePage(page);
        await expect(homePage.openNewAccountLink).toBeVisible();
        await expect(homePage.accountsOverviewLink).toBeVisible();
        await expect(homePage.transferFundsLink).toBeVisible();
        await expect(homePage.billPayLink).toBeVisible();

        // 5. Create a Savings account
        await homePage.goToOpenNewAccount();
        const openNewAccountPage = new OpenNewAccountPage(page);
        await expect(openNewAccountPage.openNewAccountButton).toBeVisible();
        const savingsAccountNumber = await openNewAccountPage.createSavingsAccount();

        // 6. Validate Accounts overview page
        await homePage.goToAccountsOverview();
        const accountsOverviewPage = new AccountsOverviewPage(page);
        // const last_row = page.locator("table#myTable tr").last;
        // console.log(`first_cell_in_last_row_value: ${last_row}`);
        // await accountsOverviewPage.validateAccountBalance(savingsAccountNumber, '$100.00');

        // 7. Transfer funds
        await homePage.goToTransferFunds();
        const transferFundsPage = new TransferFundsPage(page);
        await transferFundsPage.transferFunds(savingsAccountNumber, transactionDetails.savingsAmount);
        await expect(page.getByText('Transfer Complete!')).toBeVisible();

        // 8. Pay the bill
        await homePage.goToBillPay();
        const billPayPage = new BillPayPage(page);
        await billPayPage.payBillWithAccount(savingsAccountNumber, transactionDetails.billAmount);
        await expect(page.getByText('Bill Payment Complete')).toBeVisible();

        // Call the utility function to save the data
        const sharedData = {
            accountId: savingsAccountNumber,
            billAmount: transactionDetails.billAmount
        };
        writeSharedData(sharedData);

        // logout user
        await expect(homePage.logoutLink).toBeVisible();
        await homePage.logoutUser();
    });

});