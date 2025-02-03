---
title: "😱HOW TO get free parallelization in Cypress IO?"
image: /assets/images/posts/2024-06-04-how-to-get-free-parallelization-in-cypress-io/1_1d4Sq-oR7636pTikDR0fbQ.webp
excerpt: "End-to-end testing is an integral part of any application development pipeline, to simulate real-world user workflows and ensure that they perform as expected. One of the most popular tools for this task is Cypress IO. While Cypress IO offers several benefits, running extensive test suites can be time-consuming. However, you can address this issue by enabling parallel test execution. In this article, we’ll take a step-by-step approach to achieving free parallelization in Cypress IO using the open-source `cy-split` plugin...
"
date: 2024-06-04 20:00:00 +01:00
last_modified_at: 2024-06-04 20:00:00 +01:00
tags:
  - JavaScript
  - Cypress
  - Plugins
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-06-04-how-to-get-free-parallelization-in-cypress-io/1_1d4Sq-oR7636pTikDR0fbQ.webp){: .align-center .border .max-width-600px}

End-to-end testing is an integral part of any application development pipeline, to simulate real-world user workflows and ensure that they perform as expected. One of the most popular tools for this task is Cypress IO. While Cypress IO offers several benefits, running extensive test suites can be time-consuming. However, you can address this issue by enabling parallel test execution. In this article, we’ll take a step-by-step approach to achieving free parallelization in Cypress IO using the open-source `cy-split` plugin.

### ***Understanding Cypress IO Parallelization***

Cypress IO offers built-in parallelization functionality, allowing tests to be executed faster by distributing them across multiple machines or processors. However, this service comes with a cost, which may be unfeasible for smaller projects or teams. Here is where the `cy-split` plugin enters the picture. This open-source Cypress plugin is a straightforward solution for running your tests in parallel during Continuous Integration (CI) — with no extra cost.

### Installing `cy-split`

To begin, make sure you have Cypress installed in your project. Follow the official documentation to do so. Once completed, install `[cy-split](https://www.npmjs.com/package/cypress-split)` using npm:

    npm install cy-split

*Or, if you prefer using yarn:*

    yarn add cy-split

### Setting Up `cy-split`

With the plugin installed, we can now add it to our config file.

***cypress.config.ts***

    import { defineConfig } from 'cypress';
    const cypressSplit = require('cypress-split');
    
    export default defineConfig({
      e2e: {
        supportFile: 'cypress/support/e2e.ts',
        video: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        chromeWebSecurity: false,
        env: {},
        reporter: 'mochawesome',
        reporterOptions: {
          reportDir: 'cypress/results',
          overwrite: false,
          html: false,
          json: true,
        },
        setupNodeEvents(on, config) {
          cypressSplit(on, config);
          return config;
        },
      },
    });

This facilitates the plugin’s setup and ensures that your tests are recorded correctly when executed in parallel mode.

### Implementing Parallelization in CI

The last step is to configure your CI pipeline to take advantage of parallelization when running tests. As detailed in the [example](https://github.com/VadimNastoyashchy/cypress-split-ci-parallel) achieving this depends on your CI provider’s splitting mechanism.

For instance, in GitHub Actions, you can leverage the matrix strategy to create separate jobs representing each parallel instance:

    name: GitHub Actions Manually
    on: [workflow_dispatch]
    jobs:
      # example splitting all tests across GitHub machines
      prepare:
        runs-on: ubuntu-20.04
        # explicitly set the output of this job
        # so that other jobs can use it
        outputs:
          matrix: ${{ steps.prepare.outputs.matrix }}
        steps:
          # generate the list using a bash script
          - name: Create matrix ⊹
            id: prepare
            # for reusable workflow, must use the full action reference
            uses: bahmutov/gh-build-matrix@main
            with:
              n: 3 # number of containers to output
    
          - name: Print result 🖨
            run: echo '${{ steps.prepare.outputs.matrix }}'
    
      test-split:
        needs: prepare
        runs-on: ubuntu-20.04
        strategy:
          fail-fast: false
          matrix: ${{ fromJSON(needs.prepare.outputs.matrix) }}
        steps:
          - name: Checkout 🛎
            uses: actions/checkout@v3
    
          - name: Print GitHub variables 🖨
            run: npx @bahmutov/print-env GITHUB
    
          - name: Print GitHub strategy context 🖨
            run: echo '${{ toJSON(strategy) }}'
    
          - name: Run split Cypress tests 🧪
            uses: cypress-io/github-action@v5
            env:
              SPLIT: ${{ strategy.job-total }}
              SPLIT_INDEX: ${{ strategy.job-index }}

### Conclusion

Parallelization is a powerful way to manage lengthy test suites in Cypress IO. With the `cy-split` plugin, we can tap into this functionality at no cost, enhancing our CI/CD pipelines, minimizing test times, and maximizing productivity. While it requires some tweaking of your test cases and CI configuration, the performance benefits are worth the effort. Happy parallel testing!

***Disclaimer:*** The code shared in this tutorial may require modifications depending on your project setup, test suite, and CI provider. Always refer to your provider’s documentation when setting up new configurations.

***Thanks to everyone who read this article to the end, I hope you found it useful.***

Sources used in the article:
[https://github.com/VadimNastoyashchy/cypress-split-ci-parallel](https://github.com/VadimNastoyashchy/cypress-split-ci-parallel)
[https://www.npmjs.com/package/cypress-split](https://www.npmjs.com/package/cypress-split)

