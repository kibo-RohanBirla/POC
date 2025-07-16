import { Page, expect } from '@playwright/test';

export class StorefrontPage {
  constructor(private page: Page) {}

  async goto(productCode: string) {
    await this.page.goto(`https://t50003-s50003.sb.gdev09.gcp.kibocommerce.com/${productCode}/p/${productCode}`);
  }

  async verifyProductTitle(title: string) {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
  }

  async verifyProductPrice(price: string) {
    await expect(this.page.getByText(price)).toBeVisible();
  }

  async verifyAddToCartButton() {
    await expect(this.page.getByRole('button', { name: 'Add To Cart' })).toBeVisible();
  }

  async verifyProductWeight() {
    await expect(this.page.getByText('Measurements Weight 1 lbs')).toBeVisible();
  }

  async verifyProductDetails(title: string, price: string) {
    await this.verifyProductTitle(title);
    await this.verifyProductPrice(price);
    await this.verifyAddToCartButton();
    await this.verifyProductWeight();
  }
}
