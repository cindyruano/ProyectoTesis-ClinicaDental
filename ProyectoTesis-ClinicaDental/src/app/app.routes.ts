import { Routes } from '@angular/router';
import { TabsPage } from './frontendApp/tabs/tabs.page';
import { WebTabsPage } from './frontendWeb/tabs/tabs.page' ;
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // =========================================================
  // RUTAS DE LA APP MÓVIL (PACIENTES)
  // =========================================================
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./frontendApp/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2',
        loadComponent: () => import('./frontendApp/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./frontendApp/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4',
        loadComponent: () => import('./frontendApp/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab5',
        loadComponent: () => import('./frontendApp/tab5/tab5.page').then(m => m.Tab5Page)
      },
      {
        path: 'tab6',
        loadComponent: () => import('./frontendApp/tab6/tab6.page').then(m => m.Tab6Page)
      },
      {
        path: 'tab7',
        loadComponent: () => import('./frontendApp/tab7/tab7.page').then(m => m.Tab7Page)
      },
      {
        path: 'tab8',
        loadComponent: () => import('./frontendApp/tab8/tab8.page').then(m => m.Tab8Page)
      },
      {
        path: 'tab9',
        loadComponent: () => import('./frontendApp/tab9/tab9.page').then(m => m.Tab9Page)
      },
      {
        path: 'tab10',
        loadComponent: () => import('./frontendApp/tab10/tab10.page').then(m => m.Tab10Page)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./frontendApp/login/login.page').then(m => m.LoginPage)
  },

// =========================================================
  // RUTAS DE LA PLATAFORMA WEB (ADMINISTRACIÓN & DOCTORES)
  // =========================================================
  {
    path: 'admin/login',
    loadComponent: () => import('./frontendWeb/login/login.page').then(m => m.LoginAdminPage)
  },
  {
    path: 'admin',
    component: WebTabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./frontendWeb/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2',
        loadComponent: () => import('./frontendWeb/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./frontendWeb/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4',
        loadComponent: () => import('./frontendWeb/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab4/:id',
        loadComponent: () => import('./frontendWeb/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab5',
        loadComponent: () => import('./frontendWeb/tab5/tab5.page').then(m => m.Tab5Page)
      },
      {
        path: '',
        redirectTo: '/admin/tab1',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      if (window.innerWidth < 768) {
        return 'login';
      } else {
        return 'admin/login';
      }
    }
  },

  {
    path: '**',
    redirectTo: ''
  }
];
