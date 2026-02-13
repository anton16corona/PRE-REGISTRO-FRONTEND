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
    codigoIngresado: { type: String }
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
  }

  get folioCompleto() {
    if (!this.convocatoria || !this.consecutivo) return '';
    return `SSPMQ/IPES/${this.perfil}/${this.convocatoria}-${this.consecutivo}`;
  }

  goBack() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    console.log('Origen guardado:', origen);

    if (origen) {
      globalThis.location.href = origen;
    } else {
      globalThis.location.href = '/convocatorias-view';
    }
  }

  consultar() {
    // 1️⃣ Folio incompleto
    if (!this.convocatoria || !this.consecutivo) {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'warning',
        titulo: 'Folio incompleto',
        mensaje: 'Debes completar el número de convocatoria y el consecutivo.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    // 2️⃣ SIMULACIÓN: folio inexistente
    if (this.convocatoria === '0') {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'inexistente-folio',
        titulo: 'Folio no encontrado',
        mensaje:
          'El folio ingresado no existe o es incorrecto.',
        extra:
          'Verifica la información proporcionada e inténtalo nuevamente.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    // 3️⃣ Folio válido → pedir código
    this.pasoCodigo = true;
    this.mostrarAlerta = true;
    this.alertaConfig = {
      tipo: 'info',
      titulo: 'Verificación de seguridad',
      mensaje:
        'Para proteger tu información, enviamos un código de verificación a tu correo electrónico.',
      extra:
        'Ingresa el código para continuar.',
      boton: 'VALIDAR CÓDIGO'
    };
  }

  validarCodigo() {
    if (this.codigoIngresado !== '1234567') {
      this.pasoCodigo = false; // 🔴 CLAVE
      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Código incorrecto',
        mensaje: 'El código ingresado no es válido o ha expirado.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    // Código correcto
    this.mostrarAlerta = false;
    this.pasoCodigo = false;

    sessionStorage.setItem('folio_consulta', this.folioCompleto);
    globalThis.history.pushState({}, '', '/progreso-folio');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  // ---------- CARRUSEL DE FOTOS. ----------
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
              @input=${e =>
                this.codigoIngresado = e.target.value.replaceAll(/\D/g,'')
              }
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
            <input placeholder="6" maxlength="2"
              @input=${e => this.convocatoria = e.target.value.replaceAll(/\D/g,'')} />
            -
            <input placeholder="001" maxlength="3"
              @input=${e => this.consecutivo = e.target.value.replaceAll(/\D/g,'')} />
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
                  ${this.images.map(
                  img => html`<img src=${img} class="carousel-image" />`
                  )}
              </div>
            </div>
          </div>
        </div>


      </div>
    `;
  }
}

customElements.define('consulta-folio-view', ConsultaFolioView);