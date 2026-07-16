import { Routes } from '@angular/router';
import { TabsPage } from './frontendApp/tabs/tabs.page';
import { WebTabsPage } from './frontendWeb/tabs/tabs.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // =========================================================
  // 📱 RUTAS DE LA APP MÓVIL (PACIENTES)
  // =========================================================
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'tab1', // Inicio móvil
        loadComponent: () => import('./frontendApp/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2', // Citas móvil
        loadComponent: () => import('./frontendApp/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3', // Ubicación móvil
        loadComponent: () => import('./frontendApp/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4', // Gamificación móvil
        loadComponent: () => import('./frontendApp/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab5', // Historial móvil
        loadComponent: () => import('./frontendApp/tab5/tab5.page').then(m => m.Tab5Page)
      },
      {
        path: 'tab6', // Perfil móvil
        loadComponent: () => import('./frontendApp/tab6/tab6.page').then(m => m.Tab6Page)
      },
      {
        path: 'tab7', // Chat con IA móvil
        loadComponent: () => import('./frontendApp/tab7/tab7.page').then(m => m.Tab7Page)
      },
      {
        path: 'tab8', // Progreso móvil
        loadComponent: () => import('./frontendApp/tab8/tab8.page').then(m => m.Tab8Page)
      },
      {
        path: 'tab9', // Pagos móvil
        loadComponent: () => import('./frontendApp/tab9/tab9.page').then(m => m.Tab9Page)
      },
      {
        path: 'tab10', // Inventario móvil
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
  // 💻 RUTAS DE LA PLATAFORMA WEB (ADMINISTRACIÓN & DOCTORES)
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
        path: 'tab1', // Inicio / Dashboard Web
        loadComponent: () => import('./frontendWeb/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2', // Agenda Web
        loadComponent: () => import('./frontendWeb/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3', // Pacientes Web
        loadComponent: () => import('./frontendWeb/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4', // Doctores Web
        loadComponent: () => import('./frontendWeb/tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'tab5', // Finanzas Web
        loadComponent: () => import('./frontendWeb/tab5/tab5.page').then(m => m.Tab5Page)
      },
      {
        path: '',
        redirectTo: '/admin/tab1',
        pathMatch: 'full'
      }
    ]
  },

  // =========================================================
  // ⚡ ENRUTADOR GUARDIÁN INTELIGENTE (Ruta raíz '')
  // =========================================================
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      // Si el ancho de pantalla es de un dispositivo móvil (< 768px)
      if (window.innerWidth < 768) {
        return 'login';
      } else {
        // Si es una pantalla de computadora o tablet de escritorio (>= 768px)
        return 'admin/login';
      }
    }
  },

  // Comodín para evitar URLs rotas redirigiendo a la raíz inteligente
  {
    path: '**',
    redirectTo: ''
  }
];
