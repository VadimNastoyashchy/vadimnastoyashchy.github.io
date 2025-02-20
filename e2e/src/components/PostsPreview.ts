import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {
    private readonly titleLocator = this.page.locator('h1.entry-title');
    private readonly descriptionLocator = this.page.locator('.entry-excerpt');
    private readonly keywordsLocator = this.page.locator('.entry-tags');
    private readonly imageLocator = this.page.locator('img.entry-image-thumbnail');
    private readonly dateLocator = this.page.locator('time.entry-time');
    private readonly readTimeLocator = this.page.locator('.entry-meta ul li:nth-child(2)');
    private readonly readMoreLinkLocator = this.page.locator('.read-more a');
    private readonly postLocator = this.page.locator('article.entry');
    private readonly searchResultPostsLocator = this.page.locator('.search-content article.entry');

    constructor(page: Page) {
        super(page);
    }

    get allPosts(): Locator {
        return this.postLocator;
    }

    get allReadMoreLinks(): Locator {
        return this.page.locator('.read-more');
    }

    get searchResultPosts(): Locator {
        return this.searchResultPostsLocator;
    }

    public getAllImages(): Locator {
        return this.page.locator('img.entry-image-thumbnail');
    }

    public async getLatestPost(): Promise<Locator> {
        return this.postLocator.nth(0);
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

    private async getLastReadMore(): Promise<Locator> {
        return this.readMoreLinkLocator.nth(0);
    }

    public async getPageUrlFromReadMoreLink(): Promise<null | string> {
        const latestReadMore = await this.getLastReadMore();
        const href = await latestReadMore.getAttribute('href');
        return href;
    }

    public async clickOnReadMore(): Promise<void> {
        return (await this.getLastReadMore()).click();
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

    public async getAllPosts(): Promise<Locator[]> {
        return await this.postLocator.all();
    }

    public async getAllReadMoreLinks(): Promise<Locator[]> {
        return this.readMoreLinkLocator.all();
    }

    public async getSearchResults(searchText: string): Promise<Locator[]> {
        const searchResults = await this.page.locator(`.entry-title:has-text("${searchText}")`).all();
        return searchResults;
    }
}
