import { test, expect } from '@playwright/test'
import { loadTestEnv } from './helpers/env'

loadTestEnv()

// Estado de sesión vacío: estos tests parten deslogueados, ignorando el storageState global.
const LOGGED_OUT = { cookies: [], origins: [] }

test.describe('Autenticación', () => {
  test('login con credenciales válidas entra al dashboard', async ({ browser }) => {
    const context = await browser.newContext({ storageState: LOGGED_OUT })
    const page = await context.newPage()

    await page.goto('/login')
    await page.fill('#email', process.env.E2E_EMAIL!)
    await page.fill('#password', process.env.E2E_PASSWORD!)
    await page.getByTestId('login-submit').click()

    await page.waitForURL('**/dashboard**', { timeout: 30_000 })
    await expect(page.getByTestId('logout-btn')).toBeVisible()

    await context.close()
  })

  test('credenciales inválidas muestran mensaje de error', async ({ browser }) => {
    const context = await browser.newContext({ storageState: LOGGED_OUT })
    const page = await context.newPage()

    await page.goto('/login')
    await page.fill('#email', 'noexiste-e2e@example.com')
    await page.fill('#password', 'contrasena-incorrecta')
    await page.getByTestId('login-submit').click()

    await expect(page.getByText('Correo o contraseña incorrectos')).toBeVisible()

    await context.close()
  })
})
