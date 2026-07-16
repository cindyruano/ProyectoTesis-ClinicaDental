import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  addOutline,
  searchOutline,
  checkmarkCircleOutline,
  timeOutline,
  closeCircleOutline,
  createOutline,
  trashOutline,
  syncOutline,
  calendarOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  chevronBackOutline,
  chevronForwardOutline
} from 'ionicons/icons';

interface Cita {
  id: number;
  hora: string;
  pacienteNombre: string;
  pacienteDpi: string;
  tratamiento: string;
  doctorKey: string;
  doctorNombre: string;
  whatsappEstado: 'confirmed' | 'pending' | 'failed';
  whatsappTexto: string;
  estado: 'scheduled' | 'cancelled';
  estadoTexto: string;
}

@Component({
  selector: 'app-tab2-web',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {
  private router = inject(Router);

  // Signals para Filtros y Búsqueda
  public buscarTexto = signal<string>('');
  public doctorFiltro = signal<string>('todos');

  // Signals para Paginación
  public paginaActual = signal<number>(1);
  public registrosPorPagina = 3;

  // Dataset
  public citas = signal<Cita[]>([
    {
      id: 1,
      hora: '09:00 AM',
      pacienteNombre: 'Carlos Mendoza',
      pacienteDpi: '2981-3312',
      tratamiento: 'Limpieza Dental Profunda',
      doctorKey: 'melissa',
      doctorNombre: 'Dra. Melissa Montenegro',
      whatsappEstado: 'confirmed',
      whatsappTexto: 'Confirmado',
      estado: 'scheduled',
      estadoTexto: 'Programada'
    },
    {
      id: 2,
      hora: '10:30 AM',
      pacienteNombre: 'Sofía Herrera',
      pacienteDpi: '1045-8921',
      tratamiento: 'Evaluación Ortodoncia',
      doctorKey: 'doctor3',
      doctorNombre: 'Dra. Ana Gómez',
      whatsappEstado: 'pending',
      whatsappTexto: 'Enviado (Sin resp.)',
      estado: 'scheduled',
      estadoTexto: 'Programada'
    },
    {
      id: 3,
      hora: '12:00 PM',
      pacienteNombre: 'Jorge Ortega',
      pacienteDpi: '3122-4541',
      tratamiento: 'Extracción Tercer Molar',
      doctorKey: 'doctor4',
      doctorNombre: 'Dr. Carlos Ruíz',
      whatsappEstado: 'failed',
      whatsappTexto: 'Canceló Cita',
      estado: 'cancelled',
      estadoTexto: 'Cancelada'
    }
  ]);

  constructor() {
    addIcons({
      addOutline,
      searchOutline,
      checkmarkCircleOutline,
      timeOutline,
      closeCircleOutline,
      createOutline,
      trashOutline,
      syncOutline,
      calendarOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      chevronBackOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {}

  // 1. Filtrar citas por odontólogo y búsqueda
  public citasFiltradas = computed(() => {
    return this.citas().filter(cita => {
      const cumpleTexto =
        cita.pacienteNombre.toLowerCase().includes(this.buscarTexto().toLowerCase()) ||
        cita.pacienteDpi.includes(this.buscarTexto());

      const cumpleDoctor =
        this.doctorFiltro() === 'todos' ||
        cita.doctorKey === this.doctorFiltro();

      return cumpleTexto && cumpleDoctor;
    });
  });

  // 2. Segmentar las citas para mostrar solo las de la página actual
  public citasPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    return this.citasFiltradas().slice(inicio, fin);
  });

  // 3. Cálculos de control de paginación
  public totalRegistrosFiltrados = computed(() => this.citasFiltradas().length);

  public totalPaginas = computed(() => {
    const paginas = Math.ceil(this.totalRegistrosFiltrados() / this.registrosPorPagina);
    return paginas > 0 ? paginas : 1;
  });

  public totalPaginasArray = computed(() => {
    return Array.from({ length: this.totalPaginas() }, (_, i) => i + 1);
  });

  public registroInicio = computed(() => {
    if (this.totalRegistrosFiltrados() === 0) return 0;
    return (this.paginaActual() - 1) * this.registrosPorPagina + 1;
  });

  public registroFin = computed(() => {
    const finEstimado = this.paginaActual() * this.registrosPorPagina;
    return finEstimado > this.totalRegistrosFiltrados() ? this.totalRegistrosFiltrados() : finEstimado;
  });

  // Generador de iniciales
  public obtenerIniciales(nombre: string): string {
    if (!nombre) return '';
    const partes = nombre.trim().split(/\s+/);
    const primera = partes[0] ? partes[0].charAt(0) : '';
    const segunda = partes[1] ? partes[1].charAt(0) : '';
    return (primera + segunda).toUpperCase();
  }

  // Selector de colores de Avatar
  public obtenerColorAvatar(id: number): string {
    const colores = ['teal', 'amber', 'indigo'];
    return colores[id % colores.length];
  }

  // Actualizadores de Estado
  public actualizarBusqueda(evento: any) {
    this.buscarTexto.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public actualizarFiltroDoctor(evento: any) {
    this.doctorFiltro.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }

  public nuevaCita() {
    console.log('Navegar a creación de cita');
  }
}
