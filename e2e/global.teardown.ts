import { test as teardown } from '@playwright/test'
import { cleanupTestData } from './helpers/supabase-admin'

/**
 * Se ejecuta al final de toda la corrida (proyecto `cleanup`): borra de Supabase
 * cualquier dato creado por los tests, dejando la cuenta de prueba limpia.
 */
teardown('limpiar datos de prueba E2E', async () => {
  await cleanupTestData()
})
