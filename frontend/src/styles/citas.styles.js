import { css } from 'lit';

export const citasStyles = css`

    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
    }

    * {
      box-sizing: border-box;
    }

    /* ===== CONTENEDOR ===== */
    .fondo {
      min-height: calc(100vh - 120px);
      background: #f2efe9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(2rem, 4vw, 4rem) 1rem;
    }

    /* ===== CARD ===== */
    .card {
      background: #ffffff;
      width: 100%;
      max-width: 920px;
      border-radius: clamp(14px, 2vw, 22px);
      padding: clamp(2.5rem, 5vw, 4rem);
      text-align: center;
    }

    .folio {
      font-size: clamp(0.85rem, 1vw, 1rem);
      text-align: right;
      margin-bottom: 1rem;
      color: #2e3032;
    }

    .folio span {
      color: #6f6f6f;
      font-weight: 500;
    }

    .titulo {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: #2e3032;
    }

    .texto {
      font-size: clamp(0.85rem, 1.1vw, 1rem);
      margin-bottom: 1.5rem;
      color: #3a3a3a;
    }

    .direccion {
      font-size: clamp(0.95rem, 1.2vw, 1.1rem);
      font-weight: 700;
      margin-bottom: 2rem;
      color: #2e3032;
    }

    .lista {
      text-align: left;
      font-size: clamp(0.8rem, 1vw, 0.95rem);
      margin-bottom: 2.5rem;
      color: #2e3032;
    }

    .lista ul {
      padding-left: 1.2rem;
      margin-bottom: 0.75rem;
    }

    .lista li {
      margin-bottom: 0.4rem;
    }

    .btn {
      margin: 0 auto;
      width: clamp(180px, 25vw, 240px);
      height: clamp(42px, 6vw, 48px);
      background: #b79a57;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(0.85rem, 1vw, 1rem);
      font-weight: 600;
      cursor: pointer;
      color: #000;
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
`;