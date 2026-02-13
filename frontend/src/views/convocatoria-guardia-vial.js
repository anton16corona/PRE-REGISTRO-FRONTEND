import { ConvocatoriaBase } from './convocatoria-base.js';

/**
 * Convocatoria Guardia Vial
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaGuardiaVial extends ConvocatoriaBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Guardia Vial.';
    this.frase = '¡Forma parte de nuestro cuerpo de Guardia Vial!';
    this.descripcion = 'Personal de apoyo para promover el cumplimiento de los reglamentos de vialidad y tránsito, así como la aplicación de infracciones correspondientes ante un incumplimiento en la materia.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#353c18';
    this.colorFrase = '#6a7930';
    this.colorBtnPrimario = '#c2dd58';
    this.colorTextoBtnPrimario = '#000'; // Negro para el botón amarillo/verde
    this.colorBtnSecundario = '#606b68';

    // ========== CONFIGURACIÓN DE CARRUSEL ==========
    this.tipoCarrusel = 'simple';
    this.carouselImages = [
      '/src/assets/guardia/VialA.jpg',
      '/src/assets/guardia/VialB.jpg',
      '/src/assets/guardia/VialC.jpg',
      '/src/assets/guardia/VialD.jpg',
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-guardia.pdf';
    this.backRoute = '/perfiles-guardias';
  }
}

customElements.define('convocatoria-guardia-vial', ConvocatoriaGuardiaVial);