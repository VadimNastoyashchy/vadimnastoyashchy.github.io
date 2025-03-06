import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class SideMenu extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get container(): Locator {
    return this.page.locator('#sidebar');
  }

  get links(): Locator {
    return this.page.locator('#sidebar a');
  }

  get aboutLink(): Locator {
    return this.page.locator('.menu-item a[href="/about"]');
  }

  get homeLink(): Locator {
    return this.page.locator('.menu-item a[href="/"]');
  }

  public async clickOnAboutLink(): Promise<void> {
    await this.aboutLink.click();
  }

  public async clickOnHomeLink(): Promise<void> {
    await this.homeLink.click();
  }

  async getLinkByText(linkText: string): Promise<Locator> {
    return this.links.filter({ hasText: linkText });
  }
}
