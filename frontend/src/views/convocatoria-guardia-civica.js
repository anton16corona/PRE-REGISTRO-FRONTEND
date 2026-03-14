import { ConvocatoriaBase } from './convocatoria-base.js';

/**
 * Convocatoria Guardia Cívica
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaGuardiaCivica extends ConvocatoriaBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Guardia Cívica.';
    this.frase = '¡Forma parte de nuestro cuerpo de Guardia Cívica!';
    this.descripcion = 'Personal de apoyo para la promoción de la cultura cívica y civilidad, mantener la convivencia y tranquilidad comunitarias, mediante la aplicación de los reglamentos en la materia y justicia cívica, con enfoque en la justicia cotidiana para la resolución de conflictos a través de mecanismos alternativos y la celebración de convenios y acuerdos con la ciudadanía, en los términos de la normativa correspondiente.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#222a3f';
    this.colorFrase = '#4f5a61';
    this.colorBtnPrimario = '#0f4a71';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#6ebfc9';

    // ========== CONFIGURACIÓN DE CARRUSEL DOBLE ==========
    this.tipoCarrusel = 'doble';
    this.carouselImagesLeft = [
      '/assets/guardia/CivicaA.jpg',
      '/assets/guardia/CivicaB.jpg',
      '/assets/guardia/CivicaC.jpg',
      '/assets/guardia/CivicaD.jpg'
    ];
    this.carouselImagesRight = [
      '/assets/guardia/CivicaE.jpg',
      '/assets/guardia/CivicaF.jpg',
      '/assets/guardia/CivicaG.jpg',
      '/assets/guardia/CivicaH.jpg'
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-guardia.pdf';
    this.backRoute = '/perfiles-guardias';

    // ========== ESTADO CONVOCATORIA ==========
    // Cambiar a false cuando no haya convocatoria abierta
    this.convocatoriaActiva = true;
  }
}

customElements.define('convocatoria-guardia-civica', ConvocatoriaGuardiaCivica);