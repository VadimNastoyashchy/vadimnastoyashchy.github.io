---
title: "🎭Playwright. Compare the performance of different test parallelization approaches."
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "Time is of the essence in software testing, where achieving quicker test results without compromising reliability is a primary objective for development teams. Playwright, an open-source browser automation library, is instrumental in testing modern web applications across different browsers. Parallelization further enhances the efficacy and efficiency of automated testing by reducing execution times.
"
date: 2024-12-05 20:00:00 +01:00
last_modified_at: 2024-12-05 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Performance
---

*I continue to share tips for playwrights and in the previous article, I showed you [how to build a Page Object correctly using fixtures](https://medium.com/softwaretestingdaily/playwright-how-to-build-page-object-correctly-using-fixtures-ff0a8c05b395). Now, I shift the focus to test parallelization, which plays a vital role in accelerating test execution using Playwright as a test framework.*

Time is of the essence in software testing, where achieving quicker test results without compromising reliability is a primary objective for development teams. Playwright, an open-source browser automation library, is instrumental in testing modern web applications across different browsers. Parallelization further enhances the efficacy and efficiency of automated testing by reducing execution times.

In this article, we won’t delve into setting up parallelization but rather explore the variations in test execution times when deploying different parallelizing approaches.

According to the [official documentation](https://playwright.dev/docs/test-parallel):

## Parallelism[​](https://playwright.dev/docs/test-parallel#introduction)

Playwright Test runs tests in parallel. To achieve that, several worker processes are run at the same time. By default, test files are run in parallel. Tests in a single file are run in order, in the same worker process.

* You can configure tests [test.describe.configure](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) to run tests in a single file in parallel.

* You can configure the entire project to have all tests in all files to run in parallel using [testProject.fullyParallel](https://playwright.dev/docs/api/class-testproject#test-project-fully-parallel) or [testConfig.fullyParallel](https://playwright.dev/docs/api/class-testconfig#test-config-fully-parallel).

* To disable parallelism limit the number of [workers to one](https://playwright.dev/docs/test-parallel#disable-parallelism).

You can control the number of [parallel worker processes](https://playwright.dev/docs/test-parallel#limit-workers) and [limit the number of failures](https://playwright.dev/docs/test-parallel#limit-failures-and-fail-fast) in the whole test suite for efficiency.
> **Playwright defaults to parallelization using spec files. It allows the configuration of the number of workers which facilitates complete parallelization, even within spec files.**

## Limit workers[​](https://playwright.dev/docs/test-parallel#limit-workers)

You can control the maximum number of parallel worker processes via [command line](https://playwright.dev/docs/test-cli) or in the [configuration file](https://playwright.dev/docs/test-configuration).

From the command line:
```
    npx playwright test --workers 4
```
In the configuration file:

*playwright.config.ts*
```
    import { defineConfig } from '@playwright/test';
    export default defineConfig({
      // Limit the number of workers on CI, use default locally
      workers: process.env.CI ? 2 : undefined,
    });
```
> **Another option is :**

## Parallelize tests in a single file[​](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file)

By default, tests in a single file are run in order. If you have many independent tests in a single file, you might want to run them in parallel with [test.describe.configure()](https://playwright.dev/docs/api/class-test#test-describe-configure).

Note that parallel tests are executed in separate worker processes and cannot share any state or global variables. Each test executes all relevant hooks just for itself, including beforeAll and afterAll.
```
    import { test } from '@playwright/test';
    
    test.describe.configure({ mode: 'parallel' });
    
    test('runs in parallel 1', async ({ page }) => { /* ... */ });
    test('runs in parallel 2', async ({ page }) => { /* ... */ });
```
Or
```
    import { defineConfig } from '@playwright/test';
    
    export default defineConfig({
      fullyParallel: true,
    });
```
To measure performance, we prepared a test framework with 4 spec files. You can access it here: 
[*https://github.com/Maryna-Mala/TypeScript/tree/main/tests](https://github.com/Maryna-Mala/TypeScript/tree/main/tests)*

![[https://github.com/Maryna-Mala/TypeScript/tree/main/tests](https://github.com/Maryna-Mala/TypeScript/tree/main/tests)](https://cdn-images-1.medium.com/max/5924/1*UY2TO1mdyqKsHldmRdL63g.png)*[https://github.com/Maryna-Mala/TypeScript/tree/main/tests](https://github.com/Maryna-Mala/TypeScript/tree/main/tests)*

### What we compare:
> # - 4 test spec files, without parallelization (sequentially).

    npx playwright test
> # “Default parallelization”
> # - 4 test spec files, default parallelization (2 workers).

    npx playwright test - workers 2
> # - 4 test spec files, default parallelization (4 workers).

    npx playwright test - workers 4
> # “Full parallelization”
> # - 4 test spec files, full parallelization (2 workers)
```
    import { defineConfig } from '@playwright/test';
    
    export default defineConfig({
      fullyParallel: true,
    });
```
    npx playwright test - workers 2
> # - 4 test spec files, full parallelization (4 worker)
```
    import { defineConfig } from '@playwright/test';
    
    export default defineConfig({
      fullyParallel: true,
    });
```
    npx playwright test - workers 4

***We conducted each test scenario three times to ensure a robust analysis.***

![](https://cdn-images-1.medium.com/max/2000/1*dF0nWBD7a8abqR7-1ZaPqw.png)

Results showed that using 4 workers for 4 spec files was the most efficient method as marked in bold. This configuration, which uses 1 worker per file, yielded the fastest results. Surprisingly, “full parallelization,” did not enhance speed and was slightly slower than the default parallelization with the same number of workers.

### Conclusion

Playwright’s parallelization support effectively decreases test execution times compared to sequential processing, notably when running numerous tests. The configuration is straightforward and tends to perform optimally when simply splitting into test files.

***Thanks to everyone who read this article, I hope you found it useful.***

I would also like to thank [Maryana](https://www.linkedin.com/in/maryna-mala-5592a5177) for her help in conducting and collecting data for this article.