import { LitElement, html, css } from 'lit';

export class DoubleImageCarousel extends LitElement {
  static properties = {
    imagesLeft: { type: Array },
    imagesRight: { type: Array },
  };

  static styles = css`
    .carousels-wrapper {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .carousel {
      position: relative;
      width: 100%;
      max-width: 620px;
      height: 320px;
      margin: 3rem auto 0;
      overflow: hidden;
      border-radius: 18px;
    }

    .carousel-track {
      display: flex;
      height: 100%;
      transition: transform 0.6s ease-in-out;
    }

    .carousel-image {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      object-fit: cover;
      border-radius: 18px;
    }

    @media (max-width: 640px) {
      .carousel {
        height: 220px;
      }
    }
  `;

  constructor() {
    super();
    this.imagesLeft = [];
    this.imagesRight = [];

    this.indexLeft = 0;
    this.indexRight = 0;

    this.directionLeft = 1;
    this.directionRight = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.startAutoplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId);
  }

startAutoplay() {
  this.intervalId = setInterval(() => {
    if (!this.imagesLeft.length || !this.imagesRight.length) return;

    const maxLeft = this.imagesLeft.length - 1;
    const maxRight = this.imagesRight.length - 1;

    // -------- IZQUIERDO --------
    if (
      (this.indexLeft === maxLeft && this.directionLeft === 1) ||
      (this.indexLeft === 0 && this.directionLeft === -1)
    ) {
      this.directionLeft *= -1;
    }
    this.indexLeft += this.directionLeft;

    // -------- DERECHO --------
    if (
      (this.indexRight === maxRight && this.directionRight === 1) ||
      (this.indexRight === 0 && this.directionRight === -1)
    ) {
      this.directionRight *= -1;
    }
    this.indexRight += this.directionRight;

    this.requestUpdate();
  }, 2000);
}

  updated() {
    const left = this.renderRoot.querySelector('.carousel-left');
    const right = this.renderRoot.querySelector('.carousel-right');

    if (left) {
      left.style.transform = `translateX(-${this.indexLeft * 100}%)`;
    }

    if (right) {
      right.style.transform = `translateX(-${this.indexRight * 100}%)`;
    }
  }

  render() {
    if (!this.imagesLeft.length || !this.imagesRight.length) return html``;

    return html`
      <div class="carousels-wrapper">
        <div class="carousel">
          <div class="carousel-track carousel-left">
            ${this.imagesLeft.map(
              img => html`<img src=${img} class="carousel-image" />`
            )}
          </div>
        </div>

        <div class="carousel">
          <div class="carousel-track carousel-right">
            ${this.imagesRight.map(
              img => html`<img src=${img} class="carousel-image" />`
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('double-image-carousel', DoubleImageCarousel);