import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Header extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get burgerMenu(): Locator {
    return this.page.locator('.navicon-button');
  }

  get logo(): Locator {
    return this.page.locator('.site-title a[href="/"]');
  }

  get search(): Locator {
    return this.page.locator('.search-toggle');
  }

  get searchInput(): Locator {
    return this.page.locator('.search-input');
  }

  public async clickOnBurgerMenu(): Promise<void> {
    await this.burgerMenu.click();
  }

  public async clickOnSearch(): Promise<void> {
    await this.search.click();
  }

  public async clickOnLogo(): Promise<void> {
    await this.logo.click();
  }

  public async fillSearchInput(searchText: string): Promise<void> {
    await this.searchInput.fill(searchText);
  }

  public async submitSearch(): Promise<void> {
    await this.searchInput.press('Enter');
  }
}
