import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {

    private readonly title = this.page.locator('h1.entry-title');
    private readonly description = this.page.locator('.entry-excerpt');
    private readonly keywords = this.page.locator('.entry-tags');
    private readonly image = this.page.locator('img.entry-image-thumbnail');
    private readonly dateAndReadTime = this.page.locator('footer.entry-meta');

    constructor(page: Page) {
        super(page);
    }

    public async getLatestPost(): Promise<Locator> {
        return (this.page.locator('article.entry').nth(0));
    }

    public async getTitle(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.title);
    }

    public async getDescription(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.description);
    }

    public async getKeywords(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.keywords);
    }

    public async getImage(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.image);
    }

    public async getDateAndReadTime(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.dateAndReadTime);
    }

    private async getArrayReadMoreBtn(): Promise<Array<Locator>> {
        return await this.page.locator('//a[text()="Read more..."]').all();
    }

    public async clickOnReadMoreBtn(): Promise<void> {
        return ((await this.getArrayReadMoreBtn())[0]).click();
    }

    public async getTitlePreviewData(): Promise<string> {
        const getPreviewTitle = await this.getTitle()
        const title = await getPreviewTitle.innerText()
        return title;
    }

    public async getDateAndReadTimePreviewData(): Promise<string> {
        const getPreviewDataAndReadTime = await this.getDateAndReadTime()
        const dateAndReadTime = await getPreviewDataAndReadTime.innerText()
        return dateAndReadTime;
    }
    
}