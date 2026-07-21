import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { medicalSharp, personOutline, pulseOutline, documentTextOutline, gridOutline, trendingUpOutline, createOutline, saveOutline, trashOutline, searchOutline, notificationsOutline, shieldCheckmarkOutline, chevronBackOutline } from 'ionicons/icons';

interface ExpedientePaciente {
  id: number;
  nombreCompleto: string;
  fechaExamen: string;
  edad: number | null;
  sexo: string;
  fechaNacimiento: string;
  discapacidad: string;
  institucion: string;
  operador: string;
  asistente: string;
  pielAnexos: string;
  ulceras: string;
  leucoplasia: string;
  cuello: string;
  queilitis: string;
  eritroplasia: string;
  atm: string;
  candidiasis: string;
  otros: string;
  estado: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-adm5',
  templateUrl: './adm5.page.html',
  styleUrls: ['./adm5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Adm5Page implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public esFichaNueva = signal<boolean>(true);
  public modoEdicion = signal<boolean>(true);

  public formulario = signal<ExpedientePaciente>({
    id: 0,
    nombreCompleto: '',
    fechaExamen: new Date().toISOString().split('T')[0],
    edad: null,
    sexo: '',
    fechaNacimiento: '',
    discapacidad: '',
    institucion: '',
    operador: '',
    asistente: '',
    pielAnexos: '',
    ulceras: '',
    leucoplasia: '',
    cuello: '',
    queilitis: '',
    eritroplasia: '',
    atm: '',
    candidiasis: '',
    otros: '',
    estado: 'Activo'
  });

  private pacientesMock: Record<number, ExpedientePaciente> = {
    1: {
      id: 1,
      nombreCompleto: 'Carlos Antonio Mendoza Ruiz',
      fechaExamen: '2026-07-15',
      edad: 28,
      sexo: 'Masculino',
      fechaNacimiento: '1998-04-12',
      discapacidad: 'Ninguna',
      institucion: 'Particular',
      operador: 'Dr. Gómez',
      asistente: '',
      pielAnexos: 'Sana',
      ulceras: 'No presenta',
      leucoplasia: 'No presenta',
      cuello: 'Sin anomalías',
      queilitis: 'No presenta',
      eritroplasia: 'No presenta',
      atm: 'Normal',
      candidiasis: 'No presenta',
      otros: '',
      estado: 'Activo'
    }
  };

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
      shieldCheckmarkOutline,
      chevronBackOutline
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        const id = parseInt(idParam, 10);
        const pacienteEncontrado = this.pacientesMock[id];

        if (pacienteEncontrado) {
          this.esFichaNueva.set(false);
          this.modoEdicion.set(false);
          this.formulario.set({ ...pacienteEncontrado });
        } else {
          this.inicializarFichaVacia();
        }
      } else {
        this.inicializarFichaVacia();
      }
    });
  }

  private inicializarFichaVacia() {
    this.esFichaNueva.set(true);
    this.modoEdicion.set(true);
    this.formulario.set({
      id: 0,
      nombreCompleto: '',
      fechaExamen: new Date().toISOString().split('T')[0],
      edad: null,
      sexo: '',
      fechaNacimiento: '',
      discapacidad: '',
      institucion: '',
      operador: '',
      asistente: '',
      pielAnexos: '',
      ulceras: '',
      leucoplasia: '',
      cuello: '',
      queilitis: '',
      eritroplasia: '',
      atm: '',
      candidiasis: '',
      otros: '',
      estado: 'Activo'
    });
  }

  public activarModificacion() {
    this.modoEdicion.set(true);
  }

  public guardarCambios() {
    this.modoEdicion.set(false);
    console.log('Guardando datos del expediente:', this.formulario());
    this.regresarAlListado();
  }

  public cambiarEstado(nuevoEstado: 'Activo' | 'Inactivo') {
    this.formulario.update(form => ({ ...form, estado: nuevoEstado }));
  }

  public regresarAlListado() {
    this.router.navigate(['/admin/adm4']);
  }
}
