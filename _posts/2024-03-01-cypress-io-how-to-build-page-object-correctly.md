---
title: "Cypress IO. How to build Page Object correctly."
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "This article is useful for test automation engineers or developers who are involved in testing and want to improve their testing framework skills to use Page Object models to organize testing, maintenance, and communication with each other. It may also be useful for those engineers who are already using this method but would like to hear a different point of view.
Earlier I talked about the Page object and how it can be implemented using the Playwright as an example. Now I want to demonstrate an approach, using all the features of Cypress.
So let’s take a look at the most common scenario of logging in and verifying that the user is logged in:"
date: 2024-03-01 20:00:00 +01:00
last_modified_at: 2024-03-01 20:00:00 +01:00
tags:
  - JavaScript
  - Cypress
  - PageObject
  - Pattern
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-03-01-cypress-io-how-to-build-page-object-correctly/0_VyJt9BTbzRk3q6rq.webp){: .align-center .border .max-width-600px}

This article is useful for test automation engineers or developers who are involved in testing and want to improve their testing framework skills to use Page Object models to organize testing, maintenance, and communication with each other. It may also be useful for those engineers who are already using this method but would like to hear a different point of view.
Earlier I talked about the Page object and how it can be implemented using the Playwright as an example. Now I want to demonstrate an approach, using all the features of Cypress.
So let’s take a look at the most common scenario of logging in and verifying that the user is logged in:

```
describe('Login and Logout tests', () => {
  it('Login and Logout first user in page', () => {

      cy.visit('https://www.demoblaze.com/index.html')

      cy
        .location('href')
        .should('include', 'https://www.demoblaze.com/index.html')

      cy.get('#login2').click()

      cy.get('.modal-dialog #loginusername')
        .clear()
        .type('SarahConnor')

      cy.get('.modal-dialog #loginpassword')
        .clear()
        .type('12345678')

      cy.get('.modal-footer > .btn-primary')
        .contains('Log in')
        .click()

      cy.get('#nameofuser').should('have.text', 'Welcome SarahConnor');

      cy.get('#logout2').click()

      cy
        .location('href')
        .should('include', 'https://www.demoblaze.com/index.html')
    
      cy.get('#login2').should('have.text', 'Log in');
  });
});
```

Again, this looks like a mess that will be difficult to maintain if we continue writing tests in this style. Of course, we can tweak and reuse our code a bit, but we will still need to solve our problem globally.

```
describe('Login and Logout tests', () => {
    it('Login and Logout first user in page', () => {

      const homePage = 'https://www.demoblaze.com/index.html'
      const userName = 'SarahConnor'
      const checkLocation = (url) => cy.location('href').should('include', url)

      cy.visit(homePage)

      checkLocation(homePage)

      cy.get('#login2').click()

      cy.get('.modal-dialog #loginusername')
        .clear()
        .type(userName)

      cy.get('.modal-dialog #loginpassword')
        .clear()
        .type('12345678')

      cy.get('.modal-footer > .btn-primary')
        .contains('Log in')
        .click()

      cy.get('#nameofuser').should('have.text', `Welcome ${userName}`);

      cy.get('#logout2').click()

      checkLocation(homePage)

      cy.get('#login2').should('have.text', 'Log in');
    });
});
```

It’s better, but is it worth the time to keep refactoring code and still difficult to maintain and scale?
Let’s start the normal refactoring! Below is our new folder structure:

![_config.yml]({{ site.url }}/assets/images/posts/2024-03-01-cypress-io-how-to-build-page-object-correctly/1_BEvihKcfRkSUVTsxUHB_cw.webp){: .align-center .border .max-width-600px}

![_config.yml]({{ site.url }}/assets/images/posts/2024-03-01-cypress-io-how-to-build-page-object-correctly/1_qDIpUUduRDAYQvKq0FK5Dw.webp){: .align-center .border .max-width-600px}

Now let’s have a look at the way we have in mind:

```
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
```

Our brand new `Base` and `Home Page`:

```
export default abstract class BasePage {

    protected readonly PAGE_URL: string;

    constructor(pageUrl: string = '') {
        this.PAGE_URL = pageUrl;
    }

    public visit(): this {
        cy.visit(`${Cypress.config('baseUrl')}${this.PAGE_URL}`, {
            failOnStatusCode: false,
        });
        return this;
    }

    public checkPageUrl(): this {
        cy.location('href').should('include', `${Cypress.config('baseUrl')}${this.PAGE_URL}`);
        return this;
    }
}
```

```
import Header from '../components/Header';
import LogInModal from '../modals/LogInModal';
import BasePage from '../base/BasePage';

export default class HomePage extends BasePage {

  public header: Header = new Header();
  public logInModal: LogInModal = new LogInModal();

  constructor() {
    super('index.html');
  }
}
```

`Base` and `Login` modal:

```
export default abstract class BaseModal {

    protected readonly MODAL_CONTAINER: string;
    protected readonly MODAL_FOOTER_CONTAINER: string = '.modal-footer';

    constructor(modalContainer: string = '') {
        this.MODAL_CONTAINER = modalContainer;
    }

    protected get modalFooterButton(): Cypress.Chainable {
        return cy.get(`${this.MODAL_FOOTER_CONTAINER} > .btn-primary`);
    }
}
```

```
import BaseModal from '../base/BaseModal';
import HomePage from '../pages/HomePage';

export default class LogInModal extends BaseModal {

  constructor() {
    super('.modal-dialog');
  }

  private get inputUserNameField(): Cypress.Chainable {
    return cy.get(`${this.MODAL_BODY_CONTAINER} #loginusername`);
  }

  private get inputPasswordField(): Cypress.Chainable {
    return cy.get(`${this.MODAL_BODY_CONTAINER} #loginpassword`);
  }

  private enterEmail(userName: string): this {
    this.inputUserNameField
      .should('be.visible')
      .clear()
      .type(userName);
    return this;
  }

  private enterPassword(password: string): this {
    this.inputPasswordField
      .should('be.visible')
      .clear()
      .type(password);
    return this;
  }

  private clickOnLogInButton(): void {
    this.modalFooterButton
      .contains('Log in')
      .click();
  }

  public logInWithCredentials(name: string, password: string): HomePage {
    this.enterEmail(name);
    this.enterPassword(password);
    this.clickOnLogInButton();
    return new HomePage();
  }

  public checkFooterLogInButton(textButton: string): this {
    this.modalFooterButton.contains(textButton).should('be.visible');
    return this;
  }
}
```

`Header` component:

```
export default class Header {

  private get logInButton(): Cypress.Chainable {
    return cy.get('#login2');
  }

  private get logOutButton(): Cypress.Chainable {
    return cy.get('#logout2');
  }

  public clickOnLogInButton(): this {
    this.logInButton.contains('Log in').click();
    return this;
  }

  public checkUserName(userName: string): this {
    this.userNameInHeader.should('have.text', `Welcome ${userName}`);
    return this;
  }

  public clickOnLogOutButton(): this {
    this.logOutButton.click();
    return this;
  }

  public checkLogInButton(): this {
    this.logInButton.should('have.text', 'Log in');
    return this;
  }
}
```

Our code is now more readable. It is easier to add new functionality and more understandable.
Of course, we can also use a mix of Page object & App actions as commands, since Cypress allows you to use it:
`cypress/support/commands.js`

```
Cypress.Commands.add('logInWithApi', (email, password) => {
    cy.request({
        method: 'POST',
        url: Cypress.config('loginAPIUrl'),
        form: true,
        body: {
            email: email,
            passwd: password,
            back: 'my-account',
            SubmitLogin: ''
        }
    });
});
```

Now your tests are even better and look like this:

```
import HomePage from '../src/pages/HomePage';
import ProductPage from '../src/pages/ProductPage';

describe('Order test', () => {
    it('Check the addition of the first mobile product to the basket', () => {
        const homePage: HomePage = new HomePage();
        const firstMobileTitleProductItem: string = 'Samsung galaxy s6';

        homePage
            .visit()
            .categories.clickOnPhonesCategoryButton()
            .clickOnFirstTitleProductItem()
            .checkProductName(firstMobileTitleProductItem)
            .clickAddToCardButton()
            .checkAlertWindow()
            .header.clickOnCartButton()
            .checkThatProductVisibleInCart()
            .checkFirstProductThatAddedInCard(firstMobileTitleProductItem);
    });
});
```

or:

```
import HomePage from '../src/pages/HomePage';

describe('Functionality tests', () => {
    it('Check that the product exists in the Phone category', () => {
        const homePage: HomePage = new HomePage();

        homePage
            .visit()
            .categories.clickOnPhonesCategoryButton()
            .checkFirstProductItemIsVisible();
    });

    it('Check that the product exists in the Laptops category', () => {
        const homePage: HomePage = new HomePage();

        homePage
            .visit()
            .categories.clickOnLaptopsCategoryButton()
            .checkFirstProductItemIsVisible();
    });

    it('Check that the product exists in the Monitors category', () => {
        const homePage: HomePage = new HomePage();

        homePage
            .visit()
            .categories.clickOnMonitorsCategoryButton()
            .checkFirstProductItemIsVisible();
    });

    it('Check that the carousel works consistently.', () => {
        const homePage: HomePage = new HomePage();

        homePage
            .visit()
            .carousel.clickCarouselNextButton()
            .checkActiveItem('Second slide')
            .clickCarouselPreviousButton()
            .checkActiveItem('First slide')
            .clickCarouselNextButton()
            .checkActiveItem('Second slide')
            .clickCarouselNextButton()
            .checkActiveItem('Third slide')
            .clickCarouselNextButton()
            .checkActiveItem('First slide');
    });
});
```

Example repo:
[https://github.com/VadimNastoyashchy/demoblaze.com](https://github.com/VadimNastoyashchy/demoblaze.com)

Thanks to everyone who read this article to the end, I hope you found it useful.