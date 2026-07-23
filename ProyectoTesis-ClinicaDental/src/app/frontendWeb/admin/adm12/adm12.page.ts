import { Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  chevronBackOutline,
  medicalSharp,
  cubeOutline,
  medkitOutline,
  constructOutline,
  statsChartOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-adm12',
  templateUrl: './adm12.page.html',
  styleUrls: ['./adm12.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
})
export class Adm12Page {
  private router = inject(Router);
  private location = inject(Location);
  private toastController = inject(ToastController);
  private inventarioService = inject(InventarioService);

  public categoria = signal<'Materiales' | 'Anestesia' | 'Instrumental' | 'Protección'>('Materiales');

  public form = {
    codigo: '',
    nombre: '',
    presentacion: '',
    ubicacion: '',
    precioUnitario: null as number | null,
    stockActual: null as number | null,
    stockMinimo: null as number | null
  };

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      chevronBackOutline,
      medicalSharp,
      cubeOutline,
      medkitOutline,
      constructOutline,
      statsChartOutline,
      checkmarkCircleOutline
    });
  }

  public setCategoria(cat: 'Materiales' | 'Anestesia' | 'Instrumental' | 'Protección') {
    this.categoria.set(cat);
  }

  public async guardarRegistro() {
    if (
      !this.form.codigo ||
      !this.form.nombre ||
      !this.form.presentacion ||
      !this.form.ubicacion ||
      this.form.precioUnitario === null ||
      this.form.stockActual === null ||
      this.form.stockMinimo === null
    ) {
      const toastWarning = await this.toastController.create({
        message: 'Por favor, completa todos los campos obligatorios.',
        duration: 2500,
        color: 'warning',
        position: 'bottom'
      });
      await toastWarning.present();
      return;
    }

    // Agregar al servicio de inventario
    this.inventarioService.agregarProducto({
      codigo: this.form.codigo,
      nombre: this.form.nombre,
      presentacion: this.form.presentacion,
      categoria: this.categoria(),
      ubicacion: this.form.ubicacion,
      precioUnitario: Number(this.form.precioUnitario),
      stockActual: Number(this.form.stockActual),
      stockMinimo: Number(this.form.stockMinimo)
    });

    const toast = await this.toastController.create({
      message: `Producto "${this.form.nombre}" registrado exitosamente.`,
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.router.navigate(['/admin/adm11']);
  }

  public regresar() {
    this.location.back();
  }
}
