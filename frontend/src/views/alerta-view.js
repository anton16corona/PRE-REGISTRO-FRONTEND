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
    }

    @keyframes fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      width: 92%;
      max-width: 900px;
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
    .warning-redireccion {
      background: #aab4c1;
      color: #2e3032;
    }

    .warning-redireccion h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: 900;
    }

    .warning-redireccion p,
    .warning-redireccion .extra {
      text-align: center;
      font-size: 1.1rem;
      margin-top: 0.8rem;
    }

    .cards {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2rem;
      width: 100%;
    }

    .alerta {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .btn-salir {
      margin-top: 2rem;
      background: transparent;
      border: 2px solid #2e3032;
      color: #2e3032;
      padding: 0.6rem 2.5rem;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-salir:hover {
      background: rgba(0,0,0,0.08);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-top: 30px;
    }

    .card {
      background: #9faab6;
      border-radius: 18px;
      padding: 16px;
      text-align: center;
    }

    .card img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      border-radius: 14px;
    }

    .card-title {
      margin: 16px 0;
      font-size: 20px;
      font-weight: bold;
      color: white;
    }

    .card button {
      background: #0d1b3d;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
    }

    .card button:hover {
      opacity: 0.9;
    }

    .salir {
      margin-top: 30px;
      padding: 10px 28px;
      border-radius: 20px;
      border: 2px solid #333;
      background: transparent;
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
        <div class="icono">!</div>

        <div>
          <h2>${this.titulo}</h2>
          <p>${this.mensaje}</p>
          ${this.extra ? html`
            <div class="extra">${this.extra}</div>
          ` : ''}
        </div>

        ${this.boton ? html`
          <div class="acciones">
            <div class="btn" @click=${this.aceptar}>
              ${this.boton}
            </div>
          </div>
        ` : ''}

        ${this.alternativas?.length ? html`
          <div class="cards">
            ${this.alternativas.map(item => html`
              <perfil-card
                .titulo=${item.nombre}
                .imagen=${item.imagen}
                .botonTexto=${'REVISAR CONVOCATORIA'}
                @click=${() => this.redirigir(item.path)}
              ></perfil-card>
            `)}
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