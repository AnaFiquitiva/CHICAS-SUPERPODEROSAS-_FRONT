import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { getNameFromEmail } from "../Student/utils";

// Datos mock del horario
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = [
    "07:00 AM", "08:30 AM", "10:00 AM", "11:30 AM",
    "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"
];
const mockClasses = [
    { id: 1, subject: "Matemáticas", day: "Lunes", start: "07:00 AM", end: "08:30 AM", classroom: "A101" },
    { id: 2, subject: "Física", day: "Martes", start: "10:00 AM", end: "11:30 AM", classroom: "B203" },
    { id: 3, subject: "Programación", day: "Miércoles", start: "1:00 PM", end: "2:30 PM", classroom: "C105" },
    { id: 4, subject: "Química", day: "Jueves", start: "4:00 PM", end: "5:30 PM", classroom: "D202" },
    { id: 5, subject: "Inglés", day: "Viernes", start: "07:00 AM", end: "08:30 AM", classroom: "E101" },
    { id: 6, subject: "Historia", day: "Sábado", start: "10:00 AM", end: "11:30 AM", classroom: "F303" },
];

export default function StudentSchedule({ user, onNavigate, onLogout }) {
    const [classes, setClasses] = useState(mockClasses);
    const [loading, setLoading] = useState(false);

    const studentName = getNameFromEmail(user.email);
    const mockStudent = {
        name: studentName,
        career: "Ingeniería de Sistemas",
        id: user.email.split("@")[0],
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    const getClassForSlot = (day, hour) => classes.find(c => c.day === day && c.start === hour);

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F8F8" }}>
            {/* Sidebar reutilizable */}
            <Sidebar user={user} onNavigate={onNavigate} onLogout={onLogout} />

            {/* Contenido principal del horario */}
            <main style={{ flex: 1, padding: "40px 60px", backgroundColor: "#FAFAFA" }}>
                <h1 style={{ color: "#990000", textAlign: "center", marginBottom: 30 }}>
                    Horario del Estudiante
                </h1>

                {loading && <p style={{ textAlign: "center" }}>Cargando horario...</p>}

                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${days.length + 1}, 1fr)`,
                    gap: 5,
                    marginTop: 20,
                }}>
                    <div></div>
                    {days.map(day => (
                        <div key={day} style={{ fontWeight: 600, textAlign: "center" }}>{day}</div>
                    ))}

                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div style={{ fontWeight: 500, textAlign: "center" }}>{hour}</div>
                            {days.map(day => {
                                const cls = getClassForSlot(day, hour);
                                return (
                                    <div
                                        key={`${day}-${hour}`}
                                        style={{
                                            minHeight: 60,
                                            border: "1px solid #ccc",
                                            backgroundColor: cls ? "#FEE2E2" : "#F5F5F5",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "0.85rem",
                                            padding: 5,
                                            borderRadius: 6,
                                            textAlign: "center",
                                        }}
                                    >
                                        {cls ? (
                                            <>
                                                <strong>{cls.subject}</strong>
                                                <span>{cls.start} - {cls.end}</span>
                                                <span>{cls.classroom}</span>
                                            </>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    );
}
