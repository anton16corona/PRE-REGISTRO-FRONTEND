import { css } from 'lit';

export const citasGeneradaStyles = css`

  :host {
    display: block;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    background: #0a0f24;
  }

  * { box-sizing: border-box; }

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
    max-width: 900px;
    width: 100%;
    border-radius: 28px;
    padding: 4.5rem 3.5rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,.08);
  }

  .icono {
    width: 90px;
    height: 90px;
    background: #4caf50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .icono svg {
    width: 48px;
    height: 48px;
    fill: #fff;
  }

  .titulo {
    font-size: clamp(2.4rem, 3vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 1rem;
    color: #2e3032;
  }

  .folio {
    font-size: clamp(1.7rem, 2.2vw, 2.1rem);
    font-weight: 700;
    margin-bottom: 2rem;
    color: #4a4a4a;
  }

  .texto {
    font-size: 1.25rem;
    max-width: 680px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
    color: #3a3a3a;
  }

  .acciones {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }

  .btn {
    width: 260px;
    height: 52px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;
    font-size: 1.15rem;
    letter-spacing: 0.4px;
  }

  .btn.primario {
    background: #4caf50;
    color: #fff;
  }

  .btn.secundario {
    background: #b87333;
    color: #fff;
  }
`;