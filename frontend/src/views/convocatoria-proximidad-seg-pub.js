import { ConvocatoriaProximidadBase } from './convocatoria-proximidad-base.js';

/**
 * Convocatoria Policía de Proximidad Especializada - Analista en Seguridad Pública
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaProximidadSegPub extends ConvocatoriaProximidadBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Policía de proximidad especializada para Analista en Seguridad Pública';
    this.frase = '¡Forma parte de nuestro cuerpo de Proximidad!';
    this.descripcion = 'Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la paz pública dentro del municipio de Querétaro a través de la interacción directa con la ciudadanía con el uso de inteligencia delictiva para mejorar la seguridad. Este perfil combina habilidades de policía de proximidad con el manejo de datos para identificar patrones, tendencias de delitos y focos rojos (hot spots), bajo los principios constitucionales de legalidad, objetividad, eficiencia, profesionalismo, honradez, respeto a los derechos humanos y perspectiva de género.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#325fa9';
    this.colorFrase = '#4f5a61';
    this.colorCta = '#174287';
    this.colorBtnPrimario = '#555c7a';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#a4a9ad';

    // ========== CONFIGURACIÓN DE CARRUSEL DOBLE ==========
    this.tipoCarrusel = 'doble';
    this.carouselImagesLeft = [
      '/src/assets/proximidad/SegPubA.jpeg',
      '/src/assets/proximidad/SegPubB.jpeg',
      '/src/assets/proximidad/SegPubC.jpeg'
    ];
    this.carouselImagesRight = [
      '/src/assets/proximidad/SegPubD.jpeg',
      '/src/assets/proximidad/SegPubE.jpeg',
      '/src/assets/proximidad/SegPubF.jpeg'
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-proximidad.pdf';
    this.backRoute = '/perfiles-proximidad';

    // ========== CONVOCATORIA ACTIVA ==========
    this.convocatoriaActiva = true;
  }
}

customElements.define('convocatoria-proximidad-seg-pub', ConvocatoriaProximidadSegPub);