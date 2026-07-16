import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonRippleEffect, AlertController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { receiptOutline, add, remove, notifications, storefrontOutline } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  priceText?: string;
  img: string;
  cantidad: number;
}

@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonRippleEffect],
})
export class Tab10Page implements OnInit {
  profileImage: string = '';

  notifActive: boolean = false;

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Cepillo Eléctrico Pro',
      descripcion: 'Limpieza profunda de nivel profesional.',
      precio: 75.00,
      img: 'assets/icon/cepillo.webp',
      cantidad: 0
    },
    {
      id: 2,
      nombre: 'Hilo Dental Premium',
      descripcion: 'Elimina la placa de forma eficaz y suave.',
      precio: 8.50,
      img: 'assets/icon/hilo.webp',
      cantidad: 0
    },
    {
      id: 3,
      nombre: 'Enjuague Bucal Fresh',
      descripcion: 'Aliento fresco y protección duradera.',
      precio: 12.00,
      img: 'assets/icon/enjuague.webp',
      cantidad: 0
    },
    {
      id: 4,
      nombre: 'Kit de Blanqueamiento',
      descripcion: 'Tratamiento doméstico para una sonrisa brillante.',
      precio: 45.00,
      img: 'assets/icon/kit.webp',
      cantidad: 0
    }
  ];

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({
      receiptOutline,
      add,
      remove,
      notifications,
      storefrontOutline
    });
  }

  ngOnInit() {
    if (this.profileService && this.profileService.profileImage$) {
      this.profileService.profileImage$.subscribe(img => {
        this.profileImage = img;
      });
    }
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
    console.log('Notificaciones activadas:', this.notifActive);
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  goToPagos() {
    this.router.navigate(['/tabs/tab9']);
  }

  incrementarCantidad(producto: Producto) {
    producto.cantidad++;
  }

  decrementarCantidad(producto: Producto) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
    }
  }

  calcularTotal(): number {
    return this.productos.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
  }

  confirmarCompra() {
    const productosSeleccionados = this.productos.filter(p => p.cantidad > 0);
    console.log('Productos a confirmar:', productosSeleccionados);
    console.log('Total de la cotización:', this.calcularTotal());
  }
}
