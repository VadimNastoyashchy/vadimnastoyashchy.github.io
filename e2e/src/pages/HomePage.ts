import { Page, ElementHandle, expect } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostsPreview from '../components/PostsPreview';

export default class HomePage extends BasePage {
    public postsPreview: PostsPreview;

    constructor(page: Page) {
        super(page, 'Home Page', '');
        this.postsPreview = new PostsPreview(page);
    }
}
