import { Page, Locator } from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly accountTypeDropdown: Locator;
    readonly openNewAccountButton: Locator;
    readonly newAccountId: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountTypeDropdown = page.locator('#type');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.newAccountId = page.locator('#newAccountId');
    }

    async createSavingsAccount(): Promise<string> {
        await this.accountTypeDropdown.selectOption('1');
        await this.openNewAccountButton.click();
        await this.page.waitForURL(/account.htm\?accountId=/);
        const newAccountIdText = await this.newAccountId.textContent();
        if (newAccountIdText) {
            return newAccountIdText;
        }
        throw new Error('New account ID not found after creation.');
    }
}