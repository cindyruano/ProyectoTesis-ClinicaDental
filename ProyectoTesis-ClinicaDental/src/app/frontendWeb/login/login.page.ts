import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, medicalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginAdminPage implements OnInit {
  private router = inject(Router);

  public email: string = '';
  public password: string = '';

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, medicalOutline });
  }

  ngOnInit() {}

  onLogin(event: Event) {
    event.preventDefault();

    const cleanEmail = this.email.trim().toLowerCase();

    // Evaluación de roles basada en el correo (O según tu respuesta del backend)
    if (cleanEmail.includes('doc') || cleanEmail.includes('doctor')) {
      // Redirige al tablero del Doctor
      this.router.navigate(['/doctor']);
    } else if (cleanEmail.includes('aux') || cleanEmail.includes('auxiliar') || cleanEmail.includes('enfermero')) {
      // Redirige al tablero del Auxiliar
      this.router.navigate(['/auxiliar']);
    } else {
      // Por defecto redirige al tablero del Administrador
      this.router.navigate(['/admin/adm1']);
    }
  }
}
