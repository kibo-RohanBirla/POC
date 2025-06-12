import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../e2e/pages/AdminLoginPage';
import { ReturnRulePage } from '../e2e/pages/ReturnRulePage';

test('should create a return rule and show success alert', async ({ page }) => {
  const adminLogin = new AdminLoginPage(page);
  const returnRulePage = new ReturnRulePage(page);

  await adminLogin.goto();
  await adminLogin.login();

  await returnRulePage.createReturnRule({
    name: 'SampleTest_111',
    description: 'RUle created from playwright test',
    productRule: 'Product1 (40)',
    customerRule: 'Cust (53)'
  });
  await returnRulePage.setMaxReturnableQuantity('2');
  await returnRulePage.setReturnWindowDays('10');
  await returnRulePage.saveRule();
  await returnRulePage.expectSuccessAlert();
});