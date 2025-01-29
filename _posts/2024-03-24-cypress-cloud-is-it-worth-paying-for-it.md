---
title: "Cypress Cloud. Is it worth paying for it?"
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "We have a set of automated tests that can be run locally on our machine, or they can be integrated as part of continuous integration/continuous deployment. The tests are executed in a single thread, test by test. We use the standard spec reporter to understand and analyze our test results."
date: 2024-03-24 20:00:00 +01:00
last_modified_at: 2024-03-24 20:00:00 +01:00
tags:
  - JavaScript
  - Cypress
  - Cypress Cloud
---

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_pU_h27oaQTXPjLxAhMMG0A.webp){: .align-center .border .max-width-600px}

*We have a set of automated tests that can be run locally on our machine, or they can be integrated as part of continuous integration/continuous deployment. The tests are executed in a single thread, test by test. We use the standard spec reporter to understand and analyze our test results.*

When you start building a product test automation solution with Cypress, this is what you can expect.

Now we are faced with the question, what’s next?

- Need to configure the ability to run our tests faster, maybe 2 or even 3 times faster.
- Want to be able to analyze the results of our tests, make comparisons, identify defects, etc.

Our needs can be solved with Cypress Cloud.
[https://docs.cypress.io/guides/cloud/introduction](https://docs.cypress.io/guides/cloud/introduction)

***Short overview of benefits of using Cypress Cloud from the original doc.***

- View and debug past test results

- Analyze and diagnose test health

- Reduce test time & CI costs

- ​Integrate with your favorite tools

- Flexible enterprise configuration and single sign-on

Now we will see and will try if everything is so good.
Our automation framework with some amount of automated tests:
Example:
[https://github.com/VadimNastoyashchy/demoblaze.com](https://github.com/VadimNastoyashchy/demoblaze.com)

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_4yL-KXGGdiwJrGLMtQ_Uhw.webp){: .align-center .border .max-width-600px}

First, we need to create a Cypress Cloud account. We can immediately connect up to 50 users and up to 500 test runs for free.

*See the price list for more information:*

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_MfbSy90hda634D_8KZ96Hw.webp){: .align-center .border .max-width-600px}.webp){: .align-center .border .max-width-600px}

After all of the manipulations with the step-by-step instructions, we will get the **project id** and **record key**:

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_AvB1Ngcuz4Ki7Z4sgKNuYQ.webp){: .align-center .border .max-width-600px}

Then everything is simple. We need to add “projectId:“ to the configuration:

```
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    projectId: "crkxpa",
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'https://www.demoblaze.com/',
    chromeWebSecurity: false,
    env: {
      accounts: {
        active: {
          name: 'SarahConnor',
          password: '12345678',
        },
      },
    },
  },
});
```

And record key should be added as an additional arg for the test command:
**npx cypress run — record — key 6afb99f8-bd78–497a-83a8–402885daa820 — parallel**

```
{
  "name": "demoblaze.com",
  "version": "1.0.0",
  "description": "Cypress automation project for demoblaze.com",
  "main": "index.js",
  "scripts": {
    "tsc": "npx tsc --project tsconfig.json --noEmit",
    "lint": "eslint . --ext .ts",
    "check":"npm run tsc && npm run lint",
    "open": "npm run check && npx cypress open",
    "test": "npx cypress run --record --key 6afb99f8-bd78-497a-83a8-402885daa820 --parallel"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/VadimNastoyashchy/demoblaze.com.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/VadimNastoyashchy/demoblaze.com/issues"
  },
  "homepage": "https://github.com/VadimNastoyashchy/demoblaze.com#readme",
  "devDependencies": {
    "@types/mocha": "10.0.0",
    "@typescript-eslint/eslint-plugin": "5.40.0",
    "@typescript-eslint/parser": "5.40.0",
    "cypress": "13.0.0",
    "eslint": "8.25.0",
    "eslint-plugin-cypress": "2.12.1",
    "mochawesome": "7.1.3",
    "typescript": "4.8.4"
  }
}
```

That’s it! It’s really easy to configure!
Now we can look at the results of our tests, identify flak tests, analyze graphs, and look at each test in detail, step by step. In general, very rich analytics.

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_PUmHkwEcVbT8mpxuUrmXfw.webp){: .align-center .border .max-width-600px}

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_z1om8CngSG8-eVGyumbFyA.webp){: .align-center .border .max-width-600px}

![_config.yml]({{ site.url }}/assets/images/posts2024-04-01-javascript-typescript-in-test-automation-a-closer-look-at-playwright-and-cypress1_RUpXnY_8-o6Q3bUBQCckaQ.webp){: .align-center .border .max-width-600px}

Overall it’s very comprehensive information. I realize that there are free options like Playwright with pretty good parallelization and analysis regarding test results. But let's give Cypress one last chance and try Cloud to understand for yourself whether you need to configure everything yourself but for free or for a certain amount of money to get everything all at once.

*Thanks to everyone who read this article to the end, I hope you found it useful.*

Sources used in the article:
[https://github.com/VadimNastoyashchy/demoblaze.com](https://github.com/VadimNastoyashchy/demoblaze.com)
[https://docs.cypress.io/guides/cloud/introduction](https://docs.cypress.io/guides/cloud/introduction)