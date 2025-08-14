import { test, expect } from '@playwright/test';

test('homepage loads and lists seeded todos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Démo QA')).toBeVisible();
  await expect(page.getByText('Préparer le plan de tests')).toBeVisible();
});

test('add a valid todo and toggle it', async ({ page }) => {
  await page.goto('/');
  await page.locator('#new-text').fill('Écrire un test de non-régression');
  await page.locator('#add-btn').click();
  await expect(page.getByText('Écrire un test de non-régression')).toBeVisible();
  // Toggle done state
  const row = page.getByText('Écrire un test de non-régression').locator('..');
  await row.getByRole('button', { name: 'Basculer' }).click();
  await expect(page.getByText('Écrire un test de non-régression')).toHaveClass(/done/);
});

test('reject too-short todo text', async ({ page }) => {
  await page.goto('/');
  await page.locator('#new-text').fill('ok');
  page.on('dialog', async dialog => { await dialog.dismiss(); });
  await page.locator('#add-btn').click();
  await expect(page.getByText('ok')).toHaveCount(0);
});
