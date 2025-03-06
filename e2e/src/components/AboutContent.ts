import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class AboutContent extends BaseComponent {
  private readonly titleLocator = this.page.locator('#hi-im-vadym');
  private readonly imageLocator = this.page.locator('.about-description');
  private readonly contactMeLocator = this.page.locator('contact-me');
  private readonly textInfoLocator = this.page.locator('a[href="/contact"]');
  private readonly allLinksLocator = this.page.locator('.entry-content a');

  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.titleLocator;
  }

  get image(): Locator {
    return this.imageLocator;
  }

  get contactMe(): Locator {
    return this.contactMeLocator;
  }

  get textInfo(): Locator {
    return this.textInfoLocator;
  }

  get allLinks(): Locator {
    return this.allLinksLocator;
  }
}
