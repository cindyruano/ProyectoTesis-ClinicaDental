import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-aux1',
  templateUrl: './aux1.page.html',
  styleUrls: ['./aux1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aux1Page implements OnInit {

  constructor() { }

  ngOnInit() { }

}
