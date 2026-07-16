import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular'; // Importamos Platform de Ionic
import { addIcons } from 'ionicons';
import {
  medicalSharp,
  gridSharp,
  calendarSharp,
  peopleSharp,
  pulseSharp,
  cashSharp,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-web-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class WebTabsPage implements OnInit {
  private router = inject(Router);
  private platform = inject(Platform); // Inyectamos el detector de plataformas de Ionic

  constructor() {
    addIcons({
      medicalSharp,
      gridSharp,
      calendarSharp,
      peopleSharp,
      pulseSharp,
      cashSharp,
      logOutOutline
    });
  }

  ngOnInit() {}

  onLogout() {
    // Detectamos si es escritorio/tablet o dispositivo móvil
    const esEscritorio = window.innerWidth >= 768 && !this.platform.is('android') && !this.platform.is('ios');

    if (esEscritorio) {
      // Si está en laptop o PC de escritorio, va al login administrativo
      this.router.navigate(['/admin/login']);
    } else {
      // Si está en un celular (como en tu simulador), va al login de la App móvil
      this.router.navigate(['/login']);
    }
  }
}
