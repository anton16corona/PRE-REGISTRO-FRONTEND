import { LitElement, html, css } from 'lit';

export class CitasView extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
    }

    * {
      box-sizing: border-box;
    }

    /* ============================ HEADER ================================= */
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

    /* ===== CONTENEDOR ===== */
    .fondo {
      min-height: calc(100vh - 120px);
      background: #f2efe9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(2rem, 4vw, 4rem) 1rem;
    }

    /* ===== CARD ===== */
    .card {
      background: #ffffff;
      width: 100%;
      max-width: 920px;
      border-radius: clamp(14px, 2vw, 22px);
      padding: clamp(2.5rem, 5vw, 4rem);
      text-align: center;
    }

    .folio {
      font-size: clamp(0.85rem, 1vw, 1rem);
      text-align: right;
      margin-bottom: 1rem;
      color: #2e3032;
    }

    .folio span {
      color: #6f6f6f;
      font-weight: 500;
    }

    .titulo {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: #2e3032;
    }

    .texto {
      font-size: clamp(0.85rem, 1.1vw, 1rem);
      margin-bottom: 1.5rem;
      color: #3a3a3a;
    }

    .direccion {
      font-size: clamp(0.95rem, 1.2vw, 1.1rem);
      font-weight: 700;
      margin-bottom: 2rem;
      color: #2e3032;
    }

    .lista {
      text-align: left;
      font-size: clamp(0.8rem, 1vw, 0.95rem);
      margin-bottom: 2.5rem;
      color: #2e3032;
    }

    .lista ul {
      padding-left: 1.2rem;
      margin-bottom: 0.75rem;
    }

    .lista li {
      margin-bottom: 0.4rem;
    }

    .btn {
      margin: 0 auto;
      width: clamp(180px, 25vw, 240px);
      height: clamp(42px, 6vw, 48px);
      background: #b79a57;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(0.85rem, 1vw, 1rem);
      font-weight: 600;
      cursor: pointer;
      color: #000;
    }

    /* ======================================= RESPONSIVE ======================================= */
    /* ============ AJUSTES DE TAMAÑO PARA DIVERSOS DISPOSITIVOS MÓVILES COMPATIBILIDAD ========== */

    /* ================= PARA 1024 PX ================== */
    @media (max-width: 1024px) {
      .cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ================= PARA 900 PX ================== */
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

  /* ================= PARA 640 PX ================== */
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

      .card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.8rem;
      }

      label {
        font-size: 0.9rem;
      }

      input {
        font-size: 15px;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
        max-width: 100%;
        font-size: 1.1rem;
      }
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */
  _irACalendario() {
    globalThis.history.pushState({}, '', '/cita-calendario');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  get folio() {
    return sessionStorage.getItem('folio_preregistro') || 'SSPMQ/IPES/GC/6-001';
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

      <div class="fondo">
        <div class="card">
          <div class="folio">Folio: <span>${this.folio}</span></div>

          <div class="titulo">GENERA TU CITA</div>

          <div class="texto">
            A continuación, podrás seleccionar la fecha y hora más adecuada a tu
            disponibilidad para la entrega de tus documentos en la siguiente
            dirección:
          </div>

          <div class="direccion">
            Av. Tláloc 102, Desarrollo San Pablo,<br />
            76130 Santiago de Querétaro, Qro.
          </div>

          <div class="lista">
            <ul>
              <li>El horario de atención es de Lunes a Viernes de 8:00 a 16:00 hrs.</li>
            </ul>
          </div>

          <!-- BOTÓN CON EVENTO -->
          <div class="btn" @click=${this._irACalendario}>
            GENERAR CITA
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-view', CitasView);