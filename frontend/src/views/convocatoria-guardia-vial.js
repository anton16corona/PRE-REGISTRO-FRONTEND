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
      '/assets/guardia/VialA.JPG',
      '/assets/guardia/VialB.JPG',
      '/assets/guardia/VialC.JPG',
      '/assets/guardia/VialD.jpg',
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-guardia.pdf';
    this.backRoute = '/perfiles-guardias';
    
    // ========== ESTADO CONVOCATORIA ==========
    // Cambiar a false cuando no haya convocatoria abierta
    this.convocatoriaActiva = true;
  }
}

customElements.define('convocatoria-guardia-vial', ConvocatoriaGuardiaVial);