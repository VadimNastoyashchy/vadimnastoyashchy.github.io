---
title: "🔝TOP 5 useful Cypress plugins in 2025!"
image: /assets/images/posts/2024-05-03-top-10-useful-cypress-plugins-in-2024/0_F-HtzDxk0ww5KMMQ.webp
excerpt: "I've already shared with you 🔝Top 10 useful Cypress plugins in 2024! but not all plugins are included in the article that I use. I want to add 5 more plugins that will be relevant in 2025 and that I use myself....
"
date: 2025-03-03 20:00:00 +01:00
last_modified_at: 2025-03-03 20:00:00 +01:00
tags:
  - JavaScript
  - Cypress
  - Plugins
---

I've already shared with you [🔝Top 10 useful Cypress plugins in 2024!]({{ site.url }}/top-10-useful-cypress-plugins-in-2024) but not all plugins are included in the article that I use. I want to add 5 more plugins that will be relevant in 2025 and that I use myself.

![_config.yml]({{ site.url }}/assets/images/posts/2024-05-03-top-10-useful-cypress-plugins-in-2024/0_F-HtzDxk0ww5KMMQ.webp){: .align-center .border .max-width-600px}

***Why Enhance Cypress with Plugins?***

Despite the growing popularity of Playwright, Cypress is still a relevant tool and occupies its specific niche in the field of automation. While Cypress offers a comprehensive set of features out of the box, some testing scenarios have specific needs that aren't addressed by the default configuration. This is where plugins prove invaluable. So here are my next 5 plugins that I want to share with you and that I think you will find useful.

**Cypress plugins facilitate the ability to:**

> - Deepen interaction with browsers, providing functionalities beyond the default browser capabilities.
> - Gain greater control over the Cypress server, enabling modifications to Cypress's internal operations.
> - Enhance or modify the behavior of existing commands or introduce new custom commands.
> - Execute tasks within Node.js, allowing direct access to file systems or databases.

**Advantages of Using Cypress Plugins:**

> - Enhanced Capabilities: Plugins extend Cypress's functionality with new commands, integration with other testing tools, and modifications to test execution processes.
> - Customization: Plugins offer the flexibility to tailor the testing environment to the specific needs of an application, including setting custom environment variables, customizing error messages, or configuring sophisticated stubbing and spying.
> - Increased Efficiency: Some plugins boost test efficiency by automating actions like clearing app data between tests, automating test data input, or distributing test runs across several machines.

**Drawbacks of Using Cypress Plugins:**

> - Dependency Management: Integrating plugins into a project multiplies the number of dependencies that must be managed and updated, possibly leading to version compatibility issues and more maintenance.
> - Added Complexity: Although plugins enhance functionality, they can also complicate test suites, making them challenging to navigate for developers who aren't familiar with the additional tools.
> - Performance Impact: Utilizing numerous or poorly constructed plugins might slow down the test runner, consequently diminishing the performance of your tests.

<br>
<hr>

## TOP 5 useful Cypress plugins in 2025:

### [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api)

> Cypress plugin for effective API testing. Imagine Postman, but in Cypress. Prints out information about the API call in the Cypress App UI.

> cy.api() command, that will information about the API call, such as URL, headers, response and more to the UI frame

> - all of the info can be viewed in a time-travel snapshots
> - simple table for viewing cookies
> - JSON data object and array folding
> - color coding of methods in UI view and in timeline
> - calculating size of the response
> - calculating size of the response

***This plugin allows me to visualize networks (request, response) in open mode while testing the application API.***

<hr>

### [cypress-performance](https://github.com/Valiantsin2021/cypress-performance)

> The cypress-performance plugin introduces a powerful way to measure and assert on web performance metrics directly in your Cypress tests. Unlike traditional end-to-end testing that focuses on functionality, this plugin enables teams to catch performance regressions early and maintain high performance standards through automated testing.

```
it(`using preset SLOW_3G`, () => {
      // Using setNetworkConditions should be called first before navigating to the page
      cy.setNetworkConditions('SLOW_3G')
      cy.visit(url)
      cy.performance().then((metrics) => {
        expect(metrics.pageloadTiming).to.be.greaterThan(12000)
        expect(metrics.domCompleteTiming).to.be.greaterThan(12000)
      })
      cy.resetNetworkConditions()
  })
```
<hr>

### [cypress-grep](https://www.npmjs.com/package/@cypress/grep#install)

> Filter tests using substring
All other tests will be marked pending, see why in the Cypress test statuses blog post. If you have multiple spec files, all specs will be loaded, and every test will be filtered the same way, since the grep is run-time operation and cannot eliminate the spec files without loading them. If you want to run only specific tests, use the built-in - spec CLI argument.

***Useful plugin when running the particular test that provides part of the test name***

```
# run only tests with "hello" in their names
npx cypress run --env grep=hello

✓ hello world
  - works
  - works 2 @tag1
  - works 2 @tag1 @tag2
  1 passing (38ms)
  3 pending
```

<hr>

### [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)

> Zero config Mochawesome reporter for Cypress with screenshots attached to tests.

***Must have a plugin to visualize the test result in an HTML way***

![alt text](https://cdn-images-1.medium.com/max/1600/0*xzmZJ3wuMcaUtkQE.png)

<hr>

### [cypress-recurse](https://github.com/bahmutov/cypress-recurse)

> A way to re-run Cypress commands until a predicate function returns true

***It's quite a useful plugin if you need to execute some code recursively under certain conditions.***

```
import { recurse } from 'cypress-recurse'

it('gets 7', () => {
  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
  )
})
```

## Conclusion

Cypress plugins offer many opportunities for enhancing web application testing, providing customized solutions that address diverse business needs. However, it is crucial to carefully select these plugins, keeping in mind their potential limitations. It is important to meticulously evaluate the costs and benefits of each plugin to your specific scenario, ensuring that they serve as valuable assets rather than obstacles in your Cypress testing endeavors.

<hr>

**_Thanks to everyone who read this article, I hope you found it useful._**

_Don’t hold yourself back from rating or commenting. You can also subscribe to the e-mail newsletter so that you don’t miss interesting things from the world of testing and development._