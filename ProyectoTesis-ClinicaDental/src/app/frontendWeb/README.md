
# 🦷 PROYECTO CLÍNICA DENTAL

Plataforma Web desarrollada con *Angular* e *Ionic*, diseñada para la digitalización integral, control de citas, expedientes clínicos y gestión administrativa de la Clínica Dental.
La arquitectura está modularizada en *3 paneles independientes según el rol de usuario*, garantizando seguridad, permisos claros y una experiencia personalizada:

---

## 📂 Módulos de la Plataforma Web
  - **[Módulo Administrador](./src/app/frontendWeb/admin/README.md):**   Supervisión global, finanzas, presupuestos, auditoría y gestión de personal.
  - **[Módulo Doctor](./src/app/frontendWeb/doctor/README.md):**         Consulta médica, odontograma, agenda personal, fichas clínicas y recetario.
  - **[Módulo Auxiliar](./src/app/frontendWeb/auxiliar/README.md):**     Apoyo clínico, flujo de sala de espera, desinfección de boxes e inventario.

---

## 🚀 Tecnologías utilizadas (Frontend Web)
- **Framework principal:** Angular  
- **UI Components:** Ionic Framework (Adaptado para entornos Desktop / Web responsive)
- **Estilos:** Sass (SCSS) / Flexbox & Grid  
- **Navegación:** Angular Router (Estructura jerárquica /admin/*)
- **Enrutamiento:** Angular Router (Lazy Loading por roles)
- **Integraciones:** Conectores API REST para el backend integral de la clínica

---

## ⚙️ Instalación y ejecución
1. Clonar el repositorio  
   ```bash
   git clone https://github.com/cindyruano/ProyectoTesis-ClinicaDental.git

2. Instalar dependencias
  *npm install*

3. Ejecutar servidor de desarrollo 
  *ng serve*
