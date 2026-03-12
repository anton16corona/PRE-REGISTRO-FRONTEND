import { css } from 'lit';

export const preregistroCompletadoStyles = css`

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
    }

    /* ===== MAIN ===== */
    main {
      padding: 3rem 1rem;
      display: flex;
      justify-content: center;
    }

    .panel {
      background: #ffffff;
      border-radius: 28px;
      max-width: 1200px;
      width: 100%;
      padding: 4rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,.08);
    }

    .verified {
      width: clamp(120px, 20vw, 180px);
      margin-bottom: 2rem;
    }

    .title {
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      font-weight: 600;
      color: #2e3032;
      margin-bottom: 1.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
      font-weight: 500;
      color: #2e3032;
      max-width: 750px;
      margin-bottom: 2rem;
    }

    .folio {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 600;
      color: #717173;
      margin: 1.5rem 0 2.5rem;
      letter-spacing: 2px;
    }

    .genera-cita {
      font-size: 1.2rem;
      font-weight: 500;
      color: #2e3032;
      max-width: 750px;
      margin-bottom: 3rem;
    }

    /* =============== BOTONES ================ */
    button {
      font-family: 'Montserrat', sans-serif;
      color: #ffffff;
    }

    .btn-cita {
      background: #293575;
      border-radius: 28px;
      padding: 1rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform .2s ease, box-shadow .2s ease;
    }

    .btn-cita:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,.2);
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 600px) {
      .panel {
        padding: 3rem 1.5rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 1.05rem;
      }
    }

    /* ========================= 1024px ========================= */
    @media (max-width: 1024px) {
      .panel {
        padding: 3.5rem 2rem;
        border-radius: 24px;
      }

      .subtitle,
      .genera-cita {
        max-width: 650px;
      }
    }

    /* ========================= 900px ========================= */
    @media (max-width: 900px) {
      .panel {
        padding: 3rem 1.8rem;
      }

      .verified {
        width: clamp(110px, 25vw, 160px);
      }
    }

    /* ========================= 768px ========================= */
    @media (max-width: 768px) {
      main {
        padding: 2.5rem 1rem;
      }

      .panel {
        padding: 2.5rem 1.5rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 1.1rem;
      }

      .btn-cita {
        width: 100%;
        max-width: 350px;
        font-size: 1.2rem;
        padding: 0.9rem 2rem;
      }
    }

    /* ========================= 640px ========================= */
    @media (max-width: 640px) {
      .panel {
        padding: 2.2rem 1.3rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 1rem;
      }

      .folio {
        letter-spacing: 1px;
      }
    }

    /* ========================= 480px ========================= */
    @media (max-width: 480px) {
      main {
        padding: 2rem 0.8rem;
      }

      .panel {
        padding: 2rem 1.2rem;
        border-radius: 20px;
      }

      .title {
        font-size: 1.6rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 0.95rem;
      }

      .folio {
        font-size: 2rem;
        margin: 1.2rem 0 2rem;
      }

      .btn-cita {
        font-size: 1.1rem;
        padding: 0.8rem 1.5rem;
      }
    }

    /* ========================= 360px ========================= */
    @media (max-width: 360px) {
      .panel {
        padding: 1.8rem 1rem;
      }

      .title {
        font-size: 1.4rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 0.9rem;
      }

      .folio {
        font-size: 1.8rem;
      }

      .btn-cita {
        font-size: 1rem;
      }
    }

    /* ========================= 320px ========================= */
    @media (max-width: 320px) {
      .panel {
        padding: 1.5rem 0.8rem;
        border-radius: 18px;
      }

      .title {
        font-size: 1.2rem;
      }

      .subtitle,
      .genera-cita {
        font-size: 0.85rem;
      }

      .folio {
        font-size: 1.6rem;
        letter-spacing: 0.5px;
      }

      .btn-cita {
        font-size: 0.95rem;
        padding: 0.75rem 1rem;
      }
    }
`;