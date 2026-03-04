import { LitElement, html, css } from 'lit';
import './pdf-zoom-viewer.js'; 
import '../components/double-image-carousel.js';
import '../components/ipes-header.js';

export class ConvocatoriaAuxiliar extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
      width: 100%;
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

    /* ================= TITULOS CONVOCATORIAS ================= */
    .title {
      font-size: 2.3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #2e3032;
    }

    .phrase {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      font-weight:500;
      color: #2e3032;
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
      color: #fff;
    }
    
    .btn {
      background: #37446f;
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;

      /* -------- FUENTE --------- */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .btn-volver {
      background: #865836;
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;

      /* -------- FUENTE --------- */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
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
      background: #37446f;
      color: #fff;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
    }

    /* ================= OVERLAY DE CARGA DEL PDF ================= */
    .pdf-loading-overlay {
      position: absolute;
      inset: 0;
      background: rgba(32, 30, 57, 0.88);
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      gap: 1.2rem;
      pointer-events: none;
    }

    .pdf-loading-spinner {
      width: 56px;
      height: 56px;
      border: 5px solid rgba(255, 255, 255, 0.2);
      border-top-color: #a1942f;
      border-radius: 50%;
      animation: pdf-spin 0.9s linear infinite;
    }

    @keyframes pdf-spin {
      to { transform: rotate(360deg); }
    }

    .pdf-loading-texto {
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.9;
    }

    .pdf-loading-puntos::after {
      content: '';
      animation: pdf-puntos 1.4s steps(4, end) infinite;
    }

    @keyframes pdf-puntos {
      0%   { content: ''; }
      25%  { content: '.'; }
      50%  { content: '..'; }
      75%  { content: '...'; }
      100% { content: ''; }
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
    }

    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 1024 PX -------------*/
    @media (max-width: 1024px) {
      main {
        margin: 2.5rem auto;
      }

      .hero {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .gallery {
        grid-template-columns: repeat(2, 1fr);
      }

      .overlay-content {
        max-width: 380px;
        padding: 1.8rem;
      }
    }

    /* ------------- 900 PX -------------*/
    @media (max-width: 900px) {
      main {
        margin: 2rem auto;
      }

      .hero {
        gap: 2.5rem;
      }

      .title {
        font-size: 2.1rem;
      }

      .phrase {
        font-size: 1.3rem;
      }

      .info {
        font-size: 1.1rem;
      }

      .cta-title {
        font-size: 1.4rem;
      }

      .btn,
      .btn-volver {
        font-size: 1.1rem;
        padding: .9rem 1.8rem;
      }
    }

    /* ------------- 768 PX -------------*/
    @media (max-width: 768px) {
      main {
        margin: 1.8rem auto;
        padding: 0 1rem;
      }

      .poster {
        padding: 0;
      }

      .poster img {
        max-width: 100%;
      }

      .hero {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .content {
        text-align: center;
      }

      .info {
        text-align: center;
      }

      .title {
        font-size: 2rem;
      }

      .overlay-content {
        max-width: 360px;
        padding: 1.5rem;
      }

      .overlay-content h3 {
        font-size: 1.2rem;
      }

      .overlay-content p {
        font-size: 1rem;
      }

      .consulta-folio {
        font-size: 1.1rem;
      }
    }

    /* ------------- 640 PX -------------*/
    @media (max-width: 640px) {
      main {
        margin: 1.5rem auto;
        padding: 0 .8rem;
      }

      header {
        text-align: center;
      }

      .hero {
        gap: 1.8rem;
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

      .consulta-folio {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .overlay-content {
        max-width: 320px;
        padding: 1.3rem;
        border-radius: 12px;
      }
    }

    /* ------------- 480 PX -------------*/
    @media (max-width: 480px) {
      main {
        margin: 1.2rem auto;
        padding: 0 .6rem;
      }

      .title {
        font-size: 1.7rem;
      }

      .phrase {
        font-size: 1.1rem;
      }

      .info {
        font-size: 1rem;
      }

      .cta-title {
        font-size: 1.2rem;
      }

      .btn,
      .btn-volver {
        font-size: 1.05rem;
        padding: .85rem 1.4rem;
      }

      .pdf-loading-texto {
        font-size: .88rem;
      }

      .overlay-content {
        max-width: 290px;
        padding: 1.2rem;
      }

      .overlay-content h3 {
        font-size: 1.1rem;
      }

      .overlay-content p {
        font-size: .92rem;
        margin-bottom: 1.2rem;
      }

      .consulta-folio {
        font-size: .95rem;
      }
    }

    /* ------------- 360 PX -------------*/
    @media (max-width: 360px) {
      main {
        margin: 1rem auto;
        padding: 0 .4rem;
      }

      .title {
        font-size: 1.5rem;
      }

      .phrase {
        font-size: 1rem;
        margin-bottom: 1.2rem;
      }

      .info {
        font-size: .92rem;
        margin-bottom: 1.5rem;
      }

      .cta-title {
        font-size: 1.1rem;
        margin-bottom: .8rem;
      }

      .btn,
      .btn-volver {
        font-size: 1rem;
        padding: .8rem 1.2rem;
        border-radius: 8px;
      }

      .pdf-loading-overlay {
        border-radius: 14px;
      }

      .pdf-loading-spinner {
        width: 44px;
        height: 44px;
      }

      .pdf-loading-texto {
        font-size: .82rem;
      }

      .overlay-content {
        max-width: 270px;
        padding: 1rem;
        border-radius: 10px;
      }

      .overlay-content h3 {
        font-size: 1rem;
        margin-bottom: .8rem;
      }

      .overlay-content p {
        font-size: .85rem;
        margin-bottom: 1rem;
      }

      .overlay-content button {
        font-size: .9rem;
        padding: .65rem 1.2rem;
      }

      .consulta-folio {
        font-size: .88rem;
        margin-bottom: 1.5rem;
      }
    }

    /* ------------- 320 PX -------------*/
    @media (max-width: 320px) {
      main {
        padding: 0 .3rem;
      }

      .title {
        font-size: 1.3rem;
      }

      .phrase {
        font-size: .92rem;
      }

      .info {
        font-size: .85rem;
      }

      .cta-title {
        font-size: 1rem;
      }

      .btn,
      .btn-volver {
        font-size: .92rem;
        padding: .75rem 1rem;
      }

      .pdf-loading-spinner {
        width: 38px;
        height: 38px;
        border-width: 3px;
      }

      .pdf-loading-texto {
        font-size: .75rem;
      }

      .overlay-content {
        max-width: 250px;
        padding: .9rem;
      }

      .overlay-content h3 {
        font-size: .95rem;
      }

      .overlay-content p {
        font-size: .8rem;
      }

      .overlay-content button {
        font-size: .85rem;
        padding: .6rem 1rem;
      }

      .consulta-folio {
        font-size: .82rem;
      }
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */

  static properties = {
    pdfCargado: { type: Boolean },
    convocatoriaActiva: { type: Boolean },
    overlayAceptado: { type: Boolean }
  };

  constructor() {
    super();
    this.pdfCargado = false;
    this.convocatoriaActiva = true;
    this.overlayAceptado = false;
  }

  /* ============== CARGA DEL PDF ============== */
  onPdfLoaded() {
    this.pdfCargado = true;
  }

  aceptarConvocatoriaCerrada() {
    this.overlayAceptado = true;
  }

  /* ============== NAVEGACIÓN A PREREGISTRO Y ATRÁS ============== */
  navigate(path) {
    history.pushState({}, '', path);
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  goBack() {
    globalThis.location.href = '/convocatorias-view';
  }

  goToPreregistro(e) {
    e?.preventDefault?.();
    const origen = globalThis.location.pathname;
    sessionStorage.setItem('origen_convocatoria', origen);
    globalThis.location.href = '/preregistro';
  }

    // ---------- CARRUSEL DE FOTOS. ----------
    imagesLeft = [
      '/src/assets/policia/AuxiliarA.jpeg',
      '/src/assets/policia/AuxiliarB.jpeg',
      '/src/assets/policia/AuxiliarC.jpg',
      '/src/assets/policia/AuxiliarD.jpg',
      '/src/assets/policia/AuxiliarE.jpg',
      '/src/assets/policia/AuxiliarF.jpg',
      '/src/assets/policia/AuxiliarG.jpg'
    ];

    imagesRight = [
      '/src/assets/policia/AuxiliarI.jpeg',
      '/src/assets/policia/AuxiliarJ.jpeg',
      '/src/assets/policia/AuxiliarK.jpeg',
      '/src/assets/policia/AuxiliarL.jpeg',
      '/src/assets/policia/AuxiliarM.jpg',
      '/src/assets/policia/AuxiliarN.jpg',
      '/src/assets/policia/AuxiliarO.jpg'
    ];

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      <ipes-header></ipes-header>

      <main>
        <section class="hero">
          <!-- --------------- PDF DE CONVOCATORIA --------------- -->
          <div class="pdf-wrapper">
            <pdf-zoom-viewer
              pdfUrl="/convocatoria/convocatoria-auxiliar.pdf"
              @pdf-loaded=${this.onPdfLoaded}
            ></pdf-zoom-viewer>

            ${!this.pdfCargado ? html`
              <div class="pdf-loading-overlay">
                <div class="pdf-loading-spinner"></div>
                <div class="pdf-loading-texto">
                  Cargando convocatoria<span class="pdf-loading-puntos"></span>
                </div>
              </div>
            ` : ''}

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
            <h1 class="title">
              Policía Auxiliar.
            </h1>

            <p class="phrase">
              ¡Forma parte de nuestro cuerpo de Policía Auxiliar!
            </p>

            <p class="info">
              Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la 
              paz pública dentro del municipio de Querétaro a través de la ejecución de acciones policiales 
              tendientes a la investigación, prevención y persecución de delitos y faltas administrativas en 
              coordinación con las Instituciones competentes, bajo los principios constitucionales de legalidad, 
              objetividad, eficiencia, profesionalismo, honradez, respeto a los derechos humanos y perspectiva 
              de género.
            </p>

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

        <double-image-carousel
          .imagesLeft=${this.imagesLeft}
          .imagesRight=${this.imagesRight}
        ></double-image-carousel>

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

customElements.define('convocatoria-auxiliar', ConvocatoriaAuxiliar);