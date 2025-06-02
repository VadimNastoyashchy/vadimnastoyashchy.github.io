import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class AboutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.page.locator('#hi-im-vadym');
  }

  get image(): Locator {
    return this.page.locator('.author-picture');
  }

  get contactMe(): Locator {
    return this.page.locator('#contact-me');
  }

  get textInfo(): Locator {
    return this.page.locator('a[href="/contact"]');
  }

  get allLinks(): Locator {
    return this.page.locator('.entry-content a');
  }
}
