import { Page, ElementHandle } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostComponent from '../components/PostComponent';

export default class HomePage extends BasePage {
    public postComponent: PostComponent;

    constructor(page: Page) {
        super(page, 'Home Page', '');
        this.postComponent = new PostComponent(page);
    }

    public async getAllPreviewPosts(): Promise<ElementHandle[]> {
        return await this.page.$$('article.entry');
    }

    public async verifyAllPreviewsVisible() {
        const previewPosts = await this.getAllPreviewPosts();
        for (const post of previewPosts) {
            await post.isVisible();
        }
    }
}