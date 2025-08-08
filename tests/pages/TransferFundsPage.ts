import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
    readonly page: Page;
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly toAccountDropdown: Locator;
    readonly transferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
    }

    async transferFunds(fromAccountNumber: string, amount: string): Promise<void> {
        await this.page.waitForSelector('#fromAccountId');
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ label: fromAccountNumber });

        // Select the first available account to transfer to
        const toAccountOptionsCount = await this.toAccountDropdown.locator('option').count();
        await expect(toAccountOptionsCount).toBeGreaterThan(0);

        // select to account other than the from account 
        const allToAccountsOptions = await this.toAccountDropdown.locator('option').all();
        for (const option of allToAccountsOptions) {
            const value = await option.getAttribute('value');
            if (value !== fromAccountNumber) {
                await this.toAccountDropdown.selectOption(value);
                break;
            }
        }
        await this.transferButton.click();
    }
}