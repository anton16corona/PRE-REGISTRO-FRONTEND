/**
 * ============================================================================
 * CONFIGURACIÓN DE INFORMACIÓN POR PERFIL Y ETAPA
 * ============================================================================
 * 
 * Este archivo contiene toda la información organizada por:
 * - Perfil policial (GC, GA, GV, PA, PP, etc.)
 * - Etapa del proceso (Pre-registro, Registro, Evaluación Médica, etc.)
 * 
 * Estructura:
 * PROCESO_INFO[perfil][etapa] = { sede, documentacion, mensaje, requisitos }
 */

// ============================================================================
// SEDES POR ETAPA
// ============================================================================

export const SEDES = {
  'pre-registro': `Deberás acudir a:
        
SECRETARÍA DE SEGURIDAD 
PÚBLICA MUNICIPAL DE QUERÉTARO

Av. Tláloc 102, Desarrollo San Pablo,
76130 Santiago de Querétaro, Qro.

Teléfono de contacto:
442 427 67 00 ext.
4987, 4921, 4314, 4936, 4932.`,

  'registro': `Deberás acudir a:
        
CENTRO DE EVALUACIÓN IPES

Av. Constituyentes 1, Centro Histórico,
76000 Santiago de Querétaro, Qro.

Horario de atención:
Lunes a Viernes de 8:00 a 14:00 hrs`,

  'evaluacion-medica': `Deberás acudir a:
        
CENTRO MÉDICO POLICIAL

Calle 5 de Febrero 45, Col. Centro,
76000 Santiago de Querétaro, Qro.

Horario de atención:
Lunes a Viernes de 7:00 a 15:00 hrs`,

  'evaluacion-psicometrica': `Deberás acudir a:
        
DEPARTAMENTO DE PSICOLOGÍA IPES

Av. Constituyentes 1, Centro Histórico,
76000 Santiago de Querétaro, Qro.

Horario de atención:
Lunes a Sábado de 8:00 a 14:00 hrs`,

  'control-confianza': `Deberás acudir a:
        
CENTRO ESTATAL DE CONTROL DE CONFIANZA

Libramiento Sur-Poniente 1000, El Salitre,
76127 Santiago de Querétaro, Qro.

Horario de atención:
Lunes a Viernes de 8:00 a 16:00 hrs`
};

// ============================================================================
// DOCUMENTACIÓN COMÚN (TODOS LOS PERFILES)
// ============================================================================

const DOCS_COMUNES = `• CURP original y copia
• Acta de nacimiento original y copia
• Comprobante de domicilio (máximo 3 meses)
• Identificación oficial vigente (INE/IFE)
• RFC con homoclave
• Certificado médico reciente
• Cartilla del Servicio Militar Nacional (hombres)
• Comprobante de no antecedentes penales`;

// ============================================================================
// DOCUMENTACIÓN POR PERFIL - PRE-REGISTRO
// ============================================================================

export const DOCUMENTACION_PREREGISTRO = {
  // GUARDIA CÍVICA
  'GC': `Documentación requerida:

${DOCS_COMUNES}
• Certificado de secundaria terminada
• Carta de no inhabilitación
• Licencia de conducir vigente tipo A`,

  // GUARDIA AUXILIAR
  'GA': `Documentación requerida:

${DOCS_COMUNES}
• Certificado de secundaria terminada
• Carta de no inhabilitación`,

  // GUARDIA VIAL
  'GV': `Documentación requerida:

${DOCS_COMUNES}
• Certificado de secundaria terminada
• Licencia de conducir vigente tipo A o B
• Certificado de manejo defensivo (deseable)`,

  // POLICÍA AUXILIAR
  'PA': `Documentación requerida:

${DOCS_COMUNES}
• Certificado de secundaria terminada
• Constancia de buena conducta
• Carta de recomendación (2)`,

  // POLICÍA DE PROXIMIDAD
  'PP': `Documentación requerida:

${DOCS_COMUNES}
• Certificado de bachillerato terminado
• Constancia de calificaciones
• Carta de motivos (1 cuartilla)
• Cartas de recomendación (2)`,

  // POLICÍA CIBERNÉTICA
  'PC': `Documentación requerida:

${DOCS_COMUNES}
• Título profesional o cédula de Licenciatura
• Constancia de calificaciones universitarias
• Carta de motivos (2 cuartillas)
• Certificaciones en tecnología (opcional pero deseable)
• Cartas de recomendación (2)`,

  // ANÁLISIS EN SEGURIDAD PÚBLICA
  'UA': `Documentación requerida:

${DOCS_COMUNES}
• Título profesional o cédula de Licenciatura
• Constancia de calificaciones universitarias
• Carta de motivos (2 cuartillas)
• Tesis o proyecto de investigación (opcional)
• Cartas de recomendación (2)`,

  // ATENCIÓN A VÍCTIMAS
  'AV': `Documentación requerida:

${DOCS_COMUNES}
• Título profesional o cédula de Licenciatura
• Constancia de calificaciones universitarias
• Carta de motivos enfocada en trabajo social (2 cuartillas)
• Certificados de cursos en atención psicológica o victimología (deseable)
• Cartas de recomendación (2)`
};

// ============================================================================
// INFORMACIÓN POR ETAPA - REGISTRO
// ============================================================================

export const INFO_REGISTRO = {
  mensaje: `Presentación de documentación original

Deberás presentarte con todos los documentos originales enlistados en la etapa de Pre-registro.

El personal verificará la autenticidad de tus documentos y se realizará:
• Toma de fotografía oficial
• Registro de huellas dactilares
• Firma de documentos oficiales
• Asignación de número de candidato

IMPORTANTE: La falta de algún documento original impedirá continuar con el proceso.`,

  documentacion: `Documentos adicionales para esta etapa:

• Todos los documentos originales del Pre-registro
• 4 fotografías tamaño infantil (recientes, fondo blanco)
• Comprobante de Pre-registro impreso
• Identificación oficial vigente`
};

// ============================================================================
// INFORMACIÓN POR ETAPA - EVALUACIÓN MÉDICA
// ============================================================================

export const INFO_EVALUACION_MEDICA = {
  mensaje: `Evaluación médica integral

Se realizarán los siguientes estudios médicos:

• Examen físico general
• Análisis de sangre completo
• Análisis de orina
• Prueba de esfuerzo cardiovascular
• Evaluación oftalmológica
• Evaluación auditiva
• Radiografía de tórax
• Evaluación odontológica

Indicaciones:
• Asistir en ayuno de 8 horas
• Ropa cómoda para actividad física
• Traer toalla y cambio de ropa
• No usar lentes de contacto (traer armazón)

Duración aproximada: 3-4 horas`,

  documentacion: `Requisitos para esta etapa:

• Comprobante de registro
• Identificación oficial
• Ayuno de 8 horas
• Ropa deportiva
• Toalla personal
• Agua para hidratación`
};

// ============================================================================
// INFORMACIÓN POR ETAPA - EVALUACIÓN PSICOMÉTRICA
// ============================================================================

export const INFO_EVALUACION_PSICOMETRICA = {
  mensaje: `Evaluación psicológica y psicométrica

La evaluación consta de:

• Batería de pruebas psicométricas (3 horas aprox.)
• Entrevista psicológica individual (1 hora aprox.)
• Test de personalidad
• Evaluación de aptitudes
• Evaluación de habilidades cognitivas

Indicaciones:
• Descansar bien la noche anterior
• Desayunar adecuadamente
• Presentarse puntual
• No consumir sustancias estimulantes

Duración aproximada: 4-5 horas`,

  documentacion: `Requisitos para esta etapa:

• Comprobante de evaluación médica APROBADA
• Identificación oficial
• Lápiz del número 2 y goma
• Pluma negra
• Agua para hidratación`
};

// ============================================================================
// INFORMACIÓN POR ETAPA - CONTROL DE CONFIANZA
// ============================================================================

export const INFO_CONTROL_CONFIANZA = {
  mensaje: `Evaluación de Control de Confianza

Esta es la etapa final del proceso de selección.

Se realizarán:
• Polígrafo (detector de mentiras)
• Entrevista socioeconómica
• Estudio de contexto social
• Visita domiciliaria
• Investigación de antecedentes
• Examen toxicológico

Indicaciones:
• Presentarse en ayuno de 4 horas
• Traer copias de documentos personales
• Proporcionar referencias personales (5)
• Cooperar con la visita domiciliaria

IMPORTANTE: Esta evaluación se realiza conforme a la Ley General del Sistema Nacional de Seguridad Pública.

Duración aproximada: 6-8 horas`,

  documentacion: `Requisitos para esta etapa:

• Comprobante de evaluación psicométrica APROBADA
• Identificación oficial
• Comprobante de domicilio actualizado
• Referencias personales (5 personas con datos completos)
• Copia de identificaciones de referencias
• Autorización para visita domiciliaria (firmada)
• Carta de no objeción de familiares directos`
};

// ============================================================================
// FUNCIÓN HELPER PARA OBTENER INFORMACIÓN
// ============================================================================

/**
 * Obtiene la información completa de una etapa según el perfil
 * @param {string} perfil - Código del perfil (GC, GA, GV, PA, PP, PC, UA, AV)
 * @param {number} etapaIndex - Índice de la etapa (0-4)
 * @returns {object} Objeto con sede, documentacion y mensaje
 */
export function getInformacionEtapa(perfil, etapaIndex) {
  const etapas = [
    'pre-registro',
    'registro',
    'evaluacion-medica',
    'evaluacion-psicometrica',
    'control-confianza'
  ];

  const etapaNombre = etapas[etapaIndex];

  // Caso especial: Pre-registro (depende del perfil)
  if (etapaIndex === 0) {
    return {
      sede: SEDES[etapaNombre],
      documentacion: DOCUMENTACION_PREREGISTRO[perfil] || DOCUMENTACION_PREREGISTRO['GC'],
      mensaje: null
    };
  }

  // Resto de etapas (comunes para todos)
  const infoMap = {
    'registro': INFO_REGISTRO,
    'evaluacion-medica': INFO_EVALUACION_MEDICA,
    'evaluacion-psicometrica': INFO_EVALUACION_PSICOMETRICA,
    'control-confianza': INFO_CONTROL_CONFIANZA
  };

  const info = infoMap[etapaNombre];

  return {
    sede: SEDES[etapaNombre],
    documentacion: info?.documentacion,
    mensaje: info?.mensaje
  };
}

/**
 * Extrae el código de perfil del folio
 * @param {string} folio - Folio completo (ej: "SSPMQ/IPES/GC/6-001")
 * @returns {string} Código del perfil (ej: "GC")
 */
export function extraerPerfilDeFolio(folio) {
  // Formato: SSPMQ/IPES/[PERFIL]/[CONVOCATORIA]-[CONSECUTIVO]
  const partes = folio.split('/');
  return partes[2] || 'GC'; // Por defecto GC si no se encuentra
}

// ============================================================================
// MAPEO DE CÓDIGOS A NOMBRES COMPLETOS
// ============================================================================

export const NOMBRES_PERFILES = {
  'GC': 'Guardia Cívica',
  'GA': 'Guardia Auxiliar',
  'GV': 'Guardia Vial',
  'PA': 'Policía Auxiliar',
  'PP': 'Policía de Proximidad',
  'PC': 'Policía Cibernética',
  'UA': 'Análisis en Seguridad Pública',
  'AV': 'Atención a Víctimas'
};