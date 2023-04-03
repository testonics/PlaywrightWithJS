// visual-comparison.spec.ts
import { test, expect } from '@playwright/test';

const pageURL = "https://playwright.dev/";

test('example test', async ({ page }) => {
  await page.goto(pageURL);
  await expect(page).toHaveScreenshot("homepage.png");
});