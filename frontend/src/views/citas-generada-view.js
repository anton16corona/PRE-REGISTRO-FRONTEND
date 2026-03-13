import { LitElement, html } from 'lit';
import '../components/ipes-header.js';
import { citasGeneradaStyles } from '../styles/citas-generada.styles.js';
import { ENDPOINTS } from '../config/api.config.js';
import { DOCUMENTACION_PREREGISTRO, SEDES } from '../config/proceso-info.config.js';

export class CitasGeneradaView extends LitElement {

  static styles = [citasGeneradaStyles];

  static properties = {
    folio:         { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig:  { type: Object },
    enviandoCorreo:{ type: Boolean }  // ← muestra estado mientras llama a la API
  };

  constructor() {
    super();
    this.folio          = sessionStorage.getItem('folio_preregistro') || '---';
    this.mostrarAlerta  = false;
    this.alertaConfig   = {};
    this.enviandoCorreo = false;
  }

  /* ─────────────────────────────────────────────────────────────
   *  HELPERS
   * ───────────────────────────────────────────────────────────── */

  // Elimina etiquetas HTML del texto de documentación y sede
  _limpiarHTML(texto) {
    return texto?.replace(/<[^>]*>/g, '') || '';
  }

  // Extrae las siglas del perfil desde el folio
  // Formato: SSPMQ/IPES/GC/6-342  →  GC
  _siglasDesdeForlio(folio) {
    return folio?.split('/')?.[2] || 'GC';
  }

  // Formatea "2026-03-15" → "15 de MARZO de 2026"
  _formatearFecha(fechaISO) {
    if (!fechaISO) return '';
    const meses = [
      'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
      'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
    ];
    const [anio, mes, dia] = fechaISO.split('-');
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${anio}`;
  }

  /* ─────────────────────────────────────────────────────────────
   *  ENVÍO DEL CORREO DE CONFIRMACIÓN  ← integración con Email API
   * ───────────────────────────────────────────────────────────── */

  async _enviarCorreoConfirmacion() {
    try {
      // 1. Leer datos del candidato guardados en preregistro-paso-correo.js
      const paso1  = JSON.parse(sessionStorage.getItem('candidato_paso1') || '{}');
      const correo = paso1.correoElectronico || paso1.correo || paso1.email || '';

      if (!correo) {
        console.warn('⚠️ No se encontró el correo del candidato en sessionStorage.');
        return;
      }

      // 2. Leer datos de la cita guardados en citas-calendario-view.js
      const citaFecha = sessionStorage.getItem('cita_fecha') || '';
      const citaHora  = sessionStorage.getItem('cita_hora')  || '';

      // 3. Obtener documentación y sede desde proceso-info.config.js
      const siglas     = this._siglasDesdeForlio(this.folio);
      const docsPerfil = DOCUMENTACION_PREREGISTRO[siglas] || DOCUMENTACION_PREREGISTRO['GC'];

      const documentacion = [
        this._limpiarHTML(docsPerfil.intro),
        this._limpiarHTML(docsPerfil.comunes),
        this._limpiarHTML(docsPerfil.especificos),
        [
          'NOTAS:',
          '* Los documentos con (*) deberán tener fecha de emisión del mes en que se presenta la inscripción.',
          '** Los documentos con (**) son certificados escolares oficiales.'
        ].join('\n')
      ].join('\n\n');

      const sede = this._limpiarHTML(SEDES['pre-registro']);

      // 4. Llamar al endpoint de confirmación de cita de la Email API
      const resp = await fetch(ENDPOINTS.emailConfirmacionCita, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correoElectronico: correo,
          nombre:            paso1.nombre    || '',
          apellido1:         paso1.apellido1 || '',
          apellido2:         paso1.apellido2 || '',
          curp:              paso1.curp      || '',
          folio:             this.folio,
          citaFecha:         this._formatearFecha(citaFecha),
          citaHora:          citaHora,
          documentacion:     documentacion,
          sede:              sede,
          telefonos:         '442 427 67 00 ext. 4987, 4921, 4314, 4936, 4932'
        })
      });

      const result = await resp.json();

      if (result.success) {
        console.log('✅ Correo de confirmación enviado a:', correo);
      } else {
        console.error('⚠️ La API no pudo enviar el correo:', result.message);
      }

    } catch (err) {
      // Fallo silencioso: la cita ya fue guardada, no bloqueamos al candidato
      console.error('⚠️ Error al conectar con la Email API:', err);
    }
  }

  /* ─────────────────────────────────────────────────────────────
   *  ACCIONES
   * ───────────────────────────────────────────────────────────── */

  async aceptar() {
    this.enviandoCorreo = true;

    // Enviar correo completo con datos del candidato + cita + documentación
    await this._enviarCorreoConfirmacion();

    this.enviandoCorreo = false;
    this.mostrarAlerta  = true;
    this.alertaConfig   = {
      tipo:    'exito',
      titulo:  'Cita registrada exitosamente',
      mensaje: 'La información de tu cita fue enviada correctamente al correo electrónico proporcionado.',
      extra:   `Tu folio de seguimiento es: ${this.folio}`,
      boton:   'ENTENDIDO'
    };
  }

  consultarFolio() {
    sessionStorage.setItem('folio_consulta', this.folio);
    globalThis.history.pushState({}, '', '/consulta-folio');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
    globalThis.history.pushState({}, '', '/convocatorias');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  /* ============================================= HTML ============================================= */

  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra || ''}
          .boton=${this.alertaConfig.boton}
          @alerta-cerrar=${() => this.cerrarAlerta()}
          @alerta-aceptar=${() => this.cerrarAlerta()}
        ></alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <div class="fondo">
        <div class="card">
          <div class="icono">
            <svg viewBox="0 0 24 24">
              <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z"/>
            </svg>
          </div>

          <div class="titulo">CITA GENERADA</div>

          <div class="folio">
            Folio: <strong>${this.folio}</strong>
          </div>

          <div class="texto">
            Se ha generado tu cita exitosamente. Para consultar los detalles
            de tu asistencia, se enviará la información al correo electrónico
            proporcionado al presionar ACEPTAR, o bien puedes consultar con tu folio.
          </div>

          <div class="acciones">
            <div
              class="btn primario"
              @click=${() => this.aceptar()}
              style="${this.enviandoCorreo ? 'opacity:0.7;pointer-events:none;' : ''}"
            >
              ${this.enviandoCorreo ? 'ENVIANDO...' : 'ACEPTAR'}
            </div>
            <div class="btn secundario" @click=${() => this.consultarFolio()}>
              CONSULTAR CON FOLIO
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-generada-view', CitasGeneradaView);