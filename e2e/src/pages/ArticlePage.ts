import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import ArticleContent from '../components/ArticleContent';

export default class ArticlePage extends BasePage {
  public articleContent: ArticleContent;

  constructor(page: Page) {
    super(page);
    this.articleContent = new ArticleContent(page);
  }
}
