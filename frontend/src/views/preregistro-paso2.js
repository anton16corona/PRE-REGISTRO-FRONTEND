import { LitElement, html, css } from 'lit';
import '../components/ipes-header.js';

// ============ CONFIGURACIÓN DE CONVOCATORIAS CON REQUISITOS DE ESTUDIOS ============
const CONVOCATORIAS = {
  '/convocatoria-guardia-civica': {
    nombre: 'GUARDIA CÍVICA',
    edadMin: 21,
    edadMax: 50,
    nivelEstudiosMin: 'SECUNDARIA',
    imagen: '/src/assets/GC.jpg'
  },
  '/convocatoria-guardia-vial': {
    nombre: 'GUARDIA VIAL',
    edadMin: 21,
    edadMax: 50,
    nivelEstudiosMin: 'SECUNDARIA',
    imagen: '/src/assets/GV.jpg'
  },
  '/convocatoria-guardia-auxiliar': {
    nombre: 'GUARDIA AUXILIAR',
    edadMin: 18,
    edadMax: 50,
    nivelEstudiosMin: 'SECUNDARIA',
    imagen: '/src/assets/GA.jpg'
  },
  '/convocatoria-auxiliar': {
    nombre: 'POLICÍA AUXILIAR',
    edadMin: 18,
    edadMax: 42,
    nivelEstudiosMin: 'SECUNDARIA',
    imagen: '/src/assets/policia/AuxiliarL.jpeg'
  },
  '/convocatoria-proximidad': {
    nombre: 'POLICÍA DE PROXIMIDAD',
    edadMin: 18,
    edadMax: 35,
    nivelEstudiosMin: 'BACHILLERATO',
    imagen: '/src/assets/proximidad/Proximidad.jpg'
  },
  '/convocatoria-proximidad-cibernetica': {
    nombre: 'POLICÍA ESPECIALIZADA - CIBERNÉTICA',
    edadMin: 18,
    edadMax: 35,
    nivelEstudiosMin: 'LICENCIATURA',
    imagen: '/src/assets/proximidad/Cibernetica.jpg'
  },
  '/convocatoria-proximidad-seg-pub': {
    nombre: 'POLICÍA ESPECIALIZADA - ANÁLISIS',
    edadMin: 18,
    edadMax: 35,
    nivelEstudiosMin: 'LICENCIATURA',
    imagen: '/src/assets/proximidad/SegPub.jpeg'
  },
  '/convocatoria-proximidad-victimas': {
    nombre: 'POLICÍA ESPECIALIZADA - VÍCTIMAS',
    edadMin: 18,
    edadMax: 35,
    nivelEstudiosMin: 'LICENCIATURA',
    imagen: '/src/assets/proximidad/Victimas.jpg'
  }
};

// Jerarquía de niveles de estudios (de menor a mayor)
const NIVELES_ESTUDIOS = {
  'SECUNDARIA': 1,
  'BACHILLERATO': 2,
  'LICENCIATURA': 3,
  'MAESTRIA': 4,
  'DOCTORADO': 5
};

export class PreregistroPaso2 extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
      color: #2e3032;
    }

    /* ================= MAIN ================= */
    main {
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      border-radius: 24px;
      max-width: 1200px;
      width: 100%;
      padding: 3rem;

      animation: slideUpFade 0.45s ease-out;
    }

    /* ================= TITULOS PREREGISTRO ================= */
    h1 {
      text-align: center;
      font-size: 2.4rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      text-align: center;
      color: #131c49;
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 2rem 0 1rem;
      margin-top:0.5rem;
    }

    .note {
      display: block;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      font-style: italic;
      color: #444;
    }

    /* ================= GRID (PARA LOS CAMPOS) ================= */
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem 5rem;
    }

    .grid > div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    /* ======== AJUSTE DE TAMAÑO CAMPOS ========= */
    .short {
      max-width: 530px;
    }

    /* ================= INPUT Y SELECTS ================= */
    label {
      font-weight: 500;
    }

    .required {
      color: #455f9a;
      margin-right: 4px;
    }

    input, select {
      background: transparent;
      border: none;
      border-bottom: 2px solid #131c49;
      padding: 8px 4px;
      outline: none;
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      color: #131c49;
      transition: border-color 0.3s ease;
      margin-bottom: 1.5rem;
    }

    input:focus, select:focus {
      border-bottom: 2px solid #7aa7c8;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg fill='%23131c49' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 5px center;
      background-size: 18px;
    }

    /* ================= RADIO GROUPS ================= */
    .radio-section {
      margin: 2rem 0;
    }

    .radio-title {
      display: block;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .radio-line {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      align-items: center; /* 🔴 clave */
    }

    .radio-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .radio-label {
      font-weight: 600;
      margin-right: 0.8rem;
      white-space: nowrap;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 12px;
      transition: background 0.25s ease;
    }

    .radio-group input:checked + span {
      font-weight: 600;
    }

    .radio-group label:has(input:checked) {
      background: rgba(19, 28, 73, 0.1);
    }

    .radio-group input[type="radio"] {
      margin: 0;
      vertical-align: middle;
      transform: translateY(1px); /* micro ajuste fino */
    }

    /* ================= DOCS (INE) ================= */
    .docs {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    input[type="file"] {
      border: 2px dashed #7aa7c8;
      padding: 1rem;
      border-radius: 12px;
      background: #f8f9fa;
      cursor: pointer;
      flex: 1;
    }

    input[type="file"]:hover {
      background: #e9ecef;
    }

    /* ================= BOTONES ================= */
    .form-actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }

    button {
      font-family: 'Montserrat', sans-serif;
      color: #fff;
    }

    .btn-secundario {
      background: #d7a23f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primario {
      background: #7aa7c8;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancelar {
      background: #d73f3f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ================= ANIMACIÓN ================= */
    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.8rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        width: 100%;
        font-size: 1.1rem;
      }

      .radio-line {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `;

  static properties = {
    form: { state: true },
    formValido: { state: true },
    ine: { state: true },
    ineFrenteCargado: { state: true },
    ineReversoCargado: { state: true },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    nivelEstudiosValido: { state: true },
    licencia: { state: true },
    cartilla: { state: true },
    certificadoSecundaria: { state: true }
  };

  constructor() {
    super();
    this.form = {};
    this.formValido = false;
    this.ine = 'no';
    this.ineFrenteCargado = false;
    this.ineReversoCargado = false;
    this.mostrarAlerta = false;
    this.alertaConfig = {};
    this.nivelEstudiosValido = false;
    this.licencia = '';
    this.cartilla = '';
    this.certificadoSecundaria = '';

    const guardado = sessionStorage.getItem('paso2_data');
    if (guardado) {
      this.form = JSON.parse(guardado);
    }
  }

  /* ================== UTILIDADES ================== */

  updateField(e) {
    this.form[e.target.name] = e.target.value;
    
    // Si el campo actualizado es nivelEstudios, validar
    if (e.target.name === 'nivelEstudios') {
      this.validarNivelEstudios(e.target.value);
    }
    
    this.validateForm();
    sessionStorage.setItem('paso2_data', JSON.stringify(this.form));
  }

  normalizeText(e) {
    const map = { á:'A',é:'E',í:'I',ó:'O',ú:'U',ñ:'N',
                  Á:'A',É:'E',Í:'I',Ó:'O',Ú:'U',Ñ:'N' };

    e.target.value = e.target.value
      .replaceAll(/[áéíóúñÁÉÍÓÚÑ]/g, m => map[m])
      .toUpperCase()
      .replaceAll(/[^A-Z\s]/g, '');

    this.updateField(e);
  }

  onlyNumbers(e, max = 5) {
    e.target.value = e.target.value.replaceAll(/\D/g, '').slice(0, max);
    this.updateField(e);
  }

  interiorFormat(e) {
    e.target.value = e.target.value
      .toUpperCase()
      .replaceAll(/[^A-Z0-9-]/g, '')
      .slice(0, 5);

    this.updateField(e);
  }

  handleMunicipioChange(e) {
    const municipio = e.target.value;

    this.form = {
      ...this.form,
      municipio: municipio,
      colonia: '', // 🔴 importante limpiar colonia
      cp: municipio === 'QUERÉTARO' ? '76000' : ''
    };

    this.requestUpdate(); // 🔴 forzar render
    this.validateForm();
  }

  exteriorInteriorFormat(e) {
    e.target.value = e.target.value
      .toUpperCase()
      .replaceAll(/[^A-Z0-9\-/]/g, '') // solo letras, números, - y /
      .slice(0, 5);

    this.updateField(e);
  }

  /* ================== VALIDACIÓN DE NIVEL DE ESTUDIOS ================== */

  validarNivelEstudios(nivelSeleccionado) {
    if (!nivelSeleccionado) {
      this.nivelEstudiosValido = false;
      return;
    }

    const origen = sessionStorage.getItem('origen_convocatoria');
    const convocatoria = CONVOCATORIAS[origen];

    if (!convocatoria) {
      console.warn('No se encontró la convocatoria de origen');
      this.nivelEstudiosValido = true;
      return;
    }

    const nivelRequerido = convocatoria.nivelEstudiosMin;
    const nivelUsuario = nivelSeleccionado;

    // Comparar niveles usando la jerarquía
    const jerarquiaRequerida = NIVELES_ESTUDIOS[nivelRequerido];
    const jerarquiaUsuario = NIVELES_ESTUDIOS[nivelUsuario];

    // El usuario debe tener al menos el nivel requerido
    if (jerarquiaUsuario < jerarquiaRequerida) {
      // 🔴 NO CUMPLE con el nivel de estudios
      const alternativas = this.getConvocatoriasCompatiblesEstudios(nivelUsuario)
        .filter(c => c.path !== origen);

      if (alternativas.length > 0) {
        // Hay convocatorias alternativas
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'warning-redireccion',
          titulo: 'ESTIMADO USUARIO',
          mensaje: 'De acuerdo a la información proporcionada, usted NO cumple con el nivel de estudios mínimo requerido para la convocatoria seleccionada.',
          extra: 'De igual manera, le invitamos a conocer las siguientes convocatorias, ajustadas a su perfil académico proporcionado.',
          alternativas: alternativas
        };
      } else {
        // No hay convocatorias compatibles
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'error',
          titulo: 'Nivel de estudios insuficiente',
          mensaje: `Se requiere al menos ${nivelRequerido} para esta convocatoria.`,
          extra: 'Actualmente no existe ninguna convocatoria compatible con su nivel de estudios.',
          boton: 'ENTENDIDO'
        };
      }
      this.nivelEstudiosValido = false;
    } else {
      // ✅ SÍ CUMPLE con el nivel de estudios
      this.nivelEstudiosValido = true;
      this.mostrarAlerta = false;
    }
  }

  getConvocatoriasCompatiblesEstudios(nivelUsuario) {
    const jerarquiaUsuario = NIVELES_ESTUDIOS[nivelUsuario];
    
    return Object.entries(CONVOCATORIAS)
      .map(([path, data]) => ({
        path,
        nombre: data.nombre,
        nivelEstudiosMin: data.nivelEstudiosMin,
        imagen: data.imagen || '/assets/default-convocatoria.jpg'
      }))
      .filter(c => {
        const jerarquiaRequerida = NIVELES_ESTUDIOS[c.nivelEstudiosMin];
        return jerarquiaUsuario >= jerarquiaRequerida;
      });
  }

  get requiereCertificadoSecundaria() 
  {
    const origen = sessionStorage.getItem('origen_convocatoria');
    const convocatoria = CONVOCATORIAS[origen];

    if (!convocatoria) return false;

    return (
      convocatoria.nivelEstudiosMin === 'SECUNDARIA' &&
      this.form.nivelEstudios === 'SECUNDARIA'
    );
  }

  /* ================== INE ================== */

  handleIneFrente(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.ineFrenteCargado = true;
      this.validateForm();
    }
  }

  handleIneReverso(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.ineReversoCargado = true;
      this.validateForm();
    }
  }

  get ineValido() {
    return this.ine !== 'si' || (this.ineFrenteCargado && this.ineReversoCargado);
  }

  /* ================== VALIDACIÓN GENERAL ================== */
  validateForm() {
      const f = this.form;

      const certificadoValido =
        !this.requiereCertificadoSecundaria ||
        (this.requiereCertificadoSecundaria && this.certificadoSecundaria !== '');

      const documentosValidos =
        (this.licencia !== '') &&     // Obligatorio seleccionar.
        (this.cartilla !== '') &&     // Obligatorio seleccionar.
        (this.ine !== '') &&          // Obligatorio seleccionar.
        this.ineValido &&             // Si dijo sí, debe subir archivos.
        certificadoValido;            

      this.formValido =
        f.municipio &&
        f.cp?.length === 5 &&
        f.colonia &&
        f.calle &&
        f.exterior &&
        f.nivelEstudios &&
        f.contactoAlterno &&
        f.telAlterno?.length === 10 &&
        documentosValidos &&
        this.nivelEstudiosValido;
    }

  /* ================== NAVEGACIÓN ================== */

  goBack() {
    globalThis.location.href = '/preregistro';
  }

  irACorreo() {

    // 1️⃣ Leer el objeto maestro creado en Paso 1
    const data = JSON.parse(sessionStorage.getItem('preregistro_data'));

    // 2️⃣ Inyectar la información del Paso 2
    data.paso2 = {
      ...this.form,
      licencia: this.licencia,
      cartilla: this.cartilla,
      ine: this.ine
    };

    // 3️⃣ Guardar nuevamente el objeto completo
    sessionStorage.setItem(
      'preregistro_data',
      JSON.stringify(data)
    );

    // 4️⃣ Navegar al Paso 3
    globalThis.location.href = '/preregistro-envio';
  }

  /* ================== BOTÓN DE CANCELACIÓN ================== */
  cancelar() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    sessionStorage.clear();
    globalThis.location.href = origen || '/convocatorias-view';
  }

  /* ================== CONTROL DE ALERTA ================== */
  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  handleAlertaAceptar() {
    this.mostrarAlerta = false;
  }

  connectedCallback() {
    super.connectedCallback();

    const data = sessionStorage.getItem('preregistro_data');

    if (!data) {
      globalThis.location.href = '/preregistro';
    }
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
          .extra=${this.alertaConfig.extra}
          .boton=${this.alertaConfig.boton}
          .alternativas=${this.alertaConfig.alternativas || []}
          @cerrar=${this.cerrarAlerta}
          @aceptar=${this.handleAlertaAceptar}
        ></alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <main>
        <div class="card">
          <h1>PRE-REGISTRO</h1>
          <p class="subtitle">Completa los campos solicitados con la información requerida</p>

          <h2>CONTACTO ALTERNO</h2>
          <div class="grid">
            <div>
              <label><span class="required">*</span> Nombre Completo: </label>
              <input name="contactoAlterno" placeholder="NOMBRE DEL CONTACTO" @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span> No. Teléfono: </label>
              <input name="telAlterno" placeholder="(55) 1234-5678" maxlength="10" @input=${e => this.onlyNumbers(e,10)} />
            </div>
          </div>

          <h2>DOMICILIO</h2>
          <div class="grid">
            <div>
              <label><span class="required">*</span> Municipio: </label>
              <select name="municipio" @change=${this.handleMunicipioChange}>
                <option value="">Selecciona un municipio</option>
                <option>AMEALCO DE BONFIL</option>
                <option>ARROYO SECO</option>
                <option>CADEREYTA DE MONTES</option>
                <option>COLÓN</option>
                <option>CORREGIDORA</option>
                <option>EL MARQUÉS</option>
                <option>EZEQUIEL MONTES</option>
                <option>HUIMILPAN</option>
                <option>JALPAN DE SERRA</option>
                <option>LANDA DE MATAMOROS</option>
                <option>PEDRO ESCOBEDO</option>
                <option>PEÑAMILLER</option>
                <option>PINAL DE AMOLES</option>
                <option>QUERÉTARO</option>
                <option>SAN JOAQUÍN</option>
                <option>SAN JUAN DEL RÍO</option>
                <option>TEQUISQUIAPAN</option>
                <option>TOLIMÁN</option>
              </select>
            </div>

            <div class="short">
              <label><span class="required">*</span> C.P.: </label>
                <input 
                  type="text"
                  name="cp"
                  .value=${this.form.cp}
                  @input=${this.handleChange}
                  maxlength="5"
                  ?disabled=${!this.form.municipio || this.form.municipio === 'QUERÉTARO'}
                  placeholder="Ingrese código postal"
                />
            </div>

            <div>
              <label><span class="required">*</span> Colonia: </label>

              ${this.form.municipio === 'QUERÉTARO' ? html`
                <select name="colonia" @change=${this.updateField}>
                  <option value="">Selecciona una colonia</option>
                  <option>JURICA</option>
                  <option>EL REFUGIO</option>
                  <option>CENTRO</option>
                  <option>MILENIO</option>
                  <option>LA PRADERA</option>
                </select>
              ` : html`
                <input 
                  name="colonia" 
                  placeholder="CENTRO"
                  @input=${this.normalizeText} />
              `}
            </div>

            <div>
              <label><span class="required">*</span> Calle: </label>
              <input name="calle" placeholder="AV PRINCIPAL" @input=${this.normalizeText} />
            </div>

            <div class="short">
              <label><span class="required">*</span> No. Exterior: </label>
              <input name="exterior" placeholder="123-A" maxlength="5" @input=${this.exteriorInteriorFormat} />
            </div>

            <div class="short">
              <label>No. Interior: </label>
              <input name="interior" placeholder="A-1" maxlength="5" @input=${this.exteriorInteriorFormat} />
            </div>
          </div>

          <h2>DOCUMENTACIÓN</h2>
          <div>
            <label><span class="required">*</span> Último nivel de estudios concluidos</label>
            <select name="nivelEstudios" @change=${this.updateField}>
              <option value="">Selecciona una opción</option>
              <option>SECUNDARIA</option>
              <option>BACHILLERATO</option>
              <option>LICENCIATURA</option>
              <option>MAESTRIA</option>
              <option>DOCTORADO</option>
            </select>
          </div>

          ${this.requiereCertificadoSecundaria ? html`
            <div class="radio-group">
              <span class="radio-label">
                Certificado de Secundaria:
              </span>

              <label>
                <input
                  type="radio"
                  name="certificadoSecundaria"
                  value="si"
                  @change=${e => {
                    this.certificadoSecundaria = e.target.value;
                    this.validateForm();
                  }}>
                <span>Sí</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="certificadoSecundaria"
                  value="no"
                  @change=${e => {
                    this.certificadoSecundaria = e.target.value;
                    this.validateForm();
                  }}>
                <span>No</span>
              </label>
            </div>
          ` : ''}

          <div class="radio-line">
            <!-- LICENCIA -->
            <div class="radio-group">
              <span class="radio-label">Licencia de Conducir:</span>
              <label>
                <input type="radio"
                  name="licencia"
                  value="si"
                  @change=${e => {
                    this.licencia = e.target.value;
                    this.validateForm();
                  }}>
                <span>Sí</span>
              </label>
              <label>
                <input type="radio"
                  name="licencia"
                  value="no"
                  @change=${e => {
                    this.licencia = e.target.value;
                    this.validateForm();
                  }}>
                <span>No</span>
              </label>
            </div>

            <!-- CARTILLA -->
            <div class="radio-group">
              <span class="radio-label">Cartilla Servicio Militar:</span>
              <label>
                <input type="radio"
                  name="cartilla"
                  value="si"
                  @change=${e => {
                    this.cartilla = e.target.value;
                    this.validateForm();
                  }}>
                <span>Sí</span>
              </label>
              <label>
                <input type="radio"
                  name="cartilla"
                  value="no"
                  @change=${e => {
                    this.cartilla = e.target.value;
                    this.validateForm();
                  }}>
                <span>No</span>
              </label>
            </div>

            <!-- INE -->
            <div class="radio-group">
              <span class="radio-label">INE:</span>
              <label>
                <input type="radio"
                  name="ine"
                  value="si"
                  @change=${() => {
                    this.ine = 'si';
                    this.ineFrenteCargado = false;
                    this.ineReversoCargado = false;
                    this.validateForm();
                  }}>
                <span>Sí</span>
              </label>
              <label>
                <input type="radio"
                  name="ine"
                  value="no"
                  @change=${() => {
                    this.ine = 'no';
                    this.ineFrenteCargado = false;
                    this.ineReversoCargado = false;
                    this.validateForm();
                  }}>
                <span>No</span>
              </label>
            </div>
          </div>

          <label class="note">
            <span class="required">Nota: </span>
            En caso de indicar "SI" en INE, por favor, anexe una imagen del Anverso (Frente) y Reverso de la misma.
          </label>

          <!-- INE -->
          ${this.ine === 'si' ? html`
            <div class="docs">
              <input type="file" accept="image/*" @change=${this.handleIneFrente} placeholder="Frente INE">
              <input type="file" accept="image/*" @change=${this.handleIneReverso} placeholder="Reverso INE">
            </div>
          ` : ''}

          <div class="form-actions">
            <button class="btn-secundario" @click=${this.goBack}>VOLVER</button>
            <button class="btn-cancelar" @click=${this.cancelar}>CANCELAR</button>
            ${this.formValido ? html`
              <button class="btn-primario" @click=${this.irACorreo}>
                CONTINUAR
              </button>
            ` : ''}
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('preregistro-paso2', PreregistroPaso2);