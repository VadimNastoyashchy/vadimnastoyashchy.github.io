---
layout: post
title: 🎭Playwright. How to build Page Object correctly using fixtures
---

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_1aQ9ki7tVGg9edYFJJnM-g.webp)

This article is useful for test automation engineers or developers who are involved in testing and who want to improve their testing framework skills to use Page Object models for test organization, maintenance, and relations between themself. It can also be useful for those engineers who already use this method but would like to hear a different point of view.

Let’s consider a simple test scenario:

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1__wp3jH63vsKpsIhI5CAjbg.webp)

First of all, we need to open the home page (as we can see it’s an entry point ‘https://www.saucedemo.com/’). When the page is opened we validate it. Then we want to proceed with getting appropriate selectors for input fields filling user name and password there, and clicking on the “log in” button.
But, what will happen if want to add new tests with another type of user for example admin user? We will need to duplicate our code at least once.
And let’s hope that the locator on our frontend application does not change, say from data-test=”login-button” to data-test=”sign-in-button”, otherwise we will need to go through all the test scenarios where this locator is used and fix it. It is very time-consuming to correct such erros.

The solution is the Page Object model.
Short explanations:

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_HIHpbj3Qyp5i68AfBZMTIA.webp)

There are a lot of articles, videos, and tutorials on the Internet regarding the Page object model. Now I want to share my vision of how to build pages correctly.

(if you want additional examples, please navigate to > https://github.com/VadimNastoyashchy/playwright-saucedemo.com)

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_OKGGP_VSOoayYVPOKZaxjA.webp)
`test.js`

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_VfkjxXJme7o6Kltu3hVETQ.webp)
`Login page`

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_E7zy9fJ_Qh9Yns5LPFyY5A.webp)
`Abstraction for Page’s`

For components, I prefer the same level of detail:

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_cb25bT4812A-xR8VQq81xQ.webp)
`Header component`

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_8cEpaRu9ce_Q7dukj-85kA.webp)
`Abstraction for Components`

Now it looks better. But still, we need to initialize our pages with { page } fixture in each test block:

```
  test('Login with \'standard\' user with set cookies', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
    });
```

Below I will give examples of the organization of classes and methods. Let us take a closer look at the Fixtures!

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_bUZJ4kYznUv7eIolqvdmiA.webp)

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

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_Qb1coTY2ZxxPl67ply9X8Q.webp)

into:

![_config.yml]({{ site.baseurl }}/images/2024-1-22-Playwright-how-to-pom/1_ujPZiHen6wHlyh5R64Z8XQ.webp)

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

https://playwright.dev/docs/test-fixtures

https://github.com/VadimNastoyashchy/playwright-saucedemo.com