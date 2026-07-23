import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductoInventario {
  id: number;
  codigo: string;
  nombre: string;
  presentacion: string;
  categoria: 'Materiales' | 'Anestesia' | 'Instrumental' | 'Protección';
  ubicacion: string;
  precioUnitario: number;
  stockActual: number;
  stockMinimo: number;
  estadoStock: 'Adecuado' | 'Bajo' | 'Agotado';
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private productosIniciales: ProductoInventario[] = [
    {
      id: 1,
      codigo: 'INV-001',
      nombre: 'Resina Fotocurable A2',
      presentacion: 'Jeringa 4g',
      categoria: 'Materiales',
      ubicacion: 'Gabinete 1 - Estante A',
      precioUnitario: 185.00,
      stockActual: 12,
      stockMinimo: 5,
      estadoStock: 'Adecuado'
    },
    {
      id: 2,
      codigo: 'INV-002',
      nombre: 'Anestesia Lidocaína 2%',
      presentacion: 'Caja 50 cartuchos',
      categoria: 'Anestesia',
      ubicacion: 'Refrigerador Clínico',
      precioUnitario: 240.00,
      stockActual: 3,
      stockMinimo: 6,
      estadoStock: 'Bajo'
    },
    {
      id: 3,
      codigo: 'INV-003',
      nombre: 'Guantes de Nitrilo (M)',
      presentacion: 'Caja 100 unidades',
      categoria: 'Protección',
      ubicacion: 'Bodega Central',
      precioUnitario: 65.00,
      stockActual: 0,
      stockMinimo: 10,
      estadoStock: 'Agotado'
    },
    {
      id: 4,
      codigo: 'INV-004',
      nombre: 'Espejo Bucal N° 5',
      presentacion: 'Unidad Acero Inoxidable',
      categoria: 'Instrumental',
      ubicacion: 'Área de Esterilización',
      precioUnitario: 35.00,
      stockActual: 20,
      stockMinimo: 8,
      estadoStock: 'Adecuado'
    },
    {
      id: 5,
      codigo: 'INV-005',
      nombre: 'Ácido Grabador 37%',
      presentacion: 'Jeringa 12g',
      categoria: 'Materiales',
      ubicacion: 'Gabinete 2 - Estante B',
      precioUnitario: 95.00,
      stockActual: 2,
      stockMinimo: 4,
      estadoStock: 'Bajo'
    }
  ];

  private productosSubject = new BehaviorSubject<ProductoInventario[]>(this.productosIniciales);
  public productos$ = this.productosSubject.asObservable();

  public agregarProducto(nuevo: Omit<ProductoInventario, 'id' | 'estadoStock'>) {
    const listaActual = this.productosSubject.value;
    const nuevoId = Math.max(...listaActual.map(p => p.id), 0) + 1;

    let estadoStock: 'Adecuado' | 'Bajo' | 'Agotado' = 'Adecuado';
    if (nuevo.stockActual === 0) {
      estadoStock = 'Agotado';
    } else if (nuevo.stockActual <= nuevo.stockMinimo) {
      estadoStock = 'Bajo';
    }

    const productoCompleto: ProductoInventario = {
      ...nuevo,
      id: nuevoId,
      estadoStock
    };

    this.productosSubject.next([productoCompleto, ...listaActual]);
  }

  public actualizarProducto(producto: ProductoInventario) {
    let nuevoEstado: 'Adecuado' | 'Bajo' | 'Agotado' = 'Adecuado';
    if (producto.stockActual === 0) {
      nuevoEstado = 'Agotado';
    } else if (producto.stockActual <= producto.stockMinimo) {
      nuevoEstado = 'Bajo';
    }

    const productoActualizado = { ...producto, estadoStock: nuevoEstado };
    const listaActual = this.productosSubject.value.map(p => p.id === producto.id ? productoActualizado : p);
    this.productosSubject.next(listaActual);
  }

  public eliminarProducto(id: number) {
    const listaFiltrada = this.productosSubject.value.filter(p => p.id !== id);
    this.productosSubject.next(listaFiltrada);
  }
}
