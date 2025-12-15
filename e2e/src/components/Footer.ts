import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Footer extends BaseComponent {
  public container: Locator = this.page.locator('#footer');
  public urls: Locator = this.container.locator('a');
  public copyright: Locator = this.container.locator('.copyright');

  constructor(page: Page) {
    super(page);
  }
}
