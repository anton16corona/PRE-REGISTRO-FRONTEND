import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { progresoFolioStyles } from '../styles/progreso-folio.styles.js';

export class ProgresoFolioView extends LitElement {
  
  static styles = [progresoFolioStyles];

  /* ========================================= JAVASCRIPT ======================================== */
  static properties = {
    folio: { type: String },
    paso: { type: Number },
    pasoSeleccionado: { type: Number }
  };

  constructor() {
    super();
    this.pasoSeleccionado = 0;
    this.folio = sessionStorage.getItem('folio') || 'SSPMQ/IPES/GC/6-001';

    this.pasos = [
    {
      nombre: 'Pre-registro',
      estatus: 'en-proceso',
      mensaje: `
        Deberás acudir a:
        SECRETARÍA DE SEGURIDAD PÚBLICA MUNICIPAL DE QUERÉTARO
        Av. Tláloc 102, Desarrollo San Pablo,
        76130 Santiago de Querétaro, Qro.
      `
    },
    {
      nombre: 'Registro',
      estatus: 'bloqueado',
      mensaje: 'Debes completar el Pre-registro para visualizar esta etapa.'
    },
    {
      nombre: 'Evaluación Médica',
      estatus: 'bloqueado',
      mensaje: 'Debes completar el Registro para visualizar esta etapa.'
    },
    {
      nombre: 'Evaluación Psicométrica',
      estatus: 'bloqueado',
      mensaje: 'Debes completar la Evaluación Médica.'
    },
    {
      nombre: 'Control de Confianza',
      estatus: 'bloqueado',
      mensaje: 'Debes completar la Evaluación Psicométrica.'
    }
  ];
  }

  seleccionarPaso(index)
  {
    const paso = this.pasos[index];

    if(paso.estatus === 'bloqueado'){
      alert(paso.mensaje);
      return;
    }

    this.pasoSeleccionado = index;
  }

  aceptar() 
  {
    globalThis.location.href = '/consulta-folio';
  }

  async obtenerProceso()
  {
    const folio = this.folio;

    const resp = await fetch(`http://localhost:3000/candidatos?folio=${folio}`);
    const data = await resp.json();

    if(!data.length) return;

    const estatusProceso = data[0].estatusProceso;

    this.actualizarPasos(estatusProceso);
  }

  actualizarPasos(nivel)
  {
    this.pasos = this.pasos.map((paso, index)=>{

      if(index < nivel){
        return {...paso, estatus:'aprobado'}
      }

      if(index === nivel){
        return {...paso, estatus:'en-proceso'}
      }

      return {...paso, estatus:'bloqueado'}

    });

    this.pasoSeleccionado = nivel;
  }

  firstUpdated()
  {
    this.obtenerProceso();
  }

  /* ========================================= HTML ======================================== */
  render() {
    const pasosCompletados = this.pasos.filter(
      p => p.estatus === 'aprobado' || p.estatus === 'en-proceso'
    ).length;

    const progreso = ((pasosCompletados - 1) / (this.pasos.length - 1)) * 100;

    return html`
      <ipes-header></ipes-header>

      <div class="fondo">
        <div class="card">
          <h2 class="folio-title">
            SOLICITUD CON FOLIO: 
            <span class="folio">${this.folio}</span>
          </h2>

          <div class="progress">
            <div class="progress-bar" style="width:${progreso}%"></div>

            ${this.pasos.map((paso, index) => html`
              <div 
                class="step ${paso.estatus} ${this.pasoSeleccionado === index ? 'seleccionado' : ''}"
                @click=${() => this.seleccionarPaso(index)}
              >
                <div class="circle">${index+1}</div>
                <div class="label">${paso.nombre}</div>
              </div>
            `)}
          </div>

          <div class="info">
            <div class="box ${this.pasos[this.pasoSeleccionado].estatus}">
              <p>
                ${this.pasos[this.pasoSeleccionado].mensaje}
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