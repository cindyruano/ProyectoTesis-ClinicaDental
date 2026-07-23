import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaccion {
  id: string;
  fecha: string;
  concepto: string;
  categoria: string;
  entidad: string;
  tipo: 'INGRESO' | 'GASTO';
  estado: 'Completado' | 'Pendiente';
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private STORAGE_KEY = 'movimientos_finanzas_temp';

  // Datos iniciales de prueba por si el localStorage está vacío
  private datosIniciales: Transaccion[] = [
    {
      id: 'TRX-101',
      fecha: '21/07/2026',
      concepto: 'Tratamiento de Ortodoncia',
      categoria: 'Procedimiento Clínico',
      entidad: 'Carlos Mendoza',
      tipo: 'INGRESO',
      estado: 'Completado',
      monto: 1200.00
    },
    {
      id: 'TRX-102',
      fecha: '21/07/2026',
      concepto: 'Compra de Insumos Dentales',
      categoria: 'Materiales e Insumos',
      entidad: 'Depósito Dental S.A.',
      tipo: 'GASTO',
      estado: 'Completado',
      monto: 3450.00
    },
    {
      id: 'TRX-103',
      fecha: '20/07/2026',
      concepto: 'Limpieza Dental Profunda',
      categoria: 'Consulta General',
      entidad: 'Alice Thompson',
      tipo: 'INGRESO',
      estado: 'Completado',
      monto: 350.00
    }
  ];

  private transaccionesSubject = new BehaviorSubject<Transaccion[]>(this.cargarDeLocalStorage());
  public transacciones$ = this.transaccionesSubject.asObservable();

  constructor() {}

  /** Carga los datos guardados en navegador o inicializa con los predeterminados */
  private cargarDeLocalStorage(): Transaccion[] {
    const guardados = localStorage.getItem(this.STORAGE_KEY);
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        console.error('Error al leer localStorage:', e);
      }
    }
    // Si no hay nada guardado aún, guarda e inicia con los datos por defecto
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.datosIniciales));
    return this.datosIniciales;
  }

  /** Obtiene la lista actual */
  public getTransacciones(): Transaccion[] {
    return this.transaccionesSubject.value;
  }

  /** Agrega una nueva transacción temporalmente en memoria y localStorage */
  public agregarTransaccion(nueva: Transaccion) {
    const listaActual = [nueva, ...this.transaccionesSubject.value];

    // Guardar en localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(listaActual));

    // Notificar a todos los componentes que escuchan (ADM9)
    this.transaccionesSubject.next(listaActual);
  }
}
