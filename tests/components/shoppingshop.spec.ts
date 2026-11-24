import { test } from '../fixtures/test-fixtures';
import { demoCredentials, products } from '../test-data/scenario-data';
import { openProtectedPage } from '../utils/authenticated-navigation';

test.describe('Shopping page', () => {
  test('SHOP-01 - Display product cards and catalog controls', async ({ shoppingPage, loginPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.expectLoaded();
    await shoppingPage.expectCartCount(0);

    for (const product of [products.laptop, products.headphones, products.mango, products.cauliflower, products.treadmill]) {
      await shoppingPage.expectProductVisible(product.name);
    }

    await shoppingPage.expectProductCard(products.laptop.name, products.laptop.category, products.laptop.shoppingPrice);
    await shoppingPage.expectProductCard(products.mango.name, products.mango.category, products.mango.shoppingPrice);
    await shoppingPage.expectProductCard(products.cauliflower.name, products.cauliflower.category, products.cauliflower.shoppingPrice);
  });

  test('SHOP-02 - Search products and apply category and price filters', async ({ shoppingPage, loginPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.searchFor(products.mango.name);
    await shoppingPage.expectProductVisible(products.mango.name);
    await shoppingPage.expectProductAbsent(products.laptop.name);

    await shoppingPage.searchFor('not-a-real-product');
    await shoppingPage.expectEmptyResults();
    await shoppingPage.resetFilters();
    await shoppingPage.selectCategory('Fruits');
    for (const product of [products.mango, products.apple, products.dragonFruit]) {
      await shoppingPage.expectProductVisible(product.name);
    }
    for (const product of [products.laptop, products.cauliflower, products.treadmill]) {
      await shoppingPage.expectProductAbsent(product.name);
    }

    await shoppingPage.resetFilters();
    await shoppingPage.selectPriceRange('$100 to $500');
    for (const product of [products.headphones, products.microwave, products.smartwatch, products.dumbbell]) {
      await shoppingPage.expectProductVisible(product.name);
    }
    for (const product of [products.laptop, products.mango, products.football, products.treadmill]) {
      await shoppingPage.expectProductAbsent(product.name);
    }

    await shoppingPage.selectCategory('Fruits');
    await shoppingPage.expectEmptyResults();
    await shoppingPage.resetFilters();
    await shoppingPage.expectDefaultFilters();
    await shoppingPage.expectProductVisible(products.laptop.name);
    await shoppingPage.expectProductVisible(products.mango.name);
  });

  test('SHOP-03 - Add a product to the cart', async ({ shoppingPage, loginPage, cartPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.expectLoaded();
    await shoppingPage.expectCartCount(0);
    await shoppingPage.expectProductCard(products.headphones.name, products.headphones.category, products.headphones.shoppingPrice);

    await shoppingPage.addProductToCart(products.headphones.name);
    await shoppingPage.expectCartCount(1);
    await shoppingPage.expectProductCartQuantity(products.headphones.name, 1);
    await shoppingPage.openCart();
    await cartPage.expectItemSummary(products.headphones.name, products.headphones.cartPrice, 1, products.headphones.cartPrice);
  });

  test('SHOP-04 - Checkout from Shopping and verify cart reset', async ({ shoppingPage, loginPage, cartPage }) => {
    await openProtectedPage(() => shoppingPage.open(), loginPage, demoCredentials);
    await shoppingPage.addProductToCart(products.headphones.name);
    await shoppingPage.openCart();
    await cartPage.expectItemSummary(products.headphones.name, products.headphones.cartPrice, 1, products.headphones.cartPrice);
    await cartPage.expectGrandTotal(products.headphones.cartPrice);
    await cartPage.expectCartControls();

    await cartPage.placeOrder();
    await cartPage.expectOrderSuccess();
    await cartPage.backToShopping();
    await shoppingPage.expectLoaded();
    await shoppingPage.expectCartCount(0);
  });
});
