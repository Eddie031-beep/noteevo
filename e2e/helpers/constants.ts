/**
 * Prefijo único para todos los datos creados por los tests E2E.
 * El teardown borra cualquier libreta/nota/tarea/etiqueta/adjunto cuyo nombre empiece con esto,
 * dejando la cuenta de prueba limpia tras cada corrida.
 */
export const PREFIX = 'E2E-'
