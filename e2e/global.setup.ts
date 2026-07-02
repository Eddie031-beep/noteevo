import { test as setup, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { loadTestEnv } from './helpers/env'

loadTestEnv()

const authFile = path.join(process.cwd(), 'e2e', '.auth', 'user.json')

/**
 * Inicia sesión una sola vez con la cuenta de prueba y guarda el estado de sesión
 * (cookies/localStorage). El resto de specs reutilizan ese estado vía `storageState`,
 * evitando repetir el login en cada test.
 */
setup('autenticar cuenta de prueba', async ({ page }) => {
  const email = process.env.E2E_EMAIL
  const password = process.env.E2E_PASSWORD
  if (!email || !password) {
    throw new Error('Faltan E2E_EMAIL / E2E_PASSWORD en .env.test')
  }

  await page.goto('/login')
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.getByTestId('login-submit').click()

  await page.waitForURL('**/dashboard**', { timeout: 30_000 })
  await expect(page.getByTestId('account-menu-btn')).toBeVisible()

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
