import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { arrowBackOutline, locateOutline, layersOutline, checkmarkCircle, location, call, time, navigateCircleOutline } from 'ionicons/icons';
import * as L from 'leaflet';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton
  ],
})
export class Tab3Page implements OnInit, OnDestroy {
  private map!: L.Map;
  private clinicaCoords: [number, number] = [14.6349, -90.5069];
  private userMarker?: L.Marker;

  profileImage: string = '';

  isCardHidden: boolean = false;

  private lightLayer!: L.TileLayer;
  private satelliteLayer!: L.TileLayer;
  private isSatelliteActive: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private profileService: ProfileService
  ) {
    addIcons({
      arrowBackOutline,
      locateOutline,
      layersOutline,
      checkmarkCircle,
      location,
      call,
      time,
      navigateCircleOutline
    });
  }

  ngOnInit() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.id = 'leaflet-css';
    document.head.appendChild(link);

    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    this.lightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap'
    });

    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    this.map = L.map('map', {
      center: this.clinicaCoords,
      zoom: 15,
      zoomControl: false,
      layers: [this.lightLayer]
    });

    const customIcon = L.divIcon({
      html: `
        <div style="
          background-color: #001b3d;
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,27,61,0.35);
          border: 2px solid white;
        ">
          <div style="transform: rotate(45deg); color: white; font-size: 18px;">🦷</div>
        </div>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    const clinicMarker = L.marker(this.clinicaCoords, { icon: customIcon }).addTo(this.map);

    // EVENTOS DEL MAPA PARA OCULTAR/MOSTRAR LA TARJETA
    this.map.on('dragstart', () => {
      setTimeout(() => {
        this.isCardHidden = true;
      }, 0);
    });

    clinicMarker.on('click', () => {
      setTimeout(() => {
        this.isCardHidden = false;
        this.map.setView(this.clinicaCoords, 15, { animate: true });
      }, 0);
    });
  }

  // GEOLOCALIZACIÓN DEL USUARIO
  async recenterToUser() {
    try {
      try {
        const module = await import('@capacitor/geolocation');
        if (module && module.Geolocation && module.Geolocation.getCurrentPosition) {
          const coordinates = await module.Geolocation.getCurrentPosition({ enableHighAccuracy: true });
          const userLat = coordinates.coords.latitude;
          const userLng = coordinates.coords.longitude;
          await this.handleUserPosition(userLat, userLng);
          return;
        }
      } catch (e) {
        console.warn('Capacitor Geolocation no disponible, usando navigator.geolocation', e);
      }

      if ('geolocation' in navigator) {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
              const userLat = pos.coords.latitude;
              const userLng = pos.coords.longitude;
              await this.handleUserPosition(userLat, userLng);
              resolve();
            } catch (err) {
              reject(err);
            }
          }, (err) => reject(err), { enableHighAccuracy: true });
        });
        return;
      }

      throw new Error('No geolocation available');
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      this.presentToast('Activa el GPS para ver tu ubicación actual.');
    }
  }

  private async handleUserPosition(userLat: number, userLng: number) {
    const userLatLng: [number, number] = [userLat, userLng];

    this.map.setView(userLatLng, 16, { animate: true, duration: 1.5 });

    if (this.userMarker) {
      this.userMarker.remove();
    }

    const userIcon = L.divIcon({
      html: `
        <div style="
          background-color: #3880ff;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(56, 128, 255, 0.8);
        "></div>
      `,
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    this.userMarker = L.marker(userLatLng, { icon: userIcon }).addTo(this.map);

    setTimeout(() => {
      this.isCardHidden = false;
    }, 500);

    this.presentToast('Ubicación encontrada');
  }

  recenterToClinic() {
    this.map.setView(this.clinicaCoords, 15, { animate: true, duration: 1.2 });
    setTimeout(() => {
      this.isCardHidden = false;
    }, 300);
  }

  toggleMapLayer() {
    if (this.isSatelliteActive) {
      this.map.removeLayer(this.satelliteLayer);
      this.map.addLayer(this.lightLayer);
      this.isSatelliteActive = false;
      this.presentToast('Vista del mapa clásico');
    } else {
      this.map.removeLayer(this.lightLayer);
      this.map.addLayer(this.satelliteLayer);
      this.isSatelliteActive = true;
      this.presentToast('Vista de satélite activada');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  openNavigation() {
    const lat = this.clinicaCoords[0];
    const lng = this.clinicaCoords[1];
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_system');
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    const link = document.getElementById('leaflet-css');
    if (link) {
      link.remove();
    }
  }
}
