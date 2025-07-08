import { expect, test } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { OrderPage } from '../pages/OrderPage';

// Test using Page Object Model for login and order creation

test('Create new order using POM', async ({ page }) => {
  // Login
  const loginPage = new AdminLoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  
  // Order creation
  const orderPage = new OrderPage(page);
  await orderPage.createNewOrder();
  await orderPage.searchCustomer('1000');
  await orderPage.editOrderDetails();
  await orderPage.searchAndSelectProduct('sp_01');
  await orderPage.setQuantityAndAdd('2');
  await orderPage.selectShippingMethod();
  await orderPage.saveOrder();
  await orderPage.submitOrder();
await expect(async () => {
   await page.reload();
  await expect(page.locator('.taco-content-header-title-container .x-column-content-pill')).toHaveText('Accepted')
}).toPass();

});