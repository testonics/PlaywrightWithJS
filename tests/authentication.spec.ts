// visual-comparison.spec.ts
import { test, expect } from '@playwright/test';

const pageURL = "https://github.com";

test('authentication test 1', async ({ page }) => {
  page.goto(pageURL);
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible({ timeout: 20000 });
  console.log("Page is authenticated")
});


test('authentication test 2', async ({ page }) => {
  page.goto(pageURL);
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible({ timeout: 20000 });
  console.log("Page is authenticated")
});