import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardCircle } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {
    addIcons({ arrowForwardCircle });
  }

  onLogin() {
    if (this.email && this.password) {
      console.log('Iniciando sesión con:', this.email);
      const success = this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/tabs/tab1']);
      }
    }
  }

  forgotPassword() {
    console.log('Navegando a recuperación de contraseña...');
  }

  loginWithGoogle() {
    console.log('Autenticando con Google...');
  }

  loginWithApple() {
    console.log('Autenticando con Apple...');
  }

  goToRegister() {
    console.log('Redirigiendo a registro...');
  }
}
