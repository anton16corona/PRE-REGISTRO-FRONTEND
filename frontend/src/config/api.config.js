/**
 * api.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Configuración central de las URLs de la API.
 *
 * ➤ Para pruebas locales (json-server corriendo en puerto 3000):
 *      export const API_BASE = 'http://localhost:3000';
 *
 * ➤ Para conectar a la API Java desplegada en Payara:
 *      export const API_BASE = 'http://localhost:8080/api-conexion-1.0-SNAPSHOT/api';
 *
 * Solo cambia el valor de API_BASE aquí para cambiar de entorno.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── MODO ACTIVO: cambia entre json-server y Payara aquí ──────────────────────
export const API_BASE = 'http://localhost:3000';

// ── ENDPOINTS disponibles en la API Java ─────────────────────────────────────
export const ENDPOINTS = {
  convocatorias: `${API_BASE}/convocatoria`,
};