import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {
    private readonly title = this.page.locator('h1.entry-title');
    private readonly description = this.page.locator('.entry-excerpt');
    private readonly keywords = this.page.locator('.entry-tags');
    private readonly image = this.page.locator('img.entry-image-thumbnail');
    private readonly date = this.page.locator('time.entry-time');
    private readonly readTime = this.page.locator(
        '.entry-meta ul li:nth-child(2)',
    );

    constructor(page: Page) {
        super(page);
    }

    public async getLatestPost(): Promise<Locator> {
        return this.page.locator('article.entry').nth(0);
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

    public async getDate(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.date);
    }

    public async getReadTime(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.readTime);
    }

    private async getReadMore(): Promise<Locator> {
        return this.page.locator('.read-more a').nth(0);
    }

    public async getPageUrlFromReadMoreLink(): Promise<null | string> {
        const latestReadMore = await this.getReadMore();
        const href = await latestReadMore.getAttribute('href');
        return href;
    }

    public async clickOnReadMore(): Promise<void> {
        return (await this.getReadMore()).click();
    }

    public async getTitlePreviewData(): Promise<string> {
        const getPreviewTitle = await this.getTitle();
        const title = await getPreviewTitle.innerText();
        return title;
    }

    public async getDatePreviewData(): Promise<string> {
        const getDatePreview = await this.getDate();
        const date = await getDatePreview.innerText();
        return date;
    }

    public async getReadTimePreviewData(): Promise<string> {
        const getPreviewReadTime = await this.getReadTime();
        const readTime = await getPreviewReadTime.innerText();
        return readTime;
    }
}
