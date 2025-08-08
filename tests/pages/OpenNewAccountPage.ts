import { Page, Locator } from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly accountTypeDropdown: Locator;
    readonly amountDropdown: Locator;
    readonly openNewAccountButton: Locator;
    readonly newAccountId: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountTypeDropdown = page.locator('#type');
        this.amountDropdown = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.newAccountId = page.locator('a#newAccountId');
    }

    async createSavingsAccount(): Promise<string> {
        await this.accountTypeDropdown.selectOption('1');
        await this.amountDropdown.selectOption({ index: 0 });
        await this.openNewAccountButton.click();
        await this.page.waitForSelector('a#newAccountId');
        const newAccountIdText = await this.newAccountId.textContent();
        if (newAccountIdText) {
            return newAccountIdText;
        }
        throw new Error('New account ID not found after creation.');
    }
}