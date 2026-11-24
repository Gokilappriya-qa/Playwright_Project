import type { LoginPage } from '../pages/login.page';

export interface DemoLogin {
  readonly username: string;
  readonly password: string;
}

export async function openProtectedPage(
  openPage: () => Promise<void>,
  loginPage: LoginPage,
  credentials: DemoLogin,
): Promise<void> {
  await openPage();
  if (await loginPage.isSignInFormVisible()) {
    await loginPage.signIn(credentials.username, credentials.password);
    await openPage();
  }
}
