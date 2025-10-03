# Sistema de Reasignación de Horarios Académicos (SIRHA)

## Descripción

El Sistema de Reasignación de Horarios Académicos (SIRHA) tiene como objetivo facilitar la gestión de solicitudes de cambio de materia y grupo por parte de los estudiantes, con trazabilidad, priorización y control de capacidad. Brinda a profesores y decanaturas las herramientas necesarias para evaluar y aprobar dichas solicitudes.

---

## Funcionalidades

### 1. Gestión de Estudiantes

#### Funcionalidades:

- **Registro y autenticación** de estudiantes (con credenciales institucionales).
- **Consulta de horario** actual y de semestres anteriores.
- **Visualización del semáforo académico** (avance en plan de estudios:
    - Verde = en curso normal aprobado
    - Azul = en progreso
    - Rojo = pérdida).
- **Creación de solicitudes de cambio**:
    - Materia y grupo con problemas.
    - Sugerencia de cambio (grupo o materia destino).
    - Observaciones adicionales.
- **Consulta de estado de solicitudes** (pendiente, en revisión, aprobada, rechazada).
- **Historial de solicitudes** hechas.

#### Restricciones Iniciales:

- Solo se pueden generar solicitudes dentro de las fechas habilitadas por la institución.
- No se pueden generar solicitudes de materias que el estudiante ya haya cancelado en el mismo semestre.
- Cada solicitud queda con un número de radicado y prioridad automática (orden de llegada).

---

### 2. Gestión por Decanatura

#### Funcionalidades:

- **Acceso restringido** según facultad/decanatura.
- **Consulta de las solicitudes** recibidas en su área.
- **Visualización del horario** del estudiante que solicita el cambio.
- **Consulta del semáforo académico** del estudiante (rendimiento).
- **Consulta de materia que desea cambiar** y disponibilidad de grupos alternos:
    - Capacidad actual.
    - Cupo máximo del grupo.
    - Lista de espera (si aplica).
- **Ver información básica del estudiante** (código, nombre, carrera, semestre).
- **Respuestas a solicitudes** con:
    - Aprobar.
    - Rechazar.
    - Solicitar información adicional.
- **Consulta global** de todas las solicitudes por facultad.
- **Aprobación especial de casos excepcionales.**
- **Configuración de periodos habilitados para cambios.**
- **Monitoreo de cargas de los grupos** (alerta si un grupo llega al 90% de su capacidad).

#### Restricciones Iniciales:

- Solo pueden gestionar solicitudes de las materias bajo su facultad.
- No pueden aprobar cambios si el grupo destino ya está lleno.
- Las solicitudes deben resolverse en un plazo máximo definido (ej. 5 días hábiles).
- Solo usuarios con rol de administrador o decanatura pueden modificar cupos.
- No pueden aprobar solicitudes fuera del calendario académico.

---

### 3. Gestión de Grupos y Materias

#### Funcionalidades:

- **Registro de materias, grupos y cupos**.
- **Consulta de capacidad** de cada grupo (total inscritos / cupo máximo).
- **Registro de profesores asignados** a cada grupo.
- **Administración de horarios disponibles**.

#### Restricciones:

- No se permiten cupos superiores al máximo definido.
- Los horarios no pueden solaparse con materias obligatorias del estudiante.

---

### 4. Gestión de Solicitudes

#### Funcionalidades:

- **Recepción de solicitudes** creadas por estudiantes.
- **Asignación automática de prioridad** según orden de llegada.
- **Ruteo de solicitudes** hacia la facultad correspondiente.
- **Registro de todas las decisiones tomadas** (trazabilidad).
- **Generación de reportes** de:
    - Solicitudes pendientes.
    - Solicitudes aprobadas/rechazadas.
    - Estadísticas de reasignaciones por materia y grupo.

#### Restricciones:

- Cada solicitud solo puede estar activa en un estado (pendiente, en proceso, aprobada, rechazada).
- No se puede aprobar una solicitud si implica sobrepasar cupo o generar cruce horario.

---

### 5. Reportes y Estadísticas

#### Funcionalidades:

- **Reporte de historial de cambios** por estudiante.
- **Estadísticas de grupos más solicitados** para cambio.
- **Tasa de aprobación vs rechazo** de solicitudes.
- **Indicadores de avance en planes de estudio** (semaforización global).

---

## Restricciones Generales del Sistema

1. **Autenticación con credenciales institucionales** únicamente.
2. **Control de roles** (estudiante, decanatura, admin).
3. **Fechas límite de solicitudes** controladas por calendario académico.
4. **Validación de cruce de horarios** antes de aprobar un cambio.
5. No se permiten **cupos por encima de lo establecido**.

---
## Flujo de Trabajo
![1](documents/images/1.png)
![2](documents/images/2.png)
![3](documents/images/3.png)
![4](documents/images/4.png)
![5](documents/images/5.png)
![6](documents/images/6.png)
![7](documents/images/7.png)
![8](documents/images/8.png)
![9](documents/images/9.png)
![10](documents/images/10.png)
![11](documents/images/11.png)
![12](documents/images/12.png)
![13](documents/images/13.png)
![14](documents/images/14.png)
![15](documents/images/15.png)
![16](documents/images/16.png)
![17](documents/images/17.png)
![18](documents/images/18.png)
![19](documents/images/19.png)
![20](documents/images/20.png)
![21](documents/images/21.png)
![22](documents/images/22.png)
![23](documents/images/23.png)
![24](documents/images/24.png)
![25](documents/images/25.png)
![26](documents/images/26.png)
![27](documents/images/27.png)
![28](documents/images/28.png)
![29](documents/images/29.png)
