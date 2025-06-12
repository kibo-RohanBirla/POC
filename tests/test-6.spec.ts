import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.gdev06.gcp.kibocommerce.com/login?returnUrl=%2flogin%2fto%3fscopetype%3dTenant%26scopeid%3d17862%26postbackurl%3dhttps%253a%252f%252ft17862.sb.gdev06.gcp.kibocommerce.com%253a443%252f_fulfiller%252f_authPostBack%26redirecturl%3d%252f_fulfiller&_kcb=1.2420.2.0');
  await page.locator('#Email').fill('a');
  await page.locator('#Email').click();
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#Password').fill('Kibo1!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('#Email').click();
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.goto('https://www.gdev06.gcp.kibocommerce.com/login/Home/Logout?Error=One%20or%20more%20errors%20occurred.%20(Connection%20refused)');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://t17862.sb.gdev06.gcp.kibocommerce.com/_fulfiller/home');
  await page.locator('.icons > span:nth-child(2)').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('2508');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await expect(page.locator('app-dashboard-snapshot')).toContainText('2508');
  await page.getByRole('button', { name: 'Finish Fulfilling Shipment' }).click();
  await page.getByRole('button', { name: 'Finish Fulfilling Shipment' }).click();
  await page.goto('https://t17862.sb.gdev06.gcp.kibocommerce.com/_fulfiller/dashboard/snapshot/quickSearch%3D2508&filter%3D&page%3D0&pageSize%3D10&sort%3D%2BauditInfo.createDate');
  await page.getByRole('button', { name: 'Finish Fulfilling Shipment' }).click();
  await page.getByRole('button', { name: '' }).locator('i').click();
});