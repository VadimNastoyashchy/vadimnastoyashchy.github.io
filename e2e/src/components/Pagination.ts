import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';
import { step } from '../utils/step';

export default class Pagination extends BaseComponent {
  public container: Locator = this.page.locator('nav.pager');
  public olderButton: Locator = this.container.locator('a.next');
  public newerButton: Locator = this.container.locator('a.previous');

  constructor(page: Page) {
    super(page);
  }

  @step()
  public async clickOnOlderButton(): Promise<void> {
    await this.olderButton.click();
  }

  @step()
  public async clickOnNewerButton(): Promise<void> {
    await this.newerButton.click();
  }
}
