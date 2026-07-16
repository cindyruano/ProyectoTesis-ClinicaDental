import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, person, settings, logOut, pencilSharp, shieldCheckmarkOutline, chevronForward } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton, IonList, IonItem, IonLabel],
})
export class Tab6Page implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImage: string = '';

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({
      chevronBack,
      person,
      settings,
      logOut,
      pencilSharp,
      shieldCheckmarkOutline,
      chevronForward
    });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  triggerFilePicker() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileService.updateImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab2']);
  }

  goToPersonalData() {
    console.log('Navegando a información personal...');
  }

  goToSettings() {
    this.router.navigate(['/tabs/tab7']);
  }

  logout() {
    console.log('Cerrando sesión de DentalClinic...');

    this.router.navigate(['/login']);
  }
}
