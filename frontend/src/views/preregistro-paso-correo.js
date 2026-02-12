import { LitElement, html, css } from 'lit';

export class PreregistroPasoCorreo extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
    }

    /* ===== HEADER ===== */
    header {
      background: #0a0f24;
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 2rem;
    }

    header img {
      width: clamp(60px, 8vw, 120px);
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.3rem, 3vw, 2.5rem);
    }


    /* ===== MAIN ===== */
    main {
      max-width: 1200px;
      margin: 2.5rem auto;
      padding: 0 1.5rem;
    }

    .panel {
      background: #ffffff;
      border-radius: 24px;
      padding: 3rem 2rem;
      
      animation: slideUpFade 0.45s ease-out;
    }

    .title {
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: .5rem;
      color: #2e3032;
    }

    .subtitle {
      text-align: center;
      margin-bottom: 3rem;
      color: #4f5a61;
    }

    /* ===== FORM ===== */
    .form-group {
      max-width: 700px;
      margin: 0 auto 1.8rem;
      text-align: left;
    }

    label {
      font-weight: 500;
      display: block;
      margin-bottom: .5rem;
      color: #2e3032;
    }

    /* SELECT estilo línea */
    select {
      width: 100%;
      background: #ffffff;
      color: #000;
      border: 1px solid #b8b8b8;
      border-radius: 16px;
      padding: .9rem 1rem;
      font-size: 1rem;
      outline: none;
      font-family: inherit;
      appearance: auto;
    }

    select:focus {
      border-color: #131c49;
    }

    .info {
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
      font-size: 1.1rem;
      color: #2e3032;
    }

    .code {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;           /* grueso ancho */
      font-size: 1.6rem;
      text-align: center;
      width: 100%;
      color: #0a0f24;
      letter-spacing: 1px;
    }

    /* ===== TERMINOS ===== */
    .terms {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .7rem;
      margin: 2rem 0;
      flex-wrap: wrap;
      font-size: 1rem;
      color: #2e3032;
    }

    .terms input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .terms a {
      color: #003cff;
      text-decoration: underline;
      cursor: pointer;
    }

    /* ===== ACCIONES ===== */
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    button {
      background: #7aa7c8;
      border: none;
      border-radius: 28px;
      padding: .9rem 2.8rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    /* ===== CÓDIGO ===== */
    .codigo-wrapper {
      max-width: 400px;
      margin: 1rem auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
    }

    .codigo-wrapper label {
      align-self: flex-start;
    }

    .codigo-wrapper input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #000;
        padding: 6px 2px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        text-align: center;

        /* ----- FUENTE DE LOS INPUT ------ */
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        color: #000;
    }

    /* =========================== TÉRMINOS Y AVISOS ESTILOS =========================== */
    /* ====== LINKS DE TÉRMINOS ====== */
    .legal-text {
      margin-top: 24px;
      font-size: 16px;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .legal-text input {
      width: 20px;
      height: 20px;
    }

    .legal-link {
      color: #0a58ff;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 500;
    }

    .legal-text input[type="checkbox"] {
      width: 22px;
      height: 22px;
      accent-color: #7aa7c8; /* color base */
      transition: all 0.3s ease;
    }

    .legal-text input[type="checkbox"]:checked {
      accent-color: #0a0f24; /* azul institucional */
    }

    .legal-text.active {
      font-weight: 600;
      color: #0a0f24;
    }

    /* ====== BOTÓN ENVIAR ====== */
    .send-code-btn {
      margin: 40px auto 0;
      padding: 16px 48px;
      border-radius: 999px;
      border: none;
      font-size: 18px;
      font-weight: 700;
      transition: all 0.3s ease;
    }

    .send-code-btn:disabled {
      background: #cfdde8;
      color: #ffffff;
    }

    .send-code-btn:not(:disabled) {
      background: #0a0f24;
      color: #ffffff;
      cursor: pointer;
    }

    /* ====== MODAL ====== */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 15, 36, 0.65);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-container {
      background: #ffffff;
      width: 90%;
      max-width: 640px;
      border-radius: 20px;
      padding: 28px 32px;
      display: flex;
      flex-direction: column;
    }

    .modal-container h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: #0a0f24;
      text-align: center;
    }

    /* CONTENIDO CON SCROLL */
    .modal-content {
      margin: 20px 0;
      max-height: 320px;
      overflow-y: auto;
      font-size: 15px;
      line-height: 1.6;
      padding-right: 8px;
      color: #333;
    }

    /* BOTÓN ACEPTAR */
    .modal-actions {
      display: flex;
      justify-content: center;
    }

    .modal-actions button {
      padding: 14px 40px;
      border-radius: 999px;
      border: none;
      background: #0a0f24;
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
    }

    .codigo-wrapper input:focus {
      border-bottom: 2px solid #131c49;
      color: #717173;
    }

    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 900 PX -------------*/
    @media (max-width: 900px) {
      .panel {
        padding: 2.5rem 2rem;
      }

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .info {
        font-size: 1rem;
      }

      button {
        font-size: 1.1rem;
        padding: .8rem 2.4rem;
      }
    }

    /* ------------- 640 PX -------------*/
    @media (max-width: 640px) {
      main {
        margin: 1.5rem auto;
        padding: 0 1rem;
      }

      .panel {
        padding: 2rem 1.3rem;
        border-radius: 20px;
      }

      .title {
        font-size: 1.7rem;
      }

      .subtitle {
        font-size: .95rem;
        margin-bottom: 2rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      select {
        font-size: 1rem;
        padding: .8rem 1rem;
      }

      .terms {
        flex-direction: column;
        align-items: flex-start;
        gap: .6rem;
        text-align: left;
      }

      .info {
        font-size: .95rem;
        margin: 1.8rem auto;
      }

      .actions {
        margin-top: 1.5rem;
      }

      .actions button {
        width: 100%;
      }

      .codigo-wrapper {
        max-width: 100%;
        margin-top: 2rem;
      }

      .codigo-wrapper input {
        font-size: 1.8rem;
      }

      .codigo-wrapper button {
        width: 100%;
        margin-top: .5rem;
      }
    }
  `;

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
    showCodigoModal: { state: true }
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
    // 🔴 SIMULACIÓN: código incorrecto
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

    // ✅ Código correcto (simulado)
    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', 'GC-012345');
    globalThis.location.href = '/preregistro-completado';
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

  validarDesdeModal() {
    if (this.codigo === '000000') {
      // 🔴 En vez de abrir otra alerta,
      // transformamos la actual
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

    sessionStorage.setItem('preregistro_completado', 'true');
    sessionStorage.setItem('folio_preregistro', 'GC-012345');
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

      <header>
        <img src="/src/assets/SSPlogo.png" />
        <div class="ipes">INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES</div>
        <img src="/src/assets/IPESlogo.png" />
      </header>

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
                @click=${() => (this.showPrivacyModal = true)}
              >
                Aviso de Privacidad
              </span>
            </div>

            <!-- MODALES -->
            ${this.showTermsModal ? this.renderLegalModal('terms') : ''}
            ${this.showPrivacyModal ? this.renderLegalModal('privacy') : ''}
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