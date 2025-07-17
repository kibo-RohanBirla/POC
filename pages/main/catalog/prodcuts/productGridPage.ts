import { Page } from '@playwright/test';

export class ProductGridPage {
  constructor(private page: Page) {}

  async navigateToProducts() {
    await this.page.locator('div').filter({ hasText: /^Catalog$/ }).click();
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async clickCreateNewProduct() {
    await this.page.locator('#button-1070').click();
    }   
}