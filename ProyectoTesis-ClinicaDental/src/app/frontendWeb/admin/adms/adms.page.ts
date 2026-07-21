import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { medicalSharp, gridSharp, calendarSharp, peopleSharp, pulseSharp, cashSharp, logOutOutline, personOutline, listSharp, listOutline, medkitOutline, medkitSharp } from 'ionicons/icons';

@Component({
  selector: 'app-adms',
  templateUrl: './adms.page.html',
  styleUrls: ['./adms.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AdmsPage implements OnInit {
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
      logOutOutline,
      personOutline,
      listSharp,
      listOutline,
      medkitOutline,
      medkitSharp
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
