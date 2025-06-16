import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Header extends BaseComponent {
  public burgerMenu: Locator = this.page.locator('.navicon-button');
  public logo: Locator = this.page.locator('.site-title a[href="/"]');
  public search: Locator = this.page.locator('.search-toggle');
  public searchInput: Locator = this.page.locator('.search-input');

  constructor(page: Page) {
    super(page);
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
}
