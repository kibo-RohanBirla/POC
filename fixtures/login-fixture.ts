import { test as base } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLoginPage';

export const test = base.extend<{ loginPage: AdminLoginPage }>({
  // This fixture will run automatically before each test
  loginPage: async ({ page }, use) => {
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.goto();
    await adminLogin.login();
    await use(adminLogin);
  },
  /* page: async ({ page }, use) => {
    await use(page);
  }, */
});
