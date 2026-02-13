import { ConvocatoriaProximidadBase } from './convocatoria-proximidad-base.js';

/**
 * Convocatoria Policía de Proximidad Especializada - Atención a Víctimas
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaProximidadVictimas extends ConvocatoriaProximidadBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Policía de Proximidad Especializada para Atención a Víctimas de Violencia Familiar y de Género.';
    this.frase = '¡Forma parte de nuestro cuerpo de Proximidad!';
    this.descripcion = 'Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la paz pública dentro del municipio de Querétaro a través de la ejecución de acciones policiales tendientes a la investigación a través de la ejecución de acciones policiales tendientes a la atención a víctimas de Violencia Familiar y de Género. Perfil responsable de brindar ayuda, atención y asistencia a las víctimas, en coordinación con las Instituciones competentes, bajo los principios constitucionales de legalidad, objetividad, eficiencia, profesionalismo, honradez, respeto a los derechos humanos y perspectiva de género.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#4132a7';
    this.colorFrase = '#3b2b56';
    this.colorCta = '#360d61';
    this.colorBtnPrimario = '#514f77';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#a1942f';

    // ========== CONFIGURACIÓN DE CARRUSEL SIMPLE ==========
    this.tipoCarrusel = 'simple';
    this.carouselImages = [
      '/src/assets/proximidad/VictimasA.jpg',
      '/src/assets/proximidad/VictimasB.jpg',
      '/src/assets/proximidad/VictimasC.jpg',
      '/src/assets/proximidad/VictimasD.jpg',
      '/src/assets/proximidad/VictimasE.jpg',
      '/src/assets/proximidad/VictimasF.jpg'
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-proximidad.pdf';
    this.backRoute = '/perfiles-proximidad';

    // ========== CONVOCATORIA ACTIVA ==========
    this.convocatoriaActiva = true;
  }
}

customElements.define('convocatoria-proximidad-victimas', ConvocatoriaProximidadVictimas);