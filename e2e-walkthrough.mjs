import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:3000'
const EMAIL = 'mikecastillo855@gmail.com'
const PASSWORD = 'mike123'
const OUT = path.join(process.cwd(), 'e2e-out')
fs.mkdirSync(OUT, { recursive: true })

const consoleErrors = []
const networkErrors = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage())
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
page.on('response', (r) => { if (r.status() >= 400) networkErrors.push(`${r.status()} ${r.request().method()} ${r.url()}`) })

try {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.fill('#email', EMAIL)
  await page.fill('#password', PASSWORD)
  await page.click('button:has-text("Entrar")')
  await page.waitForURL('**/dashboard**', { timeout: 15000 })
  await page.waitForTimeout(3500) // esperar carga de stats + render de recharts
  await page.screenshot({ path: path.join(OUT, 'dashboard-stats.png') })
  console.log('Screenshot guardado: dashboard-stats.png')
  console.log('consoleErrors:', JSON.stringify([...new Set(consoleErrors)]))
  console.log('networkErrors:', JSON.stringify([...new Set(networkErrors)]))
} catch (err) {
  console.log('FAIL:', err.message)
  await page.screenshot({ path: path.join(OUT, 'dashboard-stats-fail.png') }).catch(() => {})
} finally {
  await browser.close()
}
