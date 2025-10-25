// src/components/Deanery/DeanStudentsService.jsx
const studentsData = [
    {
        id: 1,
        nombre: "Juan Sebastián Pérez",
        codigo: "202110001",
        programa: "Ingeniería de Sistemas",
        correo: "juan.perez@university.edu",
        telefono: "3001234567",
        estado: "Activo",
        semestre: 6,
        promedio: 4.2,
        horarioActual: [
            { materia: "Programación Avanzada", dia: "Lunes", hora: "8:00 - 10:00" },
            { materia: "Base de Datos II", dia: "Martes", hora: "10:00 - 12:00" },
            { materia: "Ingeniería de Software", dia: "Jueves", hora: "2:00 - 4:00" },
        ],
        historial: [
            { periodo: "2024-1", promedio: 4.3 },
            { periodo: "2024-2", promedio: 4.1 },
            { periodo: "2025-1", promedio: 4.2 },
        ],
    },
    {
        id: 2,
        nombre: "María Patricia Gómez",
        codigo: "202110002",
        programa: "Administración de Empresas",
        correo: "maria.gomez@university.edu",
        telefono: "3107654321",
        estado: "Activo",
        semestre: 5,
        promedio: 4.0,
        horarioActual: [
            { materia: "Marketing II", dia: "Lunes", hora: "9:00 - 11:00" },
            { materia: "Finanzas Corporativas", dia: "Miércoles", hora: "1:00 - 3:00" },
        ],
        historial: [
            { periodo: "2024-1", promedio: 4.0 },
            { periodo: "2024-2", promedio: 3.9 },
            { periodo: "2025-1", promedio: 4.1 },
        ],
    },
    {
        id: 3,
        nombre: "Carlos Javier Rojas",
        codigo: "202110003",
        programa: "Derecho",
        correo: "carlos.rojas@university.edu",
        telefono: "3209876543",
        estado: "Inactivo",
        semestre: 3,
        promedio: 3.7,
        horarioActual: [],
        historial: [
            { periodo: "2024-1", promedio: 3.8 },
            { periodo: "2024-2", promedio: 3.6 },
        ],
    },
];

export const getAllStudents = () => studentsData;

export const getStudentById = (id) => studentsData.find((s) => s.id === id);
