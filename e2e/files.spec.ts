import path from 'node:path'
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

const SAMPLE_FILE = `${PREFIX}sample.txt`

test('subir un archivo adjunto a una nota', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  const filePath = path.join(process.cwd(), 'e2e', 'fixtures', SAMPLE_FILE)
  await page.getByTestId('attachment-input').setInputFiles(filePath)

  // Tras subirse, el nombre del archivo aparece en el panel de adjuntos.
  await expect(page.getByText(SAMPLE_FILE)).toBeVisible({ timeout: 30_000 })
})
