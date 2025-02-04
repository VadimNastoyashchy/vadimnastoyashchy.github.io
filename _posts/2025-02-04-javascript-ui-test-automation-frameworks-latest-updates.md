---
title: "🔝JavaScript UI Test Automation Frameworks - latest updates in 2025"
image: /assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp
excerpt: "Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from early 2025....
"
date: 2025-02-04 20:00:00 +01:00
last_modified_at: 2025-02-04 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Cypress
  - WebdriverIO
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp){: .align-center .border .max-width-600px}

*Today I have prepared an equally interesting article. Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from early 2025.*

## Cypress

## 14.0.0 | 14.0.1

*Released 1/16/2025 | Released 1/28/2025*

Cypress v14.0.0 is pretty solid. It’ll give your component testing a nice boost and you’ll be all set for the new framework and dev server versions. It’s also got some breaking changes to cy.origin, which are needed to deal with Chrome’s deprecation of document.domain injection. This should fix some issues for some users in the latest Chrome versions. But keep in mind that support for older versions of Node.js, Linux distributions, browsers, and component testing frameworks and dev servers is being phased out.

**Breaking Changes:**

Refer to the [v14 Migration Guide](https://docs.cypress.io/app/references/migration-guide#Migrating-to-Cypress-140) for help migrating your code.

* Removed support for Node.js 16 and Node.js 21. Addresses [#29930](https://github.com/cypress-io/cypress/issues/29930).

* Cypress now only officially supports the latest 3 major versions of Chrome, Firefox, and Edge — older browser versions may still work, but we recommend keeping your browsers up to date to ensure compatibility with Cypress. A warning will no longer be displayed on browser selection in the Launchpad for any ‘unsupported’ browser versions. Additionally, the undocumented minSupportedVersion property has been removed from Cypress.browser. Addressed in [#30462](https://github.com/cypress-io/cypress/pull/30462).

* The cy.origin() command must now be used when navigating between subdomains. Because this is a fairly disruptive change for users who frequently navigate between subdomains, a new configuration option is being introduced. injectDocumentDomain can be set to true in order to re-enable the injection of document.domain setters in Cypress. This configuration option is marked as deprecated and you'll receive a warning when Cypress is launched with this option set to true. It will be removed in Cypress 15. Addressed in [#30770](https://github.com/cypress-io/cypress/pull/30770).

## Playwright

## Version 1.50 | 1.49

* New option [timeout](https://playwright.dev/docs/api/class-test#test-step-option-timeout) allows specifying a maximum run time for an individual test step. A timed-out step will fail the execution of the test.
```
    test('some test', async ({ page }) => {
      await test.step('a step', async () => {
        // This step can time out separately from the test
      }, { timeout: 1000 });
    });
```
* New method [test.step.skip()](https://playwright.dev/docs/api/class-test#test-step-skip) to disable the execution of a test step.
```
    test('some test', async ({ page }) => {
      await test.step('before running step', async () => {
        // Normal step
      });
    
      await test.step.skip('not yet ready', async () => {
        // This step is skipped
      });
    
      await test.step('after running step', async () => {
        // This step still runs even though the previous one was skipped
      });
    });​
```
* New assertion [expect(locator).toMatchAriaSnapshot()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-match-aria-snapshot) verifies page structure by comparing to an expected accessibility tree, represented as YAML.
```
    await page.goto('https://playwright.dev');
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - banner:
        - heading /Playwright enables reliable/ [level=1]
        - link "Get started"
        - link "Star microsoft/playwright on GitHub"
      - main:
        - img "Browsers (Chromium, Firefox, WebKit)"
        - heading "Any browser • Any platform • One API"
    `);
```
You can generate this assertion with [Test Generator](https://playwright.dev/docs/codegen) and update the expected snapshot with --update-snapshots command line flag.

Learn more in the [aria snapshots guide](https://playwright.dev/docs/aria-snapshots).

## Webdriver IO

## v9.6.0 | v9.5.0

* The team has added AppAccessibility Scans support for the BrowserStack app automated sessions. Before, accessibility support was only available for Web Automation. Now, it is also available for App Automation.

* The web platform now has a checkVisibility function that lets you see if an element is visible or not. It’s better to use this new version than to maintain our version, which we got from a different project. This also changes how the function is run, showing the function name if it is available. This makes it easier to understand which WebdriverIO helper functions were used in the logs. This “should” be a non-breaking change, but it’s hard to say for sure since it’s not clear how the custom script worked.

* Added a Mobile Native swipe command and contains the following:
- new swipe for native apps method
- scrollIntoView to make it dependent on the swipe
- UTs for scrollIntoView
```
    it('should execute a default swipe', async () => {
        await browser.swipe();
    });
    
    it('should execute a swipe with options', async () => {
        await browser.swipe({
            direction: 'left',                  // Swipe from right to left
            duration: 5000,                     // Last for 5 seconds
            percent: 0.5,                       // Swipe 50% of the scrollableElement
            scrollableElement: $('~carousel'),  // The element to swipe within
        })
    });
```
* Added the mobile tap command including
- native tap on coordinates
- web tap on coordinates
- native tap on element + automatically scrolling when the element is not visible on the native tap
- web tab on element
```
    it('should be able to tap an on element', async () => {
        const elem = $('~myElement')
        // It will automatically scroll to the element if it's not already in the viewport
        await elem.tap()
    })
    
    it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
        const elem = $('~myElement')
        // Swipe right 3 times in the custom scrollable element to find the element
        await elem.tap({
            direction: 'right',
            maxScrolls: 3,
            scrollableElement: $('#scrollable')
        })
    })
    
    it('should be able to tap on screen coordinates', async () => {
        await browser.tap({ x: 200, y: 400 })
    })
```
These are the updates we received in early 2025. We continue to follow the development and updates of the most popular tools in the world of JavaScript testing

***Thanks to everyone who read this article, I hope you found it useful.***

*Don’t hold yourself back from rating or commenting. You can also subscribe to the e-mail newsletter so that you don’t miss interesting things from the world of testing and development.*
