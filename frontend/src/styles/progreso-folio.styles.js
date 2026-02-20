import { css } from 'lit';

export const progresoFolioStyles = css`

  :host {
    display: block;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    background: #0a0f24;
  }

  .fondo {
    background: #f2efe9;
    min-height: calc(100vh - 130px);
    display: flex;
    justify-content: center;
    padding: 3rem 1rem;
  }

  .card {
    background: #fff;
    max-width: 1100px;
    width: 100%;
    border-radius: 24px;
    padding: 3rem;
    animation: slideUpFade 0.45s ease-out;
  }

  h2 {
    text-align: center;
    font-weight: 900;
    margin-bottom: 2rem;
    color: #2e3032;
    font-size: clamp(1.4rem, 4.5vw, 2rem);
    line-height: 1.25;
  }

  .folio-title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    font-size: 2rem;
    font-weight: 900;
    color: #2e3032;
    flex-wrap: wrap;
    text-align: center;
  }

  .folio {
    color: #465f9a;
    font-weight: 900;
    letter-spacing: 1px;
    word-break: break-all;
    font-size: clamp(1.2rem, 4vw, 2rem);
  }

  .progress {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 3rem;
  }

  .progress::before {
    content: '';
    position: absolute;
    top: 22px;
    left: 0;
    right: 0;
    height: 4px;
    background: #d1cfcd;
    z-index: 0;
  }

  .progress-bar {
    position: absolute;
    top: 22px;
    left: 0;
    height: 4px;
    background: #80c87a;
    width: 0%;
    transition: width 0.6s ease;
    z-index: 1;
  }

  .step {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 20%;
  }

  .circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #d1cfcd;
    margin: 0 auto 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    transition: background 0.4s ease;
  }

  .step.active .circle {
    background: #80c87a;
    color: #fff;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #2e3032;
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
    color: #2e3032;
  }

  .box {
    background: #f5f5f5;
    border-radius: 16px;
    padding: 1.5rem;
  }

  .box h4 {
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    color: #2e3032;
  }

  .box p {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #2e3032;
  }

  .acciones {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }

  .btn {
    width: 220px;
    height: 44px;
    background: #465f9a;
    color: #fff;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;
  }

  .step.en-proceso .circle
  {
    background:#5da9ff;
    transform:scale(1.2);
  }

  .step.aprobado .circle
  {
    background:#80c87a;
    color:white;
  }

  .step.bloqueado
  {
    opacity:0.4;
    pointer-events:auto;
  }

  .box.bloqueado
  {
    background:#e0e0e0;
    color:#999;
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

  @media (max-width: 900px) {
    .info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .card {
      padding: 2rem 1.5rem;
    }

    .progress {
      gap: 0.5rem;
    }

    .circle {
      width: 36px;
      height: 36px;
      font-size: 0.85rem;
    }

    .label {
      font-size: 0.65rem;
      line-height: 1.2;
    }

    .box {
      padding: 1.2rem;
    }

    .box h4 {
      font-size: 1rem;
    }

    .box p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    .btn {
      width: 100%;
      max-width: 280px;
    }
  }

  @media (max-width: 420px) {
    .card {
      padding: 1.5rem 1rem;
    }
  }

`;