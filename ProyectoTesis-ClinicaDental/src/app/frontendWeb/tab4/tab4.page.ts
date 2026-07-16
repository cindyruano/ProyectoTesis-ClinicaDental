import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { medicalSharp, personOutline, pulseOutline, documentTextOutline, gridOutline, trendingUpOutline, createOutline, saveOutline, trashOutline, searchOutline, notificationsOutline, shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {

  constructor() {
    addIcons({
      medicalSharp,
      personOutline,
      pulseOutline,
      documentTextOutline,
      gridOutline,
      trendingUpOutline,
      createOutline,
      saveOutline,
      trashOutline,
      searchOutline,
      notificationsOutline,
      shieldCheckmarkOutline
    });
  }

  ngOnInit() {}
}
