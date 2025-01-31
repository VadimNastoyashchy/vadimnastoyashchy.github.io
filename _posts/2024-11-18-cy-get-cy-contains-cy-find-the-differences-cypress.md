---
title: "cy.get() 🆚 cy.contains() 🆚 cy.find(). The differences. Cypress."
image: 
excerpt: "Cypress IO offers several commands to target and interact with elements, each with specific use cases. Three commonly used commands are...
"
date: 2024-11-15 20:00:00 +01:00
last_modified_at: 2024-11-15 20:00:00 +01:00
tags:
  - Cypress
---

Cypress IO offers several commands to target and interact with elements, each with specific use cases. Three commonly used commands are:
```
    cy.get(selector)
    cy.get(alias)
    cy.get(selector, options)
    cy.get(alias, options)

    cy.contains(content)
    cy.contains(content, options)
    cy.contains(selector, content)
    cy.contains(selector, content, options)

    .find(selector)
    .find(selector, options)
```
Understanding the differences between these commands can improve how you write tests and select DOM elements.

### cy.get()

Select elements based on a CSS selector. It’s similar to jQuery’s **$(selector)** and is used when you know the specific selectors like classes, IDs, or attributes. It always starts its search from the [cy.root](https://on.cypress.io/root) element.
*Example:*
```
    cy.get('.submit-button')
    cy.get('#username')
```
### cy.contains()

Use to select elements that contain specific text. This command is effective when you want to interact with elements based on their textual content, especially when the selector might change or is uncertain.
*Example:*
```
    cy.contains('Submit')
    cy.contains('div', 'Welcome')
    cy.contains(/^b\w+/)
    cy.get('#checkout-container').contains('Buy Now')
```
### cy.find()

Use to find descendants of a previously selected element, filtering by selector or containing text. It’s useful when you must scope down to a specific element within a parent element, refining a selection.
*Example:*
```
    cy.get('#header').find('.login-button')
```
### Differences:

***Scope and Use Case:***
> ***cy.get()***: Directly selects elements from the entire document based on a selector. Use this when you know the exact selectors needed to locate an element.
***cy.contains()***: Locates elements that include specific text, useful when the text content is key to finding the element, rather than its selectors.
 ***cy.find()***: Narrows down the search to the descendants of a previously selected element, which is valuable for targeting specific elements within a parent element without having to write a comprehensive selector.

### Flexibility and Specificity:
> ***cy.get() ***is very straightforward and requires a specific selector, which limits its use to scenarios where the exact structure of the HTML is known.
***cy.contains()*** offers more flexibility as it can target elements simply based on text, making it less brittle in response to changes in a website’s structure.
***cy.find()*** enhances the specificity of your tests by allowing a more segmented approach to DOM traversal and element selection.

### Options object

Pass in an options object to change the default behavior 
*Example:*
```
    cy.get('#header', { timeout: 10_000 }) 
    
    //{ timeout: 10_000 } is a options object
```
Differences:

![](https://cdn-images-1.medium.com/max/2000/1*Fur-rcWpRBCt_lDEhYVBuw.png)

### Conclusion:

When writing tests in Cypress IO, choosing the right command to select elements can make your tests more robust and less likely to break with UI changes.
Use ***cy.get()*** when you have a stable and unique CSS selector.
Choose ***cy.contains()*** when you need to find elements by their textual content, which can be especially useful in user-centric assertions or when selectors are too generic.
***cy.find()*** is your go-to when you need to drill down through the DOM from a specific parent, providing a granular and precise approach to element selection.

By focusing on the strengths of each command, you can write clearer, more maintainable, and more effective tests in Cypress IO.

***Thanks to everyone who read this article, I hope you found it useful.***