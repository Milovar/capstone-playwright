import type { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}
  async open() { await this.page.goto('/'); }
  async goToLogin() { await this.page.locator('a[href="/login"]').first().click(); }
  async goToProducts() { await this.page.locator('a[href="/products"]').first().click(); }
  async goToContact() { await this.page.locator('a[href="/contact_us"]').first().click(); }
}
