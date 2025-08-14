import { test, expect } from '@playwright/test';

/**
 * Non-regression: deleting a todo should remove it from the list
 * and not affect other items.
 */
test('non-regression: delete keeps other items intact', async ({ page }) => {
  await page.goto('/');
  // Precondition: seeded item exists
  await expect(page.getByText('Préparer le plan de tests')).toBeVisible();
  // Add another item
  await page.locator('#new-text').fill('Tâche à supprimer');
  await page.locator('#add-btn').click();
  await expect(page.getByText('Tâche à supprimer')).toBeVisible();
  // Delete the new item
  const row = page.getByText('Tâche à supprimer').locator('..');
  await row.getByRole('button', { name: 'Supprimer' }).click();
  // Assert it's gone and the seeded item remains
  await expect(page.getByText('Tâche à supprimer')).toHaveCount(0);
  await expect(page.getByText('Préparer le plan de tests')).toBeVisible();
});
