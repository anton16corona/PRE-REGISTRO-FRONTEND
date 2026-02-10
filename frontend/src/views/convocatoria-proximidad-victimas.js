import { LitElement, html, css } from 'lit';

export class ConvocatoriaProximidadVictimas extends LitElement {
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
      flex-shrink: 0;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
      line-height: 1.2;
      white-space: normal;
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
      color: #4132a7;
    }

    .phrase {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      font-weight:500;
      color: #3b2b56;
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
      color: #360d61;
    }
  
    /* =============== BOTONES ================ */
    button {
      font-family: 'Montserrat', sans-serif;
    }
    
    .btn {
      background: #514f77;
      border-radius: 10px;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
      border: none;
      cursor: pointer;

      /* -------- FUENTE --------- */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .btn-volver {
      background: #a1942f;
      border-radius: 10px;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
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

    .convocatoria-img.zoom {
      transform: scale(1.8);
      cursor: zoom-out;
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
    .carousel {
        position: relative;
        width: 100%;
        max-width: 820px; 
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

  /* ============================================= JAVASCRIPT ============================================= */
    navigate(path) {
        history.pushState({}, '', path);
        globalThis.dispatchEvent(new PopStateEvent('popstate'));
    }

    toggleZoom(e) {
        e.target.classList.toggle('zoom');
    }

    goBack() {
        globalThis.location.href = '/perfiles-proximidad';
    }

    // ---------- CARRUSEL DE FOTOS. ----------
    images = [
        '/src/assets/proximidad/VictimasA.jpg',
        '/src/assets/proximidad/VictimasB.jpg',
        '/src/assets/proximidad/VictimasC.jpg',
        '/src/assets/proximidad/VictimasD.jpg',
        '/src/assets/proximidad/VictimasE.jpg',
        '/src/assets/proximidad/VictimasF.jpg',
    ];

    index = 0;
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
        this.index = (this.index + 1) % this.images.length;
        this.updateCarousel();
    }, 1500); // ⏱️ velocidad (3.5s)
    }

    updateCarousel() {
        const track = this.renderRoot.querySelector('.carousel-track');
        track.style.transform = `translateX(-${this.index * 100}%)`;
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
            <img class="convocatoria-img" src="/src/assets/policia/ConvocatoriaPolicia.jpg" @click=${this.toggleZoom} />
          </div>

          <div class="content">
            <h1 class="title">
              Policía de Proximidad Especializada para Atención a Víctimas de Violencia Familiar y de Género.
            </h1>

            <p class="phrase">
              ¡Forma parte de nuestro cuerpo de Proximidad!
            </p>

            <p class="info">
              Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la 
              paz pública dentro del municipio de Querétaro a través de la ejecución de acciones policiales 
              tendientes a la investigación a través de la ejecución de acciones policiales tendientes a la 
              atención a víctimas de Violencia Familiar y de Género. Perfil  responsable de brindar ayuda, 
              atención y asistencia a las víctimas, en coordinación con las Instituciones competentes, 
              bajo los principios constitucionales de legalidad, objetividad, eficiencia, profesionalismo, 
              honradez, respeto a los derechos humanos y perspectiva de género.
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

        <div class="carousel">
            <div class="carousel-track">
                ${this.images.map(
                img => html`<img src=${img} class="carousel-image" />`
                )}
            </div>
        </div>
        
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

customElements.define('convocatoria-proximidad-victimas', ConvocatoriaProximidadVictimas);