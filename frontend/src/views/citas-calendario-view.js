import { LitElement, html, css } from 'lit';
import './alerta-view.js';

export class CitasCalendarioView extends LitElement {
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
      max-width: 980px;
      width: 100%;
      border-radius: 24px;
      padding: 3rem;
    }

    .titulo {
      text-align: center;
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 2rem;
      color: #2e3032;
    }

    .contenido {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 2.5rem;
      align-items: flex-start;
    }

    .semana {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.7rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #2e3032;
    }

    .dias {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      margin-bottom: 1.5rem;
      color: #2e3032;
    }

    .dia {
      padding: 10px 0;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 700;
      color: #2e3032;
    }

    .vacio { visibility: hidden; }
    .rojo { background: #f26d6d; color: #fff; cursor: not-allowed; }
    .verde { background: #b6f36b; }
    .amarillo { background: #ffe680; }

    .horarios {
      background: #e9f5ff;
      border-radius: 18px;
      padding: 1.2rem;
      color: #2e3032;
    }

    .hora {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      font-size: 0.75rem;
      color: #2e3032;
    }

    .acciones {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      width: 200px;
      height: 42px;
      background: #baa065;
      border-radius: 999px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }

    .btn.sec { background: #ccc; }

    @media (max-width: 768px) {
      .contenido { grid-template-columns: 1fr; }
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    showHorarios: { type: Boolean },
    horaSeleccionada: { type: String },
    mostrarAlerta: { type: Boolean }
  };

  constructor() {
    super();
    this.showHorarios = false;
    this.horaSeleccionada = null;
    this.mostrarAlerta = false;
  }

  seleccionarDia(tipo) {
    if (tipo === 'rojo') return;
    this.showHorarios = true;
    this.horaSeleccionada = null;
  }

  seleccionarHora(h) {
    this.horaSeleccionada = h;
  }

  confirmar() {
    if (!this.horaSeleccionada) {
      this.mostrarAlerta = true;
      return;
    }

    // Guardamos la cita seleccionada (simulado)
    sessionStorage.setItem('cita_fecha', '2024-06-20'); // luego será dinámica
    sessionStorage.setItem('cita_hora', this.horaSeleccionada);

    // Navegación correcta
    globalThis.history.pushState({}, '', '/cita-generada');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }


  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  generarHorarios() {
    const horas = [];
    let h = 9;
    let m = 0;

    while (h < 15 || (h === 15 && m === 0)) {
      horas.push(`${h}:${m === 0 ? '00' : '30'}`);
      m += 30;
      if (m === 60) { m = 0; h++; }
    }
    return horas;
  }

  getDiasMes() {
    const diasMes = 31;
    const primerDia = 4;
    const dias = [];

    for (let i = 0; i < primerDia; i++) dias.push({ tipo: 'vacio' });

    for (let d = 1; d <= diasMes; d++) {
      let tipo = 'verde';
      if ([1, 25].includes(d)) tipo = 'rojo';
      if ([20, 21, 24].includes(d)) tipo = 'amarillo';
      dias.push({ dia: d, tipo });
    }
    return dias;
  }

  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          tipo="warning"
          titulo="Horario no seleccionado"
          mensaje="Para continuar, debes seleccionar un horario disponible antes de generar tu cita."
          boton="ENTENDIDO"
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
          <div class="titulo">SELECCIONA TU CITA</div>

          <div class="contenido">
            <div>
              <div class="semana">
                <div>DOM</div><div>LUN</div><div>MAR</div>
                <div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div>
              </div>

              <div class="dias">
                ${this.getDiasMes().map(d =>
                  d.tipo === 'vacio'
                    ? html`<div class="dia vacio"></div>`
                    : html`
                        <div
                          class="dia ${d.tipo}"
                          @click=${() => this.seleccionarDia(d.tipo)}
                        >
                          ${d.dia}
                        </div>
                      `
                )}
              </div>
            </div>

            ${this.showHorarios ? html`
              <div class="horarios">
                <h4>Horarios disponibles</h4>
                ${this.generarHorarios().map(h => html`
                  <div class="hora">
                    <span>${h}</span>
                    <input type="radio" name="hora"
                      @change=${() => this.seleccionarHora(h)} />
                  </div>
                `)}
              </div>
            ` : ''}
          </div>

          <div class="acciones">
            <div class="btn sec" @click=${() => history.back()}>REGRESAR</div>
            <div class="btn" @click=${this.confirmar}>GENERAR CITA</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-calendario-view', CitasCalendarioView);
