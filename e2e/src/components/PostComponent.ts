import { Page, expect } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostComponent extends BaseComponent {
    private selectors = {
        post: 'article.entry',
        title: 'h1.entry-title',
        description: '.entry-excerpt',
        keywords: '.entry-tags',
        image: 'img.entry-image-thumbnail',
        date: '.entry-time',
        readTime: '//li[contains(text(), "5 min read")]',
    };

    constructor(page: Page) {
        super(page);
    }

    private async checkVisibility(selector: string): Promise<void> {
        const element = this.page.locator(selector).first();
        await expect(element).toBeVisible();
    }

    public async checkPostVisibility(): Promise<void> {
        await this.checkVisibility(this.selectors.post);
        await this.checkVisibility(this.selectors.title);
        await this.checkVisibility(this.selectors.description);
        await this.checkVisibility(this.selectors.keywords);
        await this.checkVisibility(this.selectors.image);
        await this.checkVisibility(this.selectors.date);
        await this.checkVisibility(this.selectors.readTime);
    }

    public async navigateToFullPost(): Promise<void> {
        await this.page.getByText('Read more...').first().click();
        expect(this.page.url()).toContain(
            '/javascript-ui-test-automation-frameworks-latest-updates',
        );
    }

    public async getPreviewData(): Promise<{
        title: string;
        date: string;
        readTime: string;
    }> {
        const title = await this.page
            .locator(this.selectors.title)
            .first()
            .innerText();
        const date = await this.page
            .locator(this.selectors.date)
            .first()
            .innerText();
        const readTime = await this.page
            .locator(this.selectors.readTime)
            .first()
            .innerText();
        return { title, date, readTime };
    }
}
