import { LitElement, html, css } from 'lit';
import './alerta-view.js';

export class ConsultaFolioView extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
      width: 100%;
      overflow-x: hidden;
    }

    header {
      background: #0a0f24;
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 1rem 2rem;
    }

    header img {
      width: clamp(60px, 8vw, 110px);
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.4rem, 3vw, 2.5rem);
    }

    .fondo {
      background: #f2efe9;
      min-height: calc(100vh - 130px);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      max-width: 1200px;
      width: 100%;
      border-radius: 28px;
      padding: 4rem 3rem;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,.08);
    }

    h2 {
      font-size: clamp(2rem, 3vw, 2.6rem);
      margin-bottom: 1rem;
      color:#0d253a;
    }

    p {
      font-size: 1.05rem;
      max-width: 720px;
      margin: 0 auto 3rem;
      color: #2e3032;
    }

    /* ===== FOLIO INPUT ===== */
    .folio-linea {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .6rem;
      font-family: 'Consolas', monospace;
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      color: #2e3032;
    }

    .folio-linea input,
    .folio-linea select {
      font-family: inherit;
      font-size: inherit;
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid #bbb;
      text-align: center;
      color: #2e3032;
      background: #ffffff;
    }

    .folio-linea input {
      width: 90px;
      color: #2e3032;
    }

    .btn {
      width: 260px;
      height: 48px;
      background: #285dc0;
      border-radius: 999px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
    }

/* ===================== CARRUSEL DE FOTOS ================== */
    .carousel {
        position: relative;
        width: 100%;
        max-width: 700px; 
        height: 270px;     
        margin: 3rem auto 0;
        overflow: hidden;
        border-radius: 18px;
    }

    .carousel-track {
        display: flex;
        height: 100%;
        transition: transform 0.6s ease-in-out; /* movimiento suave */
    }

    .carousel-image {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        object-fit: cover;
        border-radius: 18px;
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    perfil: { type: String },
    convocatoria: { type: String },
    consecutivo: { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object }
  };

  constructor() {
    super();
    this.perfil = 'GC';
    this.convocatoria = '';
    this.consecutivo = '';
    this.mostrarAlerta = false;
    this.alertaConfig = {};
  }

  get folioCompleto() {
    if (!this.convocatoria || !this.consecutivo) return '';
    return `SSPMQ/IPES/${this.perfil}/${this.convocatoria}-${this.consecutivo}`;
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

    // 3️⃣ Folio válido
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
          @aceptar=${this.cerrarAlerta}
        ></alerta-view>
      ` : ''}

      <header>
        <img src="/src/assets/SSPlogo.png" />
        <div class="ipes">INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES</div>
        <img src="/src/assets/IPESlogo.png" />
      </header>

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

          <div class="btn" @click=${this.consultar}>
            CONSULTAR ESTATUS
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
    `;
  }
}

customElements.define('consulta-folio-view', ConsultaFolioView);