import React from "react";


// === Datos de ejemplo ===
const courses = [
    {
        semester: 1,
        credits: 18,
        subjects: [
            { code: "MAT-1101", name: "Cálculo Diferencial", status: "aprobada" },
            { code: "FIS-1101", name: "Física I", status: "aprobada" },
            { code: "PRG-1101", name: "Fundamentos de Programación", status: "aprobada" },
            { code: "HUM-1101", name: "Comunicación Escrita", status: "aprobada" },
            { code: "ING-1101", name: "Introducción Ingeniería", status: "aprobada" },
        ],
    },
    {
        semester: 2,
        credits: 18,
        subjects: [
            { code: "MAT-1102", name: "Cálculo Integral", status: "aprobada" },
            { code: "FIS-1102", name: "Física II", status: "aprobada" },
            { code: "PRG-1102", name: "Programación Orientada a Objetos", status: "aprobada" },
            { code: "MAT-1103", name: "Álgebra Lineal", status: "aprobada" },
            { code: "HUM-1102", name: "Comunicación Oral", status: "aprobada" },
        ],
    },
    {
        semester: 3,
        credits: 18,
        subjects: [
            { code: "MAT-2101", name: "Ecuaciones Diferenciales", status: "aprobada" },
            { code: "EFS-2101", name: "Probabilidad y Estadística", status: "aprobada" },
            { code: "PRG-2101", name: "Estructuras de Datos", status: "aprobada" },
            { code: "SIS-2101", name: "Arquitectura de Computadores", status: "aprobada" },
            { code: "HUM-2101", name: "Ética Profesional", status: "aprobada" },
        ],
    },
    {
        semester: 4,
        credits: 18,
        subjects: [
            { code: "MAT-2102", name: "Métodos Numéricos", status: "aprobada" },
            { code: "PRG-2102", name: "Algoritmos y Complejidad", status: "aprobada" },
            { code: "SIS-2102", name: "Bases de Datos", status: "aprobada" },
            { code: "SIS-2103", name: "Sistemas Operativos", status: "aprobada" },
            { code: "ADM-2101", name: "Administración de Empresas", status: "aprobada" },
        ],
    },
    {
        semester: 5,
        credits: 18,
        subjects: [
            { code: "SIS-3101", name: "Ingeniería de Software I", status: "aprobada" },
            { code: "SIS-3102", name: "Redes de Computadores", status: "aprobada" },
            { code: "SIS-3103", name: "Análisis y Diseño de Sistemas", status: "aprobada" },
            { code: "PRG-3101", name: "Programación Web", status: "aprobada" },
            { code: "INV-3101", name: "Metodología de Investigación", status: "aprobada" },
        ],
    },
    {
        semester: 6,
        credits: 18,
        subjects: [
            { code: "SIS-3104", name: "Ingeniería de Software II", status: "cursando" },
            { code: "SIS-3105", name: "Seguridad Informática", status: "cursando" },
            { code: "SIS-3106", name: "Inteligencia Artificial", status: "cursando" },
            { code: "ELE-3101", name: "Electiva Profesional I", status: "cursando" },
            { code: "PRY-3101", name: "Proyecto de Grado I", status: "cursando" },
        ],
    },
    {
        semester: 7,
        credits: 18,
        subjects: [
            { code: "SIS-4101", name: "Arquitectura de Software", status: "pendiente" },
            { code: "SIS-4102", name: "Computación en la Nube", status: "pendiente" },
            { code: "SIS-4103", name: "Machine Learning", status: "pendiente" },
            { code: "ELE-4101", name: "Electiva Profesional II", status: "pendiente" },
            { code: "PRY-4101", name: "Proyecto de Grado II", status: "pendiente" },
        ],
    },
    {
        semester: 8,
        credits: 18,
        subjects: [
            { code: "SIS-4104", name: "Gestión de Proyectos TI", status: "bloqueada" },
            { code: "SIS-4105", name: "Auditoría de Sistemas", status: "bloqueada" },
            { code: "ELE-4102", name: "Electiva Profesional III", status: "bloqueada" },
            { code: "PRY-4102", name: "Proyecto de Grado III", status: "bloqueada" },
            { code: "PAS-4101", name: "Pasantía Profesional", status: "bloqueada" },
        ],
    },
];

// === Colores por estado ===
const statusColors = {
    aprobada: "bg-emerald-100 border-emerald-500 text-emerald-900",
    cursando: "bg-blue-100 border-blue-500 text-blue-900",
    pendiente: "bg-orange-100 border-orange-400 text-orange-900",
    bloqueada: "bg-gray-100 border-gray-400 text-gray-700",
};

// === Componente Principal ===
export default function StudentSemaphore() {
    return (
        <div className="min-h-screen p-8 font-[Work_Sans] bg-gray-50">
            {/* Leyenda */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <Legend color="bg-emerald-500" label="Aprobada" />
                <Legend color="bg-blue-500" label="Cursando" />
                <Legend color="bg-orange-400" label="Pendiente" />
                <Legend color="bg-gray-400" label="Bloqueada" />
            </div>

            {/* Semestres */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((sem) => (
                    <div
                        key={sem.semester}
                        className="bg-[#7b0000] text-white rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="p-3 text-center font-semibold">
                            <h2>Semestre {sem.semester}</h2>
                            <p className="text-sm opacity-90">{sem.credits} créditos</p>
                        </div>
                        <div className="bg-white p-3 space-y-3">
                            {sem.subjects.map((sub, i) => (
                                <div
                                    key={i}
                                    className={`p-3 border-2 rounded-xl ${statusColors[sub.status]} transition-all duration-200 hover:scale-[1.03]`}
                                >
                                    <p className="text-sm font-semibold">{sub.name}</p>
                                    <p className="text-xs opacity-80">{sub.code}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// === Componente de la leyenda ===
const Legend = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className={`w-4 h-4 rounded-full ${color}`}></span>
        <span>{label}</span>
    </div>
);
