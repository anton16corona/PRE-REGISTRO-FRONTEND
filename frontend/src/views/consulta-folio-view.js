import { LitElement, html } from 'lit';
import './alerta-view.js';
import '../components/ipes-header.js';

import { consultaFolioStyles } from '../styles/consulta-folio.styles.js';

export class ConsultaFolioView extends LitElement {

  static styles = [consultaFolioStyles];
  
  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    perfil: { type: String },
    convocatoria: { type: String },
    consecutivo: { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    
    /* Para restricción con código temporal. */
    pasoCodigo: { type: Boolean },
    codigoIngresado: { type: String },

    intentosFallidos: { type: Number },
    bloqueadoHasta: { type: Number }
  };

  constructor() {
    super();
    this.perfil = 'GC';
    this.convocatoria = '';
    this.consecutivo = '';
    this.mostrarAlerta = false;
    this.alertaConfig = {};

    this.pasoCodigo = false;
    this.codigoIngresado = '';

    this.intentosFallidos = 0;
    this.bloqueadoHasta = 0;
  }

  get folioCompleto() 
  {
    if (!this.convocatoria || !this.consecutivo) return '';
    return `SSPMQ/IPES/${this.perfil}/${this.convocatoria}-${this.consecutivo}`;
  }

  async validarFolioExistente() 
  {
    try {
      const resp = await fetch(`http://localhost:3000/preregistros?folio=${this.folioCompleto}`);
      const data = await resp.json();

      return data.length > 0;

    } catch(e) {
      console.error('Error consultando folio:', e);
      return false;
    }
  }

  /* ============== 🔧 CORRECCIÓN: NAVEGACIÓN DE RETORNO ============== */
  goBack() {
    // 1️⃣ Intentar obtener el origen guardado en sessionStorage
    const origen = sessionStorage.getItem('origen_convocatoria');
    
    console.log('🔙 Volviendo desde consulta folio. Origen:', origen);

    if (origen) {
      // Si hay origen guardado, ir a esa ruta
      globalThis.location.href = origen;
    } else {
      // Si no hay origen, simplemente ir hacia atrás en el historial
      history.back();
    }
  }

  async consultar() 
  {
    // 🔒 VALIDAR BLOQUEO
    if (Date.now() < this.bloqueadoHasta) 
    {
      const segundos = Math.ceil((this.bloqueadoHasta - Date.now()) / 1000);

      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Sistema bloqueado',
        mensaje: `Demasiados intentos incorrectos.`,
        extra: `Intenta nuevamente en ${segundos} segundos.`,
        boton: 'ENTENDIDO'
      };
      return;
    }

    // 1️⃣ VALIDAR CAMPOS
    if (!this.convocatoria || !this.consecutivo) 
    {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'warning',
        titulo: 'Folio incompleto',
        mensaje: 'Debes completar el número de convocatoria y el consecutivo.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    // 2️⃣ CONSULTAR DB.JSON
    const existe = await this.validarFolioExistente();

    if (!existe) 
    {
      this.intentosFallidos++;

      // 🔒 3 INTENTOS → BLOQUEAR
      if (this.intentosFallidos >= 3) {

        this.bloqueadoHasta = Date.now() + 60000; // 1 minuto
        this.intentosFallidos = 0;

        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'error',
          titulo: 'Sistema bloqueado',
          mensaje: 'Has realizado 3 intentos incorrectos.',
          extra: 'El sistema se ha inhabilitado por 1 minuto.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Folio incorrecto',
        mensaje: 'El folio ingresado no existe.',
        extra: `Intentos restantes: ${3 - this.intentosFallidos}`,
        boton: 'ENTENDIDO'
      };
      return;
    }

    // ✅ Folio válido → pedir código
    this.pasoCodigo = true;
    this.mostrarAlerta = true;
    this.alertaConfig = {
      tipo: 'info',
      titulo: 'Verificación de seguridad',
      mensaje: 'Enviamos un código a tu correo.',
      extra: 'Ingresa el código para continuar.',
      boton: 'VALIDAR CÓDIGO'
    };
  }

  validarCodigo() 
  {
    const codigosValidos = [
      '1234567',
      '9876543',
      '1111111'
    ];

    if (!codigosValidos.includes(this.codigoIngresado)) {

      this.intentosFallidos++;

      if (this.intentosFallidos >= 3) {

        this.bloqueadoHasta = Date.now() + 60000;
        this.intentosFallidos = 0;

        this.alertaConfig = {
          tipo: 'error',
          titulo: 'Sistema bloqueado',
          mensaje: '3 códigos incorrectos.',
          extra: 'Intenta nuevamente en 1 minuto.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Código incorrecto',
        mensaje: 'El código ingresado no es válido.',
        extra: `Intentos restantes: ${3 - this.intentosFallidos}`,
        boton: 'ENTENDIDO'
      };
      return;
    }

    // ✅ CÓDIGO CORRECTO
    this.mostrarAlerta = false;
    this.pasoCodigo = false;
    this.intentosFallidos = 0;

    sessionStorage.setItem('folio_consulta', this.folioCompleto);
    globalThis.history.pushState({}, '', '/progreso-folio');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  /* ============== CARRUSEL DE FOTOS ============== */
  images = [
    '/src/assets/estatus/EstatusA.jpg',
    '/src/assets/estatus/EstatusB.jpg',
    '/src/assets/estatus/EstatusC.jpg',
    '/src/assets/estatus/EstatusD.jpg',
    '/src/assets/estatus/EstatusE.jpg',
    '/src/assets/estatus/EstatusF.jpg',
    '/src/assets/estatus/EstatusG.jpg'
  ];

  index = 0;
  direction = 1; // 1 = adelante, -1 = atrás
  intervalId;

  connectedCallback() {
    super.connectedCallback();
    this.startAutoplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId);
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      // cambiar dirección si llega a los extremos
      if (this.index === this.images.length - 1) {
        this.direction = -1;
      } else if (this.index === 0) {
        this.direction = 1;
      }

      this.index += this.direction;
      this.updateCarousel();
    }, 1500);
  }

  updateCarousel() {
    const track = this.renderRoot.querySelector('.carousel-track');
    if (!track) return;
    track.style.transform = `translateX(-${this.index * 100}%)`;
  }

  /* ========================================= HTML ======================================== */
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
          @aceptar=${this.pasoCodigo ? this.validarCodigo : this.cerrarAlerta}
        >
          ${this.pasoCodigo ? html`
            <input
              type="text"
              placeholder="Código de verificación"
              maxlength="8"
              style="
                margin-top: 1rem;
                width: 220px;
                padding: 10px;
                font-size: 1.1rem;
                text-align: center;
                border-radius: 12px;
                border: 1px solid #ccc;
              "
              @input=${e => this.codigoIngresado = e.target.value.replaceAll(/\D/g,'')}
            />
          ` : ''}
        </alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <div class="fondo">
        <div class="card">
          <h2>CONSULTA EL ESTATUS DE TU SOLICITUD</h2>

          <p>
            Ingresa tu folio de Pre-Registro para conocer el avance de tu proceso.
          </p>

          <div class="folio-linea">
            <span>SSPMQ</span>/<span>IPES</span>/
            <select @change=${e => this.perfil = e.target.value}>
              <option value="GC">GC</option>
              <option value="GA">GA</option>
              <option value="GV">GV</option>
              <option value="PA">PA</option>
              <option value="PP">PP</option>
              <option value="UA">UA</option>
              <option value="AV">AV</option>
              <option value="PC">PC</option>
            </select>
            /
            <input 
              placeholder="6" 
              maxlength="2"
              @input=${e => this.convocatoria = e.target.value.replaceAll(/\D/g,'')} 
            />
            -
            <input 
              placeholder="001" 
              maxlength="3"
              @input=${e => this.consecutivo = e.target.value.replaceAll(/\D/g,'')} 
            />
          </div>

          <div class="form-actions">
            <div class="btn" @click=${this.consultar}>
              CONSULTAR ESTATUS
            </div>

            <button
              type="button"
              class="btn-secundario"
              @click=${this.goBack}
            >
              VOLVER
            </button>
          </div>

          <div class="carousel">
            <div class="carousel-track">
              ${this.images.map(img => html`
                <img src=${img} class="carousel-image" />
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('consulta-folio-view', ConsultaFolioView);