import type { Page } from '@playwright/test';

export async function mockProductsEndpoint(page: Page) {
  await page.route('**/api/productsList*', async route => {
    await route.fulfill({
      status: 200,
      headers: { 'content-type': 'application/json', 'x-demo-mock': 'yes' },
      body: JSON.stringify({
        responseCode: 200,
        products: [{ id: 999, name: 'Producto controlado por QA' }]
      })
    });
  });
}
