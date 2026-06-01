import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('añadir una etiqueta nueva a una nota', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`
  const tagName = `${PREFIX}tag-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  await page.getByTestId('tag-open-btn').click()
  const tagInput = page.getByTestId('tag-input')
  await tagInput.fill(tagName)
  await tagInput.press('Enter')

  await expect(page.getByText(tagName)).toBeVisible()
})
