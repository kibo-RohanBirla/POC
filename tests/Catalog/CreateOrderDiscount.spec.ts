import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/AdminLoginPage';
import { DiscountEditPage } from '../../pages/main/catalog/discounts/discountEditPage';
import { DiscountVerification } from '../../pages/main/catalog/discounts/discountVerification';

test('Create Order Discount', {tag:'@catalog'}, async ({ page }) => {
  // Initialize page objects
  const adminLoginPage = new AdminLoginPage(page);
  const orderDiscountPage = new DiscountEditPage(page);
  const discountVerificationPage = new DiscountVerification(page);

  // Go to the tenant admin login page
  process.env.LOGIN_URL = 'https://t50003.sb.gdev09.gcp.kibocommerce.com/admin/';

  // Login
  await adminLoginPage.goto();
  await adminLoginPage.login();

  // Create order discount
  await orderDiscountPage.createOrderDiscount('Order discount', '5');

  // Verify discount was created successfully
  await discountVerificationPage.verifyDiscountCreated('Order discount');
});