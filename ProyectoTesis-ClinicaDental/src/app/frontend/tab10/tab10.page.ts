import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { receiptOutline } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  priceText?: string; // Por si prefieres formatearlo como string plano
  img: string;
}

@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton]
})
export class Tab10Page implements OnInit {
  profileImage: string = '';

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Cepillo Eléctrico Pro',
      descripcion: 'Limpieza profunda de nivel profesional.',
      precio: 75.00,
      img: 'assets/products/cepillo.webp'
    },
    {
      id: 2,
      nombre: 'Hilo Dental Premium',
      descripcion: 'Elimina la placa de forma eficaz y suave.',
      precio: 8.50,
      img: 'assets/products/hilo.webp'
    },
    {
      id: 3,
      nombre: 'Enjuague Bucal Fresh',
      descripcion: 'Aliento fresco y protección duradera.',
      precio: 12.00,
      img: 'assets/products/enjuague.webp'
    },
    {
      id: 4,
      nombre: 'Kit de Blanqueamiento',
      descripcion: 'Tratamiento doméstico para una sonrisa brillante.',
      precio: 45.00,
      img: 'assets/products/kit.webp'
    }
  ];

  ofertaEspecial: Producto = {
    id: 5,
    nombre: 'Pasta de Dientes Advance',
    descripcion: 'Protección total contra caries y esmalte sensible.',
    precio: 10.00,
    img: 'assets/products/pasta.webp'
  };

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({ receiptOutline });
  }

  ngOnInit() {
    if (this.profileService && this.profileService.profileImage$) {
      this.profileService.profileImage$.subscribe(img => {
        this.profileImage = img;
      });
    }
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  goToPagos() {
    this.router.navigate(['/tabs/tab9']);
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Añadido al carro:', producto.nombre);
  }

  comprarOferta(producto: Producto) {
    console.log('Comprando oferta directa:', producto.nombre);
  }
}
