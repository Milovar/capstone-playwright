import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  row(productId: number) { return this.page.locator(`#product-${productId}`); }

  async open() {
    await this.page.goto('/view_cart');
    await expect(this.page).toHaveURL(/view_cart/);
  }

  async remove(productId: number) {
    await this.row(productId).locator('.cart_quantity_delete').click();
    await expect(this.row(productId)).toHaveCount(0);
  }

  async proceed() {
    await this.page.getByText('Proceed To Checkout', { exact: false }).click();
  }
}
