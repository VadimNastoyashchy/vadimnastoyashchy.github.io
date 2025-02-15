import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostsPreview from '../components/PostsPreview';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

export default class HomePage extends BasePage {
    public postsPreview: PostsPreview;
    public footer: Footer;
    public header: Header;
    public sideMenu: SideMenu;

    constructor(page: Page) {
        super(page, 'Home Page', '');
        this.postsPreview = new PostsPreview(page);
        this.footer = new Footer(page);
        this.header = new Header(page);
        this.sideMenu = new SideMenu(page);
    }
}
