import { Page } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly env: any;

constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    const url = process.env.LOGIN_URL;
    if (!url) {
      throw new Error('Environment variable URL is not defined');
    }
    await this.page.goto(url);
  }

  async login() {
    await this.page.locator('#Email').click();
    await this.page.locator('#Email').fill(process.env.ADMIN_EMAIL || '');
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.locator('#Password').fill(process.env.ADMIN_PASSWORD || '');
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
