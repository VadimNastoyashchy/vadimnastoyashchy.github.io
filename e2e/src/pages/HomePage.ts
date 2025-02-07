import { Page, ElementHandle, expect } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostsPreview from '../components/PostsPreview';

export default class HomePage extends BasePage {
    public postsPreview: PostsPreview;

    constructor(page: Page) {
        super(page, 'Home Page', '');
        this.postsPreview = new PostsPreview(page);
    }

    public async getAllPreviewPosts(): Promise<ElementHandle[]> {
        return await this.page.$$('article.entry');
    }

    public async verifyAllPreviewsVisible(): Promise<void> {
        const previewPosts = await this.getAllPreviewPosts();
        for (const post of previewPosts) {
            const visible = await post.isVisible();
            expect(visible).toBe(true);
            //console.log(visible)
        }
    }
}
