import { Page } from '@playwright/test';

export class DiscountEditPage {
  constructor(private page: Page) {}

  async navigateToDiscounts() {
    await this.page.locator('div').filter({ hasText: /^Marketing$/ }).click();
    await this.page.getByRole('link', { name: 'Discounts' }).click();
  }

  async clickCreateNewDiscount() {
    await this.page.getByRole('button', { name: 'Create New Discount' }).click();
  }

  async fillDiscountName(name: string) {
    await this.page.getByRole('textbox', { name: 'Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Name*' }).fill(name);
  }

  async selectOrderDiscountType(type: string = 'Order') {
    await this.page.locator('.mozu-c-dropdown__display').first().click();
    await this.page.getByText(type, { exact: true }).click();
  }

  async selectProductDiscountTarget(target: string = 'Product') {
    await this.page.locator('div:nth-child(6) > .mozu-c-dropdown > .mozu-c-flyout > .mozu-c-flyout__body > .mozu-c-field__container > .mozu-c-field > .mozu-c-dropdown__display-wrapper > .mozu-c-dropdown__display').click();
    await this.page.getByText(target, { exact: true }).click();
  }

  async selectAmountDiscountMethod(method: string = 'Amount') {
    await this.page.getByText(method, { exact: true }).click();
    await this.page.locator('a').filter({ hasText: method }).click();
  }

  async fillDiscountAmount(amount: string) {
    await this.page.getByRole('textbox', { name: 'Amount Off*' }).click();
    await this.page.getByRole('textbox', { name: 'Amount Off*' }).fill(amount);
  }

  async saveDiscount() {
    await this.page.getByRole('button', { name: 'Save  ' }).click();
  }

  async createOrderDiscount(name: string, amount: string, type: string = 'Order', target: string = 'Product', method: string = 'Amount') {
    await this.navigateToDiscounts();
    await this.clickCreateNewDiscount();
    await this.fillDiscountName(name);
    await this.selectOrderDiscountType(type);
    await this.selectProductDiscountTarget(target);
    await this.selectAmountDiscountMethod(method);
    await this.fillDiscountAmount(amount);
    await this.saveDiscount();
  }
}