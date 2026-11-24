import { expect, type Page } from '@playwright/test';
import { appUrl } from '../utils/app-config';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(appUrl(path));
  }

  protected async expectPath(path: string): Promise<void> {
    await expect(this.page).toHaveURL(appUrl(path));
  }
}
