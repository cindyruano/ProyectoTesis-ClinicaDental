import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, mailOutline, notificationsOutline, settingsOutline, logOutOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-adm8',
  templateUrl: './adm8.page.html',
  styleUrls: ['./adm8.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
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

  public editProfile(): void {
    console.log('Abrir edición de perfil');
  }

  public logout(): void {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}
