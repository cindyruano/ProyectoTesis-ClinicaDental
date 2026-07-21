
# 🦷 PROYECTO CLÍNICA DENTAL

Este apartado documenta el Frontend Web del Módulo Auxiliar, desarrollado con Angular e Ionic, diseñado para el soporte operativo, logístico y de enfermería dentro de la clínica. Este panel facilita la preparación de boxes de atención, recepción e ingreso de pacientes, registro de signos vitales, asistencia en toma de radiografías y el control de inventario de insumos e instrumental.

---

## 📂 Estructura del Módulo Doctor (`/doctor/*`)

El perfil de Doctor está optimizado para la atención clínica directa, gestión de expedientes, odontogramas y seguimiento médico del paciente:

| Carpeta | Nombre                      | Funcionalidad Clínica / Administrativa                                                     |
|---------|-----------------------------|--------------------------------------------------------------------------------------------|
| Aux1    | Tablero                     | Panel operativo diario: visualización de la cola de espera, asignación de pacientes a boxes y alertas rápidas de atención.             | 
| Aux2    | Agenda                      |                                                                                            | 
| Aux3    | Pacientes / Ficha Clínica   |                                                                                            | 
| Aux4    | Inventario/Esterilización   |                                                                                            |
| Aux5    | Perfil                      |                                                                                            |
| Auxs    | Barra de tareas             |                                                                                            | 


# 🩺 Módulo Auxiliar / Enfermería (`/auxiliar/*`)

Este apartado documenta el Frontend Web del **Módulo Auxiliar**, desarrollado con **Angular** e **Ionic**, diseñado para el soporte operativo, logístico y de enfermería dentro de la clínica. Este panel facilita la preparación de boxes de atención, recepción e ingreso de pacientes, registro de signos vitales, asistencia en toma de radiografías y el control de inventario de insumos e instrumental.

---

## 📂 Estructura de Componentes

| Carpeta | Nombre | Funcionalidad Clínica / Administrativa |
| :--- | :--- | :--- |
| **Aux1** | Tablero | Panel operativo diario: visualización de la cola de espera, asignación de pacientes a boxes y alertas rápidas de atención. |
| **Aux2** | Agenda | Vista de apoyo al calendario clínico: recepción de pacientes, toma de signos vitales previa a la consulta y cambio de estado de citas. |
| **Aux3** | Pacientes / Ficha Clínica | Búsqueda rápida de pacientes y vista de soporte/lectura del expediente para asistencia en consulta y toma de radiografías. |
| **Aux4** | Inventario / Esterilización | Control de stock de insumos dentales, gestión de insumos por box y seguimiento de ciclos de esterilización del instrumental. |
| **Aux5** | Perfil | Gestión de cuenta personal del auxiliar/enfermero, actualización de datos de contacto y cambio de contraseña. |
| **Auxs** | Barra de tareas | Contenedor principal (`router-outlet`) y menú lateral de navegación adaptado al perfil operativo de asistencia. |