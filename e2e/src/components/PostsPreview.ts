import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {
    private readonly titleLocator = this.page.locator('h1.entry-title');
    private readonly descriptionLocator = this.page.locator('.entry-excerpt');
    private readonly keywordsLocator = this.page.locator('.entry-tags');
    private readonly imageLocator = this.page.locator('img.entry-image-thumbnail');
    private readonly dateLocator = this.page.locator('time.entry-time');
    private readonly readTimeLocator = this.page.locator(
        '.entry-meta ul li:nth-child(2)',
    );

    constructor(page: Page) {
        super(page);
    }

    public async getLatestPost(): Promise<Locator> {
        return this.page.locator('article.entry').nth(0);
    }

    public async title(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.titleLocator);
    }

    public async description(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.descriptionLocator);
    }

    public async keywords(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.keywordsLocator);
    }

    public async image(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.imageLocator);
    }

    public async date(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.dateLocator);
    }

    public async readTime(): Promise<Locator> {
        return (await this.getLatestPost()).locator(this.readTimeLocator);
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

    public async getTitle(): Promise<string> {
        const getPreviewTitle = await this.title();
        const title = await getPreviewTitle.innerText();
        return title;
    }

    public async getDate(): Promise<string> {
        const getDatePreview = await this.date();
        const date = await getDatePreview.innerText();
        return date;
    }

    public async getReadTime(): Promise<string> {
        const getPreviewReadTime = await this.readTime();
        const readTime = await getPreviewReadTime.innerText();
        return readTime;
    }
}
