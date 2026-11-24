import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ShoppingPage } from '../pages/shopping.page';

interface PageObjects {
  cartPage: CartPage;
  homePage: HomePage;
  loginPage: LoginPage;
  shoppingPage: ShoppingPage;
}

export const test = base.extend<PageObjects>({
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  shoppingPage: async ({ page }, use) => use(new ShoppingPage(page)),
});
