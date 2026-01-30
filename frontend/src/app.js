import { LitElement, html } from 'lit';

import './views/perfiles-proximidad.js';
import './views/perfiles-guardias.js';

// ----- PREREGISTRO PROCESO -----
import './views/preregistro-view.js';
import './views/preregistro-paso2.js';
import './views/preregistro-paso-correo.js';
import './views/preregistro-completado.js';

// ----- CONVOCATORIAS -----
import './views/convocatorias-view.js';
import './views/convocatoria-auxiliar.js';

  // ----- GUARDIAS ------
import './views/convocatoria-guardia-vial.js';
import './views/convocatoria-guardia-civica.js';
import './views/convocatoria-guardia-auxilar.js';

  // ----- PROXIMIDAD ------
import './views/convocatoria-proximidad.js';
import './views/convocatoria-proximidad-seg-pub.js';
import './views/convocatoria-proximidad-cibernetica.js';
import './views/convocatoria-proximidad-victimas.js';

  // ----- CITA Y CALENDARIO ------
import './views/citas-view.js';
import './views/citas-calendario-view.js';
import './views/citas-generada-view.js';

  // ----- CONSULTA TU FOLIO ------
import './views/consulta-folio-view.js';
import './views/progreso-folio-view.js';

  // ----- ALERTAS ------
import './views/alerta-view.js';

export class AppRoot extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener('popstate', () => this.requestUpdate());
  }

  render() {
    switch (globalThis.location.pathname) {
      /* =============================== ALERTAS =============================== */
      case '/alerta':
        return html`<alerta-view></alerta-view>`;

      /* =============================== PERFILES =============================== */
      case '/perfiles-guardias':
        return html`<perfiles-guardias></perfiles-guardias>`;

      case '/perfiles-proximidad':
        return html`<perfiles-proximidad></perfiles-proximidad>`;

      /* =============================== CONVOCATORIAS =============================== */  
      case '/convocatoria-proximidad':
        return html`<convocatoria-proximidad></convocatoria-proximidad>`;
      
      case '/convocatoria-proximidad-seg-pub':
        return html`<convocatoria-proximidad-seg-pub></convocatoria-proximidad-seg-pub>`;
      
      case '/convocatoria-proximidad-cibernetica':
        return html`<convocatoria-proximidad-cibernetica></convocatoria-proximidad-cibernetica>`;

      case '/convocatoria-proximidad-victimas':
        return html`<convocatoria-proximidad-victimas></convocatoria-proximidad-victimas>`;
      
      case '/convocatoria-auxiliar':
        return html`<convocatoria-auxiliar></convocatoria-auxiliar>`;
      
      case '/convocatoria-guardia-vial':
        return html`<convocatoria-guardia-vial></convocatoria-guardia-vial>`;

      case '/convocatoria-guardia-civica':
        return html`<convocatoria-guardia-civica></convocatoria-guardia-civica>`;
        
      case '/convocatoria-guardia-auxiliar':
        return html`<convocatoria-guardia-auxiliar></convocatoria-guardia-auxiliar>`;

      /* =============================== PREREGISTRO =============================== */
      case '/preregistro':
        return html`<preregistro-view></preregistro-view>`;

      case '/preregistro-continuacion':
        return html`<preregistro-paso2></preregistro-paso2>`;
      
      case '/preregistro-envio':
        return html`<preregistro-paso-correo></preregistro-paso-correo>`;
      
      case '/preregistro-completado':
        return html`<preregistro-completado></preregistro-completado>`;

      /* =============================== CITAS =============================== */
      case '/cita-genera':
        return html`<citas-view></citas-view>`;
      
      case '/cita-calendario':
        return html`<citas-calendario-view></citas-calendario-view>`;

      case '/cita-generada':
        return html`<citas-generada-view></citas-generada-view>`;

      /* =============================== CONSULTA FOLIO =============================== */
      case '/consulta-folio':
        return html`<consulta-folio-view></consulta-folio-view>`;
      
      case '/progreso-folio':
        return html`<progreso-folio-view></progreso-folio-view>`;

      case '/':
      case '/convocatorias':
      default:
        return html`<convocatorias-view></convocatorias-view>`;
    }
  }
}

customElements.define('app-root', AppRoot);