import { test, expect } from '../fixtures/test';
import { searchTerms } from '../testdata/searchTerms';
import { mockProductsEndpoint } from '../utils/mockProducts';

test('CP03 Busqueda con datos y demostracion de mocking', async ({ page, products }) => {
  for (const term of searchTerms) {
    await test.step(`Busqueda del termino: ${term}`, async () => {
      await products.open();
      const names = await products.search(term);
      expect(names.length, `Sin productos para: ${term}`).toBeGreaterThan(0);
      expect(names.some(name => name.toLowerCase().includes(term.toLowerCase())))
        .toBeTruthy();
    });
  }

  // Demo controlada de intercepcion. NO supone que la busqueda UI usa esta API.
  await mockProductsEndpoint(page);
  const result = await page.evaluate(async () => {
    const response = await fetch('/api/productsList');
    return { marker: response.headers.get('x-demo-mock'), data: await response.json() };
  });
  expect(result.marker).toBe('yes');
  expect(result.data.products[0].name).toBe('Producto controlado por QA');
});
