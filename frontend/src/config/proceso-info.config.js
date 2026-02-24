/**
 * ============================================================================
 * CONFIGURACIÓN DE INFORMACIÓN POR PERFIL Y ETAPA - CORREGIDA
 * ============================================================================
 */

// ============================================================================
// COLORES POR PERFIL
// ============================================================================

export const COLORES_PERFIL = {
  'GC': '#8B4513',  // Café (Guardia Cívica)
  'GA': '#2E7D32',  // Verde oscuro (Guardia Auxiliar)
  'GV': '#F57C00',  // Naranja (Guardia Vial)
  'PA': '#1976D2',  // Azul (Policía Auxiliar)
  'PP': '#5374a8',  // Azul institucional (Policía de Proximidad)
  'PC': '#7B1FA2',  // Morado (Policía Cibernética)
  'UA': '#C62828',  // Rojo oscuro (Análisis)
  'AV': '#00897B'   // Verde azulado (Atención a Víctimas)
};

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

const DOCS_COMUNES = `• Acta de nacimiento * (Formato actualizado con Código QR).
• Credencial de Elector vigente INE.
• Licencia para conducir vigente, expedida en el estado de Querétaro (en caso de contar con ella).
• Oficio de baja voluntaria y/u hoja de servicio, en caso de que haya pertenecido al Ejército, Armada, Fuerza Aérea Mexicana o alguna corporación policial del país.
• Comprobante de domicilio. *
• Constancia de Situación Fiscal (RFC) que emite el SAT.
• Número de Seguridad Social (NSS).
• Clave Única de Registro de Población (CURP).
• Currículum vitae actualizado con fotografía reciente y con firma autógrafa en cada hoja, que incluya al menos las actividades realizadas en los últimos tres años.
• Una fotografía reciente tamaño infantil a color, fondo blanco, de frente, sin lentes, con orejas y frente descubiertas. En caso de mujeres, sin maquillaje ni accesorios.`;

// ============================================================================
// DOCUMENTACIÓN POR PERFIL - PRE-REGISTRO
// ============================================================================

export const DOCUMENTACION_PREREGISTRO = {
  'GC': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Certificado de estudios concluidos del nivel de SECUNDARIA, ** reconocidos oficialmente.`
  },
  'GA': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Certificado de estudios concluidos del nivel de SECUNDARIA, ** reconocidos oficialmente.`
  },
  'GV': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Certificado de estudios concluidos del nivel de SECUNDARIA, ** reconocidos oficialmente.`
  },
  'PA': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Cartilla del Servicio Militar Nacional liberada, tratándose de hombres (presentar copia de pre-cartilla y hoja de liberación).
• Certificado de estudios concluidos del nivel de SECUNDARIA, ** reconocidos oficialmente.`
  },
  'PP': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Cartilla del Servicio Militar Nacional liberada, tratándose de hombres (presentar copia de pre-cartilla y hoja de liberación).
• Certificado de estudios concluidos del nivel de BACHILLERATO, ** reconocidos oficialmente.`
  },
  'PC': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Cartilla del Servicio Militar Nacional liberada, tratándose de hombres (presentar copia de pre-cartilla y hoja de liberación).
• Certificado de estudios concluidos del nivel de LICENCIATURA, ** reconocidos oficialmente y en las siguientes áreas: Sistemas Computacionales o Informática.`
  },
  'UA': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Cartilla del Servicio Militar Nacional liberada, tratándose de hombres (presentar copia de pre-cartilla y hoja de liberación).
• Certificado de estudios concluidos del nivel de LICENCIATURA, ** reconocidos oficialmente.`
  },
  'AV': {
    intro: `Deberá presentar en un fólder tamaño carta, color beige, 
en 3 COPIAS legibles (anverso y reverso), los siguientes 
documentos, asegurándose de que se encuentren en el siguiente orden:`,
    comunes: DOCS_COMUNES,
    especificos: `• Cartilla del Servicio Militar Nacional liberada, tratándose de hombres (presentar copia de pre-cartilla y hoja de liberación).
• Certificado de estudios concluidos del nivel de LICENCIATURA, ** reconocidos oficialmente y en áreas afines a la Seguridad Pública, pudiendo ser Derecho, Psicología, Victimología o Criminología, Ciencias de la Seguridad, Seguridad Pública, Trabajo Social o Sociología.`
  }
};

// ============================================================================
// INFORMACIÓN POR ETAPA - OTRAS ETAPAS
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
// LEYENDAS DE ASTERISCOS
// ============================================================================

export const LEYENDAS_ASTERISCOS = `

NOTAS IMPORTANTES:

* Los documentos con * deberán tener fecha de emisión del mes en que se presenta la inscripción.

** Los documentos con ** son certificados escolares oficiales.`;

// ============================================================================
// MENSAJES SIMPLES PARA ALERTAS DE ETAPAS BLOQUEADAS
// ============================================================================

export const MENSAJES_BLOQUEADOS = [
  'Para conocer más sobre esta etapa, deberás primero completar y aprobar el Pre-registro.',
  'Para conocer más sobre esta etapa, deberás primero completar y aprobar el Registro.',
  'Para conocer más sobre esta etapa, deberás primero completar y aprobar la Evaluación Médica.',
  'Para conocer más sobre esta etapa, deberás primero completar y aprobar la Evaluación Psicométrica.'
];

// ============================================================================
// FUNCIÓN HELPER
// ============================================================================

export function getInformacionEtapa(perfil, etapaIndex) {
  const etapas = [
    'pre-registro',
    'registro',
    'evaluacion-medica',
    'evaluacion-psicometrica',
    'control-confianza'
  ];

  const etapaNombre = etapas[etapaIndex];

  if (etapaIndex === 0) {
    const docsPerfil = DOCUMENTACION_PREREGISTRO[perfil] || DOCUMENTACION_PREREGISTRO['GC'];
    
    return {
      sede: SEDES[etapaNombre],
      documentacion: `${docsPerfil.intro}

${docsPerfil.comunes}

${docsPerfil.especificos}

${LEYENDAS_ASTERISCOS}`,
      mensaje: null,
      mensajeAlerta: null,
      colorPerfil: COLORES_PERFIL[perfil]
    };
  }

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
    mensaje: info?.mensaje,
    mensajeAlerta: MENSAJES_BLOQUEADOS[etapaIndex - 1],
    colorPerfil: COLORES_PERFIL[perfil]
  };
}

export function extraerPerfilDeFolio(folio) {
  const partes = folio.split('/');
  return partes[2] || 'GC';
}

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