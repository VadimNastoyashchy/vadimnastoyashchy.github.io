import { Page, expect } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostsPreview from '../components/PostsPreview';
import Footer from '../components/Footer';

export default class HomePage extends BasePage {
    public postsPreview: PostsPreview;
    public footer: Footer;

    constructor(page: Page) {
        super(page, 'Home Page', '');
        this.postsPreview = new PostsPreview(page);
        this.footer = new Footer(page);
    }

    public async isVisible(): Promise<void> {
        await super.open();
        expect(this.page.url()).toContain(await super.getPageUrl());
    }
}
