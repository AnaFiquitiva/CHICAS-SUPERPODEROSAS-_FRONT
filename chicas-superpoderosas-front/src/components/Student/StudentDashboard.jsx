import React from "react";
import Sidebar from "./Sidebar";
import ProfileCard from "./ProfileCard";
import {
    ScheduleIcon,
    RequestsIcon,
    SemaphoreIcon,
    ManagementIcon,
} from "./Icons";

export default function StudentDashboard({ user, onNavigate, onLogout }) {
    const mockStudent = {
        name: user.name,
        career: "Ingeniería de Sistemas",
        notifications: [
            { text: "Nueva solicitud aprobada", link: "/student/solicitudes" },
            { text: "Recordatorio: entregar proyecto final", link: "/student/entregas" },
            { text: "Cambio de horario de Matemáticas", link: "/student/horario" },
        ],
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    const modules = [
        { title: "Horario", description: "Consulta tu horario de clases.", icon: <ScheduleIcon size={60} color="#990000" />, route: "horario" },
        { title: "Solicitudes", description: "Gestiona tus solicitudes académicas.", icon: <RequestsIcon size={60} color="#990000" />, route: "solicitudes" },
        { title: "Semáforo", description: "Monitorea tu estado académico.", icon: <SemaphoreIcon size={60} color="#990000" />, route: "semaforo" },
        { title: "Gestión de grupos", description: "Administra tus materias y profesores.", icon: <ManagementIcon size={60} color="#990000" />, route: "gestion-grupos" },
    ];

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar reutilizable */}
            <Sidebar user={user} onNavigate={onNavigate} onLogout={onLogout} />

            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "40px 60px",
                    backgroundColor: "#FAFAFA",
                }}
            >
                {/* Sección de módulos */}
                <section
                    style={{
                        flex: 2,
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
                        gridTemplateRows: "repeat(2, 220px)",
                        rowGap: 100,
                        columnGap: 60,
                        justifyItems: "center",
                        alignItems: "center",
                        alignContent: "center",
                        paddingRight: 30,
                    }}
                >
                    {modules.map((mod) => (
                        <ModuleCard
                            key={mod.title}
                            title={mod.title}
                            description={mod.description}
                            icon={mod.icon}
                            onClick={() => onNavigate(mod.route)}
                        />
                    ))}
                </section>

                {/* Perfil y notificaciones */}
                <aside style={{ flex: 1, maxWidth: 350 }}>
                    <ProfileCard
                        student={mockStudent}
                        notifications={mockStudent.notifications}
                        onNotificationClick={(link) => onNavigate(link)}
                    />
                </aside>
            </main>
        </div>
    );
}

function ModuleCard({ title, description, icon, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff",
                padding: "45px 25px",
                borderRadius: "18px",
                border: "1px solid #E0E0E0",
                boxShadow: "0 6px 10px rgba(0,0,0,0.05)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
                transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 10px 18px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 10px rgba(0,0,0,0.05)";
            }}
        >
            <div style={{ marginBottom: 15 }}>{icon}</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#100F0F", marginBottom: 6 }}>
                {title}
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#555", fontWeight: 400 }}>{description}</p>
        </div>
    );
}
