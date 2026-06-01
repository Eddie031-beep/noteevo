import { expect, type Page } from '@playwright/test'

/**
 * Crea una libreta desde el sidebar y espera a que quede seleccionada
 * (su nombre aparece como encabezado del panel de notas).
 */
export async function createNotebook(page: Page, name: string): Promise<void> {
  await page.getByTestId('new-notebook-btn').click()
  await page.getByTestId('notebook-name-input').fill(name)
  await page.getByTestId('notebook-create-submit').click()
  await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible()
}

/**
 * Crea una nota nueva en la libreta seleccionada y espera a que el editor abra
 * (el input de título de la nota es visible).
 */
export async function createNote(page: Page): Promise<void> {
  await page.getByTestId('new-note-btn').click()
  await expect(page.getByTestId('note-title-input')).toBeVisible()
}
