import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  peopleOutline,
  medicalOutline,
  notificationsOutline,
  informationCircleOutline,
  checkmarkSharp,
  timeOutline,
  chevronForwardOutline,
  chevronBackOutline,
  searchOutline,
  warningOutline,
  idCardOutline,
  chatbubbleOutline
} from 'ionicons/icons';

registerLocaleData(localeEs, 'es');

interface Paciente {
  hora: string;
  nombre: string;
  motivo: string;
  estado: string;
  estadoClass: string;
}

interface DiaCalendario {
  numero: number | null;
  esHoy: boolean;
  esDomingo: boolean;
  fecha?: Date;
}

@Component({
  selector: 'app-adm1',
  templateUrl: './adm1.page.html',
  styleUrls: ['./adm1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm1Page implements OnInit {
  private router = inject(Router);

  public fechaHoy: Date = new Date();
  public fechaCalendario: Date = new Date();
  public buscarTexto = signal<string>('');
  public citasProgramadasCount = signal<number>(8);
  public pacientesRegistradosCount = signal<number>(142);
  public doctoresActivosCount = signal<number>(4);

  public pacientes = signal<Paciente[]>([
    {
      hora: '09:00',
      nombre: 'María García',
      motivo: 'Chequeo Prenatal',
      estado: 'Completado',
      estadoClass: 'status-completed'
    },
    {
      hora: '10:30',
      nombre: 'Juan Pérez',
      motivo: 'Control Presión',
      estado: 'En consulta',
      estadoClass: 'status-consultation'
    },
    {
      hora: '11:15',
      nombre: 'Carlos Ruiz',
      motivo: 'Dolor Abdominal',
      estado: 'En espera',
      estadoClass: 'status-waiting'
    }
  ]);

  public diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  constructor() {
    addIcons({
      calendarOutline,
      peopleOutline,
      medicalOutline,
      notificationsOutline,
      informationCircleOutline,
      checkmarkSharp,
      timeOutline,
      chevronForwardOutline,
      chevronBackOutline,
      searchOutline,
      warningOutline,
      idCardOutline,
      chatbubbleOutline
    });
  }

  ngOnInit() {}

  public pacientesHoyFiltrados = computed(() => {
    const query = this.buscarTexto().toLowerCase();
    return this.pacientes().filter(p =>
      p.nombre.toLowerCase().includes(query) ||
      p.motivo.toLowerCase().includes(query) ||
      p.hora.includes(query)
    );
  });

  public diasMes = computed(() => {
    const year = this.fechaCalendario.getFullYear();
    const month = this.fechaCalendario.getMonth();

    let primerDiaMes = new Date(year, month, 1).getDay() - 1;
    if (primerDiaMes === -1) primerDiaMes = 6;

    const totalDiasMes = new Date(year, month + 1, 0).getDate();
    const dias: DiaCalendario[] = [];

    for (let i = 0; i < primerDiaMes; i++) {
      dias.push({ numero: null, esHoy: false, esDomingo: false });
    }

    const hoy = new Date();
    for (let d = 1; d <= totalDiasMes; d++) {
      const fechaDia = new Date(year, month, d);
      const esHoy = d === hoy.getDate() && month === hoy.getMonth() && year === hoy.getFullYear();
      const esDomingo = fechaDia.getDay() === 0;

      dias.push({
        numero: d,
        esHoy: esHoy,
        esDomingo: esDomingo,
        fecha: fechaDia
      });
    }

    return dias;
  });

  public actualizarBusqueda(evento: any) {
    this.buscarTexto.set(evento.target.value);
  }

  public cambiarMes(delta: number) {
    this.fechaCalendario = new Date(
      this.fechaCalendario.getFullYear(),
      this.fechaCalendario.getMonth() + delta,
      1
    );
  }

  public seleccionarDia(dia: DiaCalendario) {
    if (dia.numero) {
      console.log('Día seleccionado:', dia.fecha);
    }
  }

  public verTodosPacientes() {
    this.router.navigate(['/admin/adm3']);
  }

  public verDetallePaciente(id: number) {
    this.router.navigate(['/admin/adm4', id]);
  }
}
