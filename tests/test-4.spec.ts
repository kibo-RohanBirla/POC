import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/_rulesengine/returnRules');
  // Recording...
  await page.locator('#Email').click();
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#Password').fill('Kibo1!');
  await page.locator('#Password').press('Enter');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/_rulesengine/returnRules');
  await page.getByRole('button', { name: 'Create Return Rule' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('Test1001');
  await page.getByRole('textbox', { name: 'Name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Description' }).fill('Rule from auto test');
  await page.getByRole('treeitem', { name: 'dropdown trigger Create New Product Rule' }).locator('p-dropdown div').first().click();
  await page.locator('.p-dropdown-filter').click();
  await page.locator('.p-dropdown-filter').fill('Product1');
  await page.getByText('Product1 (40)').click();
await page.getByRole('treeitem', { name: 'dropdown trigger Create New' }).getByLabel('dropdown trigger').click();
await page.locator('.p-dropdown-filter').click();
await page.locator('.p-dropdown-filter').fill('Cust');
await page.getByText('Cust (53)').click();
  await page.getByRole('treeitem', { name: 'Item is returnable' }).locator('div').nth(4).click();
  await page.getByRole('listitem').filter({ hasText: 'Max Returnable Quantity' }).locator('#integeronly').click();
  await page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').click();
  await page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toContainText('Return Rule created successfully');
});