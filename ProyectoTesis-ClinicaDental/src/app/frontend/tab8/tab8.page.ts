import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { notifications, sparkles } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton
  ],
})
export class Tab8Page implements OnInit {
  notifActive: boolean = false;
  profileImage: string = '';

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({ notifications, sparkles });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }

  goToProfile() {
    console.log('Navegando al perfil del usuario...');
    this.router.navigate(['/tabs/tab6']);
  }
}
