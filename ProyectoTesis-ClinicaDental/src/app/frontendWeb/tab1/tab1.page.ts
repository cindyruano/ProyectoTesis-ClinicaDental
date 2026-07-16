import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
  briefcaseOutline,
  chatbubbleEllipsesOutline,
  ellipsisVerticalOutline,
  personAddOutline,
  calendarClearOutline,
  documentTextOutline,
  searchOutline // Importado para el buscador
} from 'ionicons/icons';

interface Paciente {
  hora: string;
  nombre: string;
  motivo: string;
  estado: string;
  estadoClass: string;
}

@Component({
  selector: 'app-tab1-admin',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {

  pacientes: Paciente[] = [
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
  ];

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
      briefcaseOutline,
      chatbubbleEllipsesOutline,
      ellipsisVerticalOutline,
      personAddOutline,
      calendarClearOutline,
      documentTextOutline,
      searchOutline
    });
  }

  ngOnInit() {
  }
}
