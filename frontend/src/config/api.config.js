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
export const API_BASE = 'http://localhost:8080/api-conexion/api';

// ── Base de la Email API (desplegada como WAR separado en Payara) ─────────────
const EMAIL_API_BASE = 'http://localhost:8080/email-api/api/email';

// ── ENDPOINTS disponibles en la API Java ─────────────────────────────────────
export const ENDPOINTS = {
  convocatorias:  `${API_BASE}/convocatoria`,
  escolaridades:  `${API_BASE}/escolaridad`,
  perfiles:       `${API_BASE}/perfil`,
  sedes:          `${API_BASE}/sede`,
  horarios:       (idSede) => `${API_BASE}/horario/${idSede}`,
  preregistro:    `${API_BASE}/preregistro`,

  // ── Email API ────────────────────────────────────────────────────────────────
  // Genera un código de 6 dígitos y lo envía al correo del aspirante.
  // Devuelve el código en la respuesta para que el frontend lo valide.
  emailCodigoVerificacion: `${EMAIL_API_BASE}/codigo-verificacion`,

  // Envía el correo completo de confirmación con datos del candidato,
  // fecha/hora de cita, sede y documentación requerida.
  emailConfirmacionCita:   `${EMAIL_API_BASE}/confirmacion-cita`,
};