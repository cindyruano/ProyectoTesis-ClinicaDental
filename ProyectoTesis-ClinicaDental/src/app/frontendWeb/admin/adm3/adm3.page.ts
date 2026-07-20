import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, personAddOutline, documentTextOutline, trashOutline, chevronBackOutline, chevronForwardOutline, medicalSharp, notificationsOutline, shieldCheckmarkOutline } from 'ionicons/icons';

interface Paciente {
  id: number;
  codigo: string;
  nombre: string;
  edad: number;
  tipo: string;
  dpi: string;
  ultimaConsulta: string;
  estado: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-adm3',
  templateUrl: './adm3.page.html',
  styleUrls: ['./adm3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class Adm3Page implements OnInit {
  private router = inject(Router);
  private alertController = inject(AlertController);

  public pacientes = signal<Paciente[]>([
    { id: 1, codigo: '28441-A', nombre: 'Carlos Antonio Mendoza Ruiz', edad: 28, tipo: 'Particular', dpi: '2841-3312', ultimaConsulta: '15/07/2026', estado: 'Activo' },
    { id: 2, codigo: '10922-B', nombre: 'Ana María Velásquez', edad: 34, tipo: 'Seguro Dental', dpi: '1092-2210', ultimaConsulta: '01/06/2026', estado: 'Activo' },
    { id: 3, codigo: '88412-C', nombre: 'Jorge Mario Hernández', edad: 45, tipo: 'Particular', dpi: '8841-2109', ultimaConsulta: '28/05/2026', estado: 'Inactivo' }
  ]);

  public buscarTexto = signal<string>('');
  public estadoFiltro = signal<string>('Todos los Estados');
  public institucionFiltro = signal<string>('Todas las Instituciones');

  public paginaActual = signal<number>(1);
  public registrosPorPagina = 3;

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
      shieldCheckmarkOutline
    });
  }

  ngOnInit() {}

  public pacientesFiltrados = computed(() => {
    return this.pacientes().filter(p => {
      const cumpleTexto = p.nombre.toLowerCase().includes(this.buscarTexto().toLowerCase()) ||
                          p.codigo.toLowerCase().includes(this.buscarTexto().toLowerCase()) ||
                          p.dpi.includes(this.buscarTexto());

      const cumpleEstado = this.estadoFiltro() === 'Todos los Estados' || p.estado === this.estadoFiltro();
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
    this.router.navigate(['/admin/adm4']);
  }

  verExpediente(pacienteId: number) {
    this.router.navigate(['/admin/adm4', pacienteId]);
  }
}
