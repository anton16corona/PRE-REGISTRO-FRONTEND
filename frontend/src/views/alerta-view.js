import { LitElement, html, css } from 'lit';

export class AlertaView extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Montserrat', sans-serif;
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

      padding: 1rem;              /* evita que choque con bordes */
      overflow-y: auto;           /* permite scroll en pantallas pequeñas */
    }

    @keyframes fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      max-width: 1200px;
      display: flex;
      justify-content: center;
    }

    /* ===== ALERTA ===== */
    .alerta {
      border-radius: 28px;
      padding: 2.5rem 3rem;
      display: grid;
      grid-template-columns: 90px 1fr;
      gap: 2rem;
      align-items: center;
      animation: aparecer 0.35s ease;
      width: 100%;
      max-width: 1200px;
      box-sizing: border-box;
    }

    @keyframes aparecer {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .icono {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 900;
      color: #fff;
    }

    h2 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: 900;
    }

    p {
      margin: 0.8rem 0;
      font-size: 1rem;
      line-height: 1.4;
    }

    .extra {
      font-weight: 700;
      margin-top: 0.6rem;
    }

    /* ===== VARIANTES ===== */

    /* 🔴 WARNING / ALERTA ROJA */
    .warning {
      background: #ffd2a8;
      color: #5a3300;
    }
    .warning .icono {
      background: #b8742a;
    }

    /* 🟡 ERROR */
    .error {
      background: #ffe3a3;
      color: #6b4b00;
    }
    .error .icono {
      background: #b8742a;
    }

    /* ===== ACCIONES ===== */
    .acciones {
      grid-column: 1 / -1;
      margin-top: 1.5rem;
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
    }

    /* WARNING AMARILLO PERSONALIZADO */
    .warning-yellow {
      background: #fff3bf;       /* fondo amarillo suave */
      color: #7a5a00;            /* texto oscuro cálido */
    }

    .warning-yellow .icono {
      background: #f2c94c;       /* círculo del icono */
      color: #5c4500;
    }

    .warning-yellow h2 {
      color: #6b4e00;
    }

    .warning-yellow .btn {
      background: #f2c94c;       /* botón amarillo */
      color: #5c4500;
    }

    .warning-yellow .btn:hover {
      background: #e6b93c;
    }

    /* MENOR DE EDAD */
    .warning-menor {
      background: #fff1b8;
      color: #6a4f00;
    }

    .warning-menor .icono {
      background: #f2b705;
      color: #5a4200;
    }

    .warning-menor h2 {
      color: #6a4f00;
    }

    .warning-menor .btn {
      background: #f2b705;
      color: #5a4200;
    }

    .warning-menor .btn:hover {
      background: #e0a800;
    }

    /* FOLIO INCOMPLETO */
    .warning-folio {
      background: #b8d3ff;
      color: #0d1924;
    }

    .warning-folio .icono {
      background: #729bd0;
      color: #0d1924;
    }

    .warning-folio h2 {
      color: #0d1924;
    }

    .warning-folio .btn {
      background: #729bd0;
      color: #0d1924;
    }

    .warning-folio .btn:hover {
      background: #6dacff;
    }

    /* FOLIO INEXISTENTE */
    .inexistente-folio {
      background: #ff9797;
      color: #570808;
    }

    .inexistente-folio .icono {
      background: #d50000;
      color: #570808;
    }

    .inexistente-folio h2 {
      color: #570808;
    }

    .inexistente-folio .btn {
      background: #c52020;
      color: #570808;
    }

    .inexistente-folio .btn:hover {
      background: #d23636;
    }

    /* 🟢 SUCCESS */
    .success {
      background: #d4f5a2;
      color: #2f5e1a;
    }
    .success .icono {
      background: #3aaa35;
    }

    .success h2 {
      color: #2f5e1a;
    }

    .success .btn {
      background: #75d072;
      color: #2f5e1a;
    }

    .success .btn:hover {
      background: #75d072;
    }

    /* 🔵 INFO */
    .info {
      background: #b3bcc6;
      color: #22262d;
    }
    .info .icono {
      background: #3c4f78;
    }

    .info h2 {
      color: #22262d;
    }

    .info .btn {
      background: #9aa0b1;
      color: #22262d;
    }

    .info .btn:hover {
      background: #7b7c80;
    }

    /* ======================= CAMBIO DE PERFIL EN CONVOCATORIA ======================= */
    /* Panel principal, el grande del de cambio de convocatoria. */
    .warning-redireccion {
      background: #aab4c1;
      color: #2e3032;
      width: 100%;
      max-width: 1000px;
      height: 700px;
      min-height: 70vh;
      grid-template-columns: 1fr;
      padding: 2rem;
    }

    .warning-redireccion .icono {
      display: none;
    }

    .warning-redireccion h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 0.75rem;
      color: #2e3032;
    }

    .warning-redireccion p {
      text-align: center;
      font-size: 1.05rem;
      margin: 0.5rem 0;
      line-height: 1.5;
    }

    .warning-redireccion .extra {
      text-align: center;
      font-size: 1.05rem;
      font-weight: 700;
      margin-top: 0.6rem;
      margin-bottom: 0rem;
    }

    .cards-container {
      margin-top: 0rem;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.5rem;
    }

    /* Estilos para el scrollbar */
    .cards-container::-webkit-scrollbar {
      height: 10px;
    }

    .cards-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }

    .cards-container::-webkit-scrollbar-thumb {
      background: #2e3032;
      border-radius: 5px;
    }

    .cards-container::-webkit-scrollbar-thumb:hover {
      background: #1a1d1f;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-template-rows: repeat(1fr, 3);
      grid-auto-flow: column;
      gap: 2.5rem;
      margin-top: 1.5rem;
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

    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 14px;
      margin-bottom: 12px;
    }

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

    .card .btn-revisar:hover {
      background: #1a2850;
      transform: translateY(-2px);
    }

    .btn-salir {
      margin-top: 2rem;
      background: transparent;
      border: 2px solid #2e3032;
      color: #2e3032;
      padding: 0.7rem 2.5rem;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
      align-self: center;
    }

    .btn-salir:hover {
      background: rgba(0,0,0,0.08);
    }

    /* ======================================= RESPONSIVE ======================================= */
    /* ============ AJUSTES DE TAMAÑO PARA DIVERSOS DISPOSITIVOS MÓVILES COMPATIBILIDAD ========== */

    /* ================= PARA 768 PX ================== */
    @media (max-width: 768px) {
      .cards {
        grid-template-columns: repeat(auto-fill, 260px);
        grid-template-rows: auto;
        grid-auto-flow: row;
        gap: 1.2rem;
      }

      .card {
        width: 260px;
      }

      .card img {
        height: 180px;
      }
      
      .warning-redireccion .alerta {
        padding: 2rem 1.5rem;
      }

      .alerta {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 2rem 1.5rem;
      }

      .icono {
        margin: 0 auto;
      }

      h2 {
        font-size: 1.4rem;
      }

      p, .extra {
        font-size: 0.95rem;
      }

      .acciones {
        margin-top: 1.2rem;
      }

      .warning-redireccion {
        min-height: auto;
        padding: 1.5rem;
      }
    }

    /* ================= PARA 480 PX ================== */
    @media (max-width: 480px) {
      .card {
        width: 220px;
        padding: 16px;
      }

      .cards {
        grid-template-columns: repeat(auto-fill, 220px);
      }

      .card img {
        height: 160px;
      }

      .card-title {
        font-size: 1rem;
      }

      .alerta {
        padding: 1.6rem 1.2rem;
        border-radius: 22px;
      }

      h2 {
        font-size: 1.2rem;
      }

      p {
        font-size: 0.9rem;
      }

      .btn {
        width: 100%;
        padding: 0.8rem;
      }
    }
  `;

  static properties = {
    tipo: { type: String },
    titulo: { type: String },
    mensaje: { type: String },
    extra: { type: String },
    boton: { type: String },
    alternativas: { type: Array },
    modal: { type: Boolean },
    convocatorias: { type: Array }
  };

  constructor() {
    super();
    this.tipo = 'warning';
    this.titulo = '';
    this.mensaje = '';
    this.extra = '';
    this.boton = '';
    this.modal = false;
    this.alternativas = [];
    this.convocatorias = [];
  }

  aceptar() {
    this.dispatchEvent(
      new CustomEvent('aceptar', {
        bubbles: true,
        composed: true
      })
    );
  }

  redirigir(path) {
    sessionStorage.setItem('origen_convocatoria', path);
    globalThis.location.href = path;
  }

  seleccionar(id) {
    this.dispatchEvent(new CustomEvent('seleccionar-convocatoria', {
      detail: id,
      bubbles: true,
      composed: true
    }));
  }

  cerrar() {
    this.dispatchEvent(new CustomEvent('cerrar', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const contenido = html`
      <div class="alerta ${this.tipo}">
        ${this.tipo !== 'warning-redireccion' ? html`
          <div class="icono">!</div>
        ` : ''}

        <div>
          <h2>${this.titulo}</h2>
          <p>${this.mensaje}</p>
          ${this.extra ? html`
            <div class="extra">${this.extra}</div>
          ` : ''}
        </div>

        <slot></slot>

        ${this.boton && this.tipo !== 'warning-redireccion' ? html`
          <div class="acciones">
            <div class="btn" @click=${this.aceptar}>
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
        ` : ''}

        ${this.tipo === 'warning-redireccion' ? html`
          <div class="acciones">
            <button class="btn-salir" @click=${this.cerrar}>
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