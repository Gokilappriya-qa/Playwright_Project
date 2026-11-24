
import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

  // Locators
  private readonly categoriesHeading: Locator;
  private readonly shoppingLink: Locator;
  private readonly welcomeHeading: Locator;
  private readonly signOutButton: Locator;

  // Constructor
  constructor(page: Page) {
    super(page);

    this.categoriesHeading = page.getByRole('heading', {
      name: 'Categories',
      exact: true
    });

    this.shoppingLink = page.getByRole('link', {
      name: 'Shopping',
      exact: true
    });

    this.welcomeHeading = page.getByRole('heading', {
      name: /Welcome back, Automation Engineer/
    });

    this.signOutButton = page.getByRole('button', {
      name: 'Sign Out',
      exact: true
    });
  }

  // Navigation
  async open(): Promise<void> {
    await this.navigateTo('/home');
  }

  async openShopping(): Promise<void> {
    await this.shoppingLink.click();
  }

  // Actions
  async signOut(): Promise<void> {
    await this.signOutButton.click();
  }

  // Assertions
  async expectLoaded(): Promise<void> {
    await this.expectPath('/home');
    await expect(this.categoriesHeading).toBeVisible();
  }

  async expectAuthenticatedHome(): Promise<void> {
    await this.expectLoaded();
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.signOutButton).toBeVisible();
  }

  async expectShoppingLink(expectedPath: string): Promise<void> {
    await expect(this.categoriesHeading).toBeVisible();
    await expect(this.shoppingLink).toBeVisible();
    await expect(this.shoppingLink).toBeEnabled();
    await expect(this.shoppingLink).toHaveAttribute('href', expectedPath);
  }
}
