import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, notificationsOutline, shieldCheckmarkOutline, medicalSharp, chevronBackOutline, personOutline, lockClosedOutline, cameraOutline, saveOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-adm10',
  templateUrl: './adm10.page.html',
  styleUrls: ['./adm10.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
})
export class Adm10Page implements OnInit {
  private location = inject(Location);
  private toastController = inject(ToastController);

  public perfil = {
    nombre: 'Admin Principal',
    email: 'admin@odontologiainclusiva.com',
    telefono: '+502 5555-0000',
    cargo: 'Director de Operaciones',
    rol: 'Administrador General'
  };

  public seguridad = {
    passwordActual: '',
    passwordNueva: ''
  };

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      medicalSharp,
      chevronBackOutline,
      personOutline,
      lockClosedOutline,
      cameraOutline,
      saveOutline
    });
  }

  ngOnInit() {}

  public obtenerIniciales(): string {
    if (!this.perfil.nombre) return 'AD';
    const partes = this.perfil.nombre.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return partes[0].substring(0, 2).toUpperCase();
  }

  public async guardarPerfil() {
    const toast = await this.toastController.create({
      message: 'Perfil actualizado correctamente.',
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.seguridad.passwordActual = '';
    this.seguridad.passwordNueva = '';
  }

  public regresar() {
    this.location.back();
  }
}
