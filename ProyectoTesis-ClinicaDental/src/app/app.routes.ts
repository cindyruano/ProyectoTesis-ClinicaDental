import { Routes } from '@angular/router';
import { TabsPage } from './frontend/tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', // Inicio
        loadComponent: () => import('./frontend/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2', // Citas
        loadComponent: () => import('./frontend/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3', // Ubicación
        loadComponent: () => import('./frontend/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4', // Gamificación (Progreso)
        loadComponent: () => import('./frontend/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab5', // Historial de Citas
        loadComponent: () => import('./frontend/tab5/tab5.page').then(m => m.Tab5Page)
      },
       {
        path: 'tab6', // Historial de Citas
        loadComponent: () => import('./frontend/tab6/tab6.page').then(m => m.Tab6Page)
      },
       {
        path: 'tab7', // Chat con IA
        loadComponent: () => import('./frontend/tab7/tab7.page').then(m => m.Tab7Page)
      },
      {
        path: 'tab8', // Gamificación (Progreso)
        loadComponent: () => import('./frontend/tab8/tab8.page').then(m => m.Tab8Page)
      },

      {
        path: 'tab9', // Pagos
        loadComponent: () => import('./frontend/tab9/tab9.page').then(m => m.Tab9Page)
      },

      {
        path: 'tab10', // Inventario
        loadComponent: () => import('./frontend/tab10/tab10.page').then(m => m.Tab10Page)
      },
        {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
