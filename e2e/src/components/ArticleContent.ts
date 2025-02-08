import { Page, Locator, expect } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class ArticleContent extends BaseComponent {
    private readonly title = this.page.locator('#page-title');
    private readonly date = this.page.locator('.byline-item').first();
    private readonly readTime = this.page.locator('.byline-item').last();
    private readonly image = this.page.locator('img');

    constructor(page: Page) {
        super(page);
    }

    public async getTitleArticleData(): Promise<string> {
        const title = await this.title.innerText();
        return title;
    }

    public async getDateArticleData(): Promise<string> {
        const date = await this.date.innerText();
        return date;
    }

    public async getReadTimeArticleData(): Promise<string> {
        const readTime = await this.readTime.innerText();
        return readTime;
    }

    public async getAllImages(): Promise<Locator> {
        return this.image;
    }

    public async elementsAreVisible(elements: Locator): Promise<void> {
        for (let i = 0; i < (await elements.count()); i++) {
            const element = elements.nth(i);
            await expect(element).toBeVisible();
        }
    }
}
