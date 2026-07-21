import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  notificationsOutline, shieldCheckmarkOutline, calendarOutline,
  arrowBackOutline, addCircleOutline, personOutline, callOutline,
  medkitOutline, pulseOutline, documentTextOutline, calendarClearOutline,
  timeOutline, checkmarkOutline, alertCircleOutline, chevronBackOutline
} from 'ionicons/icons';

interface NuevaCitaForm {
  pacienteNombre: string;
  telefono: string;
  doctorKey: string;
  tratamiento: string;
  categoria: 'orthodontics' | 'surgery' | 'cleaning' | 'reserved';
  fechaStr: string;
  hora: string;
  notas?: string;
}

@Component({
  selector: 'app-adm3-web',
  templateUrl: './adm3.page.html',
  styleUrls: ['./adm3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm3Page implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastController = inject(ToastController);

  public cargandoPaciente: boolean = false;

  public nuevaCitaData: NuevaCitaForm = {
    pacienteNombre: '',
    telefono: '',
    doctorKey: 'melissa',
    tratamiento: '',
    categoria: 'orthodontics',
    fechaStr: '2026-07-21',
    hora: '09:00 AM',
    notas: ''
  };

  private pacientesRegistrados = [
    { nombre: 'Carlos Mendoza', telefono: '5544-1234' },
    { nombre: 'Alice Thompson', telefono: '4122-8899' },
    { nombre: 'Mark Johnson', telefono: '3001-4567' },
    { nombre: 'Sophia Martinez', telefono: '5890-1122' },
    { nombre: 'Robert Black', telefono: '4789-3344' }
  ];

  constructor() {
    addIcons({
      notificationsOutline, shieldCheckmarkOutline, calendarOutline,
      arrowBackOutline, addCircleOutline, personOutline, callOutline,
      medkitOutline, pulseOutline, documentTextOutline, calendarClearOutline,
      timeOutline, checkmarkOutline, alertCircleOutline, chevronBackOutline
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['fecha']) this.nuevaCitaData.fechaStr = params['fecha'];
      if (params['hora']) this.nuevaCitaData.hora = params['hora'];
    });
  }

  public async buscarYAutocompletarPaciente() {
    const busqueda = this.nuevaCitaData.pacienteNombre.trim().toLowerCase();
    if (!busqueda) return;

    this.cargandoPaciente = true;

    setTimeout(async () => {
      this.cargandoPaciente = false;

      const encontrado = this.pacientesRegistrados.find(p =>
        p.nombre.toLowerCase().includes(busqueda)
      );

      if (encontrado) {
        this.nuevaCitaData.pacienteNombre = encontrado.nombre;
        this.nuevaCitaData.telefono = encontrado.telefono;
        this.mostrarToast('Paciente encontrado y datos autocompletados', 'success');
      } else {
        this.mostrarToast('Paciente no encontrado. Puedes registrar sus datos o crear su Ficha Clínica.', 'warning');
      }
    }, 400);
  }

  public irACrearFichaClinica() {
    this.router.navigate(['/admin/adm5']);
  }

  public async guardarCita() {
    if (!this.nuevaCitaData.pacienteNombre || !this.nuevaCitaData.telefono || !this.nuevaCitaData.tratamiento) {
      this.mostrarToast('Por favor, completa todos los campos obligatorios del formulario.', 'danger');
      return;
    }

    await this.mostrarToast('Cita agendada exitosamente en el sistema.', 'success');
    this.router.navigate(['/admin/adm2']);
  }

  public cancelar() {
    this.router.navigate(['/admin/adm4']); // Redirecciona al directorio de pacientes
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
