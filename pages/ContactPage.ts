import { expect, type Page } from '@playwright/test';

export class ContactPage {
  constructor(private readonly page: Page) {}

  async sendDemoMessage() {
    await this.page.goto('/contact_us');
    await expect(this.page.getByText('Get In Touch', { exact: false }).first()).toBeVisible();
    await this.page.locator('[data-qa="name"]').fill('Persona QA');
    await this.page.locator('[data-qa="email"]').fill('qa-demo@example.com');
    await this.page.locator('[data-qa="subject"]').fill('Consulta ficticia');
    await this.page.locator('[data-qa="message"]').fill('Mensaje de prueba automatizada.');
    await this.page.locator('input[name="upload_file"]').setInputFiles({
      name: 'demo.txt', mimeType: 'text/plain', buffer: Buffer.from('Demo QA')
    });
    this.page.once('dialog', async dialog => { await dialog.accept(); });
    await this.page.locator('[data-qa="submit-button"]').click();
    await expect(this.page.locator('#contact-page').getByText(/Success! Your details have been submitted successfully/i))
      .toBeVisible();
  }
}
