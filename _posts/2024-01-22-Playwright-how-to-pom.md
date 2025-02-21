---
title: "🎭Playwright. How to build Page Object correctly using fixtures"
image: /assets/images/posts/2024-1-22-Playwright-how-to-pom/1_1aQ9ki7tVGg9edYFJJnM-g.webp
excerpt: "This article is useful for test automation engineers or developers who are involved in testing and who want to improve their testing framework skills to use Page Object models for test organization, maintenance, and relations between themself. It can also be useful for those engineers who already use this method but would like to hear a different point of view..."
date: 2024-01-22 20:00:00 +01:00
last_modified_at: 2024-01-22 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_1aQ9ki7tVGg9edYFJJnM-g.webp){: .align-center .border .max-width-600px}

This article is useful for test automation engineers or developers who are involved in testing and who want to improve their testing framework skills to use Page Object models for test organization, maintenance, and relations between themself. It can also be useful for those engineers who already use this method but would like to hear a different point of view.

Let’s consider a simple test scenario:

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1\_\_wp3jH63vsKpsIhI5CAjbg.webp){: .align-center .border .max-width-600px}

First of all, we need to open the home page (as we can see it’s an entry point ‘https://www.saucedemo.com/’). When the page is opened we validate it. Then we want to proceed with getting appropriate selectors for input fields filling user name and password there, and clicking on the “log in” button.
But, what will happen if want to add new tests with another type of user for example admin user? We will need to duplicate our code at least once.
And let’s hope that the locator on our frontend application does not change, say from data-test=”login-button” to data-test=”sign-in-button”, otherwise we will need to go through all the test scenarios where this locator is used and fix it. It is very time-consuming to correct such errors.

The solution is the Page Object model.
Short explanations:

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_HIHpbj3Qyp5i68AfBZMTIA.webp){: .align-center .border .max-width-600px}

There are a lot of articles, videos, and tutorials on the Internet regarding the Page object model. Now I want to share my vision of how to build pages correctly.

(if you want additional examples, please navigate to > [https://github.com/VadimNastoyashchy/playwright-saucedemo.com](https://github.com/VadimNastoyashchy/playwright-saucedemo.com))

{% include image.html url="/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_OKGGP_VSOoayYVPOKZaxjA.webp" description="test.js" %}

{% include image.html url="/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_VfkjxXJme7o6Kltu3hVETQ.webp" description="Login page" %}

{% include image.html url="/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_E7zy9fJ_Qh9Yns5LPFyY5A.webp" description="Abstraction for Page’s" %}

For components, I prefer the same level of detail:

{% include image.html url="/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_cb25bT4812A-xR8VQq81xQ.webp" description="Header component" %}

{% include image.html url="/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_8cEpaRu9ce_Q7dukj-85kA.webp" description="Abstraction for Components" %}

Now it looks better. But still, we need to initialize our pages with { page } fixture in each test block:

```
  test('Login with \'standard\' user with set cookies', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
    });
```

Below I will give examples of the organization of classes and methods. Let us take a closer look at the Fixtures!

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_bUZJ4kYznUv7eIolqvdmiA.webp){: .align-center .border .max-width-600px}

First, we need to create a file. Let’s name it FixtureConfig.ts
Then we need to define the type of our pages and override the test fixture config:

```
import { test as base } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import ApiService from './ApiService';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  apiService: ApiService;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  apiService: async ({ page }, use) => {
    const apiService = new ApiService(page);
    await use(apiService);
  },

});
export { expect } from '@playwright/test';
```

In the end, you need to change the import inside your test file
from:

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_Qb1coTY2ZxxPl67ply9X8Q.webp){: .align-center .border .max-width-600px}

into:

![_config.yml]({{ site.url }}/assets/images/posts/2024-1-22-Playwright-how-to-pom/1_ujPZiHen6wHlyh5R64Z8XQ.webp){: .align-center .border .max-width-600px}

Now you can use a Fixture inside your test via a fixture object that includes all your pages that were defined in a FixtureConfig.ts file:

```
test.describe('Login and Logout test', () => {
    test('Login with \'standard\' user', async ({ page, loginPage, inventoryPage }) => {
        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Standard));
        await expect(await page.url()).toContain(await inventoryPage.getPageUrl());
    });
```

Sources used in the article:

[https://playwright.dev/docs/test-fixtures](https://playwright.dev/docs/test-fixtures)

[https://github.com/VadimNastoyashchy/playwright-saucedemo.com](https://github.com/VadimNastoyashchy/playwright-saucedemo.com)
