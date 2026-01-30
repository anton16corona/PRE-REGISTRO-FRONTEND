import { LitElement, html, css } from 'lit';

export class ConvocatoriaAuxiliar extends LitElement {
  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

    :host {
      display: block;
      min-height: 100vh;
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
    }

    /* ================= HEADER ================= */
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
      width: clamp(55px, 8vw, 90px);
      height: auto;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
      line-height: 1.2;
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

    /* =========================== IMAGES =========================== */
    .gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin: 4rem 0;
    }

    .gallery img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 16px;
    }

    .convocatoria-img {
    cursor: zoom-in;
      transition: transform 0.3s ease;
    }

    .poster img {
      width: 100%;
      max-width: 456px;
      border-radius: 16px;

      touch-action: pinch-zoom;
    }

    .gallery {
        transition: transform 0.3s ease;
    }

    .gallery:hover {
        transform: scale(1.05);
    }

    /* ===== FOOTER TEXT ===== */
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

    /* ===================== CARRUSEL DE FOTOS ================== */
    .carousels-wrapper {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .carousel {
        position: relative;
        width: 100%;
        max-width: 620px; 
        height: 320px;     
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

    /* ================= MODAL PDF ================= */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal {
      background: #fff;
      width: 90%;
      max-width: 900px;
      height: 85vh;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1rem;
      background: #0a0f24;
      color: #fff;
      font-weight: 600;
    }

    .modal-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .modal-body {
      flex: 1;
    }

    /* Visor PDF */
    .modal-body iframe {
      width: 100%;
      height: 100%;
      border: none;

      /* zoom / pellizco */
      touch-action: pinch-zoom;
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
      .gallery {
        grid-template-columns: 1fr;
      }

      .ipes {
        font-size: 1.3rem;
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

      header {
        grid-template-columns: 1fr;
        text-align: center;
      }

      header img {
        margin: 0 auto;
      }
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */

    navigate(path) {
        history.pushState({}, '', path);
        globalThis.dispatchEvent(new PopStateEvent('popstate'));
    }

    goBack() {
        globalThis.location.href = '/convocatorias-view';
    }

    // ---------- CARRUSEL DE FOTOS. ----------
    imagesLeft = [
      '/src/assets/policia/AuxiliarA.jpeg',
      '/src/assets/policia/AuxiliarB.jpeg',
      '/src/assets/policia/AuxiliarC.jpg',
      '/src/assets/policia/AuxiliarD.jpg',
      '/src/assets/policia/AuxiliarE.jpg',
      '/src/assets/policia/AuxiliarF.jpg',
      '/src/assets/policia/AuxiliarG.jpg',
      '/src/assets/policia/AuxiliarH.jpeg',
    ];

    imagesRight = [
      '/src/assets/policia/AuxiliarI.jpeg',
      '/src/assets/policia/AuxiliarJ.jpeg',
      '/src/assets/policia/AuxiliarK.jpeg',
      '/src/assets/policia/AuxiliarL.jpeg',
      '/src/assets/policia/AuxiliarM.jpg',
      '/src/assets/policia/AuxiliarN.jpg',
      '/src/assets/policia/AuxiliarO.jpg',
    ];

    indexLeft = 0;
    indexRight = this.imagesRight.length - 1;
    directionLeft = 1;
    directionRight = -1;

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

        // carrusel izquierdo (A → H → A)
        this.indexLeft += this.directionLeft;
        if (
          this.indexLeft === this.imagesLeft.length - 1 ||
          this.indexLeft === 0
        ) {
          this.directionLeft *= -1;
        }

        // carrusel derecho (O → I → O)
        this.indexRight += this.directionRight;
        if (
          this.indexRight === this.imagesRight.length - 1 ||
          this.indexRight === 0
        ) {
          this.directionRight *= -1;
        }

        this.updateCarousel();

      }, 2000);
    }

    updateCarousel() {
      const left = this.renderRoot.querySelector('.carousel-left');
      const right = this.renderRoot.querySelector('.carousel-right');

      left.style.transform = `translateX(-${this.indexLeft * 100}%)`;
      right.style.transform = `translateX(-${this.indexRight * 100}%)`;
    }

    goToPreregistro(e) {
      e?.preventDefault?.();

      const origen = globalThis.location.pathname;
      console.log('GUARDANDO ORIGEN:', origen);

      sessionStorage.setItem('origen_convocatoria', origen);

      // verificación inmediata
      console.log(
        'ORIGEN GUARDADO:',
        sessionStorage.getItem('origen_convocatoria')
      );

      globalThis.location.href = '/preregistro';
    }

    showPdfModal = false;

    openPdf() {
      this.showPdfModal = true;
    }

    closePdf() {
      this.showPdfModal = false;
    }

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      <header>
        <img class="logo-left" src="/src/assets/SSPlogo.png" alt="SSP" />

        <div class="ipes">
          INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES
        </div>

        <img class="logo-right" src="/src/assets/IPESlogo.png" alt="IPES" />
      </header>

      <main>
        <section class="hero">
          <div class="poster">
            <img
              class="convocatoria-img"
              src="/src/assets/policia/ConvocatoriaPolicia.jpg"
              alt="Convocatoria Policía Auxiliar"
              @click=${this.openPdf}
            />
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
                <button class="btn" type="button" @click=${this.goToPreregistro}>
                  INICIAR PRE-REGISTRO
                </button>

                <button class="btn-volver" @click=${this.goBack}>
                    VOLVER
                </button>
            </div>
          </div>

        </section>

        <div class="carousels-wrapper">
          <!-- Carrusel A–H -->
          <div class="carousel">
            <div class="carousel-track carousel-left">
              ${this.imagesLeft.map(
                img => html`<img src=${img} class="carousel-image" />`
              )}
            </div>
          </div>

          <!-- Carrusel I–O -->
          <div class="carousel">
            <div class="carousel-track carousel-right">
              ${this.imagesRight.map(
                img => html`<img src=${img} class="carousel-image" />`
              )}
            </div>
          </div>
        </div>

        <div class="consulta-folio">
          <span>¿Ya has iniciado tu proceso? </span>
          <span @click=${() => this.navigate('/consulta-folio')}>
            Consulta tu estatus con tu folio aquí.
          </span>
        </div>
      </main>

      ${this.showPdfModal ? html`
        <div class="modal-backdrop" @click=${this.closePdf}>
          <div class="modal" @click=${e => e.stopPropagation()}>
            
            <div class="modal-header">
              <span>Convocatoria Policía Auxiliar</span>
              <button class="modal-close" @click=${this.closePdf}>✕</button>
            </div>

            <div class="modal-body">
              <iframe
                src="/src/assets/convocatoria/convocatoria-pa.pdf"
                title="Convocatoria Policía Auxiliar">
              </iframe>
            </div>

          </div>
        </div>
      ` : null}

    `;
  }
}

customElements.define('convocatoria-auxiliar', ConvocatoriaAuxiliar);