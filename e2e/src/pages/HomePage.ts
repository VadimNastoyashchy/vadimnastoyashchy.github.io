import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import PostsPreview from '../components/PostsPreview';
import Pagination from '../components/Pagination';

export default class HomePage extends BasePage {
  public postsPreview: PostsPreview;
  public pagination: Pagination;

  constructor(page: Page) {
    super(page);
    this.postsPreview = new PostsPreview(page);
    this.pagination = new Pagination(page);
  }
}
