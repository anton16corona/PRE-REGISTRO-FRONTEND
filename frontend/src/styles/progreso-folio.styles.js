import { css } from 'lit';

export const progresoFolioStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    background: #0a0f24;
  }

  * {
    box-sizing: border-box;
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
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  /* ============== 🎬 ANIMACIÓN DE ENTRADA SUAVE ============== */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fadeInUp 0.6s ease-out;
  }

  /* ============== 📝 FOLIO HEADER MEJORADO ============== */
  .folio-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .folio-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2e3032;
    margin: 0 0 1rem 0;
  }

  .folio {
    font-size: 2rem;
    font-weight: 800;
    color: #5374a8;
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
  }

  /* 🏷️ BADGE DE PERFIL */
  .perfil-badge {
    display: inline-block;
    background: linear-gradient(135deg, #5374a8, #6a8bc4);
    color: #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 8px rgba(83, 116, 168, 0.3);
  }

  /* ============== 🔄 BARRA DE PROGRESO MEJORADA ============== */
  .progress-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    position: relative;
    padding: 0 20px;
  }

  /* WRAPPER DEL PASO */
  .step-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

  .step-wrapper:hover:not(.bloqueado) {
    transform: translateY(-5px);
  }

  /* CÍRCULOS MÁS GRANDES */
  .step-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: 700;
    background: #e0e0e0;
    color: #888;
    border: 4px solid #e0e0e0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* ESTADO: APROBADO (VERDE) */
  .step-wrapper.aprobado .step-circle {
    background: #4caf50;
    border-color: #4caf50;
    color: #fff;
  }

  /* ESTADO: EN PROCESO (AZUL) */
  .step-wrapper.en-proceso .step-circle {
    background: #5374a8;
    border-color: #5374a8;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(83, 116, 168, 0.2);
  }

  /* ESTADO: BLOQUEADO (GRIS) */
  .step-wrapper.bloqueado .step-circle {
    background: #e0e0e0;
    border-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }

  /* SELECCIONADO */
  .step-wrapper.seleccionado .step-circle {
    box-shadow: 0 0 0 4px rgba(83, 116, 168, 0.3);
    transform: scale(1.1);
  }

  /* CHECKMARK PARA APROBADOS */
  .checkmark {
    font-size: 1.8rem;
  }

  /* ETIQUETAS */
  .step-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2e3032;
    text-align: center;
    max-width: 120px;
    line-height: 1.3;
  }

  .step-wrapper.bloqueado .step-label {
    color: #999;
  }

  /* ============== 📊 LÍNEAS DE CONEXIÓN ============== */
  .step-line {
    flex: 1;
    height: 4px;
    background: #e0e0e0;
    margin: 0 -10px;
    position: relative;
    z-index: 1;
    transition: background 0.5s ease;
  }

  /* LÍNEA COMPLETADA (VERDE O AZUL) */
  .step-line.completed {
    background: linear-gradient(to right, #5374a8, #999);
  }

  /* ============== 📋 CONTENEDOR DE INFORMACIÓN ============== */
  .info-container {
    margin-bottom: 2rem;
  }

  /* GRID DOBLE PARA PRE-REGISTRO */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  /* CAJA DE INFORMACIÓN */
  .info-box {
    background: #f8f8f8;
    border-radius: 16px;
    padding: 2rem;
    border-left: 5px solid #e0e0e0;
    transition: all 0.3s ease;
  }

  .info-box h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: #2e3032;
  }

  /* COLORES SEGÚN ESTADO */
  .info-box.aprobado {
    background: #e8f5e9;
    border-left-color: #4caf50;
  }

  .info-box.en-proceso {
    background: #e3f2fd;
    border-left-color: #5374a8;
  }

  .info-box.bloqueado {
    background: #f5f5f5;
    border-left-color: #bdbdbd;
  }

  /* ============== 📝 TEXTO FORMATEADO CON SALTOS DE LÍNEA ============== */
  .formatted-text {
    white-space: pre-line;
    line-height: 1.8;
    margin: 0;
    color: #2e3032;
    font-size: 0.95rem;
  }

  /* ============== ✅ BOTÓN ACEPTAR ============== */
  .acciones {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .btn {
    background: #5374a8;
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Montserrat', sans-serif;
  }

  .btn:hover {
    background: #415d85;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(83, 116, 168, 0.3);
  }

  /* ============== 📱 RESPONSIVE ============== */
  @media (max-width: 1024px) {
    .progress-container {
      padding: 0 10px;
    }

    .step-circle {
      width: 50px;
      height: 50px;
      font-size: 1.1rem;
    }

    .step-label {
      font-size: 0.75rem;
      max-width: 100px;
    }

    .info-grid {
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .card {
      padding: 2rem 1.5rem;
    }

    .folio-title {
      font-size: 1.2rem;
    }

    .folio {
      font-size: 1.5rem;
    }

    .perfil-badge {
      font-size: 0.8rem;
      padding: 0.4rem 1.2rem;
    }

    .progress-container {
      flex-direction: column;
      gap: 2rem;
      padding: 0;
    }

    .step-wrapper {
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      gap: 1rem;
    }

    .step-line {
      display: none;
    }

    .step-label {
      text-align: left;
      max-width: none;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .info-box {
      padding: 1.5rem;
    }

    .btn {
      width: 100%;
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 1.5rem 1rem;
    }

    .folio-title {
      font-size: 1rem;
    }

    .folio {
      font-size: 1.3rem;
      letter-spacing: 0;
    }

    .perfil-badge {
      font-size: 0.75rem;
      padding: 0.35rem 1rem;
    }

    .step-circle {
      width: 45px;
      height: 45px;
      font-size: 1rem;
    }

    .step-label {
      font-size: 0.8rem;
    }

    .info-box {
      padding: 1.2rem;
    }

    .formatted-text {
      font-size: 0.85rem;
    }
  }
`;