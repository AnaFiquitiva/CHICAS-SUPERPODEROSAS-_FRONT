// StudentSemaphore.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import StudentInfoHeader from "./StudentInfoHeader";
import "./StudentSemaphore.css"; // CSS opcional para ajustes

const statusColors = {
    approved: "#17C964",       // Verde
    "in-progress": "#006FEE",  // Azul
    failed: "#F31260",         // Rojo
};

export default function StudentSemaphore({ user, onNavigate, onLogout }) {
    const [student, setStudent] = useState(null);
    const [expandedLevels, setExpandedLevels] = useState([]);

    useEffect(() => {
        if (!user) return;

        // Simulación de datos según login (puedes reemplazar con API real)
        const mockStudentData = {
            id: "202500123",
            name: user.name,
            document: "CC 1023370942",
            program: "Ingeniería de Sistemas",
            plan: "ISIS - Plan de Estudios 15",
            emphasis: "",
            modality: "Presencial",
            totalCredits: 139,
            semester: 4,
            situation: "Regular",
            gpa: 3.433,
            semesterGPA: 3.54,
            courses: [
                { name: "Matemáticas I", credits: 4, status: "approved", level: 1 },
                { name: "Programación I", credits: 4, status: "in-progress", level: 1 },
                { name: "Física I", credits: 4, status: "failed", level: 1 },
                { name: "Algoritmos", credits: 4, status: "approved", level: 2 },
                { name: "Base de Datos", credits: 4, status: "in-progress", level: 2 },
            ],
            advisors: ["Dr. Juan Pérez", "Dra. María Gómez"],
            canceledSubjects: ["Historia de la Computación"],
            notes: ["Participación destacada en proyecto X"],
            scholarships: ["Beca Excelencia Académica"],
        };

        setStudent(mockStudentData);
    }, [user]);

    const toggleLevel = (level) => {
        setExpandedLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );
    };

    if (!student) {
        return (
            <div style={{ padding: 50, fontFamily: "'Work Sans', sans-serif" }}>
                No fue posible cargar la información del plan de estudios. Intenta nuevamente.
            </div>
        );
    }

    const levels = [...new Set(student.courses.map(c => c.level))];
    const courseSummary = {
        approved: student.courses.filter(c => c.status === "approved").length,
        pending: student.courses.filter(c => c.status === "in-progress").length,
        failed: student.courses.filter(c => c.status === "failed").length,
        enrolled: student.courses.length,
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar user={user} onNavigate={onNavigate} onLogout={onLogout} />

            <main style={{ flex: 1, padding: "30px 40px", backgroundColor: "#F5F5F5", fontFamily: "'Work Sans', sans-serif" }}>
                {/* Información resumida del estudiante */}
                <StudentInfoHeader student={student} courseSummary={courseSummary} />

                {/* Semáforo académico */}
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 15 }}>Semáforo Académico</h2>
                <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
                    {student.courses.map((course, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "10px 15px",
                                borderRadius: 8,
                                backgroundColor: statusColors[course.status],
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 14,
                                minWidth: 120,
                                textAlign: "center",
                            }}
                            title={`${course.name} - Créditos: ${course.credits}`}
                        >
                            {course.name}
                        </div>
                    ))}
                </div>

                {/* Detalle de cursos por nivel */}
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 15 }}>Detalle de Cursos por Nivel</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {levels.map(level => (
                        <div key={level} style={{ backgroundColor: "#fff", padding: 15, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                            <div
                                onClick={() => toggleLevel(level)}
                                style={{ cursor: "pointer", fontWeight: 600, fontSize: 16 }}
                            >
                                Nivel {level} ({student.courses.filter(c => c.level === level).length} cursos)
                                <span style={{ float: "right" }}>{expandedLevels.includes(level) ? "-" : "+"}</span>
                            </div>
                            {expandedLevels.includes(level) && (
                                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                                    {student.courses.filter(c => c.level === level).map((course, idx) => (
                                        <div key={idx} style={{ padding: 10, borderRadius: 8, backgroundColor: "#F5F5F5" }}>
                                            <div>{course.name}</div>
                                            <div style={{ color: statusColors[course.status], fontWeight: 600 }}>
                                                {course.status === "approved" ? "Aprobado" : course.status === "in-progress" ? "En progreso" : "Reprobado"}
                                            </div>
                                            <div>{course.credits} créditos</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Información adicional */}
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: "30px 0 15px" }}>Información Adicional</h2>
                <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                    <p><strong>Asesores:</strong> {student.advisors.join(", ")}</p>
                    <p><strong>Asignaturas canceladas:</strong> {student.canceledSubjects.join(", ")}</p>
                    <p><strong>Anotaciones:</strong> {student.notes.join(", ")}</p>
                    <p><strong>Becas y distinciones:</strong> {student.scholarships.join(", ")}</p>
                    <p><strong>Modalidad:</strong> {student.modality}</p>
                    <p><strong>Programa:</strong> {student.program}</p>
                    <p><strong>Plan de Estudios:</strong> {student.plan}</p>
                    <p><strong>Situación Académica:</strong> {student.situation}</p>
                </div>
            </main>
        </div>
    );
}
