import { expect, type Page } from '@playwright/test';
import type { DemoUser } from '../testdata/users';

export class AuthPage {
  constructor(private readonly page: Page) {}

  async open() { await this.page.goto('/login'); }

  async register(user: DemoUser) {
    await this.open();
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
    await this.page.locator('[data-qa="signup-name"]').fill(user.name);
    await this.page.locator('[data-qa="signup-email"]').fill(user.email);
    await this.page.locator('[data-qa="signup-button"]').click();

    await expect(this.page.getByText('Enter Account Information', { exact: false })).toBeVisible();
    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(user.password);
    await this.page.locator('[data-qa="days"]').selectOption('10');
    await this.page.locator('[data-qa="months"]').selectOption('5');
    await this.page.locator('[data-qa="years"]').selectOption('1990');
    await this.page.locator('[data-qa="first_name"]').fill(user.firstname);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastname);
    await this.page.locator('[data-qa="company"]').fill(user.company);
    await this.page.locator('[data-qa="address"]').fill(user.address);
    await this.page.locator('[data-qa="country"]').selectOption({ label: user.country });
    await this.page.locator('[data-qa="state"]').fill(user.state);
    await this.page.locator('[data-qa="city"]').fill(user.city);
    await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(user.mobile);
    await this.page.locator('[data-qa="create-account"]').click();

    await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
    await expect(this.page.locator('a').filter({ hasText: 'Logged in as' }).first())
      .toContainText(user.name);
  }

  async login(user: DemoUser) {
    await this.open();
    await expect(this.page.getByText('Login to your account')).toBeVisible();
    await this.page.locator('[data-qa="login-email"]').fill(user.email);
    await this.page.locator('[data-qa="login-password"]').fill(user.password);
    await this.page.locator('[data-qa="login-button"]').click();
    await expect(this.page.locator('a').filter({ hasText: 'Logged in as' }).first())
      .toContainText(user.name);
  }

  async logout() {
    await Promise.all([
      this.page.waitForURL(/\/login/),
      this.page.locator('a[href="/logout"]').click(),
    ]);
  }

  async deleteAccount() {
    await Promise.all([
      this.page.waitForURL(/\/delete_account/),
      this.page.locator('a[href="/delete_account"]').click(),
    ]);
    await expect(this.page.locator('[data-qa="account-deleted"]')).toBeVisible();
  }
}
