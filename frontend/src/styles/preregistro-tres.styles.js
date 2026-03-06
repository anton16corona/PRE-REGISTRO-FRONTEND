import { css } from 'lit';
 
export const preregistroTresStyles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Montserrat', sans-serif;
      background: #f1eee8;
    }

    /* ===== MAIN ===== */
    main {
      max-width: 1200px;
      margin: 2.5rem auto;
      padding: 0 1.5rem;
    }

    .panel {
      background: #ffffff;
      border-radius: 24px;
      padding: 3rem 2rem;
      animation: slideUpFade 0.45s ease-out;
    }

    .title {
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: .5rem;
      color: #2e3032;
    }

    .subtitle {
      text-align: center;
      margin-bottom: 3rem;
      color: #4f5a61;
    }

    /* ===== FORM ===== */
    .form-group {
      max-width: 700px;
      margin: 0 auto 1.8rem;
      text-align: left;
    }

    label {
      font-weight: 500;
      display: block;
      margin-bottom: .5rem;
      color: #2e3032;
    }

    select {
      width: 100%;
      background: #ffffff;
      color: #000;
      border: 1px solid #b8b8b8;
      border-radius: 16px;
      padding: .9rem 1rem;
      font-size: 1rem;
      outline: none;
      font-family: inherit;
      appearance: auto;
    }

    select:focus {
      border-color: #131c49;
    }

    .info {
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
      font-size: 1.1rem;
      color: #2e3032;
    }

    .code {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      text-align: center;
      color: #0a0f24;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    /* ===== TERMINOS ===== */
    .terms {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .7rem;
      margin: 2rem 0;
      flex-wrap: wrap;
      font-size: 1rem;
      color: #2e3032;
    }

    .terms input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .terms a {
      color: #003cff;
      text-decoration: underline;
      cursor: pointer;
    }

    /* ===== ACCIONES ===== */
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    button {
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      margin-right:1rem;
    }

    button {
      font-size: 'Montserrat', sans-serif;
      background: #7aa7c8;
      border: none;
      border-radius: 28px;
      padding: .9rem 2.8rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    .btn-secundario {
      font-size: 'Montserrat', sans-serif;
      background: #d7a23f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancelar {
      font-size: 'Montserrat', sans-serif;
      background: #d73f3f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    /* ===== CÓDIGO WRAPPER ===== */
    .codigo-wrapper {
      max-width: 520px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.6rem;
      text-align: justify;
    }

    .codigo-wrapper p {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 400;
      line-height: 1.55;
      color: #5a6a7a;
      text-align: center;
    }

    /* Fila inline: label + input amarillo */
    .codigo-wrapper p strong {
      font-weight: 400;
    }

    .codigo-input-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      margin: 0.8rem 0 0.4rem;
    }

    .codigo-input-row input {
      background: transparent;
      border: none;
      border-bottom: 2px solid #333;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0.3rem 0.6rem;
      width: 160px;
      text-align: center;
      letter-spacing: 0.3rem;
      font-family: 'Roboto', sans-serif;
      outline: none;
    }

    .codigo-input-row input:focus {
      border-bottom: 2px solid #131c49;
    }

    .codigo-wrapper .btn-primario {
      align-self: center;
      margin-top: 0.5rem;
      background: #7aa7c8;
      border: none;
      border-radius: 28px;
      padding: .9rem 2.8rem;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      color: #fff;
      transition: all 0.3s ease;
    }

    .codigo-wrapper .btn-primario:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    .codigo-wrapper .btn-primario:not(:disabled):hover {
      background: #5e8fb0;
      transform: translateY(-2px);
    }

    /* =========================== TÉRMINOS Y AVISOS ESTILOS =========================== */
    .legal-text {
      margin-top: 24px;
      font-size: 16px;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .legal-text input {
      width: 20px;
      height: 20px;
    }

    .legal-link {
      color: #0a58ff;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 500;
    }

    .legal-text input[type="checkbox"] {
      width: 22px;
      height: 22px;
      appearance: none;
      -webkit-appearance: none;
      border: 2px solid #b0b8c1;
      border-radius: 5px;
      background: #fff;
      cursor: default;
      flex-shrink: 0;
      transition: background 0.25s ease, border-color 0.25s ease;
      position: relative;
    }

    .legal-text input[type="checkbox"]:checked {
      background: #1a3fd4;
      border-color: #1a3fd4;
    }

    .legal-text input[type="checkbox"]:checked::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 1px;
      width: 10px;
      height: 6px;
      border-left: 2.5px solid #fff;
      border-bottom: 2.5px solid #fff;
      transform: rotate(-45deg);
    }

    .legal-text.active {
      font-weight: 600;
      color: #0a0f24;
    }

    .pdf-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 10px;
      font-size: 13px;
      color: #2f3031;
      font-style: italic;
      font-weight: 400;
      text-align: center;
      flex-shrink: 0;
    }

    .pdf-hint-icon {
      font-size: 15px;
      flex-shrink: 0;
    }

    .modal-pdf-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 15, 36, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-pdf-container {
      background: #ffffff;
      width: 95%;
      max-width: 760px;
      max-height: 90vh;
      border-radius: 20px;
      padding: 28px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-pdf-container h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      color: #0a0f24;
      text-align: center;
      flex-shrink: 0;
    }

    .modal-pdf-viewer {
      position: relative;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      border-radius: 14px;
    }

    .modal-pdf-viewer pdf-zoom-viewer {
      display: block;
      height: 100%;
    }

    .modal-pdf-loading {
      position: absolute;
      inset: 0;
      background: rgba(32, 30, 57, 0.88);
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      gap: 1.2rem;
      pointer-events: none;
    }

    .modal-pdf-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 255, 255, 0.2);
      border-top-color: #a1942f;
      border-radius: 50%;
      animation: pdf-spin 0.9s linear infinite;
    }

    @keyframes pdf-spin {
      to { transform: rotate(360deg); }
    }

    .modal-pdf-loading-texto {
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      opacity: 0.9;
    }

    .modal-pdf-puntos::after {
      content: '';
      animation: pdf-puntos 1.4s steps(4, end) infinite;
    }

    @keyframes pdf-puntos {
      0%   { content: ''; }
      25%  { content: '.'; }
      50%  { content: '..'; }
      75%  { content: '...'; }
      100% { content: ''; }
    }

    .modal-pdf-actions {
      display: flex;
      justify-content: center;
      flex-shrink: 0;
    }

    .modal-pdf-actions button {
      padding: 14px 48px;
      border-radius: 999px;
      border: none;
      background: #0a0f24;
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      font-family: 'Montserrat', sans-serif;
      opacity: 1;
    }

    .modal-pdf-actions button:disabled {
      background: #cfdde8;
      cursor: not-allowed;
      opacity: 1;
    }

    .send-code-btn {
      margin: 40px auto 0;
      padding: 16px 48px;
      border-radius: 999px;
      border: none;
      font-size: 18px;
      font-weight: 700;
      transition: all 0.3s ease;
    }

    .send-code-btn:disabled { background: #cfdde8; color: #ffffff; }
    .send-code-btn:not(:disabled) { background: #0a0f24; color: #ffffff; cursor: pointer; }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 15, 36, 0.65);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-container {
      background: #ffffff;
      width: 90%;
      max-width: 640px;
      border-radius: 20px;
      padding: 28px 32px;
      display: flex;
      flex-direction: column;
    }

    .modal-container h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: #0a0f24;
      text-align: center;
    }

    .modal-content {
      margin: 20px 0;
      max-height: 320px;
      overflow-y: auto;
      font-size: 15px;
      line-height: 1.6;
      padding-right: 8px;
      color: #333;
    }

    .modal-actions { display: flex; justify-content: center; }

    .modal-actions button {
      padding: 14px 40px;
      border-radius: 999px;
      border: none;
      background: #0a0f24;
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
    }

    @keyframes slideUpFade {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  
    /* ================== RESPONSIVE ================= */

    @media (max-width: 1024px) {
      main { max-width: 900px; }
      .panel { padding: 2.8rem 2.2rem; }
      .title { font-size: 2.2rem; }
      .modal-pdf-container { max-width: 680px; }
    }

    @media (max-width: 900px) {
      .panel { padding: 2.5rem 2rem; }
      .title { font-size: 2rem; }
      .subtitle { font-size: 1rem; }
      .info { font-size: 1rem; }
      button { font-size: 1.1rem; padding: .8rem 2.4rem; }
      .modal-pdf-container { max-width: 620px; padding: 24px 20px 20px; }
    }

    @media (max-width: 768px) {
      main { margin: 2rem auto; padding: 0 1.2rem; }
      .panel { padding: 2.2rem 1.8rem; border-radius: 20px; }
      .title { font-size: 1.9rem; }
      .subtitle { font-size: .98rem; margin-bottom: 2.5rem; }
      .form-group { margin-bottom: 1.6rem; }
      .terms { flex-direction: column; align-items: flex-start; gap: .6rem; text-align: left; }
      .actions button { width: 100%; }
      .modal-pdf-container { width: 95%; max-width: 100%; max-height: 88vh; padding: 20px 16px 16px; border-radius: 16px; }
      .modal-pdf-container h2 { font-size: 18px; }
      .modal-container { width: 92%; padding: 24px; }
    }

    @media (max-width: 640px) {
      main { margin: 1.5rem auto; padding: 0 1rem; }
      .panel { padding: 2rem 1.3rem; border-radius: 20px; }
      .title { font-size: 1.7rem; }
      .subtitle { font-size: .95rem; margin-bottom: 2rem; }
      .form-group { margin-bottom: 1.5rem; }
      select { font-size: 1rem; padding: .8rem 1rem; }
      .terms { flex-direction: column; align-items: flex-start; gap: .6rem; text-align: left; }
      .info { font-size: .95rem; margin: 1.8rem auto; }
      .actions { margin-top: 1.5rem; }
      .actions button { width: 100%; }
      .codigo-wrapper { max-width: 100%; }
      .codigo-wrapper p strong {
      font-weight: 400;
    }

    .codigo-input-row { flex-direction: column; gap: 0.4rem; }
      .codigo-input-row input { width: 100%; max-width: 220px; }
      .codigo-wrapper .btn-primario { width: 100%; }
      .modal-pdf-container { max-height: 85vh; gap: 12px; }
      .modal-pdf-actions button { padding: 12px 36px; font-size: 15px; width: 100%; }
      .modal-container { width: 95%; padding: 20px 16px; border-radius: 16px; }
      .modal-actions button { width: 100%; padding: 12px 24px; }
    }

    @media (max-width: 480px) {
      main { margin: 1.2rem auto; padding: 0 0.8rem; }
      .panel { padding: 1.8rem 1.1rem; border-radius: 18px; }
      .title { font-size: 1.5rem; margin-bottom: .4rem; }
      .subtitle { font-size: .9rem; margin-bottom: 1.8rem; }
      select { font-size: .95rem; padding: .75rem .9rem; border-radius: 12px; }
      .legal-text { font-size: 14px; gap: 10px; }
      .info { font-size: .88rem; margin: 1.5rem auto; }
      .send-code-btn { font-size: 16px; padding: 14px 32px; }
      .modal-pdf-container { max-height: 82vh; padding: 16px 14px 14px; border-radius: 14px; gap: 10px; }
      .modal-pdf-container h2 { font-size: 16px; }
      .modal-pdf-spinner { width: 40px; height: 40px; }
      .modal-container { padding: 18px 14px; border-radius: 14px; }
      .modal-container h2 { font-size: 18px; }
      .modal-content { font-size: 14px; max-height: 260px; }
    }

    @media (max-width: 360px) {
      main { margin: 1rem auto; padding: 0 0.5rem; }
      .panel { padding: 1.5rem .9rem; border-radius: 16px; }
      .title { font-size: 1.3rem; }
      .subtitle { font-size: .85rem; margin-bottom: 1.5rem; }
      select { font-size: .88rem; padding: .7rem .8rem; border-radius: 10px; }
      .legal-text { font-size: 13px; gap: 8px; }
      .legal-text input[type="checkbox"] { width: 18px; height: 18px; }
      .info { font-size: .83rem; margin: 1.2rem auto; }
      .send-code-btn { font-size: 15px; padding: 12px 24px; width: 100%; }
      .modal-pdf-container { max-height: 80vh; padding: 14px 12px 12px; border-radius: 12px; gap: 8px; }
      .modal-pdf-container h2 { font-size: 15px; }
      .modal-pdf-actions button { font-size: 14px; padding: 11px 20px; }
      .modal-container { padding: 16px 12px; border-radius: 12px; }
      .modal-container h2 { font-size: 16px; }
      .modal-content { font-size: 13px; max-height: 220px; }
      .modal-actions button { font-size: 14px; padding: 11px 20px; }
    }

    @media (max-width: 320px) {
      main { padding: 0 0.4rem; }
      .panel { padding: 1.2rem .7rem; border-radius: 14px; }
      .title { font-size: 1.15rem; }
      .subtitle { font-size: .8rem; margin-bottom: 1.2rem; }
      select { font-size: .82rem; padding: .65rem .7rem; }
      .legal-text { font-size: 12px; gap: 7px; }
      .legal-text input[type="checkbox"] { width: 16px; height: 16px; }
      .info { font-size: .78rem; margin: 1rem auto; }
      .send-code-btn { font-size: 14px; padding: 11px 20px; }
      .modal-pdf-container { max-height: 78vh; padding: 12px 10px 10px; border-radius: 10px; gap: 7px; }
      .modal-pdf-container h2 { font-size: 14px; }
      .modal-pdf-spinner { width: 34px; height: 34px; border-width: 3px; }
      .modal-pdf-loading-texto { font-size: .8rem; }
      .modal-pdf-actions button { font-size: 13px; padding: 10px 16px; }
      .modal-container { padding: 14px 10px; border-radius: 10px; }
      .modal-container h2 { font-size: 15px; }
      .modal-content { font-size: 12px; max-height: 180px; margin: 14px 0; }
      .modal-actions button { font-size: 13px; padding: 10px 16px; }
    }
`;