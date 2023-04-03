// visual-comparison.spec.ts
import { test, expect } from '@playwright/test';

const pageURL = "https://playwright.dev/";

test('example test', async ({ page }) => {
  await page.goto(pageURL);
  await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
  //Screenshot of the visible section of the page
  await page.screenshot({ path: 'screenshot.png' });
  //Full page screenshots
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  //Element screenshot
  await page.locator('.header').screenshot({ path: 'screenshot.png' });
  
});