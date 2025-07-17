import { Page, expect } from '@playwright/test';

export class OrderPage {
 
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToOrders() {
    await this.page.locator('div').filter({ hasText: /^Orders$/ }).click();
    await this.page.getByRole('link', { name: 'Orders' }).click();
  }

  async createNewOrder() {
    await this.page.getByText('Create New Order').click();
    await this.page.getByRole('link', { name: 'AutomationEcommPlusOms' }).click();
  }

  async searchCustomer(customer: string) {
    await this.page.getByPlaceholder('Customer Search').click();
    await this.page.keyboard.type(customer);
    await this.page.getByText('TestAuto@gmail.com').click();
  }

  async editOrderDetails() {
    await this.page.getByText('Edit Details').click();
  }

  async searchAndSelectProduct(product: string) {
    await this.page.getByPlaceholder('Product Search (4 characters').click();
    await this.page.keyboard.type(product);
    await this.page.getByRole('option', { name: 'standard_product_01 sp_01' }).click();
    await this.page.getByRole('option', { name: /Direct Ship/ }).click();
  }

  async setQuantityAndAdd(qty: string) {
    await this.page.getByRole('spinbutton', { name: '*' }).click();
    await this.page.getByRole('spinbutton', { name: '*' }).fill(qty);
    await this.page.getByText('Add', { exact: true }).filter({ visible: true }).nth(1).click();
  }

  async selectShippingMethod(shippingMethod: string = 'Flat Rate-$15') {
    await this.page.locator('.order-shipping-method').nth(1).click();
    await this.page.getByRole('link', { name: shippingMethod }).click();
    await expect(this.page.locator('.order-shipping-method').nth(1)).toHaveText(shippingMethod);
  }

   async saveOrder() {
    await this.page.getByText('Save').nth(2).click();
  }
  async submitOrder() {
   await this.page.waitForTimeout(2000);
    await this.page.getByText('Submit Order').click();

  }

  async verifyOrderStatus(expectedStatus: string) {
    await expect(async () => {
    await this.page.reload();
    await expect(this.page.locator('.taco-content-header-title-container .x-column-content-pill')).toHaveText(expectedStatus)
  }).toPass({ timeout: 60_000,  intervals: [5_000, 10_000, 15_000, 20_000, 25_000, 30_000, 35_000, 40_000, 45_000, 50_000, 55_000] });
  }

  async getOrderNumber() {
    const orderNumber = (await this.page.getByText('#').textContent()).trim().replace(/^#/, '');
    return orderNumber;
  }


}
