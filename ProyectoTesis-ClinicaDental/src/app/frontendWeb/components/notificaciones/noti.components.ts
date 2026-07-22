import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noti.components.html',
  styleUrls: ['./noti.components.scss']
})
export class NotificationsComponent {
  showNotifications = false;

  notifications = [
    { id: 1, title: 'Nueva cita agendada: Alice Thompson', time: 'Hace 5 min', read: false },
    { id: 2, title: 'Cancelación de cita: Mark Johnson', time: 'Hace 1 hora', read: false },
    { id: 3, title: 'Recordatorio de limpieza médica', time: 'Ayer', read: true }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }

  constructor(private eRef: ElementRef) {}
}
