import { Page, expect, ElementHandle } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {

    private readonly title = this.page.locator('h1.entry-title');
    private readonly description = this.page.locator('.entry-excerpt');
    private readonly keywords = this.page.locator('.entry-tags');
    private readonly image = this.page.locator('img.entry-image-thumbnail');
    private readonly dateAndReadTime = this.page.locator('footer.entry-meta');
    //private readonly readTime = this.page.locator('//li[contains(text(), "5 min read")]'); //not suitable selector

    constructor(page: Page) {
        super(page);
    }

    private async getArrayPosts(): Promise<ElementHandle[]> {
        return await this.page.$$('.entries-list');
    }

    public async getLatestPost(): Promise<ElementHandle> {
        const posts = await this.getArrayPosts();
        console.log(posts[0])
        return posts[0]
    }

    // public async getData(): Promise<ElementHandle> {
    //     this.getLatestPost
    // }

    async checkPostVisibility(): Promise<void> {
        // await expect((this.title).first()).toBeVisible();
        // await expect((this.description).first()).toBeVisible();
        // await expect((this.keywords).first()).toBeVisible();
        // await expect((this.image).first()).toBeVisible();
        // await expect((this.date).first()).toBeVisible();
        // await expect((this.readTime).first()).toBeVisible();
    }


    public async navigateToFullPost(): Promise<void> {
        await this.page.getByText('Read more...').first().click();
        expect(this.page.url()).toContain('');
    }

    public async getPreviewData(): Promise<{title: string; dateAndReadTime: string;}> {
        const title = await this.title.first().innerText();
        const dateAndReadTime = await this.dateAndReadTime.first().innerText();
        return { title, dateAndReadTime };
    }
}