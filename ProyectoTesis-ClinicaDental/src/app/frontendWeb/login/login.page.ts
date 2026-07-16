import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // 1. Importamos el Router
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
  // 2. Inyectamos el servicio Router para la navegación inteligente
  private router = inject(Router);

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, medicalOutline });
  }

  ngOnInit() {}

  onLogin(event: Event) {
    event.preventDefault(); // Evita que la página web se recargue por el submit tradicional

    // console.log('Intento de login en el panel de administración');

    // 3. Redirigimos automáticamente al Tab 1 (Tablero del Administrador)
    this.router.navigate(['/admin/tab1']);
  }
}
