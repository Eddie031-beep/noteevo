import { test, expect } from '@playwright/test'

/**
 * Test de logout. Va en un archivo aparte que corre al FINAL (orden alfabético),
 * porque `signOut()` revoca la sesión globalmente en Supabase y eso invalidaría
 * el `storageState` compartido que usan los demás specs.
 */
test('logout regresa a la pantalla de login', async ({ page }) => {
  await page.goto('/dashboard')
  await page.getByTestId('logout-btn').click()

  await page.waitForURL('**/login**', { timeout: 30_000 })
  await expect(page.getByTestId('login-submit')).toBeVisible()
})
