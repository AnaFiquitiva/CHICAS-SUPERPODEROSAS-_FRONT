import React from "react";
import ModuleCard from "./ModuleCard";
import ProfileCard from "./ProfileCard";
import { ScheduleIcon, RequestsIcon, SemaphoreIcon, ManagementIcon } from "./Icons";
import logoEci from '../../assets/logo-eci.png';
import { getNameFromEmail } from "./utils";

export default function StudentDashboard({ user, onNavigate, onLogout }) {
    const studentName = getNameFromEmail(user.email);

    // Datos simulados del estudiante
    const mockStudent = {
        name: studentName,
        career: "Ingeniería de Sistemas",
        id: user.email.split("@")[0],
        notifications: [
            "Nueva solicitud aprobada",
            "Recordatorio: entregar proyecto final",
            "Cambio de horario de Matemáticas",
        ],
    };

    return (
        <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: 280,
                background: "#990000",
                padding: 25,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <div>
                    <img src={logoEci} alt="Logo ECI" style={{ width: 160, marginBottom: 25 }} />
                    <h2 style={{ fontFamily: "Work Sans", fontWeight: 600, fontSize: "1.5rem" }}>
                        Hola, {mockStudent.name}
                    </h2>
                </div>

                <button
                    onClick={onLogout}
                    style={{
                        marginTop: 20,
                        padding: "12px",
                        background: "#800000",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontFamily: "Work Sans",
                        borderRadius: "8px",
                    }}
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: 30, display: "flex", flexDirection: "column" }}>

                {/* Grid de módulos */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 20,
                    marginBottom: 30
                }}>
                    <ModuleCard
                        title="Horario"
                        description="Consultar horario de clases"
                        icon={<ScheduleIcon size={60} color="#990000" />}
                        onClick={() => onNavigate("horario")}
                    />
                    <ModuleCard
                        title="Solicitudes"
                        description="Gestionar solicitudes académicas"
                        icon={<RequestsIcon size={60} color="#990000" />}
                        onClick={() => onNavigate("solicitudes")}
                    />
                    <ModuleCard
                        title="Semáforo"
                        description="Visualizar estado académico"
                        icon={<SemaphoreIcon size={60} color="##990000" />}
                        onClick={() => onNavigate("semaforo")}
                    />
                    <ModuleCard
                        title="Gestión de grupos"
                        description="Administrar materias y profesores"
                        icon={<ManagementIcon size={60} color="#990000" />}
                        onClick={() => onNavigate("gestion-grupos")}
                    />
                </div>

                {/* Panel de perfil y notificaciones */}
                <ProfileCard student={mockStudent} notifications={mockStudent.notifications} />
            </div>
        </div>
    );
}
