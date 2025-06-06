import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Pagination extends BaseComponent {
  private container: Locator = this.page.locator('nav.pager');
  public olderButton: Locator = this.container.locator('a.next');
  public newerButton: Locator = this.container.locator('a.previous');

  constructor(page: Page) {
    super(page);
  }

  public async clickOnOlderButton(): Promise<void> {
    await this.olderButton.click();
  }

  public async clickOnNewerButton(): Promise<void> {
    await this.newerButton.click();
  }
}
