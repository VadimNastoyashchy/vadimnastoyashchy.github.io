import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class AboutPage extends BasePage {
  public title: Locator = this.page.locator('#hi-im-vadym');
  public image: Locator = this.page.locator('.author-picture');
  public contactMe: Locator = this.page.locator('#contact-me');
  public allLinks: Locator = this.page.locator('#main a');

  constructor(page: Page) {
    super(page);
  }
}
