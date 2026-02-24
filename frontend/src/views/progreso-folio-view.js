import { LitElement, html, svg } from 'lit';
import { unsafeHTML as unsafeHTMLDirective } from 'lit/directives/unsafe-html.js';
import './alerta-view.js';
import '../components/ipes-header.js';
import { progresoFolioStyles } from '../styles/progreso-folio.styles.js';

import { 
  getInformacionEtapa, 
  extraerPerfilDeFolio,
  NOMBRES_PERFILES
} from '../config/proceso-info.config.js';

export class ProgresoFolioView extends LitElement {
  
  static styles = [progresoFolioStyles];

  static properties = {
    folio: { type: String },
    perfil: { type: String },
    nombrePerfil: { type: String },
    colorPerfil: { type: String },
    paso: { type: Number },
    pasoSeleccionado: { type: Number },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    pasos: { type: Array }
  };

  constructor() {
    super();
    this.pasoSeleccionado = 0;
    this.folio = sessionStorage.getItem('folio_consulta') || 'SSPMQ/IPES/GC/6-001';
    this.mostrarAlerta = false;
    this.alertaConfig = {};
    
    this.perfil = extraerPerfilDeFolio(this.folio);
    this.nombrePerfil = NOMBRES_PERFILES[this.perfil] || 'Candidato';
    this.colorPerfil = this.getColorPerfil(this.perfil);

    this.inicializarPasos();
  }

  getColorPerfil(perfil) {
    const colores = {
      'GC': '#8B4513',
      'GA': '#2E7D32',
      'GV': '#F57C00',
      'PA': '#1976D2',
      'PP': '#5374a8',
      'PC': '#7B1FA2',
      'UA': '#C62828',
      'AV': '#00897B'
    };
    return colores[perfil] || '#5374a8';
  }

  inicializarPasos() {
    const nombreEtapas = [
      'Pre-registro',
      'Registro',
      'Evaluación Médica',
      'Evaluación Psicométrica',
      'Control de Confianza'
    ];

    this.pasos = nombreEtapas.map((nombre, index) => {
      const info = getInformacionEtapa(this.perfil, index);
      
      return {
        nombre,
        estatus: index === 0 ? 'en-proceso' : 'bloqueado',
        sede: info.sede,
        documentacion: info.documentacion,
        mensaje: info.mensaje,
        mensajeAlerta: info.mensajeAlerta,
        colorPerfil: info.colorPerfil
      };
    });
  }

  /* ============== 🎨 APLICAR COLOR A DOCUMENTOS ESPECÍFICOS ============== */
  aplicarColorDocumentos(texto, color) {
    if (!texto) return texto;
    
    const lineas = texto.split('\n');
    const lineasProcesadas = lineas.map(linea => {
      if (linea.includes('• Cartilla') || linea.includes('• Certificado')) {
        return `<span class="doc-perfil" style="color: ${color}; font-weight: 500;">${linea}</span>`;
      }
      return linea;
    });
    
    return lineasProcesadas.join('\n');
  }

  seleccionarPaso(index) {
    const paso = this.pasos[index];

    if (paso.estatus === 'bloqueado') {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'bloqueado',
        titulo: 'Etapa bloqueada',
        mensaje: paso.mensajeAlerta || 'Debes completar la etapa anterior para visualizar esta.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    this.pasoSeleccionado = index;
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  aceptar() {
    globalThis.location.href = '/consulta-folio';
  }

  async obtenerProceso() {
    const folio = this.folio;

    try {
      const resp = await fetch(`http://localhost:3000/candidatos?folio=${folio}`);
      const data = await resp.json();

      if (!data.length) return;

      const estatusProceso = data[0].estatusProceso;
      this.actualizarPasos(estatusProceso);
    } catch (error) {
      console.error('Error al obtener proceso:', error);
    }
  }

  actualizarPasos(nivel) {
    this.pasos = this.pasos.map((paso, index) => {
      if (index < nivel) {
        return { ...paso, estatus: 'aprobado' };
      }

      if (index === nivel) {
        return { ...paso, estatus: 'en-proceso' };
      }

      return { ...paso, estatus: 'bloqueado' };
    });

    this.pasoSeleccionado = nivel;
  }

  firstUpdated() {
    this.obtenerProceso();
  }

  /* ============== 🎨 ICONOS SVG DE BOOTSTRAP ============== */
  iconoUbicacion() {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
      </svg>
    `;
  }

  iconoDocumento() {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-fill" viewBox="0 0 16 16">
        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z"/>
      </svg>
    `;
  }

  render() {
    const pasoActual = this.pasos[this.pasoSeleccionado];
    const esPreregistro = this.pasoSeleccionado === 0;

    const documentacionConColor = pasoActual.documentacion 
      ? this.aplicarColorDocumentos(pasoActual.documentacion, pasoActual.colorPerfil)
      : '';

    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .boton=${this.alertaConfig.boton}
          @aceptar=${this.cerrarAlerta}
        ></alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <div class="fondo">
        <div class="card animate-in">
          <!-- 📝 TÍTULO Y FOLIO MEJORADOS -->
          <div class="folio-header">
            <h2 class="folio-title">SOLICITUD CON FOLIO:</h2>
            <div class="folio" style="background: linear-gradient(135deg, ${this.colorPerfil}, ${this.colorPerfil}dd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              ${this.folio}
            </div>
            <div class="perfil-nombre">
              ${this.nombrePerfil}
            </div>
          </div>

          <!-- 🔄 BARRA DE PROGRESO -->
          <div class="progress-container">
            ${this.pasos.map((paso, index) => {
              const isCompleted = paso.estatus === 'aprobado';
              const isCurrent = paso.estatus === 'en-proceso';
              const isSelected = this.pasoSeleccionado === index;
              const isLast = index === this.pasos.length - 1;

              return html`
                <div 
                  class="step-wrapper ${paso.estatus} ${isSelected ? 'seleccionado' : ''}"
                  @click=${() => this.seleccionarPaso(index)}
                >
                  <div class="step-circle">
                    ${isCompleted ? html`<span class="checkmark">✓</span>` : html`${index + 1}`}
                  </div>
                  <div class="step-label">${paso.nombre}</div>
                </div>

                ${!isLast ? html`
                  <div class="step-line ${isCompleted || isCurrent ? 'completed' : ''}"></div>
                ` : ''}
              `;
            })}
          </div>

          <!-- 📋 INFORMACIÓN DEL PASO -->
          <div class="info-container">
            ${esPreregistro ? html`
              <div class="info-grid">
                <div class="info-box ${pasoActual.estatus}">
                  <h3>${this.iconoUbicacion()} Sede</h3>
                  <div class="formatted-text">
                    ${unsafeHTMLDirective(pasoActual.sede || '')}
                  </div>
                </div>

                <div class="info-box ${pasoActual.estatus}">
                  <h3>${this.iconoDocumento()} Documentación</h3>
                  <div class="formatted-text">
                    ${unsafeHTMLDirective(documentacionConColor)}
                  </div>
                </div>
              </div>
            ` : pasoActual.mensaje ? html`
              <div class="info-grid">
                <div class="info-box ${pasoActual.estatus}">
                  <h3>${this.iconoUbicacion()} Sede</h3>
                  <div class="formatted-text">
                    ${unsafeHTMLDirective(pasoActual.sede || '')}
                  </div>
                </div>

                <div class="info-box ${pasoActual.estatus}">
                  <h3>${this.iconoDocumento()} Información</h3>
                  <div class="formatted-text">
                    ${unsafeHTMLDirective(pasoActual.mensaje || '')}
                  </div>
                  ${pasoActual.documentacion ? html`
                    <hr style="margin: 1.5rem 0; border: none; border-top: 2px solid rgba(0,0,0,0.1);">
                    <div class="formatted-text">
                      ${unsafeHTMLDirective(pasoActual.documentacion || '')}
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : html`
              <div class="info-box ${pasoActual.estatus}">
                <div class="formatted-text">
                  ${pasoActual.mensajeAlerta}
                </div>
              </div>
            `}
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