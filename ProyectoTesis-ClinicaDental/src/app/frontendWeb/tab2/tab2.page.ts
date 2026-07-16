import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  searchOutline,
  checkmarkCircleOutline,
  timeOutline,
  closeCircleOutline,
  createOutline,
  trashOutline,
  syncOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2-web',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {

  constructor() {
    addIcons({
      addOutline,
      searchOutline,
      checkmarkCircleOutline,
      timeOutline,
      closeCircleOutline,
      createOutline,
      trashOutline,
      syncOutline
    });
  }

  ngOnInit() {}
}
