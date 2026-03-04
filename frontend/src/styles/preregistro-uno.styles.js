import { css } from 'lit';

export const preregistroUnoStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

    :host {
      display: block;
      min-height: 100vh;
      background: #f1eee8;
      font-family: 'Montserrat', sans-serif;
      color: #2e3032;
      animation: fadeInUp .4s ease;
    }

    main {
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
    }

    .card {
      background: #ffffff;
      border-radius: 24px;
      width: 100%;
      max-width: 1200px;
      padding: clamp(1.5rem, 4vw, 3rem);
      box-sizing: border-box;
    }

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
      color: #131c49;
      margin: 2.5rem 0 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

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
      border-bottom: 1px solid #000;
      padding: 6px 2px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #000;
    }

    input::placeholder {
      color: #717173;
    }

    input:disabled {
      background: transparent;
      color: #4c4c4c;
    }

    .edad {
      border: none;
      font-size: 18px;
      font-weight: 500;
      padding-top: 10px;
    }

    .radio-group {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-top: 0.5rem;
    }

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;
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
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primario {
      background: #7aa7c8;
      color: #fff;
      border: none;
      border-radius: 28px;
      padding: 0.8rem 3rem;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancelar {
      background: #d73f3f;
      color: #fff;
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

    input[type="date"] {
      position: relative;
      cursor: pointer;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      opacity: 0.8;
      cursor: pointer;
    }

    input[type="date"]:focus {
      border-bottom: 2px solid #131c49;
      background: rgba(19, 28, 73, 0.05);
      transition: all 0.2s ease;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 12px;
      transition: background 0.25s ease;
    }

    .radio-group input:checked + span {
      font-weight: 600;
    }

    .radio-group label:has(input:checked) {
      background: rgba(19, 28, 73, 0.1);
    }

    .msg {
      display: block;
      margin-top: 6px;
      font-size: 14px;
      font-weight: 600;
    }

    .msg-gray {
      color: #757575;
    }

    .msg-orange {
      color: #f57c00;
    }

    .msg-red {
      color: #d32f2f;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      -webkit-text-fill-color: #000;
      -webkit-box-shadow: 0 0 0px 1000px #8fa6c1 inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    @media (max-width: 1024px) {
      .cards {
        grid-template-columns: repeat(2, 1fr);
      }

      h1 {
        font-size: 2.1rem;
      }

      .card {
        border-radius: 20px;
      }
    }

    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      h2 {
        margin-top: 2rem;
      }
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.9rem;
      }

      .subtitle {
        font-size: 0.95rem;
      }

      .radio-group {
        gap: 1rem;
      }

      .radio-group label {
        padding: 6px 12px;
      }

      .form-actions {
        gap: 1rem;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        width: 100%;
        font-size: 1.1rem;
      }
    }

    @media (max-width: 640px) {
      header {
        text-align: center;
      }

      .cards {
        grid-template-columns: 1fr;
      }

      .ipes {
        font-size: 1.4rem;
      }

      .title {
        font-size: 2rem;
      }

      .card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.8rem;
      }

      label {
        font-size: 0.9rem;
      }

      input {
        font-size: 15px;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primario,
      .btn-secundario {
        width: 100%;
        max-width: 100%;
        font-size: 1.1rem;
      }

      main {
        padding: 2rem 0.8rem;
      }

      .edad {
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      header {
        grid-template-columns: 1fr;
        padding: 1rem;
      }

      header img {
        margin: 0 auto;
      }

      h1 {
        font-size: 1.6rem;
      }

      .subtitle {
        font-size: 0.85rem;
      }

      h2 {
        font-size: 1.1rem;
      }

      .ipes {
        font-size: 1.1rem;
        padding: 0 0.5rem;
      }

      .radio-group {
        flex-wrap: wrap;
        gap: 0.8rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        padding: 0.7rem;
        font-size: 1rem;
      }
    }

    @media (max-width: 360px) {
      .card {
        padding: 1.2rem 1rem;
      }

      h1 {
        font-size: 1.4rem;
      }

      input {
        font-size: 13px;
      }

      .btn-primario,
      .btn-secundario,
      .btn-cancelar {
        font-size: 0.95rem;
      }
    }

    @media (max-width: 320px) {
      .card {
        padding: 1rem 0.8rem;
        border-radius: 16px;
      }

      h1 {
        font-size: 1.2rem;
      }

      .subtitle {
        font-size: 0.8rem;
      }

      h2 {
        font-size: 1rem;
      }

      label {
        font-size: 0.8rem;
      }

      input {
        font-size: 12px;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;