import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, personAddOutline, documentTextOutline, trashOutline, chevronBackOutline, chevronForwardOutline, medicalSharp, notificationsOutline, shieldCheckmarkOutline, peopleOutline, medkitOutline, cashOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';

interface Paciente {
  id: number;
  codigo: string;
  nombre: string;
  edad: number;
  tipo: string;
  ultimaConsulta: string;
  estado: 'Activo' | 'Inactivo';
  doctorKey: string;
  saldo: number;
}

@Component({
  selector: 'app-adm4',
  templateUrl: './adm4.page.html',
  styleUrls: ['./adm4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, NotificationsComponent, HeaderComponent]
})
export class Adm4Page implements OnInit {
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  public pacientes = signal<Paciente[]>([
    {
      id: 1,
      codigo: '28441-A',
      nombre: 'Carlos Antonio Mendoza Ruiz',
      edad: 28,
      tipo: 'Particular',
      ultimaConsulta: '15/07/2026',
      estado: 'Activo',
      doctorKey: 'melissa',
      saldo: -350.00
    },
    {
      id: 2,
      codigo: '10922-B',
      nombre: 'Ana María Velásquez',
      edad: 34,
      tipo: 'Seguro Dental',
      ultimaConsulta: '01/06/2026',
      estado: 'Activo',
      doctorKey: 'doctor3',
      saldo: 0.00
    },
    {
      id: 3,
      codigo: '88412-C',
      nombre: 'Jorge Mario Hernández',
      edad: 45,
      tipo: 'Particular',
      ultimaConsulta: '28/05/2026',
      estado: 'Inactivo',
      doctorKey: 'doctor2',
      saldo: -1200.00
    }
  ]);

  public buscarTexto = signal<string>('');
  public estadoFiltro = signal<string>('Todos los Estados');
  public institucionFiltro = signal<string>('Todas las Instituciones');
  public paginaActual = signal<number>(1);
  public registrosPorPagina = 5;

  constructor() {
    addIcons({
      searchOutline,
      personAddOutline,
      documentTextOutline,
      trashOutline,
      chevronBackOutline,
      chevronForwardOutline,
      medicalSharp,
      notificationsOutline,
      shieldCheckmarkOutline,
      peopleOutline,
      medkitOutline,
      cashOutline
    });
  }

  ngOnInit() {}

  public obtenerNombreDoctor(doctorKey: string): string {
    const medicos: Record<string, string> = {
      'melissa': 'Dra. Melissa Montenegro',
      'doctor2': 'Dr. Juan Pérez',
      'doctor3': 'Dra. Ana Gómez',
      'doctor4': 'Dr. Carlos Ruíz'
    };
    return medicos[doctorKey] || 'Sin Asignar';
  }

  public pacientesFiltrados = computed(() => {
    return this.pacientes().filter(p => {
      const cumpleTexto = p.nombre.toLowerCase().includes(this.buscarTexto().toLowerCase()) ||
                          p.codigo.toLowerCase().includes(this.buscarTexto().toLowerCase());

      let cumpleEstado = false;
      if (this.estadoFiltro() === 'Todos los Estados') {
        cumpleEstado = true;
      } else if (this.estadoFiltro() === 'Con Deuda') {
        cumpleEstado = p.saldo < 0;
      } else {
        cumpleEstado = p.estado.toLowerCase() === this.estadoFiltro().toLowerCase();
      }

      const cumpleInst = this.institucionFiltro() === 'Todas las Instituciones' || p.tipo === this.institucionFiltro();

      return cumpleTexto && cumpleEstado && cumpleInst;
    });
  });

  public pacientesPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    return this.pacientesFiltrados().slice(inicio, fin);
  });

  public totalRegistrosFiltrados = computed(() => this.pacientesFiltrados().length);

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

  public actualizarBusqueda(evento: any) {
    this.buscarTexto.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public actualizarFiltroEstado(evento: any) {
    this.estadoFiltro.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public actualizarFiltroInstitucion(evento: any) {
    this.institucionFiltro.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }

  public toggleEstadoPaciente(paciente: Paciente) {
    const nuevoEstado = paciente.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.pacientes.update(lista =>
      lista.map(p => p.id === paciente.id ? { ...p, estado: nuevoEstado } : p)
    );
  }

  public verFinanzas(paciente: Paciente) {
  }

  async eliminarPaciente(id: number, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar permanentemente al paciente ${nombre}? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.pacientes.set(this.pacientes().filter(p => p.id !== id));

            if (this.paginaActual() > this.totalPaginas()) {
              this.paginaActual.set(this.totalPaginas());
            }
          }
        }
      ]
    });

    await alert.present();
  }

  nuevoExpediente() {
    this.router.navigate(['/admin/adm5']);
  }

  verExpediente(pacienteId: number) {
    this.router.navigate(['/admin/adm5'], { queryParams: { id: pacienteId } });
  }
}
