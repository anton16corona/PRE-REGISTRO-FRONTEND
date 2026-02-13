import { LitElement, html, css } from 'lit';
import './pdf-zoom-viewer.js';
import '../components/image-carousel.js';
import '../components/double-image-carousel.js';
import '../components/ipes-header.js';

/**
 * Componente base reutilizable para todas las convocatorias de Guardia
 * Permite personalizar colores, textos, imágenes y tipo de carrusel
 */
export class ConvocatoriaBase extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
      overflow-x: hidden;
    }

    /* ================= MAIN ================= */
    main {
      max-width: 1400px;
      margin: 3rem auto;
      padding: 0 1rem;
    }

    /* ================= HERO ================= */
    .hero {
      display: grid;
      grid-template-columns: 600px 1fr;
      gap: 4rem;
      align-items: center;
    }

    .poster {
      background: #201e39;
      border-radius: 20px;
      padding: 1rem;
      display: flex;
      justify-content: center;
    }

    .poster img {
      width: 100%;
      max-width: 456px;
      border-radius: 16px;
    }

    .content {
      text-align: center;
    }

    /* ================= TÍTULOS CONVOCATORIAS ================= */
    .title {
      font-size: 2.3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-titulo, #2d5080);
    }

    .phrase {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
      color: var(--color-frase, #20395b);
    }

    .info {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: #2e3032;
      text-align: justify;
    }

    .cta-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: #2e3032;
    }

    /* =============== BOTONES ================ */
    button {
      font-family: 'Montserrat', sans-serif;
      color: var(--color-texto-btn-primario, #fff);
    }

    .btn {
      background: var(--color-btn-primario, #467ec9);
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn-volver {
      background: var(--color-btn-secundario, #4b5057);
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #fff;
      transition: opacity 0.3s ease;
    }

    .btn-volver:hover {
      opacity: 0.9;
    }

    .acciones {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    /* ============================== CONSULTA FOLIO ============================== */
    .consulta-folio {
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 3rem;
      margin-top: 1rem;
    }

    .consulta-folio span:first-child {
      color: #2e3032;
      font-weight: 500;
    }

    .consulta-folio span:last-child {
      color: #0d6fff;
      font-weight: 800;
      cursor: pointer;
      text-decoration: underline;
    }

    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 1024 PX -------------*/
    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ------------- 768 PX -------------*/
    @media (max-width: 768px) {
      .poster {
        padding: 0;
      }

      .poster img {
        max-width: 100%;
      }

      .hero {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .content {
        text-align: center;
      }
    }

    /* ------------- 640 PX -------------*/
    @media (max-width: 640px) {
      header {
        text-align: center;
      }

      .gallery {
        grid-template-columns: 1fr;
      }

      .ipes {
        font-size: 1.4rem;
      }

      .title {
        font-size: 1.9rem;
      }

      .phrase {
        font-size: 1.2rem;
      }

      .info {
        font-size: 1.05rem;
        text-align: left;
      }

      .cta-title {
        font-size: 1.3rem;
      }

      .carousel {
        height: 220px;
      }

      .acciones {
        width: 100%;
      }

      .btn,
      .btn-volver {
        width: 100%;
        font-size: 1.15rem;
      }
    }
  `;

  static properties = {
    // Configuración de contenido
    titulo: { type: String },
    frase: { type: String },
    descripcion: { type: String },
    pdfUrl: { type: String },
    backRoute: { type: String },

    // Configuración de colores (CSS Custom Properties)
    colorTitulo: { type: String },
    colorFrase: { type: String },
    colorBtnPrimario: { type: String },
    colorTextoBtnPrimario: { type: String },
    colorBtnSecundario: { type: String },

    // Configuración de carrusel
    tipoCarrusel: { type: String }, // 'simple' o 'doble'
    carouselImages: { type: Array },
    carouselImagesLeft: { type: Array },
    carouselImagesRight: { type: Array }
  };

  constructor() {
    super();
    // Valores por defecto
    this.titulo = '';
    this.frase = '';
    this.descripcion = '';
    this.pdfUrl = '/convocatoria/convocatoria-guardia.pdf';
    this.backRoute = '/perfiles-guardias';

    // Colores por defecto
    this.colorTitulo = '#2d5080';
    this.colorFrase = '#20395b';
    this.colorBtnPrimario = '#467ec9';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#4b5057';

    // Carrusel
    this.tipoCarrusel = 'simple';
    this.carouselImages = [];
    this.carouselImagesLeft = [];
    this.carouselImagesRight = [];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    
    // Aplicar CSS Custom Properties para los colores
    if (changedProperties.has('colorTitulo')) {
      this.style.setProperty('--color-titulo', this.colorTitulo);
    }
    if (changedProperties.has('colorFrase')) {
      this.style.setProperty('--color-frase', this.colorFrase);
    }
    if (changedProperties.has('colorBtnPrimario')) {
      this.style.setProperty('--color-btn-primario', this.colorBtnPrimario);
    }
    if (changedProperties.has('colorTextoBtnPrimario')) {
      this.style.setProperty('--color-texto-btn-primario', this.colorTextoBtnPrimario);
    }
    if (changedProperties.has('colorBtnSecundario')) {
      this.style.setProperty('--color-btn-secundario', this.colorBtnSecundario);
    }
  }

  /* ============== NAVEGACIÓN ============== */
  navigate(path) {
    history.pushState({}, '', path);
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  goBack() {
    globalThis.location.href = this.backRoute;
  }

  goToPreregistro(e) {
    e?.preventDefault?.();
    const origen = globalThis.location.pathname;
    sessionStorage.setItem('origen_convocatoria', origen);
    globalThis.location.href = '/preregistro';
  }

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      <ipes-header></ipes-header>

      <main>
        <section class="hero">
          <!-- PDF DE CONVOCATORIA -->
          <pdf-zoom-viewer pdfUrl="${this.pdfUrl}"></pdf-zoom-viewer>

          <div class="content">
            <h1 class="title">${this.titulo}</h1>

            <p class="phrase">${this.frase}</p>

            <p class="info">${this.descripcion}</p>

            <div class="cta-title">
              Consulta la convocatoria completa
            </div>

            <div class="acciones">
              <button class="btn" type="button" @click=${this.goToPreregistro}>
                INICIAR PRE-REGISTRO
              </button>

              <button class="btn-volver" @click=${this.goBack}>
                VOLVER
              </button>
            </div>
          </div>
        </section>

        <!-- CARRUSEL DE IMÁGENES -->
        ${this.tipoCarrusel === 'doble' ? html`
          <double-image-carousel
            .imagesLeft=${this.carouselImagesLeft}
            .imagesRight=${this.carouselImagesRight}
          ></double-image-carousel>
        ` : html`
          <image-carousel .images=${this.carouselImages}></image-carousel>
        `}

        <div class="consulta-folio">
          <span>¿Ya has iniciado tu proceso? </span>
          <span @click=${() => this.navigate('/consulta-folio')}>
            Consulta tu estatus con tu folio aquí.
          </span>
        </div>
      </main>
    `;
  }
}

customElements.define('convocatoria-base', ConvocatoriaBase);