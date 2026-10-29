import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/checkout');
    await expect(this.page).toHaveURL(/checkout/);
  }
}
