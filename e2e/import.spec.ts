import { randomUUID } from 'node:crypto'
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook } from './helpers/actions'

/**
 * Regresión Fix 3 (Phase 17): /api/import debe verificar que la libreta destino
 * pertenezca al usuario autenticado. RLS sobre notes.user_id no impide pasar un
 * notebook_id ajeno, así que el endpoint comprueba propiedad y responde 403.
 * Se manda un .md real para superar el check de files.length y llegar al guard.
 */

const MD_FILE = {
  name: `${PREFIX}import.md`,
  mimeType: 'text/markdown',
  buffer: Buffer.from('# E2E Import\n\nContenido de prueba de importacion.'),
}

test('import rechaza una libreta que no es del usuario (403)', async ({ page }) => {
  await page.goto('/dashboard')

  // UUID válido que no corresponde a ninguna libreta de la cuenta de prueba.
  const foreignNotebookId = randomUUID()

  const res = await page.request.post('/api/import', {
    multipart: { notebookId: foreignNotebookId, files: MD_FILE },
  })

  expect(res.status()).toBe(403)
  const body = await res.json()
  expect(body.error).toBe('Libreta no válida')
})

test('import acepta una libreta propia (200) y crea la nota', async ({ page }) => {
  const notebookName = `${PREFIX}IMP-${Date.now()}`

  await page.goto('/dashboard')
  const notebookId = await createNotebook(page, notebookName)

  const res = await page.request.post('/api/import', {
    multipart: { notebookId, files: MD_FILE },
  })

  expect(res.status()).toBe(200)
  const body = await res.json()
  expect(body.imported).toBeGreaterThanOrEqual(1)
})
