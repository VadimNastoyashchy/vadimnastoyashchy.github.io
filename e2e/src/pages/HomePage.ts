import { Page } from '@playwright/test';
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
}
