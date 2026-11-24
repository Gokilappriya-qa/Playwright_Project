import { test } from '../fixtures/test-fixtures';
import { homeShoppingCases } from '../test-data/home-shopping.data';

for (const testCase of homeShoppingCases) {
  test(testCase.name, async ({ homePage, loginPage, shoppingPage }) => {
    await homePage.open();
    if (await loginPage.isSignInFormVisible()) {
      await loginPage.signIn(testCase.username, testCase.password);
    }
    await homePage.expectAuthenticatedHome();
    await homePage.expectShoppingLink(testCase.shoppingPath);
    await homePage.openShopping();
    await shoppingPage.expectLoaded(testCase.shoppingPath);
  });
}
