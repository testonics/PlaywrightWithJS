//accessibility.spec.ts
import { test, expect } from '@playwright/test';
//Imports the @axe-core/playwright package
import AxeBuilder from '@axe-core/playwright';

const pageURL = "https://playwright.dev/";
// const { test, expect } = require('../fixtures/fix-axe.ts');

//Using snapshots to allow specific known issues
function violationFingerprints(accessibilityScanResults) {
  const violationFingerprints = accessibilityScanResults.violations.map(violation => ({
      rule: violation.id,
      // These are CSS selectors which uniquely identify each element with
      // a violation of the rule in question.
      targets: violation.nodes.map(node => node.target),
  }));

  return JSON.stringify(violationFingerprints, null, 2);
}

test.describe('Accessibility Tests', () => { 
  test('Scan full page with attachment', async ({ page }, testInfo) => {
    await page.goto(pageURL);
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });
  
    expect(violationFingerprints(accessibilityScanResults)).toMatchSnapshot("Accessibility-Tests-Scan.txt");
    // expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Scan full page with specific WCAG violations', async ({ page }) => {
    await page.goto(pageURL);

    //Awaits AxeBuilder.analyze() to run the accessibility scan against the page with specific WCAG violations
    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Scan full page exculding individual elements from a scan', async ({ page }) => {
    await page.goto(pageURL);

    const accessibilityScanResults = await new AxeBuilder({ page })
    .exclude('#element-with-known-issue')
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Scan full page disabling individual scan rules', async ({ page }) => {
    await page.goto(pageURL);

    const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(['duplicate-id'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });


  test('Scan a specific part of a page', async ({ page }) => {
    await page.goto(pageURL);

    //Awaits AxeBuilder.analyze() to run the accessibility scan against the page
    await page.getByRole('button', { name: 'Navigation Menu' }).click();

    // It is important to waitFor() the page to be in the desired
    // state *before* running analyze(). Otherwise, axe might not
    // find all the elements your test expects it to scan.
    await page.locator('#navigation-menu-flyout').waitFor();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#navigation-menu-flyout')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // test('example using custom fixture', async ({ page, makeAxeBuilder }) => {
  //   await page.goto(pageURL);

  //   const accessibilityScanResults = await makeAxeBuilder()
  //     // Automatically uses the shared AxeBuilder configuration,
  //     // but supports additional test-specific configuration too
  //     .include('#specific-element-under-test')
  //     .analyze();

  //   expect(accessibilityScanResults.violations).toEqual([]);
  // });
});

