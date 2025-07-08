import { Page, expect } from '@playwright/test';

export class ReturnRulePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoReturnRules() {
    await this.page.goto('await page.goto('https://www.gdev09.gcp.kibocommerce.com/login?returnUrl=%2flogin%2fto%3fscopetype%3dTenant%26scopeid%3d17838%26postbackurl%3dhttps%253a%252f%252ft17838.sb.gdev09.gcp.kibocommerce.com%253a443%252f_rulesengine%252f_authPostBack%26redirecturl%3d%252f_rulesengine%252freturnRules&_kcb=1.2511.0.0');');
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
