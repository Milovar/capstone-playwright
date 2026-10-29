import { test, expect } from '../fixtures/test';

test('CP04 Agregar y retirar producto del carrito', async ({ products, cart }) => {
  const productId = await products.addFirstProduct();
  await cart.open();
  await expect(cart.row(productId)).toBeVisible();
  await cart.remove(productId);
});
