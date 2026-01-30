import { LitElement, html, css } from 'lit';

export class ConvocatoriasView extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      width: 100%;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
    }

    /* ===== HEADER ===== */
    header {
      background: #0a0f24;
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 1.5rem 2.5rem;
    }

    .logo-left,
    .logo-right {
      width: 90px;
      height: auto;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: 2.5rem;
      line-height: 1.2;
    }

    /* ===== TITLE ===== */
    .title {
      text-align: center;
      font-size: 3rem;
      font-weight: 500;
      margin: 2.5rem 1rem;
      color: #2e3032;
    }

    /* ===== CARDS ===== */
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4rem;
      padding: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .card {
      background: #201e39;
      border-radius: 20px;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    .card img {
      width: 100%;
      max-width: 350px;
      min-height:300px;
      border-radius: 16px;
      margin-bottom: 1.2rem;
      object-fit: cover;
    }

    .card h3 {
      color: #ffffff;
      font-size: 1.7rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    /* ===== BUTTONS ===== */
    .btn {
      /* ===== FORMATO DE TEXTO BUTTONS ===== */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color:#2e3032;

      /* ===== FORMATO DE BUTTONS ===== */
      width: 100%;
      max-width: 260px;
      padding: 0.75rem;
      border-radius: 28px;
      border: none;
      cursor: pointer;
      margin-bottom: 0.7rem;
    }

    .btn.registro {
      background: #7aa7c8;
    }

    .btn.consulta {
      background: #b9a065;
    }

    .perfilesbtn {
      /* ===== FORMATO DE TEXTO BUTTONS ===== */
      font-family: 'Montserrat', sans-serif;
      font-size: 1.7rem;
      font-weight: 700;
      color:#2e3032;

      /* ===== FORMATO DE BUTTONS ===== */
      background: #bfe0ef;
      width: 100%;
      max-width: 260px;
      min-height:100px;
      padding: 0.75rem;
      border-radius: 28px;
      border: none;
      cursor: pointer;
      margin-bottom: 0.7rem;
    }

    /* ===== FOOTER LOGO ===== */
    .footer-logo {
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }

    .footer-logo img {
      width: 100px;
    }

    /* ===== AJUSTES PARA MÓVIL PARA LA PANTALLA ===== */
    @media (max-width: 768px) {
    .ipes {
      font-size: 1.4rem;
    }

    .logo-left,
    .logo-right {
      width: 60px;
    }
  }

  @media (max-width: 1024px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }

  `;

  navigate(path) {
    globalThis.history.pushState({}, '', path);
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
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

      <h1 class="title">CONSULTA TU CONVOCATORIA</h1>

      <section class="cards">
        <!-- PROXIMIDAD -->
        <article class="card">
          <img src="/src/assets/Proximidad.jpg" />
          <h3>Policía de Proximidad</h3>
          <button
            class="perfilesbtn"
            @click=${() => this.navigate('/perfiles-proximidad')}
          >
            CONSULTA PERFILES
          </button>
        </article>

        <!-- AUXILIAR -->
        <article class="card">
          <img src="/src/assets/Auxiliar.jpeg" />
          <h3>Policía Auxiliar</h3>

          <button
            class="btn registro"
            @click=${() => this.navigate('/convocatoria-auxiliar')}
          >
            REGÍSTRATE
          </button>

          <button class="btn consulta">
            CONSULTA FOLIO
          </button>
        </article>

        <!-- GUARDIA -->
        <article class="card">
          <img src="/src/assets/Civica.jpg" />
          <h3>Guardia Cívica</h3>

          <button
            class="perfilesbtn"
            @click=${() => this.navigate('/perfiles-guardias')}
          >
            CONSULTA PERFILES
          </button>

        </article>
      </section>
    `;
  }
}

customElements.define('convocatorias-view', ConvocatoriasView);
