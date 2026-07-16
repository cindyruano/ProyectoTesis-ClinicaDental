import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, peopleOutline, pulseOutline, checkmarkCircle, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1-admin',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {

  constructor() {
    addIcons({ calendarOutline, peopleOutline, pulseOutline, checkmarkCircle, timeOutline });
  }

  ngOnInit() {
  }

}
