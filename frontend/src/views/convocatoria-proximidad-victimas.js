import { LitElement, html, css } from 'lit';
import './pdf-zoom-viewer.js'; 
import '../components/image-carousel.js';

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
      color: #fff;
    }
    
    .btn {
      background: #514f77;
      border-radius: 10px;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: white;
      font-family: 'Montserrat', sans-serif;
    }

    .btn:hover {
      background: #635f8f;
    }

    .btn-volver {
      background: #a1942f;
      border-radius: 10px;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: white;
      font-family: 'Montserrat', sans-serif;
    }

    .btn-volver:hover {
      background: #b8a640;
    }

    .acciones {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    /* ============================== CONSULTA FOLIO ============================== */
    .consulta-folio {
      margin-top:1rem;
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

    .consulta-folio span:last-child:hover {
      text-decoration: underline;
    }

    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 1024 PX -------------*/
    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
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
  
  /* ============== NAVEGACIÓN A PREREGISTRO Y ATRÁS ============== */
  navigate(path) {
    history.pushState({}, '', path);
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  goBack() {
    globalThis.location.href = '/perfiles-proximidad';
  }

  goToPreregistro(e) {
    e?.preventDefault?.();
    const origen = globalThis.location.pathname;
    sessionStorage.setItem('origen_convocatoria', origen);
    globalThis.location.href = '/preregistro';
  }

  /* ============== CARRUSEL DE IMÁGENES ============== */
  get carouselImages() {
    return [
      '/src/assets/proximidad/VictimasA.jpg',
      '/src/assets/proximidad/VictimasB.jpg',
      '/src/assets/proximidad/VictimasC.jpg',
      '/src/assets/proximidad/VictimasD.jpg',
      '/src/assets/proximidad/VictimasE.jpg',
      '/src/assets/proximidad/VictimasF.jpg'
    ];
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
          <!-- --------------- PDF DE CONVOCATORIA, ESCOGER RUTA CORRECTA. --------------- -->
          <pdf-zoom-viewer 
            pdfUrl="/convocatoria/convocatoria-proximidad.pdf"
          ></pdf-zoom-viewer>

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

        <!-- --------------- CARRULSEL DE FOTO INFERIOR, EL ERROR NO AFECTA EL FUNCIONAMIENTO (SONAR QUBE). --------------- -->
        <image-carousel .images=${this.carouselImages}></image-carousel>

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