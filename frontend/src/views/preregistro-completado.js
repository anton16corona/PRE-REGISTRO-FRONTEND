import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { preregistroCompletadoStyles } from '../styles/preregistro-completado.styles.js';

export class PreregistroCompletado extends LitElement {

  static styles = [preregistroCompletadoStyles];

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    folio: { type: String }
  };

  constructor() {
    super();

    // 🔥 Leer el folio real generado en el paso 3
    this.folio = sessionStorage.getItem('folio_preregistro') || 'SIN FOLIO';
  }

  consultarCita() {
    globalThis.history.pushState({}, '', '/cita-genera');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <ipes-header></ipes-header>

      <main>
        <section class="panel">
          <img class="verified" src="/src/assets/correcto.png" alt="Completado" />

          <div class="title">PRE-REGISTRO COMPLETADO</div>

          <div class="subtitle">
            Se ha generado su pre-registro exitosamente, con el siguiente folio:
          </div>

          <div class="folio">${this.folio}</div>

          <div class="genera-cita">
            A continuación, genere su cita para la entrega de documentos solicitados.
          </div>

          <button class="btn-cita" @click=${this.consultarCita}>
            GENERAR CITA
          </button>
        </section>
      </main>
    `;
  }
}

customElements.define('preregistro-completado', PreregistroCompletado);