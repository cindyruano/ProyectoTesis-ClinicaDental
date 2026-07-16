import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  trendingUpOutline,
  timeOutline,
  peopleOutline,
  arrowUpOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab5-web',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {

  constructor() {
    addIcons({
      documentTextOutline,
      trendingUpOutline,
      timeOutline,
      peopleOutline,
      arrowUpOutline
    });
  }

  ngOnInit() {}
}
