---
title: "🔝JavaScript UI Test Automation Frameworks - latest updates in 2025 part 2"
image: /assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp
excerpt: "Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from 2025....
"
date: 2025-05-13 20:00:00 +01:00
last_modified_at: 2025-05-13 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Cypress
  - WebdriverIO
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp){: .align-center .border .max-width-600px}

*Today I have prepared an equally interesting article. Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from early 2025.*

## Cypress

## 14.0.1 | 14.3.3

**Breaking Changes:**

- Firefox versions 135 and above are now automated with WebDriver BiDi instead of Chrome Devtools Protocol.
- Cypress.stop() is now available to stop the Cypress App on the current machine while tests are running. This can be useful for stopping test execution upon failures or other predefined conditions.
- The UI above the application under test now displays in dark mode.
- The cy.press() command is now available. It supports dispatching native Tab keyboard events to the browser.
- Lots of bugfixes and performance optimizations

## Playwright

## Version 1.51 | 1.52

- New option indexedDB for browserContext.storageState() allows to save and restore IndexedDB contents. Useful when your application uses IndexedDB API to store authentication tokens, like Firebase Authentication.

Here is an example following the authentication guide:

```
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  // ... perform authentication steps ...

  // make sure to save indexedDB
  await page.context().storageState({ path: authFile, indexedDB: true });
});
```

- New "Copy prompt" button on errors in the HTML report, trace viewer and UI mode. Click to copy a pre-filled LLM prompt that contains the error message and useful context for fixing the error.
- New option visible for locator.filter() allows matching only visible elements.

```
test('some test', async ({ page }) => {
  // Ignore invisible todo items.
  const todoItems = page.getByTestId('todo-item').filter({ visible: true });
  // Check there are exactly 3 visible ones.
  await expect(todoItems).toHaveCount(3);
});
```
- Set option testConfig.captureGitInfo to capture git information into testConfig.metadata.
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  captureGitInfo: { commit: true, diff: true }
});
```
- New method expect(locator).toContainClass() to ergonomically assert individual class names on the element.
```
await expect(page.getByRole('listitem', { name: 'Ship v1.52' })).toContainClass('done');
```
- Aria Snapshots got two new properties: /children for strict matching and /url for links.
```
await expect(locator).toMatchAriaSnapshot(`
  - list
    - /children: equal
    - listitem: Feature A
    - listitem:
      - link "Feature B":
        - /url: "https://playwright.dev"
`);
```
- New property testProject.workers allows to specify the number of concurrent worker processes to use for a test project. The global limit of property testConfig.workers still applies.
- New testConfig.failOnFlakyTests option to fail the test run if any flaky tests are detected, similarly to --fail-on-flaky-tests. This is useful for CI/CD environments where you want to ensure that all tests are stable before deploying.
- New property testResult.annotations contains annotations for each test retry.

## Webdriver IO

## v9.6.1 | v9.13.0

- Use checkVisibility for display checks
- Accessibility Support for Browserstack app automate sessions
- Add deepLink command
- Add restartApp
- Distinguish Cucumber PENDING status in reporters
- Allow more options for screenshot taking with Bidi
- Support WebSocket options at the BiDi connection
- Add "options" parameter to "terminateApp" command
- Introduce defineConfig function to create a typed configuration object
- Change gridProxyDetails request from GET to POST method
- Lots of bugfixes and performance optimizations

These are the latest updates we received in 2025. We continue to follow the development and updates of the most popular tools in the world of JavaScript testing

***Thanks to everyone who read this article, I hope you found it useful.***
