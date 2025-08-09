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

    test('should allow new user registration', { tag: ['@smoke']}, async ({ page }) => {
        // 1. Navigate to Para bank application
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goToRegistrationPage();
        console.log('1. Launched ParaBank application');

        // 2. Create a new user
        await registrationPage.registerUser();
        console.log(`2. User created: ${userDetails.username}`);

        // Assertion: Verify successful registration and login
        await expect(registrationPage.successfulSignupText).toBeVisible();
        console.log('-> Verified successful signup message');

        const homePage = new HomePage(page);
        await expect(homePage.welcomeMessage(userDetails.username)).toBeVisible();
        console.log('-> verified welcome message with username');

        // logout registered user to perform login in subsequent test
        await expect(homePage.logoutLink).toBeVisible();
        await homePage.logoutUser();
        console.log('-> logged out registered user to perform login in subsequent test');
    });


    test('should allow newly created user to login and perform different operations', { tag: ['@smoke']}, async ({ page }) => {
        // 3. Login to the application 
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();

        // login with valid credentials
        await loginPage.login(userDetails.username, userDetails.password);
        await expect(loginPage.welcomeText).toBeVisible();
        console.log(`3. User: ${userDetails.username} logged in successfully`);

        // 4. Verify Global navigation menu
        const homePage = new HomePage(page);
        await expect(homePage.openNewAccountLink).toBeVisible();
        await expect(homePage.accountsOverviewLink).toBeVisible();
        await expect(homePage.transferFundsLink).toBeVisible();
        await expect(homePage.billPayLink).toBeVisible();
        console.log('4. Verified Global navigation menu');

        // 5. Create a Savings account
        await homePage.goToOpenNewAccount();
        const openNewAccountPage = new OpenNewAccountPage(page);
        await expect(openNewAccountPage.openNewAccountButton).toBeVisible();
        const savingsAccountNumber = await openNewAccountPage.createSavingsAccount();
        console.log(`5. New Savings Account created. Account number: ${savingsAccountNumber}`);

        // 6. Validate Accounts overview page
        await homePage.goToAccountsOverview();
        const accountsOverviewPage = new AccountsOverviewPage(page);
        console.log(`savingsAccountNumber: ${savingsAccountNumber}`);
        await accountsOverviewPage.validateAccountBalance(savingsAccountNumber, '$100.00');
        console.log('6. Accounts overview page validated for account balance');

        // 7. Transfer funds
        await homePage.goToTransferFunds();
        const transferFundsPage = new TransferFundsPage(page);
        await transferFundsPage.transferFunds(savingsAccountNumber, transactionDetails.savingsAmount);
        await expect(page.getByText('Transfer Complete!')).toBeVisible();
        console.log('7. Funds transferred successfully');

        // 8. Pay the bill
        await homePage.goToBillPay();
        const billPayPage = new BillPayPage(page);
        await billPayPage.payBillWithAccount(savingsAccountNumber, transactionDetails.billAmount);
        await expect(page.getByText('Bill Payment Complete')).toBeVisible();
        console.log('8. Bill payment successful');

        // Call the utility function to save the data
        const sharedData = {
            accountId: savingsAccountNumber,
            billAmount: transactionDetails.billAmount
        };
        writeSharedData(sharedData);
        console.log('-> Write data to shared file for API test');

        // logout user
        await expect(homePage.logoutLink).toBeVisible();
        await homePage.logoutUser();
        console.log('-> logged out user');
    });

});