
# 🦷 PROYECTO CLÍNICA DENTAL - PLATAFORMA WEB

Este apartado documenta el Frontend Web del Módulo Doctor, desarrollado con Angular e Ionic, diseñado para optimizar el flujo de trabajo en la consulta médica. Este panel permite la gestión directa de la agenda del odontólogo, atención de la cola de espera, edición de la ficha clínica con odontograma interactivo, formulación de planes de tratamiento y generación de recetarios digitales.

---

## 📂 Estructura del Módulo Doctor (`/doctor/*`)

El perfil de Doctor está optimizado para la atención clínica directa, gestión de expedientes, odontogramas y seguimiento médico del paciente:

| Carpeta | Nombre                      | Funcionalidad Clínica / Administrativa                                                                                     |
|---------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Doc1    | Tablero                     | Resumen operativo diario (KPIs de citas del día, cola de atención en sala de espera y alertas rápidas).                    | 
| Doc2    | Agenda                      | Calendario personal del doctor por día/semana, gestión de citas (iniciar, reagendar) y bloques de horarios.                | 
| Doc3    | Pacientes                   | Directorio general de pacientes asignados, búsqueda por nombre o DNI/RUT y estado global del paciente.                     | 
| Doc4    | Ficha clínica               | Espacio de trabajo médico directo: odontograma interactivo, historial clínico, notas de evolución y radiografías.          |
| Doc5    | Tratamientos y presupuestos | Gestor global de planes de tratamiento creados, cotizaciones aprobadas/pendientes y seguimiento de avances.                |
| Doc6    | Recetario                   | Generador rápido de prescripciones médicas, historial de recetas emitidas y gestión de plantillas de fármacos.             | 
| Doc7    | Perfil                      | Ajustes de cuenta del doctor, firma digital, sello médico y preferencias del usuario.                                      |
| Docs    | Barra de tareas             | CGestor del menú lateral: Personalización de accesos, orden de pestañas y permisos de visibilidad según el rol de usuario. |
