import {test,Page, expect } from '@playwright/test';
import { AdminLoginPage } from '../e2e/pages/AdminLoginPage';
import { OrderPage } from '../e2e/pages/OrderPage';

test.beforeEach(async ({ page }) => {
  page.setDefaultTimeout(60000); // 60 seconds for actions
});

test('test', async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  const orderPage = new OrderPage(page);

  await loginPage.goto();
  await loginPage.login();
  await orderPage.navigateToOrders();
  await page.waitForTimeout(2000); // Wait for the page to load
  await orderPage.createNewOrder();
  await orderPage.searchCustomer('1000');
  await orderPage.editOrderDetails();
  await orderPage.searchAndSelectProduct('sp_01');
  await orderPage.setQuantityAndAdd('2');
  await orderPage.selectShippingMethod();
  await orderPage.submitOrder();
});