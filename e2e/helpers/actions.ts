import { expect, type Page } from '@playwright/test'

/**
 * Crea una libreta desde el sidebar y devuelve su id.
 * Intercepta la respuesta REST de Supabase para obtener el id sin necesitar
 * el admin client (evita "permission denied for table notebooks").
 */
export async function createNotebook(page: Page, name: string): Promise<string> {
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('/rest/v1/notebooks') && resp.request().method() === 'POST'
  )
  await page.getByTestId('new-notebook-btn').click()
  await page.getByTestId('notebook-name-input').fill(name)
  await page.getByTestId('notebook-create-submit').click()
  const response = await responsePromise
  await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible()
  const data = (await response.json()) as { id: string }
  return data.id
}

/**
 * Crea una nota nueva en la libreta seleccionada y espera a que el editor abra
 * (el input de título de la nota es visible).
 */
export async function createNote(page: Page): Promise<void> {
  await page.getByTestId('new-note-btn').click()
  await expect(page.getByTestId('note-title-input')).toBeVisible()
}
