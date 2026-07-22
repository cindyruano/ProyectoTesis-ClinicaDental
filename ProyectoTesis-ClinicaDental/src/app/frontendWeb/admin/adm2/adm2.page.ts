import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline, searchOutline, checkmarkCircleOutline, timeOutline, closeCircleOutline, createOutline, trashOutline, syncOutline, calendarOutline, notificationsOutline, shieldCheckmarkOutline, chevronBackOutline, chevronForwardOutline, warningOutline, peopleOutline, cashOutline, closeOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';

interface CitaCalendar {
  id: number;
  fechaStr: string;
  hora: string;
  pacienteNombre: string;
  doctorNombre: string;
  doctorKey: string;
  tratamiento: string;
  categoria: 'orthodontics' | 'surgery' | 'cleaning' | 'reserved';
  estado: 'pending' | 'in-progress' | 'completed';
  alerta?: boolean;
}

interface DiaCalendario {
  nombre: string;
  numero: number;
  fechaStr: string;
  esHoy: boolean;
  esDelMesActual?: boolean;
}

@Component({
  selector: 'app-adm2-web',
  templateUrl: './adm2.page.html',
  styleUrls: ['./adm2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
})
export class Adm2Page implements OnInit {
  private router = inject(Router);

  public rolUsuario: 'admin' | 'doctor' | 'auxiliar' = 'admin';
  public doctorAsignadoKey: string = 'melissa';
  public buscarTexto = signal<string>('');
  public doctorFiltro = signal<string>('todos');
  public vistaCalendar = signal<'day' | 'week' | 'month'>('month');
  public fechaReferencia = signal<Date>(new Date(2026, 6, 21));
  public modalDiaAbierto = signal<boolean>(false);
  public diaSeleccionado = signal<DiaCalendario | null>(null);

  public horasDia: string[] = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  public citas = signal<CitaCalendar[]>([
    {
      id: 1,
      fechaStr: '2026-07-20',
      hora: '09:00 AM',
      pacienteNombre: 'Alice Thompson',
      doctorNombre: 'Dra. Melissa Montenegro',
      doctorKey: 'melissa',
      tratamiento: 'ORTODONCIA',
      categoria: 'orthodontics',
      estado: 'completed'
    },
    {
      id: 2,
      fechaStr: '2026-07-21',
      hora: '09:00 AM',
      pacienteNombre: 'Mark Johnson',
      doctorNombre: 'Dra. Ana Gómez',
      doctorKey: 'doctor3',
      tratamiento: 'LIMPIEZA',
      categoria: 'cleaning',
      estado: 'completed'
    },
    {
      id: 3,
      fechaStr: '2026-07-21',
      hora: '11:00 AM',
      pacienteNombre: 'Sophia Martinez',
      doctorNombre: 'Dra. Melissa Montenegro',
      doctorKey: 'melissa',
      tratamiento: 'ORTODONCIA',
      categoria: 'orthodontics',
      estado: 'in-progress'
    },
    {
      id: 4,
      fechaStr: '2026-07-21',
      hora: '02:00 PM',
      pacienteNombre: 'David Villa',
      doctorNombre: 'Dr. Juan Pérez',
      doctorKey: 'doctor2',
      tratamiento: 'RESERVADO',
      categoria: 'reserved',
      estado: 'pending'
    },
    {
      id: 5,
      fechaStr: '2026-07-22',
      hora: '09:00 AM',
      pacienteNombre: 'Robert Black',
      doctorNombre: 'Dr. Carlos Ruíz',
      doctorKey: 'doctor4',
      tratamiento: 'CIRUGÍA',
      categoria: 'surgery',
      estado: 'pending',
      alerta: true
    }
  ]);

  constructor() {
    addIcons({
      addOutline, searchOutline, checkmarkCircleOutline, timeOutline,
      closeCircleOutline, createOutline, trashOutline, syncOutline,
      calendarOutline, notificationsOutline, shieldCheckmarkOutline,
      chevronBackOutline, chevronForwardOutline, warningOutline,
      peopleOutline, cashOutline, closeOutline
    });
  }

  ngOnInit() {
    if (this.rolUsuario !== 'admin') {
      this.doctorFiltro.set(this.doctorAsignadoKey);
    }
  }

  public citasFiltradasGenerales = computed(() => {
    return this.citas().filter(cita => {
      const coincideDoctor = this.doctorFiltro() === 'todos' || cita.doctorKey === this.doctorFiltro();
      const coincideBusqueda = cita.pacienteNombre.toLowerCase().includes(this.buscarTexto().toLowerCase());
      return coincideDoctor && coincideBusqueda;
    });
  });

  public totalOrtodoncia = computed(() =>
    this.citasFiltradasGenerales().filter(c => c.categoria === 'orthodontics').length
  );

  public totalCirugia = computed(() =>
    this.citasFiltradasGenerales().filter(c => c.categoria === 'surgery').length
  );

  public totalLimpieza = computed(() =>
    this.citasFiltradasGenerales().filter(c => c.categoria === 'cleaning').length
  );

  public totalReservado = computed(() =>
    this.citasFiltradasGenerales().filter(c => c.categoria === 'reserved').length
  );

  public diasVisibles = computed<DiaCalendario[]>(() => {
    const ref = new Date(this.fechaReferencia());
    const hoyStr = new Date().toISOString().split('T')[0];
    const dias: DiaCalendario[] = [];
    const nombresDias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

    if (this.vistaCalendar() === 'day') {
      dias.push({
        nombre: nombresDias[ref.getDay()],
        numero: ref.getDate(),
        fechaStr: this.formatearFechaISO(ref),
        esHoy: this.formatearFechaISO(ref) === hoyStr,
        esDelMesActual: true
      });
    } else if (this.vistaCalendar() === 'week') {
      const dayOfWeek = ref.getDay();
      const diffToMonday = ref.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const lunes = new Date(ref.setDate(diffToMonday));

      for (let i = 0; i < 5; i++) {
        const d = new Date(lunes);
        d.setDate(lunes.getDate() + i);
        dias.push({
          nombre: nombresDias[d.getDay()],
          numero: d.getDate(),
          fechaStr: this.formatearFechaISO(d),
          esHoy: this.formatearFechaISO(d) === hoyStr,
          esDelMesActual: true
        });
      }
    } else if (this.vistaCalendar() === 'month') {
      const año = ref.getFullYear();
      const mes = ref.getMonth();

      const primerDiaMes = new Date(año, mes, 1);
      const ultimoDiaMes = new Date(año, mes + 1, 0);

      const diaSemanaInicio = primerDiaMes.getDay();
      const totalDiasMes = ultimoDiaMes.getDate();

      for (let i = 0; i < diaSemanaInicio; i++) {
        dias.push({ nombre: '', numero: 0, fechaStr: '', esHoy: false, esDelMesActual: false });
      }

      for (let day = 1; day <= totalDiasMes; day++) {
        const d = new Date(año, mes, day);
        const iso = this.formatearFechaISO(d);
        dias.push({
          nombre: nombresDias[d.getDay()],
          numero: day,
          fechaStr: iso,
          esHoy: iso === hoyStr,
          esDelMesActual: true
        });
      }
    }

    return dias;
  });

  public rangoFechaTexto = computed(() => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const ref = this.fechaReferencia();
    const mesNombre = meses[ref.getMonth()];
    const año = ref.getFullYear();

    if (this.vistaCalendar() === 'month') {
      return `${mesNombre} ${año}`;
    }

    const dias = this.diasVisibles();
    if (dias.length === 0) return '';

    if (this.vistaCalendar() === 'day') {
      return `${mesNombre} ${dias[0].numero}, ${año}`;
    } else {
      const primerDia = dias[0].numero;
      const ultimoDia = dias[dias.length - 1].numero;
      return `${mesNombre} ${primerDia} – ${ultimoDia}, ${año}`;
    }
  });

  public mesActualTexto = computed(() => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[this.fechaReferencia().getMonth()];
  });

  public abrirModalDia(dia: DiaCalendario) {
    this.diaSeleccionado.set(dia);
    this.modalDiaAbierto.set(true);
  }

  public cerrarModalDia() {
    this.modalDiaAbierto.set(false);
    this.diaSeleccionado.set(null);
  }

  public citasDiaSeleccionado = computed(() => {
    const dia = this.diaSeleccionado();
    if (!dia || !dia.fechaStr) return [];
    return this.obtenerCitasDelDia(dia.fechaStr);
  });

  public irAVistaDiaDesdeModal() {
    const dia = this.diaSeleccionado();
    if (dia) {
      const [año, mes, d] = dia.fechaStr.split('-').map(Number);
      this.fechaReferencia.set(new Date(año, mes - 1, d));
      this.vistaCalendar.set('day');
      this.cerrarModalDia();
    }
  }

  public cambiarVista(vista: 'day' | 'week' | 'month') {
    this.vistaCalendar.set(vista);
  }

  public navegarFecha(direccion: number) {
    const actual = new Date(this.fechaReferencia());

    if (this.vistaCalendar() === 'day') {
      actual.setDate(actual.getDate() + direccion);
    } else if (this.vistaCalendar() === 'week') {
      actual.setDate(actual.getDate() + (direccion * 7));
    } else if (this.vistaCalendar() === 'month') {
      actual.setMonth(actual.getMonth() + direccion);
    }

    this.fechaReferencia.set(actual);
  }

  public irHoy() {
    this.fechaReferencia.set(new Date());
  }

  public obtenerCitasPorDiaYHora(fechaStr: string, hora: string): CitaCalendar[] {
    return this.citas().filter(cita => {
      const coincideFechaHora = cita.fechaStr === fechaStr && cita.hora === hora;
      const coincideDoctor = this.doctorFiltro() === 'todos' || cita.doctorKey === this.doctorFiltro();
      const coincideBusqueda = cita.pacienteNombre.toLowerCase().includes(this.buscarTexto().toLowerCase());

      return coincideFechaHora && coincideDoctor && coincideBusqueda;
    });
  }

  public obtenerCitasDelDia(fechaStr: string): CitaCalendar[] {
    if (!fechaStr) return [];
    return this.citas().filter(cita => {
      const coincideFecha = cita.fechaStr === fechaStr;
      const coincideDoctor = this.doctorFiltro() === 'todos' || cita.doctorKey === this.doctorFiltro();
      const coincideBusqueda = cita.pacienteNombre.toLowerCase().includes(this.buscarTexto().toLowerCase());

      return coincideFecha && coincideDoctor && coincideBusqueda;
    });
  }

  private formatearFechaISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  public actualizarBusqueda(evento: any) {
    this.buscarTexto.set(evento.target.value);
  }

  public actualizarFiltroDoctor(evento: any) {
    if (this.rolUsuario === 'admin') {
      this.doctorFiltro.set(evento.target.value);
    }
  }

  public nuevaCita() {
    this.router.navigate(['/admin/adm3']);
  }
}
