import { css } from 'lit';
 
export const preregistroDosStyles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
      color: #2e3032;
    }

    /* ================= MAIN ================= */
    main {
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #fff;
      border-radius: 24px;
      max-width: 1200px;
      width: 100%;
      padding: 3rem;

      animation: slideUpFade 0.45s ease-out;
    }

    /* ================= TITULOS PREREGISTRO ================= */
    h1 {
      text-align: center;
      font-size: 2.4rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      text-align: center;
      color: #131c49;
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 2rem 0 1rem;
      margin-top:0.5rem;
    }

    .note {
      display: block;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      font-style: italic;
      color: #444;
    }

    /* ================= GRID (PARA LOS CAMPOS) ================= */
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem 5rem;
    }

    .grid > div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    /* ======== AJUSTE DE TAMAÑO CAMPOS ========= */
    .short {
      max-width: 530px;
    }

    /* ================= INPUT Y SELECTS ================= */
    label {
      font-weight: 500;
    }

    .required {
      color: #455f9a;
      margin-right: 4px;
    }

    input, select {
      background: transparent;
      border: none;
      border-bottom: 2px solid #131c49;
      padding: 8px 4px;
      outline: none;
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      color: #131c49;
      transition: border-color 0.3s ease;
      margin-bottom: 1.5rem;
    }

    input:focus, select:focus {
      border-bottom: 2px solid #7aa7c8;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg fill='%23131c49' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 5px center;
      background-size: 18px;
    }

    /* ================= RADIO GROUPS ================= */
    .radio-section {
      margin: 2rem 0;
    }

    .radio-title {
      display: block;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .radio-line {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      align-items: center; /*clave */
      margin-top: 1.5rem;
    }

    .radio-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .radio-label {
      font-weight: 600;
      margin-right: 0.8rem;
      white-space: nowrap;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 12px;
      transition: background 0.25s ease;
    }

    .radio-group input:checked + span {
      font-weight: 600;
    }

    .radio-group label:has(input:checked) {
      background: rgba(19, 28, 73, 0.1);
    }

    .radio-group input[type="radio"] {
      margin: 0;
      vertical-align: middle;
      transform: translateY(1px); /* micro ajuste fino */
    }

    /* ================= DOCS (INE) ================= */
    .docs {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    input[type="file"] {
      border: 2px dashed #7aa7c8;
      padding: 1rem;
      border-radius: 12px;
      background: #f8f9fa;
      cursor: pointer;
      flex: 1;
    }

    input[type="file"]:hover {
      background: #e9ecef;
    }

    /* ================= BOTONES ================= */
    .form-actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }

    button {
      font-family: 'Montserrat', sans-serif;
      color: #fff;
    }

    .btn-secundario {
      background: #d7a23f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primario {
      background: #7aa7c8;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancelar {
      background: #d73f3f;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .file-upload-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .file-ok {
      font-size: 0.85rem;
      font-weight: 700;
      color: #2e7d32;
    }

    /* ================= ANIMACIÓN ================= */
    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ================= RESPONSIVE ================= */

    /* ------------- 1024 PX -------------*/
    @media (max-width: 1024px) {
      main {
        padding: 2.5rem 1rem;
      }

      .card {
        padding: 2.5rem 2.2rem;
      }

      .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem 3rem;
      }

      h1 {
        font-size: 2.2rem;
      }

      h2 {
        font-size: 1.4rem;
      }
    }

    /* ------------- 900 PX -------------*/
    @media (max-width: 900px) {
      main {
        padding: 2rem 1rem;
      }

      .card {
        padding: 2.2rem 2rem;
      }

      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.8rem 3rem;
      }

      h1 {
        font-size: 2rem;
      }

      h2 {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
      }

      .section-title {
        font-size: 1.1rem;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 1.2rem;
        padding: 0.75rem 2.2rem;
      }
    }

    /* ------------- 768 PX -------------*/
    @media (max-width: 768px) {
      main {
        padding: 1.8rem 1rem;
      }

      .card {
        padding: 2rem 1.8rem;
        border-radius: 20px;
      }

      h1 {
        font-size: 1.9rem;
      }

      h2 {
        font-size: 1.2rem;
        margin-bottom: 1.2rem;
      }

      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem 2rem;
      }

      .radio-line {
        gap: 1.5rem;
      }

      .radio-label {
        font-size: 0.95rem;
      }

      .form-actions {
        gap: 1.2rem;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 1.1rem;
        padding: 0.7rem 2rem;
      }

      .docs {
        flex-direction: column;
      }
    }

    /* ------------- 640 PX -------------*/
    @media (max-width: 640px) {
      main {
        padding: 1.5rem 0.8rem;
      }

      .card {
        padding: 1.5rem;
        border-radius: 18px;
      }

      h1 {
        font-size: 1.8rem;
      }

      h2 {
        font-size: 1.15rem;
        margin-bottom: 1rem;
      }

      .grid {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
        gap: 0.8rem;
        margin-top: 2rem;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        width: 100%;
        font-size: 1.1rem;
        padding: 0.8rem 1rem;
      }

      .radio-line {
        flex-direction: column;
        gap: 1rem;
      }

      .radio-group {
        gap: 0.8rem;
      }

      .docs {
        flex-direction: column;
        gap: 0.8rem;
      }

      input[type="file"] {
        width: 100%;
      }

      .note {
        font-size: 0.82rem;
        margin-top: 1.2rem;
      }
    }

    /* ------------- 480 PX -------------*/
    @media (max-width: 480px) {
      main {
        padding: 1.2rem 0.6rem;
      }

      .card {
        padding: 1.3rem 1rem;
        border-radius: 16px;
      }

      h1 {
        font-size: 1.5rem;
        margin-bottom: 0.3rem;
      }

      .subtitle {
        font-size: 0.88rem;
        margin-bottom: 1.5rem;
      }

      h2 {
        font-size: 1.05rem;
        margin-bottom: 0.9rem;
      }

      .section-title {
        font-size: 1rem;
        margin: 1.5rem 0 0.8rem;
      }

      input, select {
        font-size: 14px;
        padding: 6px 4px;
        margin-bottom: 1.2rem;
      }

      label {
        font-size: 0.9rem;
      }

      .radio-label {
        font-size: 0.88rem;
        margin-right: 0.5rem;
      }

      .radio-group label {
        font-size: 0.9rem;
        padding: 3px 6px;
      }

      .radio-section {
        margin: 1.5rem 0;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 22px;
      }

      .form-actions {
        margin-top: 1.5rem;
        gap: 0.7rem;
      }

      .note {
        font-size: 0.8rem;
      }
    }

    /* ------------- 360 PX -------------*/
    @media (max-width: 360px) {
      main {
        padding: 1rem 0.4rem;
      }

      .card {
        padding: 1.1rem 0.8rem;
        border-radius: 14px;
      }

      h1 {
        font-size: 1.3rem;
      }

      .subtitle {
        font-size: 0.82rem;
        margin-bottom: 1.2rem;
      }

      h2 {
        font-size: 0.98rem;
        margin-bottom: 0.8rem;
      }

      .section-title {
        font-size: 0.92rem;
      }

      input, select {
        font-size: 13px;
        margin-bottom: 1rem;
      }

      label {
        font-size: 0.85rem;
      }

      .radio-label {
        font-size: 0.82rem;
      }

      .radio-group label {
        font-size: 0.85rem;
        gap: 4px;
        padding: 3px 5px;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 0.95rem;
        padding: 0.7rem 0.8rem;
        border-radius: 20px;
      }

      .form-actions {
        margin-top: 1.2rem;
        gap: 0.6rem;
      }

      .docs {
        gap: 0.6rem;
      }

      input[type="file"] {
        font-size: 0.8rem;
        padding: 0.8rem;
      }

      .note {
        font-size: 0.75rem;
        margin-top: 1rem;
      }
    }

    /* ------------- 320 PX -------------*/
    @media (max-width: 320px) {
      main {
        padding: 0.8rem 0.3rem;
      }

      .card {
        padding: 1rem 0.6rem;
        border-radius: 12px;
      }

      h1 {
        font-size: 1.15rem;
      }

      .subtitle {
        font-size: 0.78rem;
        margin-bottom: 1rem;
      }

      h2 {
        font-size: 0.9rem;
        margin-bottom: 0.7rem;
      }

      .section-title {
        font-size: 0.85rem;
        margin: 1.2rem 0 0.6rem;
      }

      input, select {
        font-size: 12px;
        padding: 5px 3px;
        margin-bottom: 0.8rem;
      }

      label {
        font-size: 0.8rem;
      }

      .radio-label {
        font-size: 0.78rem;
        margin-right: 0.3rem;
      }

      .radio-group {
        gap: 0.5rem;
      }

      .radio-group label {
        font-size: 0.8rem;
        gap: 3px;
        padding: 2px 4px;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 0.88rem;
        padding: 0.65rem 0.8rem;
        border-radius: 18px;
      }

      .form-actions {
        margin-top: 1rem;
        gap: 0.5rem;
      }

      input[type="file"] {
        font-size: 0.75rem;
        padding: 0.7rem;
        border-radius: 8px;
      }

      .note {
        font-size: 0.7rem;
        margin-top: 0.8rem;
      }

      .short {
        max-width: 100%;
      }
    }
`;