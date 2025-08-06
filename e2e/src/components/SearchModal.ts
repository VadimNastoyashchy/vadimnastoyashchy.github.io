import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class SearchModal extends BaseComponent {
  private readonly container: Locator = this.page.locator('.search-content');
  public searchResults: Locator = this.container.locator('.entry');
  public searchInput: Locator = this.container.locator('.search-input');
  public resultCounter: Locator = this.container.locator('#results-count');

  constructor(page: Page) {
    super(page);
  }

  public async search(searchText: string): Promise<void> {
    await this.searchInput.pressSequentially(searchText);
    await this.searchInput.press('Enter');
  }

  public async clearSearchInput(): Promise<void> {
    await this.searchInput.clear();
  }

  public async getResultCounterValue(): Promise<number> {
    const text = await this.resultCounter.innerText();
    const match = text.match(/(\d+)\s+result\(s\)\s+found/i);

    if (!match) {
      throw new Error(`Unable to parse result count from: "${text}"`);
    }

    return Number(match[1]);
  }

  public async getResultsContaining(searchTerm: string): Promise<Locator> {
    return this.searchResults.filter({ hasText: new RegExp(searchTerm, 'i') });
  }

  public async getSearchResultTitle(searchResult: Locator): Promise<Locator> {
    return searchResult.locator('.entry-title');
  }

  public async getSearchResultDescription(
    searchResult: Locator
  ): Promise<Locator> {
    return searchResult.locator('.entry-excerpt');
  }
}
