import { Page, expect } from '@playwright/test';

//checks the discounts after save - data persists

export class DiscountVerification {
  constructor(private page: Page) {}

  async verifyDiscountName(name: string) {
    await expect(this.page.getByRole('heading', { name: name })).toBeVisible();
  }

  async verifyDiscountCreated(name: string) {
    await this.verifyDiscountName(name);
  }

  async verifyDiscountInList(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async verifyDiscountStatus(status: string = 'Active') {
    await expect(this.page.getByText(status)).toBeVisible();
  }

  async verifyDiscountDetails(name: string, amount: string, type: string = 'Order') {
    await this.verifyDiscountName(name);
    await expect(this.page.getByText(amount)).toBeVisible();
    await expect(this.page.getByText(type)).toBeVisible();
  }
}