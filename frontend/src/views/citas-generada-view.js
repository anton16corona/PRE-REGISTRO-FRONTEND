import { LitElement, html, css } from 'lit';

export class CitasGeneradaView extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
    }

    * { box-sizing: border-box; }

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
      align-items: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      max-width: 1200px;
      width: 100%;
      border-radius: 28px;
      padding: 4rem 2.5rem;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,.08);
    }

    .icono {
      width: 90px;
      height: 90px;
      background: #4caf50;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .icono svg {
      width: 48px;
      height: 48px;
      fill: #fff;
    }

    .titulo {
      font-size: clamp(2rem, 3vw, 2.6rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: #2e3032;
    }

    .folio {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      color: #4a4a4a;
    }

    .texto {
      font-size: 1.05rem;
      max-width: 700px;
      margin: 0 auto 2.5rem;
      line-height: 1.4;
      margin-bottom: 2rem;
      color: #3a3a3a;
    }

    .acciones {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;
    }

    .btn {
      width: 220px;
      height: 42px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }

    .btn.primario {
      background: #4caf50;
      color: #fff;
    }

    .btn.secundario {
      background: #b87333;
      color: #fff;
    }
  `;

  static properties = {
    folio: { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object }
  };

  constructor() {
    super();

    const perfil = sessionStorage.getItem('perfil_codigo') || 'GC';
    const convocatoria = 6;
    const consecutivo = '001';

    this.folio = `SSPMQ/IPES/${perfil}/${convocatoria}-${consecutivo}`;

    this.mostrarAlerta = false;
    this.alertaConfig = {};
  }

  aceptar() {
    this.mostrarAlerta = true;
    this.alertaConfig = {
      tipo: 'success',
      titulo: 'Cita registrada exitosamente',
      mensaje:
        'La información de tu cita fue enviada correctamente al correo electrónico proporcionado.',
      extra: `Folio: ${this.folio}`,
      boton: 'ENTENDIDO'
    };
  }

  consultarFolio() {
    sessionStorage.setItem('folio_consulta', this.folio);

    globalThis.history.pushState({}, '', '/consulta-folio');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;

    globalThis.history.pushState({}, '', '/convocatorias');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra}
          .boton=${this.alertaConfig.boton}
          @aceptar=${this.cerrarAlerta}
        ></alerta-view>
      ` : ''}

      <header>
        <img class="logo-left" src="/src/assets/SSPlogo.png" alt="SSP" />

        <div class="ipes">
          INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES
        </div>

        <img class="logo-right" src="/src/assets/IPESlogo.png" alt="IPES" />
      </header>

      <div class="fondo">
        <div class="card">
          <div class="icono">
            <svg viewBox="0 0 24 24">
              <path
                d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z"
              />
            </svg>
          </div>

          <div class="titulo">CITA GENERADA</div>

          <div class="folio">
            Folio: <strong>${this.folio}</strong>
          </div>

          <div class="texto">
            Se ha generado tu cita exitosamente, para consultar los detalles
            de tu asistencia, se ha enviado la información al correo electrónico
            proporcionado, o bien, puedes consultar con tu folio la información.
          </div>

          <div class="acciones">
            <div class="btn primario" @click=${this.aceptar}>
              ACEPTAR
            </div>

            <div class="btn secundario" @click=${this.consultarFolio}>
              CONSULTAR CON FOLIO
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-generada-view', CitasGeneradaView);