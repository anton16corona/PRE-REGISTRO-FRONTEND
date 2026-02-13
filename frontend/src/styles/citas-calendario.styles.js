import { css } from 'lit';

export const citasCalendarioStyles = css`
    
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
      max-width: 980px;
      width: 100%;
      border-radius: 24px;
      padding: 3rem;
    }

    .titulo {
      text-align: center;
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 2rem;
      color: #2e3032;
    }

    .contenido {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 2.5rem;
      align-items: flex-start;
    }

    .semana {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.7rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #2e3032;
    }

    .dias {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      margin-bottom: 1.5rem;
      color: #2e3032;
    }

    .dia {
      padding: 10px 0;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 700;
      color: #2e3032;
    }

    .vacio { visibility: hidden; }
    .rojo { background: #f26d6d; color: #fff; cursor: not-allowed; }
    .verde { background: #b6f36b; }
    .amarillo { background: #ffe680; }

    .horarios {
      background: #e9f5ff;
      border-radius: 18px;
      padding: 1.2rem;
      color: #2e3032;
    }

    .hora {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      font-size: 0.75rem;
      color: #2e3032;
    }

    .acciones {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      width: 200px;
      height: 42px;
      background: #baa065;
      border-radius: 999px;
      display: flex;
      text-align:center;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }

    .btn.sec { background: #ccc; }

    /* ===== SIMBOLOGÍA ===== */
    .leyenda {
      background: #f7f7f7;
      border-radius: 16px;
      padding: 1.2rem;
      margin-bottom: 1.5rem;
      font-size: 0.8rem;
      color: #2e3032;
    }

    .leyenda h4 {
      font-size: 0.9rem;
      font-weight: 800;
      margin-bottom: 0.8rem;
      text-align: center;
    }

    .leyenda-item {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.6rem;
    }

    .color-box {
      width: 18px;
      height: 18px;
      border-radius: 4px;
    }

    .color-rojo { background: #f26d6d; }
    .color-amarillo { background: #ffe680; }
    .color-verde { background: #b6f36b; }

    .leyenda strong {
      font-weight: 700;
    }

    .dia.seleccionado {
      outline: 3px solid #0a0f24;
    }

    /* ================== AJUSTE TAMAÑO PARA DISPOSITIVOS MÓVILES ================= */

    /* ------------- 768 PX -------------*/
    @media (max-width: 768px) {
      .leyenda {
        margin-top: 1.5rem;
      }
      .contenido { 
        grid-template-columns: 1fr; 
      }
    }
`;