---
title: "🔝JavaScript UI Test Automation Frameworks — which one is faster?"
image: /assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp
excerpt: "Today I have prepared an equally interesting article. As you can see from the title, we are going to compare the performance of three of the most popular system (UI) testing tools.
Playwright, WebdriverIO, and Cypress will be our guinea pigs today...
"
date: 2024-12-17 20:00:00 +01:00
last_modified_at: 2024-12-17 20:00:00 +01:00
tags:
  - JavaScript
  - Playwright
  - Cypress
  - WebdriverIO
  - Performance
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-12-17-javascript-ui-test-automation-frameworks-which-one-is-faster/1_jlskksKL_ZgiQzxnoeoYPw.webp){: .align-center .border .max-width-600px}

*I continue to share interesting experiences and tips from the automation testing world. So far we’ve discussed the following:*

![[*🎭Playwright. Compare the performance of different test parallelization approaches.](https://medium.com/javascript-in-plain-english/playwright-compare-the-performance-of-different-test-parallelization-approaches-7698f1ee6523)*](https://cdn-images-1.medium.com/max/2540/1*VdHXUgs7bNmA8kA8VO8Evg.png)[*🎭Playwright. Compare the performance of different test parallelization approaches.](https://medium.com/javascript-in-plain-english/playwright-compare-the-performance-of-different-test-parallelization-approaches-7698f1ee6523)

*Today I have prepared an equally interesting article. As you can see from the title, we are going to compare the performance of three of the most popular system (UI) testing tools. 
[Playwright](https://playwright.dev/), [WebdriverIO](https://webdriver.io/), and [Cypress](https://www.cypress.io/) will be our guinea pigs today.*

When choosing the right automation tool for testing, we are usually guided by the programming language our team works in, the need to support certain browsers, whether we need to support mobile testing, how we can parallelize tests, how the tool will be supported and extended, and so on. And that is true. In addition to the above, knowing the test execution performance (speed) of a particular tool will be a plus when deciding what to use for automated testing.

### Why Playwright?
> — Multi-browser Support: Playwright supports all the major browsers (Chromium, Firefox, and WebKit) out of the box, which means you can test across all browsers with the same API.
 — Cross-platform: It works on Windows, Linux, and macOS.
 — Auto-waits: The API automatically waits for elements to be ready before performing actions, reducing flakiness in tests.
 — Rich set of APIs: Offers APIs to simulate various inputs including keyboard, mouse, and touch, as well as network and context manipulation.
 — Language Support: First-class support for JavaScript/TypeScript, and community-driven support for Python, Java, and C#.

### Why WebDriverIO?
> — Flexible: It runs on top of Selenium, which means it has wide support for almost all browsers, even mobile browsers via Appium.
 — Feature-rich: Contains a lot of plugins and services that can be integrated, like visual regression testing tools, and reporter tools, and even extends its functionalities using custom commands.
 — Support for Multiple Test Frameworks: It supports Mocha, Jasmine, and Cucumber, meaning that you can use it with a variety of testing styles.
 — Good community and ecosystem: Due to its integration with Selenium, it has a very strong community and a lot of third-party tools.

### Why Cypress?
> — Developer-friendly: Provides a unique interactive test runner that allows you to see commands as they execute while also viewing the application UI.
 — Automatic Waiting: Automatically waits for commands and assertions before moving on. No need to define explicit waits.
 — Real-Time Reloads: Automatically reloads whenever you make changes to tests.
 — Built-in Debuggability: You can use familiar dev tools for debugging directly during test execution.
 — Network Traffic Control: Easily control, stub, and test edge cases without involving your server. You can intercept and modify network traffic on the fly.

Together with [Maryna](https://www.linkedin.com/in/maryna-mala-5592a5177/), we prepared three repositories for these three tools, with four tests that were the same according to the scenario. For each of these tools, we checked the sequential execution of the tests in one thread locally and on GitHub action (one single machine). We ran the tests 3 times for data accuracy and took the total execution time from the average value.
Links to the repositories: [Playwright](https://github.com/Maryna-Mala/test-performance-playwright) / [WebdriverIO](https://github.com/Maryna-Mala/test-performance-wdio) / [Cypress](https://github.com/Maryna-Mala/test-performance-cypress)

### #1 Locally run

*configuration:*

    MacBook Air m1 |  RAM 8 gb | SSD 256 | browser - chrome

![](https://cdn-images-1.medium.com/max/3520/1*DmyIWnxZpfrbyiw_GOpObg.png)

### Results:

![](https://cdn-images-1.medium.com/max/2000/1*IgYwEoEnn_qtuFZ4xXydlQ.png)

We ran each tool three times, and as you can see from the results, Playwright took *13.4* seconds to complete, while WebdriverIO and Cypress took almost as long — *18.3* and *18.7* seconds, respectively.

![](https://cdn-images-1.medium.com/max/2000/1*JThx0MXsiBZeHcZ7Wrwmsw.png)

### #2 CI run GithubAction

*configuration:*

    Standard GitHub-hosted runners
    
    Virtual Machine | (CPU) | (RAM) | (SSD) | Workflow
    Linux           | 4     | 16 GB | 14 GB | ubuntu-latest

The situation with CI is a bit different. We measured the execution time of the tool itself as well as the execution time of the command. Some tools require additional time for verification or configuration before the runner is launched.

![](https://cdn-images-1.medium.com/max/3008/1*YsuuBbYZDx76MI15vQawJQ.png)

![](https://cdn-images-1.medium.com/max/2000/1*RsWm2a-KLd3H_bXkukicEg.png)

The Playwright was also the fastest tool in the CI run.

![playwright 15.8 sec / 17 sec](https://cdn-images-1.medium.com/max/4180/1*y-0sWT7jGXNZPRZg6W0nMw.png)*playwright 15.8 sec / 17 sec*

![webdriverio 30 sec / 32sec](https://cdn-images-1.medium.com/max/4168/1*L3YIrbMUfZfm1eRtgfV_Tw.png)*webdriverio 30 sec / 32sec*

![cypress 22 sec / 41sec](https://cdn-images-1.medium.com/max/4188/1*c4CgKVRJpA1Coq8FOu3kaw.png)*cypress 22 sec / 41sec*

### Conclusion

The comparison of the three JavaScript UI test automation frameworks — Playwright, WebdriverIO, and Cypress — revealed notable differences in their performance both locally and on CI using GitHub Actions. Playwright emerged as the fastest tool in both environments, significantly outperforming the other two frameworks. Its comprehensive browser support, cross-platform capabilities, and robust APIs make it an advantageous choice for developers seeking efficiency and reliability in UI testing. WebdriverIO and Cypress also demonstrated commendable features, each suited to different testing needs and environments. This comparison provides valuable insight for teams considering automated testing tools, allowing them to make informed decisions based on speed, functionality, and compatibility with their testing needs.

***Thanks to everyone who read this article, I hope you found it useful.***

I would also like to thank [Maryna](https://www.linkedin.com/in/maryna-mala-5592a5177) for her help in conducting and collecting data for this article.