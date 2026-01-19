---
title: "🔝JS/TS UI Test Automation Frameworks - latest updates in 2026"
image: /assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp
excerpt: "Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from 2026....
"
date: 2026-01-17 12:00:00 +01:00
last_modified_at: 2025-08-01 12:00:00 +01:00
tags:
  - JavaScript
  - TypeScript
  - Playwright
  - Cypress
  - WebdriverIO
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp){: .align-center .border .max-width-600px}

*Playwright, WebdriverIO, and Cypress are currently the top testing frameworks. They're always adding new features because of the competition. If you're an automation or software development engineer, it's crucial to stay on top of the latest functionalities. This article will give you the latest updates from 2026.*

# Cypress

## 14.5.3 | 15.9.0

### Major changes
- **Cypress 15 introduced breaking changes**
  - Dropped Node.js 18 & 23
  - Dropped legacy Linux (**glibc < 2.31**)
  - Removed Firefox CDP support
  - Webpack 4 no longer supported

### Key features added
- Cypress [**Studio**](https://docs.cypress.io/app/guides/cypress-studio#Why-Use-Cypress-Studio) enabled by default
- AI-assisted test creation (Studio)
- Expanded **cy.press()** key support
- **experimentalRunAllSpecs** for **component testing**
- Component testing support for **Next.js v16** and **Angular v21**

### Performance & stability
- Faster and safer visibility checks
- Improved DNS handling
- Fewer UI freezes and runner crashes

### Tooling & UX
- Selector Playground available outside Studio
- Command log improvements and new flags
- Better exit-code handling for CI

### Security & maintenance
- Multiple dependency and CVE fixes
- Updated Electron, Chromium, and Node

---
<br>

# Playwright

## Version 1.54 | 1.57

### Major changes
- **Chrome for Testing** replaces Chromium by default (no functional impact expected)

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-17-javascript-ui-test-automation-frameworks-latest-updates-2026/cft-logo-change-e6c83cd629c1cf92a7856fe6e42ab80a.png){: .align-center .border .max-width-600px}

- **Speedboard** added to HTML reporter for identifying slow tests

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-17-javascript-ui-test-automation-frameworks-latest-updates-2026/speedboard-a8fe4e48388f4075fdd70e83d2b53e7a.png){: .align-center .border .max-width-600px}

- Web server startup can now wait for log output via regex

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    wait: {
      stdout: '/Listening on port (?<my_server_port>\\d+)/'
    },
  },
});
```

- Strong push toward **AI-assisted testing** with Playwright Test Agents

<iframe width="560" height="315" src="https://www.youtube.com/embed/_AifxZGxwuk?si=kH9ZdLht2M4cxk1e" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### Breaking changes
- Removed **page.accessibility** API (use Axe or similar tools)
- Removed **browserContext.on('backgroundpage')**
- Dropped support for **Chromium extension manifest v2**

### New capabilities
- Test tagging via **testConfig.tag**
- Better worker, Service Worker, and network observability
- Improved locators, mouse interaction control, and diagnostics APIs
- Automatic **toBeVisible()** assertions in Codegen

### Tooling & UX
- Enhanced HTML reporter and UI Mode controls
- Unified test list, snapshot handling, and single-worker UI runs

### Platform & maintenance
- Debian 13 support
- Updated browser engines (Chromium, Firefox, WebKit)

---
<br>

# Webdriver IO

## v9.18.4 | 9.23.0

### Major changes
- Transition and stabilization of **WebdriverIO v9**
- Continued improvements across **BrowserStack**, **Appium**, **BiDi**, and runner stability
- Strong focus on **spec compliance**, **CI reliability**, and **cross-browser correctness**

### Key features
- BrowserStack updates reflecting **product rename**  
  (Observability → Test Reporting and Analytics)
- New **Appium CLI capabilities** (start Appium Inspector, custom startup timeouts)
- Support for **Chrome for advanced BiDi / W3C compliance**
- Improved **xvfb handling** (auto-install, disable when needed)
- New CLI options:
  - **--exclude** suites by name
  - **--test-list** / **--test-list-invert**
- Multi-remote API cleanup (**multiRemoteBrowser** naming)
- Accessibility & targeted A11y scans improvements

### Stability & bug fixes
- Major fixes in:
  - **WebDriver BiDi mode** (stale elements, frames, XPath, alerts)
  - **waitFor\*** commands correctness
  - Worker shutdown & memory leak prevention
  - Retry, timeout, and hook execution handling
- Improved reporters:
  - JUnit, Allure, Jasmine, Mocha correctness
- Better handling of Service Workers, shadow DOM, and mobile contexts

### Breaking / notable changes
- Dropped legacy behaviors and deprecated APIs across v9
- Changed defaults and stricter **W3C WebDriver compliance**
- Manifest v2 extensions deprecated earlier (already enforced)
- Some renamed APIs and stricter config validation

### Tooling & UX
- More robust CLI behavior in CI
- Improved logging, debugging, and error reporting
- Better handling of dynamic specs and multi-capability runs
- Cleaner docs and updated third-party integrations

### Platform & maintenance
- Regular dependency and browser engine updates
- Security fixes and credential-leak prevention
- Internal refactors for long-term maintainability

---
<br>

***Thanks to everyone who read this article, I hope you found it useful.***
