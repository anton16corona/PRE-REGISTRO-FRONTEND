import { LitElement, html } from 'lit';
import './alerta-view.js';
import '../components/ipes-header.js';
import { ENDPOINTS } from '../config/api.config.js';

import { consultaFolioStyles } from '../styles/consulta-folio.styles.js';

export class ConsultaFolioView extends LitElement {

  static styles = [consultaFolioStyles];
  
  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    perfil: { type: String },
    convocatoria: { type: String },
    consecutivo: { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    
    pasoCodigo: { type: Boolean },
    codigoIngresado: { type: String },

    intentosFallidos: { type: Number },
    bloqueadoHasta: { type: Number },
    rondaActual: { type: Number },
    bloqueadoDefinitivamente: { type: Boolean },
    
    campoBloqueado: { type: Boolean },
    segundosRestantes: { type: Number }
  };

  constructor() {
    super();
    this.perfil = 'GC';
    this.convocatoria = '';
    this.consecutivo = '';
    this.mostrarAlerta = false;
    this.alertaConfig = {};

    this.pasoCodigo = false;
    this.codigoIngresado = '';

    this.intentosFallidos = 0;
    this.bloqueadoHasta = 0;
    this.rondaActual = 1;
    this.bloqueadoDefinitivamente = false;
    
    this.campoBloqueado = false;
    this.segundosRestantes = 0;
    
    this.intervaloCuentaRegresiva = null;

    //CARGAR ESTADO DE BLOQUEO DESDE LOCALSTORAGE
    this.cargarEstadoBloqueo();
  }

  /* ============== PERSISTENCIA DE BLOQUEO ============== */
  cargarEstadoBloqueo() {
    try {
      const bloqueoGuardado = localStorage.getItem('consulta_folio_bloqueo');
      
      if (bloqueoGuardado) {
        const datos = JSON.parse(bloqueoGuardado);

        // Bloqueo definitivo — no expira nunca
        if (datos.bloqueadoDefinitivamente) {
          this.bloqueadoDefinitivamente = true;
          this.campoBloqueado = true;
          this.rondaActual = datos.rondaActual || 3;
          return;
        }
        
        // Bloqueo temporal vigente
        if (datos.bloqueadoHasta && Date.now() < datos.bloqueadoHasta) {
          this.bloqueadoHasta = datos.bloqueadoHasta;
          this.intentosFallidos = datos.intentosFallidos || 0;
          this.rondaActual = datos.rondaActual || 1;
          this.campoBloqueado = true;
          this.iniciarCuentaRegresiva();
        } else {
          // Bloqueo temporal expirado
          const rondaSiguiente = (datos.rondaActual || 1) + 1;
          // Si ya completó las 3 rondas y el bloqueo expiró → bloqueo definitivo
          if (rondaSiguiente > 3) {
            this.bloqueadoDefinitivamente = true;
            this.campoBloqueado = true;
            this.rondaActual = 3;
            // Re-guardar como definitivo
            this.guardarEstadoBloqueo();
          } else {
            // Pasar a la siguiente ronda
            this.rondaActual = rondaSiguiente;
            localStorage.removeItem('consulta_folio_bloqueo');
          }
        }
      }
    } catch (e) {
      console.error('Error al cargar estado de bloqueo:', e);
    }
  }

  guardarEstadoBloqueo() {
    try {
      const datos = {
        bloqueadoHasta: this.bloqueadoHasta,
        intentosFallidos: this.intentosFallidos,
        rondaActual: this.rondaActual,
        bloqueadoDefinitivamente: this.bloqueadoDefinitivamente,
        timestamp: Date.now()
      };
      
      localStorage.setItem('consulta_folio_bloqueo', JSON.stringify(datos));
    } catch (e) {
      console.error('Error al guardar estado de bloqueo:', e);
    }
  }

  limpiarEstadoBloqueo() {
    try {
      localStorage.removeItem('consulta_folio_bloqueo');
    } catch (e) {
      console.error('Error al limpiar estado de bloqueo:', e);
    }
  }

  // Guarda el folio en la lista permanente de folios bloqueados definitivamente
  registrarFolioBloqueado(folio) {
    try {
      const raw = localStorage.getItem('consulta_folio_bloqueados');
      const lista = raw ? JSON.parse(raw) : [];
      if (!lista.includes(folio)) {
        lista.push(folio);
        localStorage.setItem('consulta_folio_bloqueados', JSON.stringify(lista));
      }
    } catch (e) {
      console.error('Error al registrar folio bloqueado:', e);
    }
  }

  folioEstaBloqueadoDefinitivamente(folio) {
    try {
      const raw = localStorage.getItem('consulta_folio_bloqueados');
      if (!raw) return false;
      return JSON.parse(raw).includes(folio);
    } catch { return false; }
  }

  get folioCompleto() {
    if (!this.convocatoria || !this.consecutivo) return '';
    return `SSPMQ/IPES/${this.perfil}/${this.convocatoria}-${this.consecutivo}`;
  }

  async validarFolioExistente() {
    try {
      const url  = `${ENDPOINTS.preregistro}/folio/${encodeURIComponent(this.folioCompleto)}`;
      const resp = await fetch(url);
      if (resp.status === 404) return false;   // folio no existe
      if (!resp.ok) return false;
      const data = await resp.json();
      // La API puede devolver un objeto (candidato) o null
      return data !== null && data !== undefined;
    } catch(e) {
      console.error('Error consultando folio:', e);
      return false;
    }
  }

  /* ============== NAVEGACIÓN DE RETORNO ============== */
  goBack() {
    const origen = sessionStorage.getItem('consulta_folio_origen');
    sessionStorage.removeItem('consulta_folio_origen');
    globalThis.location.href = origen || '/';
  }

  /* ============== INICIAR CUENTA REGRESIVA ============== */
  iniciarCuentaRegresiva() {
    if (this.intervaloCuentaRegresiva) {
      clearInterval(this.intervaloCuentaRegresiva);
    }

    this.segundosRestantes = Math.ceil((this.bloqueadoHasta - Date.now()) / 1000);

    this.intervaloCuentaRegresiva = setInterval(() => {
      const segundos = Math.ceil((this.bloqueadoHasta - Date.now()) / 1000);
      
      if (segundos <= 0) {
        clearInterval(this.intervaloCuentaRegresiva);
        this.intervaloCuentaRegresiva = null;

        // Avanzar a la siguiente ronda
        this.rondaActual++;
        this.campoBloqueado = false;
        this.segundosRestantes = 0;
        this.bloqueadoHasta = 0;
        this.intentosFallidos = 0;

        // Limpiar bloqueo temporal del localStorage
        this.limpiarEstadoBloqueo();

        // Reabrir automáticamente la alerta de código con indicador de ronda
        this.pasoCodigo = true;
        this.codigoIngresado = '';
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'info',
          titulo: 'Verificación de seguridad',
          mensaje: 'Puedes volver a intentarlo. Ingresa el código de verificación.',
          extra: `Puedes intentarlo nuevamente.`,
          boton: 'VALIDAR CÓDIGO'
        };
      } else {
        this.segundosRestantes = segundos;
      }
      
      this.requestUpdate();
    }, 1000);
  }

  /* ==============ACTIVAR BLOQUEO ============== */
  activarBloqueo() {
    this.intentosFallidos = 0;
    this.campoBloqueado = true;

    // Ronda 3 → bloqueo definitivo (ya no hay más intentos)
    if (this.rondaActual >= 3) {
      this.bloqueadoDefinitivamente = true;
      this.registrarFolioBloqueado(this.folioCompleto);
      this.guardarEstadoBloqueo();
      return;
    }

    // Ronda 1 → 1 minuto / Ronda 2 → 3 minutos
    const duracionMs = this.rondaActual === 1 ? 60_000 : 180_000;
    this.bloqueadoHasta = Date.now() + duracionMs;

    this.guardarEstadoBloqueo();
    this.iniciarCuentaRegresiva();
  }

  async consultar() {
    //VALIDAR BLOQUEO ANTES DE CONSULTAR
    if (Date.now() < this.bloqueadoHasta) {
      const segundos = Math.ceil((this.bloqueadoHasta - Date.now()) / 1000);

      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Sistema bloqueado',
        mensaje: `Demasiados intentos incorrectos.`,
        extra: `Intenta nuevamente en ${segundos} segundos.`,
        boton: 'ENTENDIDO'
      };
      return;
    }

    //VALIDAR CAMPOS
    if (!this.convocatoria || !this.consecutivo) {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'warning-folio',
        titulo: 'Folio incompleto',
        mensaje: 'Debes completar el número de convocatoria y el consecutivo.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    // VERIFICAR SI ESTE FOLIO YA ESTÁ BLOQUEADO DEFINITIVAMENTE
    if (this.folioEstaBloqueadoDefinitivamente(this.folioCompleto)) {
      this.bloqueadoDefinitivamente = true;
      this.campoBloqueado = true;
      this.pasoCodigo = false;
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'inexistente-folio',
        titulo: 'Folio bloqueado definitivamente',
        mensaje: 'Este folio ha alcanzado el número máximo de intentos de verificación.',
        extra: 'Para resolver esta situación comunícate directamente con la institución.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    //CONSULTAR DB.JSON
    const existe = await this.validarFolioExistente();

    if (!existe) {
      this.intentosFallidos++;

      //INTENTOS → BLOQUEAR COMPLETAMENTE
      if (this.intentosFallidos >= 3) {
        this.activarBloqueo();

        if (this.bloqueadoDefinitivamente) {
          this.pasoCodigo = false;
          this.mostrarAlerta = true;
          this.alertaConfig = {
            tipo: 'inexistente-folio',
            titulo: 'Folio bloqueado definitivamente',
            mensaje: 'Has alcanzado el número máximo de intentos de verificación.',
            extra: 'Para resolver esta situación comunícate directamente con la institución.',
            boton: 'ENTENDIDO'
          };
        } else {
          const minutos = this.rondaActual === 2 ? 3 : 1;
          this.mostrarAlerta = true;
          this.alertaConfig = {
            tipo: 'error',
            titulo: 'Sistema bloqueado',
            mensaje: `Has realizado 3 intentos incorrectos.`,
            extra: `El sistema se ha inhabilitado por ${minutos} minuto${minutos > 1 ? 's' : ''}. Podrás intentarlo de nuevo automáticamente.`,
            boton: 'ENTENDIDO'
          };
        }
        return;
      }

      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'inexistente-folio',
        titulo: 'Folio incorrecto',
        mensaje: 'El folio ingresado no existe en nuestros registros.',
        extra: `Intentos restantes: ${3 - this.intentosFallidos}`,
        boton: 'ENTENDIDO'
      };
      return;
    }

    //Folio válido → pedir código
    this.pasoCodigo = true;
    this.intentosFallidos = 0;
    this.mostrarAlerta = true;
    this.alertaConfig = {
      tipo: 'info',
      titulo: 'Verificación de seguridad',
      mensaje: 'Enviamos un código de verificación a tu correo electrónico.',
      extra: 'Ingresa el código de 7 dígitos para continuar.',
      boton: 'VALIDAR CÓDIGO'
    };
  }

  validarCodigo() {
    //VALIDAR BLOQUEO ANTES DE VALIDAR CÓDIGO
    if (Date.now() < this.bloqueadoHasta) {
      const segundos = Math.ceil((this.bloqueadoHasta - Date.now()) / 1000);

      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Sistema bloqueado',
        mensaje: 'Demasiados intentos incorrectos.',
        extra: `Intenta nuevamente en ${segundos} segundos.`,
        boton: 'ENTENDIDO'
      };
      this.requestUpdate();
      return;
    }

    // Validar que se ingresó un código
    if (!this.codigoIngresado || this.codigoIngresado.length < 7) {
      this.alertaConfig = {
        tipo: 'warning',
        titulo: 'Código incompleto',
        mensaje: 'Debes ingresar un código de 7 dígitos.',
        boton: 'ENTENDIDO'
      };
      this.requestUpdate();
      return;
    }

    const codigosValidos = [
      '1234567',
      '9876543',
      '1111111'
    ];

    if (!codigosValidos.includes(this.codigoIngresado)) {
      this.intentosFallidos++;

      //3 INTENTOS → BLOQUEAR CAMPO Y SISTEMA
      if (this.intentosFallidos >= 3) {
        this.activarBloqueo();

        if (this.bloqueadoDefinitivamente) {
          this.pasoCodigo = false;
          this.alertaConfig = {
            tipo: 'inexistente-folio',
            titulo: 'Folio bloqueado definitivamente',
            mensaje: 'Has alcanzado el número máximo de intentos de verificación.',
            extra: 'Para resolver esta situación comunícate directamente con la institución.',
            boton: 'ENTENDIDO'
          };
        } else {
          const minutos = this.rondaActual === 2 ? 3 : 1;
          this.alertaConfig = {
            tipo: 'error',
            titulo: 'Sistema bloqueado',
            mensaje: `Has ingresado 3 códigos incorrectos.`,
            extra: `El sistema se ha inhabilitado por ${minutos} minuto${minutos > 1 ? 's' : ''}. Podrás intentarlo de nuevo automáticamente.`,
            boton: 'ENTENDIDO'
          };
        }
        this.requestUpdate();
        return;
      }

      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Código incorrecto',
        mensaje: 'El código ingresado no es válido.',
        extra: `Intentos restantes: ${3 - this.intentosFallidos}`,
        boton: 'ENTENDIDO'
      };
      this.requestUpdate();
      return;
    }

    //CÓDIGO CORRECTO
    this.mostrarAlerta = false;
    this.pasoCodigo = false;
    this.intentosFallidos = 0;
    this.codigoIngresado = '';

    // Limpiar bloqueo si existía
    this.limpiarEstadoBloqueo();

    sessionStorage.setItem('folio_consulta', this.folioCompleto);
    sessionStorage.removeItem('origen_convocatoria');
    
    globalThis.location.href = '/progreso-folio';
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  /* ==============VALIDACIÓN ESTRICTA DE SOLO NÚMEROS ============== */
  handleConvocatoriaInput(e) {
    if (this.campoBloqueado) return;
    
    // Filtrar solo números
    const valor = e.target.value.replace(/\D/g, '');
    
    // Limitar a 2 dígitos
    this.convocatoria = valor.substring(0, 2);
    
    // Actualizar el input visualmente
    e.target.value = this.convocatoria;
  }

  handleConsecutivoInput(e) {
    if (this.campoBloqueado) return;
    
    // Filtrar solo números
    const valor = e.target.value.replace(/\D/g, '');
    
    // Limitar a 3 dígitos
    this.consecutivo = valor.substring(0, 3);
    
    // Actualizar el input visualmente
    e.target.value = this.consecutivo;
  }

  handleCodigoInput(e) {
    if (this.campoBloqueado) return;
    
    // Filtrar solo números
    const valor = e.target.value.replace(/\D/g, '');
    
    // Limitar a 7 dígitos
    this.codigoIngresado = valor.substring(0, 7);
    
    // Actualizar el input visualmente
    e.target.value = this.codigoIngresado;
  }

  /* ============== EVITAR PEGAR TEXTO NO NUMÉRICO ============== */
  handlePaste(e, maxLength) {
    e.preventDefault();
    
    if (this.campoBloqueado) return;
    
    // Obtener texto del portapapeles
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    
    // Filtrar solo números y limitar longitud
    const numeros = pastedText.replace(/\D/g, '').substring(0, maxLength);
    
    // Determinar qué campo está siendo pegado
    const input = e.target;
    if (input.maxLength === 2) {
      this.convocatoria = numeros;
      input.value = numeros;
    } else if (input.maxLength === 3) {
      this.consecutivo = numeros;
      input.value = numeros;
    } else if (input.maxLength === 7) {
      this.codigoIngresado = numeros;
      input.value = numeros;
    }
  }

  /* ============== LIMPIAR INTERVALO AL DESCONECTAR ============== */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervaloCuentaRegresiva) {
      clearInterval(this.intervaloCuentaRegresiva);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /* ============== CARRUSEL DE FOTOS ============== */
  images = [
    '/src/assets/estatus/EstatusA.jpg',
    '/src/assets/estatus/EstatusB.jpg',
    '/src/assets/estatus/EstatusC.jpg',
    '/src/assets/estatus/EstatusD.jpg',
    '/src/assets/estatus/EstatusE.jpg',
    '/src/assets/estatus/EstatusF.jpg',
    '/src/assets/estatus/EstatusG.jpg'
  ];

  index = 0;
  direction = 1;
  intervalId;

  connectedCallback() {
    super.connectedCallback();
    // Capturar la ruta desde donde se llegó a esta pantalla, para el botón VOLVER
    const origenActual = sessionStorage.getItem('origen_convocatoria');
    if (origenActual && !origenActual.includes('progreso-folio') && !origenActual.includes('consulta-folio')) {
      sessionStorage.setItem('consulta_folio_origen', origenActual);
    }
    this.startAutoplay();
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      if (this.index === this.images.length - 1) {
        this.direction = -1;
      } else if (this.index === 0) {
        this.direction = 1;
      }

      this.index += this.direction;
      this.updateCarousel();
    }, 1500);
  }

  updateCarousel() {
    const track = this.renderRoot.querySelector('.carousel-track');
    if (!track) return;
    track.style.transform = `translateX(-${this.index * 100}%)`;
  }

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra ?? ''}
          .boton=${this.alertaConfig.boton ?? 'ENTENDIDO'}
          @alerta-cerrar=${() => this.cerrarAlerta()}
          @alerta-aceptar=${() => this.pasoCodigo ? this.validarCodigo() : this.cerrarAlerta()}
        >
          ${this.pasoCodigo ? html`
            <div style="margin-top: 1rem; text-align: center;">
              <input
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                placeholder="Código de verificación"
                maxlength="7"
                .value=${this.codigoIngresado}
                ?disabled=${this.campoBloqueado}
                style="
                  width: 220px;
                  padding: 10px;
                  font-size: 1.1rem;
                  text-align: center;
                  border-radius: 12px;
                  border: 1px solid ${this.campoBloqueado ? '#ccc' : '#5374a8'};
                  background: ${this.campoBloqueado ? '#f5f5f5' : '#fff'};
                  color: ${this.campoBloqueado ? '#999' : '#2e3032'};
                  cursor: ${this.campoBloqueado ? 'not-allowed' : 'text'};
                "
                @input=${e => this.handleCodigoInput(e)}
                @paste=${(e) => this.handlePaste(e, 7)}
                @keypress=${(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
                @keydown=${(e) => {
                  if (e.key === 'Enter' && !this.campoBloqueado) this.validarCodigo();
                }}
              />
              
              ${this.campoBloqueado ? html`
                <div style="
                  margin-top: 1rem;
                  color: #d32f2f;
                  font-weight: 600;
                  font-size: 0.95rem;
                ">
                  ⏱️ Campo bloqueado: ${this.segundosRestantes}s
                </div>
              ` : ''}
            </div>
          ` : ''}
        </alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <!--APLICAR ANIMACIÓN DE ENTRADA -->
      <div class="fondo animate-in">
        <div class="card">
          <h2>CONSULTA EL ESTATUS DE TU SOLICITUD</h2>

          <p>
            Ingresa tu folio de Pre-Registro para conocer el avance de tu proceso.
          </p>

          <div class="folio-linea">
            <span class="folio-fijo">SSPMQ</span><span class="folio-sep">/</span><span class="folio-fijo">IPES</span><span class="folio-sep">/</span>
            <select @change=${e => this.perfil = e.target.value} ?disabled=${this.campoBloqueado}>
              <option value="GC">GC</option>
              <option value="GA">GA</option>
              <option value="GV">GV</option>
              <option value="PA">PA</option>
              <option value="PP">PP</option>
              <option value="UA">UA</option>
              <option value="AV">AV</option>
              <option value="PC">PC</option>
            </select>
            <span class="folio-sep">/</span>
            <input 
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="6" 
              maxlength="2"
              .value=${this.convocatoria}
              ?disabled=${this.campoBloqueado}
              @input=${this.handleConvocatoriaInput}
              @paste=${(e) => this.handlePaste(e, 2)}
              @keypress=${(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <span class="folio-sep">-</span>
            <input 
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="001" 
              maxlength="3"
              .value=${this.consecutivo}
              ?disabled=${this.campoBloqueado}
              @input=${this.handleConsecutivoInput}
              @paste=${(e) => this.handlePaste(e, 3)}
              @keypress=${(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          ${this.bloqueadoDefinitivamente ? html`
            <div style="
              text-align: center;
              color: #b71c1c;
              font-weight: 700;
              font-size: 0.95rem;
              margin-top: 1rem;
              padding: 1rem;
              background: rgba(183, 28, 28, 0.08);
              border: 1.5px solid rgba(183, 28, 28, 0.25);
              border-radius: 12px;
              line-height: 1.5;
            ">
              🔒 Folio bloqueado definitivamente por exceder el número de intentos permitidos.<br>
              <span style="font-weight: 400; font-size: 0.9rem;">Comunícate con la institución para solucionar esta situación.</span>
            </div>
          ` : this.campoBloqueado ? html`
            <div style="
              text-align: center;
              color: #d32f2f;
              font-weight: 600;
              font-size: 1rem;
              margin-top: 1rem;
              padding: 0.8rem;
              background: rgba(211, 47, 47, 0.1);
              border-radius: 12px;
            ">
              Sistema bloqueado por múltiples intentos fallidos
              <br>
              <span style="font-size: 1.2rem;">⏱ ${this.segundosRestantes} segundos restantes</span>
            </div>
          ` : ''}

          <div class="form-actions">
            <div 
              class="btn ${this.campoBloqueado ? 'bloqueado' : ''}" 
              @click=${this.campoBloqueado ? null : this.consultar}
              style="
                opacity: ${this.campoBloqueado ? 0.5 : 1};
                cursor: ${this.campoBloqueado ? 'not-allowed' : 'pointer'};
              "
            >
              CONSULTAR ESTATUS
            </div>

            <button
              type="button"
              class="btn-secundario"
              @click=${this.goBack}
            >
              VOLVER
            </button>
          </div>

          <div class="carousel">
            <div class="carousel-track">
              ${this.images.map(img => html`
                <img src=${img} class="carousel-image" />
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('consulta-folio-view', ConsultaFolioView);