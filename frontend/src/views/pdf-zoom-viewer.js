import { LitElement, html, css } from 'lit';

/**
 * Componente para visualizar PDFs con zoom interactivo
 * - Zoom con rueda del mouse
 * - Pinch zoom en móviles
 * - Arrastrar para mover
 * - Sin opciones de impresión/descarga
 * - Vista previa antes del zoom
 */
export class PdfZoomViewer extends LitElement {
  static properties = {
    pdfUrl: { type: String },
    showZoom: { type: Boolean },
    scale: { type: Number },
    translateX: { type: Number },
    translateY: { type: Number },
    currentPage: { type: Number },
    totalPages: { type: Number },
    isLoading: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    /* ================= CONTENEDOR PREVIEW ================= */
    .pdf-preview-container {
      background: #201e39;
      border-radius: 20px;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: transform 0.2s;
      min-height: 700px;
      position: relative;
    }

    .pdf-preview-container:hover {
      transform: scale(1.02);
    }

    .pdf-preview-canvas {
      max-width: 100%;
      height: auto;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    /* ================= LOADING ================= */
    .loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(32, 30, 57, 0.9);
      border-radius: 20px;
      color: white;
      font-size: 1.2rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: #a1942f;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* ================= ZOOM OVERLAY ================= */
    .zoom-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 15, 36, 0.95);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .zoom-container {
      position: relative;
      width: 95vw;
      height: 95vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      /* Mejor manejo táctil en móviles */
      -webkit-overflow-scrolling: touch;
    }

    .zoom-canvas-wrapper {
      position: relative;
      transform-origin: center center;
      cursor: grab;
      user-select: none;
      transition: transform 0.1s ease-out;
      touch-action: none; /* Importante para móviles */
      will-change: transform; /* Optimización de rendimiento */
    }

    .zoom-canvas-wrapper:active {
      cursor: grabbing;
    }

    .zoom-canvas-wrapper canvas {
      display: block;
      max-width: none;
      max-height: none;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
      /* Permitir que el canvas sea más pequeño que el viewport en móviles */
      min-width: auto;
      min-height: auto;
    }

    /* ================= CONTROLES ================= */
    .zoom-controls {
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      background: rgba(10, 15, 36, 0.9);
      padding: 0.5rem;
      border-radius: 10px;
      z-index: 10001;
    }

    .zoom-btn {
      background: #514f77;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.1rem;
      min-width: 40px;
      font-family: 'Montserrat', sans-serif;
    }

    .zoom-btn:hover {
      background: #635f8f;
    }

    .zoom-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .zoom-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #a1942f;
      color: #0a0f24;
      font-weight: 800;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      cursor: pointer;
      z-index: 10001;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
    }

    .zoom-close:hover {
      background: #b8a640;
    }

    /* ================= PAGINACIÓN ================= */
    .page-controls {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(10, 15, 36, 0.9);
      padding: 0.7rem 1.5rem;
      border-radius: 10px;
      z-index: 10001;
      color: white;
      font-weight: 600;
    }

    .page-btn {
      background: #514f77;
      color: white;
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.2rem;
      font-family: 'Montserrat', sans-serif;
    }

    .page-btn:hover:not(:disabled) {
      background: #635f8f;
    }

    .page-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .page-info {
      font-size: 1rem;
      min-width: 100px;
      text-align: center;
    }

    /* ================= INFO ================= */
    .zoom-info {
      position: absolute;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 15, 36, 0.8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 10001;
      text-align: center;
    }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 1024px) {
      .pdf-preview-container {
        min-height: 600px;
      }
    }

    @media (max-width: 768px) {
      .pdf-preview-container {
        min-height: 500px;
        padding: 1rem;
      }
      
      /* Optimizar zoom-container para móviles */
      .zoom-container {
        width: 100vw;
        height: 100vh;
      }
      
      /* Hacer los controles más accesibles en móviles */
      .zoom-controls {
        top: auto;
        bottom: 5rem;
        padding: 0.6rem;
      }
      
      .page-controls {
        bottom: auto;
        top: 1rem;
      }
    }

    @media (max-width: 640px) {
      .pdf-preview-container {
        min-height: 400px;
        padding: 0.8rem;
      }

      .zoom-info {
        font-size: 0.7rem;
        padding: 0.3rem 0.6rem;
        top: 4.5rem;
        max-width: 90vw;
      }

      .zoom-controls {
        padding: 0.5rem;
        gap: 0.4rem;
        bottom: 4rem;
      }

      .zoom-btn {
        padding: 0.5rem 0.9rem;
        font-size: 1.1rem;
        min-width: 40px;
      }

      .page-controls {
        padding: 0.6rem 1rem;
        gap: 0.8rem;
        top: 1rem;
      }

      .page-info {
        font-size: 0.85rem;
        min-width: 90px;
      }
      
      .zoom-close {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
      
      /* Optimizar el canvas wrapper para móviles */
      .zoom-canvas-wrapper {
        /* Permitir que sea más pequeño y manejable */
        max-width: 100%;
        max-height: 100%;
      }
    }
  `;

  constructor() {
    super();
    this.pdfUrl = '';
    this.showZoom = false;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.currentPage = 1;
    this.totalPages = 0;
    this.isLoading = true;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.lastDistance = 0;
    this.pdfDoc = null;
    this.renderTask = null;
    this.reRenderTimeout = null; // Para re-renderizar con alta calidad
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadPdfJs();
    await this.loadPdf();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.pdfDoc) {
      this.pdfDoc.destroy();
    }
  }

  /* ================= CARGAR PDF.JS ================= */
  async loadPdfJs() {
    if (globalThis.pdfjsLib) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        globalThis.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /* ================= CARGAR PDF ================= */
  async loadPdf() {
    if (!this.pdfUrl || !globalThis.pdfjsLib) return;

    try {
      this.isLoading = true;
      this.requestUpdate();

      const loadingTask = globalThis.pdfjsLib.getDocument({
        url: this.pdfUrl,
        // Deshabilitar descarga automática
        disableAutoFetch: false,
        disableStream: false
      });

      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      this.isLoading = false;
      this.requestUpdate();

      // Renderizar primera página en preview
      await this.renderPreview();
    } catch (error) {
      console.error('Error cargando PDF:', error);
      this.isLoading = false;
      this.requestUpdate();
    }
  }

  /* ================= RENDERIZAR PREVIEW ================= */
  async renderPreview() {
    const canvas = this.renderRoot.querySelector('.pdf-preview-canvas');
    if (!canvas || !this.pdfDoc) return;

    const page = await this.pdfDoc.getPage(1);
    
    // Usar escala alta para mejor calidad
    const scale = 3;
    const viewport = page.getViewport({ scale });

    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  }

  /* ================= RENDERIZAR PÁGINA EN ZOOM ================= */
  async renderPage() {
    const wrapper = this.renderRoot.querySelector('.zoom-canvas-wrapper');
    if (!wrapper || !this.pdfDoc) return;

    // Cancelar renderizado anterior
    if (this.renderTask) {
      this.renderTask.cancel();
    }

    const canvas = wrapper.querySelector('canvas') || document.createElement('canvas');
    if (!wrapper.querySelector('canvas')) {
      wrapper.appendChild(canvas);
    }

    const page = await this.pdfDoc.getPage(this.currentPage);
    
    // 🔥 CLAVE: Escala base alta (4x) para máxima calidad
    // Esto asegura que incluso con zoom 5x, la calidad sea nítida
    const baseScale = 4;
    const viewport = page.getViewport({ scale: baseScale });

    const context = canvas.getContext('2d');
    
    // Configurar canvas con alta resolución
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    this.renderTask = page.render(renderContext);
    
    try {
      await this.renderTask.promise;
      this.renderTask = null;
    } catch (error) {
      if (error.name !== 'RenderingCancelledException') {
        console.error('Error renderizando página:', error);
      }
    }
  }

  /* ================= RENDERIZAR CON ALTA CALIDAD ADAPTATIVA ================= */
  async renderPageHighQuality() {
    const wrapper = this.renderRoot.querySelector('.zoom-canvas-wrapper');
    if (!wrapper || !this.pdfDoc) return;

    // Cancelar renderizado anterior
    if (this.renderTask) {
      this.renderTask.cancel();
    }

    const canvas = wrapper.querySelector('canvas');
    if (!canvas) return;

    const page = await this.pdfDoc.getPage(this.currentPage);
    
    // Escala adaptativa: cuanto mayor sea el zoom del usuario, mayor será la escala de renderizado
    // Esto garantiza que siempre se vea nítido
    const adaptiveScale = Math.max(4, this.scale * 4);
    const viewport = page.getViewport({ scale: adaptiveScale });

    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    this.renderTask = page.render(renderContext);
    
    try {
      await this.renderTask.promise;
      this.renderTask = null;
    } catch (error) {
      if (error.name !== 'RenderingCancelledException') {
        console.error('Error renderizando página:', error);
      }
    }
  }

  /* ================= ABRIR/CERRAR ZOOM ================= */
  async openZoom() {
    this.showZoom = true;
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    // En móvil, comenzar con zoom más pequeño para ver toda la página
    this.scale = isMobile ? 0.5 : 1;
    
    this.translateX = 0;
    this.translateY = 0;
    this.currentPage = 1;
    this.requestUpdate();
    
    await this.updateComplete;
    await this.renderPage();
  }

  closeZoom() {
    this.showZoom = false;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.requestUpdate();
  }

  /* ================= CONTROLES DE ZOOM ================= */
  zoomIn() {
    this.scale = Math.min(this.scale + 0.25, 5);
    this.requestUpdate();
    setTimeout(() => this.applyTransform(), 0);
    
    // Re-renderizar con alta calidad
    clearTimeout(this.reRenderTimeout);
    this.reRenderTimeout = setTimeout(() => {
      this.renderPageHighQuality();
    }, 300);
  }

  zoomOut() {
    // Permitir zoom más pequeño en móviles (0.3x)
    this.scale = Math.max(this.scale - 0.25, 0.3);
    this.requestUpdate();
    setTimeout(() => this.applyTransform(), 0);
    
    // Re-renderizar con alta calidad
    clearTimeout(this.reRenderTimeout);
    this.reRenderTimeout = setTimeout(() => {
      this.renderPageHighQuality();
    }, 300);
  }

  resetZoom() {
    // En móvil resetear a 0.5x, en desktop a 1x
    const isMobile = window.innerWidth <= 768;
    this.scale = isMobile ? 0.5 : 1;
    
    this.translateX = 0;
    this.translateY = 0;
    this.requestUpdate();
    setTimeout(() => this.applyTransform(), 0);
    
    // Re-renderizar con alta calidad
    setTimeout(() => {
      this.renderPageHighQuality();
    }, 100);
  }

  onWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    
    // Permitir zoom desde 0.3x hasta 5x
    this.scale = Math.min(Math.max(0.3, this.scale + delta), 5);
    this.requestUpdate();
    setTimeout(() => this.applyTransform(), 0);
    
    // Re-renderizar con alta calidad después de que el usuario deje de hacer zoom
    clearTimeout(this.reRenderTimeout);
    this.reRenderTimeout = setTimeout(() => {
      this.renderPageHighQuality();
    }, 300);
  }

  /* ================= NAVEGACIÓN DE PÁGINAS ================= */
  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.requestUpdate();
      await this.updateComplete;
      await this.renderPage();
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.requestUpdate();
      await this.updateComplete;
      await this.renderPage();
    }
  }

  /* ================= ARRASTRAR ================= */
  onPointerDown(e) {
    const wrapper = this.renderRoot.querySelector('.zoom-canvas-wrapper');
    if (!wrapper) return;

    // En móviles, permitir arrastre incluso sin zoom
    wrapper.setPointerCapture(e.pointerId);
    this.isDragging = true;
    this.startX = e.clientX - this.translateX;
    this.startY = e.clientY - this.translateY;
    
    // Prevenir comportamiento por defecto en móviles
    e.preventDefault();
  }

  onPointerMove(e) {
    if (!this.isDragging) return;

    // Movimiento libre sin límites - el usuario puede arrastrar donde quiera
    this.translateX = e.clientX - this.startX;
    this.translateY = e.clientY - this.startY;
    
    this.requestUpdate();
    this.applyTransform();
  }

  onPointerUp(e) {
    this.isDragging = false;
  }

  /* ================= PINCH ZOOM ================= */
  onTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      this.lastDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      // Guardar el punto central del pinch para zoom centrado
      this.pinchCenterX = (touch1.clientX + touch2.clientX) / 2;
      this.pinchCenterY = (touch1.clientY + touch2.clientY) / 2;
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (this.lastDistance > 0) {
        // Incremento más sensible para mejor control
        const delta = (distance - this.lastDistance) * 0.015;
        
        // Permitir zoom más pequeño en móvil (0.3x) para ver página completa
        this.scale = Math.min(Math.max(0.3, this.scale + delta), 5);
        this.requestUpdate();
        this.applyTransform();
        
        // Re-renderizar con alta calidad después de que termine el pinch
        clearTimeout(this.reRenderTimeout);
        this.reRenderTimeout = setTimeout(() => {
          this.renderPageHighQuality();
        }, 300);
      }

      this.lastDistance = distance;
    } else if (e.touches.length === 1 && !this.isDragging) {
      // Permitir arrastrar con un dedo cuando no hay pinch activo
      // Esto mejora la movilidad en móviles
    }
  }

  onTouchEnd(e) {
    if (e.touches.length < 2) {
      this.lastDistance = 0;
    }
  }

  applyTransform() {
    const wrapper = this.renderRoot.querySelector('.zoom-canvas-wrapper');
    if (wrapper) {
      wrapper.style.transform = `
        translate(${this.translateX}px, ${this.translateY}px)
        scale(${this.scale})
      `;
    }
  }

  /* ================= RENDER ================= */
  render() {
    return html`
      ${this.showZoom
        ? html`
            <div class="zoom-overlay" @click=${this.closeZoom}>
              <div 
                class="zoom-container" 
                @click=${e => e.stopPropagation()}
                @touchstart=${this.onTouchStart}
                @touchmove=${this.onTouchMove}
                @touchend=${this.onTouchEnd}
              >
                <button class="zoom-close" @click=${this.closeZoom}>
                  CERRAR
                </button>

                <div class="zoom-controls">
                  <button class="zoom-btn" @click=${this.zoomOut}>−</button>
                  <button class="zoom-btn" @click=${this.resetZoom}>⟲</button>
                  <button class="zoom-btn" @click=${this.zoomIn}>+</button>
                </div>

                <div 
                  class="zoom-canvas-wrapper"
                  @wheel=${this.onWheelZoom}
                  @pointerdown=${this.onPointerDown}
                  @pointermove=${this.onPointerMove}
                  @pointerup=${this.onPointerUp}
                  @pointercancel=${this.onPointerUp}
                >
                  <!-- Canvas se crea dinámicamente -->
                </div>

                <div class="page-controls">
                  <button 
                    class="page-btn" 
                    @click=${this.prevPage}
                    ?disabled=${this.currentPage === 1}
                  >
                    ◀
                  </button>
                  <div class="page-info">
                    Página ${this.currentPage} de ${this.totalPages}
                  </div>
                  <button 
                    class="page-btn" 
                    @click=${this.nextPage}
                    ?disabled=${this.currentPage === this.totalPages}
                  >
                    ▶
                  </button>
                </div>

                <div class="zoom-info">
                  🖱️ Rueda del mouse o botones · Arrastra para mover · Pellizca para zoom en móvil
                </div>
              </div>
            </div>
          `
        : null}

      <div class="pdf-preview-container" @click=${this.openZoom}>
        ${this.isLoading
          ? html`
              <div class="loading-overlay">
                <div class="spinner"></div>
                <div>Cargando PDF...</div>
              </div>
            `
          : null}
        <canvas class="pdf-preview-canvas"></canvas>
      </div>
    `;
  }
}

customElements.define('pdf-zoom-viewer', PdfZoomViewer);