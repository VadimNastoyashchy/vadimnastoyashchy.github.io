---
layout: post
title: How to automate Accessibility testing using CypressIO?
---

![_config.yml]({{ site.baseurl }}/images/2024-2-5-Access-Cypress/1_Bq0kJ6Q4QfK3KfTzxnH47Q.webp)

This article is useful for test automation engineers or developers who are involved in testing and want to improve their test framework skills to apply such type of testing in the project.
Let’s start with a quick overview of accessibility testing itself. ↓↓↓

![_config.yml]({{ site.baseurl }}/images/2024-2-5-Access-Cypress/1_S5PQQmdSCUuDHem-psFvQg.webp)

### Digital Accessibility Standards

The international standards for coding and accessibility are the Web Content Accessibility Guidelines (WCAG), both versions 2.0 and 2.1. They are based on the following four fundamental aspects, known as POUR, that are necessary for everyone to access and use web content:
#### Perceivable, Operable, Understandable, Robust.

WCAG provides criteria for testing your content based on three levels of conformance with a progressively larger set of success criteria:

#### Level A: 
To meet this level, you must meet 25 success criteria. For example, at this level, you can’t identify something by the color, as in “Press the yellow arrow to continue.

#### Level AA: 
To achieve this level, you have to meet 13 additional success criteria in addition to the 25 from Level A. An example of a Level AA criterion is meeting color contrast standards.

#### Level AAA: 
This level has 24 additional pass criteria (for a total of 62). Examples of Level AAA success would be increasing color contrast or removing any item that blinks or flashes three times per second to reduce the likelihood of a user having a seizure.

Now that we are done with the terminology, we can start the automation process.
First of all, we need Cypress as a test runner itself.
This command will install Cypress locally as a dev dependency for your project:

```
npm install cypress --save-dev
```

To continue with testing accessibility, we should use the axe-core library as a plugin for Cypress cypress-axe
[https://github.com/component-driven/cypress-axe](https://github.com/component-driven/cypress-axe)

Install cypress-axe from npm:

```
npm install --save-dev cypress-axe
```

Install peer dependencies:

```
npm install --save-dev cypress axe-core
```

The next step is to register our plugin in the Cypress support file to be able to use cypress-axe commands. Update `cypress/support/e2e.js` or `cypress/support/e2e.ts` file to include the cypress-axe commands by adding:

```
import 'cypress-axe'
```

![_config.yml]({{ site.baseurl }}/images/2024-2-5-Access-Cypress/1_aGTfz0kBdInRGV5ktGWEBg.webp)

> *If you use TypeScript update tsconfig.json file with adding cypress-axe types↓↓↓*

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "es5",
    "lib": ["esnext", "dom"],
    "types": ["cypress", "cypress-axe"]
  },
  "include": ["."]
}
```

Now we are ready to use `cypress-axe` library to test our application.

```
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.injectAxe()
    cy.checkA11y()
  })
})
```

*cy.injectAxe()*
This will inject the `axe-core` runtime into the page under test. You have to run this after a call to `cy.visit()` and before you run the `checkA11y` command.

*cy.checkA11y()*
This will run axe against the document at the point in which it is called. This means you can call this after interacting with your page and uncover accessibility issues introduced as a result of rendering in response to user actions.

If something does not conform to the accessibility rules, an error is thrown after the tests are ran.

![_config.yml]({{ site.baseurl }}/images/2024-2-5-Access-Cypress/1_MPUOxdaDOOBxRuBoco-ZIg.webp)

Additionally, there is an option to pass a configuration object to axe, you can configure which rules to use for validations and more. 
[https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axeconfigure](https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axeconfigure)

Example of additional settings:

```
cy.configureAxe({
    branding: {
      brand: String,
      application: String
    },
    reporter: 'option',
    checks: [Object],
    rules: [Object],
    locale: Object
  })
```

For more informative error output, you can also add your own Cypress command, which should be included in the `cypress/support/commands.js` or `cypress/support/commands.ts` file.

```
Cypress.Commands.add('checkAccessability', (context, options) => {
    const terminalLog = violations => {
      cy.task(
        'log',
        `${violations.length} accessibility violation${
          violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`,
      )
      const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.length,
        }),
      )
  
      cy.task('table', violationData)
    }
  
    cy.checkA11y(context || null, options || null, terminalLog)
  })
```

And don't forget to update `setupNodeEvents(){}` function in `cypress.config.js` file to print logs to the console.

```
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
  },
});
```

Accessibility errors are now also displayed in the console in a more informative way.

![_config.yml]({{ site.baseurl }}/images/2024-2-5-Access-Cypress/1_4vQctMSMRsLE4vrT4yGRjQ.webp)

For a complete Cypress and Cypress-axe integration solution, follow this link:
[https://github.com/VadimNastoyashchy/https---github.com-VadimNastoyashchy-cypress-accessability](https://github.com/VadimNastoyashchy/https---github.com-VadimNastoyashchy-cypress-accessability)

Thanks to everyone who read this article to the end, I hope you found it useful.

Sources used in the article:
[https://info.usablenet.com/accessibility-testing](https://info.usablenet.com/accessibility-testing)
[https://github.com/component-driven/cypress-axe](https://github.com/component-driven/cypress-axe)