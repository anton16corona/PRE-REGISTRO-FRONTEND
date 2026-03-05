import { LitElement, html, css } from 'lit';

export class AlertaView extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Montserrat', sans-serif;
    }


    /* ===== BOTÓN CERRAR X ===== */
    .btn-x {
      position: absolute;
      top: 0.8rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.4rem;
      font-weight: 900;
      cursor: pointer;
      color: inherit;
      opacity: 0.5;
      line-height: 1;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      transition: opacity 0.2s;
    }

    .btn-x:hover { opacity: 1; }

    .alerta {
      position: relative;
    }

    /* ===== OVERLAY MODAL ===== */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fade 0.25s ease;
      padding: 1rem;
      overflow-y: auto;
    }

    @keyframes fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      max-width: 1200px;
      display: flex;
      justify-content: center;
      align-items:center;
    }

    /* ===== ALERTA ===== */
    .alerta {
      border-radius: 28px;
      padding: 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      animation: aparecer 0.35s ease;
      width: 100%;
      max-width: 1200px;
      box-sizing: border-box;
    }

    slot {
      display: flex;
      justify-content: center;
    }


    .header-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      width: 100%;
    }

    .header-row .icono {
      flex-shrink: 0;
    }

    .header-row h2 {
      margin: 0;
      text-align: left;
    }

    @keyframes aparecer {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .icono {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 900;
      color: #fff;
    }

    h2 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: 900;
    }

    p {
      margin: 0.3rem 0;
      font-size: 1rem;
      line-height: 1.4;
    }

    .extra {
      font-weight: 700;
      margin-top: 0.2rem;
    }

    /* ===== VARIANTES ===== */

    .warning {
      background: #ffd2a8;
      color: #5a3300;
    }
    .warning .icono { background: #b8742a; }

    .error {
      background: #ffe3a3;
      color: #6b4b00;
    }
    .error .icono { background: #b8742a; }

    .warning-yellow {
      background: #fff3bf;
      color: #7a5a00;
    }
    .warning-yellow .icono { background: #f2c94c; color: #5c4500; }
    .warning-yellow h2 { color: #6b4e00; }
    .warning-yellow .btn { background: #f2c94c; color: #5c4500; }
    .warning-yellow .btn:hover { background: #e6b93c; }

    .warning-menor {
      background: #fff1b8;
      color: #6a4f00;
    }
    .warning-menor .icono { background: #f2b705; color: #5a4200; }
    .warning-menor h2 { color: #6a4f00; }
    .warning-menor .btn { background: #f2b705; color: #5a4200; }
    .warning-menor .btn:hover { background: #e0a800; }

    .warning-folio {
      background: #b8d3ff;
      color: #0d1924;
    }
    .warning-folio .icono { background: #729bd0; color: #0d1924; }
    .warning-folio h2 { color: #0d1924; }
    .warning-folio .btn { background: #729bd0; color: #0d1924; }
    .warning-folio .btn:hover { background: #6dacff; }

    .inexistente-folio {
      background: #ff9797;
      color: #570808;
    }
    .inexistente-folio .icono { background: #d50000; color: #570808; }
    .inexistente-folio h2 { color: #570808; }
    .inexistente-folio .btn { background: #c52020; color: #570808; }
    .inexistente-folio .btn:hover { background: #d23636; }

    .success {
      background: #d4f5a2;
      color: #2f5e1a;
    }
    .success .icono { background: #3aaa35; }
    .success h2 { color: #2f5e1a; }
    .success .btn { background: #75d072; color: #2f5e1a; }
    .success .btn:hover { background: #75d072; }

    .exito {
      background: #C8F5D8;
      color: #0A2E0F;
    }
    .exito .icono { background: #2E7D32; }
    .exito h2 { color: #0A2E0F; }
    .exito .btn { background: #1B5E20; color: #fff; }
    .exito .btn:hover { background: #2E7D32; }

    .info {
      background: #b3bcc6;
      color: #22262d;
    }
    .info .icono { background: #3c4f78; }
    .info h2 { color: #22262d; }
    .info .btn { background: #9aa0b1; color: #22262d; }
    .info .btn:hover { background: #7b7c80; }

    .bloqueado {
      background: #fff8e1;
      color: #6d4c41;
    }
    .bloqueado .icono { background: #fff3cd; color: #f9a825; }
    .bloqueado h2 { color: #e65100; }
    .bloqueado p { color: #6d4c41; }
    .bloqueado .btn { background: #f9a825; color: #fff; }
    .bloqueado .btn:hover { background: #f57c00; }

    /* ===== ACCIONES ===== */
    .acciones {
      margin-top: 0.8rem;
      text-align: center;
    }

    .btn {
      background: #a9633b;
      color: #fff;
      border-radius: 999px;
      padding: 0.7rem 2.5rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-block;
      transition: all 0.3s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }


    /* ======= ALERTA CON CONVOCATORIAS ALTERNATIVAS ======= */
    .tiene-alternativas {
      background: #ddeeff !important;
      color: #1a2e4a !important;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .tiene-alternativas .icono {
      background: #729bd0 !important;
      color: #fff !important;
      align-self: flex-start;
      flex-shrink: 0;
    }

    .tiene-alternativas .header-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      width: 100%;
    }

    .tiene-alternativas h2 {
      color: #1a2e4a !important;
      text-align: center;
      margin: 0;
      flex: 1;
    }
    .tiene-alternativas p {
      color: #1a2e4a !important;
      text-align: center;
      margin-top: 0.2rem;
    }
    .tiene-alternativas .extra {
      color: #1a2e4a !important;
      text-align: center;
    }
    .tiene-alternativas .cards-container {
      margin-top: 0.5rem;
    }
    .tiene-alternativas .acciones {
      margin-top: 0.5rem;
    }

    /* ======================= CAMBIO DE PERFIL EN CONVOCATORIA ======================= */
    .warning-redireccion {
      background: #729bd0;
      color: #fff;
      width: 100%;
      max-width: 1000px;
      height: auto;
      grid-template-columns: 1fr;
      padding: 2rem;
    }

    .warning-redireccion > div {
      grid-column: 1 / -1;
      text-align: center;
    }

    .warning-redireccion .icono { display: none; }

    .warning-redireccion h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 0.75rem;
      color: #fff;
    }

    .warning-redireccion p {
      text-align: center;
      font-size: 1.05rem;
      margin: 0.5rem 0;
      line-height: 1.5;
      color: #fff;
    }

    .warning-redireccion .extra {
      text-align: center;
      font-size: 1.05rem;
      font-weight: 700;
      margin-top: 0.6rem;
      margin-bottom: 0rem;
      color: #fff;
    }

    .cards-container {
      grid-column: 1 / -1;
      margin-top: 0;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.5rem;
    }

    .cards-container::-webkit-scrollbar { height: 10px; }
    .cards-container::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 5px; }
    .cards-container::-webkit-scrollbar-thumb { background: #2e3032; border-radius: 5px; }
    .cards-container::-webkit-scrollbar-thumb:hover { background: #1a1d1f; }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-template-rows: repeat(1fr, 3);
      grid-auto-flow: column;
      gap: 2.5rem;
      margin-top: 0;
      margin-left: 0.25rem;
      padding-bottom: 0.25rem;
      padding: 1.5rem 1rem;
      min-width: min-content;
    }

    .card {
      background: #869bb1;
      border-radius: 18px;
      padding: 0.75rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
    }

    .card img { width: 100%; height: 200px; object-fit: cover; border-radius: 14px; margin-bottom: 12px; }

    .card-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: white;
      margin: 0.5rem 0 0.8rem 0;
      text-transform: uppercase;
    }

    .card .btn-revisar {
      background: #0d1b3d;
      color: white;
      border: none;
      padding: 0.6rem 1.3rem;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .card .btn-revisar:hover { background: #1a2850; transform: translateY(-2px); }

    .btn-salir {
      margin-top: 2rem;
      background: #729bd0;
      border: 2px solid #729bd0;
      color: #fff;
      padding: 0.7rem 2.5rem;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
      align-self: center;
    }

    .btn-salir:hover { background: #5e87bf; }

    /* ======================================= RESPONSIVE ======================================= */

    @media (max-width: 1024px) {
      .alerta { max-width: 90%; }
    }

    @media (max-width: 900px) {
      .cards { gap: 1.5rem; }
    }

    @media (max-width: 768px) {
      .cards { grid-template-columns: repeat(auto-fill, 260px); grid-template-rows: auto; grid-auto-flow: row; gap: 1.2rem; }
      .card { width: 260px; }
      .card img { height: 180px; }
      .alerta { grid-template-columns: 1fr; text-align: center; padding: 2rem 1.5rem; }
      .icono { margin: 0 auto; }
      h2 { font-size: 1.4rem; }
      p, .extra { font-size: 0.95rem; }
      .acciones { margin-top: 1.2rem; }
      .warning-redireccion { min-height: auto; padding: 1.5rem; }
    }

    @media (max-width: 640px) {
      .cards { grid-auto-flow: row; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); justify-content: center; }
      .card { width: 100%; max-width: 260px; }
      .card img { height: 160px; }
    }

    @media (max-width: 480px) {
      .card { width: 220px; padding: 16px; }
      .cards { grid-template-columns: repeat(auto-fill, 220px); }
      .card img { height: 160px; }
      .card-title { font-size: 1rem; }
      .alerta { padding: 1.6rem 1.2rem; border-radius: 22px; }
      h2 { font-size: 1.2rem; }
      p { font-size: 0.9rem; }
      .btn { width: 100%; padding: 0.8rem; }
    }

    @media (max-width: 360px) {
      .alerta { border-radius: 18px; }
      h2 { font-size: 1rem; }
      p { font-size: 0.8rem; }
      .card img { height: 140px; }
    }

    @media (max-width: 320px) {
      .alerta { padding: 1.2rem 0.8rem; }
      .card img { height: 120px; }
      .card-title { font-size: 0.85rem; }
    }
  `;

  static properties = {
    tipo:          { type: String },
    titulo:        { type: String },
    mensaje:       { type: String },
    extra:         { type: String },
    boton:         { type: String },
    alternativas:  { type: Array },
    modal:         { type: Boolean },
    convocatorias: { type: Array }
  };

  constructor() {
    super();
    this.tipo          = 'warning';
    this.titulo        = '';
    this.mensaje       = '';
    this.extra         = '';
    this.boton         = '';
    this.modal         = false;
    this.alternativas  = [];
    this.convocatorias = [];
  }

  // ✅ CORREGIDO: 'aceptar' → 'alerta-aceptar'
  aceptar() {
    this.dispatchEvent(new CustomEvent('alerta-aceptar', { bubbles: true, composed: true }));
  }

  // ✅ CORREGIDO: 'cerrar' → 'alerta-cerrar'
  cerrar() {
    this.dispatchEvent(new CustomEvent('alerta-cerrar', { bubbles: true, composed: true }));
  }

  redirigir(path) {
    sessionStorage.setItem('origen_convocatoria', path);
    globalThis.location.href = path;
  }

  seleccionar(id) {
    this.dispatchEvent(new CustomEvent('seleccionar-convocatoria', { detail: id, bubbles: true, composed: true }));
  }

  render() {
    const contenido = html`
      <div class="alerta ${this.tipo} ${this.alternativas?.length ? 'tiene-alternativas' : ''}"> 
        ${this.modal ? html`
          <button class="btn-x" @click=${() => this.cerrar()}>✕</button>
        ` : ''}
        ${this.tipo === 'warning-redireccion' ? '' : html`
          <div class="header-row">
            <div class="icono">!</div>
            <div>
              <h2>${this.titulo}</h2>
            </div>
          </div>
          <p>${this.mensaje}</p>
          ${this.extra ? html`<div class="extra">${this.extra}</div>` : ''}
        `}
        ${this.tipo === 'warning-redireccion' ? html`
          <div style="text-align:center;grid-column:1/-1;">
            <h2>${this.titulo}</h2>
            <p>${this.mensaje}</p>
            ${this.extra ? html`<div class="extra">${this.extra}</div>` : ''}
          </div>
        ` : ''}

        <slot></slot>

        ${this.boton && this.tipo !== 'warning-redireccion' && !this.alternativas?.length ? html`
          <div class="acciones">
            <div class="btn" @click=${() => this.aceptar()}>
              ${this.boton}
            </div>
          </div>
        ` : ''}

        ${this.alternativas?.length ? html`
          <div class="cards-container">
            <div class="cards">
              ${this.alternativas.map(item => html`
                <div class="card">
                  <img src="${item.imagen}" alt="${item.nombre}">
                  <div class="card-title">${item.nombre}</div>
                  <button class="btn-revisar" @click=${() => this.redirigir(item.path)}>
                    REVISAR CONVOCATORIA
                  </button>
                </div>
              `)}
            </div>
          </div>
          <div class="acciones">
            <button class="btn-salir" @click=${() => this.cerrar()}>
              Salir
            </button>
          </div>
        ` : ''}
      </div>
    `;

    return this.modal
      ? html`
          <div class="overlay">
            <div class="modal">
              ${contenido}
            </div>
          </div>
        `
      : contenido;
  }
}

customElements.define('alerta-view', AlertaView);