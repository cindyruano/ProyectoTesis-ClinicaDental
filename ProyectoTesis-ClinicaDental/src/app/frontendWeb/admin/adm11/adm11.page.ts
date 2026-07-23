import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  addCircleOutline,
  cubeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  closeCircleOutline,
  createOutline,
  trashOutline,
  chevronBackOutline,
  chevronForwardOutline,
  medicalSharp,
  closeOutline
} from 'ionicons/icons';
import { HeaderComponent } from '../../components/header/header.component';
import { InventarioService, ProductoInventario } from '../../../services/inventario.service';

@Component({
  selector: 'app-adm11',
  templateUrl: './adm11.page.html',
  styleUrls: ['./adm11.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class Adm11Page implements OnInit {
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private inventarioService = inject(InventarioService);

  // Lista Reactiva conectada al Servicio
  public productos = signal<ProductoInventario[]>([]);

  // Filtros y Paginación
  public filtroTexto = signal<string>('');
  public filtroCategoria = signal<string>('TODAS');
  public paginaActual = signal<number>(1);
  public registrosPorPagina = 8;

  // Estado del Modal de Edición
  public mostrarModalEditar = signal<boolean>(false);
  public productoEditando: ProductoInventario | null = null;

  constructor() {
    addIcons({
      searchOutline,
      addCircleOutline,
      cubeOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      closeCircleOutline,
      createOutline,
      trashOutline,
      chevronBackOutline,
      chevronForwardOutline,
      medicalSharp,
      closeOutline
    });
  }

  ngOnInit() {
    // Suscripción al servicio reactivo de inventario
    this.inventarioService.productos$.subscribe(datos => {
      this.productos.set(datos);
    });
  }

  // KPIS DINÁMICOS VINCULADOS EN TIEMPO REAL
  public kpis = computed(() => {
    const list = this.productos();
    return {
      totalItems: list.length,
      stockAdecuado: list.filter(p => p.estadoStock === 'Adecuado').length,
      stockBajo: list.filter(p => p.estadoStock === 'Bajo').length,
      agotados: list.filter(p => p.estadoStock === 'Agotado').length
    };
  });

  // FILTRADO COMPUTADO
  public itemsFiltrados = computed(() => {
    return this.productos().filter(p => {
      const coincideCat = this.filtroCategoria() === 'TODAS' || p.categoria === this.filtroCategoria();
      const coincideTexto = p.nombre.toLowerCase().includes(this.filtroTexto().toLowerCase()) ||
                            p.codigo.toLowerCase().includes(this.filtroTexto().toLowerCase()) ||
                            p.ubicacion.toLowerCase().includes(this.filtroTexto().toLowerCase());

      return coincideCat && coincideTexto;
    });
  });

  // PAGINACIÓN COMPUTADA
  public itemsPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.registrosPorPagina;
    return this.itemsFiltrados().slice(inicio, inicio + this.registrosPorPagina);
  });

  public totalRegistrosFiltrados = computed(() => this.itemsFiltrados().length);

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

  // NAVEGACIÓN Y ACCIONES
  public irAAdm12() {
    this.router.navigate(['/admin/adm12']);
  }

  public actualizarFiltroCategoria(evento: any) {
    this.filtroCategoria.set(evento.target.value);
    this.paginaActual.set(1);
  }

  public actualizarBusqueda(evento: any) {
    const texto = typeof evento === 'string' ? evento : evento?.target?.value || '';
    this.filtroTexto.set(texto);
    this.paginaActual.set(1);
  }

  public irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }

  // MODAL DE EDICIÓN
  public abrirEditarModal(item: ProductoInventario) {
    this.productoEditando = { ...item };
    this.mostrarModalEditar.set(true);
  }

  public cerrarModal() {
    this.mostrarModalEditar.set(false);
    this.productoEditando = null;
  }

  public async guardarCambiosEdicion() {
    if (!this.productoEditando) return;

    // Actualizamos a través del servicio
    this.inventarioService.actualizarProducto(this.productoEditando);
    this.cerrarModal();

    const toast = await this.toastController.create({
      message: 'Producto actualizado exitosamente.',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  // ALERTA DE ELIMINACIÓN CON ESTILO PERSONALIZADO
  public async confirmarEliminacion(item: ProductoInventario) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar permanentemente el producto ${item.nombre} (${item.codigo})? Esta acción no se puede deshacer.`,
      cssClass: 'custom-delete-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-btn-cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-btn-delete',
          handler: () => {
            // Eliminamos a través del servicio
            this.inventarioService.eliminarProducto(item.id);
            if (this.paginaActual() > this.totalPaginas()) {
              this.paginaActual.set(this.totalPaginas());
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
