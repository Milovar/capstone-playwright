import { test as base, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ContactPage } from '../pages/ContactPage';
import { createDemoUser, type DemoUser } from '../testdata/users';

type Use<T> = (r: T) => Promise<void>;

type Resources = {
  home: HomePage;
  auth: AuthPage;
  products: ProductsPage;
  cart: CartPage;
  checkout: CheckoutPage;
  contact: ContactPage;
  preparedUser: DemoUser;
};

export const test = base.extend<Resources>({
  home: async ({ page }: { page: Page }, use: Use<HomePage>) => { await use(new HomePage(page)); },
  auth: async ({ page }: { page: Page }, use: Use<AuthPage>) => { await use(new AuthPage(page)); },
  products: async ({ page }: { page: Page }, use: Use<ProductsPage>) => { await use(new ProductsPage(page)); },
  cart: async ({ page }: { page: Page }, use: Use<CartPage>) => { await use(new CartPage(page)); },
  checkout: async ({ page }: { page: Page }, use: Use<CheckoutPage>) => { await use(new CheckoutPage(page)); },
  contact: async ({ page }: { page: Page }, use: Use<ContactPage>) => { await use(new ContactPage(page)); },

  // El registro se realiza por UI para no depender de POST /api/createAccount.
  // Antes aparecio ECONNRESET al intentar registrar por API desde la Cloud PC.
  preparedUser: async ({ page }: { page: Page }, use: Use<DemoUser>) => {
    const auth = new AuthPage(page);
    const user = createDemoUser();
    await auth.register(user);
    await auth.logout();
    try {
      await use(user);
    } finally {
      // La limpieza se intenta al finalizar, sin ocultar errores del caso.
      try {
        // Si todavia estamos autenticados, eliminar directamente.
        if (await page.locator('a[href="/delete_account"]').count() === 0) {
          await auth.login(user);
        }
        await auth.deleteAccount();
      } catch (error) {
        console.warn('Revisar limpieza del usuario temporal:', error);
      }
    }
  }
});

export { expect };
