import { test, expect } from '@playwright/test';

test('Create New Order Test', async ({ page }) => {
  // 1. Navigate to the KiboCommerce admin login page
  await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/admin');

  // 2. Fill the email input with 'admin@kibocommerce.com'
  await page.locator('#Email').fill('admin@kibocommerce.com');

  // 3. Click the Next button
  await page.getByRole('button', { name: 'Next' }).click();

  // 4. Fill the password input with 'Kibo1!'
  await page.locator('#Password').fill('Kibo1!');

  // 5. Click the Login button
  await page.getByRole('button', { name: 'Log in' }).click();

  
  // 7. Click on navigation link with text Orders
  await page.locator('a').filter({ hasText: /^Orders$/ }).click();
  await page.getByRole('link', { name: 'Orders' }).click();

  // 8. Click on Create New Order
  //await page.getByRole('button', { name: 'Create New Order' }).click();
   
  await page.getByText('Create New Order').click();

  await page.getByRole('link', { name: 'AutomationEcommPlusOms' }).click();

  await page.getByPlaceholder('Customer Search').click();
  await page.keyboard.type('1000');
 // await page.keyboard.down('Enter');
 // await page.waitForTimeout(20000);
  await page.getByText('TestAuto, TestAuto').click();
  // 10. Enter 1000 in the field with placeholder customer search
  await page.getByText('Edit Details').click();

  }
);
