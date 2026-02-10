import { LitElement, html, css } from 'lit';

export class ImageCarousel extends LitElement {
    static properties = {
    images: { type: Array }, // Lit lo maneja en runtime
    };

  static styles = css`
    .carousel {
      position: relative;
      width: 100%;
      max-width: 820px;
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
    this.images = [];
    this.index = 0;
    this.direction = 1;
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
      if (!this.images.length) return;

      if (this.index === this.images.length - 1) {
        this.direction = -1;
      } else if (this.index === 0) {
        this.direction = 1;
      }

      this.index += this.direction;
      this.requestUpdate();
    }, 2000);
  }

  updated() {
    const track = this.renderRoot.querySelector('.carousel-track');
    if (track) {
      track.style.transform = `translateX(-${this.index * 100}%)`;
    }
  }

  render() {
    if (!this.images.length) return html``;

    return html`
      <div class="carousel">
        <div class="carousel-track">
          ${this.images.map(
            img => html`<img src=${img} class="carousel-image" alt="Galería" />`
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('image-carousel', ImageCarousel);
