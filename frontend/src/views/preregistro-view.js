import { LitElement, html, css } from 'lit';

const CONVOCATORIAS = {
      '/convocatoria-guardia-civica': {
        nombre: 'GUARDIA CÍVICO Y VIAL',
        edadMin: 21,
        edadMax: 50
      },
      '/convocatoria-guardia-vial': {
        nombre: 'GUARDIA CÍVICO Y VIAL',
        edadMin: 21,
        edadMax: 50
      },
      '/convocatoria-guardia-auxiliar': {
        nombre: 'GUARDIA AUXILIAR',
        edadMin: 18,
        edadMax: 50
      },
      '/convocatoria-auxiliar': {
        nombre: 'POLICÍA AUXILIAR',
        edadMin: 18,
        edadMax: 42
      },
      '/convocatoria-proximidad': {
        nombre: 'POLICÍA DE PROXIMIDAD',
        edadMin: 18,
        edadMax: 35
      },
      '/convocatoria-proximidad-cibernetica': {
        nombre: 'POLICÍA DE PROXIMIDAD',
        edadMin: 18,
        edadMax: 35
      },
      '/convocatoria-proximidad-seg-pub': {
        nombre: 'POLICÍA DE PROXIMIDAD',
        edadMin: 18,
        edadMax: 35
      },
      '/convocatoria-proximidad-victimas': {
        nombre: 'POLICÍA DE PROXIMIDAD',
        edadMin: 18,
        edadMax: 35
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

    /* ============================ HEADER ================================= */
    header {
      background: #0a0f24;
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 2rem;
    }

    header img {
      width: clamp(55px, 8vw, 90px);
      height: auto;
      flex-shrink: 0;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
      line-height: 1.2;

      max-width: 100%;
      white-space: normal;
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
    .error {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 4px;
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
        sexo: { type: String },
        curp: { type: String },
        rfc: { type: String },
        mostrarAlerta: { type: Boolean },
        edadValidaConvocatoria: { state: true },
        alertaConfig: { type: Object }
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
      this.rfc = '';
      this.mostrarAlerta = false;
      this.alertaConfig = {};
      this.edadValidaConvocatoria = false;
    }

    validateForm() {
    const f = this.form;

    const curpCompleta = f.curp?.length === 18;
    const rfcCompleto = f.rfc?.length === 13;

    this.formValido =
      curpCompleta &&
      rfcCompleto &&
      f.nombre &&
      f.apellido1 &&
      f.email &&
      f.email2 &&
      f.email === f.email2 &&
      f.tel &&
      f.tel2 &&
      f.tel === f.tel2 &&
      this.edadValidaConvocatoria && // 🔴 CLAVE
      !this.emailError &&
      !this.emailMatchError &&
      !this.phoneMatchError;
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
            convocatorias: [
                {
                  id: 'auxiliar',
                  nombre: 'Guardia Auxiliar',
                  imagen: '/assets/guardia-auxiliar.jpg'
                },
                {
                  id: 'vial',
                  nombre: 'Guardia Vial',
                  imagen: '/assets/guardia-vial.jpg'
                },
                {
                  id: 'proximidad',
                  nombre: 'Policía Proximidad',
                  imagen: '/assets/policia-proximidad.jpg'
                }
              ]
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
      this.phoneMatchError =
        this.form.tel &&
        this.form.tel2 &&
        this.form.tel !== this.form.tel2;
        this.validateForm();
    }

    onlyUpper(e) {
        e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
        this.updateField(e);
        this.validateForm();
    }

    validateEmail(e) {
      const value = e.target.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|mx)$/;

      this.emailError = value && !regex.test(value);
      this.updateField(e);
      this.checkEmailMatch();
      this.validateForm();
    }

    validateEmailBlur(e) {
      const value = e.target.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|mx)$/;

      this.emailTouched = true;
      this.emailError = value !== '' && !regex.test(value);

      this.updateField(e);
    }

    validateEmail2Blur(e) {
      const value = e.target.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|mx)$/;

      this.email2Touched = true;
      this.email2Error = value !== '' && !regex.test(value);

      this.updateField(e);

      this.emailMatchError =
        this.form.email &&
        this.form.email2 &&
        this.form.email !== this.form.email2;
    }

    checkEmailMatch() {
      this.emailMatchError =
        this.form.email &&
        this.form.email2 &&
        this.form.email !== this.form.email2;
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

      if (!this.validarCURP(this.curp)) {
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

      if (!this.validarRFC(this.rfc)) {
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
          imagen: data.imagen
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
      this.formData = {
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        email2: '',
        tel: '',
        tel2: '',
        fechaNacimiento: ''
      };
      this.edad = null;
      this.edadValidaConvocatoria = false;
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
          .alternativas=${this.alertaConfig.alternativas}
          @cerrar=${this.cerrarAlerta}
          @aceptar=${this.handleAlertaAceptar}
        ></alerta-view>
      ` : ''}

      <header>
        <img class="logo-left" src="/src/assets/SSPlogo.png" alt="SSP" />

        <div class="ipes">
          INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES
        </div>

        <img class="logo-right" src="/src/assets/IPESlogo.png" alt="IPES" />
      </header>

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
                @input=${e => {
                  this.curp = e.target.value.toUpperCase();
                  this.form.curp = this.curp;
                  this.validateForm();
                }}
              />
            </div>

            <div>
              <label><span class="required">*</span>Nombre(s): </label>
              <input name="nombre" placeholder="INGRESA TU NOMBRE"  @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>Primer Apellido: </label>
              <input name="apellido1" placeholder="APELLIDO" @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>Segundo Apellido: </label>
              <input name="apellido2" placeholder="APELLIDO" @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span>RFC: </label>  
              <input name="rfc" placeholder="ABCD000000ABC" maxlength="13"
                @input=${e => {
                  this.rfc = e.target.value.toUpperCase();
                  this.form.rfc = this.rfc;
                  this.validateForm();
                }}
              />
            </div>

            <div>
              <label><span class="required">*</span>Fecha de Nacimiento: </label>
              <input type="date" name="fechaNacimiento" required @blur=${this.updateEdad}/>
            </div>

            <div>
              <label><span class="required">*</span>Edad: </label>
              <input class="edad" .value=${this.edad} disabled>
              <label><span class="required">*</span>Sexo</label>
              <div class="radio-group">
                <label> <input type="radio" name="sexo"/><span>Hombre</span></label>
                <label> <input type="radio" name="sexo"/><span>Mujer</span></label>
              </div>
            </div>

            <div>
              <label><span class="required">*</span>Estado Civil: </label>
              <div class="radio-group">
                <label><input type="radio" name="civil" /><span>Soltero</span></label>
                <label><input type="radio" name="civil"><span>Casado</span></label>
                <label><input type="radio" name="civil"><span>Divorciado</span></label>
                <label><input type="radio" name="civil"><span>Viudo</span></label>
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
                @blur=${this.validateEmailBlur}
                @input=${this.updateField}
                required
              />

              ${this.emailTouched && this.emailError ? html`
                <small class="error">Dominio no permitido</small>
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
                @blur=${this.validateEmail2Blur}
                @input=${this.updateField}
                required
              />

              ${this.email2Touched && this.email2Error ? html`
                <small class="error">Dominio no permitido</small>
              ` : ''}

              ${this.email2Touched && !this.email2Error && this.emailMatchError ? html`
                <small class="error">Los correos no coinciden</small>
              ` : ''}
            </div>

            <!-- > ------------------- TELEFONOS ------------------- <!--> 
            <div>
              <label><span class="required">*</span>No. Teléfono: </label>
              <input name="tel" placeholder="(55) 1234-5678" maxlength="10" @input=${this.onlyPhone}/>
            </div>

            <div>
              <label><span class="required">*</span>Confirmar Teléfono: </label>
              <input name="tel2" placeholder="(55) 1234-5678" maxlength="10" @input=${this.onlyPhone}/>
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