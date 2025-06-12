import { Page, expect } from '@playwright/test';

export class ReturnRulePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoReturnRules() {
    await this.page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/_rulesengine/returnRules');
  }

  async createReturnRule({ name, description, productRule, customerRule }: { name: string, description: string, productRule: string, customerRule: string }) {
    await this.page.getByRole('button', { name: 'Create Return Rule' }).click();
    await this.page.getByRole('textbox', { name: 'Name *' }).click();
    await this.page.getByRole('textbox', { name: 'Name *' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Name *' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
    await this.page.getByRole('treeitem', { name: 'dropdown trigger Create New Product Rule' }).locator('p-dropdown div').first().click();
    await this.page.getByRole('option', { name: productRule }).click();
    await this.page.getByRole('treeitem', { name: 'dropdown trigger Create New' }).getByLabel('dropdown trigger').click();
    await this.page.getByRole('option', { name: customerRule, exact: true }).click();
    await this.page.getByRole('treeitem', { name: 'Item is returnable' }).locator('div').nth(4).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async setMaxReturnableQuantity(quantity: string) {
    await this.page.getByRole('listitem').filter({ hasText: 'Max Returnable Quantity' }).locator('#integeronly').fill(quantity);
  }

  async setReturnWindowDays(days: string) {
    await this.page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').click();
    await this.page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').fill(days);
  }

  async saveRule() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async expectSuccessAlert() {
    await this.page.getByRole('alert').click();
    await expect(this.page.getByRole('alert')).toContainText('Return Rule created successfully');
  }
}
