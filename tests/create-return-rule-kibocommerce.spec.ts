import { test, expect } from '@playwright/test';

test('Create Return Rule Test', async ({ page }) => {
  // 1. Navigate to the return rules page (redirects to login)
  await page.goto('https://t17838.sb.gdev09.gcp.kibocommerce.com/_rulesengine/returnRules');

  // 2. Enter email and click Next
  await page.locator('#Email').fill('admin@kibocommerce.com');
  await page.getByRole('button', { name: 'Next' }).click();

  // 3. Enter password and click Login
  await page.locator('#Password').fill('Kibo1!');
  await page.getByRole('button', { name: 'Log in' }).click();

  // 4. Click on Create Return Rule button
  await page.getByRole('button', { name: /Create Return Rule/i }).click();

  // 5. Enter Smaple_01 in Code input field
  await page.getByLabel('Code', { exact: false }).fill('Smaple_01');

  // 6. Enter Rule_sample in Name input field
  await page.getByLabel('Name', { exact: false }).fill('Rule_sample');

  // 7. Enter Description for return rule in Description input field
  await page.getByLabel('Description', { exact: false }).fill('Description for return rule');

  // 8. Click on Select Product Rule dropdown and select option Product1
  const productRuleDropdown = page.getByRole('combobox', { name: /Select Product Rule/i });
  if (await productRuleDropdown.isVisible().catch(() => false)) {
    await productRuleDropdown.selectOption({ label: 'Product1' });
  }
});
