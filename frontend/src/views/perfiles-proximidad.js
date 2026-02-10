import { LitElement, html, css } from 'lit';

export class PerfilesProximidad extends LitElement {
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
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
      max-width: 1000px;
      margin: 0 auto 4rem;
      padding: 1rem;
      margin-bottom:0.5rem;
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

    /* ===== TITULO ===== */
    .card-body {
      min-height: 120px; /* 🔑 ajusta si quieres más aire */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-title {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
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

    /* ===== BUTTONS ===== */
    .card-actions {
      margin-top: auto; /* 🔑 empuja botones al mismo nivel */
      flex-direction: column;
      align-items: center;
    }

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

    .proximidad-registro { background: #a4b6ba; }
    .proximidad-consulta { background: #d4dae0; }

    .seg-pub-registro { background: #29569e; color: #fff; }
    .seg-pub-consulta { background: #717173; color: #fff; }

    .cibernetica-registro { background: #3c8c9c; color: #fff; }
    .cibernetica-consulta { background: #cdccc5; }

    .victimas-registro { background: #5b3996; color: #fff; }
    .victimas-consulta { background: #9a7eb9; }

    .acciones {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .btn-volver {
      background: #051142;
      border-radius: 10px;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      margin-bottom:0.5rem;
      color:#fff;

      /* -------- FUENTE --------- */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
    }

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

      .ipes {
        font-size: 1.4rem;
      }

      .title {
        font-size: 2rem;
      }

      .card-body {
        min-height: auto;
      }
    }
  `;

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

        <div class="card-body">
          <h3 class="card-title">${title}</h3>
        </div>

        <div class="card-actions">
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
        </div>
      </article>
    `;
  }
  
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
        <h1 class="title">POLICÍA DE PROXIMIDAD</h1>
        <p class="subtitle">Perfiles disponibles en la Convocatoria</p>
      </section>

      
      <section class="cards">
        ${this.renderCard({
          title: 'Policía de Proximidad',
          image: '/src/assets/proximidad/Proximidad.jpg',
          registroPath: '/convocatoria-proximidad',
          consultaPath: '/consulta-folio',
          registroClass: 'proximidad-registro',
          consultaClass: 'proximidad-consulta'
        })}

        ${this.renderCard({
          title: 'Policía de Proximidad Especializada para Analista en Seguridad Pública',
          image: '/src/assets/proximidad/SegPub.jpeg',
          registroPath: '/convocatoria-proximidad-seg-pub',
          consultaPath: '/consulta-folio',
          registroClass: 'seg-pub-registro',
          consultaClass: 'seg-pub-consulta'
        })}

        ${this.renderCard({
          title: 'Policía de Proximidad Especializada para Policía Cibernética',
          image: '/src/assets/proximidad/Cibernetica.jpg',
          registroPath: '/convocatoria-proximidad-cibernetica',
          consultaPath: '/consulta-folio',
          registroClass: 'cibernetica-registro',
          consultaClass: 'cibernetica-consulta'
        })}

        ${this.renderCard({
          title: 'Policía de Proximidad Especializada para Atención a Víctimas de Violencia Familiar y de Género',
          image: '/src/assets/proximidad/Victimas.jpg',
          registroPath: '/convocatoria-proximidad-victimas',
          consultaPath: '/consulta-folio',
          registroClass: 'victimas-registro',
          consultaClass: 'victimas-consulta'
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

customElements.define('perfiles-proximidad', PerfilesProximidad);