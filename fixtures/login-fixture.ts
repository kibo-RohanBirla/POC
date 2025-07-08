import { test as base } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLoginPage';

export const test = base.extend<{}>({
  // This fixture will run automatically before each test
  page: async ({ page }, use) => {
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.goto();
    await adminLogin.login();
    await use(page);
  },
});
