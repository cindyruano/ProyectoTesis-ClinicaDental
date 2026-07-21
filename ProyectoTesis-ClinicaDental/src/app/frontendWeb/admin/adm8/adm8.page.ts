import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  notificationsOutline,
  settingsOutline,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-adm8',
  templateUrl: './adm8.page.html',
  styleUrls: ['./adm8.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm8Page implements OnInit {
  private router = inject(Router);

  constructor() {
    addIcons({
      personOutline,
      lockClosedOutline,
      mailOutline,
      notificationsOutline,
      settingsOutline,
      logOutOutline
    });
  }

  ngOnInit() {}

  // Método para editar perfil (puedes añadir aquí la lógica o abrir un modal)
  public editProfile(): void {
    console.log('Abrir edición de perfil');
  }

  // Método para cerrar sesión y redirigir a la pantalla de login
  public logout(): void {
    console.log('Cerrando sesión...');
    // Limpia el almacenamiento local si utilizas tokens de sesión
    // localStorage.clear();
    this.router.navigate(['/login']);
  }
}
