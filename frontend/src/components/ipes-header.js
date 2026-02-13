import { LitElement, html, css } from 'lit';

export class IpesHeader extends LitElement {

  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: #0a0f24;
      font-family: 'Montserrat', sans-serif;
    }

    header {
      color: #d1cfcd;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 2rem;
    }

    img {
      width: clamp(55px, 8vw, 90px);
      height: auto;
      flex-shrink: 0;
    }

    .ipes {
      text-align: center;
      font-weight: 900;
      font-size: clamp(1.2rem, 3vw, 2.5rem);
      line-height: 1.2;
      max-width: 100%;
      white-space: normal;
    }

    @media (max-width: 768px) {
      header {
        grid-template-columns: auto 1fr auto;
        padding: 0.8rem 1rem;
      }
    }
  `;

  render() {
    return html`
      <header>
        <img src="/src/assets/SSPlogo.png" alt="SSP" />

        <div class="ipes">
          INSTITUTO POLICIAL DE ESTUDIOS SUPERIORES
        </div>

        <img src="/src/assets/IPESlogo.png" alt="IPES" />
      </header>
    `;
  }
}

customElements.define('ipes-header', IpesHeader);