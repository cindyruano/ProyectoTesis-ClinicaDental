import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, notificationsOutline, shieldCheckmarkOutline, medicalSharp, trendingUpOutline, trendingDownOutline, walletOutline, receiptOutline, addCircleOutline, cashOutline, cardOutline } from 'ionicons/icons';

export interface Transaccion {
  id: string;
  fecha: string;
  concepto: string;
  categoria: string;
  entidad: string;
  metodoPago: string;
  tipo: 'INGRESO' | 'GASTO';
  estado: 'Completado' | 'Pendiente';
  monto: number;
}

@Component({
  selector: 'app-adm9',
  templateUrl: './adm9.page.html',
  styleUrls: ['./adm9.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm9Page {
  private toastController = inject(ToastController);

  public filtroTexto: string = '';
  public filtroTipo: 'TODOS' | 'INGRESO' | 'GASTO' = 'TODOS';

  public kpis = {
    ingresos: 42850.00,
    gastos: 18400.00,
    pendientes: 3200.00
  };

  public transacciones: Transaccion[] = [
    {
      id: 'TRX-101',
      fecha: '21/07/2026',
      concepto: 'Tratamiento de Ortodoncia',
      categoria: 'Procedimiento Clínico',
      entidad: 'Carlos Mendoza',
      metodoPago: 'Tarjeta de Débito',
      tipo: 'INGRESO',
      estado: 'Completado',
      monto: 1200.00
    },
    {
      id: 'TRX-102',
      fecha: '21/07/2026',
      concepto: 'Compra de Insumos Dentales',
      categoria: 'Materiales e Insumos',
      entidad: 'Depósito Dental S.A.',
      metodoPago: 'Transferencia',
      tipo: 'GASTO',
      estado: 'Completado',
      monto: 3450.00
    },
    {
      id: 'TRX-103',
      fecha: '20/07/2026',
      concepto: 'Limpieza Dental Profunda',
      categoria: 'Consulta General',
      entidad: 'Alice Thompson',
      metodoPago: 'Efectivo',
      tipo: 'INGRESO',
      estado: 'Completado',
      monto: 350.00
    },
    {
      id: 'TRX-104',
      fecha: '19/07/2026',
      concepto: 'Endodoncia Pieza 24',
      categoria: 'Especialidad',
      entidad: 'Mark Johnson',
      metodoPago: 'Tarjeta de Crédito',
      tipo: 'INGRESO',
      estado: 'Pendiente',
      monto: 1800.00
    },
    {
      id: 'TRX-105',
      fecha: '18/07/2026',
      concepto: 'Mantenimiento de Unidades Odontológicas',
      categoria: 'Mantenimiento',
      entidad: 'TechDental Servicios',
      metodoPago: 'Transferencia',
      tipo: 'GASTO',
      estado: 'Completado',
      monto: 850.00
    }
  ];

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
      cardOutline
    });
  }

  public setFiltroTipo(tipo: 'TODOS' | 'INGRESO' | 'GASTO') {
    this.filtroTipo = tipo;
  }

  public transaccionesFiltradas(): Transaccion[] {
    return this.transacciones.filter(t => {
      const coincideTipo = this.filtroTipo === 'TODOS' || t.tipo === this.filtroTipo;
      const coincideBusqueda =
        t.concepto.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        t.entidad.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        t.categoria.toLowerCase().includes(this.filtroTexto.toLowerCase());

      return coincideTipo && coincideBusqueda;
    });
  }

  public async registrarIngresoGasto() {
    const toast = await this.toastController.create({
      message: 'Función para registrar nueva transacción activada.',
      duration: 2500,
      color: 'primary',
      position: 'bottom'
    });
    await toast.present();
  }
}
