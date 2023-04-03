// visual-comparison.spec.ts
import { test, expect } from '@playwright/test';

const pageURL = "https://playwright.dev/";

// test.use({ 
//   viewport: { width: 1600, height: 1200 },
//   locale: 'de-DE',
//   timezoneId: 'Europe/Berlin',
//   geolocation: { longitude: 41.890221, latitude: 12.492348 },
//   permissions: ['geolocation'],
//   colorScheme: 'dark' // or 'light'
// });

test('Emulate iphone 13', async ({ page }) => {
  await page.goto(pageURL);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Playwright");
});