import { test } from '../fixtures/test-fixtures';
import { demoCredentials, products } from '../test-data/scenario-data';
import { openProtectedPage } from '../utils/authenticated-navigation';

test.describe('Cart flow', () => {
  test('CART-01 - Display empty cart and return to Shopping', { tag: ['@sanity', '@regression'] }, async ({ cartPage, loginPage, shoppingPage }) => {
    await openProtectedPage(() => cartPage.open(), loginPage, demoCredentials);
    await cartPage.expectEmpty();
    await cartPage.backToShopping();
    await shoppingPage.expectLoaded();
    await shoppingPage.expectCartCount(0);
  });

  test('CART-02 - Display item quantities, prices, and grand total', { tag: '@regression' }, async ({ shoppingPage, cartPage, loginPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.addProductToCart(products.headphones.name);
    await shoppingPage.addProductToCart(products.mango.name);
    await shoppingPage.openCart();
    await cartPage.expectBillPage();
    await cartPage.expectItemSummary(products.headphones.name, products.headphones.cartPrice, 1, products.headphones.cartPrice);
    await cartPage.expectItemSummary(products.mango.name, products.mango.cartPrice, 1, products.mango.cartPrice);
    await cartPage.expectGrandTotal('$201.00');
    await cartPage.expectCartControls();
  });

  test('CART-03 - Clear all cart items', { tag: '@regression' }, async ({ shoppingPage, cartPage, loginPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.addProductToCart(products.headphones.name);
    await shoppingPage.addProductToCart(products.mango.name);
    await shoppingPage.openCart();
    await cartPage.expectItemSummary(products.headphones.name, products.headphones.cartPrice, 1, products.headphones.cartPrice);
    await cartPage.expectItemSummary(products.mango.name, products.mango.cartPrice, 1, products.mango.cartPrice);
    await cartPage.expectGrandTotal('$201.00');
    await cartPage.clear();
    await cartPage.expectEmpty();
  });

  test('CART-04 - Place an order and verify post-order state', { tag: ['@sanity', '@regression'] }, async ({ shoppingPage, cartPage, loginPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.addProductToCart(products.headphones.name);
    await shoppingPage.openCart();
    await cartPage.expectItemSummary(products.headphones.name, products.headphones.cartPrice, 1, products.headphones.cartPrice);
    await cartPage.expectGrandTotal(products.headphones.cartPrice);
    await cartPage.placeOrder();
    await cartPage.expectOrderSuccess();
    await cartPage.backToShopping();
    await shoppingPage.expectLoaded();
    await shoppingPage.expectCartCount(0);
  });
});
