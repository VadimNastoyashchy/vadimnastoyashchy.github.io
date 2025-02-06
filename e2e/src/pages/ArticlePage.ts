import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class ArticlePage extends BasePage {
    private selectors = {
        title: '#page-title',
        date: '//*[contains(text(), "February 3, 2025")]',
        readTime: '//*[contains(text(), "5 min read")]'
    };

    constructor(page: Page) {
        super(page, 'Article Page', 'javascript-ui-test-automation-frameworks-latest-updates');
    }

    public async getArticleData(): Promise<{ title: string; date: string; readTime: string }> {
        const title = await this.page.locator(this.selectors.title).innerText();
        const date = await this.page.locator(this.selectors.date).innerText();
        const readTime = await this.page.locator(this.selectors.readTime).innerText();
        return { title, date, readTime };
    }

    public async verifyImageVisible(): Promise<void> {
        await this.page.locator('img.align-center').isVisible()
    }
}