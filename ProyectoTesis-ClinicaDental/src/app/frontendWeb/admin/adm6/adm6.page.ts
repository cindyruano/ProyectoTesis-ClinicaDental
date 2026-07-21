import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, notificationsOutline, shieldCheckmarkOutline, starOutline, trendingUpOutline, addCircleOutline } from 'ionicons/icons';

interface PersonalClinico {
  id: number;
  nombre: string;
  iniciales: string;
  rol: 'Doctor' | 'Auxiliar';
  especialidad: string;
  doctorAsignado?: string;
  estado: string;
  estadoClass: 'activo' | 'en-consulta' | 'fuera-servicio';
  satisfaccion: number;
  metaProgreso: number;
  pacientesPrevios: string[];
  proximaCita?: string;
  mensajeEspecial?: string;
}

@Component({
  selector: 'app-adm6',
  templateUrl: './adm6.page.html',
  styleUrls: ['./adm6.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm6Page implements OnInit {
  private router = inject(Router);
  private toastController = inject(ToastController);

  public rolActivo = signal<'Doctor' | 'Auxiliar'>('Doctor');
  public buscarTexto = signal<string>('');
  public especialidadFiltro = signal<string>('Todas');
  public estadoFiltro = signal<string>('Todos');

  public personal = signal<PersonalClinico[]>([
    {
      id: 1,
      nombre: 'Dr. Julian Thorne',
      iniciales: 'JT',
      rol: 'Doctor',
      especialidad: 'Endodoncia',
      estado: 'ACTIVO',
      estadoClass: 'activo',
      satisfaccion: 4.9,
      metaProgreso: 88,
      pacientesPrevios: ['JD', 'ML'],
      proximaCita: '14:30 PM'
    },
    {
      id: 2,
      nombre: 'Dra. Elena Rodríguez',
      iniciales: 'ER',
      rol: 'Doctor',
      especialidad: 'Cirujano Dentista',
      estado: 'EN CONSULTA',
      estadoClass: 'en-consulta',
      satisfaccion: 4.7,
      metaProgreso: 62,
      pacientesPrevios: ['AB'],
      proximaCita: '15:00 PM'
    },
    {
      id: 3,
      nombre: 'Sofía López',
      iniciales: 'SL',
      rol: 'Auxiliar',
      especialidad: 'Odontológica',
      doctorAsignado: 'Dra. Rodríguez',
      estado: 'ACTIVO',
      estadoClass: 'activo',
      satisfaccion: 4.9,
      metaProgreso: 95,
      pacientesPrevios: ['AB', 'KC'],
      proximaCita: 'Disponible'
    },
    {
      id: 4,
      nombre: 'Dr. Marcus Vance',
      iniciales: 'MV',
      rol: 'Doctor',
      especialidad: 'Ortodoncia',
      estado: 'ACTIVO',
      estadoClass: 'activo',
      satisfaccion: 5.0,
      metaProgreso: 95,
      pacientesPrevios: ['RS'],
      proximaCita: '14:00 PM'
    }
  ]);

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      starOutline,
      trendingUpOutline,
      addCircleOutline
    });
  }

  ngOnInit() {}

  public personalFiltrado = computed(() => {
    return this.personal().filter(p => {
      const cumpleRol = p.rol === this.rolActivo();
      const cumpleTexto = p.nombre.toLowerCase().includes(this.buscarTexto().toLowerCase());
      const cumpleEsp = this.especialidadFiltro() === 'Todas' || p.especialidad === this.especialidadFiltro();
      const cumpleEst = this.estadoFiltro() === 'Todos' || p.estado.toLowerCase() === this.estadoFiltro().toLowerCase();

      return cumpleRol && cumpleTexto && cumpleEsp && cumpleEst;
    });
  });

  public setRolActivo(rol: 'Doctor' | 'Auxiliar') {
    this.rolActivo.set(rol);
  }

  public actualizarBusqueda(e: any) { this.buscarTexto.set(e.target.value); }
  public actualizarFiltroEspecialidad(e: any) { this.especialidadFiltro.set(e.target.value); }
  public actualizarFiltroEstado(e: any) { this.estadoFiltro.set(e.target.value); }

  public registrarPersonal() {
    this.router.navigate(['/admin/adm7'], {
    queryParams: { rol: this.rolActivo() }
  });
  }

  public verPerfil(id: number) {
    console.log('Ver perfil:', id);
  }

  public verMetricas(id: number) {
    console.log('Ver métricas:', id);
  }
}
