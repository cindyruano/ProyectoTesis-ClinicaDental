import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  peopleOutline,
  personAddOutline,
  starOutline,
  createOutline,
  barChartOutline,
  chatbubbleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  trendingUpOutline,
  megaphoneOutline,
  closeCircleOutline
} from 'ionicons/icons';

interface BloqueTiempo {
  tipo: 'standard' | 'emergency' | 'surgery' | 'cancelled' | 'break' | 'vacio';
  titulo?: string;
  colspan?: number;
}

interface DoctorV2 {
  id: number;
  nombre: string;
  iniciales: string;
  especialidad: string;
  estado: 'Activo' | 'En Consulta' | 'Fuera de Servicio';
  estadoClass: string;
  satisfaccion: number;
  metaProgreso: number;
  pacientesPrevios: string[];
  pacientesExtra: number;
  proximaCita?: string;
  mensajeEspecial?: string;
  bloques: BloqueTiempo[];
}

interface PacienteCola {
  id: number;
  nombre: string;
  iniciales: string;
  motivo: string;
  doctor: string;
  horaLlegada: string;
  tiempoEspera: string;
  estado: 'En Espera' | 'En Consulta' | 'Prioritario';
  estadoClass: string;
  avatarColor: string;
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {

  public buscarTexto = signal<string>('');
  public especialidadFiltro = signal<string>('Todas');
  public estadoFiltro = signal<string>('Todos');
  public tabActiva = signal<'overview' | 'timeline' | 'queue'>('overview');

  public doctores = signal<DoctorV2[]>([
    {
      id: 1,
      nombre: 'Dr. Julian Thorne',
      iniciales: 'TH',
      especialidad: 'Endodoncia',
      estado: 'Activo',
      estadoClass: 'scheduled',
      satisfaccion: 4.9,
      metaProgreso: 88,
      pacientesPrevios: ['PT', 'JD', 'ML'],
      pacientesExtra: 4,
      proximaCita: '14:30 PM',
      bloques: [
        { tipo: 'standard', titulo: 'Endodoncia - Smith', colspan: 2 },
        { tipo: 'vacio', colspan: 1 },
        { tipo: 'standard', titulo: 'Consulta de Puente', colspan: 2 },
        { tipo: 'break', titulo: 'Administración / Descanso', colspan: 2 }
      ]
    },
    {
      id: 2,
      nombre: 'Dra. Elena Rodríguez',
      iniciales: 'RO',
      especialidad: 'Cirujano Dentista',
      estado: 'En Consulta',
      estadoClass: 'pending',
      satisfaccion: 4.7,
      metaProgreso: 62,
      pacientesPrevios: ['AB', 'KC'],
      pacientesExtra: 1,
      proximaCita: '15:00 PM',
      bloques: [
        { tipo: 'emergency', titulo: 'Emergencia Ext.', colspan: 1 },
        { tipo: 'vacio', colspan: 1 },
        { tipo: 'surgery', titulo: 'Cirugía Compleja - Sala A', colspan: 3 },
        { tipo: 'vacio', colspan: 2 }
      ]
    },
    {
      id: 3,
      nombre: 'Dr. Marcus Vance',
      iniciales: 'VA',
      especialidad: 'Ortodoncia',
      estado: 'Activo',
      estadoClass: 'scheduled',
      satisfaccion: 5.0,
      metaProgreso: 95,
      pacientesPrevios: ['RS', 'TH'],
      pacientesExtra: 2,
      proximaCita: '14:00 PM',
      bloques: [
        { tipo: 'vacio', colspan: 1 },
        { tipo: 'standard', titulo: 'Examen de Seguimiento', colspan: 2 },
        { tipo: 'cancelled', titulo: 'CANCELADO', colspan: 1 },
        { tipo: 'standard', titulo: 'Limpieza - Múltiple', colspan: 3 }
      ]
    },
    {
      id: 4,
      nombre: 'Dr. Simon Kade',
      iniciales: 'SK',
      especialidad: 'Odontopediatría',
      estado: 'Fuera de Servicio',
      estadoClass: 'cancelled',
      satisfaccion: 4.8,
      metaProgreso: 40,
      pacientesPrevios: ['--'],
      pacientesExtra: 0,
      mensajeEspecial: 'Regresa Mañana',
      bloques: [
        { tipo: 'vacio', colspan: 7 }
      ]
    }
  ]);

  // Lista de pacientes en cola de espera
  public colaPacientes = signal<PacienteCola[]>([
    {
      id: 101,
      nombre: 'Ana María Beltrán',
      iniciales: 'AB',
      motivo: 'Revisión de Ortodoncia',
      doctor: 'Dr. Marcus Vance',
      horaLlegada: '10:15 AM',
      tiempoEspera: '12 mins',
      estado: 'En Espera',
      estadoClass: 'pending',
      avatarColor: 'teal'
    },
    {
      id: 102,
      nombre: 'Carlos Mendoza',
      iniciales: 'CM',
      motivo: 'Dolor Agudo (Emergencia)',
      doctor: 'Dra. Elena Rodríguez',
      horaLlegada: '10:20 AM',
      tiempoEspera: '7 mins',
      estado: 'Prioritario',
      estadoClass: 'scheduled',
      avatarColor: 'amber'
    },
    {
      id: 103,
      nombre: 'Sofía Peralta',
      iniciales: 'SP',
      motivo: 'Limpieza Dental',
      doctor: 'Dr. Julian Thorne',
      horaLlegada: '10:25 AM',
      tiempoEspera: '2 mins',
      estado: 'En Espera',
      estadoClass: 'pending',
      avatarColor: 'indigo'
    }
  ]);

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      peopleOutline,
      personAddOutline,
      starOutline,
      createOutline,
      barChartOutline,
      chatbubbleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      trendingUpOutline,
      megaphoneOutline,
      closeCircleOutline
    });
  }

  ngOnInit() {}

  public doctoresFiltrados = computed(() => {
    return this.doctores().filter(doc => {
      const cumpleTexto = doc.nombre.toLowerCase().includes(this.buscarTexto().toLowerCase()) ||
                          doc.especialidad.toLowerCase().includes(this.buscarTexto().toLowerCase());

      const cumpleEsp = this.especialidadFiltro() === 'Todas' || doc.especialidad === this.especialidadFiltro();
      const cumpleEst = this.estadoFiltro() === 'Todos' || doc.estado === this.estadoFiltro();

      return cumpleTexto && cumpleEsp && cumpleEst;
    });
  });

  public doctoresFiltradosTimeline = computed(() => {
    return this.doctores().filter(doc => {
      const cumpleEsp = this.especialidadFiltro() === 'Todas' || doc.especialidad === this.especialidadFiltro();
      const cumpleEst = this.estadoFiltro() === 'Todos' || doc.estado === this.estadoFiltro();
      return cumpleEsp && cumpleEst;
    });
  });

  public actualizarBusqueda(evento: any) {
    this.buscarTexto.set(evento.target.value);
  }

  public actualizarFiltroEspecialidad(evento: any) {
    this.especialidadFiltro.set(evento.target.value);
  }

  public actualizarFiltroEstado(evento: any) {
    this.estadoFiltro.set(evento.target.value);
  }

  public setTab(tab: 'overview' | 'timeline' | 'queue') {
    this.tabActiva.set(tab);
  }

  public registrarDoctor() {
    console.log('Registrar doctor');
  }

  public editarDoctor(id: number) {
    console.log('Editar doctor:', id);
  }

  public verMetricas(id: number) {
    console.log('Métricas:', id);
  }

  public contactarDoctor(id: number) {
    console.log('Contacto:', id);
  }

  public llamarPaciente(id: number) {
    console.log('Llamar paciente a consultorio:', id);
  }

  public cancelarCola(id: number) {
    this.colaPacientes.set(this.colaPacientes().filter(p => p.id !== id));
  }
}
