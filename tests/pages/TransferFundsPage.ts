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

    // constructor(page: Page) {
    //     this.page = page;
    //     selectors.setTestIdAttribute('id');
    //     this.amountInput = page.getByTestId('amount');
    //     this.fromAccountDropdown = page.getByTestId('fromAccountId');
    //     this.toAccountDropdown = page.getByTestId('toAccountId');
    //     this.transferButton = page.getByRole('button', { name: 'Transfer' });
    // }

    async transferFunds(fromAccountNumber: string, amount: string): Promise<void> {
        await this.page.waitForSelector('#fromAccountId');
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ label: fromAccountNumber });

        // Select the first available account to transfer to
        const toAccountOptions = await this.toAccountDropdown.locator('option:not([value=""])');
        await expect(toAccountOptions.count()).toBeGreaterThan(0);
        const toAccountValue = await toAccountOptions.first().getAttribute('value');
        await this.toAccountDropdown.selectOption(toAccountValue!);

        await this.transferButton.click();
    }
}