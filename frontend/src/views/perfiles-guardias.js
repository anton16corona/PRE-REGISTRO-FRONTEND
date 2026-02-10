import { LitElement, html, css } from 'lit';

export class PerfilesGuardias extends LitElement {
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
      width: clamp(55px, 8vw, 90px);
      height: auto;
      flex-shrink: 0;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
      line-height: 1.2;

      max-width: 100%;
      white-space: normal;
    }

    /* ===== TITLES ===== */
    .titles {
      text-align: center;
      margin: 1.5rem 0.5rem 1rem;
    }

    .title {
      font-size: 3rem;
      font-weight: 600;
      color: #050607;
      margin: 0;
    }

    .subtitle {
      font-size: 1.5rem;
      font-weight: 400;
      color: #2e3032;
      margin-top: 0.5rem;      /* controla la separación */
    }

    /* ===== CARDS ===== */
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4rem;
      max-width: 1400px;
      margin: 0 auto 4rem;
      padding: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .card {
      background: #201e39;
      border-radius: 20px;
      padding: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card img {
      width: 100%;
      max-width: 360px;
      height: 360px;
      object-fit: cover;
      border-radius: 20px;
      margin-bottom: 1.5rem;
    }

    .card h3 {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .acciones {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ===== BUTTONS ===== */
    .btn-vial {
    /* ===== FORMATO DE TEXTO BUTTONS ===== */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color:#2e3032;

      width: 100%;
      max-width: 275px;
      height: 45px;
      border-radius: 28px;
      border: none;
      cursor: pointer;
      margin-bottom: 0.8rem;
    }

    .btn-volver {
      background: #051142;
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      margin-bottom:0.5rem;

      /* -------- FUENTE --------- */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .vial-registro { background: #b4c51f; }
    .vial-consulta { background: #d7d7d7; }

    .civica-registro { background: #29569e; color: #fff; }
    .civica-consulta { background: #717173; color: #fff; }

    .auxiliar-registro { background: #158cc5; color: #fff; }
    .auxiliar-consulta { background: #6bb5d2; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      header {
        text-align: center;
      }

      .cards {
        grid-template-columns: 1fr;
      }

      .title {
        font-size: 2rem;
      }
    }

    @media (max-width: 640px) {
      .gallery {
        grid-template-columns: 1fr;
      }

      .ipes {
        font-size: 1.4rem;
      }
    }
  `;

/* ========================================= JAVASCRIPT ======================================== */
  navigate(path) {
    history.pushState({}, '', path);
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  goBack() {
      globalThis.location.href = '/convocatorias-view';
  }

  renderCard({
    title,
    image,
    registroPath,
    consultaPath,
    registroClass,
    consultaClass
  }) {
    return html`
      <article class="card">
        <img src=${image} alt=${title} />
        <h3>${title}</h3>

        <button
          class="btn-vial ${registroClass}"
          @click=${() => this.navigate(registroPath)}
        >
          REGÍSTRATE
        </button>

        <button
          class="btn-vial ${consultaClass}"
          @click=${() => this.navigate(consultaPath)}
        >
          CONSULTA FOLIO
        </button>
      </article>
    `;
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

      <section class="titles">
        <h1 class="title">GUARDIA CÍVICA</h1>
        <p class="subtitle">Perfiles disponibles en la Convocatoria</p>
      </section>

      
      <section class="cards">
        ${this.renderCard({
          title: 'Guardia Vial',
          image: '/src/assets/GV.jpg',
          registroPath: '/convocatoria-guardia-vial',
          consultaPath: '/consulta-folio',
          registroClass: 'vial-registro',
          consultaClass: 'vial-consulta'
        })}

        ${this.renderCard({
          title: 'Guardia Cívica',
          image: '/src/assets/GC.jpg',
          registroPath: '/convocatoria-guardia-civica',
          consultaPath: '/consulta-folio',
          registroClass: 'civica-registro',
          consultaClass: 'civica-consulta'
        })}

        ${this.renderCard({
          title: 'Guardia Auxiliar',
          image: '/src/assets/GA.jpg',
          registroPath: '/convocatoria-guardia-auxiliar',
          consultaPath: '/consulta-folio',
          registroClass: 'auxiliar-registro',
          consultaClass: 'auxiliar-consulta'
        })}
      </section>
            
      <div class="acciones">
        <button class="btn-volver" @click=${this.goBack}>
          VOLVER
        </button>
      </div>
    `;
  }
}

customElements.define('perfiles-guardias', PerfilesGuardias);
