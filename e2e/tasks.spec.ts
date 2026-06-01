import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'

test('crear una tarea desde la vista de Tareas', async ({ page }) => {
  const taskTitle = `${PREFIX}task-${Date.now()}`

  await page.goto('/dashboard')
  await page.locator('nav').getByText('Tareas', { exact: true }).click()

  await page.getByTestId('new-task-btn').click()
  await page.getByTestId('task-title-input').fill(taskTitle)
  await page.getByTestId('task-submit').click()

  await expect(page.getByText(taskTitle)).toBeVisible()
})
