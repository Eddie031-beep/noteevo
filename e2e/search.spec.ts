import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('buscar una nota por su título', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`
  const noteTitle = `${PREFIX}buscar-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  // Asignar un título único y dar tiempo al autosave (~800ms) + indexación tsvector.
  const titleInput = page.getByTestId('note-title-input')
  await titleInput.click()
  await titleInput.fill(noteTitle)
  await page.waitForTimeout(2_000)

  // Buscar desde la barra del sidebar; la nota debe aparecer en los resultados.
  await page.getByTestId('sidebar-search').fill(noteTitle)
  await expect(page.getByText(noteTitle).first()).toBeVisible({ timeout: 15_000 })
})
