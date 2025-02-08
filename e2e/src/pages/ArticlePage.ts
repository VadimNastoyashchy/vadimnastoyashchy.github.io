import { Page, type Locator, ElementHandle } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class ArticlePage extends BasePage {

    private readonly title = this.page.locator('#page-title');
    private readonly image = this.page.locator('img.align-center'); ////not suitable for all articles as they have other img
    private readonly date = (this.page.locator('.byline-item')).first();
    private readonly readTime = (this.page.locator('.byline-item')).last();

    constructor(page: Page) {
        super( page, 'Article Page', '');
    }

    public async getArticleData(): Promise<{title: string; date: string; readTime: string;}> {
        const title = await this.title.innerText();
        const date = await this.date.innerText();
        const readTime = await this.readTime.innerText();
        console.log(title, date, readTime)
        return { title, date, readTime };
    }

    public async verifyImageVisible(): Promise<void> { //isVisible()
        await this.image.isVisible();
    }
}
