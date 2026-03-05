import { LitElement, html} from 'lit';
import '../components/ipes-header.js';

import { preregistroUnoStyles } from '../styles/preregistro-uno.styles.js';

const CONVOCATORIAS = {
  '/convocatoria-guardia-civica':        { nombre: 'GUARDIA CÍVICA',               edadMin: 21, edadMax: 50, imagen: '/src/assets/GC.jpg' },
  '/convocatoria-guardia-vial':          { nombre: 'GUARDIA VIAL',                 edadMin: 21, edadMax: 50, imagen: '/src/assets/GV.jpg' },
  '/convocatoria-guardia-auxiliar':      { nombre: 'GUARDIA AUXILIAR',             edadMin: 18, edadMax: 50, imagen: '/src/assets/GA.jpg' },
  '/convocatoria-auxiliar':              { nombre: 'POLICÍA AUXILIAR',             edadMin: 18, edadMax: 42, imagen: '/src/assets/policia/AuxiliarJ.jpeg' },
  '/convocatoria-proximidad':            { nombre: 'POLICÍA DE PROXIMIDAD',        edadMin: 18, edadMax: 35, imagen: '/src/assets/proximidad/Proximidad.jpg' },
  '/convocatoria-proximidad-cibernetica':{ nombre: 'PROXIMIDAD CIBERNÉTICA',       edadMin: 18, edadMax: 35, imagen: '/src/assets/proximidad/Cibernetica.jpg' },
  '/convocatoria-proximidad-seg-pub':    { nombre: 'ANÁLISIS EN SEGURIDAD PÚBLICA',edadMin: 18, edadMax: 35, imagen: '/src/assets/proximidad/SegPub.jpeg' },
  '/convocatoria-proximidad-victimas':   { nombre: 'ATENCIÓN A VÍCTIMAS',          edadMin: 18, edadMax: 35, imagen: '/src/assets/proximidad/Victimas.jpg' }
};

export class PreregistroView extends LitElement {

  static styles = [preregistroUnoStyles];

  static properties = {
    edad:                   { state: true },
    valido:                 { state: true },
    form:                   { state: true },
    emailError:             { state: true },
    emailMatchError:        { state: true },
    phoneMatchError:        { state: true },
    email2Error:            { state: true },
    emailTouched:           { state: true },
    email2Touched:          { state: true },
    formValido:             { state: true },
    civil:                  { type: String },
    sexo:                   { type: String },
    curp:                   { type: String },
    rfc:                    { type: String },
    mostrarAlerta:          { type: Boolean },
    edadValidaConvocatoria: { state: true },
    alertaConfig:           { type: Object },
    telTouched:             { state: true },
    tel2Touched:            { state: true },
    telError:               { state: true },
    tel2Error:              { state: true },
    curpExiste:             { state: true },
    validandoCurp:          { state: true },
    rfcCurpMismatch:        { state: true }
  };

  constructor() {
    super();
    this.edad                   = '';
    this.valido                 = false;
    this.form                   = {};
    this.emailError             = false;
    this.email2Error            = false;
    this.emailMatchError        = false;
    this.emailTouched           = false;
    this.email2Touched          = false;
    this.formValido             = false;
    this.sexo                   = '';
    this.curp                   = '';
    this.civil                  = '';
    this.rfc                    = '';
    this.mostrarAlerta          = false;
    this.alertaConfig           = {};
    this.edadValidaConvocatoria = false;
    this.telTouched             = false;
    this.tel2Touched            = false;
    this.telError               = null;
    this.tel2Error              = null;
    this.curpExiste             = false;
    this.validandoCurp          = false;
    this.rfcCurpMismatch        = false;

    const origenActual = sessionStorage.getItem('origen_convocatoria');
    const guardado     = sessionStorage.getItem('paso1_data');

    if (guardado) {
      const datosGuardados = JSON.parse(guardado);

      if (datosGuardados._convocatoria !== origenActual) {
        sessionStorage.removeItem('paso1_data');
      } else {
        this.form = datosGuardados;

        if (this.form.email)  this.emailTouched  = true;
        if (this.form.email2) this.email2Touched = true;
        if (this.form.tel)    this.telTouched    = true;
        if (this.form.tel2)   this.tel2Touched   = true;

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
        if (this.form.email  && !regexEmail.test(this.form.email))  this.emailError  = 'format';
        if (this.form.email2 && !regexEmail.test(this.form.email2)) this.email2Error = 'format';
        if (this.form.email && this.form.email2 && this.form.email !== this.form.email2) this.emailMatchError = true;
        if (this.form.tel  && this.form.tel.length  !== 10) this.telError  = 'format';
        if (this.form.tel2 && this.form.tel2.length !== 10) this.tel2Error = 'format';
        if (this.form.tel && this.form.tel2 && this.form.tel !== this.form.tel2) this.phoneMatchError = true;

        if (this.form.fechaNacimiento) {
          const birth = new Date(this.form.fechaNacimiento);
          const today = new Date();
          let edad = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) edad--;
          this.edad      = edad;
          this.form.edad = edad;
          const convocatoria = this.getConvocatoriaConfig();
          if (convocatoria) {
            this.edadValidaConvocatoria = edad >= convocatoria.edadMin && edad <= convocatoria.edadMax;
          }
        }
      }
    }
  }

  guardarEnSession() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    sessionStorage.setItem('paso1_data', JSON.stringify({ ...this.form, _convocatoria: origen }));
  }

  validateForm() {
    const f = this.form;
    const curpCompleta   = f.curp?.length === 18;
    const rfcCompleto    = this.validarRFC(f.rfc || '');
    const rfcMatchesCurp = (f.rfc?.length >= 10 && f.curp?.length >= 10)
      ? f.rfc.substring(0, 10) === f.curp.substring(0, 10)
      : true;

    this.rfcCurpMismatch = f.rfc?.length >= 10 && f.curp?.length >= 10 && !rfcMatchesCurp;

    this.formValido =
      !this.curpExiste && !this.validandoCurp &&
      curpCompleta && rfcCompleto && rfcMatchesCurp &&
      f.nombre && f.apellido1 &&
      f.email && f.email2 && f.email === f.email2 &&
      f.sexo && f.civil &&
      f.tel && f.tel2 && f.tel === f.tel2 &&
      this.edadValidaConvocatoria &&
      !this.emailError && !this.email2Error && !this.emailMatchError;
  }

  updated() { this.validateForm(); }

  async verificarCurpExistente(curp) {
    if (curp.length !== 18) return;
    if (this._curpAbortController) this._curpAbortController.abort();
    this._curpAbortController = new AbortController();
    this.validandoCurp = true;

    let existe = false;
    try {
      const resp = await fetch(`http://localhost:3000/preregistros?curp=${curp}`, { signal: this._curpAbortController.signal });
      if (resp.ok) { const data = await resp.json(); existe = data.length > 0; }
    } catch (e) {
      if (e.name === 'AbortError') return;
      existe = false;
    }

    if (existe) {
      this.curpExiste    = true;
      this.formValido    = false;
      this.mostrarAlerta = true;
      this.alertaConfig  = {
        tipo: 'warning-yellow', titulo: 'PRE-REGISTRO YA EXISTENTE',
        mensaje: 'No es posible continuar con el pre-registro, ya que esta CURP cuenta con un registro previo.',
        extra: 'Si crees que es un error, comunícate con el área correspondiente.',
        boton: 'ENTENDIDO'
      };
      this.requestUpdate();
    } else {
      this.curpExiste    = false;
      this.mostrarAlerta = false;
    }
    this.validandoCurp = false;
  }

  normalizeText(e) {
    const map = { á:'A',é:'E',í:'I',ó:'O',ú:'U',ñ:'N',Á:'A',É:'E',Í:'I',Ó:'O',Ú:'U',Ñ:'N' };
    e.target.value = e.target.value.replaceAll(/[áéíóúñÁÉÍÓÚÑ]/g, m => map[m]).toUpperCase().replaceAll(/[^A-Z\s]/g, '');
    this.updateField(e);
  }

  updateEdad(e) {
    this.form.fechaNacimiento = e.target.value;
    this.guardarEnSession();
    if (!e.target.value || e.target.value.length < 10) { this.edad = ''; this.edadValidaConvocatoria = false; return; }
    const birth = new Date(e.target.value);
    const today = new Date();
    let edad = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) edad--;
    this.edad = edad; this.form.edad = edad;
    this.edadValidaConvocatoria = false;
    this.validateForm();
  }

  validarEdadBlur() {
    const edad   = this.edad;
    if (edad === '' || edad === undefined) return;
    const convocatoria = this.getConvocatoriaConfig();
    const origen       = sessionStorage.getItem('origen_convocatoria');

    if (edad < 18) {
      this.mostrarAlerta = true;
      this.alertaConfig  = { tipo: 'warning-menor', titulo: 'Registro no permitido', mensaje: 'Debes ser mayor de edad para continuar.', boton: 'ENTENDIDO', onAceptar: 'limpiar-registro' };
      return;
    }

    if (convocatoria && (edad < convocatoria.edadMin || edad > convocatoria.edadMax)) {
      const alternativas = this.getConvocatoriasCompatibles(edad).filter(c => c.path !== origen);
      if (alternativas.length > 0) {
        this.mostrarAlerta = true;
        this.alertaConfig  = {
          tipo: 'warning-yellow', titulo: 'ESTIMADO USUARIO',
          mensaje: 'De acuerdo a la información proporcionada, usted NO cumple con los requisitos necesarios para la convocatoria seleccionada.',
          extra: 'De igual manera, le invitamos a conocer las siguientes convocatorias, ajustadas a su perfil proporcionado.',
          alternativas
        };
      } else {
        this.mostrarAlerta = true;
        this.alertaConfig  = { tipo: 'error', titulo: 'Edad fuera de rango', mensaje: 'Actualmente no existe ninguna convocatoria compatible con tu edad.', boton: 'ENTENDIDO' };
      }
      return;
    }

    this.edadValidaConvocatoria = true;
    this.mostrarAlerta          = false;
    this.validateForm();
  }

  updateField(e) {
    this.form[e.target.name] = e.target.value;
    this.validate(); this.validateForm(); this.guardarEnSession();
  }

  validate() {
    const f = this.form;
    this.valido = f.curp && f.nombre && f.apellido1 && f.rfc &&
      f.email && f.email2 && f.email === f.email2 &&
      f.tel && f.tel2 && f.tel === f.tel2 && this.edad !== '';
  }

  onlyLetters(e)  { e.target.value = e.target.value.replaceAll(/[^a-zA-ZÁÉÍÓÚÑáéíóúñ\s]/g, ''); this.updateField(e); }
  onlyPhone(e)    { e.target.value = e.target.value.replaceAll(/\D/g, '').slice(0, 10); this.updateField(e); }
  onlyUpper(e)    { e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9]/g, ''); this.updateField(e); this.validateForm(); }
  preventPaste(e) { e.preventDefault(); return false; }

  validateEmail(e) {
    const value = e.target.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    this.emailError = value && !regex.test(value);
    this.updateField(e); this.checkEmailMatch(); this.validateForm();
  }

  validateEmailBlur(e) {
    const value = e.target.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    this.emailTouched = true;
    if (!value)             this.emailError = 'required';
    else if (regex.test(value)) this.emailError = null;
    else                    this.emailError = 'format';
    this.updateField(e); this.checkEmailMatch(); this.validateForm();
  }

  validateEmail2Blur(e) {
    const value = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.email2Touched = true;
    if (!value)             this.email2Error = 'required';
    else if (regex.test(value)) this.email2Error = null;
    else                    this.email2Error = 'format';
    this.updateField(e); this.checkEmailMatch(); this.validateForm();
  }

  checkEmailMatch() {
    this.emailMatchError = !!(this.form.email && this.form.email2 && this.form.email !== this.form.email2);
  }

  validateTelBlur(e) {
    const value = e.target.value.trim();
    this.telTouched = true;
    if (!value)                this.telError = 'required';
    else if (value.length === 10) this.telError = null;
    else                       this.telError = 'format';
    this.updateField(e); this.checkPhoneMatch(); this.validateForm();
  }

  validateTel2Blur(e) {
    const value = e.target.value.trim();
    this.tel2Touched = true;
    if (!value)                this.tel2Error = 'required';
    else if (value.length === 10) this.tel2Error = null;
    else                       this.tel2Error = 'format';
    this.updateField(e); this.checkPhoneMatch(); this.validateForm();
  }

  checkPhoneMatch() {
    this.phoneMatchError = !!(this.form.tel && this.form.tel2 && this.form.tel !== this.form.tel2);
  }

  submitForm() {
    sessionStorage.setItem('preregistro_data', JSON.stringify({ paso1: { ...this.form } }));
    globalThis.location.href = '/preregistro-continuacion';
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ORIGEN AL ENTRAR A PREREGISTRO:', sessionStorage.getItem('origen_convocatoria'));
  }

  goBack() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    globalThis.location.href = origen || '/convocatorias-view';
  }

  cancelar() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    sessionStorage.clear();
    globalThis.location.href = origen || '/convocatorias-view';
  }

  validarCURP(curp) { return /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(curp); }
  validarRFC(rfc)   { return /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/.test(rfc); }

  continuar() {
    if (!this.formValido) {
      this.mostrarAlerta = true; this.alertaConfig = { tipo: 'warning-yellow', titulo: 'Formulario incompleto', mensaje: 'Debes completar todos los campos obligatorios para continuar.', boton: 'ENTENDIDO' }; return;
    }
    if (this.curpExiste) {
      this.mostrarAlerta = true; this.alertaConfig = { tipo: 'warning-redireccion', titulo: 'PRE-REGISTRO YA EXISTENTE', mensaje: 'No es posible continuar con el pre-registro, ya que esta CURP cuenta con un registro previo.', extra: 'Si crees que es un error, comunícate con el área correspondiente.', boton: 'ENTENDIDO' }; return;
    }
    if (!this.validarCURP(this.form.curp)) {
      this.mostrarAlerta = true; this.alertaConfig = { tipo: 'warning-yellow', titulo: 'CURP inválido', mensaje: 'El CURP ingresado no tiene un formato válido.', extra: 'Por favor, verifícalo e ingrésalo nuevamente.', boton: 'ENTENDIDO' }; return;
    }
    if (!this.validarRFC(this.form.rfc)) {
      this.mostrarAlerta = true; this.alertaConfig = { tipo: 'warning', titulo: 'RFC inválido', mensaje: 'El RFC ingresado no tiene un formato válido.', extra: 'Por favor, verifícalo e ingrésalo nuevamente.', boton: 'ENTENDIDO' }; return;
    }
    if (this.rfcCurpMismatch) {
      this.mostrarAlerta = true; this.alertaConfig = { tipo: 'warning-yellow', titulo: 'RFC y CURP no coinciden', mensaje: 'Los primeros 10 caracteres del RFC deben coincidir con los primeros 10 de la CURP.', extra: 'Por favor, verifica que ambos datos correspondan a la misma persona.', boton: 'ENTENDIDO' }; return;
    }
    this.submitForm();
  }

  cerrarAlerta() { this.mostrarAlerta = false; }

  handleAlertaAceptar() {
    if (this.alertaConfig.onAceptar === 'limpiar-registro') this.resetFormulario();
    this.mostrarAlerta = false;
  }

  resetFormulario() {
    this.form = { nombre:'',apellido1:'',apellido2:'',email:'',email2:'',tel:'',tel2:'',fechaNacimiento:'',curp:'',rfc:'' };
    this.edad = ''; this.edadValidaConvocatoria = false; this.rfcCurpMismatch = false;
    this.emailTouched = false; this.email2Touched = false; this.telTouched = false; this.tel2Touched = false;
    sessionStorage.removeItem('paso1_data');
    this.requestUpdate();
  }

  getConvocatoriaConfig() {
    return CONVOCATORIAS[sessionStorage.getItem('origen_convocatoria')] || null;
  }

  getConvocatoriasCompatibles(edad) {
    return Object.entries(CONVOCATORIAS)
      .map(([path, data]) => ({ path, nombre: data.nombre, edadMin: data.edadMin, edadMax: data.edadMax, imagen: data.imagen || '/assets/default-convocatoria.jpg' }))
      .filter(c => edad >= c.edadMin && edad <= c.edadMax);
  }

  cambiarConvocatoria(e) {
    const path = e.detail;
    sessionStorage.setItem('origen_convocatoria', path);
    globalThis.location.href = path;
  }

  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra || ''}
          .boton=${this.alertaConfig.boton || 'ENTENDIDO'}
          .alternativas=${this.alertaConfig.alternativas || []}
          @alerta-cerrar=${() => this.cerrarAlerta()}
          @alerta-aceptar=${() => this.handleAlertaAceptar()}
        ></alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <main>
        <div class="card">
          <h1>PRE-REGISTRO</h1>
          <p class="subtitle">Completa los campos solicitados con la información requerida</p>

          <h2>DATOS GENERALES</h2>

          <div class="grid">
            <div>
              <label><span class="required">*</span>CURP: </label>
              <input name="curp" placeholder="ABCD000000EFGHI00" maxlength="18"
                .value=${this.form.curp || ''}
                @input=${async e => {
                  e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
                  this.form.curp     = e.target.value;
                  this.curpExiste    = false;
                  this.mostrarAlerta = false;
                  this.updateField(e);
                  if (e.target.value.length === 18) await this.verificarCurpExistente(e.target.value);
                  this.validateForm();
                }}
              />
            </div>

            <div>
              <label><span class="required">*</span>Nombre(s): </label>
              <input name="nombre" placeholder="INGRESA TU NOMBRE" .value=${this.form.nombre || ''} @input=${e => this.normalizeText(e)} />
            </div>

            <div>
              <label><span class="required">*</span>Primer Apellido: </label>
              <input name="apellido1" placeholder="APELLIDO" .value=${this.form.apellido1 || ''} @input=${e => this.normalizeText(e)} />
            </div>

            <div>
              <label><span class="required">*</span>Segundo Apellido: </label>
              <input name="apellido2" placeholder="APELLIDO" .value=${this.form.apellido2 || ''} @input=${e => this.normalizeText(e)} />
            </div>

            <div>
              <label><span class="required">*</span>RFC: </label>
              <input name="rfc" placeholder="ABCD000000ABC" maxlength="13"
                .value=${this.form.rfc || ''}
                @input=${e => {
                  e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-ZÑ&0-9]/g, '');
                  this.updateField(e);
                }}
              />
              ${this.form.rfc && !this.validarRFC(this.form.rfc) ? html`<small class="msg msg-orange">RFC con formato inválido</small>` : ''}
              ${this.rfcCurpMismatch ? html`<small class="msg msg-red">Los primeros 10 caracteres del RFC no coinciden con la CURP</small>` : ''}
            </div>

            <div>
              <label><span class="required">*</span>Fecha de Nacimiento: </label>
              <input type="date" name="fechaNacimiento" .value=${this.form.fechaNacimiento || ''} required
                @change=${e => this.updateEdad(e)} @blur=${() => this.validarEdadBlur()} />
            </div>

            <div>
              <label><span class="required">*</span>Edad: </label>
              <input class="edad" .value=${this.edad} disabled>
            </div>

            <div>
              <label><span class="required">*</span>Sexo</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="sexo" value="H" .checked=${this.form.sexo === 'H'}
                    @change=${e => { this.form.sexo = e.target.value; this.guardarEnSession(); this.validateForm(); }} />
                  <span>Hombre</span>
                </label>
                <label>
                  <input type="radio" name="sexo" value="M" .checked=${this.form.sexo === 'M'}
                    @change=${e => { this.form.sexo = e.target.value; this.guardarEnSession(); this.validateForm(); }} />
                  <span>Mujer</span>
                </label>
              </div>
            </div>

            <div>
              <label><span class="required">*</span>Estado Civil: </label>
              <div class="radio-group">
                ${['Soltero', 'Casado', 'Divorciado', 'Viudo'].map(opcion => html`
                  <label>
                    <input type="radio" name="civil" value="${opcion}" .checked=${this.form.civil === opcion}
                      @change=${e => { this.form.civil = e.target.value; this.guardarEnSession(); this.validateForm(); }} />
                    <span>${opcion}</span>
                  </label>
                `)}
              </div>
            </div>
          </div>

          <h2>DATOS DE CONTACTO</h2>

          <div class="grid">
            <div>
              <label><span class="required">*</span>Correo Electrónico:</label>
              <input name="email" placeholder="alguien@example.com" .value=${this.form.email || ''}
                @blur=${e => this.validateEmailBlur(e)} @input=${e => this.updateField(e)} required />
              ${this.emailTouched && this.emailError === 'required' ? html`<small class="msg msg-gray">Campo obligatorio</small>` : ''}
              ${this.emailTouched && this.emailError === 'format'   ? html`<small class="msg msg-orange">Estructura de correo inválida</small>` : ''}
            </div>

            <div>
              <label><span class="required">*</span>Confirmar Correo:</label>
              <input name="email2" placeholder="alguien@example.com" .value=${this.form.email2 || ''}
                @blur=${e => this.validateEmail2Blur(e)} @input=${e => this.updateField(e)}
                @paste=${e => this.preventPaste(e)} @contextmenu=${e => this.preventPaste(e)}
                autocomplete="off" required />
              ${this.email2Touched && this.email2Error === 'required'                       ? html`<small class="msg msg-gray">Campo obligatorio</small>` : ''}
              ${this.email2Touched && this.email2Error === 'format'                         ? html`<small class="msg msg-orange">Estructura de correo inválida</small>` : ''}
              ${this.email2Touched && !this.email2Error && this.emailMatchError             ? html`<small class="msg msg-red">Los correos no coinciden</small>` : ''}
            </div>

            <div>
              <label><span class="required">*</span>No. Teléfono: </label>
              <input name="tel" placeholder="4421234567" maxlength="10" .value=${this.form.tel || ''}
                @input=${e => this.onlyPhone(e)} @blur=${e => this.validateTelBlur(e)} />
              ${this.telTouched && this.telError === 'required' ? html`<small class="msg msg-gray">Campo obligatorio</small>` : ''}
              ${this.telTouched && this.telError === 'format'   ? html`<small class="msg msg-orange">Número inválido</small>` : ''}
            </div>

            <div>
              <label><span class="required">*</span>Confirmar Teléfono: </label>
              <input name="tel2" placeholder="4421234567" maxlength="10" .value=${this.form.tel2 || ''}
                @input=${e => this.onlyPhone(e)} @blur=${e => this.validateTel2Blur(e)}
                @paste=${e => this.preventPaste(e)} @contextmenu=${e => this.preventPaste(e)}
                autocomplete="off" />
              ${this.tel2Touched && this.tel2Error === 'required'                   ? html`<small class="msg msg-gray">Campo obligatorio</small>` : ''}
              ${this.tel2Touched && this.tel2Error === 'format'                     ? html`<small class="msg msg-orange">Número inválido</small>` : ''}
              ${this.tel2Touched && !this.tel2Error && this.phoneMatchError         ? html`<small class="msg msg-red">Los teléfonos no coinciden</small>` : ''}
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secundario" @click=${() => this.goBack()}>VOLVER</button>
            ${this.formValido ? html`
              <button class="btn-primario" @click=${() => this.continuar()}>CONTINUAR</button>
            ` : ''}
            <button class="btn-cancelar" @click=${() => this.cancelar()}>CANCELAR</button>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('preregistro-view', PreregistroView);