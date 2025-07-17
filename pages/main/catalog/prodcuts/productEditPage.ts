import { Page } from '@playwright/test';

export class ProductEditPage {
  constructor(private page: Page) {}

  async navigateToProducts() {
    await this.page.locator('div').filter({ hasText: /^Catalog$/ }).click();
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async fillProductTitle(title: string) {
    await this.page.getByRole('textbox', { name: 'Product Title *' }).click();
    await this.page.getByRole('textbox', { name: 'Product Title *' }).fill(title);
  }

  async fillProductCode(code: string) {
    await this.page.getByRole('textbox', { name: 'Product Code *' }).click();
    await this.page.getByRole('textbox', { name: 'Product Code *' }).fill(code);
  }

  async selectProductType(type: string = 'All types') {
    await this.page.getByRole('combobox', { name: 'Product Type *' }).click();
    await this.page.locator('td.x-trigger-cell > div.x-form-trigger.x-form-arrow-trigger').nth(1).click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async selectProductUsage(usage: string = 'Standard Product') {
    await this.page.getByRole('combobox', { name: 'Product Usage *' }).click();
    await this.page.getByRole('option', { name: usage }).click();
  }

  async fillPrice(price: string) {
    await this.page.getByRole('spinbutton', { name: 'Price *' }).click();
    await this.page.getByRole('spinbutton', { name: 'Price *' }).fill(price);
  }

  async addProductToCatalog() {
    await this.page.locator('.x-component.inline-trigger').nth(1).click();
    await this.page.locator('input.x-form-checkbox.x-form-cb').nth(7).click();
    await this.page.locator('body').click();
    //wait 2 seconds for the UI to update
    await this.page.waitForTimeout(2000);
  }

  async saveProduct() {
    await this.page.getByText('Save').click();
  }

  async createProduct(title: string, code: string, price: string) {
    await this.fillProductTitle(title);
    await this.fillProductCode(code);
    await this.selectProductType();
    await this.selectProductUsage();
    await this.fillPrice(price);
    await this.addProductToCatalog();
    await this.saveProduct();
  }
}