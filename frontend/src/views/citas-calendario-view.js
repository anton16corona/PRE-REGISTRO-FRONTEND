import { LitElement, html } from 'lit';
import './alerta-view.js';
import '../components/ipes-header.js';
import { citasCalendarioStyles } from '../styles/citas-calendario.styles.js';

// ============ CONFIGURACIÓN DE CONVOCATORIAS ============
const CONVOCATORIAS_CONFIG = {
  '/convocatoria-guardia-civica': {
    nombre: 'GUARDIA CÍVICA',
    fechaInicio: '2026-02-15',
    fechaFin: '2026-04-15'
  },
  '/convocatoria-guardia-vial': {
    nombre: 'GUARDIA VIAL',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31'
  },
  '/convocatoria-guardia-auxiliar': {
    nombre: 'GUARDIA AUXILIAR',
    fechaInicio: '2026-02-10',
    fechaFin: '2026-04-10'
  },
  '/convocatoria-proximidad': {
    nombre: 'POLICÍA DE PROXIMIDAD',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-04-30'
  },
    '/convocatoria-proximidad-cibernetica': {
    nombre: 'POLICÍA DE PROXIMIDAD CIBERNETICA',
    fechaInicio: '2026-02-27',
    fechaFin: '2026-04-5'
  },
    '/convocatoria-proximidad-seg-pub': {
    nombre: 'POLICÍA DE PROXIMIDAD',
    fechaInicio: '2026-03-08',
    fechaFin: '2026-04-15'
  },
    '/convocatoria-proximidad-victimas': {
    nombre: 'POLICÍA DE PROXIMIDAD',
    fechaInicio: '2026-03-21',
    fechaFin: '2026-05-10'
  },
  '/convocatoria-auxiliar': {
    nombre: 'POLICÍA AUXILIAR',
    fechaInicio: '2026-03-19',
    fechaFin: '2026-05-03'
  }
};

// ============ DÍAS FESTIVOS 2026 ============
const DIAS_FESTIVOS = new Set([
  '2026-01-01', // Año Nuevo
  '2026-02-02', // Día de la Constitución (primer lunes de febrero)
  '2026-03-16', // Natalicio de Benito Juárez (tercer lunes de marzo)
  '2026-05-01', // Día del Trabajo
  '2026-09-16', // Independencia
  '2026-11-16', // Revolución Mexicana (tercer lunes de noviembre)
  '2026-12-25'  // Navidad
]);

export class CitasCalendarioView extends LitElement {
  static styles = [citasCalendarioStyles];

  static properties = {
    showHorarios: { type: Boolean },
    horaSeleccionada: { type: String },
    mostrarAlerta: { type: Boolean },
    alertaConfig: { type: Object },
    
    diasMes: { type: Array },
    diaSeleccionado: { type: Number },
    tipoDisponibilidad: { type: String },
    fechaSeleccionada: { type: String },

    horariosDia: { type: Array },
    mesActual: { type: Number },
    anioActual: { type: Number },
    nombreMesActual: { type: String },
    
    convocatoriaOrigen: { type: String },
    configConvocatoria: { type: Object },
    mesesDisponibles: { type: Array }
  };

  constructor() {
    super();
    this.showHorarios = false;
    this.horaSeleccionada = null;
    this.mostrarAlerta = false;
    this.alertaConfig = {};
    this.diasMes = [];

    // Recuperar selección previa
    this.diaSeleccionado = sessionStorage.getItem('cita_dia')
      ? Number(sessionStorage.getItem('cita_dia'))
      : null;

    this.tipoDisponibilidad = sessionStorage.getItem('cita_tipo');
    this.horaSeleccionada = sessionStorage.getItem('cita_hora');
    this.showHorarios = !!this.diaSeleccionado;
    this.fechaSeleccionada = sessionStorage.getItem('cita_fecha');

    this.horariosDia = [];
    
    // Configuración de calendario
    const hoy = new Date();
    this.mesActual = hoy.getMonth();
    this.anioActual = hoy.getFullYear();
    this.nombreMesActual = '';
    
    // Configuración de convocatoria
    this.convocatoriaOrigen = sessionStorage.getItem('origen_convocatoria');
    this.configConvocatoria = CONVOCATORIAS_CONFIG[this.convocatoriaOrigen] || null;
    this.mesesDisponibles = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.calcularMesesDisponibles();
    this.generarCalendarioMes();
  }

  /* ================== CÁLCULO DE MESES DISPONIBLES ================== */
  calcularMesesDisponibles() {
    if (!this.configConvocatoria) {
      // Si no hay config, mostrar solo mes actual
      this.mesesDisponibles = [{
        mes: this.mesActual,
        anio: this.anioActual,
        nombre: this.getNombreMes(this.mesActual)
      }];
      return;
    }

    const fechaInicio = new Date(this.configConvocatoria.fechaInicio);
    const fechaFin = new Date(this.configConvocatoria.fechaFin);
    
    const meses = [];
    let current = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    const end = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), 1);

    while (current <= end) {
      meses.push({
        mes: current.getMonth(),
        anio: current.getFullYear(),
        nombre: this.getNombreMes(current.getMonth())
      });
      current.setMonth(current.getMonth() + 1);
    }

    this.mesesDisponibles = meses;
  }

  getNombreMes(mes) {
    const nombres = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    return nombres[mes];
  }

  /* ================== NAVEGACIÓN DE MESES ================== */
  cambiarMes(mes, anio) {
    this.mesActual = mes;
    this.anioActual = anio;
    this.generarCalendarioMes();
    
    // Limpiar selección al cambiar de mes
    this.diaSeleccionado = null;
    this.showHorarios = false;
    this.horaSeleccionada = null;
    sessionStorage.removeItem('cita_dia');
    sessionStorage.removeItem('cita_tipo');
    sessionStorage.removeItem('cita_hora');
    sessionStorage.removeItem('cita_fecha');
  }

  /* ================== GENERACIÓN DE HORARIOS ================== */
  generarHorarios(fecha) {
    const f = new Date(fecha + 'T00:00:00');
    const diaSemana = f.getDay();

    // 🟦 SÁBADO (día 6)
    if (diaSemana === 6) {
      return [
        { hora: '09:00', ocupados: 0, capacidad: 6 },
        { hora: '11:00', ocupados: 0, capacidad: 6 }
      ];
    }

    //LUNES A VIERNES (días 1-5)
    return [
      { hora: '09:00', ocupados: 0, capacidad: 10 },
      { hora: '12:00', ocupados: 0, capacidad: 10 },
      { hora: '15:00', ocupados: 0, capacidad: 10 }
    ];
  }

  /* ================== VERIFICAR SI ES DÍA FESTIVO ================== */
  esDiaFestivo(fecha) {
    return DIAS_FESTIVOS.has(fecha);
  }

  /* ================== VERIFICAR SI ESTÁ EN RANGO DE CONVOCATORIA ================== */
  estaEnRangoConvocatoria(fecha) {
    if (!this.configConvocatoria) return true;

    const fechaObj = new Date(fecha + 'T00:00:00');
    const inicio = new Date(this.configConvocatoria.fechaInicio + 'T00:00:00');
    const fin = new Date(this.configConvocatoria.fechaFin + 'T00:00:00');

    return fechaObj >= inicio && fechaObj <= fin;
  }

  /* ================== OBTENER O CREAR DÍA EN AGENDA ================== */
  async obtenerOCrearDia(fecha) {
    const resp = await fetch(`http://localhost:3000/agenda?fecha=${fecha}`);
    const data = await resp.json();

    if (data.length > 0) {
      const dia = data[0];
      
      // MIGRAR FORMATO VIEJO SI ES NECESARIO
      if (!dia.horarios[0].capacidad) {
        console.log('Migrando agenda con formato antiguo...');
        
        const horariosNuevos = this.generarHorarios(fecha);
        const diaActualizado = {
          ...dia,
          horarios: horariosNuevos
        };

        await fetch(`http://localhost:3000/agenda/${dia.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(diaActualizado)
        });

        return diaActualizado;
      }

      return dia;
    }

    // NO CREAR DÍAS DOMINGO O FESTIVOS
    const f = new Date(fecha + 'T00:00:00');
    if (f.getDay() === 0 || this.esDiaFestivo(fecha)) {
      throw new Error('Día inhábil');
    }

    //CREAR NUEVO DÍA
    const nuevoDia = {
      fecha,
      horarios: this.generarHorarios(fecha)
    };

    const crear = await fetch('http://localhost:3000/agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoDia)
    });

    return await crear.json();
  }

  /* ================== CALCULAR DISPONIBILIDAD DE UN DÍA ================== */

  async calcularDisponibilidadDia(fecha) {
  const f = new Date(fecha + 'T00:00:00');
  const diaSemana = f.getDay();

  if (diaSemana === 0 || this.esDiaFestivo(fecha)) return 'rojo';
  if (!this.estaEnRangoConvocatoria(fecha)) return 'rojo';

  try {
    const resp = await fetch(`http://localhost:3000/agenda?fecha=${fecha}`);
    const data = await resp.json();

    if (data.length === 0) return 'verde';

    const dia = data[0];
    let totalCapacidad = 0;
    let totalOcupados = 0;

    dia.horarios.forEach(h => {
      totalCapacidad += h.capacidad ?? 10;
      totalOcupados += h.ocupados ?? 0;
    });

    const porcentaje = totalCapacidad > 0 ? totalOcupados / totalCapacidad : 0;

    if (porcentaje >= 1)   return 'rojo';
    if (porcentaje >= 0.7) return 'amarillo';
    return 'verde';

  } catch (e) {
    console.warn(`Error calculando disponibilidad para ${fecha}:`, e);
    return 'verde'; // Asumir disponible si falla la red
  }
}
  /* ================== GENERAR CALENDARIO DEL MES ================== */
async generarCalendarioMes() {
  const anio = this.anioActual;
  const mes = this.mesActual;

  this.nombreMesActual = `${this.getNombreMes(mes)} ${anio}`;

  const primerDia = new Date(anio, mes, 1).getDay();
  const totalDias = new Date(anio, mes + 1, 0).getDate();

  //Construir lista de fechas del mes
  const fechas = [];
  for (let i = 1; i <= totalDias; i++) {
    const fecha = new Date(anio, mes, i);
    fechas.push({
      dia: i,
      fecha: fecha.toISOString().split('T')[0]
    });
  }

  //Calcular disponibilidad en PARALELO (mucho más rápido)
  const disponibilidades = await Promise.all(
    fechas.map(f => this.calcularDisponibilidadDia(f.fecha))
  );

  // Armar el array final con espacios vacíos + días
  const dias = [];

  for (let i = 0; i < primerDia; i++) {
    dias.push({ tipo: 'vacio' });
  }

  fechas.forEach((f, i) => {
    dias.push({
      dia: f.dia,
      fecha: f.fecha,
      tipo: disponibilidades[i]
    });
  });

  //Asignar → dispara re-render de Lit
  this.diasMes = [...dias];
}

  /* ================== SELECCIÓN DE DÍA ================== */
  async seleccionarDia(diaObj) {
    if (diaObj.tipo === 'rojo') {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'warning',
        titulo: 'Día no disponible',
        mensaje: 'Este día no está disponible para agendar citas.',
        extra: 'Por favor, selecciona otro día con disponibilidad.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    this.diaSeleccionado = diaObj.dia;
    this.tipoDisponibilidad = diaObj.tipo;
    this.fechaSeleccionada = diaObj.fecha;
    this.showHorarios = true;
    this.horaSeleccionada = null;

    sessionStorage.setItem('cita_dia', diaObj.dia);
    sessionStorage.setItem('cita_tipo', diaObj.tipo);
    sessionStorage.setItem('cita_fecha', diaObj.fecha);
    sessionStorage.removeItem('cita_hora');

    try {
      const dia = await this.obtenerOCrearDia(diaObj.fecha);
      this.horariosDia = dia.horarios;
    } catch (e) {
      this.horariosDia = [];
      console.error('Error al cargar horarios:', e);
    }
  }

  /* ================== SELECCIÓN DE HORA ================== */
  seleccionarHora(h) {
    this.horaSeleccionada = h;
    sessionStorage.setItem('cita_hora', h);
  }

  /* ================== CONFIRMAR CITA ================== */
  async confirmar() {
    if (!this.horaSeleccionada) {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'warning',
        titulo: 'Horario no seleccionado',
        mensaje: 'Para continuar, debes seleccionar un horario disponible antes de generar tu cita.',
        boton: 'ENTENDIDO'
      };
      return;
    }

    try {
      const dia = await this.obtenerOCrearDia(this.fechaSeleccionada);
      const horario = dia.horarios.find(h => h.hora === this.horaSeleccionada);

      if (!horario) {
        throw new Error('Horario no encontrado');
      }

      if (horario.ocupados >= horario.capacidad) {
        this.mostrarAlerta = true;
        this.alertaConfig = {
          tipo: 'error',
          titulo: 'Horario lleno',
          mensaje: 'Este horario ya no tiene espacios disponibles.',
          extra: 'Por favor, selecciona otro horario.',
          boton: 'ENTENDIDO'
        };
        return;
      }

      // Incrementar ocupados
      horario.ocupados++;

      // Actualizar visualmente
      this.horariosDia = [...dia.horarios];

      // Actualizar en BD
      await fetch(`http://localhost:3000/agenda/${dia.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dia)
      });

      // Crear cita
      await fetch('http://localhost:3000/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folio: sessionStorage.getItem('folio_preregistro'),
          fecha: this.fechaSeleccionada,
          hora: this.horaSeleccionada
        })
      });

      // Redirigir
      globalThis.history.pushState({}, '', '/cita-generada');
      globalThis.dispatchEvent(new PopStateEvent('popstate'));

    } catch (e) {
      this.mostrarAlerta = true;
      this.alertaConfig = {
        tipo: 'error',
        titulo: 'Error al generar cita',
        mensaje: e.message || 'Ocurrió un error al intentar generar la cita.',
        boton: 'ENTENDIDO'
      };
    }
  }

  /* ================== CERRAR ALERTA ================== */
  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  /* ================== RENDER ================== */
  render() {
    return html`
      ${this.mostrarAlerta ? html`
        <alerta-view
          modal
          .tipo=${this.alertaConfig.tipo}
          .titulo=${this.alertaConfig.titulo}
          .mensaje=${this.alertaConfig.mensaje}
          .extra=${this.alertaConfig.extra}
          .boton=${this.alertaConfig.boton}
          @aceptar=${this.cerrarAlerta}
        ></alerta-view>
      ` : ''}

      <ipes-header></ipes-header>

      <div class="fondo">
        <div class="card">
          <div class="titulo">SELECCIONA TU CITA</div>

          ${this.configConvocatoria ? html`
            <div class="info-convocatoria">
              <strong>${this.configConvocatoria.nombre}</strong><br>
              Periodo: ${new Date(this.configConvocatoria.fechaInicio).toLocaleDateString('es-MX')} 
              - ${new Date(this.configConvocatoria.fechaFin).toLocaleDateString('es-MX')}
            </div>
          ` : ''}

          <!-- NAVEGACIÓN DE MESES -->
          ${this.mesesDisponibles.length > 1 ? html`
            <div class="navegacion-meses">
              ${this.mesesDisponibles.map(m => html`
                <button 
                  class="btn-mes ${m.mes === this.mesActual && m.anio === this.anioActual ? 'activo' : ''}"
                  @click=${() => this.cambiarMes(m.mes, m.anio)}
                >
                  ${m.nombre} ${m.anio}
                </button>
              `)}
            </div>
          ` : ''}

          <div class="contenido">
            <div>
              <div style="text-align:center;font-weight:bold;margin-bottom:10px;color:#000;">
                ${this.nombreMesActual}
              </div>

              <div class="semana">
                <div>DOM</div><div>LUN</div><div>MAR</div>
                <div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div>
              </div>

              <div class="dias">
                ${this.diasMes.map(d =>
                  d.tipo === 'vacio'
                    ? html`<div class="dia vacio"></div>`
                    : html`
                      <div
                        class="dia ${d.tipo} ${this.diaSeleccionado === d.dia ? 'seleccionado' : ''}"
                        @click=${() => this.seleccionarDia(d)}
                      >
                        ${d.dia}
                      </div>
                    `
                )}
              </div>
            </div>

            <div class="leyenda">
              <h4>Disponibilidad</h4>

              <div class="leyenda-item">
                <div class="color-box color-rojo"></div>
                <div>Día inhábil / No disponible</div>
                <strong>0%</strong>
              </div>

              <div class="leyenda-item">
                <div class="color-box color-amarillo"></div>
                <div>Disponibilidad limitada</div>
                <strong>70% - 99%</strong>
              </div>

              <div class="leyenda-item">
                <div class="color-box color-verde"></div>
                <div>Alta disponibilidad</div>
                <strong>0% - 69%</strong>
              </div>
            </div>

            ${this.showHorarios ? html`
              <div class="horarios">
                <h4>Horarios disponibles</h4>
                ${this.horariosDia.length > 0 ? this.horariosDia.map(hObj => {
                  const disponibles = hObj.capacidad - hObj.ocupados;
                  const lleno = disponibles <= 0;

                  return html`
                    <div class="hora ${lleno ? 'lleno' : 'disponible'}">
                      <div>
                        <strong>${hObj.hora}</strong>
                        <small>(${disponibles}/${hObj.capacidad} disponibles)</small>
                      </div>
                      <input 
                        type="radio" 
                        name="hora"
                        ?disabled=${lleno}
                        .checked=${this.horaSeleccionada === hObj.hora}
                        @change=${() => this.seleccionarHora(hObj.hora)} 
                      />
                    </div>
                  `;
                }) : html`
                  <p style="text-align:center;color:#666;">
                    No hay horarios disponibles para este día
                  </p>
                `}
              </div>
            ` : ''}
          </div>

          ${this.diaSeleccionado ? html`
            <div class="resumen-seleccion">
              <strong>Día seleccionado:</strong> ${this.diaSeleccionado} de ${this.getNombreMes(this.mesActual)}<br>
              <strong>Disponibilidad:</strong>
              ${this.tipoDisponibilidad === 'verde' ? 'Alta' : 'Limitada'}<br>
              <strong>Hora:</strong> ${this.horaSeleccionada ?? 'No seleccionada'}
            </div>
          ` : ''}

          <div class="acciones">
            <div class="btn sec" @click=${() => {
              sessionStorage.removeItem('cita_dia');
              sessionStorage.removeItem('cita_tipo');
              sessionStorage.removeItem('cita_hora');
              sessionStorage.removeItem('cita_fecha');
              history.back();
            }}>
              REGRESAR
            </div>
            <div class="btn" @click=${this.confirmar}>GENERAR CITA</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('citas-calendario-view', CitasCalendarioView);