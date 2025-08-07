import { Page, expect } from '@playwright/test';

export class AccountsOverviewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateAccountBalance(accountNumber: string, expectedBalance: string): Promise<void> {
        await this.page.waitForSelector(`text=${accountNumber}`);
        const accountRow = this.page.getByRole('row').filter({ has: this.page.getByText(accountNumber) });
        await expect(accountRow).toBeVisible();
        await expect(accountRow.getByText(expectedBalance)).toBeVisible();
        console.log(`Account ${accountNumber} balance validated successfully.`);
    }
}