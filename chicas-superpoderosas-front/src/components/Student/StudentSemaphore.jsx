import React, { useState } from "react";
import TopBar from "./TopBar";
import "./StudentSemaphore.css";
import SubjectDetailModal from "./SubjectDetailModal";


const courses = [
    {
        semester: 1,
        credits: 18,
        subjects: [
            { code: "MAT-1101", name: "Cálculo Diferencial", credits: 4, grade: 4.3, status: "aprobada" },
            { code: "FIS-1101", name: "Física I", credits: 3, grade: 3.8, status: "aprobada" },
            { code: "PRG-1101", name: "Fundamentos de Programación", credits: 4, grade: 4.5, status: "aprobada" },
            { code: "HUM-1101", name: "Comunicación Escrita", credits: 2, grade: 4.0, status: "aprobada" },
            { code: "ING-1101", name: "Introducción a la Ingeniería", credits: 2, grade: 3.6, status: "aprobada" },
        ],
    },
    {
        semester: 2,
        credits: 18,
        subjects: [
            { code: "MAT-1102", name: "Cálculo Integral", credits: 4, grade: 3.9, status: "aprobada" },
            { code: "FIS-1102", name: "Física II", credits: 3, grade: 3.7, status: "aprobada" },
            { code: "PRG-1102", name: "Programación Orientada a Objetos", credits: 4, grade: 4.2, status: "aprobada" },
            { code: "MAT-1103", name: "Álgebra Lineal", credits: 3, grade: 3.8, status: "aprobada" },
            { code: "HUM-1102", name: "Comunicación Oral", credits: 2, grade: 4.2, status: "aprobada" },
        ],
    },
    {
        semester: 3,
        credits: 16,
        subjects: [
            { code: "MAT-2101", name: "Ecuaciones Diferenciales", credits: 3, grade: 4.0, status: "aprobada" },
            { code: "EST-2101", name: "Probabilidad y Estadística", credits: 3, grade: 3.9, status: "aprobada" },
            { code: "PRG-2101", name: "Estructuras de Datos", credits: 4, grade: 4.2, status: "aprobada" },
            { code: "SIS-2101", name: "Arquitectura de Computadores", credits: 3, grade: 3.8, status: "aprobada" },
            { code: "HUM-2101", name: "Ética Profesional", credits: 3, grade: 4.1, status: "aprobada" },
        ],
    },
    {
        semester: 4,
        credits: 18,
        subjects: [
            { code: "MAT-2302", name: "Métodos Numéricos", credits: 3, grade: 3.6, status: "aprobada" },
            { code: "PRG-2302", name: "Algoritmos y Complejidad", credits: 4, grade: 4.0, status: "aprobada" },
            { code: "SIS-2302", name: "Bases de Datos", credits: 3, grade: 4.2, status: "aprobada" },
            { code: "SIS-2303", name: "Sistemas Operativos", credits: 3, grade: 3.8, status: "aprobada" },
            { code: "ADM-2301", name: "Administración de Empresas", credits: 2, grade: 3.9, status: "aprobada" },
        ],
    },
    {
        semester: 5,
        credits: 16,
        subjects: [
            { code: "SIS-3101", name: "Ingeniería de Software I", credits: 3, grade: 4.1, status: "aprobada" },
            { code: "SIS-3102", name: "Redes de Computadores", credits: 3, grade: 3.9, status: "aprobada" },
            { code: "SIS-3103", name: "Análisis y Diseño de Sistemas", credits: 3, grade: 4.0, status: "aprobada" },
            { code: "PRG-3101", name: "Programación Web", credits: 4, grade: 4.6, status: "failed" },
            { code: "MET-3101", name: "Metodología de Investigación", credits: 3, grade: 4.3, status: "aprobada" },
        ],
    },
    {
        semester: 6,
        credits: 18,
        subjects: [
            { code: "SIS-3104", name: "Ingeniería de Software II", credits: 3, status: "cursando" },
            { code: "SIS-3105", name: "Seguridad Informática", credits: 3, status: "cursando" },
            { code: "SIS-3106", name: "Inteligencia Artificial", credits: 3, status: "cursando" },
            { code: "ELE-3101", name: "Electiva Profesional I", credits: 3, status: "cursando" },
            { code: "PRY-3101", name: "Proyecto de Grado I", credits: 6, status: "cursando" },
        ],
    },
    {
        semester: 7,
        credits: 17,
        subjects: [
            { code: "SIS-4101", name: "Arquitectura de Software", credits: 3, status: "pendiente" },
            { code: "SIS-4102", name: "Computación en la Nube", credits: 3, status: "pendiente" },
            { code: "SIS-4103", name: "Machine Learning", credits: 3, status: "pendiente" },
            { code: "ELE-4101", name: "Electiva Profesional II", credits: 4, status: "bloqueada" },
            { code: "PRY-4101", name: "Proyecto de Grado II", credits: 4, status: "pendiente" },
        ],
    },
    {
        semester: 8,
        credits: 16,
        subjects: [
            { code: "SIS-4104", name: "Gestión de Proyectos TI", credits: 3, status: "bloqueada" },
            { code: "SIS-4105", name: "Auditoría de Sistemas", credits: 3, status: "bloqueada" },
            { code: "ELE-4102", name: "Electiva Profesional III", credits: 3, status: "bloqueada" },
            { code: "PRY-4102", name: "Pasantía Profesional", credits: 4, status: "bloqueada" },
            { code: "PAS-4101", name: "Proyecto Final", credits: 3, status: "bloqueada" },
        ],
    },
];
const statusClasses = {
    aprobada: "status-approved",
    cursando: "status-progress",
    pendiente: "status-pending",
    bloqueada: "status-blocked",
    failed: "status-failed"

};

export default function StudentSemaphore() {
    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(null);

    const filteredCourses = courses.map((sem) => ({
        ...sem,
        subjects: sem.subjects.filter(
            (s) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.code.toLowerCase().includes(search.toLowerCase())
        ),
    }));

    return (
        <>
            <TopBar />
            <div className="semaphore-container">
                <h1 className="title">Semáforo Académico</h1>
                <p className="subtitle">Malla curricular y progreso académico</p>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar materia por nombre o código..."
                        className="search-bar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="legend-container">
                    <Legend color="approved" label="Aprobada" />
                    <Legend color="progress" label="Cursando" />
                    <Legend color="pending" label="Pendiente" />
                    <Legend color="blocked" label="Bloqueada" />
                    <Legend color="failed" label="Reprovada" />
                </div>

                <div className="grid-container">
                    {filteredCourses.map((sem) => (
                        <div key={sem.semester} className="semester-card">
                            <div className="semester-header">
                                <h2>Semestre {sem.semester}</h2>
                                <span>{sem.credits} créditos</span>
                            </div>
                            <div className="subjects-container">
                                {sem.subjects.map((sub, i) => (
                                    <div
                                        key={i}
                                        className={`subject-card ${statusClasses[sub.status]}`}
                                        onClick={() => setSelectedSubject({ ...sub, semester: sem.semester })}
                                    >
                                        <div className="subject-info">
                                            <span className="subject-code">{sub.code}</span>
                                            <span className="subject-name">{sub.name}</span>
                                        </div>
                                        <div className="subject-meta">
                                            <span>{sub.credits} créditos</span>
                                            {sub.grade && <span>Nota: {sub.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSubject && (
                <SubjectDetailModal subject={selectedSubject} onClose={() => setSelectedSubject(null)} />
            )}
        </>
    );
}

const Legend = ({ color, label }) => (
    <div className="legend-item">
        <span className={`legend-dot ${color}`}></span>
        <span>{label}</span>
    </div>
);