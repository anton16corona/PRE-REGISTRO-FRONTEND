import { LitElement, html } from 'lit';
import '../components/ipes-header.js';
import './pdf-zoom-viewer.js';
import './alerta-view.js'; // ✅ AGREGADO

import { preregistroTresStyles } from '../styles/preregistro-tres.styles.js';

export class PreregistroPasoCorreo extends LitElement 
{
  static styles = [preregistroTresStyles];

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    medio: { state: true },
    aceptaTerminos: { state: true },
    codigoEnviado: { state: true },
    codigo: { state: true },
    mostrarAlerta: { state: true },
    alertaConfig: { state: true },

    termsAccepted: { state: true },
    privacyAccepted: { state: true },
    showTermsModal: { state: true },
    showPrivacyModal: { state: true },
    showCodigoModal: { state: true },
    privacyPdfCargado: { state: true },
    termsPdfCargado: { state: true },
    mostrarAlertaCancelar: { state: true },
    checkboxManual: { state: true }
  };

  constructor() {
    super();
    this.medio = '';
    this.aceptaTerminos = false;
    this.codigoEnviado = false;
    this.codigo = '';
    this.mostrarAlerta = false;
    this.alertaConfig = {};

    this.termsAccepted = false;
    this.privacyAccepted = false;
    this.showTermsModal = false;
    this.showPrivacyModal = false;
    this.showCodigoModal = false;
    this.privacyPdfCargado = false;
    this.termsPdfCargado = false;
    this.mostrarAlertaCancelar = false;
    this.checkboxManual = false;
  }

  getSiglasConvocatoria(origen) {
    if (!origen) return 'GC';

    if (origen.includes('guardia-civica')) return 'GC';
    if (origen.includes('guardia-vial')) return 'GV';
    if (origen.includes('guardia-auxiliar')) return 'GA';
    if (origen.includes('auxiliar')) return 'PA';
    if (origen.includes('proximidad-cibernetica')) return 'PC';
    if (origen.includes('proximidad-victimas')) return 'AV';
    if (origen.includes('proximidad-seg-pub')) return 'UA';
    if (origen.includes('proximidad')) return 'PP';

    return 'GC';
  }

  async generarFolio(siglas) {
    const resp = await fetch(`http://localhost:3000/preregistros?siglas=${siglas}`);
    const registros = await resp.json();
    const siguiente = registros.length + 1;
    const consecutivo = String(siguiente).padStart(3, '0');
    return `SSPMQ/IPES/${siglas}/6-${consecutivo}`;
  }

  async validarCURPExistente(curp) {
    const resp = await fetch(`http://localhost:3000/preregistros?curp=${curp}`);
    const data = await resp.json();
    return data.length > 0;
  }

  get formValido() {
    return this.medio !== '' && this.aceptaTerminos;
  }

  get codigoValido() {
    return this.codigo.length === 6;
  }

  handleCodigo(e) {
    this.codigo = e.target.value.replaceAll(/\D/g, '').slice(0, 6);
  }

  onChangeMedio(e) {
    this.medio = e.target.value;
  }

  onToggleTerminos(e) {
    this.aceptaTerminos = e.target.checked;
  }

  // Limpia SOLO los datos del flujo, nunca origen_convocatoria
  _limpiarFlujo() {
    sessionStorage.removeItem('paso1_data');
    sessionStorage.removeItem('paso2_data');
    sessionStorage.removeItem('preregistro_data');
    sessionStorage.removeItem('folio_preregistro');
    sessionStorage.removeItem('preregistro_completado');
    sessionStorage.removeItem('preregistro_final');
  }

  goBack() {
    this._navegandoDentroDelFlujo = true;
    globalThis.location.href = '/preregistro-continuacion';
  }

  cancelar() {
    this.mostrarAlertaCancelar = true;
  }

  confirmarCancelacion() {
    this.mostrarAlertaCancelar = false;
    this._navegandoDentroDelFlujo = true;
    this._limpiarFlujo();
    const origen = sessionStorage.getItem('origen_convocatoria');
    globalThis.location.href = origen || '/convocatorias-view';
  }

  enviarCodigo() {
    this.showCodigoModal = true;
  }

  onlyNumbers(e) {
    this.codigo = e.target.value.replaceAll(/\D/g, '').slice(0, 6);
  }

  finalizar() {
    if (this.codigo === '000000') {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'info',
        titulo: 'Código no válido',
        mensaje: 'El código ingresado no coincide con el enviado a tu correo electrónico.',
        extra: 'Por favor, verifica que sea el mismo que se te ha enviado en tu dirección de correo.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    const data = JSON.parse(sessionStorage.getItem('preregistro_data'));

    data.paso3 = {
      medio: this.medio,
      fechaEnvio: new Date().toISOString()
    };

    const preregistroFinal = {
      ...data.paso1,
      ...data.paso2,
      ...data.paso3,
      estatus: 'PENDIENTE'
    };

    sessionStorage.setItem('preregistro_final', JSON.stringify(preregistroFinal));

    const folio = `GC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Remover beforeunload para que no limpie el folio al redirigir
    globalThis.removeEventListener('beforeunload', this._beforeUnloadHandler);

    // Limpiar datos del flujo, conservar folio y completado
    sessionStorage.removeItem('paso1_data');
    sessionStorage.removeItem('paso2_data');
    sessionStorage.removeItem('preregistro_data');

    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', folio);

    globalThis.location.href = '/preregistro-completado';
  }

  connectedCallback() {
    super.connectedCallback();
    const data = sessionStorage.getItem('preregistro_data');
    if (!data) {
      globalThis.location.href = '/preregistro';
      return;
    }
    this._navegandoDentroDelFlujo = false;
    this._beforeUnloadHandler = () => {
      if (!this._navegandoDentroDelFlujo) this._limpiarFlujo();
    };
    globalThis.addEventListener('beforeunload', this._beforeUnloadHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    globalThis.removeEventListener('beforeunload', this._beforeUnloadHandler);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;

    if (this.alertaConfig?.titulo === 'Código no válido') {
      this.codigo = '';
      this.showCodigoModal = true;
    }
  }

  /* =========================== TÉRMINOS Y AVISOS =========================== */
  get allAccepted() {
    return (this.termsAccepted && this.privacyAccepted) || this.checkboxManual;
  }

  openTermsModal() {
    this.termsPdfCargado = false;
    this.showTermsModal = true;
  }

  onTermsPdfLoaded() {
    this.termsPdfCargado = true;
  }

  openPrivacyModal() {
    this.privacyPdfCargado = false;
    this.showPrivacyModal = true;
  }

  onPrivacyPdfLoaded() {
    this.privacyPdfCargado = true;
  }

  acceptLegal(type) {
    if (type === 'terms') {
      this.termsAccepted = true;
      this.showTermsModal = false;
    }
    if (type === 'privacy') {
      this.privacyAccepted = true;
      this.showPrivacyModal = false;
    }
    this.requestUpdate();
  }

  async validarDesdeModal() {
    if (this.codigo === '000000') {
      this.alertaConfig = {
        tipo: 'info',
        titulo: 'Código no válido',
        mensaje: 'El código ingresado no coincide con el enviado.',
        extra: 'Verifica el código enviado a tu correo.',
        boton: 'INTENTAR DE NUEVO'
      };
      this.showCodigoModal = false;
      this.mostrarAlerta = true;
      return;
    }

    this.showCodigoModal = false;

    const data = JSON.parse(sessionStorage.getItem('preregistro_data'));

    data.paso3 = {
      medio: this.medio,
      fechaEnvio: new Date().toISOString()
    };

    const curp = data.paso1.curp;
    const existe = await this.validarCURPExistente(curp);

    if (existe) {
      this.alertaConfig = {
        tipo: 'info',
        titulo: 'CURP ya registrada',
        mensaje: 'Ya existe un preregistro con esta CURP.',
        extra: 'No es posible realizar más de un preregistro.',
        boton: 'ENTENDIDO'
      };
      this.mostrarAlerta = true;
      return;
    }

    const origen = sessionStorage.getItem('origen_convocatoria');
    const siglas = this.getSiglasConvocatoria(origen);
    const folio  = await this.generarFolio(siglas);

    const preregistroFinal = {
      ...data.paso1,
      ...data.paso2,
      ...data.paso3,
      siglas: siglas,
      folio: folio,
      estatus: 'PENDIENTE',
      fechaRegistro: new Date().toISOString()
    };

    await fetch('http://localhost:3000/preregistros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preregistroFinal)
    });

    // Remover beforeunload para que no limpie el folio al redirigir
    globalThis.removeEventListener('beforeunload', this._beforeUnloadHandler);

    // Limpiar datos del flujo (ya guardados en BD), conservar folio y completado
    sessionStorage.removeItem('paso1_data');
    sessionStorage.removeItem('paso2_data');
    sessionStorage.removeItem('preregistro_data');
    sessionStorage.removeItem('preregistro_final');

    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', folio);

    globalThis.location.href = '/preregistro-completado';
  }

  /* ============================================= HTML ============================================= */
  renderLegalModal(type) {
    const isPrivacy = type === 'privacy';
    const title   = isPrivacy ? 'Aviso de Privacidad' : 'Términos y Condiciones';
    const pdfUrl  = isPrivacy ? '/convocatoria/AvisoPrivacidad.pdf' : '/convocatoria/TerminosCondiciones.pdf';
    const loaded  = isPrivacy ? this.privacyPdfCargado : this.termsPdfCargado;
    const onLoaded = isPrivacy ? this.onPrivacyPdfLoaded.bind(this) : this.onTermsPdfLoaded.bind(this);

    return html`
      <div class="modal-pdf-overlay">
        <div class="modal-pdf-container">
          <h2>${title}</h2>

          <div class="modal-pdf-viewer">
            <pdf-zoom-viewer
              pdfUrl="${pdfUrl}"
              @pdf-loaded=${onLoaded}
            ></pdf-zoom-viewer>

            ${!loaded ? html`
              <div class="modal-pdf-loading">
                <div class="modal-pdf-spinner"></div>
                <div class="modal-pdf-loading-texto">
                  Cargando documento<span class="modal-pdf-puntos"></span>
                </div>
              </div>
            ` : html`
              <div class="pdf-hint">
                <span class="pdf-hint-icon">👆</span>
                Da clic en el documento para verlo completo con zoom
              </div>
            `}
          </div>

          <div class="modal-pdf-actions">
            <button ?disabled=${!loaded} @click=${() => this.acceptLegal(type)}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    // Leer el correo del paso 1 para mostrarlo en el modal de verificación
    const correoRegistrado = (() => {
      try {
        const d = JSON.parse(sessionStorage.getItem('preregistro_data'))?.paso1 || {};
        return d.correoElectronico || d.correo || d.email || '';
      }
      catch { return ''; }
    })();

    return html`
      ${this.mostrarAlertaCancelar ? html`
        <alerta-view
          modal
          tipo="warning-cancelar"
          titulo="¿Cancelar preregistro?"
          mensaje="Se perderá todo el progreso e información proporcionada hasta este momento."
          extra="Esta acción no se puede deshacer."
          boton=""
          @alerta-cerrar=${() => { this.mostrarAlertaCancelar = false; }}
          @alerta-aceptar=${() => { this.mostrarAlertaCancelar = false; }}
        >
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:0.5rem;">
            <button
              style="background:transparent;color:#5a2800;border:2px solid #b8742a;border-radius:999px;padding:0.65rem 1.8rem;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.95rem;transition:all 0.2s;"
              @click=${() => { this.mostrarAlertaCancelar = false; }}
            >
              SEGUIR CON MI PREREGISTRO
            </button>
            <button
              style="background:#e06000;color:#fff;border:none;border-radius:999px;padding:0.7rem 2rem;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.95rem;transition:all 0.2s;"
              @click=${() => this.confirmarCancelacion()}
            >
              SÍ, CANCELAR
            </button>
          </div>
        </alerta-view>
      ` : ''}

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

      ${this.showCodigoModal ? html`
        <alerta-view
          modal
          tipo="info"
          titulo="Validación de correo electrónico"
          mensaje=""
          boton=""
          @alerta-cerrar=${() => { this.showCodigoModal = false; }}
          @alerta-aceptar=${() => {}}
        >
          <div class="codigo-wrapper">
            <p><strong>Estimado aspirante, hemos recibido tu solicitud para realizar un pre-registro como participante en alguno de los perfiles del Instituto Policial de Estudios Superiores de la Secretaría de Seguridad Pública Municipal de Querétaro.</strong></p>
            <p><strong>Para poder continuar con tu pre-registro, es necesario validar el correo electrónico proporcionado.</strong></p>
            <p><strong>Por favor introduce el siguiente Código de Verificación en el campo señalado:</strong></p>

            ${correoRegistrado ? html`
              <div class="correo-destino">
                <span class="correo-label">El código será enviado a:</span>
                <span class="correo-valor">${correoRegistrado}</span>
              </div>
            ` : ''}

            <div class="codigo-input-row">
              <label class="code"><strong>CÓDIGO DE VERIFICACIÓN:</strong></label>
              <input
                maxlength="6"
                .value=${this.codigo}
                @input=${e => this.handleCodigo(e)}
              />
            </div>

            <button
              class="btn-primario"
              ?disabled=${!this.codigoValido}
              @click=${() => this.validarDesdeModal()}
            >
              VALIDAR Y CONTINUAR
            </button>
          </div>
        </alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <main>
        <section class="panel">
          <h1 class="title">PRE-REGISTRO</h1>
          <p class="subtitle">Completa los campos solicitados con la información requerida.</p>

          <div class="form-group">
            <label>Medio por el cual se enteró de la convocatoria:</label>
            <select @change=${e => this.onChangeMedio(e)}>
              <option value="">Selecciona una opción...</option>
              <option value="redes">Redes Sociales</option>
              <option value="radio">Radio</option>
              <option value="tv">Televisión</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div class="terms">
            <div class="legal-text ${this.allAccepted ? 'active' : ''}">
              <input
                type="checkbox"
                .checked=${this.allAccepted}
                @change=${(e) => {
                  this.checkboxManual = e.target.checked;
                  // Si desmarca manualmente, resetear también los PDFs
                  if (!e.target.checked) {
                    this.termsAccepted = false;
                    this.privacyAccepted = false;
                  }
                  this.requestUpdate();
                }}
              />
              He leído y acepto los
              <span class="legal-link" @click=${() => this.openTermsModal()}>Términos y Condiciones</span>
              y el
              <span class="legal-link" @click=${() => this.openPrivacyModal()}>Aviso de Privacidad</span>
            </div>

            ${this.showTermsModal   ? this.renderLegalModal('terms')   : ''}
            ${this.showPrivacyModal ? this.renderLegalModal('privacy') : ''}
          </div>

          <p class="info">
            Para poder completar y enviar su pre-registro, es necesario validar su correo electrónico mediante un código.
          </p>

          <div class="actions">
            <button class="btn-secundario" @click=${() => this.goBack()}>VOLVER</button>
            <button
              ?disabled=${!(this.medio !== '' && this.allAccepted)}
              @click=${() => this.enviarCodigo()}
            >
              ENVIAR CÓDIGO
            </button>
            <button class="btn-cancelar" @click=${() => this.cancelar()}>CANCELAR</button>
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define('preregistro-paso-correo', PreregistroPasoCorreo);