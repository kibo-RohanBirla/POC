import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../e2e/pages/AdminLoginPage';
import { ReturnRulePage } from '../e2e/pages/ReturnRulePage';

test('should create a return rule and show success alert', async ({page}) => {
  const adminLogin = new AdminLoginPage(page);
  const returnRulePage = new ReturnRulePage(page);

  await adminLogin.goto();
  await adminLogin.login();

  await returnRulePage.createReturnRule({
    name: 'PlaywrightRule_01',
    description: 'This rule is created from playwright test',
    productRule: 'Rolex min quantity returnable',
    customerRule: 'Cust (53)'
  });
  await returnRulePage.expectSuccessAlert();
});

