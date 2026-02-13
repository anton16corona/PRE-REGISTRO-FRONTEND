import { ConvocatoriaProximidadBase } from './convocatoria-proximidad-base.js';

/**
 * Convocatoria Policía de Proximidad
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaProximidad extends ConvocatoriaProximidadBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Policía de Proximidad';
    this.frase = '¡Forma parte de nuestro cuerpo de Proximidad!';
    this.descripcion = 'Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la paz pública dentro del municipio de Querétaro a través de la ejecución de acciones policiales tendientes a la investigación, prevención y persecución de delitos y faltas administrativas en coordinación con las Instituciones competentes, bajo los principios constitucionales de legalidad, objetividad, eficiencia, profesionalismo, honradez, respeto a los derechos humanos y perspectiva de género.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#10262b';
    this.colorFrase = '#4f5a61';
    this.colorCta = '#143943';
    this.colorBtnPrimario = '#45677c';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#6ebfc9';

    // ========== CONFIGURACIÓN DE CARRUSEL DOBLE ==========
    this.tipoCarrusel = 'doble';
    this.carouselImagesLeft = [
      '/src/assets/proximidad/ProximidadA.jpg',
      '/src/assets/proximidad/ProximidadB.jpg',
      '/src/assets/proximidad/ProximidadC.jpg',
      '/src/assets/proximidad/ProximidadD.jpg',
      '/src/assets/proximidad/ProximidadE.jpg',
    ];
    this.carouselImagesRight = [
      '/src/assets/proximidad/ProximidadF.jpg',
      '/src/assets/proximidad/ProximidadG.jpg',
      '/src/assets/proximidad/ProximidadH.jpg',
      '/src/assets/proximidad/ProximidadI.jpg',
      '/src/assets/proximidad/ProximidadJ.jpg'
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-proximidad.pdf';
    this.backRoute = '/perfiles-proximidad';

    // ========== CONVOCATORIA ACTIVA ==========
    this.convocatoriaActiva = true;
  }
}

customElements.define('convocatoria-proximidad', ConvocatoriaProximidad);