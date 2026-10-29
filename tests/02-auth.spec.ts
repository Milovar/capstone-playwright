import { test } from '../fixtures/test';

test('CP02 Iniciar y cerrar sesion', async ({ auth, preparedUser }) => {
  await auth.login(preparedUser);
  await auth.logout();
});
