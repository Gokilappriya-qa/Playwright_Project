# ScriptedQA Shopping Page Test Plan

## Application Overview

Four focused test cases for the authenticated Shopping page at https://www.scriptedqa.com/shopping. Coverage includes product catalog rendering, search and category/price filters, add-to-cart behavior, and cart/checkout completion.

## Test Scenarios

### 1. Shopping Page Core Functionality

**Seed:** `Fresh browser session navigated to https://www.scriptedqa.com/shopping; sign in using the demo credentials displayed on the login page if prompted. Each test starts with an empty cart.`

#### 1.1. SHOP-01 - Verify product catalog displays complete product cards

**File:** `tests/shopping/shop-01-product-catalog.spec.ts`

**Steps:**
  1. Open the Shopping page with a fresh session and empty cart. If prompted, sign in with the displayed demo credentials.
    - expect: The page URL is https://www.scriptedqa.com/shopping.
    - expect: The page displays the Products heading, product search field, category filter, price filter, and Checkout Items: 0 button.
    - expect: Product cards are displayed for the available catalog items, including Laptop, Headphones, Mango, Cauliflower, and Treadmill.
  2. Inspect representative product cards from different categories.
    - expect: Each inspected product card displays a product image with meaningful alt text, product name, category, price, and an Add to Cart button.
    - expect: Prices are displayed with currency formatting and the product category matches the selected category label (for example, Mango is in Fruits and Laptop is in electronics).

#### 1.2. SHOP-02 - Verify product search and category/price filters

**File:** `tests/shopping/shop-02-search-and-filters.spec.ts`

**Steps:**
  1. Enter "Mango" into the Search products field.
    - expect: The product list is narrowed to the Mango product and does not display unrelated products.
  2. Replace the search text with a term that does not match any product, such as "not-a-real-product".
    - expect: The page displays an empty-results message ("No products found matching your current filters.").
    - expect: A Reset All Filters control is available.
  3. Select Fruits in the category filter and ensure the search is cleared.
    - expect: Only products categorized as Fruits are shown (Mango, Apple, and Dragon Fruit).
    - expect: Products from electronics, Vegitables, and Sports & Fitness are not shown.
  4. Reset filters, then select "$100 to $500" in the price filter.
    - expect: Only products priced within the selected range are displayed, including Headphones ($200), Microwave Oven ($290), Smartwatch ($499), and Dumbbell ($489).
    - expect: Products priced below $100 or above $500 are not displayed.
  5. Combine Fruits with the "$100 to $500" price filter, then select Reset All Filters.
    - expect: The combination with no matching products shows the empty-results message.
    - expect: Resetting returns both filters to their default selections and restores the product catalog.

#### 1.3. SHOP-03 - Verify Add to Cart updates the cart state

**File:** `tests/shopping/shop-03-add-to-cart.spec.ts`

**Steps:**
  1. With a fresh empty cart, locate the Headphones product card.
    - expect: The Headphones card displays its category and price ($200).
    - expect: The card has an enabled Add to Cart button.
    - expect: The header displays Checkout Items: 0.
  2. Select Add to Cart for Headphones once.
    - expect: The header count updates to Checkout Items: 1.
    - expect: The Headphones button reflects one item added (for example, Add to Cart (1)).
    - expect: The page stays on the Shopping page.
  3. Select the Checkout Items button.
    - expect: The browser navigates to /cart.
    - expect: The cart contains Headphones with quantity x1, unit price $200.00, and line total $200.00.

#### 1.4. SHOP-04 - Verify cart totals and successful checkout

**File:** `tests/shopping/shop-04-checkout.spec.ts`

**Steps:**
  1. Starting from a fresh empty cart, add Headphones to the cart and open Checkout Items.
    - expect: The Bill page displays Headphones, unit price $200.00, quantity x1, and line total $200.00.
    - expect: Grand Total is $200.00.
    - expect: Clear Cart, Back to Shopping, and Place Order controls are visible.
  2. Select Place Order.
    - expect: A success confirmation appears with the heading "Order Placed Successfully!" and the message "Thank you for your purchase."
  3. Select Back to Shopping after the order confirmation.
    - expect: The browser returns to /shopping.
    - expect: The cart count is reset to Checkout Items: 0.
    - expect: The product catalog is available again.
