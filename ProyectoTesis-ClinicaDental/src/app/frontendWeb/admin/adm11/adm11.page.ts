import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  shieldCheckmarkOutline,
  medicalSharp,
  personOutline,
  lockClosedOutline,
  cameraOutline,
  saveOutline,
  createOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-adm11',
  templateUrl: './adm11.page.html',
  styleUrls: ['./adm11.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm11Page {
  private toastController = inject(ToastController);

  public modoEdicion = signal<boolean>(false);
  public fotoUrl = signal<string | null>(null);

  public perfil = {
    nombre: 'Admin Principal',
    email: 'admin@odontologiainclusiva.com',
    telefono: '+502 5555-0000',
    cargo: 'Director de Operaciones',
    rol: 'Administrador General'
  };

  private perfilRespaldado = { ...this.perfil };

  public seguridad = {
    passwordActual: '',
    passwordNueva: ''
  };

  constructor() {
    addIcons({
      notificationsOutline,
      shieldCheckmarkOutline,
      medicalSharp,
      personOutline,
      lockClosedOutline,
      cameraOutline,
      saveOutline,
      createOutline
    });
  }

  public obtenerIniciales(): string {
    if (!this.perfil.nombre) return 'AD';
    const partes = this.perfil.nombre.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return partes[0].substring(0, 2).toUpperCase();
  }

  public activarEdicion() {
    this.perfilRespaldado = { ...this.perfil };
    this.modoEdicion.set(true);
  }

  public cancelarEdicion() {
    this.perfil = { ...this.perfilRespaldado };
    this.seguridad.passwordActual = '';
    this.seguridad.passwordNueva = '';
    this.modoEdicion.set(false);
  }

  public abrirExploradorArchivos(input: HTMLInputElement) {
    if (!this.modoEdicion()) return;
    input.click();
  }

  public onFotoSeleccionada(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const archivo = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.fotoUrl.set(reader.result as string);
      };

      reader.readAsDataURL(archivo);
    }
  }

  public async guardarPerfil() {
    this.perfilRespaldado = { ...this.perfil };
    this.seguridad.passwordActual = '';
    this.seguridad.passwordNueva = '';
    this.modoEdicion.set(false);

    const toast = await this.toastController.create({
      message: 'Perfil de administrador actualizado correctamente.',
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}
