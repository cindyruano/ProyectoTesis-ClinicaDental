import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, notificationsOutline, shieldCheckmarkOutline, personAddOutline, chevronBackOutline, medicalOutline, medicalSharp, peopleOutline, personOutline, briefcaseOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../../components/notificaciones/noti.components';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-adm7',
  templateUrl: './adm7.page.html',
  styleUrls: ['./adm7.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotificationsComponent, HeaderComponent]
})
export class Adm7Page implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private toastController = inject(ToastController);

  public tipoPersonal = signal<'Doctor' | 'Auxiliar'>('Doctor');

  public form = {
    nombre: '',
    email: '',
    telefono: '',
    dpi: '',
    especialidad: '',
    colegiado: '',
    doctorAsignado: 'General',
    estado: 'ACTIVO'
  };

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline,
      personAddOutline,
      chevronBackOutline,
      medicalOutline,
      medicalSharp,
      peopleOutline,
      personOutline,
      briefcaseOutline,
      checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['rol'] && (params['rol'] === 'Doctor' || params['rol'] === 'Auxiliar')) {
        this.tipoPersonal.set(params['rol']);
      }
    });
  }

  public setTipoPersonal(tipo: 'Doctor' | 'Auxiliar') {
    this.tipoPersonal.set(tipo);
    this.form.especialidad = '';
  }

  public async guardarRegistro() {
    const mensaje = `${this.tipoPersonal()} registrado exitosamente.`;

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.router.navigate(['/admin/adm6']);
  }

  public regresar() {
    this.location.back();
  }
}
