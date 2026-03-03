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
      font-family: 'Consolas', monospace;
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      color: #2e3032;
    }

    .folio-linea input,
    .folio-linea select {
      font-family: inherit;
      font-size: inherit;
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid #bbb;
      text-align: center;
      color: #2e3032;
      background: #ffffff;
    }

    .folio-linea input {
      width: 90px;
      color: #2e3032;
    }

    .form-actions {
      margin-top: 1rem;

      /* ----------- FUENTE ------------- */
      font-family: 'Montserrat', sans-serif;
      font-weight:600;
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

/* ===================== CARRUSEL DE FOTOS ================== */
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
        transition: transform 0.6s ease-in-out; /* movimiento suave */
    }

    .carousel-image {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        object-fit: cover;
        border-radius: 18px;
    }

  /* ============== 🎬 ANIMACIÓN DE ENTRADA SUTIL ============== */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fadeInUp 0.5s ease-out;
  }

  /* ===== 1024px ===== */
  @media (max-width: 1024px) {
    .card {
      padding: 3rem 2rem;
    }
  }

  /* ===== 900px ===== */
  @media (max-width: 900px) {
    .carousel {
      height: 230px;
    }
  }

  /* ===== 768px ===== */
  @media (max-width: 768px) {
    .card {
      padding: 2.5rem 1.5rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 0.95rem;
    }

    .folio-linea {
      font-size: 1.2rem;
    }

    .btn {
      width: 100%;
    }
  }

  /* ===== 640px ===== */
  @media (max-width: 640px) {
    .carousel {
      height: 200px;
    }

    .folio-linea input {
      width: 70px;
    }
  }

  /* ===== 480px ===== */
  @media (max-width: 480px) {
    .card {
      padding: 2rem 1rem;
      border-radius: 18px;
    }

    h2 {
      font-size: 1.5rem;
    }

    .folio-linea {
      font-size: 1rem;
      gap: .4rem;
    }

    .btn-secundario {
      width: 100%;
      padding: 0.8rem;
      font-size: 1rem;
    }

    .carousel {
      height: 180px;
    }
  }

  /* ===== 360px ===== */
  @media (max-width: 360px) {
    .folio-linea input {
      width: 60px;
      font-size: 0.9rem;
    }

    .carousel {
      height: 160px;
    }
  }

  /* ===== 320px ===== */
  @media (max-width: 320px) {
    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.85rem;
    }

    .folio-linea {
      font-size: 0.9rem;
    }

    .carousel {
      height: 140px;
    }
  }
`;