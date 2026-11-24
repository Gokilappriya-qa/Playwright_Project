import { test } from '../fixtures/test-fixtures';
import { demoCredentials, invalidCredentialCases } from '../test-data/scenario-data';

test.describe('Login flow', () => {
  test('LP-01 - Display login page and credential guidance', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectSignInPage();
    await loginPage.expectFieldsEmpty();
    await loginPage.expectDemoCredentials(demoCredentials.username, demoCredentials.password);
    await loginPage.enterPassword('temporary-value');
    await loginPage.expectPasswordMasked('temporary-value');
  });

  test('LP-02 - Reject empty credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectFieldsEmpty();
    await loginPage.submitEmptyCredentials();
    await loginPage.expectInvalidCredentials();
  });

  test('LP-03 - Reject invalid username and password combinations', async ({ loginPage }) => {
    await loginPage.open();
    for (const credentials of invalidCredentialCases) {
      await loginPage.signIn(credentials.username, credentials.password);
      await loginPage.expectInvalidCredentials();
      await loginPage.expectEnteredCredentials(credentials.username, credentials.password);
    }
  });

  test('LP-04 - Sign in successfully with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.open();
    await loginPage.expectDemoCredentials(demoCredentials.username, demoCredentials.password);
    await loginPage.enterCredentials(demoCredentials.username, demoCredentials.password);
    await loginPage.expectPasswordMasked(demoCredentials.password);
    await loginPage.submitSignIn();
    await homePage.expectAuthenticatedHome();
    await loginPage.expectNoLoginError();
  });

  test('LP-05 - Sign out and prevent authenticated content access', async ({ loginPage, homePage }) => {
    await loginPage.open();
    await loginPage.signIn(demoCredentials.username, demoCredentials.password);
    await homePage.expectAuthenticatedHome();

    await homePage.signOut();
    await loginPage.expectSignInPage();
    await loginPage.expectSignOutNotVisible();

    await homePage.open();
    await loginPage.expectSignInPage();
    await loginPage.goBack();
    await loginPage.expectSignInPage();
  });
});
