import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonIcon,
  IonButton,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTitle
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular'; // <-- Importamos el ToastController de Ionic tradicional
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import {
  notifications,
  sparkles,
  star,
  flame,
  checkmarkCircleOutline,
  brush,
  ribbon,
  lockClosedOutline
} from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
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
    IonModal,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonTitle
  ],
})
export class Tab4Page implements OnInit {
  notifActive: boolean = false;
  profileImage: string = 'assets/icon/usuario.webp';

  isSkinModalOpen: boolean = false;
  activeTab: string = 'clothing';

  // Inyectamos el toastController en el constructor
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private toastController: ToastController
  ) {
    addIcons({
      notifications,
      sparkles,
      star,
      flame,
      checkmarkCircleOutline,
      brush,
      ribbon,
      lockClosedOutline
    });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      if (img) {
        this.profileImage = img;
      }
    });
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }

  // Lógica de clicks actualizada con la notificación asíncrona para el candado
  async onPrizeClick(prizeType: string) {
    console.log(`Premio seleccionado: ${prizeType}`);

    if (prizeType === 'sparkles') {
      this.activeTab = 'clothing';
      this.isSkinModalOpen = true;
    }
    else if (prizeType === 'brush') {
      this.activeTab = 'backgrounds';
      this.isSkinModalOpen = true;
    }
    else if (prizeType === 'ribbon') {
      this.activeTab = 'effects';
      this.isSkinModalOpen = true;
    }
    else if (prizeType === 'locked') {
      // Llamamos a la función que crea y muestra el aviso en pantalla
      await this.showLockedMessage();
    }
  }

  // Función encargada de renderizar el mensaje flotante
  async showLockedMessage() {
    const toast = await this.toastController.create({
      message: '🔒 Necesitas alcanzar el Nivel 10 para desbloquear esta categoría de premios.',
      duration: 3000,           // Duración de 3 segundos en pantalla
      position: 'bottom',       // Aparece en la parte inferior de la pantalla
      color: 'dark',            // Fondo oscuro para que resalte elegante
      cssClass: 'custom-toast'  // Clase por si quieres meterle estilos personalizados más adelante
    });
    await toast.present();
  }

  onTabChange(event: any) {
    this.activeTab = event.detail.value;
  }

  redeemPoints() {
    console.log('Botón "Canjear puntos" pulsado.');
  }
}
