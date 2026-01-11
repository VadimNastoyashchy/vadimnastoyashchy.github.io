---
title: "🎭Playwright Parallelism: Why the Playwright sharding approach speeds up test execution over workers?"
image: /assets/images/posts/2026-01-10-playwright-parallelism-why-the-playwright-sharding-approach-speeds-up-test-execution/0_ibq0p6HzRRqGlPYv.png
excerpt: "In this article, I explain how Playwright works with parallelism and offer recommendations based on my research and analysis. The topic of parallel test execution has always interested other test automation engineers and me, regardless of the automated testing tools we use."
date: 2026-01-10 20:00:00 +01:00
last_modified_at: 2026-01-10 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Performance
  - CI/CD
---

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-10-playwright-parallelism-why-the-playwright-sharding-approach-speeds-up-test-execution/0_ibq0p6HzRRqGlPYv.png){: .align-center .border .max-width-600px}

In the previous article, I introduced you to [🎭 Playwright. Compare the performance of different test parallelization approaches.](https://medium.com/javascript-in-plain-english/playwright-compare-the-performance-of-different-test-parallelization-approaches-7698f1ee6523) Now, I shift the focus to test parallelization with the sharding approach, which plays a vital role in accelerating test execution using Playwright as a test framework.

The topic of parallel test execution has always interested other test automation engineers and me, regardless of the automated testing tools we use. In this article, I explain how Playwright works with parallelism and offer recommendations based on my research and analysis.

## To properly understand parallelism in Playwright, we need to take a quick look at low-level computer architecture.

*I promise it won't take long, but it might be a bit boring.*

Our computer (my and yours) consists of various components, such as a hard drive, RAM, and a processor, etc. Here, we are most interested in the processor, specifically its "Clock Speed" and the number of cores. Cores play an important role in the simultaneous execution of parallel processes. "Clock Speed" determines how much work the processor can do in a given time. Here's more information: [What Is Clock Speed?](https://www.intel.com/content/www/us/en/gaming/resources/cpu-clock-speed.html)

The following scheme provides us with greater visualization capabilities that we will apply to our Playwright parallelization mechanism:

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-10-playwright-parallelism-why-the-playwright-sharding-approach-speeds-up-test-execution/1_nfZZJif8Lb1Hh49gxUGjBw.jpeg){: .align-center .border .max-width-600px}

When we use Playwright on one computer with the `--workers=` flag to run our tests in parallel, a Node.js process will be created for us. More information about processes can be found [here](https://dev-aditya.medium.com/understanding-processes-and-threads-in-node-js-a-deep-dive-into-concurrency-and-parallelism-67e2cd2d5f0c).

There is a clear dependency between workers and processor cores here. If there are fewer workers than cores, everything will work properly. As shown in the diagram, everything will execute in parallel at the same time.

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-10-playwright-parallelism-why-the-playwright-sharding-approach-speeds-up-test-execution/1_TYCcNcPTTYPjUN9OeID1SQ.png){: .align-center .border .max-width-600px}

However, if we have 4 workers and 2 processor cores, certain workers will not run truly in parallel. Not everything will run at the same time, but processor time will be shared.

![_config.yml]({{ site.url }}/assets/images/posts/2026-01-10-playwright-parallelism-why-the-playwright-sharding-approach-speeds-up-test-execution/1_rCVNsTeTxe0qZZIcQ0il9Q.png){: .align-center .border .max-width-600px}

For example, on a CI/CD runner where we run our tests with more workers than available cores, we will not see an improvement in test execution time. This is because the workers share the processor time on the available cores. Even though we specify 10 or 20 workers.

You ask, "What should I do in this case?" It's simple: Add additional runners using the sharding mechanism. For each runner, you can specify the number of workers based on the number of cores available on the processors. More information about sharding [here](https://playwright.dev/docs/test-sharding)

[Here is an example of how to describe the sharding mechanism in GitHub Actions:](https://github.com/VadimNastoyashchy/vadimnastoyashchy.github.io/blob/master/.github/workflows/pr_master.yml)

```yaml
e2e_tests:
  timeout-minutes: 60
  runs-on: ubuntu-latest
  env:
    CI: true
  strategy:
    fail-fast: false
    matrix:
      shardIndex: [1, 2, 3, 4]
      shardTotal: [4]
  steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '22'

    - name: Install E2E dependencies
      run: npm ci

    - name: Install Playwright browsers
      run: npx playwright install --with-deps

    - name: Run regression tests
      run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }} --workers=2
```

In such an example, 4 runners (computers) and 2 workers for each. So we have 8 truly parallel processes.

## Summary

In summary, we can continuously improve the execution time of our tests by adding more runners (computers), provided that we follow best practices when developing and designing tests with an independent architecture.

I hope this article has shed some light on the obscure area of parallelization. Improve your test execution times, and remember about processor cores)
