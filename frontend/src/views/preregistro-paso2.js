import { LitElement, html, css } from 'lit';

export class PreregistroPaso2 extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
      color: #2e3032;
    }

    /* ================= HEADER ================= */
    header {
      background: #0a0f24;
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 1rem 2rem;
    }

    header img {
      width: clamp(55px, 8vw, 90px);
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
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

    /* ===== LABELS ===== */
    label {
      font-weight: 500;
      font-size: 0.95rem;
    }

    /* ===== INPUT UNDERLINE ===== */
    input {
      background: transparent;
      border: none;
      border-bottom: 1px solid #000;
      padding: 6px 2px;
      outline: none;

      // ----- FUENTE DE LOS INPUT ------
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #000;
    }

    input::placeholder {
      color: #6b7280;
    }

    select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 14px;
      border: 1px solid rgba(0,0,0,0.25);
      background: rgba(255,255,255,0.6);
      backdrop-filter: blur(3px);
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      color: #000;
      outline: none;
      cursor: pointer;
    }

    select:focus {
      border-color: #7aa7c8;
    }

    /* ===== RADIO LINE ===== */
    .radio-line {
      display: flex;
      gap: 4rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .radio-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .radio-label {
      font-weight: 600;
      margin-right: 0.5rem;
    }
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

    .radio-section {
      margin-top: 3rem;
    }

    .radio-title {
      display: block;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    /* ================= CARGA DE DOCUMENTOS (SOLO INE POR EL MOMENTO) ================= */
    .docs {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .doc-box {
      width: 260px;
      height: 150px;
      background: #e5e5e5;
      border-radius: 8px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .doc-box input {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    .doc-label {
      text-align: center;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    /* ================= SECCIÓN DE BOTONES ================= */
    .actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;
    }

    button {
      font-family: 'Montserrat', sans-serif;
    }

    /* ----------- FORMATO DE LOS BOTONES ------------- */
    button {
      font-family: 'Montserrat', sans-serif;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;

      /* ----------- FUENTE ------------- */
      font-family: 'Montserrat', sans-serif;
      font-weight:600;
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

    .btn-cancelar {
      background: #d73f3f;
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

    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 1024 PX -------------*/
    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
    }

    /* ------------- 900 PX -------------*/
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    /* ------------- 768 PX -------------*/
    @media (max-width: 768px) {
      .radio-line {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }

      .radio-group {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }

    /* ------------- 640 PX -------------*/
    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      input {
        font-size: 1.05rem;
        padding: 8px 2px;
      }

      select {
        font-size: 1.05rem;
        padding: 12px;
      }

      label {
        font-size: 1rem;
      }

      .docs {
        flex-direction: column;
        align-items: center;
      }

      .doc-box {
        width: 90%;
        max-width: 280px;
      }

      .form-actions {
        flex-direction: column;
        gap: 1rem;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
        font-size: 1.2rem;
      }
    }
  `;

  /* ============================================= JAVASCRIPT ============================================= */
  static properties = {
    form: { state: true },
    formValido: { state: true },
    ineFrenteCargado: { state: true },
    ineReversoCargado: { state: true },
    nombreAlterno: { type: String },
    telefonoAlterno: { type: String },
    ine: { type: String }
  };

  constructor() {
    super();
    this.form = {};
    this.formValido = false;
    this.ineFrenteCargado = false;
    this.ineReversoCargado = false;
    this.nombreAlterno = '';
    this.telefonoAlterno = '';
    this.ine = 'no';
  }

  /* ================== UTILIDADES ================== */

  updateField(e) {
    this.form[e.target.name] = e.target.value;
    this.validateForm();
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

  /* ================== INE ================== */

  handleIneFrente(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.ineFrenteCargado = true;
    }
  }

  handleIneReverso(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.ineReversoCargado = true;
    }
  }

  get ineValido() {
    return this.ine !== 'si' || (this.ineFrenteCargado && this.ineReversoCargado);
  }

  /* ================== VALIDACIÓN GENERAL ================== */

  validateForm() {
    const f = this.form;

    this.formValido =
      f.municipio &&
      f.cp?.length === 5 &&
      f.colonia &&
      f.calle &&
      f.exterior &&
      f.nivelEstudios &&
      f.contactoAlterno &&
      f.telAlterno?.length === 10 &&
      this.ineValido;
  }

  /* ================== NAVEGACIÓN ================== */

  goBack() {
    globalThis.location.href = '/preregistro';
  }

  irACorreo() {
    sessionStorage.setItem('preregistro_parte2', JSON.stringify(this.form));
    globalThis.location.href = '/preregistro-envio';
  }

  /* ================== BOTÓN DE CANCELACIÓN ================== */
  cancelar() {
    sessionStorage.clear();
    globalThis.location.href = '/convocatoria';
  }

  /* ========================================= HTML ======================================== */
  render() {
    return html`
      <header>
        <img src="/src/assets/SSPlogo.png" />
        <div class="ipes">INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES</div>
        <img src="/src/assets/IPESlogo.png" />
      </header>

      <main>
        <div class="card">
          <h1>PRE-REGISTRO</h1>
          <p class="subtitle">Completa los campos solicitados con la información requerida</p>

          <h2>CONTACTO ALTERNO</h2>
          <div class="grid">
            <div>
              <label>* Nombre del contacto alterno: </label>
              <input name="contactoAlterno" placeholder="NOMBRE CONTACTO ALTERNO"
                @input=${this.normalizeText}>
            </div>

            <div>
              <label>* Teléfono alterno: </label>
              <input name="telAlterno" maxlength="10"
                placeholder="(442) 123 4567"
                @input=${e => this.onlyNumbers(e, 10)}>
            </div>
          </div>

          <h2>DATOS PERSONALES COMPLEMENTARIOS</h2>

          <div class="section-title">LUGAR DE RESIDENCIA ACTUAL</div>

          <div class="grid">
            <div>
              <label><span class="required">*</span> Municipio: </label>
              <select name="municipio" @change=${this.updateField}>
                <option value="">Selecciona un municipio: </option>
                ${[
                  'AMEALCO','ARROYO SECO','CADEREYTA','COLÓN','CORREGIDORA',
                  'EL MARQUÉS','EZEQUIEL MONTES','HUIMILPAN','JALPAN',
                  'LANDA DE MATAMOROS','PEDRO ESCOBEDO','PEÑAMILLER',
                  'PINAL DE AMOLES','QUERÉTARO','SAN JOAQUÍN',
                  'SAN JUAN DEL RÍO','TEQUISQUIAPAN','TOLIMÁN'
                ].map(m => html`<option>${m}</option>`)}
              </select>
            </div>

            <div class="short">
              <label><span class="required">*</span> C.P. : </label>
              <input name="cp" placeholder="76000" maxlength="5" @input=${e => this.onlyNumbers(e,5)} />
            </div>

            <div>
              <label><span class="required">*</span> Colonia: </label>
              <input name="colonia" placeholder="CENTRO" @input=${this.normalizeText} />
            </div>

            <div>
              <label><span class="required">*</span> Calle: </label>
              <input name="calle" placeholder="AV PRINCIPAL" @input=${this.normalizeText} />
            </div>

            <div class="short">
              <label><span class="required">*</span> No. Exterior: </label>
              <input name="exterior" placeholder="123" maxlength="5" @input=${e => this.onlyNumbers(e,5)} />
            </div>

            <div class="short">
              <label>No. Interior: </label>
              <input placeholder="A-1"
                maxlength="5"
                @input=${this.interiorFormat} />
            </div>
          </div>

          <h2>DOCUMENTACIÓN</h2>
          <div>
            <label>* Último nivel de estudios concluidos</label>
            <select name="nivelEstudios" @change=${this.updateField}>
              <option value="">Selecciona una opción</option>
              <option>SIN ESTUDIOS</option>
              <option>PRIMARIA</option>
              <option>SECUNDARIA</option>
              <option>MEDIA SUPERIOR</option>
              <option>EDUCACIÓN SUPERIOR</option>
              <option>POSGRADO</option>
            </select>
          </div>

          <div class="radio-section">
            <label class="radio-title">
              <span class="required">*</span>
              ¿Cuenta con los siguientes documentos oficiales?
            </label>

            <div class="radio-line">
              <div class="radio-group">
                <span class="radio-label">Licencia:</span>
                <label><input type="radio" name="licencia"><span>Sí</span></label>
                <label><input type="radio" name="licencia"><span>No</span></label>
              </div>

              <div class="radio-group">
                <span class="radio-label">Cartilla:</span>
                <label><input type="radio" name="cartilla"><span>Sí</span></label>
                <label><input type="radio" name="cartilla"><span>No</span></label>
              </div>

              <div class="radio-group">
                <span class="radio-label">INE:</span>
                <label><input type="radio" name="ine" @change=${() => { this.ine = 'si'; this.ineFrenteCargado = false; this.ineReversoCargado = false; }}><span>Sí</span></label>
                <label><input type="radio" name="ine" checked @change=${() => { this.ine = 'no'; this.ineFrenteCargado = false; this.ineReversoCargado = false;}}><span>No</span></label>
              </div>
            </div>
          </div>

          <label class="note">
            <span class="required">Nota: </span>
            En caso de indicar "SI" en INE, por favor, anexe una imagen del Anverso (Frente) y Reverso de la misma.
          </label>

          <!-- INE -->
          ${this.ine === 'si' ? html`
            <div class="docs">
              <input type="file" accept="image/*" @change=${this.handleIneFrente}>
              <input type="file" accept="image/*" @change=${this.handleIneReverso}>
            </div>
          ` : ''}
            <div class="form-actions">
              <button class="btn-secundario" @click=${this.goBack}>VOLVER</button>
                <button class="btn-cancelar" @click=${this.cancelar}>CANCELAR</button>
              <button class="btn-primario"
                ?disabled=${!this.formValido}
                @click=${this.irACorreo}>
                CONTINUAR
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('preregistro-paso2', PreregistroPaso2);