import { test } from '../fixtures/test';

test('CP06 Contact Us', async ({ contact }) => {
  await contact.sendDemoMessage();
});
