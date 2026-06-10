import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonButton, IonDatetime, IonAvatar, IonGrid, IonRow, IonCol, IonModal } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notifications, calendarOutline, chevronForward, medicalOutline, waterOutline, optionsOutline, checkmarkCircle } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton, IonDatetime, IonAvatar, IonGrid, IonRow, IonCol, IonModal],
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

  private temporaryDateValue: string = '';

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
      medicalOutline,
      waterOutline,
      optionsOutline,
      checkmarkCircle
    });
    this.generateWeeklyCalendar(this.currentDateSelected);
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  generateWeeklyCalendar(referenceDate: Date) {
    this.currentMonthName = referenceDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const currentDayOfWeek = referenceDate.getDay();
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

    const mondayDate = new Date(referenceDate);
    mondayDate.setDate(referenceDate.getDate() + distanceToMonday);

    const dayNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    this.workingDays = [];

    for (let i = 0; i < 6; i++) {
      const nextDate = new Date(mondayDate);
      nextDate.setDate(mondayDate.getDate() + i);
      this.workingDays.push({
        name: dayNames[i],
        number: nextDate.getDate(),
        fullDate: nextDate
      });
    }
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

  openMonthYearPicker() {
    if (this.calendarModal) {
      this.temporaryDateValue = this.currentDateSelected.toISOString();
      this.calendarModal.present();
    }
  }

  onMonthYearChange(event: any) {
    if (event && event.detail && event.detail.value) {
      this.temporaryDateValue = event.detail.value;
    }
  }

  confirmMonthYearSelection() {
    if (!this.temporaryDateValue) return;

    const selectedDateValue = new Date(this.temporaryDateValue);

    this.applyDateSelection(selectedDateValue, true);

    setTimeout(() => {
      if (this.datetimePicker) {
        this.datetimePicker.presentation = 'date';
      }
    }, 40);
  }

  private applyDateSelection(date: Date, shouldDismissModal: boolean) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    this.currentDateSelected = date;
    this.selectedDayNumber = date.getDate();
    this.isFechaSeleccionada = true;

    this.generateWeeklyCalendar(date);

    if (shouldDismissModal && this.calendarModal) {
      this.calendarModal.dismiss();
    }
  }

  goToTab5() {
    this.router.navigate(['/tabs/tab5']);
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

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }
}
