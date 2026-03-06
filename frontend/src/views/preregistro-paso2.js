import { LitElement, html } from 'lit';
import '../components/ipes-header.js';

import { preregistroDosStyles } from '../styles/preregistro-dos.styles.js';

const CONVOCATORIAS = {
  '/convocatoria-guardia-civica':       { nombre: 'GUARDIA CÍVICA',                   edadMin: 21, edadMax: 50, nivelEstudiosMin: 'SECUNDARIA',   imagen: '/src/assets/GC.jpg' },
  '/convocatoria-guardia-vial':         { nombre: 'GUARDIA VIAL',                     edadMin: 21, edadMax: 50, nivelEstudiosMin: 'SECUNDARIA',   imagen: '/src/assets/GV.jpg' },
  '/convocatoria-guardia-auxiliar':     { nombre: 'GUARDIA AUXILIAR',                 edadMin: 18, edadMax: 50, nivelEstudiosMin: 'SECUNDARIA',   imagen: '/src/assets/GA.jpg' },
  '/convocatoria-auxiliar':             { nombre: 'POLICÍA AUXILIAR',                 edadMin: 18, edadMax: 42, nivelEstudiosMin: 'SECUNDARIA',   imagen: '/src/assets/policia/AuxiliarL.jpeg' },
  '/convocatoria-proximidad':           { nombre: 'POLICÍA DE PROXIMIDAD',            edadMin: 18, edadMax: 35, nivelEstudiosMin: 'BACHILLERATO', imagen: '/src/assets/proximidad/Proximidad.jpg' },
  '/convocatoria-proximidad-cibernetica':{ nombre: 'POLICÍA ESPECIALIZADA - CIBERNÉTICA', edadMin: 18, edadMax: 35, nivelEstudiosMin: 'LICENCIATURA', imagen: '/src/assets/proximidad/Cibernetica.jpg' },
  '/convocatoria-proximidad-seg-pub':   { nombre: 'POLICÍA ESPECIALIZADA - ANÁLISIS', edadMin: 18, edadMax: 35, nivelEstudiosMin: 'LICENCIATURA', imagen: '/src/assets/proximidad/SegPub.jpeg' },
  '/convocatoria-proximidad-victimas':  { nombre: 'POLICÍA ESPECIALIZADA - VÍCTIMAS', edadMin: 18, edadMax: 35, nivelEstudiosMin: 'LICENCIATURA', imagen: '/src/assets/proximidad/Victimas.jpg' }
};

const NIVELES_ESTUDIOS = { 'SECUNDARIA': 1, 'BACHILLERATO': 2, 'LICENCIATURA': 3, 'MAESTRIA': 4, 'DOCTORADO': 5 };

export class PreregistroPaso2 extends LitElement {
  static styles = [preregistroDosStyles];

  static properties = {
    form:                    { state: true },
    formValido:              { state: true },
    ine:                     { state: true },
    ineFrenteCargado:        { state: true },
    ineReversoCargado:       { state: true },
    mostrarAlerta:           { type: Boolean },
    alertaConfig:            { type: Object },
    nivelEstudiosValido:     { state: true },
    licencia:                { state: true },
    cartilla:                { state: true },
    certificadoSecundaria:   { state: true }
  };

  constructor() {
    super();
    this.form                  = {};
    this.formValido            = false;
    this.ine                   = '';
    this.ineFrenteCargado      = false;
    this.ineReversoCargado     = false;
    this.mostrarAlerta         = false;
    this.alertaConfig          = {};
    this.nivelEstudiosValido   = false;
    this.licencia              = '';
    this.cartilla              = '';
    this.certificadoSecundaria = '';
    this.ineFrenteArchivo      = null;
    this.ineReversoArchivo     = null;

    const guardado = sessionStorage.getItem('paso2_data');
    if (guardado) {
      const saved = JSON.parse(guardado);
      this.form = saved;

      // Restaurar radios y documentación
      if (saved._licencia)              this.licencia              = saved._licencia;
      if (saved._cartilla)              this.cartilla              = saved._cartilla;
      if (saved._ine)                   this.ine                   = saved._ine;
      if (saved._certificadoSecundaria) this.certificadoSecundaria = saved._certificadoSecundaria;
      if (saved._ineFrenteCargado)      this.ineFrenteCargado      = saved._ineFrenteCargado;
      if (saved._ineReversoCargado)     this.ineReversoCargado     = saved._ineReversoCargado;
    }
  }
  saveProgress() {
    sessionStorage.setItem('paso2_data', JSON.stringify({
      ...this.form,
      _licencia:              this.licencia,
      _cartilla:              this.cartilla,
      _ine:                   this.ine,
      _certificadoSecundaria: this.certificadoSecundaria,
      _ineFrenteCargado:      this.ineFrenteCargado,
      _ineReversoCargado:     this.ineReversoCargado
    }));
  }

  updateField(e) {
    this.form[e.target.name] = e.target.value;
    if (e.target.name === 'nivelEstudios') this.validarNivelEstudios(e.target.value);
    this.validateForm();
    this.saveProgress();
  }

  normalizeText(e) {
    const map = { á:'A',é:'E',í:'I',ó:'O',ú:'U',ñ:'N',Á:'A',É:'E',Í:'I',Ó:'O',Ú:'U',Ñ:'N' };
    e.target.value = e.target.value.replaceAll(/[áéíóúñÁÉÍÓÚÑ]/g, m => map[m]).toUpperCase().replaceAll(/[^A-Z\s]/g, '');
    this.updateField(e);
  }

  normalizeCalle(e) {
    const map = { á:'A',é:'E',í:'I',ó:'O',ú:'U',ñ:'N',Á:'A',É:'E',Í:'I',Ó:'O',Ú:'U',Ñ:'N' };
    e.target.value = e.target.value.replaceAll(/[áéíóúñÁÉÍÓÚÑ]/g, m => map[m]).toUpperCase().replaceAll(/[^A-Z0-9\s.]/g, '');
    this.updateField(e);
  }

  onlyNumbers(e, max = 5) {
    e.target.value = e.target.value.replaceAll(/\D/g, '').slice(0, max);
    this.updateField(e);
  }

  interiorFormat(e) {
    e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9-]/g, '').slice(0, 5);
    this.updateField(e);
  }

  handleMunicipioChange(e) {
    const municipio = e.target.value;
    this.form = { ...this.form, municipio, colonia: '', cp: municipio === 'QUERÉTARO' ? '76000' : '' };
    this.requestUpdate();
    this.validateForm();
    this.saveProgress();
  }

  exteriorInteriorFormat(e) {
    e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z0-9\-/]/g, '').slice(0, 5);
    this.updateField(e);
  }

  validarNivelEstudios(nivelSeleccionado) {
    if (!nivelSeleccionado) { this.nivelEstudiosValido = false; return; }

    const origen       = sessionStorage.getItem('origen_convocatoria');
    const convocatoria = CONVOCATORIAS[origen];

    if (!convocatoria) { this.nivelEstudiosValido = true; return; }

    const jerarquiaRequerida = NIVELES_ESTUDIOS[convocatoria.nivelEstudiosMin];
    const jerarquiaUsuario   = NIVELES_ESTUDIOS[nivelSeleccionado];

    if (jerarquiaUsuario < jerarquiaRequerida) {
      const alternativas = this.getConvocatoriasCompatiblesEstudios(nivelSeleccionado).filter(c => c.path !== origen);
      if (alternativas.length > 0) {
        this.mostrarAlerta = true;
        this.alertaConfig  = {
          tipo: 'warning-redireccion', titulo: 'ESTIMADO USUARIO',
          mensaje: 'De acuerdo a la información proporcionada, usted NO cumple con el nivel de estudios mínimo requerido para la convocatoria seleccionada.',
          extra: 'De igual manera, le invitamos a conocer las siguientes convocatorias, ajustadas a su perfil académico proporcionado.',
          alternativas
        };
      } else {
        this.mostrarAlerta = true;
        this.alertaConfig  = {
          tipo: 'error', titulo: 'Nivel de estudios insuficiente',
          mensaje: `Se requiere al menos ${convocatoria.nivelEstudiosMin} para esta convocatoria.`,
          extra: 'Actualmente no existe ninguna convocatoria compatible con su nivel de estudios.',
          boton: 'ENTENDIDO'
        };
      }
      this.nivelEstudiosValido = false;
    } else {
      this.nivelEstudiosValido = true;
      this.mostrarAlerta = false;
    }
  }

  getConvocatoriasCompatiblesEstudios(nivelUsuario) {
    const jerarquiaUsuario = NIVELES_ESTUDIOS[nivelUsuario];
    return Object.entries(CONVOCATORIAS)
      .map(([path, data]) => ({ path, nombre: data.nombre, nivelEstudiosMin: data.nivelEstudiosMin, imagen: data.imagen || '/assets/default-convocatoria.jpg' }))
      .filter(c => jerarquiaUsuario >= NIVELES_ESTUDIOS[c.nivelEstudiosMin]);
  }

  get requiereCertificadoSecundaria() {
    const origen = sessionStorage.getItem('origen_convocatoria');
    const conv   = CONVOCATORIAS[origen];
    return conv ? conv.nivelEstudiosMin === 'SECUNDARIA' && this.form.nivelEstudios : false;
  }

  handleIneFrente(e) {
    if (e.target.files?.length > 0) { this.ineFrenteCargado = true; this.ineFrenteArchivo = e.target.files[0].name; this.validateForm(); this.saveProgress(); }
  }

  handleIneReverso(e) {
    if (e.target.files?.length > 0) { this.ineReversoCargado = true; this.ineReversoArchivo = e.target.files[0].name; this.validateForm(); this.saveProgress(); }
  }

  get ineValido() {
    return this.ine === 'si' ? this.ineFrenteCargado && this.ineReversoCargado : true;
  }

  validateForm() {
    const f = this.form;
    const certificadoValido = !this.requiereCertificadoSecundaria || this.certificadoSecundaria !== '';
    const documentosValidos = this.licencia !== '' && this.cartilla !== '' && this.ine !== '' && this.ineValido && certificadoValido;

    this.formValido =
      f.municipio && f.cp?.length === 5 && f.colonia && f.calle && f.exterior &&
      f.nivelEstudios && f.contactoAlterno && f.telAlterno?.length === 10 &&
      documentosValidos && this.nivelEstudiosValido;
  }

  goBack()   { globalThis.location.href = '/preregistro'; }
  cancelar() { const origen = sessionStorage.getItem('origen_convocatoria'); sessionStorage.clear(); globalThis.location.href = origen || '/convocatorias-view'; }

  irACorreo() {
    const data = JSON.parse(sessionStorage.getItem('preregistro_data'));
    data.paso2 = {
      ...this.form, licencia: this.licencia, cartilla: this.cartilla,
      certificadoSecundaria: this.certificadoSecundaria,
      ine: { tieneINE: this.ine === 'si', frente: this.ine === 'si' ? this.ineFrenteArchivo : null, reverso: this.ine === 'si' ? this.ineReversoArchivo : null }
    };
    sessionStorage.setItem('preregistro_data', JSON.stringify(data));
    globalThis.location.href = '/preregistro-envio';
  }

  cerrarAlerta()       { this.mostrarAlerta = false; }
  handleAlertaAceptar(){ this.mostrarAlerta = false; }

  connectedCallback() {
    super.connectedCallback();
    if (!sessionStorage.getItem('preregistro_data')) globalThis.location.href = '/preregistro';
    // Recalcular si había progreso guardado
    this.validateForm();
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

          <h2>CONTACTO ALTERNO</h2>
          <div class="grid">
            <div>
              <label><span class="required">*</span> Nombre Completo: </label>
              <input name="contactoAlterno" placeholder="NOMBRE DEL CONTACTO" .value=${this.form.contactoAlterno || ''} @input=${e => this.normalizeText(e)} />
            </div>
            <div>
              <label><span class="required">*</span> No. Teléfono: </label>
              <input name="telAlterno" placeholder="(55) 1234-5678" maxlength="10" .value=${this.form.telAlterno || ''} @input=${e => this.onlyNumbers(e,10)} />
            </div>
          </div>

          <h2>DOMICILIO</h2>
          <div class="grid">
            <div>
              <label><span class="required">*</span> Municipio: </label>
              <select name="municipio" .value=${this.form.municipio || ''} @change=${e => this.handleMunicipioChange(e)}>
                <option value="">Selecciona un municipio</option>
                <option>AMEALCO DE BONFIL</option><option>ARROYO SECO</option>
                <option>CADEREYTA DE MONTES</option><option>COLÓN</option>
                <option>CORREGIDORA</option><option>EL MARQUÉS</option>
                <option>EZEQUIEL MONTES</option><option>HUIMILPAN</option>
                <option>JALPAN DE SERRA</option><option>LANDA DE MATAMOROS</option>
                <option>PEDRO ESCOBEDO</option><option>PEÑAMILLER</option>
                <option>PINAL DE AMOLES</option><option>QUERÉTARO</option>
                <option>SAN JOAQUÍN</option><option>SAN JUAN DEL RÍO</option>
                <option>TEQUISQUIAPAN</option><option>TOLIMÁN</option>
              </select>
            </div>
            <div class="short">
              <label><span class="required">*</span> C.P.: </label>
              <input type="text" name="cp" .value=${this.form.cp} @input=${e => this.onlyNumbers(e,5)} maxlength="5"
                ?disabled=${!this.form.municipio || this.form.municipio === 'QUERÉTARO'} placeholder="Ingrese código postal" />
            </div>
            <div>
              <label><span class="required">*</span> Colonia: </label>
              ${this.form.municipio === 'QUERÉTARO' ? html`
                <select name="colonia" @change=${e => this.updateField(e)}>
                  <option value="">Selecciona una colonia</option>
                  <option>JURICA</option><option>EL REFUGIO</option>
                  <option>CENTRO</option><option>MILENIO</option><option>LA PRADERA</option>
                </select>
              ` : html`<input name="colonia" placeholder="CENTRO" .value=${this.form.colonia || ''} @input=${e => this.normalizeText(e)} />`}
            </div>
            <div>
              <label><span class="required">*</span> Calle: </label>
              <input name="calle" placeholder="AV. PRINCIPAL" .value=${this.form.calle || ''} @input=${e => this.normalizeCalle(e)} />
            </div>
            <div class="short">
              <label><span class="required">*</span> No. Exterior: </label>
              <input name="exterior" placeholder="123-A" maxlength="5" .value=${this.form.exterior || ''} @input=${e => this.exteriorInteriorFormat(e)} />
            </div>
            <div class="short">
              <label>No. Interior: </label>
              <input name="interior" placeholder="A-1" maxlength="5" .value=${this.form.interior || ''} @input=${e => this.exteriorInteriorFormat(e)} />
            </div>
          </div>

          <h2>DOCUMENTACIÓN</h2>
          <div>
            <label><span class="required">*</span> Último nivel de estudios concluidos</label>
            <select name="nivelEstudios" .value=${this.form.nivelEstudios || ''} @change=${e => this.updateField(e)}>
              <option value="">Selecciona una opción</option>
              <option>SECUNDARIA</option><option>BACHILLERATO</option>
              <option>LICENCIATURA</option><option>MAESTRIA</option><option>DOCTORADO</option>
            </select>
          </div>

          <div class="radio-line">
            <div class="radio-group">
              <span class="radio-label">Certificado de Secundaria:</span>
              <label><input type="radio" name="certificadoSecundaria" value="si" .checked=${this.certificadoSecundaria === 'si'} @change=${e => { this.certificadoSecundaria = e.target.value; this.validateForm(); this.saveProgress(); }}><span>Sí</span></label>
              <label><input type="radio" name="certificadoSecundaria" value="no" .checked=${this.certificadoSecundaria === 'no'} @change=${e => { this.certificadoSecundaria = e.target.value; this.validateForm(); this.saveProgress(); }}><span>No</span></label>
            </div>
            <div class="radio-group">
              <span class="radio-label">Licencia de Conducir:</span>
              <label><input type="radio" name="licencia" value="si" .checked=${this.licencia === 'si'} @change=${e => { this.licencia = e.target.value; this.validateForm(); this.saveProgress(); }}><span>Sí</span></label>
              <label><input type="radio" name="licencia" value="no" .checked=${this.licencia === 'no'} @change=${e => { this.licencia = e.target.value; this.validateForm(); this.saveProgress(); }}><span>No</span></label>
            </div>
            <div class="radio-group">
              <span class="radio-label">Cartilla Servicio Militar:</span>
              <label><input type="radio" name="cartilla" value="si" .checked=${this.cartilla === 'si'} @change=${e => { this.cartilla = e.target.value; this.validateForm(); this.saveProgress(); }}><span>Sí</span></label>
              <label><input type="radio" name="cartilla" value="no" .checked=${this.cartilla === 'no'} @change=${e => { this.cartilla = e.target.value; this.validateForm(); this.saveProgress(); }}><span>No</span></label>
            </div>
            <div class="radio-group">
              <span class="radio-label">INE:</span>
              <label><input type="radio" name="ine" value="si" .checked=${this.ine === 'si'} @change=${() => { this.ine = 'si'; this.ineFrenteCargado = false; this.ineReversoCargado = false; this.validateForm(); this.saveProgress(); }}><span>Sí</span></label>
              <label><input type="radio" name="ine" value="no" .checked=${this.ine === 'no'} @change=${() => { this.ine = 'no'; this.ineFrenteCargado = false; this.ineReversoCargado = false; this.validateForm(); this.saveProgress(); }}><span>No</span></label>
            </div>
          </div>

          <label class="note"><span class="required">Nota: </span>En caso de indicar "SI" en INE, por favor, anexe una imagen del Anverso (Frente) y Reverso de la misma.</label>

          ${this.ine === 'si' ? html`
            <div class="docs">
              <input type="file" accept="image/*" @change=${e => this.handleIneFrente(e)} placeholder="Frente INE">
              <input type="file" accept="image/*" @change=${e => this.handleIneReverso(e)} placeholder="Reverso INE">
            </div>
          ` : ''}

          <div class="form-actions">
            <button class="btn-secundario" @click=${() => this.goBack()}>VOLVER</button>
            ${this.formValido ? html`
              <button class="btn-primario" @click=${() => this.irACorreo()}>CONTINUAR</button>
            ` : ''}
            <button class="btn-cancelar"   @click=${() => this.cancelar()}>CANCELAR</button>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('preregistro-paso2', PreregistroPaso2);