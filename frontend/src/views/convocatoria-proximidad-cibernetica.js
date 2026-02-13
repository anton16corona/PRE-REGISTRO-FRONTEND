import { ConvocatoriaProximidadBase } from './convocatoria-proximidad-base.js';

/**
 * Convocatoria Policía de Proximidad Especializada - Cibernética
 * Extiende el componente base con configuración específica
 */
export class ConvocatoriaProximidadCibernetica extends ConvocatoriaProximidadBase {
  constructor() {
    super();

    // ========== CONFIGURACIÓN DE CONTENIDO ==========
    this.titulo = 'Policía de Proximidad Especializada para la Policía Cibernética';
    this.frase = '¡Forma parte de nuestro cuerpo de Proximidad!';
    this.descripcion = 'Salvaguardar la integridad y derechos de las personas, así como preservar la libertad, el orden y la paz pública dentro del municipio de Querétaro, este perfil se encuentra enfocado en la prevención y combate de delitos digitales, combinando la cercanía comunitaria con conocimientos tecnológicos para proteger a los ciudadanos en el entorno online. Lo anterior bajo los principios constitucionales de legalidad, objetividad, eficiencia, profesionalismo, honradez, respeto a los derechos humanos y perspectiva de género.';

    // ========== CONFIGURACIÓN DE COLORES ==========
    this.colorTitulo = '#10262b';
    this.colorFrase = '#4f5a61';
    this.colorCta = '#143943';
    this.colorBtnPrimario = '#45677c';
    this.colorTextoBtnPrimario = '#fff';
    this.colorBtnSecundario = '#6ebfc9';

    // ========== CONFIGURACIÓN DE CARRUSEL SIMPLE ==========
    this.tipoCarrusel = 'simple';
    this.carouselImages = [
      '/src/assets/proximidad/CiberneticaA.jpg',
      '/src/assets/proximidad/CiberneticaB.jpg',
      '/src/assets/proximidad/CiberneticaC.jpg',
    ];

    // ========== RUTAS ==========
    this.pdfUrl = '/convocatoria/convocatoria-proximidad.pdf';
    this.backRoute = '/perfiles-proximidad';

    // ========== CONVOCATORIA CERRADA ==========
    this.convocatoriaActiva = false; // 🔴 Esta convocatoria está cerrada.
  }
}

customElements.define('convocatoria-proximidad-cibernetica', ConvocatoriaProximidadCibernetica);