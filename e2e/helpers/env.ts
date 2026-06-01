import fs from 'node:fs'
import path from 'node:path'

/**
 * Parser mínimo de archivos .env (KEY=VALUE) sin dependencias externas.
 * No sobreescribe variables ya presentes en process.env (precedencia: lo cargado primero gana).
 */
function parseEnvFile(file: string): void {
  if (!fs.existsSync(file)) return

  for (const rawLine of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const eq = line.indexOf('=')
    if (eq === -1) continue

    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()

    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    if (quoted) value = value.slice(1, -1)

    if (process.env[key] === undefined) process.env[key] = value
  }
}

/**
 * Carga las variables de entorno necesarias para E2E.
 * `.env.local` aporta las claves de Supabase del proyecto; `.env.test` las credenciales de prueba.
 */
export function loadTestEnv(): void {
  const root = process.cwd()
  parseEnvFile(path.join(root, '.env.local'))
  parseEnvFile(path.join(root, '.env.test'))
}
