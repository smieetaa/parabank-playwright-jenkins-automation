import { Page, expect } from '@playwright/test';

export class AccountsOverviewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateAccountBalance(accountNumber: string, expectedBalance: string): Promise<void> {
        await this.page.waitForSelector(`text=${accountNumber}`);
        const allRows = this.page.locator('tr');
        const accountRow = allRows.filter({ has: this.page.getByText(accountNumber) });
        await expect(accountRow).toBeVisible();
        await expect(accountRow.getByText(expectedBalance)).toHaveCount(2);
    }
}