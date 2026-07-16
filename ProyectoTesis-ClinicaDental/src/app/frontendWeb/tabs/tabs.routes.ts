import { Routes } from '@angular/router';
import { WebTabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'admin',
    component: WebTabsPage,
    children: [
      {
        path: 'tab1', // Dashboard / Inicio Web
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2', // Agenda Web
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3', // Pacientes Web
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4', // Doctores Web
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: 'tab5', // Finanzas Web
        loadComponent: () =>
          import('../tab5/tab5.page').then((m) => m.Tab5Page),
      },
      {
        path: '',
        redirectTo: '/admin/tab1',
        pathMatch: 'full',
      },
    ],
  },
];
