---
title: "💁‍♂️What is a Testing Piramide?"
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "In the world of software development, ensuring that an application is bug-free and works as intended is critical. That’s where the “testing pyramid” comes in. The testing pyramid is a concept that helps us understand how to efficiently organize testing efforts to achieve the best results.
"
date: 2024-10-15 20:00:00 +01:00
last_modified_at: 2024-10-15 20:00:00 +01:00
tags:
  - Testing
---

In the world of software development, ensuring that an application is bug-free and works as intended is critical. That’s where the “testing pyramid” comes in. The testing pyramid is a concept that helps us understand how to efficiently organize testing efforts to achieve the best results.

![[cdn.britannica.com/06/122506–050-C8E03A8A/Pyramid-…](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Ftechnology%2Fpyramid-architecture&psig=AOvVaw1OsLkcttIiiY_aXAT_sTHg&ust=1729055802077000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCMj0tPjQj4kDFQAAAAAdAAAAABAE)](https://cdn-images-1.medium.com/max/3200/0*45yhYRhkDwSJ9_eR.jpg)*[cdn.britannica.com/06/122506–050-C8E03A8A/Pyramid-…](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Ftechnology%2Fpyramid-architecture&psig=AOvVaw1OsLkcttIiiY_aXAT_sTHg&ust=1729055802077000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCMj0tPjQj4kDFQAAAAAdAAAAABAE)*

### What is the Testing Pyramid?

The testing pyramid is a visual metaphor that describes the ideal distribution of software test types across three levels: unit tests, integration tests, and end-to-end tests. The shape of the pyramid illustrates the number of tests you should have at each level at the bottom (unit tests), less at the top (end-to-end tests).

![](https://cdn-images-1.medium.com/max/NaN/0*p1H0FM-RvzQPg6Kn.png)

### The Layers of the Testing Pyramid:
> ***Unit Tests (Bottom Layer):*** These tests cover the smallest parts of an application, typically individual functions or methods. Unit tests are quick to execute and aim to ensure that each piece of code performs its specific function correctly.

Example: toLowerCase is a function that accepts a single parameter str of type string, and returns a string or null. The function checks if the input is a string. If it is, it converts the string to lowercase. If the input is null or undefined, it returns null. If the input is of any other type (not a string), it returns the input unchanged.

    const toLowerCase: IDataTransformer = (str: string) => {
      let result = str ?? null
      if (typeof result === 'string') {
        result = result.toLowerCase()
      }
      return result
    }

    describe('data.toLowerCase', () => {
        it('returns a string in lower case format', () => {
          expect(data.toLowerCase('ANY')).toBe('any')
        })
        it('returns null for null input', () => {
          expect(data.toLowerCase(null)).toBeNull()
        })
        it('returns null for undefined input', () => {
          expect(data.toLowerCase(undefined)).toBeNull()
        })
        it('returns input without changes if not a string given', () => {
          expect(data.toLowerCase([])).toStrictEqual([])
          expect(data.toLowerCase({})).toStrictEqual({})
          expect(data.toLowerCase(true)).toBe(true)
        })
      })
> ***Integration Tests (Middle Layer): ***As the name implies, integration tests check how different modules or services work together. These tests are vital because they help detect issues that occur when units interact.

Example: For the same calculator app, an integration test could check if the user interface correctly passes values to the calculation module and displays the results as expected.

    const axios = require('axios')
    const expect = require('chai').expect
    
    const baseURL = 'http://localhost:3000/api'
    
    describe('Calculator API Integration Tests', () => {
      describe('Addition Operation', () => {
        it('should add two numbers correctly', async () => {
          const requestBody = {
            operation: 'add',
            numbers: [5, 3]
          };
    
          try {
            const response = await axios.post(`${baseURL}/calculate`, requestBody)
    
            expect(response.status).to.equal(200)
    
            expect(response.data.result).to.equal(8)
    
          } catch (error) {
            throw new Error('Failed to communicate with the calculator API')
          }
        })
      })
    })
> ***End-to-End Tests (Top Layer):*** These tests simulate real user scenarios from start to finish, ensuring the system as a whole functions correctly in a production-like environment. They are the most comprehensive but also the most time-consuming and resource-intensive.

Example: An end-to-end test might simulate a user login

    import HomePage from '../src/pages/HomePage';
    import { Accounts } from '../src/Accounts';
    import Credentials from '../src/Credentials';
    
    describe('Login and Logout tests', () => {
        it('Login and Logout first user in page', () => {
            const homePage: HomePage = new HomePage();
            const { name, password } = Credentials.getCredentials(Accounts.Active);
    
            homePage
                .visit()
                .checkPageUrl()
                .header.clickOnLogInButton();
    
            homePage.logInModal
                .logInWithCredentials(name, password)
                .header.checkUserName(name)
                .clickOnLogOutButton();
    
            homePage
                .checkPageUrl()
                .header.checkLogInButton();
        });
    });

### Differences Between the Layers and Their Importance
> ***Speed and Scope:*** Unit tests are the fastest and narrowest in scope. End-to-end tests, being the slowest, cover the full functionality of the application.
***Cost and Maintenance:*** Unit tests are cheaper to run and easier to maintain, while end-to-end tests can be costly and complex to maintain due to their reliance on fully integrated systems.
***Fault Isolation: ***Unit tests are better for isolating defects at a micro-level; integration and end-to-end tests diagnose issues in the interactions and overall experience, respectively.

### Ideal Test Distribution

In general, a recommended distribution following the testing pyramid would be:
***Unit Tests: 70–80%
Integration Tests: 15–20%
End-to-End Tests: 5–10%***

This distribution ensures that most testing effort is efficiently focused on lower-level tests which are easier and cheaper to maintain while providing significant coverage at all levels.

### Conclusion

The testing pyramid serves as a guideline for achieving balanced software validation. It emphasizes the importance of building a solid base of unit tests, supplemented by critical integration tests and crucial end-to-end tests. This approach helps maintain high software quality without escalating costs or resource consumption. As methodologies evolve, the testing pyramid remains fundamental for understanding effective software testing strategies for developers and testers alike.

***Thanks to everyone who read this article, I hope you found it useful.***