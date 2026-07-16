import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, medicalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginAdminPage implements OnInit {
  private router = inject(Router);

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, medicalOutline });
  }

  ngOnInit() {}

  onLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin/tab1']);
  }
}
