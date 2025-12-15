import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';
import { step } from '../utils/step';

export default class Header extends BaseComponent {
  public burgerMenu: Locator = this.page.locator('.navicon-button');
  public logo: Locator = this.page.locator('.site-title a[href="/"]');
  public search: Locator = this.page.locator('.search-toggle');
  public searchInput: Locator = this.page.locator('.search-input');

  constructor(page: Page) {
    super(page);
  }

  @step()
  public async clickOnBurgerMenu(): Promise<void> {
    await this.burgerMenu.click();
  }

  @step()
  public async clickOnSearch(): Promise<void> {
    await this.search.click();
  }

  @step()
  public async clickOnLogo(): Promise<void> {
    await this.logo.click();
  }

  @step()
  public async fillSearchInput(searchText: string): Promise<void> {
    await this.searchInput.fill(searchText);
  }
}
