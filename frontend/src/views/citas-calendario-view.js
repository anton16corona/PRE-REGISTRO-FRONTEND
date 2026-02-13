import { LitElement, html } from 'lit';
import './alerta-view.js';
import '../components/ipes-header.js';

import { citasCalendarioStyles } from '../styles/citas-calendario.styles.js';

export class CitasCalendarioView extends LitElement {
  
  static styles = [citasCalendarioStyles];

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    showHorarios: { type: Boolean },
    horaSeleccionada: { type: String },
    mostrarAlerta: { type: Boolean },
    
    diaSeleccionado: { type: Number },
    tipoDisponibilidad: { type: String }
  };

  constructor() {
    super();
    this.showHorarios = false;
    this.horaSeleccionada = null;
    this.mostrarAlerta = false;

      // NUEVO
    this.diaSeleccionado = sessionStorage.getItem('cita_dia')
      ? Number(sessionStorage.getItem('cita_dia'))
      : null;

    this.tipoDisponibilidad = sessionStorage.getItem('cita_tipo');
    this.horaSeleccionada = sessionStorage.getItem('cita_hora');
    this.showHorarios = !!this.diaSeleccionado;
  }

  seleccionarDia(dia, tipo) {
    if (tipo === 'rojo') return;

    this.diaSeleccionado = dia;
    this.tipoDisponibilidad = tipo;
    this.showHorarios = true;
    this.horaSeleccionada = null;

    sessionStorage.setItem('cita_dia', dia);
    sessionStorage.setItem('cita_tipo', tipo);
    sessionStorage.removeItem('cita_hora');
  }

  seleccionarHora(h) {
    this.horaSeleccionada = h;
    sessionStorage.setItem('cita_hora', h);
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

      <ipes-header></ipes-header>

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
                          class="dia ${d.tipo} ${this.diaSeleccionado === d.dia ? 'seleccionado' : ''}"
                          @click=${() => this.seleccionarDia(d.dia, d.tipo)}
                        >
                          ${d.dia}
                        </div>
                      `
                )}
              </div>
            </div>

            <div class="leyenda">
              <h4>Disponibilidad</h4>

              <div class="leyenda-item">
                <div class="color-box color-rojo"></div>
                <div>Día inhábil</div>
                <strong>0%</strong>
              </div>

              <div class="leyenda-item">
                <div class="color-box color-amarillo"></div>
                <div>Disponibilidad parcial</div>
                <strong>70% o menos</strong>
              </div>

              <div class="leyenda-item">
                <div class="color-box color-verde"></div>
                <div>Con disponibilidad</div>
                <strong>71% – 100%</strong>
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

          ${this.diaSeleccionado ? html`
            <div style="margin-top:1.5rem; text-align:center; font-size:0.9rem; color:#2e3032;">
              <strong>Día seleccionado:</strong> ${this.diaSeleccionado}<br>

              <strong>Disponibilidad:</strong>
              ${this.tipoDisponibilidad === 'verde'
                ? 'Alta disponibilidad'
                : 'Disponibilidad parcial'}<br>

              <strong>Hora:</strong>
              ${this.horaSeleccionada ?? 'No seleccionada'}
            </div>
          ` : ''}

          <div class="acciones">
            <div class="btn sec" @click=${() => {
              sessionStorage.removeItem('cita_dia');
              sessionStorage.removeItem('cita_tipo');
              sessionStorage.removeItem('cita_hora');
              history.back();
            }}>
              REGRESAR
            </div>
            <div class="btn" @click=${this.confirmar}>GENERAR CITA</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-calendario-view', CitasCalendarioView);