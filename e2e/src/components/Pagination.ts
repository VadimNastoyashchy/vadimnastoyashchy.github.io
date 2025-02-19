import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Pagination extends BaseComponent {
    private readonly paginationLocator = this.page.locator('nav.pager');
    private readonly paginationButtonLocator = this.page.locator('nav.pager a');
    private readonly olderButtonLocator = this.page.locator('nav.pager a.next');
    private readonly newerButtonLocator = this.page.locator('nav.pager a.previous');

    constructor(page: Page) {
        super(page);
    }

    get paginationSection(): Locator {
        return this.paginationLocator;
    }

    get olderButton(): Locator {
        return this.olderButtonLocator;
    }

    get newerButton(): Locator {
        return this.newerButtonLocator;
    }

    public async clickOlderButton(): Promise<void> {
        await this.paginationButtonLocator.click();
    }

    public async clickNewerButton(): Promise<void> {
        await this.newerButtonLocator.click();
    }
}