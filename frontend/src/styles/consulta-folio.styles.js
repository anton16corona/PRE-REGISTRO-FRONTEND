import { css } from 'lit';

export const consultaFolioStyles = css`

    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #0a0f24;
      width: 100%;
      overflow-x: hidden;
    }

    .fondo {
      background: #f2efe9;
      min-height: calc(100vh - 130px);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      max-width: 1200px;
      width: 100%;
      border-radius: 28px;
      padding: 4rem 3rem;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,.08);
    }

    h2 {
      font-size: clamp(2rem, 3vw, 2.6rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color:#0d253a;
    }

    p {
      font-size: 1.05rem;
      max-width: 720px;
      margin: 0 auto 3rem;
      color: #2e3032;
    }

    /* ===== FOLIO INPUT ===== */
    .folio-linea {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .6rem;
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      color: #2e3032;
    }

    /* Texto fijo (prefijo SSPMQ/IPES/...) */
    .folio-linea .folio-fijo {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      font-size: 1.6rem;
      letter-spacing: 0.03em;
      color: #0d253a;
      text-transform: uppercase;
    }

    /* Separadores / */
    .folio-linea .folio-sep {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      font-size: 1.6rem;
      color: #0d253a;
    }

    .folio-linea input,
    .folio-linea select {
      font-family: 'Consolas', monospace;
      font-size: 1.5rem;
      padding: 6px 10px;
      border-radius: 10px;
      border: 1.5px solid #d0d5dd;
      text-align: center;
      color: #0d1117;
      background: #f8f9fb;
      transition: border-color 0.2s, background 0.2s;
    }

    .folio-linea input:focus,
    .folio-linea select:focus {
      border-color: #285dc0;
      background: #ffffff;
      outline: none;
    }

    .folio-linea input::placeholder {
      color: rgba(13, 17, 23, 0.25);
    }

    /* Cuando el input está vacío se ve más tenue */
    .folio-linea input:placeholder-shown,
    .folio-linea select:not(:valid) {
      color: #b0b8c4;
      background: #f2f4f8;
      border-color: #e2e6ec;
    }

    .folio-linea input {
      width: 90px;
    }

    .form-actions {
      margin-top: 1rem;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }

    button {
      font-family: 'Montserrat', sans-serif;
    }

    .btn-secundario {
      background: #d7a23f;
      color: #fff;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1rem;
    }

    .btn {
      width: 260px;
      height: 48px;
      background: #285dc0;
      border-radius: 999px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
    }

    /* ===================== CARRUSEL ==================== */
    .carousel {
      position: relative;
      width: 100%;
      max-width: 700px;
      height: 270px;
      margin: 3rem auto 0;
      overflow: hidden;
      border-radius: 18px;
    }

    .carousel-track {
      display: flex;
      height: 100%;
      transition: transform 0.6s ease-in-out;
    }

    .carousel-image {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      object-fit: cover;
      border-radius: 18px;
    }

    /* ============== ANIMACIÓN DE ENTRADA ============== */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .animate-in {
      animation: fadeInUp 0.5s ease-out;
    }

    /* ================================================== */
    /* ================== BREAKPOINTS =================== */
    /* ================================================== */

    /* ── 1024px ── */
    @media (max-width: 1024px) {
      .card {
        padding: 3rem 2.5rem;
        border-radius: 24px;
      }
      .carousel {
        max-width: 600px;
        height: 240px;
      }
    }

    /* ── 900px ── */
    @media (max-width: 900px) {
      .card {
        padding: 2.5rem 2rem;
        border-radius: 22px;
      }
      .folio-linea {
        font-size: 1.3rem;
        gap: 0.5rem;
      }
      .folio-linea .folio-fijo,
      .folio-linea .folio-sep {
        font-size: 1.4rem;
      }
      .folio-linea input,
      .folio-linea select {
        font-size: 1.3rem;
      }
      .folio-linea input {
        width: 80px;
      }
      .carousel {
        max-width: 520px;
        height: 210px;
      }
    }

    /* ── 768px ── */
    @media (max-width: 768px) {
      .fondo {
        padding: 2rem 0.8rem;
      }
      .card {
        padding: 2rem 1.5rem;
        border-radius: 20px;
      }
      h2 {
        font-size: 1.7rem;
      }
      p {
        font-size: 0.95rem;
        margin-bottom: 2rem;
      }
      .folio-linea {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
      .folio-linea .folio-fijo,
      .folio-linea .folio-sep {
        font-size: 1.25rem;
      }
      .folio-linea input,
      .folio-linea select {
        font-size: 1.2rem;
      }
      .btn {
        width: 100%;
        max-width: 320px;
        font-size: 1rem;
      }
      .btn-secundario {
        width: 100%;
        max-width: 320px;
        font-size: 1.05rem;
        padding: 0.8rem 2rem;
      }
      .carousel {
        max-width: 100%;
        height: 200px;
        margin-top: 2rem;
      }
    }

    /* ── 640px ── */
    @media (max-width: 640px) {
      .card {
        padding: 1.8rem 1.2rem;
        border-radius: 18px;
      }
      h2 {
        font-size: 1.5rem;
      }
      p {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
      }
      .folio-linea {
        font-size: 1.05rem;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
      }
      .folio-linea .folio-fijo,
      .folio-linea .folio-sep {
        font-size: 1.1rem;
      }
      .folio-linea input,
      .folio-linea select {
        font-size: 1.05rem;
      }
      .folio-linea input {
        width: 70px;
        padding: 5px 8px;
      }
      .folio-linea select {
        padding: 5px 6px;
      }
      .form-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      .btn {
        width: 100%;
        max-width: 100%;
        font-size: 0.95rem;
      }
      .btn-secundario {
        width: 100%;
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
      }
      .carousel {
        height: 180px;
        border-radius: 14px;
      }
      .carousel-image {
        border-radius: 14px;
      }
    }

    /* ── 480px ── */
    @media (max-width: 480px) {
      .fondo {
        padding: 1.5rem 0.6rem;
        align-items: flex-start;
      }
      .card {
        padding: 1.5rem 1rem;
        border-radius: 16px;
      }
      h2 {
        font-size: 1.3rem;
      }
      p {
        font-size: 0.85rem;
        margin-bottom: 1.2rem;
      }
      .folio-linea {
        font-size: 0.95rem;
        gap: 0.3rem;
        margin-bottom: 1.2rem;
      }
      .folio-linea input {
        width: 60px;
        padding: 4px 6px;
      }
      .btn {
        height: 44px;
        font-size: 0.9rem;
      }
      .btn-secundario {
        font-size: 0.9rem;
        padding: 0.7rem 1.2rem;
      }
      .carousel {
        height: 160px;
        border-radius: 12px;
        margin-top: 1.5rem;
      }
      .carousel-image {
        border-radius: 12px;
      }
    }

    /* ── 360px ── */
    @media (max-width: 360px) {
      .card {
        padding: 1.2rem 0.9rem;
        border-radius: 14px;
      }
      h2 {
        font-size: 1.15rem;
      }
      p {
        font-size: 0.8rem;
      }
      .folio-linea {
        font-size: 0.88rem;
        gap: 0.25rem;
        margin-bottom: 1rem;
      }
      .folio-linea input {
        width: 54px;
        padding: 4px 5px;
        border-radius: 8px;
      }
      .folio-linea select {
        padding: 4px 4px;
        border-radius: 8px;
      }
      .btn {
        height: 42px;
        font-size: 0.85rem;
        border-radius: 999px;
      }
      .btn-secundario {
        font-size: 0.85rem;
        padding: 0.65rem 1rem;
        border-radius: 22px;
      }
      .carousel {
        height: 140px;
        border-radius: 10px;
        margin-top: 1.2rem;
      }
      .carousel-image {
        border-radius: 10px;
      }
    }

    /* ── 320px ── */
    @media (max-width: 320px) {
      .fondo {
        padding: 1rem 0.4rem;
      }
      .card {
        padding: 1rem 0.8rem;
        border-radius: 12px;
      }
      h2 {
        font-size: 1rem;
      }
      p {
        font-size: 0.76rem;
        margin-bottom: 1rem;
      }
      .folio-linea {
        font-size: 0.8rem;
        gap: 0.2rem;
        margin-bottom: 0.9rem;
      }
      .folio-linea input {
        width: 48px;
        padding: 3px 4px;
        font-size: 0.8rem;
      }
      .folio-linea select {
        padding: 3px 3px;
        font-size: 0.8rem;
      }
      .btn {
        height: 40px;
        font-size: 0.8rem;
      }
      .btn-secundario {
        font-size: 0.8rem;
        padding: 0.6rem 0.9rem;
      }
      .carousel {
        height: 120px;
        border-radius: 8px;
        margin-top: 1rem;
      }
      .carousel-image {
        border-radius: 8px;
      }
    }
`;