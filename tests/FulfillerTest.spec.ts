import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://t17862.sb.gdev06.gcp.kibocommerce.com/_fulfiller/home');
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#Password').fill('Kibo1!');
  await page.getByRole('button', { name: 'Log in' }).click();
 await page.locator('.fulfiller-link-text').nth(1).click();
  await page.locator('p-multiselect span').nth(1).click();
  await page.locator('.ui-chkbox-icon').first().click();
  await page.getByRole('listitem', { name: '- Vanoss MC' }).locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Filter' }).click();
  await page.locator('p-dropdown').filter({ hasText: 'Select Shipment Type' }).locator('span').click();
  await page.getByRole('option', { name: 'Ship to Home' }).click();
   await page.waitForTimeout(5000);
  await page.locator('p-dropdown').filter({ hasText: 'Select Shipment Step' }).locator('span').click();
 
  await page.getByRole('option', { name: 'Accept Shipment' }).click();
  await page.getByRole('button', { name: 'Filter' }).click();
  await page.getByRole('button', { name: 'Filter' }).click();
});