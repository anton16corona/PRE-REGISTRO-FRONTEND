import { LitElement, html } from 'lit';
import '../components/ipes-header.js';
import './pdf-zoom-viewer.js';

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
    privacyPdfCargado: { state: true }
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

  enviarCodigo() {
    this.showCodigoModal = true;
  }

  onlyNumbers(e) {
    this.codigo = e.target.value.replaceAll(/\D/g, '').slice(0, 6);
  }

  finalizar() {
    //SIMULACIÓN: código incorrecto
    if (this.codigo === '000000') {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'info',
        titulo: 'Código no válido',
        mensaje:
          'El código ingresado no coincide con el enviado a tu correo electrónico.',
        extra:
          'Por favor, verifica que sea el mismo que se te ha enviado en tu dirección de correo.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    //Leer objeto maestro
    const data = JSON.parse(sessionStorage.getItem('preregistro_data'));

    //Agregar paso 3
    data.paso3 = {
      medio: this.medio,
      fechaEnvio: new Date().toISOString()
    };

    //Construir objeto final limpio
    const preregistroFinal = {
      ...data.paso1,
      ...data.paso2,
      ...data.paso3,
      estatus: 'PENDIENTE'
    };

    //Guardar JSON final (temporalmente)
    sessionStorage.setItem(
      'preregistro_final',
      JSON.stringify(preregistroFinal)
    );

    //Simular folio dinámico
    const folio = `GC-${Math.floor(100000 + Math.random() * 900000)}`;

    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', folio);

    //Redirigir
    globalThis.location.href = '/preregistro-completado';
  }

  connectedCallback() {
    super.connectedCallback();

    const data = sessionStorage.getItem('preregistro_data');

    if (!data) {
      globalThis.location.href = '/preregistro';
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;

    // si fue error de código, reabrimos modal
    if (this.alertaConfig?.titulo === 'Código no válido') {
      this.codigo = '';
      this.showCodigoModal = true;
    }
  }

  /* =========================== TÉRMINOS Y AVISOS ESTILOS =========================== */
  get allAccepted() {
    return this.termsAccepted && this.privacyAccepted;
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

  async validarDesdeModal() 
  {
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

    //VALIDAR CURP DUPLICADA
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

    //OBTENER CONVOCATORIA
    const origen = sessionStorage.getItem('origen_convocatoria');
    const siglas = this.getSiglasConvocatoria(origen);

    //GENERAR FOLIO
    const folio = await this.generarFolio(siglas);

    const preregistroFinal = {
      ...data.paso1,
      ...data.paso2,
      ...data.paso3,
      siglas: siglas,
      folio: folio,
      estatus: 'PENDIENTE',
      fechaRegistro: new Date().toISOString()
    };

    //GUARDAR
    await fetch('http://localhost:3000/preregistros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preregistroFinal)
    });

    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', folio);

    globalThis.location.href = '/preregistro-completado';
  }

  loremContent() {
    return html`
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
            <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    `;
  }

/* ============================================= HTML ============================================= */
  renderLegalModal(type) {
    const title =
      type === 'terms'
        ? 'Términos y Condiciones'
        : 'Aviso de Privacidad';

    return html`
      <div class="modal-overlay">
        <div class="modal-container">
          <h2>${title}</h2>

          <div class="modal-content">
            ${this.loremContent()}
          </div>

          <div class="modal-actions">
            <button @click=${() => this.acceptLegal(type)}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderPrivacyPdfModal() {
    return html`
      <div class="modal-pdf-overlay">
        <div class="modal-pdf-container">
          <h2>Aviso de Privacidad</h2>

          <div class="modal-pdf-viewer">
            <pdf-zoom-viewer
              pdfUrl="/convocatoria/AvisoPrivacidad.pdf"
              @pdf-loaded=${this.onPrivacyPdfLoaded}
            ></pdf-zoom-viewer>

            ${!this.privacyPdfCargado ? html`
              <div class="modal-pdf-loading">
                <div class="modal-pdf-spinner"></div>
                <div class="modal-pdf-loading-texto">
                  Cargando aviso de privacidad<span class="modal-pdf-puntos"></span>
                </div>
              </div>
            ` : ''}
          </div>

          <div class="modal-pdf-actions">
            <button
              ?disabled=${!this.privacyPdfCargado}
              @click=${() => this.acceptLegal('privacy')}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra}
          .boton=${this.alertaConfig.boton}
          @aceptar=${this.cerrarAlerta}
        ></alerta-view>
      ` : ''}

      ${this.showCodigoModal ? html`
        <alerta-view
          modal
          tipo="info"
          titulo="Validación de correo"
          mensaje="Ingresa el código de 6 dígitos enviado a tu correo electrónico."
          boton=""
          @aceptar=${() => {}}
        >

          <div class="codigo-wrapper">
            <label class="code">CÓDIGO</label>

            <input
              maxlength="6"
              .value=${this.codigo}
              @input=${this.handleCodigo}
            />

            <button
              class="btn-primario"
              ?disabled=${!this.codigoValido}
              @click=${this.validarDesdeModal}
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
            <select @change=${this.onChangeMedio}>
              <option value="">Selecciona una opción...</option>
              <option value="redes">Redes Sociales</option>
              <option value="radio">Radio</option>
              <option value="tv">Televisión</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div class="terms">
          <!-- TÉRMINOS Y AVISO -->
            <div class="legal-text ${this.allAccepted ? 'active' : ''}">
              <input
                type="checkbox"
                .checked=${this.allAccepted}
                disabled
              />

              He leído y acepto los
              <span
                class="legal-link"
                @click=${() => (this.showTermsModal = true)}
              >
                Términos y Condiciones
              </span>
              y el
              <span
                class="legal-link"
                @click=${this.openPrivacyModal}
              >
                Aviso de Privacidad
              </span>
            </div>

            <!-- MODALES -->
            ${this.showTermsModal ? this.renderLegalModal('terms') : ''}
            ${this.showPrivacyModal ? this.renderPrivacyPdfModal() : ''}
          </div>

          <p class="info">
            Para poder completar y enviar su pre-registro, es necesario validar su correo electrónico mediante un código.
          </p>

          <div class="actions">
            <button
              ?disabled=${!(this.medio !== '' && this.allAccepted)}
              @click=${this.enviarCodigo}
            >
              ENVIAR CÓDIGO
            </button>
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define('preregistro-paso-correo', PreregistroPasoCorreo);