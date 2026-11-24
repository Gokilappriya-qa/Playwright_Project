
import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ShoppingPage extends BasePage {

  // Locators
  private readonly productsHeading: Locator;
  private readonly searchField: Locator;
  private readonly categoryFilter: Locator;
  private readonly priceFilter: Locator;
  private readonly checkoutButton: Locator;
  private readonly resetFiltersButton: Locator;
  private readonly emptyResultsMessage: Locator;

  // Constructor
  constructor(page: Page) {
    super(page);

    this.productsHeading = page.getByRole('heading', {
      name: 'Products',
      exact: true
    });

    this.searchField = page.getByPlaceholder('Search products...');

    this.categoryFilter = page.getByRole('combobox').nth(0);

    this.priceFilter = page.getByRole('combobox').nth(1);

    this.checkoutButton = page.getByRole('button', {
      name: /^Checkout Items:/
    });

    this.resetFiltersButton = page.getByRole('button', {
      name: 'Reset Filters',
      exact: true
    });

    this.emptyResultsMessage = page.getByText(
      'No products found matching your current filters.',
      { exact: true }
    );
  }

  // Product Card Locator
  private productCard(name: string): Locator {
    return this.page.getByText(name, { exact: true }).locator('xpath=..');
  }

  // Navigation
  async open(): Promise<void> {
    await this.navigateTo('/shopping');
  }

  async openCart(): Promise<void> {
    await this.checkoutButton.click();
  }

  // Actions
  async searchFor(term: string): Promise<void> {
    await this.searchField.fill(term);
  }

  async selectCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption({ label: category });
  }

  async selectPriceRange(range: string): Promise<void> {
    await this.priceFilter.selectOption({ label: range });
  }

  async resetFilters(): Promise<void> {
    await this.resetFiltersButton.click();
  }

  async addProductToCart(name: string): Promise<void> {
    await this.productCard(name)
      .getByRole('button', { name: /Add to Cart/ })
      .click();
  }

  // Assertions
  async expectLoaded(path = '/shopping'): Promise<void> {
    await this.expectPath(path);
    await expect(this.productsHeading).toBeVisible();
    await expect(this.searchField).toBeVisible();
    await expect(this.categoryFilter).toBeVisible();
    await expect(this.priceFilter).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.checkoutButton)
      .toHaveAccessibleName(`Checkout Items: ${count}`);
  }

  async expectProductCard(
    name: string,
    category: string,
    price: string
  ): Promise<void> {
    const card = this.productCard(name);

    await expect(card.getByRole('img', { name, exact: true })).toBeVisible();
    await expect(card.getByText(category, { exact: true })).toBeVisible();
    await expect(card.getByText(name, { exact: true })).toBeVisible();
    await expect(card.getByText(price, { exact: true })).toBeVisible();
    await expect(card.getByRole('button', { name: /Add to Cart/ })).toBeEnabled();
  }

  async expectProductVisible(name: string): Promise<void> {
    await expect(
      this.page.getByText(name, { exact: true })
    ).toBeVisible();
  }

  async expectProductAbsent(name: string): Promise<void> {
    await expect(
      this.page.getByText(name, { exact: true })
    ).toHaveCount(0);
  }

  async expectEmptyResults(): Promise<void> {
    await expect(this.emptyResultsMessage).toBeVisible();

    await expect(
      this.page.getByRole('button', {
        name: 'Reset All Filters',
        exact: true
      })
    ).toBeVisible();
  }

  async expectDefaultFilters(): Promise<void> {
    await expect(this.searchField).toHaveValue('');

    await expect(
      this.categoryFilter.locator('option:checked')
    ).toHaveText('All Categories');

    await expect(
      this.priceFilter.locator('option:checked')
    ).toHaveText('All Prices');
  }

  async expectProductCartQuantity(
    name: string,
    quantity: number
  ): Promise<void> {
    await expect(
      this.productCard(name).getByRole('button', {
        name: `Add to Cart (${quantity})`
      })
    ).toBeVisible();
  }
}
