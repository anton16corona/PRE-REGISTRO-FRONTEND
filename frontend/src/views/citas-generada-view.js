import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { citasGeneradaStyles } from '../styles/citas-generada.styles.js';

export class CitasGeneradaView extends LitElement {

  static styles = [citasGeneradaStyles];
  
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

      <ipes-header></ipes-header>

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