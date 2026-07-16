import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonAvatar, IonRow, IonIcon, IonButton, IonDatetime, IonModal, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, calendarOutline, chevronForward, chevronBack, medicalOutline, waterOutline, optionsOutline, checkmarkCircle } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonButton,
    IonDatetime,
    IonAvatar,
    IonGrid,
    IonRow,
    IonCol,
    IonModal
  ],
})
export class Tab2Page implements OnInit {
  @ViewChild('calendarModal', { static: false }) calendarModal!: IonModal;
  @ViewChild('datetimePicker', { static: false }) datetimePicker!: IonDatetime;

  notifActive: boolean = false;
  profileImage: string = '';

  tratamientoSeleccionado: string = '';
  selectedSlot: string = '';
  isFechaSeleccionada: boolean = false;

  currentMonthName: string = '';
  workingDays: Array<{ name: string; number: number; fullDate: Date }> = [];
  selectedDayNumber: number | null = null;
  currentDateSelected: Date = new Date();

  calendarView: 'days' | 'months' | 'years' = 'days';
  monthsList: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  yearsList: number[] = [2024, 2025, 2026, 2027, 2028, 2029];

  availableSlots = [
    { time: '09:00 AM', disabled: false },
    { time: '10:30 AM', disabled: false },
    { time: '11:00 AM', disabled: false },
    { time: '01:30 PM', disabled: true },
    { time: '03:00 PM', disabled: false },
    { time: '04:30 PM', disabled: true }
  ];

  constructor(private router: Router, private alertCtrl: AlertController, private profileService: ProfileService) {
    addIcons({
      notifications,
      calendarOutline,
      chevronForward,
      chevronBack,
      medicalOutline,
      waterOutline,
      optionsOutline,
      checkmarkCircle
    });
    this.generateMonthlyGrid(this.currentDateSelected);
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  generateMonthlyGrid(referenceDate: Date) {
    this.currentMonthName = referenceDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.workingDays = [];
    for (let i = 1; i <= totalDays; i++) {
      const fullDate = new Date(year, month, i);
      this.workingDays.push({
        name: fullDate.toLocaleString('es-ES', { weekday: 'short' }),
        number: i,
        fullDate: fullDate
      });
    }
  }

  toggleCalendarView() {
    if (this.calendarView === 'days') {
      this.calendarView = 'months';
    } else if (this.calendarView === 'months') {
      this.calendarView = 'years';
    } else {
      this.calendarView = 'days';
    }
  }

  getHeaderLabel(): string {
    if (this.calendarView === 'days') {
      return this.currentMonthName;
    } else if (this.calendarView === 'months') {
      return `${this.currentDateSelected.getFullYear()}`;
    } else {
      return 'Seleccionar Año';
    }
  }

  navigateCalendar(direction: number) {
    if (this.calendarView === 'days') {
      const currentMonth = this.currentDateSelected.getMonth();
      this.currentDateSelected.setMonth(currentMonth + direction);
    } else if (this.calendarView === 'months') {
      const currentYear = this.currentDateSelected.getFullYear();
      this.currentDateSelected.setFullYear(currentYear + direction);
    }
    this.currentDateSelected = new Date(this.currentDateSelected);
    this.generateMonthlyGrid(this.currentDateSelected);
  }

  selectMonthInternal(monthIndex: number) {
    this.currentDateSelected.setMonth(monthIndex);
    this.currentDateSelected = new Date(this.currentDateSelected);
    this.generateMonthlyGrid(this.currentDateSelected);
    this.calendarView = 'days';
  }

  selectYearInternal(yearNum: number) {
    this.currentDateSelected.setFullYear(yearNum);
    this.currentDateSelected = new Date(this.currentDateSelected);
    this.calendarView = 'months';
  }

  selectTreatment(tipo: string) {
    this.tratamientoSeleccionado = tipo;
  }

  selectDate(day: any) {
    this.selectedDayNumber = day.number;
    this.currentDateSelected = day.fullDate;
    this.currentMonthName = day.fullDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    this.isFechaSeleccionada = true;
  }

  selectSlot(time: string) {
    this.selectedSlot = time;
  }

  goToTab5() {
    this.router.navigate(['/tabs/tab5']);
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }

  async confirmAppointment() {
    if (!this.tratamientoSeleccionado || !this.isFechaSeleccionada || !this.selectedSlot) {
      const errorAlert = await this.alertCtrl.create({
        header: 'Faltan campos por seleccionar',
        message: 'Por favor, asegúrate de haber seleccionado un Servicio, una Fecha válida en el calendario y un Horario antes de continuar.',
        buttons: ['Entendido']
      });
      await errorAlert.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Quiere agregarlo al Calendario?',
      buttons: [
        {
          text: 'No gracias',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/tab4']);
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const successAlert = await this.alertCtrl.create({
              header: 'Éxito',
              message: 'Cita agregada correctamente a su calendario local.',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.router.navigate(['/tabs/tab4']);
                }
              }]
            });
            await successAlert.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
