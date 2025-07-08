import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.gdev09.gcp.kibocommerce.com/login?returnUrl=%2flogin%2fto%3fscopetype%3dTenant%26scopeid%3d50008%26redirecturl%3d%252fadmin%252f%26showdev%3dFalse');
  await page.locator('#Email').click();
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#Password').fill('Kibo1!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://t50008.sb.gdev09.gcp.kibocommerce.com/admin/');
  await page.locator('div').filter({ hasText: /^Orders$/ }).click();
  await page.getByRole('link', { name: 'Returns' }).click();
  await page.getByRole('textbox', { name: 'Search', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search', exact: true }).fill('1904');
  await page.getByRole('textbox', { name: 'Search', exact: true }).press('Enter');
  await page.getByRole('cell', { name: '1904' }).click();
  await page.getByRole('button', { name: 'Issue Refund' }).click();
  await page.getByRole('button', { name: 'Confirm Refund' }).click();
  await page.getByRole('row', { name: 'standard_product_01 Code:' }).locator('label').click();
  await expect(page.getByRole('textbox', { name: 'Refund amount for selected' })).toHaveValue('$410.00');
  await page.locator('#text-field-9').click();
  await page.locator('#text-field-9').fill('410');
  await page.getByRole('button', { name: 'Issue Refund  ' }).click();
  await expect(page.locator('#application-mount')).toContainText('Refunded');
  await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/admin/s-22123/returns/edit/194a0da535f1ff0001e0a2f4000045ae');
});