import { test, expect } from '@playwright/test';

test('Google Search for Playwright', async ({ page }) => {
  // 1. Navigate to Google
  await page.goto('https://www.google.com');

  // 2. Fill the search input with 'Playwright'
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright');

  // 3. Press Enter to search
  await page.keyboard.press('Enter');

  // 4. Assert that results page contains 'Playwright'
  await expect(page).toHaveURL(/search\?.*q=Playwright/);
  await expect(page.locator('body')).toContainText('Playwright');
});
