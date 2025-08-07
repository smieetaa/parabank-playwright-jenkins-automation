import { Locator, Page, selectors } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeText: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginUsernameInput = page.locator('[name=username]');
    this.loginPasswordInput = page.locator('[name=password]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.welcomeText = page.getByText('Welcome');
    this.loginErrorMessage = page.getByText('The username and password could not be verified.');
  }

  async goToLoginPage() {
    await this.page.goto('/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}