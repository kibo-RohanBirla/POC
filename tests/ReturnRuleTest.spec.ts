import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/_rulesengine/returnRules');
  await page.locator('#Email').click();
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#Password').fill('Kibo1!');
  await page.locator('#Password').press('Enter');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('app-global-actions').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('a').filter({ hasText: 'AutomationEcommPlusOms' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('RulePlaywright');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Rule created from playwright');
  await page.getByRole('treeitem', { name: 'dropdown trigger Create New Product Rule' }).locator('p-dropdown div').first().click();
  await page.getByRole('option', { name: 'Rolex Variant' }).click();
  await page.getByRole('treeitem', { name: 'dropdown trigger Create New' }).getByLabel('dropdown trigger').click();
  await page.locator('li').filter({ hasText: 'Gold Customer segment (56)' }).click();
  await page.getByRole('treeitem', { name: 'Item is returnable' }).locator('div').nth(4).click();
  await page.getByRole('listitem').filter({ hasText: 'Max Returnable Quantity' }).locator('#integeronly').click();
  await page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').click();
  await page.getByRole('treeitem', { name: 'days' }).locator('#integeronly').click();
  await page.getByRole('button', { name: 'Save' }).click();
});