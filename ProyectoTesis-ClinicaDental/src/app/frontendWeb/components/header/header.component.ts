import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, shieldCheckmarkOutline, medicalSharp, chevronBackOutline } from 'ionicons/icons';
import { NotificationsComponent } from '../notificaciones/noti.components';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, NotificationsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() titulo: string = 'AGENDA MÉDICA';
  @Input() subtitulo: string = 'Odontólogos Sociales y Comunitarios';
  @Input() tag3: string = 'CONTROL Y CONFIRMACIÓN DE CITAS';
  @Input() icono: string = 'medical-sharp';

  public brandIcon = medicalSharp;

  @Input() mostrarBuscador: boolean = true;
  @Input() placeholderBuscador: string = 'Buscar cita...';
  @Input() textoBusqueda: string = '';
  @Input() mostrarBotonVolver: boolean = false;
  @Input() textoVolver: string = 'Volver al Directorio';
  @Output() busquedaChange = new EventEmitter<string>();
  @Output() volverClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'search-outline': searchOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'chevron-back-outline': chevronBackOutline
    });
  }

  onInputBusqueda(event: any): void {
    this.busquedaChange.emit(event.target.value);
  }

  onVolver(): void {
    this.volverClick.emit();
  }
}
