import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('crear una libreta y una nota dentro de ella', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  await expect(page.getByTestId('note-card').first()).toBeVisible()
})
