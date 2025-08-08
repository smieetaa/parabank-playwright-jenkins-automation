import { Page, Locator } from '@playwright/test';
import { payeeDetails } from '../fixtures/payeeDetails';

export class BillPayPage {
    readonly page: Page;
    readonly payeeNameInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly accountNumberInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly sendPaymentButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.streetInput = page.locator('input[name="payee.address.street"]');
        this.cityInput = page.locator('input[name="payee.address.city"]');
        this.stateInput = page.locator('input[name="payee.address.state"]');
        this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
        this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
        this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountDropdown = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    }

    async payBillWithAccount(fromAccountNumber: string, amount: string): Promise<void> {
        await this.payeeNameInput.fill(payeeDetails.name);
        await this.streetInput.fill(payeeDetails.street);
        await this.cityInput.fill(payeeDetails.city);
        await this.stateInput.fill(payeeDetails.state);
        await this.zipCodeInput.fill(payeeDetails.zipCode);
        await this.phoneNumberInput.fill(payeeDetails.phoneNumber);
        await this.accountNumberInput.fill(payeeDetails.accountNumber);
        await this.verifyAccountInput.fill(payeeDetails.accountNumber);
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ label: fromAccountNumber });
        await this.sendPaymentButton.click();
    }
}