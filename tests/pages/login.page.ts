import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly signInHeading: Locator;
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly signInButton: Locator;
  private readonly signOutButton: Locator;
  private readonly credentialHeading: Locator;
  private readonly invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.signInHeading = page.getByRole('heading', {
      name: 'Sign In',
      exact: true,
    });
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', {
      name: 'Sign In',
      exact: true,
    });
    this.signOutButton = page.getByRole('button', {
      name: 'Sign Out',
      exact: true,
    });
    this.credentialHeading = page.getByText('Credentials', { exact: true });
    this.invalidCredentialsMessage = page.getByText(
      'Oops! The credentials are incorrect.',
      { exact: true },
    );
  }

  private credentialValue(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  async isSignInFormVisible(): Promise<boolean> {
    return this.signInHeading.isVisible();
  }

  async expectSignInPage(): Promise<void> {
    await expect(this.page).toHaveTitle('Scripted QA');
    await expect(this.signInHeading).toBeVisible();
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await this.expectPath('/');
  }

  async expectSignOutNotVisible(): Promise<void> {
    await expect(this.signOutButton).toHaveCount(0);
  }

  async expectDemoCredentials(username: string, password: string): Promise<void> {
    await expect(this.credentialHeading).toBeVisible();
    await expect(this.credentialValue(username)).toBeVisible();
    await expect(this.credentialValue(password)).toBeVisible();
  }

  async expectFieldsEmpty(): Promise<void> {
    await expect(this.usernameField).toHaveValue('');
    await expect(this.passwordField).toHaveValue('');
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async expectPasswordMasked(value: string): Promise<void> {
    await expect(this.passwordField).toHaveAttribute('type', 'password');
    await expect(this.passwordField).toHaveValue(value);
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async submitSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.enterCredentials(username, password);
    await this.submitSignIn();
  }

  async submitEmptyCredentials(): Promise<void> {
    await this.submitSignIn();
  }

  async expectInvalidCredentials(): Promise<void> {
    await this.expectPath('/');
    await expect(this.invalidCredentialsMessage).toBeVisible();
  }

  async expectEnteredCredentials(username: string, password: string): Promise<void> {
    await expect(this.usernameField).toHaveValue(username);
    await expect(this.passwordField).toHaveValue(password);
    await this.expectPasswordMasked(password);
  }

  async expectNoLoginError(): Promise<void> {
    await expect(this.invalidCredentialsMessage).toHaveCount(0);
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }
}