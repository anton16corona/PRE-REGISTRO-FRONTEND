import { LitElement, html, css } from 'lit';
import '../components/ipes-header.js';

const CONVOCATORIAS = {
      '/convocatoria-guardia-civica': {
        nombre: 'GUARDIA CÍVICA',
        edadMin: 21,
        edadMax: 50,
        imagen: '/src/assets/GC.jpg'
      },
      '/convocatoria-guardia-vial': {
        nombre: 'GUARDIA VIAL',
        edadMin: 21,
        edadMax: 50,
        imagen: '/src/assets/GV.jpg'
      },
      '/convocatoria-guardia-auxiliar': {
        nombre: 'GUARDIA AUXILIAR',
        edadMin: 18,
        edadMax: 50,
        imagen: '/src/assets/GA.jpg'
      },
      '/convocatoria-auxiliar': {
        nombre: 'POLICÍA AUXILIAR',
        edadMin: 18,
        edadMax: 42,
        imagen: '/src/assets/policia/AuxiliarJ.jpeg'
      },
      '/convocatoria-proximidad': {
        nombre: 'POLICÍA DE PROXIMIDAD',
        edadMin: 18,
        edadMax: 35,
        imagen: '/src/assets/proximidad/Proximidad.jpg'
      },
      '/convocatoria-proximidad-cibernetica': {
        nombre: 'PROXIMIDAD CIBERNÉTICA',
        edadMin: 18,
        edadMax: 35,
        imagen: '/src/assets/proximidad/Cibernetica.jpg'
      },
      '/convocatoria-proximidad-seg-pub': {
        nombre: 'ANÁLISIS EN SEGURIDAD PÚBLICA',
        edadMin: 18,
        edadMax: 35,
        imagen: '/src/assets/proximidad/SegPub.jpeg'
      },
      '/convocatoria-proximidad-victimas': {
        nombre: 'ATENCIÓN A VÍCTIMAS',
        edadMin: 18,
        edadMax: 35,
        imagen: '/src/assets/proximidad/Victimas.jpg'
      }
    };

export class PreregistroView extends LitElement {
  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

    :host {
      display: block;
      min-height: 100vh;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
      color: #2e3032;

      /* ============== ANIMACIÓN ============== */
      animation: fadeInUp .4s ease;
    }

    /* ================================ CONTENT ================================== */  
    main {
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #ffffff;
      border-radius: 24px;
      width: 100%;
      max-width: 1200px;
      padding: 3rem;
      padding: clamp(1.5rem, 4vw, 3rem);
      box-sizing: border-box;
    }

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
      color: #131c49;
      margin: 2.5rem 0 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

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
        border-bottom: 1px solid #000;
        padding: 6px 2px;
        outline: none;
        width: 100%;
        box-sizing: border-box;

        // ----- FUENTE DE LOS INPUT ------
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: #000;
    }

    input::placeholder {
      color: #717173;
    }

    input:disabled {
      background: transparent;
      color: #4c4c4c;
    }

    .edad {
        border: none;
        font-size: 18px;
        font-weight: 500;
        padding-top: 10px;
    }

    .radio-group {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-top: 0.5rem;
    }

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;

      /* ----------- FUENTE ------------- */
      font-family: 'Montserrat', sans-serif;
      font-weight:600;
    }

    /* ----------- FORMATO DE LOS BOTONES ------------- */
    button {
      font-family: 'Montserrat', sans-serif;
    }

    .btn-secundario {
      background: #d7a23f;
      color: #fff;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primario {
      background: #7aa7c8;
      color: #fff;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancelar {
      background: #d73f3f;
      color: #fff;
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

    /* ----------- FORMATO PARA EL LOGO DE CALENDARIO ------------- */
    input[type="date"] {
      position: relative;
      cursor: pointer;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      opacity: 0.8;
      cursor: pointer;
    }

    input[type="date"]:focus {
      border-bottom: 2px solid #131c49;
      background: rgba(19, 28, 73, 0.05);
      transition: all 0.2s ease;
    }

    /* ----------- FORMATO PARA LA SELECCION DE ESTADO CIVIL ------------- */
    .radio-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 12px;
      transition: background 0.25s ease;
    }

    .radio-group input:checked + span {
      font-weight: 600;
    }

    .radio-group label:has(input:checked) {
      background: rgba(19, 28, 73, 0.1);
    }

    /* ----------- MENSAJE DE ERROR PARA LOS CORREOS ------------- */ 
    .msg {
      display: block;
      margin-top: 6px;
      font-size: 14px;      /* más grande */
      font-weight: 600;     /* más grueso */
    }

    .msg-gray {
      color: #757575;
    }

    .msg-orange {
      color: #f57c00;
    }

    .msg-red {
      color: #d32f2f;
    }

    /* ================= AUTOFILL FIX ================= */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      -webkit-text-fill-color: #000; /* color del texto */
      -webkit-box-shadow: 0 0 0px 1000px #8fa6c1 inset; /* COLOR DE FONDO */
      transition: background-color 5000s ease-in-out 0s;
    }

    /* ======================================= RESPONSIVE ======================================= */
    /* ============ AJUSTES DE TAMAÑO PARA DIVERSOS DISPOSITIVOS MÓVILES COMPATIBILIDAD ========== */

    /* ================= PARA 1024 PX ================== */
    @media (max-width: 1024px) {
      .cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ================= PARA 900 PX ================== */
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

  /* ================= PARA 640 PX ================== */
    @media (max-width: 640px) {
      header {
        text-align: center;
      }

      .cards {
        grid-template-columns: 1fr;
      }

      .ipes {
        font-size: 1.4rem;
      }

      .title {
        font-size: 2rem;
      }

      .card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.8rem;
      }

      label {
        font-size: 0.9rem;
      }

      input {
        font-size: 15px;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
        max-width: 100%;
        font-size: 1.1rem;
      }
    }

    /* ================= PARA 480 PX ================== */
    @media (max-width: 480px) {
      header {
        grid-template-columns: 1fr;
        padding: 1rem;
      }

      header img {
        margin: 0 auto;
      }

      .ipes {
        font-size: 1.1rem;
        padding: 0 0.5rem;
      }

      .radio-group {
        flex-wrap: wrap;
        gap: 0.8rem;
      }
    }

    /* ================= PARA 360 PX ================== */
    @media (max-width: 360px) {
      .card {
        padding: 1.2rem;
      }
    }

    /* ============== ANIMACIÓN ============== */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

/* ========================================= JAVASCRIPT ======================================== */
    static properties = {
        edad: { state: true },
        valido: { state: true },
        form: { state: true },
        emailError: { state: true },
        emailMatchError: { state: true },
        phoneMatchError: { state: true },
        email2Error: { state: true },
        emailTouched: { state: true },
        email2Touched: { state: true },
        formValido: { state: true },
        civil: { type:String },
        sexo: { type: String },
        curp: { type: String },
        rfc: { type: String },
        mostrarAlerta: { type: Boolean },
        edadValidaConvocatoria: { state: true },
        alertaConfig: { type: Object },
        telTouched: { state: true },
        tel2Touched: { state: true },
        telError: { state: true },
        tel2Error: { state: true }
    };

    constructor() {
      super();
      this.edad = '';
      this.valido = false;
      this.form = {};
      this.emailError = false;
      this.email2Error = false;
      this.emailMatchError = false;
      this.emailTouched = false;
      this.email2Touched = false;
      this.formValido = false;
      this.sexo = '';
      this.curp = '';
      this.civil = '';
      this.rfc = '';
      this.mostrarAlerta = false;
      this.alertaConfig = {};
      this.edadValidaConvocatoria = false;
      this.telTouched = false;
      this.tel2Touched = false;
      this.telError = null;
      this.tel2Error = null;
    }

    validateForm() {
    const f = this.form;

    const curpCompleta = f.curp?.length === 18;
    const rfcCompleto = this.validarRFC(f.rfc || '');

    this.formValido =
      curpCompleta &&
      rfcCompleto &&
      f.nombre &&
      f.apellido1 &&
      f.email &&
      f.email2 &&
      f.email === f.email2 &&
      f.sexo &&
      f.civil &&
      f.tel &&
      f.tel2 &&
      f.tel === f.tel2 &&
      this.edadValidaConvocatoria && // 🔴 CLAVE
      !this.emailError &&
      !this.email2Error &&
      !this.emailMatchError;
    }

    /* --------------- FORMATO A LOS CAMPOS DE SOLAMENTE MAYÚSCULAS Y SIN ACENTOS. ------------ */
    normalizeText(e) {
    const map = {
      á:'A', é:'E', í:'I', ó:'O', ú:'U', ñ:'N',
      Á:'A', É:'E', Í:'I', Ó:'O', Ú:'U', Ñ:'N'
    };

    e.target.value = e.target.value
        .replaceAll(/[áéíóúñÁÉÍÓÚÑ]/g, m => map[m])
        .toUpperCase()
        .replaceAll(/[^A-Z\s]/g, '');

      this.updateField(e);
    }

    /* --------------- CALCULO DE LA EDAD CON LA FECHA DE NACIMIENTO. ------------ */
    updateEdad(e) {
      // ⛔ Esperar a que la fecha esté completa
      if (!e.target.value || e.target.value.length < 10) {
        return;
      }

      const birth = new Date(e.target.value);
      const today = new Date();

      let edad = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        edad--;
      }

      this.edad = edad;
      this.edadValidaConvocatoria = false;

      const convocatoria = this.getConvocatoriaConfig();
      const origen = sessionStorage.getItem('origen_convocatoria');

      /* ================= MENOR DE EDAD ================= */
      if (edad < 18) {
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'warning-menor',
          titulo: 'Registro no permitido',
          mensaje: 'Debes ser mayor de edad para continuar.',
          boton: 'ENTENDIDO',
          onAceptar: 'limpiar-registro'
        };
        return;
      }

      /* ============ FUERA DE RANGO DE LA CONVOCATORIA ACTUAL ============ */
      if (
        convocatoria &&
        (edad < convocatoria.edadMin || edad > convocatoria.edadMax)
      ) {
        // 🔎 Buscar alternativas válidas
        const alternativas = this.getConvocatoriasCompatibles(edad)
          .filter(c => c.path !== origen);

        // 🟡 CASO: sí hay otras convocatorias posibles
        if (alternativas.length > 0) {
          this.mostrarAlerta = true;
          this.alertaConfig = {
            tipo: 'warning-redireccion',
            titulo: 'ESTIMADO USUARIO',
            mensaje:
              'De acuerdo a la información proporcionada, usted NO cumple con los requisitos necesarios para la convocatoria seleccionada.',
            extra:
              'De igual manera, le invitamos a conocer las siguientes convocatorias, ajustadas a su perfil proporcionado.',
            alternativas: alternativas // 🔑 Pasar las alternativas aquí
          };
          return;
        }

        // 🔴 CASO: no hay ninguna convocatoria compatible
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'error',
          titulo: 'Edad fuera de rango',
          mensaje:
            'Actualmente no existe ninguna convocatoria compatible con tu edad.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      /* ================= EDAD VÁLIDA ================= */
      this.edadValidaConvocatoria = true;
      this.mostrarAlerta = false;
      this.validateForm();
    }

    updateField(e) {
        this.form[e.target.name] = e.target.value;
        this.validate();
        this.validateForm();
    }

    validate() {
    const f = this.form;
    this.valido =
      f.curp &&
      f.nombre &&
      f.apellido1 &&
      f.rfc &&
      f.email &&
      f.email2 &&
      f.email === f.email2 &&
      f.tel &&
      f.tel2 &&
      f.tel === f.tel2 &&
      this.edad !== '';
    }

    onlyLetters(e) {
        e.target.value = e.target.value.replaceAll(/[^a-zA-ZÁÉÍÓÚÑáéíóúñ\s]/g, '');
        this.updateField(e);
    }

    onlyPhone(e) {
      e.target.value = e.target.value.replaceAll(/\D/g, '').slice(0,10);
      this.updateField(e);
    }

    onlyUpper(e) {
        e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
        this.updateField(e);
        this.validateForm();
    }

    validateEmail(e) {
      const value = e.target.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

      this.emailError = value && !regex.test(value);
      this.updateField(e);
      this.checkEmailMatch();
      this.validateForm();
    }

    validateEmailBlur(e) {
      const value = e.target.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

      this.emailTouched = true;

      if (!value) {
        this.emailError = 'required';
      } else if (regex.test(value)) {
        this.emailError = null;
      } else {
        this.emailError = 'format';
      }

      this.updateField(e);
      this.checkEmailMatch();
      this.validateForm();
    }

    validateEmail2Blur(e) {
      const value = e.target.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      this.email2Touched = true;

      if (!value) {
        this.email2Error = 'required';
      } else if (regex.test(value)) {
        this.email2Error = null;
      } else {
        this.email2Error = 'format';
      }

      this.updateField(e);
      this.checkEmailMatch();
      this.validateForm();
    }

    checkEmailMatch() {
      if (
        this.form.email &&
        this.form.email2 &&
        this.form.email === this.form.email2
      ) {
        this.emailMatchError = false;
      } else if (
        this.form.email &&
        this.form.email2 &&
        this.form.email !== this.form.email2
      ) {
        this.emailMatchError = true;
      } else {
        this.emailMatchError = false;
      }
    }

    validateTelBlur(e) {
      const value = e.target.value.trim();
      this.telTouched = true;

      if (!value) {
        this.telError = 'required';
      } else if (value.length === 10) {
        this.telError = null;
      } else {
        this.telError = 'format';
      }

      this.updateField(e);
      this.checkPhoneMatch();
      this.validateForm();
    }

    validateTel2Blur(e) {
      const value = e.target.value.trim();
      this.tel2Touched = true;

      if (!value) {
        this.tel2Error = 'required';
      } else if (value.length === 10) {
        this.tel2Error = null;
      } else {
        this.tel2Error = 'format';
      }

      this.updateField(e);
      this.checkPhoneMatch();
      this.validateForm();
    }

    checkPhoneMatch() {
      if (
        this.form.tel &&
        this.form.tel2 &&
        this.form.tel === this.form.tel2
      ) {
        this.phoneMatchError = false;
      } else if (
        this.form.tel &&
        this.form.tel2 &&
        this.form.tel !== this.form.tel2
      ) {
        this.phoneMatchError = true;
      } else {
        this.phoneMatchError = false;
      }
    }

    submitForm() {
      sessionStorage.setItem(
        'preregistro_parte1',
        JSON.stringify(this.form)
      );

      globalThis.location.href = '/preregistro-continuacion';
    }

    connectedCallback() {
      super.connectedCallback();

      const origen = sessionStorage.getItem('origen_convocatoria');
      console.log('ORIGEN AL ENTRAR A PREREGISTRO:', origen);
    }

    goBack() {
      const origen = sessionStorage.getItem('origen_convocatoria');
      console.log('Origen guardado:', origen);

      if (origen) {
        globalThis.location.href = origen;
      } else {
        globalThis.location.href = '/convocatorias-view';
      }
    }

    cancelar() {
      const origen = sessionStorage.getItem('origen_convocatoria');
      sessionStorage.clear();
      globalThis.location.href = origen || '/convocatorias-view';
    }

    /* -------- PARA CURP Y RFC VALIDACIÓN DE FORMATO OBLIGATORIO NACIONAL. -------- */
    validarCURP(curp) {
      const regexCURP =
        /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
      return regexCURP.test(curp);
    }

    validarRFC(rfc) {
      const regexRFC = 
        /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
      return regexRFC.test(rfc);
    }

    /* -------- VALIDACIÓN PARA PODER CONTINUAR. -------- */
    continuar() {
      if (!this.formValido) {
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'warning-yellow',
          titulo: 'Formulario incompleto',
          mensaje: 'Debes completar todos los campos obligatorios para continuar.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      if (!this.validarCURP(this.form.curp)) {
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'warning-yellow',
          titulo: 'CURP inválido',
          mensaje: 'El CURP ingresado no tiene un formato válido.',
          extra: 'Por favor, verifícalo e ingrésalo nuevamente.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      if (!this.validarRFC(this.form.rfc)) {
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'warning',
          titulo: 'RFC inválido',
          mensaje: 'El RFC ingresado no tiene un formato válido.',
          extra: 'Por favor, verifícalo e ingrésalo nuevamente.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      this.submitForm();
    }

    /* -------- CONTROL DE ALERTA. -------- */
    cerrarAlerta() {
      this.mostrarAlerta = false;
    } 

    getConvocatoriaConfig() {
      const origen = sessionStorage.getItem('origen_convocatoria');
      return CONVOCATORIAS[origen] || null;
    }

    getConvocatoriasCompatibles(edad) {
      return Object.entries(CONVOCATORIAS)
        .map(([path, data]) => ({
          path,
          nombre: data.nombre,
          edadMin: data.edadMin,
          edadMax: data.edadMax,
          imagen: data.imagen || '/assets/default-convocatoria.jpg' // Fallback en caso de que no tenga imagen
        }))
        .filter(c => edad >= c.edadMin && edad <= c.edadMax);
    }

    cambiarConvocatoria(e) {
      const path = e.detail;
      sessionStorage.setItem('origen_convocatoria', path);
      globalThis.location.href = path;
    }

    handleAlertaAceptar() {
      if (this.alertaConfig.onAceptar === 'limpiar-registro') {
        this.resetFormulario();
      }
      this.mostrarAlerta = false;
    }

    resetFormulario() {
      this.form = {
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        email2: '',
        tel: '',
        tel2: '',
        fechaNacimiento: '',
        curp: '',
        rfc: ''
      };
      this.edad = '';
      this.edadValidaConvocatoria = false;
      this.requestUpdate();
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
          <p class="subtitle">
            Completa los campos solicitados con la información requerida
          </p>

          <h2>DATOS GENERALES</h2>

          <div class="grid">
            <div>
              <label><span class="required">*</span>CURP: </label>
              <input name="curp" placeholder="ABCD000000EFGHI00" maxlength="18"
                .value=${this.curp}
                @input=${e => {
                  this.curp = e.target.value.toUpperCase();
                  this.form.curp = this.curp;
                  this.validateForm();
                }}
              />
            </div>

            <div>
              <label><span class="required">*</span>Nombre(s): </label>
              <input name="nombre" placeholder="INGRESA TU NOMBRE" .value=${this.form.nombre || ''} @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>Primer Apellido: </label>
              <input name="apellido1" placeholder="APELLIDO" .value=${this.form.apellido1 || ''} @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>Segundo Apellido: </label>
              <input name="apellido2" placeholder="APELLIDO" .value=${this.form.apellido2 || ''} @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>RFC: </label>  
              <input name="rfc" placeholder="ABCD000000ABC" maxlength="13" .value=${this.form.rfc || ''}
                  @input=${e => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replaceAll(/[^A-ZÑ&0-9]/g, '');
                    this.updateField(e);
                  }}
                />
                ${this.form.rfc && !this.validarRFC(this.form.rfc) ? html`
                  <small class="msg msg-orange">
                    RFC con formato inválido
                  </small>
                ` : ''}
            </div>

            <div>
              <label><span class="required">*</span>Fecha de Nacimiento: </label>
              <input type="date" name="fechaNacimiento" .value=${this.form.fechaNacimiento || ''} required @blur=${this.updateEdad}/>
            </div>

            <div>
              <label><span class="required">*</span>Edad: </label>
              <input class="edad" .value=${this.edad} disabled>
              <label><span class="required">*</span>Sexo</label>
              <div class="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="sexo"
                    value="H"
                    .checked=${this.form.sexo === 'H'}
                    @change=${e => {
                      this.form.sexo = e.target.value;
                      this.validateForm();
                    }}
                  />
                  <span>Hombre</span>
                </label>

                <label>
                  <input 
                    type="radio" 
                    name="sexo"
                    value="M"
                    .checked=${this.form.sexo === 'M'}
                    @change=${e => {
                      this.form.sexo = e.target.value;
                      this.validateForm();
                    }}
                  />
                  <span>Mujer</span>
                </label>
              </div>
            </div>

            <div>
              <label><span class="required">*</span>Estado Civil: </label>
              <div class="radio-group">
                ${['Soltero', 'Casado', 'Divorciado', 'Viudo'].map(opcion => html`
                  <label>
                    <input 
                      type="radio"
                      name="civil"
                      value="${opcion}"
                      .checked=${this.form.civil === opcion}
                      @change=${e => {
                        this.form.civil = e.target.value;
                        this.validateForm();
                      }}
                    />
                    <span>${opcion}</span>
                  </label>
                `)}
              </div>
            </div>
          </div>

          <h2>DATOS DE CONTACTO</h2>

          <div class="grid">
            <!-- > ------------------- INGRESA CORREO ------------------- <!--> 
            <div>
              <label>
                <span class="required">*</span>Correo Electrónico:
              </label>

              <input
                name="email"
                placeholder="alguien@example.com"
                .value=${this.form.email || ''}
                @blur=${this.validateEmailBlur}
                @input=${this.updateField}
                required
              />

              ${this.emailTouched && this.emailError == 'required' ? html`
                <small class="msg msg-gray">Campo obligatorio</small>
              ` : ''}

              ${this.emailTouched && this.emailError == 'format' ? html`
                <small class="msg msg-orange">Estructura de correo inválida</small>
              ` : ''}
            </div>

            <!-- > ------------------- CONFIRMA CORREO ------------------- <!--> 
            <div>
              <label>
                <span class="required">*</span>Confirmar Correo:
              </label>

              <input
                name="email2"
                placeholder="alguien@example.com"
                .value=${this.form.email2 || ''}
                @blur=${this.validateEmail2Blur}
                @input=${this.updateField}
                required
              />

              ${this.email2Touched && this.email2Error == 'required' ? html`
                <small class="msg msg-gray">Campo obligatorio</small>
              ` : ''}

              ${this.email2Touched && this.email2Error == 'format' ? html`
                <small class="msg msg-orange">Estructura de correo inválida</small>
              ` : ''}

              ${this.email2Touched && !this.email2Error && this.emailMatchError ? html`
                <small class="msg msg-red">Los correos no coinciden</small>
              ` : ''}
            </div>

            <!-- > ------------------- TELEFONOS ------------------- <!--> 
            <div>
              <label><span class="required">*</span>No. Teléfono: </label>
              <input name="tel" placeholder="4421234567" maxlength="10" .value=${this.form.tel || ''} @input=${this.onlyPhone} @blur=${this.validateTelBlur}/>

              ${this.telTouched && this.telError == 'required' ? html`
              <small class="msg msg-gray">Campo obligatorio</small>` : ''}

              ${this.telTouched && this.telError == 'format' ? html`
                <small class="msg msg-orange">Número inválido</small>` : ''}
            </div>

            <div>
              <label><span class="required">*</span>Confirmar Teléfono: </label>
              <input name="tel2" placeholder="4421234567" maxlength="10" .value=${this.form.tel2 || ''} @input=${this.onlyPhone} @blur=${this.validateTel2Blur}/>

              ${this.tel2Touched && this.tel2Error == 'required' ? html`
              <small class="msg msg-gray">Campo obligatorio</small>` : ''}

              ${this.tel2Touched && this.tel2Error == 'format' ? html`
              <small class="msg msg-orange">Número inválido</small> ` : ''}

              ${this.tel2Touched && !this.tel2Error && this.phoneMatchError ? html`
              <small class="msg msg-red">Los teléfonos no coinciden</small>` : ''}
            </div>

          </div>
            <div class="form-actions">
              <button
                type="button"
                class="btn-secundario"
                @click=${this.goBack}
              >
                VOLVER
              </button>

              ${this.formValido ? html`
                <button class="btn-primario" @click=${this.continuar}>
                  CONTINUAR
                </button>
              ` : ''}

              <button class="btn-cancelar" @click=${this.cancelar}>
                CANCELAR
              </button>
            </div>
        </div>
      </main>
    `;
  }
}

customElements.define('preregistro-view', PreregistroView);