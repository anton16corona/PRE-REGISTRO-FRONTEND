import { LitElement, html, css } from 'lit';
import './pdf-zoom-viewer.js';
import '../components/image-carousel.js';
import '../components/double-image-carousel.js';
import '../components/ipes-header.js';

/**
 * Componente base reutilizable para todas las convocatorias de Proximidad
 * Incluye soporte para overlay de convocatoria cerrada
 */
export class ConvocatoriaProximidadBase extends LitElement {
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
      grid-template-columns: minmax(280px, 600px) 1fr;
      gap: clamp(2rem, 4vw, 4rem);
      align-items: center;
    }

    .content {
      text-align: center;
    }

    /* ================= TÍTULOS CONVOCATORIAS ================= */
    .title {
      font-size: 2.3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-titulo, #10262b);
    }

    .phrase {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
      color: var(--color-frase, #4f5a61);
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
      color: var(--color-cta, #143943);
    }

    /* =============== BOTONES ================ */
    button {
      font-family: 'Montserrat', sans-serif;
      color: var(--color-texto-btn-primario, #fff);
    }

    .btn {
      background: var(--color-btn-primario, #45677c);
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
      background: var(--color-btn-secundario, #6ebfc9);
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

    /* ================= OVERLAY CONVOCATORIA CERRADA ================= */
    .pdf-wrapper {
      position: relative;
    }

    .pdf-overlay {
      position: absolute;
      inset: 0;
      background: rgba(10, 15, 36, 0.85);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
    }

    .overlay-content {
      background: #ffffff;
      padding: 2rem;
      border-radius: 16px;
      max-width: 420px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .overlay-content h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: #10262b;
    }

    .overlay-content p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #4f5a61;
    }

    .overlay-content button {
      background: var(--color-btn-primario, #45677c);
      color: #fff;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
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

    /* ================== RESPONSIVE ================= */

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
    colorCta: { type: String },
    colorBtnPrimario: { type: String },
    colorTextoBtnPrimario: { type: String },
    colorBtnSecundario: { type: String },

    // Configuración de carrusel
    tipoCarrusel: { type: String }, // 'simple' o 'doble'
    carouselImages: { type: Array },
    carouselImagesLeft: { type: Array },
    carouselImagesRight: { type: Array },

    // Control de convocatoria activa/cerrada
    convocatoriaActiva: { type: Boolean },
    overlayAceptado: { type: Boolean }
  };

  constructor() {
    super();
    // Valores por defecto
    this.titulo = '';
    this.frase = '';
    this.descripcion = '';
    this.pdfUrl = '/convocatoria/convocatoria-proximidad.pdf';
    this.backRoute = '/perfiles-proximidad';

    // Colores por defecto
    this.colorTitulo = '#10262b';
    this.colorFrase = '#4f5a61';
    this.colorCta = '#143943';
    this.colorBtnPrimario = '#45677c';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#6ebfc9';

    // Carrusel
    this.tipoCarrusel = 'doble';
    this.carouselImages = [];
    this.carouselImagesLeft = [];
    this.carouselImagesRight = [];

    // Overlay
    this.convocatoriaActiva = true; // Por defecto está activa
    this.overlayAceptado = false;
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
    if (changedProperties.has('colorCta')) {
      this.style.setProperty('--color-cta', this.colorCta);
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

  aceptarConvocatoriaCerrada() {
    this.overlayAceptado = true;
  }

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      <ipes-header></ipes-header>

      <main>
        <section class="hero">
          <!-- PDF DE CONVOCATORIA CON OVERLAY OPCIONAL -->
          <div class="pdf-wrapper">
            <pdf-zoom-viewer pdfUrl="${this.pdfUrl}"></pdf-zoom-viewer>

            ${!this.convocatoriaActiva && !this.overlayAceptado ? html`
              <div class="pdf-overlay">
                <div class="overlay-content">
                  <h3>Convocatoria no disponible</h3>
                  <p>
                    Por el momento no hay una convocatoria abierta.
                    Puedes consultar la última publicada para conocer
                    los requisitos y perfil requerido.
                  </p>
                  <button @click=${this.aceptarConvocatoriaCerrada}>
                    Aceptar
                  </button>
                </div>
              </div>
            ` : ''}
          </div>

          <div class="content">
            <h1 class="title">${this.titulo}</h1>

            <p class="phrase">${this.frase}</p>

            <p class="info">${this.descripcion}</p>

            <div class="cta-title">
              Consulta la convocatoria completa
            </div>

            <div class="acciones">
              ${this.convocatoriaActiva ? html`
                <button class="btn" type="button" @click=${this.goToPreregistro}>
                  INICIAR PRE-REGISTRO
                </button>
              ` : html`
                <p class="info" style="text-align:center;">
                  Por el momento no existe un registro activo de precandidatos.
                  Mantente atento a la próxima convocatoria.
                </p>
              `}

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

customElements.define('convocatoria-proximidad-base', ConvocatoriaProximidadBase);