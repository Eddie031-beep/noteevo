import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:3000'
const EMAIL = 'mikecastillo855@gmail.com'
const PASSWORD = 'mike123'
const OUT = path.join(process.cwd(), 'e2e-out')

fs.mkdirSync(OUT, { recursive: true })

const consoleErrors = []
const pageErrors = []
const networkErrors = []
const report = []

function log(step, status, detail = '') {
  report.push({ step, status, detail })
  console.log(`[${status}] ${step}${detail ? ' :: ' + detail : ''}`)
}

let shotN = 0
async function shot(page, name) {
  shotN++
  const file = path.join(OUT, `${String(shotN).padStart(2, '0')}-${name}.png`)
  await page.screenshot({ path: file, fullPage: false }).catch(() => {})
  return file
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()

page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', (err) => pageErrors.push(err.message))
page.on('response', (res) => { if (res.status() >= 400) networkErrors.push(`${res.status()} ${res.request().method()} ${res.url()}`) })

async function themeAttr() {
  return page.evaluate(() => document.documentElement.getAttribute('data-theme') || document.documentElement.className)
}

try {
  // LOGIN
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.fill('#email', EMAIL)
  await page.fill('#password', PASSWORD)
  await page.click('button:has-text("Entrar")')
  await page.waitForURL('**/dashboard**', { timeout: 15000 })
  await page.waitForTimeout(2000)
  log('Login', 'OK', page.url())

  // ---- ABRIR LIBRETA ----
  const notebook = page.locator('aside').getByText('wvawv', { exact: true }).first()
  if (await notebook.count() > 0) {
    await notebook.click()
    await page.waitForTimeout(2000)
    log('Abrir libreta "wvawv"', 'OK', `URL: ${page.url()}`)
    await shot(page, 'notebook-open')
  } else {
    log('Abrir libreta', 'WARN', 'No se encontró la libreta wvawv en el sidebar')
  }

  // ---- CREAR NOTA ----
  // Buscar botón "+" cerca de la lista de notas o un botón "Nueva nota"
  const createCandidates = [
    'button:has-text("Nueva nota")',
    'button[title*="Nueva" i]',
    'button[aria-label*="nota" i]',
    'button:has-text("Crear")',
  ]
  let created = false
  for (const sel of createCandidates) {
    const btn = page.locator(sel).first()
    if (await btn.count() > 0 && await btn.isVisible().catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(2500)
      created = true
      log('Crear nota (botón)', 'OK', `selector: ${sel}`)
      break
    }
  }
  if (!created) {
    // intentar el botón "+" de la cabecera de la lista
    const plus = page.locator('button:has-text("+")').first()
    if (await plus.count() > 0) {
      await plus.click()
      await page.waitForTimeout(2500)
      created = true
      log('Crear nota (botón +)', 'OK')
    }
  }
  if (created) {
    await shot(page, 'note-created')
    // ¿Apareció el editor / selector de plantilla?
    const editorVisible = await page.locator('.ProseMirror, [contenteditable="true"]').count()
    const templateSelector = await page.getByText(/plantilla/i).count()
    log('Editor/selector tras crear nota', editorVisible > 0 || templateSelector > 0 ? 'OK' : 'WARN',
        `editorVisible=${editorVisible}, templateSelectorTextos=${templateSelector}`)

    // Escribir en el editor si está disponible
    const editor = page.locator('.ProseMirror, [contenteditable="true"]').first()
    if (await editor.count() > 0 && await editor.isVisible().catch(() => false)) {
      await editor.click()
      await page.keyboard.type('Nota de prueba E2E — verificando autosave y editor.')
      await page.waitForTimeout(3000) // esperar autosave
      log('Escribir en editor + autosave', 'OK')
      await shot(page, 'note-typed')
    }
  } else {
    log('Crear nota', 'WARN', 'No se encontró ningún botón para crear nota')
  }

  // ---- TOGGLE DE TEMA (modo claro) ----
  const themeBefore = await themeAttr()
  const themeBtn = page.locator('aside').getByText(/Modo (oscuro|claro)/i).first()
  if (await themeBtn.count() > 0) {
    await themeBtn.click()
    await page.waitForTimeout(1200)
    const themeAfter = await themeAttr()
    const changed = themeBefore !== themeAfter
    log('Toggle de tema (claro/oscuro)', changed ? 'OK' : 'FAIL',
        `antes="${themeBefore}" después="${themeAfter}"`)
    await shot(page, 'theme-toggled')
    // volver
    await themeBtn.click().catch(() => {})
    await page.waitForTimeout(800)
  } else {
    log('Toggle de tema', 'WARN', 'No se encontró el botón de tema')
  }

  // ---- BÚSQUEDA AVANZADA ----
  const advSearch = page.locator('aside').getByText('Búsqueda avanzada', { exact: false }).first()
  if (await advSearch.count() > 0) {
    await advSearch.click()
    await page.waitForTimeout(1500)
    log('Abrir búsqueda avanzada', 'OK', `URL: ${page.url()}`)
    await shot(page, 'advanced-search')
  } else {
    log('Búsqueda avanzada', 'WARN', 'No encontrado')
  }

  // ---- NOTIFICACIONES ----
  const notif = page.locator('aside').getByText('Notificaciones', { exact: false }).first()
  if (await notif.count() > 0) {
    await notif.click()
    await page.waitForTimeout(1500)
    log('Abrir notificaciones', 'OK')
    await shot(page, 'notifications')
  } else {
    log('Notificaciones', 'WARN', 'No encontrado')
  }

  // ---- TAREAS ----
  await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' }).catch(() => {})
  const tasks = page.locator('aside').getByText('Tareas', { exact: true }).first()
  if (await tasks.count() > 0) {
    await tasks.click()
    await page.waitForTimeout(1500)
    log('Abrir Tareas', 'OK')
    await shot(page, 'tasks')
  }

} catch (err) {
  log('EXCEPCIÓN', 'FAIL', err.message)
  await shot(page, 'exception')
} finally {
  const summary = {
    report,
    consoleErrors: [...new Set(consoleErrors)],
    pageErrors: [...new Set(pageErrors)],
    networkErrors: [...new Set(networkErrors)].slice(0, 40),
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(summary, null, 2))
  console.log('\n===== RESUMEN =====')
  console.log(JSON.stringify(summary, null, 2))
  await browser.close()
}
