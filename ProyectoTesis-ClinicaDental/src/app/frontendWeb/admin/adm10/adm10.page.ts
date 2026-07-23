import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { medicalSharp, chevronBackOutline, cashOutline, medicalOutline, cartOutline, trendingDownOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { HeaderComponent } from '../../components/header/header.component';
import { FinanzasService, Transaccion } from '../../../services/finanzas.service';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';

export type TipoMovimiento = 'TRATAMIENTO' | 'PRODUCTO' | 'GASTO';

interface ItemCatalogo {
  nombre: string;
  precioBase?: number;
}

@Component({
  selector: 'app-adm10',
  templateUrl: './adm10.page.html',
  styleUrls: ['./adm10.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, NotificationsComponent]
})
export class Adm10Page {
  private router = inject(Router);
  private toastController = inject(ToastController);
  private finanzasService = inject(FinanzasService);

  public filtroTexto: string = '';
  public tipoMovimiento: TipoMovimiento = 'TRATAMIENTO';

  public movimiento = {
    concepto: '',
    entidad: '',
    monto: null as number | null,
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Completado' as 'Completado' | 'Pendiente'
  };

  public tratamientos: ItemCatalogo[] = [
    { nombre: 'Tratamiento de Ortodoncia', precioBase: 1200 },
    { nombre: 'Limpieza Dental Profunda', precioBase: 350 },
    { nombre: 'Endodoncia Pieza Dental', precioBase: 1800 },
    { nombre: 'Blanqueamiento Dental', precioBase: 800 }
  ];

  public productos: ItemCatalogo[] = [
    { nombre: 'Kit Cepillo e Hilo Dental Pro', precioBase: 85 },
    { nombre: 'Pasta Dental Especializada', precioBase: 45 },
    { nombre: 'Enjuague Bucal Antiséptico', precioBase: 60 }
  ];

  public gastos: ItemCatalogo[] = [
    { nombre: 'Compra de Insumos Dentales' },
    { nombre: 'Mantenimiento de Unidades Odontológicas' },
    { nombre: 'Servicios Básicos / Alquiler' }
  ];

  constructor() {
    addIcons({
      medicalSharp,
      chevronBackOutline,
      cashOutline,
      medicalOutline,
      cartOutline,
      trendingDownOutline,
      checkmarkCircleOutline
    });
  }

  get catalogoActual(): ItemCatalogo[] {
    if (this.tipoMovimiento === 'TRATAMIENTO') return this.tratamientos;
    if (this.tipoMovimiento === 'PRODUCTO') return this.productos;
    return this.gastos;
  }

  public setTipoMovimiento(tipo: TipoMovimiento) {
    this.tipoMovimiento = tipo;
    this.movimiento.concepto = '';
    this.movimiento.monto = null;
  }

  public onSeleccionarOpcionCat(event: any) {
    const seleccionado = event.target.value;
    const item = this.catalogoActual.find(i => i.nombre === seleccionado);
    if (item) {
      this.movimiento.concepto = item.nombre;
      if (item.precioBase) {
        this.movimiento.monto = item.precioBase;
      }
    }
  }

  public async guardarMovimiento() {
    if (!this.movimiento.concepto || !this.movimiento.entidad || !this.movimiento.monto) {
      const toastError = await this.toastController.create({
        message: 'Por favor, llena los campos requeridos.',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      await toastError.present();
      return;
    }

    const [year, month, day] = this.movimiento.fecha.split('-');
    const fechaFormateada = `${day}/${month}/${year}`;

    const esGasto = this.tipoMovimiento === 'GASTO';
    const categoria = this.tipoMovimiento === 'TRATAMIENTO'
      ? 'Procedimiento Clínico'
      : (this.tipoMovimiento === 'PRODUCTO' ? 'Venta de Producto' : 'Gasto Operativo');

    const nuevaTransaccion: Transaccion = {
      id: `TRX-${Math.floor(100 + Math.random() * 900)}`,
      fecha: fechaFormateada,
      concepto: this.movimiento.concepto,
      categoria: categoria,
      entidad: this.movimiento.entidad,
      tipo: esGasto ? 'GASTO' : 'INGRESO',
      estado: this.movimiento.estado,
      monto: Number(this.movimiento.monto)
    };

    // Guarda temporalmente en localStorage a través del servicio
    this.finanzasService.agregarTransaccion(nuevaTransaccion);

    const toast = await this.toastController.create({
      message: 'Movimiento registrado exitosamente.',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.volverAAdm9();
  }

  public volverAAdm9() {
    this.router.navigate(['/admin/adm9']);
  }
}
