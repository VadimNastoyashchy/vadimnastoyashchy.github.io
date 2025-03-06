import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Header extends BaseComponent {
  private readonly burgerMenuLocator = this.page.locator('.navicon-button');
  private readonly searchLocator = this.page.locator('.search-toggle');
  private readonly searchInputLocator = this.page.locator('.search-input');
  private readonly logoLinkLocator = this.page.locator(
    '.site-title a[href="/"]'
  );

  constructor(page: Page) {
    super(page);
  }

  get burgerMenu(): Locator {
    return this.burgerMenuLocator;
  }

  get logo(): Locator {
    return this.logoLinkLocator;
  }

  get search(): Locator {
    return this.searchLocator;
  }

  get searchInput(): Locator {
    return this.searchInputLocator;
  }

  public async clickOnBurgerMenu(): Promise<void> {
    return this.burgerMenuLocator.click();
  }

  public async clickOnSearch(): Promise<void> {
    return this.searchLocator.click();
  }

  public async clickOnLogo(): Promise<void> {
    return this.logoLinkLocator.click();
  }

  public async fillSearchInput(searchText: string): Promise<void> {
    return this.searchInputLocator.fill(searchText);
  }

  public async submitSearch(): Promise<void> {
    return this.searchInputLocator.press('Enter');
  }
}
