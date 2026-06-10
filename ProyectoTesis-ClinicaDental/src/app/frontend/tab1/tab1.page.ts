import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, notifications, happy, calendarClear, calendarOutline, chatbubbleEllipses, headset, addOutline, bulbOutline, cardOutline} from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonRippleEffect ],
})
export class Tab1Page implements OnInit {
  userName: string = 'Cindy';
  saludPorcentaje: number = 75;
  notifActive: boolean = false;
  profileImage: string = '';

  promociones = [
    {
      title: 'Blanqueamiento Diamond',
      desc: 'El comentario personalizado que ingrese el dentista desde la web para blanqueamiento.',
      img: 'assets/icon/descuento.webp'
    },
    {
      title: 'Limpieza Dental 2x1',
      desc: 'El comentario personalizado que ingrese el dentista desde la web para limpieza.',
      img: 'assets/icon/descuento.webp'
    }
  ];

  proximaCita = {
    fecha: 'Lunes, 12 de Oct',
    hora: '10:00 AM',
    doctor: 'Dr. Aris',
    specialidad: 'Especialista en Ortodoncia'
  };

  tipDeLaSemana: string = 'Recuerda usar el hilo dental después de comidas principales. Tu esmalte lo agradecerá.';

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({ chevronForward, notifications, happy, calendarClear, calendarOutline, chatbubbleEllipses, headset, addOutline, bulbOutline, cardOutline });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  agendarCita() {
    this.router.navigate(['/tabs/tab2']);
  }

  chatIA() {
    this.router.navigate(['/tabs/tab7']);
  }

  pagos() {
    this.router.navigate(['/tabs/tab9']);
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }

  goToHistorialCitas() {
    this.router.navigate(['/tabs/tab5']);
  }

  openHealthDetails() {
    console.log('Detalles salud');
  }

  verDetallePromo(promo: any) {
    console.log('Ver detalle de:', promo.title);
    console.log('Comentario del dentista:', promo.desc);
  }
}
