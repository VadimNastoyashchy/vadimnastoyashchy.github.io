import { Page } from '@playwright/test';

export default abstract class BaseComponent {
  constructor(protected readonly page: Page) {}
}
