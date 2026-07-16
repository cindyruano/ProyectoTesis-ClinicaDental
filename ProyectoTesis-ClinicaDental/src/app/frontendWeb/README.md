# 🦷 PROYECTO CLÍNICA DENTAL

Este apartado documenta el Frontend Web, desarrollado con Angular e Ionic, diseñado específicamente para el personal administrativo y los odontólogos de la Clínica Dental. Permite la gestión digitalizada, control de citas, expedientes y reportería financiera.

---

## 📂 Distribución del Frontend
La plataforma web está organizada en un sistema simétrico de tabs (pestañas de escritorio) que estructuran el flujo administrativo:

| Carpeta | Nombre          | Funcionalidad Clínica / Administrativa                                   |
|---------|-----------------|--------------------------------------------------------------------------|
| Tab1    | Dashboard       | Panel general con métricas clave del día, accesos rápidos y alertas.     | 
| Tab2    | Agendas         | Gestión, asignación y confirmación de citas para los odontólogos.        | 
| Tab3    | Pacientes       | Expediente clínico digital, historial de tratamientos y radiografías.    | 
| Tab4    | Doctores        | Gestión de perfiles médicos, especialidades y horarios rotativos.        |
| Tab5    | Finanzas        | Control de ingresos, saldos pendientes y liquidación de comisiones.      | 
| Tabs    | Menú / Sidebar  | Contenedor principal y barra lateral de navegación para administración.  | 
| Login   | Login Admin     | Módulo de autenticación seguro para administradores y doctores.          |

---

## 🚀 Tecnologías utilizadas (Frontend Web)
- **Framework principal:** Angular  
- **UI Components:** Ionic (Adaptado para entornos Desktop / Web responsive)
- **Estilos:** Sass (SCSS) / Flexbox & Grid  
- **Navegación:** Angular Router (Estructura jerárquica /admin/*)
- **Integraciones:** Conectores API REST para el backend integral de la clínica

---

## ⚙️ Instalación y ejecución
1. Clonar el repositorio  
   ```bash
   git clone https://github.com/cindyruano/ProyectoTesis-ClinicaDental.git
