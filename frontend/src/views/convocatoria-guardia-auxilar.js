import { ConvocatoriaBase } from './convocatoria-base.js';

/**
 * Convocatoria Guardia Auxiliar
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaGuardiaAuxiliar extends ConvocatoriaBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Guardia Auxiliar.';
    this.frase = '¡Forma parte de nuestro cuerpo de Guardia Auxiliar!';
    this.descripcion = 'Personal de apoyo para realizar acciones de custodia, vigilancia y seguridad en espacios públicos o privados, con el objetivo de prevención y protección a la ciudadanía.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#2d5080';
    this.colorFrase = '#20395b';
    this.colorBtnPrimario = '#467ec9';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#4b5057';

    // ========== CONFIGURACIÓN DE CARRUSEL ==========
    this.tipoCarrusel = 'simple';
    this.carouselImages = [
      '/src/assets/guardia/AuxiliarA.jpg',
      '/src/assets/guardia/AuxiliarB.jpg',
      '/src/assets/guardia/AuxiliarC.jpg',
      '/src/assets/guardia/AuxiliarD.jpg',
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-guardia.pdf';
    this.backRoute = '/perfiles-guardias';
  }
}

customElements.define('convocatoria-guardia-auxiliar', ConvocatoriaGuardiaAuxiliar);