import React from "react";

export default function ProfileCard({ student, notifications }) {
    return (
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h3>Perfil</h3>
            <p><strong>Nombre:</strong> {student.name}</p>
            <p><strong>Carrera:</strong> {student.career}</p>
            <p><strong>ID:</strong> {student.id}</p>
            <h4>Notificaciones</h4>
            <ul>
                {notifications.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
        </div>
    );
}
