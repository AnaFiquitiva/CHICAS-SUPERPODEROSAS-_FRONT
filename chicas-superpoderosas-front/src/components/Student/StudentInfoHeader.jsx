// StudentInfoHeader.jsx
import React from "react";

export default function StudentInfoHeader({ student, courseSummary }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
                padding: "20px 25px",
                backgroundColor: "#FAFAFA",
                borderRadius: 18,
                boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                marginBottom: 30,
                fontFamily: "'Work Sans', sans-serif",
            }}
        >
            {/* Cursos Aprobados */}
            <div>
                <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Cursos Aprobados</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#17C964", margin: 5 }}>
                    {courseSummary.approved}
                </h3>
            </div>

            {/* Cursos Pendientes */}
            <div>
                <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Cursos Pendientes</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#006FEE", margin: 5 }}>
                    {courseSummary.pending}
                </h3>
            </div>

            {/* Cursos Reprobados */}
            <div>
                <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Cursos Reprobados</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#F31260", margin: 5 }}>
                    {courseSummary.failed}
                </h3>
            </div>

            {/* Cursos Matriculados */}
            <div>
                <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Cursos Matriculados</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#990000", margin: 5 }}>
                    {courseSummary.enrolled}
                </h3>
            </div>

            {/* Información adicional del estudiante */}
            <div style={{ gridColumn: "span 4", marginTop: 15, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 15 }}>
                <div>
                    <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>ID Estudiante</p>
                    <h4 style={{ fontSize: 14, fontWeight: 400 }}>{student.id}</h4>
                </div>
                <div>
                    <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Nombre</p>
                    <h4 style={{ fontSize: 14, fontWeight: 400 }}>{student.name}</h4>
                </div>
                <div>
                    <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Créditos Plan de Estudios</p>
                    <h4 style={{ fontSize: 14, fontWeight: 400 }}>{student.totalCredits}</h4>
                </div>
                <div>
                    <p style={{ fontSize: 12, fontWeight: 400, color: "#555" }}>Documento de Identidad</p>
                    <h4 style={{ fontSize: 14, fontWeight: 400 }}>{student.document}</h4>
                </div>
            </div>
        </div>
    );
}
