---
title: "🔝JavaScript UI Test Automation Frameworks - latest updates in 2025 part 3"
image: /assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp
excerpt: "Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from 2025....
"
date: 2025-08-01 12:00:00 +01:00
last_modified_at: 2025-08-01 12:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Cypress
  - WebdriverIO
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp){: .align-center .border .max-width-600px}

*Today I have prepared an equally interesting article. Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from 2025.*

## Cypress

## 14.4.0 | 14.5.3

**Breaking Changes:**

- @cypress/webpack-dev-server and @cypress/webpack-batteries-included-preprocessor now ship with webpack-bundle-analyzer as a diagnostic tool to determine bundle statistics, which can be enabled via DEBUG=cypress-verbose:webpack-dev-server:bundle-analyzer (component tests using webpack) or DEBUG=cypress-verbose:webpack-batteries-included-preprocessor:bundle-analyzer (e2e tests using webpack, which is the default preprocessor), respectively.

- Install Cypress win32-x64 binary on Windows win32-arm64 systems. Cypress runs in emulation.

**Bugfixes:**

- Fixed an issue where cy.session() may fail internally if navigating to about:blank takes longer than the defaultCommandTimeout.

- Fixed missing support for setting an absolute path for component.indexHtmlFile in @cypress/webpack-dev-server.

- Fixed an issue where TypeScript ESM projects using .js and .mjs extensions were not resolving correctly within @cypress/webpack-batteries-included-preprocessor.

- Fixed an issue in @cypress/angular where component instance fields were not reference safe and were being overwritten.

## Playwright

## Version 1.53 | 1.54

- Trace Viewer and HTML Reporter Updates
  - New Steps in Trace Viewer and HTML reporter:

![_config.yml]({{ site.url }}/assets/images/posts/2025-08-01-javascript-ui-test-automation-frameworks-latest-updates-3/image.png){: .align-center .border .max-width-600px}

- New option in 'html' reporter to set the title of a specific test run:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { title: 'Custom test run #1028' }]]
});
```

- New option kind in `testInfo.snapshotPath()` controls which snapshot path template is used.

- New method `locator.describe()` to describe a locator. Used for trace viewer and reports.

```js
const button = page.getByTestId('btn-sub').describe('Subscribe button');
await button.click();
```

- `npx playwright install --list` will now list all installed browsers, versions and locations.

- New cookie property `partitionKey` in `browserContext.cookies()` and `browserContext.addCookies()`. This property allows to save and restore partitioned cookies. See CHIPS MDN article for more information. Note that browsers have different support and defaults for cookie partitioning.

- New option noSnippets to disable code snippets in the html report.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { noSnippets: true }]]
});
```

- New property `location` in test annotations, for example in t`estResult.annotations` and `testInfo.annotations`. It shows where the annotation like `test.skip` or `test.fixme` was added.


## Webdriver IO

## v9.14.0 | v9.18.4

- wdio-protocols, webdriver, webdriverio (WebDriver Bidi Protocol update)

- wdio-config, wdio-runner, wdio-types (automatically include SoftAssertionService)

- lots of bug fixes


These are the latest updates we received in 2025. We continue to follow the development and updates of the most popular tools in the world of JavaScript testing

***Thanks to everyone who read this article, I hope you found it useful.***
