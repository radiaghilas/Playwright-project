import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#email').fill('qa@demo.com');
  await page.locator('#pwd').fill('radia123');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.locator('#msg')).toHaveText(/Connecté/);
});

test('invalid login shows error', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#email').fill('wrong@example.com');
  await page.locator('#pwd').fill('badpwd');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.locator('#msg')).toHaveText(/Échec/);
});
