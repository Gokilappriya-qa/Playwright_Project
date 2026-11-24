# ScriptedQA Cart Page Test Plan

## Application Overview

Four focused test cases to verify the authenticated cart page at https://www.scriptedqa.com/cart: empty-cart behavior, item and amount calculations, clearing the cart, and successful order placement.

## Test Scenarios

### 1. Cart Page Core Functionality

**Seed:** `Fresh authenticated browser session. For non-empty-cart cases, add the specified products from the Shopping page before opening /cart. Start each test with an empty cart.`

#### 1.1. CART-01 - Verify empty-cart state and return to shopping

**File:** `tests/cart/cart-01-empty-cart.spec.ts`

**Steps:**
  1. Open https://www.scriptedqa.com/cart with an empty cart. If prompted, sign in with the demo credentials shown on the login page.
    - expect: The Bill page heading is displayed.
    - expect: The message "Your cart is empty." is visible.
    - expect: A Back to Shopping button is available.
    - expect: Cart item rows, Grand Total, Clear Cart, and Place Order are not displayed.
  2. Select Back to Shopping.
    - expect: The browser navigates to https://www.scriptedqa.com/shopping.
    - expect: The Products page loads and the checkout item count is 0.

#### 1.2. CART-02 - Verify cart items, quantities, prices, and grand total

**File:** `tests/cart/cart-02-cart-summary.spec.ts`

**Steps:**
  1. From a fresh cart, add Headphones and Mango from the Shopping page, then open Checkout Items.
    - expect: The browser navigates to /cart and the Bill page is displayed.
    - expect: A row for Headphones displays unit price $200.00, quantity x1, and line total $200.00.
    - expect: A row for Mango displays unit price $1.00, quantity x1, and line total $1.00.
    - expect: Grand Total is $201.00.
    - expect: Clear Cart, Back to Shopping, and Place Order controls are visible.

#### 1.3. CART-03 - Verify Clear Cart removes all items

**File:** `tests/cart/cart-03-clear-cart.spec.ts`

**Steps:**
  1. From a fresh cart, add at least two different products and open Checkout Items.
    - expect: The cart displays both selected product rows and a non-empty Grand Total.
  2. Select Clear Cart.
    - expect: The cart remains on /cart.
    - expect: All product rows and the total are removed.
    - expect: The message "Your cart is empty." is visible.
    - expect: Back to Shopping is available and Clear Cart and Place Order are no longer displayed.

#### 1.4. CART-04 - Verify placing an order and post-order state

**File:** `tests/cart/cart-04-place-order.spec.ts`

**Steps:**
  1. From a fresh cart, add Headphones and open Checkout Items.
    - expect: The cart displays Headphones and a Grand Total of $200.00.
    - expect: The Place Order button is available.
  2. Select Place Order.
    - expect: The order confirmation heading "Order Placed Successfully!" appears.
    - expect: The confirmation message "Thank you for your purchase." is displayed.
    - expect: The cart contents and order controls are replaced by the confirmation state.
  3. Select Back to Shopping.
    - expect: The browser returns to /shopping.
    - expect: The checkout item count is reset to 0 and the product catalog is available.
