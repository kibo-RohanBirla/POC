import { Page } from '@playwright/test';

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

  async selectShippingMethod() {
    await this.page.locator('.order-shipping-method').nth(1).click();
    await this.page.getByRole('link', { name: 'Flat Rate-$15$' }).click();
  }

   async saveOrder() {
    await this.page.getByText('Save').nth(2).click();
  }
  async submitOrder() {
   
    await this.page.getByText('Submit Order').click();
  }
}
