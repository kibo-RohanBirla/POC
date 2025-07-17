import { Page, expect } from '@playwright/test';

export class OrderPaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoOrder(orderNumber: string) {
    await this.page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/admin/m-1/orders');
    await this.page.getByText(orderNumber).click();
  }

  async clickPaymentsTab() {
    await this.page.getByText('Payments').click();
  }

  async clickAddPaymentButton() {
    await this.page.locator('//span[contains(text(),"Add Payment")]/../..').click();
    //await this.page.getByText('Add Payment').click();
  }

  async selectNewCreditCard() {
    await this.page.getByLabel('New Credit Card').click();
  }

  async fillNameOnCard(name: string) {
    await this.page.getByRole('textbox', { name: 'Name on Card *' }).fill(name);
  }

  async selectCardType(type: string) {
    await this.page.getByRole('combobox', { name: 'Card Type *' }).click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async fillCardNumber(number: string) {
    await this.page.getByRole('textbox', { name: 'Card Number *' }).fill(number);
  }

  async fillExpMonth(month: string) {
    await this.page.getByRole('spinbutton', { name: 'Exp Month *' }).fill(month);
  }

  async fillExpYear(year: string) {
    await this.page.getByRole('spinbutton', { name: 'Exp Year *' }).fill(year);
  }

  async fillCVV(cvv: string) {
    await this.page.getByRole('textbox', { name: 'CVV *' }).fill(cvv);
  }

  async clickSaveButton() {
    // wait for the Save button to be visible and clickable
    await this.page.waitForTimeout(1000);
    await this.page.locator('//span[text()="Save"]').nth(1).click();
  }

  async verifyRollUpPaymentStatus(status: string) {
    await expect(this.page.locator('//span[contains(@id, "taco-orderpayment")]/span')).toContainText(status);
  }

  async verifyPaymentStatus(status) {
    await expect(this.page.locator('div.statusField span span')).toContainText(status);
  }
}
