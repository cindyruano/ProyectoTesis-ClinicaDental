import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton,
  IonRange, IonModal, IonList, IonItem, IonLabel, IonRadio, IonRadioGroup, // <-- Agregado IonRadioGroup e imports faltantes
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import {
  notifications, sparkles, pricetag, arrowForwardOutline,
  addCircleOutline, pricetagOutline
} from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab9',
  templateUrl: 'tab9.page.html',
  styleUrls: ['tab9.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon,
    IonButton, IonRange, IonModal, IonList, IonItem, IonLabel, IonRadio, IonRadioGroup // <-- Declarados aquí
  ],
})
export class Tab9Page implements OnInit {
  notifActive: boolean = false;
  profileImage: string = '';

  selectedProducts = [
    { name: 'Sonic Pro Toothbrush', price: 1250.00, quantity: 1, image: 'assets/icon/reze.webp' },
    { name: 'Eco-Silk Floss Kit', price: 160.00, quantity: 2, image: 'assets/icon/reze.webp' }
  ];

  isPromoModalOpen = false;
  isPromoApplied = true;

  availablePromos = [
    { code: 'FRESH20', title: 'FRESH20 Aplicado', description: '20% de descuento en productos.', rate: 0.20, fixed: 0 },
    { code: 'DENTAL10', title: 'DENTAL10', description: '10% de descuento en toda la tienda.', rate: 0.10, fixed: 0 },
    { code: 'SMILE50', title: 'SMILE50', description: '$50 de descuento fijo.', rate: 0, fixed: 50 }
  ];
  currentPromo = this.availablePromos[0];

  totalAvailablePoints = 1250;
  pointsToRedeem = 500;
  pointsExchangeRatio = 0.25;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private alertController: AlertController
  ) {
    addIcons({ notifications, sparkles, pricetag, arrowForwardOutline, addCircleOutline, pricetagOutline });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => this.profileImage = img);
  }

  get subtotal() {
    return this.selectedProducts.reduce((acc, current) => acc + (current.price * current.quantity), 0);
  }

  get promoDiscount() {
    if (!this.isPromoApplied) return 0;
    return this.currentPromo.fixed ? this.currentPromo.fixed : (this.subtotal * this.currentPromo.rate);
  }

  get pointsDiscount() {
    return this.pointsToRedeem * this.pointsExchangeRatio;
  }

  get finalTotal() {
    const total = this.subtotal - this.promoDiscount - this.pointsDiscount;
    return total < 0 ? 0 : total;
  }

  openPromoModal() {
    this.isPromoModalOpen = true;
  }

  selectPromotion(promo: any) {
    this.currentPromo = promo;
    this.isPromoApplied = true;
    this.isPromoModalOpen = false;
  }

  removePromotion() {
    this.isPromoApplied = false;
  }

  onPointsChange(event: any) {
    this.pointsToRedeem = event.detail.value;
  }

  async openManualPointsInput() {
    const alert = await this.alertController.create({
      header: 'Canjear Puntos',
      message: `Ingresa la cantidad (Máx: ${this.totalAvailablePoints})`,
      inputs: [{ name: 'points', type: 'number', placeholder: '0', value: this.pointsToRedeem, min: 0, max: this.totalAvailablePoints }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aplicar', handler: (data) => {
            let val = parseInt(data.points);
            if (isNaN(val) || val < 0) val = 0;
            if (val > this.totalAvailablePoints) val = this.totalAvailablePoints;
            this.pointsToRedeem = val;
          }
        }
      ]
    });
    await alert.present();
  }

  proceedToPayment() {
    this.router.navigate(['/tabs/tab10']);
  }

  viewProfile() { this.router.navigate(['/tabs/tab6']); }
  toggleNotification() { this.notifActive = !this.notifActive; }
}
