import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { medicalSharp, gridSharp, calendarSharp, peopleSharp, pulseSharp, cashSharp, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-web-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class WebTabsPage implements OnInit {
  private router = inject(Router);
  private platform = inject(Platform);

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
    const esEscritorio = window.innerWidth >= 768 && !this.platform.is('android') && !this.platform.is('ios');

    if (esEscritorio) {
      this.router.navigate(['/admin/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
