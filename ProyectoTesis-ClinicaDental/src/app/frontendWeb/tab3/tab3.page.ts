import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; // Inyectamos el Router
import { addIcons } from 'ionicons';
import {
  searchOutline,
  personAddOutline,
  documentTextOutline,
  trashOutline,
  chevronBackOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab3-admin',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] // Añadimos RouterModule
})
export class Tab3Page implements OnInit {
  private router = inject(Router); // Inyección del enrutador de Angular

  constructor() {
    // Registramos SOLO los iconos necesarios para la vista del directorio
    addIcons({
      searchOutline,
      personAddOutline,
      documentTextOutline,
      trashOutline,
      chevronBackOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {}

  /**
   * Navega a la vista detallada del expediente de un paciente.
   * En el futuro, 'admin/ver-expediente' será una sub-ruta hija o un componente dedicado.
   * @param idPaciente El identificador del paciente seleccionado.
   */
  onSelectPaciente(idPaciente: number) {
    // Console log para tesis/desarrollo
    // console.log(`Seleccionado paciente con ID: ${idPaciente}. Navegando al expediente...`);

    // Simulación del flujo de navegación profesional:
    // Redirigimos a una ruta genérica de expediente. En producción sería 'admin/pacientes/ver/${idPaciente}'
    this.router.navigate(['admin/ver-expediente']);
  }
}
