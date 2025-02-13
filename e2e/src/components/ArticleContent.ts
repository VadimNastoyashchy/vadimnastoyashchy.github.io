import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class ArticleContent extends BaseComponent {
    private readonly titleLocator = this.page.locator('#page-title');
    private readonly dateLocator = this.page.locator('.byline-item').first();
    private readonly readTimeLocator = this.page.locator('.byline-item').last();
    private readonly imageLocator = this.page.locator('img');

    constructor(page: Page) {
        super(page);
    }

    public async getTitle(): Promise<string> {
        const title = await this.titleLocator.innerText();
        return title;
    }

    public async getDate(): Promise<string> {
        const date = await this.dateLocator.innerText();
        return date;
    }

    public async getReadTime(): Promise<string> {
        const readTime = await this.readTimeLocator.innerText();
        return readTime;
    }

    public async getAllImages(): Promise<Locator> {
        return this.imageLocator;
    }
}
