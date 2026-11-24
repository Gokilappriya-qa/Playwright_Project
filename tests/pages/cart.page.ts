
import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {

  // Locators
  private readonly billHeading: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly clearCartButton: Locator;
  private readonly backToShoppingButton: Locator;
  private readonly placeOrderButton: Locator;
  private readonly grandTotalLabel: Locator;
  private readonly orderSuccessHeading: Locator;
  private readonly orderSuccessMessage: Locator;

  // Constructor
  constructor(page: Page) {
    super(page);

    this.billHeading = page.getByRole('heading', {
      name: /Bill/
    });

    this.emptyCartMessage = page.getByText('Your cart is empty.', {
      exact: true
    });

    this.clearCartButton = page.getByRole('button', {
      name: 'Clear Cart',
      exact: true
    });

    this.backToShoppingButton = page.getByRole('button', {
      name: 'Back to Shopping',
      exact: true
    });

    this.placeOrderButton = page.getByRole('button', {
      name: 'Place Order',
      exact: true
    });

    this.grandTotalLabel = page.getByText('Grand Total', {
      exact: true
    });

    this.orderSuccessHeading = page.getByRole('heading', {
      name: 'Order Placed Successfully!',
      exact: true
    });

    this.orderSuccessMessage = page.getByText(
      'Thank you for your purchase.',
      { exact: true }
    );
  }

  // Cart Item Locator
  private itemRow(name: string): Locator {
    return this.page.getByText(name, { exact: true }).locator('xpath=../..');
  }

  // Navigation
  async open(): Promise<void> {
    await this.navigateTo('/cart');
  }

  async backToShopping(): Promise<void> {
    await this.backToShoppingButton.click();
  }

  // Actions
  async clear(): Promise<void> {
    await this.clearCartButton.click();
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  // Assertions
  async expectBillPage(): Promise<void> {
    await this.expectPath('/cart');
    await expect(this.billHeading).toBeVisible();
  }

  async expectEmpty(): Promise<void> {
    await this.expectBillPage();

    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.backToShoppingButton).toBeVisible();
    await expect(this.grandTotalLabel).toHaveCount(0);
    await expect(this.clearCartButton).toHaveCount(0);
    await expect(this.placeOrderButton).toHaveCount(0);
  }

  async expectItemSummary(
    name: string,
    unitPrice: string,
    quantity: number,
    lineTotal: string
  ): Promise<void> {
    const row = this.itemRow(name);

    await expect(row.getByText(name, { exact: true })).toBeVisible();

    await expect(
      row.getByText(unitPrice, { exact: true }).first()
    ).toHaveText(unitPrice);

    await expect(
      row.getByText(`x${quantity}`, { exact: true })
    ).toBeVisible();

    await expect(
      row.getByText(lineTotal, { exact: true }).last()
    ).toHaveText(lineTotal);
  }

  async expectGrandTotal(total: string): Promise<void> {
    await expect(
      this.grandTotalLabel.locator('..')
    ).toContainText(total);
  }

  async expectCartControls(): Promise<void> {
    await expect(this.clearCartButton).toBeVisible();
    await expect(this.backToShoppingButton).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async expectOrderSuccess(): Promise<void> {
    await expect(this.orderSuccessHeading).toBeVisible();
    await expect(this.orderSuccessMessage).toBeVisible();
    await expect(this.placeOrderButton).toHaveCount(0);
    await expect(this.clearCartButton).toHaveCount(0);
  }
}
