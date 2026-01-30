import { LitElement, html, css } from 'lit';

export class ProgresoFolioView extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
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

    .fondo {
      background: #f2efe9;
      min-height: calc(100vh - 130px);
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      max-width: 1100px;
      width: 100%;
      border-radius: 24px;
      padding: 3rem;

      animation: slideUpFade 0.45s ease-out;
    }

    h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 2rem;
      color: #2e3032;
    }

    .folio-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
      font-size: 2rem;
      font-weight: 900;
      color: #2e3032;
    }

    .folio {
      color: #465f9a;
      font-weight: 900;
      letter-spacing: 1px;
    }

    /* ===== PROGRESO ===== */
    .progress {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 3rem;
    }

    .progress::before {
      content: '';
      position: absolute;
      top: 22px;
      left: 0;
      right: 0;
      height: 4px;
      background: #d1cfcd;
      z-index: 0;
    }

    .progress-bar {
      position: absolute;
      top: 22px;
      left: 0;
      height: 4px;
      background: #80c87a;
      width: 0%;
      transition: width 0.6s ease;
      z-index: 1;
    }

    .step {
      position: relative;
      z-index: 2;
      text-align: center;
      width: 20%;
    }

    .circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #d1cfcd;
      margin: 0 auto 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      transition: background 0.4s ease;
    }

    .step.active .circle {
      background: #80c87a;
      color: #fff;
    }

    .label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #2e3032;
    }

    /* ===== INFO ===== */
    .info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 2rem;
      color: #2e3032;
    }

    .box {
      background: #f5f5f5;
      border-radius: 16px;
      padding: 1.5rem;
    }

    .box h4 {
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
      color: #2e3032;
    }

    .box p {
      font-size: 0.9rem;
      line-height: 1.4;
      color: #2e3032;
    }

    .acciones {
      margin-top: 3rem;
      display: flex;
      justify-content: center;
    }

    .btn {
      width: 220px;
      height: 44px;
      background: #465f9a;
      color: #fff;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      cursor: pointer;
    }

    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 900px) {
      .info {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    folio: { type: String },
    paso: { type: Number }
  };

  constructor() {
    super();
    this.paso = 3; // paso actual (puedes cambiarlo)
    this.folio = sessionStorage.getItem('folio') || 'SSPMQ/IPES/GC/6-001';
  }

  pasos = [
    'Pre-registro',
    'Registro',
    'Evaluación Médica',
    'Evaluación Psicométrica',
    'Control de Confianza'
  ];

  aceptar() {
    globalThis.location.href = '/consulta-folio';
  }

  render() {
    const progreso = ((this.paso - 1) / (this.pasos.length - 1)) * 100;

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
          <h2 class="folio-title">
            SOLICITUD CON FOLIO: 
            <span class="folio">${this.folio}</span>
          </h2>

          <div class="progress">
            <div class="progress-bar" style="width:${progreso}%"></div>

            ${this.pasos.map(
              (nombre, index) => html`
                <div class="step ${this.paso >= index + 1 ? 'active' : ''}">
                  <div class="circle">${index + 1}</div>
                  <div class="label">${nombre}</div>
                </div>
              `
            )}
          </div>

          <div class="info">
            <div class="box">
              <h4>Deberás acudir a:</h4>
              <p>
                SECRETARÍA DE SEGURIDAD PÚBLICA MUNICIPAL DE QUERÉTARO<br /><br />
                Av. Tláloc 102, Desarrollo San Pablo,<br />
                76130 Santiago de Querétaro, Qro.<br /><br />
                Teléfonos:<br />
                442 427 67 00 ext. 4987, 4921, 4314, 4936, 4932
              </p>
            </div>

            <div class="box">
              <h4>Documentos requeridos</h4>
              <p>
                INE vigente.<br />
                Licencia de conducción.<br />
                Comprobante de estudios.<br />
                Cartilla Militar (Hombres).<br /><br />
                La información detallada de la documentación será enviada
                al correo electrónico que proporcionaste durante tu registro.
              </p>
            </div>
          </div>

          <div class="acciones">
            <div class="btn" @click=${this.aceptar}>ACEPTAR</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('progreso-folio-view', ProgresoFolioView);