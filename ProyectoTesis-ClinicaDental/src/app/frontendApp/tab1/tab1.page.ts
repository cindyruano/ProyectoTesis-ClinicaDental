import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonRippleEffect, AlertController, IonModal, IonHeader,     IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, notifications, happy, calendarClear, calendarOutline, chatbubbleEllipses, headset, addOutline, bulbOutline, cardOutline, timeOutline, personOutline, happyOutline, arrowForwardOutline, chevronForwardOutline, closeOutline, bulb } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonIcon,
    IonButton,
    IonRippleEffect,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons
  ],
})
export class Tab1Page implements OnInit {
  userName: string = 'Cindy';
  saludPorcentaje: number = 75;
  notifActive: boolean = false;
  profileImage: string = '';
  isTipModalOpen: boolean = false;
  isModalOpen: boolean = false;

  promociones = [
    {
      title: 'Blanqueamiento Diamond',
      displayTitle: 'Invisalign: El cambio de María',
      descShort: 'Descubre cómo transformamos su sonrisa en solo 8 meses con tecnología invisible y...',
      desc: 'Comentario personalizado de Invisalign.',
      img: 'assets/icon/descuento.webp'
    },
    {
      title: 'Limpieza Dental 2x1',
      displayTitle: 'Diseño de Sonrisa Avanzado',
      descShort: 'Consigue la simetría y el tono perfecto adaptado a tus facciones mediante resinas de alta estética.',
      desc: 'Comentario personalizado de Diseño de Sonrisa.',
      img: 'assets/icon/descuento.webp'
    },
    {
      title: 'Ortodoncia Estética',
      displayTitle: 'Brackets de Zafiro Premium',
      descShort: 'Corrige la alineación de tus piezas dentales de manera sumamente discreta y confortable.',
      desc: 'Comentario personalizado de brackets.',
      img: 'assets/icon/descuento.webp'
    }
  ];

  proximaCita = {
    fecha: 'Lunes, 12 de Oct',
    hora: '10:30 AM',
    doctor: 'Dr. Aris Rodriguez',
    specialidad: 'Especialista en Ortodoncia'
  };

  tipDeLaSemana: string = 'Recuerda usar el hilo dental después de comidas principales. Tu esmalte lo agradecerá.';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private alertController: AlertController
  ) {
    addIcons({
      chevronForward,
      notifications,
      happy,
      calendarClear,
      calendarOutline,
      chatbubbleEllipses,
      headset,
      addOutline,
      bulbOutline,
      cardOutline,
      timeOutline,
      personOutline,
      happyOutline,
      arrowForwardOutline,
      chevronForwardOutline,
      closeOutline,
      bulb
    });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  async mostrarTipDeLaSemana() {
    const alert = await this.alertController.create({
      header: '💡 Tip de la semana',
      message: this.tipDeLaSemana,
      buttons: [
        {
          text: '¡Entendido!',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
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

  abrirModalNovedades(estado: boolean) {
    this.isModalOpen = estado;
  }

  cerrarVentanita(modal: any) {
   modal.dismiss();
   this.isModalOpen = false;
  }

  seleccionarDescuento(promo: any, modal?: any) {
   if (modal) {
    modal.dismiss();
   }
   this.isModalOpen = false;

   console.log('Descuento seleccionado:', promo.title);
   this.router.navigate(['/tabs/tab2']);
  }

  abrirModalTip(estado: boolean) {
    this.isTipModalOpen = estado;
  }

  verMasConsejos() {
    this.isTipModalOpen = false;
    console.log('Navegar a más consejos o sección de tips');
  }
}
