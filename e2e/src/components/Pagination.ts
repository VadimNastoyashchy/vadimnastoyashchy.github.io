import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Pagination extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get paginationSection(): Locator {
    return this.page.locator('nav.pager');
  }

  get olderButton(): Locator {
    return this.page.locator('nav.pager a.next');
  }

  get newerButton(): Locator {
    return this.page.locator('nav.pager a.previous');
  }

  public async clickOnOlderButton(): Promise<void> {
    await this.olderButton.click();
  }

  public async clickOnNewerButton(): Promise<void> {
    await this.newerButton.click();
  }
}
