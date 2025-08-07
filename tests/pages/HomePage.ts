import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly welcomeMessage: (username: string) => Locator;
    readonly openNewAccountLink: Locator;
    readonly accountsOverviewLink: Locator;
    readonly transferFundsLink: Locator;
    readonly billPayLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = (username: string) => page.getByText(`Welcome ${username}`);
        this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    }

    async goToOpenNewAccount(): Promise<void> {
        await this.openNewAccountLink.click();
    }

    async goToAccountsOverview(): Promise<void> {
        await this.accountsOverviewLink.click();
    }

    async goToTransferFunds(): Promise<void> {
        await this.transferFundsLink.click();
    }

    async goToBillPay(): Promise<void> {
        await this.billPayLink.click();
    }
}