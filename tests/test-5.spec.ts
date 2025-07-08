import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://t29594-s48733.stg1.mozu.com/');
 
  await page.getByRole('button', { name: 'Acct Login' }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('rohan');
  await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('birla');
  await page.getByRole('group', { name: 'You will have the opportunity' }).getByLabel('Email Address').click();
  await page.getByRole('group', { name: 'You will have the opportunity' }).getByLabel('Email Address').fill('rohan.1@email.com');
  await page.getByRole('group', { name: 'You will have the opportunity' }).getByLabel('Password', { exact: true }).click();
  await page.getByRole('group', { name: 'You will have the opportunity' }).getByLabel('Password', { exact: true }).fill('test12');
  await page.getByRole('textbox', { name: 'Re-enter Password' }).click();
  await page.getByRole('textbox', { name: 'Re-enter Password' }).fill('test12');
  await page.getByRole('button', { name: 'Create Account' }).click();

});