import { test, expect } from '@playwright/test';

test('time card', async ({ page }) => {
  const timeUrl = process.env.TIME_URL;
  if (!timeUrl) {
    throw new Error('TIME_URL environment variable is not set');
  }
  await page.goto(timeUrl);
  await page
    .getByRole('button', { name: ' IBM Verify  Use your IBM' })
    .click();
  const verifyLocator = page.getByRole('button', {
    name: 'dashboard Verify App  iPhone (Touch Approval)',
  });
  await expect(
    verifyLocator.or(
      page.getByRole('link', { name: 'Copy from a previous week' }),
    ),
  ).toBeVisible({ timeout: 0 });
  if (await verifyLocator.isVisible()) {
    await verifyLocator.click();
  }
  await page.getByRole('link', { name: 'Copy from a previous week' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  const row = page.getByRole('row').nth(3);
  await row.waitFor();
  await row.getByRole('gridcell').nth(1).locator('.border').click();
  await row.getByRole('gridcell').nth(1).getByRole('textbox').fill('8');
  await row.getByRole('gridcell').nth(2).locator('.border').click();
  await row.getByRole('gridcell').nth(2).getByRole('textbox').fill('8');
  await row.getByRole('gridcell').nth(3).locator('.border').click();
  await row.getByRole('gridcell').nth(3).getByRole('textbox').fill('8');
  await row.getByRole('gridcell').nth(4).locator('.border').click();
  await row.getByRole('gridcell').nth(4).getByRole('textbox').fill('8');
  await row.getByRole('gridcell').nth(5).locator('.border').click();
  await row.getByRole('gridcell').nth(5).getByRole('textbox').fill('8');
  const promise = page.waitForResponse(/submitLabor/);
  await page.getByRole('button', { name: 'Submit' }).click();
  const response = await promise;
  expect(response.status()).toBe(200);
});
