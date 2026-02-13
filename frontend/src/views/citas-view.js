import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { citasStyles } from '../styles/citas.styles.js';

export class CitasView extends LitElement {

  static styles = [citasStyles];

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
      <ipes-header></ipes-header>

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
            Secretaría de Seguridad Pública Municipal de Querétaro<br />
            Av. Tláloc No. 102, Col Desarrollo San Pablo, C.P. 76130, Querétaro, Qro.<br />
            Teléfono: 442 427 67 00 ext. 4987, 4314 y 4936.
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