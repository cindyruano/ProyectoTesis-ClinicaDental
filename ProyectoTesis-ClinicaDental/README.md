# 🦷 PROYECTO CLÍNICA DENTAL

Sistema integral de gestión para una **Clínica Dental**, que incluye:
- **Frontend** (Angular + Ionic)
- **Backend** (por implementar)
- **Base de datos** (por implementar)

Este repositorio documenta principalmente el **apartado de Frontend**, encargado de la interfaz visual e interactiva para pacientes, doctores y administradores.

---

## 📂 Estructura del Proyecto

ProyectoTesis-ClinicaDental/
│
├── src/
│ ├── app/
│ │ ├── frontend/   
│ │ │ ├── login/       → Módulo de autenticación
│ │ │ ├── tab1/        → Inicio
│ │ │ ├── tab2/        → Citas 
│ │ │ ├── tab3/        → Ubicación
│ │ │ ├── tab4/        → Progreso
│ │ │ ├── tab5/        → Historial
│ │ │ ├── tab6/        → Perfil
│ │ │ ├── tab7/        → IA
│ │ │ └── README.md    → Documentación del Frontend
│ │ ├── app.component.ts
│ │ ├── app.component.scss
│ │ └── app.component.html
│ └── index.html
│
├── capacitor.config.ts
├── package.json
└── README.md

---

## 🖥️ Frontend (Angular + Ionic)

La aplicación está organizada en **tabs** que representan las principales funcionalidades:

| Tab | Nombre        | Funcionalidad |
|-----|---------------|---------------|
| 1   | Inicio        | Pantalla principal con acceso rápido a las secciones. |
| 2   | Citas         | Gestión de citas: creación, edición y visualización. |
| 3   | Ubicación     | Muestra la dirección y mapa de la clínica (Leaflet + Capacitor Geolocation). |
| 4   | Progreso      | Seguimiento del tratamiento del paciente. |
| 5   | Historial     | Registro de visitas y procedimientos anteriores. |
| 6   | Perfil        | Información personal y configuración del usuario. |
| 7   | IA            | Asistente inteligente para recomendaciones y soporte. |
| 8   | Gamificación  | Sistema de logros y recompensas para motivar al paciente. *(pendiente)* |
| 9   | Pagos         | Gestión de facturación y métodos de pago. *(pendiente)* |
| 10  | Inventario    | Control de insumos y materiales de la clínica. *(pendiente)* |
| 11  | Barra de tareas | Acceso rápido a las funciones principales. *(pendiente)* |

---

## 🚀 Tecnologías utilizadas

- **Frontend Framework:** Angular  
- **Mobile/Hybrid UI:** Ionic  
- **Mapas:** Leaflet  
- **Geolocalización:** Capacitor Geolocation  
- **Estilos:** SCSS, TailwindCSS / Bootstrap  
- **Gestión de estado:** Servicios + RxJS  
- **Integraciones:** API REST (para conexión con el backend futuro)  

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/usuario/proyecto-clinica-dental.git


instalación npm install
ejecutar en modo desarrollo (navegador) ionic serve
compilar para producción npm run build
sincronizar capacitor (Android/iOS) npx cap sync
Abrir en Android Studio o Xcode 
npx cap open android
npx cap open ios
 
📌 Próximos pasos
Implementar Backend (API REST con autenticación y lógica de negocio).

Configurar Base de datos (MySQL/PostgreSQL).

Documentar arquitectura completa (Frontend + Backend + BD).

Agregar capturas de pantalla de cada tab.

Incluir pruebas unitarias (.spec.ts) para componentes clave.

👩‍💻 Equipo
Proyecto desarrollado como parte de la Tesis de la Clínica Dental, con enfoque en ofrecer una experiencia moderna y accesible para pacientes y doctores. 
