import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-doc1',
  templateUrl: './doc1.page.html',
  styleUrls: ['./doc1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Doc1Page implements OnInit { // <-- Asegúrate de que lleve 'export class Doc1Page'

  constructor() { }

  ngOnInit() { }

}
