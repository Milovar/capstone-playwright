import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/products');
    await expect(this.page.getByText('All Products', { exact: false }).first())
      .toBeVisible();
  }

  async search(term: string) {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
    await expect(this.page.getByText('Searched Products', { exact: false }).first())
      .toBeVisible();
    return this.page.locator('.features_items .productinfo p').allTextContents();
  }

  async addFirstProduct(): Promise<number> {
    await this.open();
    const firstCard = this.page.locator('.features_items .product-image-wrapper').first();
    await expect(firstCard).toBeVisible();
    const addButton = firstCard.locator('.productinfo a.add-to-cart');
    const productId = Number(await addButton.getAttribute('data-product-id'));
    await addButton.click({ noWaitAfter: true });
    const modal = this.page.locator('.modal-content');
    await expect(modal).toContainText(/added to cart/i);
    await modal.getByText('Continue Shopping').click();
    await expect(modal).toBeHidden();
    return productId;
  }
}
