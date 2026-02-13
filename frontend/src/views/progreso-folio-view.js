import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { progresoFolioStyles } from '../styles/progreso-folio.styles.js';

export class ProgresoFolioView extends LitElement {
  
  static styles = [progresoFolioStyles];

  /* ========================================= JAVASCRIPT ======================================== */
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

  /* ========================================= HTML ======================================== */
  render() {
    const progreso = ((this.paso - 1) / (this.pasos.length - 1)) * 100;

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