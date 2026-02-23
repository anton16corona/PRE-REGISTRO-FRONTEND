import { LitElement, html } from 'lit';
import './alerta-view.js';
import '../components/ipes-header.js';
import { progresoFolioStyles } from '../styles/progreso-folio.styles.js';

// 📦 IMPORTAR CONFIGURACIÓN ORGANIZADA
import { 
  getInformacionEtapa, 
  extraerPerfilDeFolio,
  NOMBRES_PERFILES 
} from '../config/proceso-info.config.js';

export class ProgresoFolioView extends LitElement {
  
  static styles = [progresoFolioStyles];

  /* ========================================= JAVASCRIPT ======================================== */
  static properties = {
    folio: { type: String },
    perfil: { type: String },
    nombrePerfil: { type: String },
    paso: { type: Number },
    pasoSeleccionado: { type: Number },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    pasos: { type: Array }
  };

  constructor() {
    super();
    this.pasoSeleccionado = 0;
    this.folio = sessionStorage.getItem('folio_consulta') || 'SSPMQ/IPES/AV/6-001';
    this.mostrarAlerta = false;
    this.alertaConfig = {};
    
    // 🔑 EXTRAER PERFIL DEL FOLIO
    this.perfil = extraerPerfilDeFolio(this.folio);
    this.nombrePerfil = NOMBRES_PERFILES[this.perfil] || 'Candidato';

    // 📋 INICIALIZAR PASOS CON INFORMACIÓN CORRECTA
    this.inicializarPasos();
  }

  /* ============== 🚀 INICIALIZAR PASOS CON CONFIGURACIÓN ============== */
  inicializarPasos() {
    const nombreEtapas = [
      'Pre-registro',
      'Registro',
      'Evaluación Médica',
      'Evaluación Psicométrica',
      'Control de Confianza'
    ];

    this.pasos = nombreEtapas.map((nombre, index) => {
      // 📦 OBTENER INFORMACIÓN DESDE EL ARCHIVO DE CONFIGURACIÓN
      const info = getInformacionEtapa(this.perfil, index);
      
      return {
        nombre,
        estatus: index === 0 ? 'en-proceso' : 'bloqueado',
        sede: info.sede,
        documentacion: info.documentacion,
        mensaje: info.mensaje || `Debes completar ${nombreEtapas[index - 1]} para visualizar esta etapa.`
      };
    });
  }

  /* ============== 📍 SELECCIONAR PASO ============== */
  seleccionarPaso(index) {
    const paso = this.pasos[index];

    if (paso.estatus === 'bloqueado') {
      // 🟡 USAR SISTEMA DE ALERTAS BEIGE
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'bloqueado',
        titulo: 'Etapa bloqueada',
        mensaje: paso.mensaje,
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

  /* ============== 🔄 OBTENER PROCESO DESDE BD ============== */
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

  /* ============== ✅ ACTUALIZAR ESTATUS DE PASOS ============== */
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

  /* ============== 🎬 LIFECYCLE ============== */
  firstUpdated() {
    this.obtenerProceso();
  }

  /* ========================================= HTML ======================================== */
  render() {
    const pasoActual = this.pasos[this.pasoSeleccionado];
    const esPreregistro = this.pasoSeleccionado === 0;

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
            <div class="folio">${this.folio}</div>
            <div class="perfil-badge">${this.nombrePerfil}</div>
          </div>

          <!-- 🔄 BARRA DE PROGRESO MEJORADA -->
          <div class="progress-container">
            ${this.pasos.map((paso, index) => {
              const isCompleted = paso.estatus === 'aprobado';
              const isCurrent = paso.estatus === 'en-proceso';
              const isSelected = this.pasoSeleccionado === index;
              const isLast = index === this.pasos.length - 1;

              return html`
                <!-- CÍRCULO DEL PASO -->
                <div 
                  class="step-wrapper ${paso.estatus} ${isSelected ? 'seleccionado' : ''}"
                  @click=${() => this.seleccionarPaso(index)}
                >
                  <div class="step-circle">
                    ${isCompleted ? html`<span class="checkmark">✓</span>` : html`${index + 1}`}
                  </div>
                  <div class="step-label">${paso.nombre}</div>
                </div>

                <!-- LÍNEA DE CONEXIÓN (excepto en el último) -->
                ${isLast ? '' : html`
                  <div class="step-line ${isCompleted || isCurrent ? 'completed' : ''}"></div>
                `}
              `;
            })}
          </div>

          <!-- 📋 INFORMACIÓN DEL PASO -->
          <div class="info-container">
            ${esPreregistro ? html`
              <!-- LAYOUT DOBLE PARA PRE-REGISTRO -->
              <div class="info-grid">
                <div class="info-box ${pasoActual.estatus}">
                  <h3>📍 Sede</h3>
                  <p class="formatted-text">${pasoActual.sede}</p>
                </div>

                <div class="info-box ${pasoActual.estatus}">
                  <h3>📄 Documentación</h3>
                  <p class="formatted-text">${pasoActual.documentacion}</p>
                </div>
              </div>
            ` : pasoActual.mensaje ? html`
              <!-- LAYOUT DOBLE PARA OTRAS ETAPAS CON SEDE Y REQUISITOS -->
              <div class="info-grid">
                <div class="info-box ${pasoActual.estatus}">
                  <h3>📍 Sede</h3>
                  <p class="formatted-text">${pasoActual.sede}</p>
                </div>

                <div class="info-box ${pasoActual.estatus}">
                  <h3>📋 Información</h3>
                  <p class="formatted-text">${pasoActual.mensaje}</p>
                  ${pasoActual.documentacion ? html`
                    <hr style="margin: 1.5rem 0; border: none; border-top: 2px solid rgba(0,0,0,0.1);">
                    <p class="formatted-text">${pasoActual.documentacion}</p>
                  ` : ''}
                </div>
              </div>
            ` : html`
              <!-- LAYOUT SIMPLE PARA ETAPAS BLOQUEADAS -->
              <div class="info-box ${pasoActual.estatus}">
                <p class="formatted-text">${pasoActual.mensaje}</p>
              </div>
            `}
          </div>

          <!-- ✅ BOTÓN ACEPTAR -->
          <div class="acciones">
            <div class="btn" @click=${this.aceptar}>ACEPTAR</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('progreso-folio-view', ProgresoFolioView);