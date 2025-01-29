---
title: "🚫STOP using cy.wait()! Use timeout or aliases instead. Cypres IO."
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "When writing tests, I often encounter a delay in the appearance of elements on the frontend page. This can be due to waiting for a request with data that the rendering of elements on the page depends on, or other conditions.
The easiest way to wait for an item to appear is to use the:"
date: 2024-02-17 20:00:00 +01:00
last_modified_at: 2024-02-17 20:00:00 +01:00
tags:
  - JavaScript
  - cypress
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-2-17-Stop-using-cy-wait/1_hj-rHICtXaPMa2dxK_Vdog@2x.webp){: .align-center .border .max-width-600px}

When writing tests, I often encounter a delay in the appearance of elements on the frontend page. This can be due to waiting for a request with data that the rendering of elements on the page depends on, or other conditions.
The easiest way to wait for an item to appear is to use the:

```
cy.wait(time)
```

But with this option, we are waiting until the end for the specified time, even if the element has already appeared on the page.

```
cy.visit('https://www.demoblaze.com')
cy.wait(5_000)
cy.get('#search').type('Peter Pan')
```

You can say that we can change the default timeout of Cypress. (By default, Cypress waits 4 seconds to retrieve and verify items.)

![_config.yml]({{ site.url }}/assets/images/posts/2024-2-17-Stop-using-cy-wait/1_qV5YvHZ_ucTJ6tKgbLjryA.webp){: .align-center .border .max-width-600px}

```
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  // Command timeout overridden for E2E tests
  e2e: {
    defaultCommandTimeout: 10000,
  },
})
```

But this is not the right solution for waiting on elements. My suggestion is to use dynamic timeout for elements instead of hardcoded wait value. When the element is found, the timeout will be interrupted even if the time we set has not expired yet.

```
cy.get('#search', { timeout: 10_000 })
```

Now the dynamic timeout works for each element on a per-element basis!
It is also possible to wait for the response needed to render the page.

```
cy.intercept('GET', '/books').as('getBooks')
cy.wait('@getBooks')
cy.get('#search').type('Peter Pan')
```

Thanks to everyone who read this article to the end, I hope you found it useful.

Sources used in the article:

[https://docs.cypress.io/api/commands/wait](https://docs.cypress.io/api/commands/wait)