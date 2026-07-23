import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  medicalSharp,
  trendingUpOutline,
  trendingDownOutline,
  walletOutline,
  receiptOutline,
  addCircleOutline,
  cashOutline,
  chevronBackOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';
import { FinanzasService, Transaccion } from '../../../services/finanzas.service';

@Component({
  selector: 'app-adm9',
  templateUrl: './adm9.page.html',
  styleUrls: ['./adm9.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
})
export class Adm9Page implements OnInit {
  private toastController = inject(ToastController);
  private router = inject(Router);
  private finanzasService = inject(FinanzasService);

  // Signals de estado
  public filtroTexto = signal<string>('');
  public filtroTipo = signal<'TODOS' | 'INGRESO' | 'GASTO'>('TODOS');
  public transacciones = signal<Transaccion[]>([]);

  // Configuración de Paginación
  public paginaActual = signal<number>(1);
  public registrosPorPagina = 8; // Muestra hasta 8 registros por vista

  // KPIs
  public kpis = {
    ingresos: 0,
    gastos: 0,
    balance: 0,
    pendientesMonto: 0,
    pendientesCantidad: 0
  };

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      medicalSharp,
      trendingUpOutline,
      trendingDownOutline,
      walletOutline,
      receiptOutline,
      addCircleOutline,
      cashOutline,
      chevronBackOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {
    this.finanzasService.transacciones$.subscribe((datos: Transaccion[]) => {
      this.transacciones.set(datos);
      this.calcularKPIs();
    });
  }

  private calcularKPIs() {
    let ingresos = 0;
    let gastos = 0;
    let pendientesMonto = 0;
    let pendientesCantidad = 0;

    this.transacciones().forEach(t => {
      const monto = Number(t.monto) || 0;

      if (t.tipo === 'INGRESO') {
        ingresos += monto;
      } else if (t.tipo === 'GASTO') {
        gastos += monto;
      }

      if (t.estado === 'Pendiente') {
        pendientesMonto += monto;
        pendientesCantidad++;
      }
    });

    this.kpis = {
      ingresos,
      gastos,
      balance: ingresos - gastos,
      pendientesMonto,
      pendientesCantidad
    };
  }

  public setFiltroTipo(tipo: 'TODOS' | 'INGRESO' | 'GASTO') {
    this.filtroTipo.set(tipo);
    this.paginaActual.set(1);
  }

  public actualizarBusqueda(evento: any) {
    const texto = typeof evento === 'string' ? evento : evento?.target?.value || '';
    this.filtroTexto.set(texto);
    this.paginaActual.set(1);
  }

  public transaccionesFiltradas = computed(() => {
    return this.transacciones().filter(t => {
      const coincideTipo = this.filtroTipo() === 'TODOS' || t.tipo === this.filtroTipo();
      const coincideBusqueda =
        t.concepto.toLowerCase().includes(this.filtroTexto().toLowerCase()) ||
        t.entidad.toLowerCase().includes(this.filtroTexto().toLowerCase()) ||
        t.categoria.toLowerCase().includes(this.filtroTexto().toLowerCase()) ||
        t.id.toLowerCase().includes(this.filtroTexto().toLowerCase());

      return coincideTipo && coincideBusqueda;
    });
  });

  public transaccionesPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.registrosPorPagina;
    return this.transaccionesFiltradas().slice(inicio, inicio + this.registrosPorPagina);
  });

  public totalRegistrosFiltrados = computed(() => this.transaccionesFiltradas().length);

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

  public irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }

  public abrirAdm10() {
    this.router.navigate(['/admin/adm10']);
  }
}
