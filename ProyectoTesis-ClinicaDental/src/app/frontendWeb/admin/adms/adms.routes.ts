import { Routes } from '@angular/router';
import { AdmsPage } from './adms.page';

export const routes: Routes = [
  {
    path: '',
    component: AdmsPage,
    children: [
      {
        path: 'adm1',
        loadComponent: () => import('../adm1/adm1.page').then((m) => m.Adm1Page),
      },
      {
        path: 'adm2',
        loadComponent: () => import('../adm2/adm2.page').then((m) => m.Adm2Page),
      },
      {
        path: 'adm3',
        loadComponent: () => import('../adm3/adm3.page').then((m) => m.Adm3Page),
      },
      {
        path: 'adm4',
        loadComponent: () => import('../adm4/adm4.page').then((m) => m.Adm4Page),
      },
      {
        path: 'adm4/nuevo',
        loadComponent: () => import('../adm4/adm4.page').then((m) => m.Adm4Page),
      },
      {
        path: 'adm4/:id',
        loadComponent: () => import('../adm4/adm4.page').then((m) => m.Adm4Page),
      },
      {
        path: 'adm5',
        loadComponent: () => import('../adm5/adm5.page').then((m) => m.Adm5Page),
      },
      {
        path: 'adm6',
        loadComponent: () => import('../adm6/adm6.page').then((m) => m.Adm6Page),
      },
      {
        path: 'adm7',
        loadComponent: () => import('../adm7/adm7.page').then((m) => m.Adm7Page),
      },
      {
        path: 'adm8',
        loadComponent: () => import('../adm8/adm8.page').then((m) => m.Adm8Page),
      },
      {
        path: 'adm9',
        loadComponent: () => import('../adm9/adm9.page').then((m) => m.Adm9Page),
      },
      {
        path: 'adm10',
        loadComponent: () => import('../adm10/adm10.page').then((m) => m.Adm10Page),
      },
      {
        path: 'adm11',
        loadComponent: () => import('../adm11/adm11.page').then((m) => m.Adm11Page),
      },
      {
        path: '',
        redirectTo: 'adm1',
        pathMatch: 'full',
      },
    ],
  },
];
