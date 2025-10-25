const DeanRequestService = {
    getAllRequests: () => [
        {
            id: 1,
            student: "Juan Pérez",
            type: "Cambio de grupo",
            description: "Solicitud para cambio al grupo 2 debido a conflicto de horario.",
            date: "2025-10-20",
            status: "Pendiente",
        },
        {
            id: 2,
            student: "María López",
            type: "Extensión de plazo",
            description: "Requiere más tiempo para entregar su proyecto final.",
            date: "2025-10-18",
            status: "Aprobada",
        },
        {
            id: 3,
            student: "Carlos Díaz",
            type: "Revisión de nota",
            description: "Solicita revisión en la materia de Programación III.",
            date: "2025-10-17",
            status: "Rechazada",
        },
        {
            id: 4,
            student: "Laura Torres",
            type: "Cambio de asignatura",
            description: "Desea cambiar la asignatura electiva por una nueva opción.",
            date: "2025-10-21",
            status: "Pendiente",
        },
    ],
};

export default DeanRequestService;