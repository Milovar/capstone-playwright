import { test } from '../fixtures/test';
import { createDemoUser } from '../testdata/users';

test('CP01 Registro y eliminacion de cuenta', async ({ auth }) => {
  const user = createDemoUser();
  await auth.register(user);
  await auth.deleteAccount();
});
