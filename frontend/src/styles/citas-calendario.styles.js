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
      margin-bottom: 1.5rem;
      color: #2e3032;
    }

    /* ===== INFO CONVOCATORIA ===== */
    .info-convocatoria {
      text-align: center;
      background: #e3f2fd;
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      color: #1565c0;
    }

    /* ===== NAVEGACIÓN DE MESES ===== */
    .navegacion-meses {
      display: flex;
      justify-content: center;
      gap: 0.8rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .btn-mes {
      padding: 0.6rem 1.2rem;
      border: 2px solid #baa065;
      background: transparent;
      border-radius: 999px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #2e3032;
    }

    .btn-mes:hover {
      background: #f5f5f5;
    }

    .btn-mes.activo {
      background: #baa065;
      color: #fff;
    }

    /* ===== CONTENIDO ===== */
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
      transition: all 0.2s ease;
    }

    .dia:not(.vacio):not(.rojo):hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .vacio { 
      visibility: hidden; 
    }

    .rojo { 
      background: #f26d6d; 
      color: #fff; 
      cursor: not-allowed; 
      opacity: 0.6;
    }

    .verde { 
      background: #b6f36b; 
    }

    .amarillo { 
      background: #ffe680; 
    }

    .dia.seleccionado {
      outline: 3px solid #0a0f24;
      outline-offset: 2px;
      transform: scale(1.05);
    }

    /* ===== HORARIOS ===== */
    .horarios {
      background: #e9f5ff;
      border-radius: 18px;
      padding: 1.2rem;
      color: #2e3032;
    }

    .horarios h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 700;
      text-align: center;
    }

    .hora {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      margin-bottom: 0.6rem;
      background: #fff;
      border-radius: 8px;
      font-size: 0.85rem;
      color: #2e3032;
      transition: all 0.2s ease;
    }

    .hora.disponible {
      cursor: pointer;
    }

    .hora.disponible:hover {
      background: #f0f8ff;
      transform: translateX(4px);
    }

    .hora.lleno {
      background: #f5f5f5;
      opacity: 0.6;
      cursor: not-allowed;
    }

    .hora strong {
      font-size: 1rem;
      display: block;
      margin-bottom: 2px;
    }

    .hora small {
      font-size: 0.75rem;
      color: #666;
    }

    .hora input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #baa065;
    }

    .hora.lleno input[type="radio"] {
      cursor: not-allowed;
    }

    /* ===== LEYENDA ===== */
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
      margin: 0 0 0.8rem 0;
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
      font-size: 0.75rem;
    }

    /* ===== RESUMEN SELECCIÓN ===== */
    .resumen-seleccion {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 12px;
      text-align: center;
      font-size: 0.9rem;
      color: #2e3032;
      line-height: 1.8;
    }

    .resumen-seleccion strong {
      color: #0a0f24;
    }

    /* ===== ACCIONES ===== */
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
      text-align: center;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
      color: #fff;
      transition: all 0.3s ease;
      border: none;
      font-family: 'Montserrat', sans-serif;
    }

    .btn:hover {
      background: #a08d52;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(186, 160, 101, 0.3);
    }

    .btn.sec {
      background: #ccc;
      color: #333;
    }

    .btn.sec:hover {
      background: #b8b8b8;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .card {
        padding: 2rem 1.5rem;
      }

      .titulo {
        font-size: 1.6rem;
      }

      .contenido {
        grid-template-columns: 1fr;
      }

      .leyenda {
        margin-top: 1.5rem;
        order: 1;
      }

      .horarios {
        order: 2;
      }

      .navegacion-meses {
        gap: 0.5rem;
      }

      .btn-mes {
        font-size: 0.75rem;
        padding: 0.5rem 1rem;
      }

      .acciones {
        flex-direction: column;
        gap: 0.8rem;
      }

      .btn {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .fondo {
        padding: 1.5rem 0.5rem;
      }

      .card {
        padding: 1.5rem 1rem;
        border-radius: 16px;
      }

      .titulo {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }

      .dias {
        gap: 6px;
      }

      .dia {
        padding: 8px 0;
        font-size: 0.75rem;
      }

      .semana {
        font-size: 0.65rem;
      }

      .info-convocatoria {
        font-size: 0.8rem;
        padding: 0.8rem;
      }

      .resumen-seleccion {
        font-size: 0.85rem;
      }
    }
`;