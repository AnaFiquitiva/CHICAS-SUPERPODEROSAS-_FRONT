import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Student/Sidebar";

export default function DeanDashboard({ dean, onNavigate, onLogout }) {
    const navigate = useNavigate();

    const mockDean = dean || {
        name: "Dr. Carlos Rodríguez",
        role: "Coordinador Académico",
        career: "Ingeniería de Sistemas",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        alerts: 2,
        pendingRequests: 8,
        requestsToday: 3,
        groupsInAlert: 2,
        avgTime: 2.5,
    };

    const handleCardClick = (title) => {
        switch (title) {
            case "🗂️ Gestión de Solicitudes":
                navigate("/dean/requests");
                break;
            case "👥 Información Estudiantes":
                navigate("/dean/students"); // ✅ Ya funcional
                break;
            case "📊 Gestión de Grupos":
                navigate("/dean/groups");
                break;
            case "⚙️ Configuración":
                navigate("/dean/settings");
                break;
            default:
                break;
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar lateral */}
            <Sidebar user={mockDean} onNavigate={onNavigate} onLogout={onLogout} />

            {/* Contenido principal */}
            <main style={styles.main}>
                {/* Alerta superior */}
                <div style={styles.alertBox}>
                    ⚠️ <strong>¡Atención!</strong> Tienes {mockDean.alerts} solicitudes que vencen en menos de 24 horas.
                </div>

                {/* Tarjetas pequeñas */}
                <section style={styles.tinyCardsSection}>
                    <TinyDashboardCard title="Solicitudes Pendientes" value={mockDean.pendingRequests} color="#ffe0e0" />
                    <TinyDashboardCard title="Solicitudes Hoy" value={mockDean.requestsToday} color="#d8fdd8" />
                    <TinyDashboardCard title="Grupos en Alerta" value={mockDean.groupsInAlert} color="#fff7cc" />
                    <TinyDashboardCard title="Tiempo Promedio" value={`${mockDean.avgTime} días`} color="#e5dcff" />
                </section>

                {/* Tarjetas grandes con navegación */}
                <section style={styles.bigCardsSection}>
                    <BigDashboardCard
                        title="🗂️ Gestión de Solicitudes"
                        description="Revisa, aprueba o rechaza las solicitudes académicas pendientes."
                        color="#fff0f0"
                        onClick={() => handleCardClick("🗂️ Gestión de Solicitudes")}
                    />
                    <BigDashboardCard
                        title="👥 Información Estudiantes"
                        description="Consulta los datos y progreso de los estudiantes."
                        color="#f7f7ff"
                        onClick={() => handleCardClick("👥 Información Estudiantes")}
                    />
                    <BigDashboardCard
                        title="📊 Gestión de Grupos"
                        description="Administra los grupos académicos y monitorea su estado."
                        color="#fdf4e3"
                        onClick={() => handleCardClick("📊 Gestión de Grupos")}
                    />
                    <BigDashboardCard
                        title="⚙️ Configuración"
                        description="Ajustes generales del sistema académico."
                        color="#fdfbe8"
                        onClick={() => handleCardClick("⚙️ Configuración")}
                    />
                </section>
            </main>

            {/* Panel lateral derecho */}
            <aside style={styles.rightPanel}>
                <img
                    src={mockDean.image}
                    alt="Dean Avatar"
                    style={styles.deanAvatar}
                />
                <h3 style={styles.deanName}>{mockDean.name}</h3>
                <p style={styles.deanRole}>{mockDean.role}</p>
                <p style={styles.deanCareer}>{mockDean.career}</p>
            </aside>
        </div>
    );
}

/* === Estilos centralizados === */
const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fffafc",
        overflow: "hidden",
    },
    main: {
        flex: 1,
        padding: "40px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    alertBox: {
        backgroundColor: "#fff3cd",
        color: "#856404",
        padding: "15px 25px",
        borderRadius: "12px",
        marginBottom: "25px",
        fontWeight: "500",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "1100px",
        textAlign: "center",
    },
    tinyCardsSection: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "40px",
        width: "100%",
        maxWidth: "1100px",
    },
    bigCardsSection: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        width: "100%",
        maxWidth: "1100px",
    },
    rightPanel: {
        width: "280px",
        backgroundColor: "#fff",
        borderLeft: "1px solid #eee",
        padding: "40px 25px",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "sticky",
        top: "0",
    },
    deanAvatar: {
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        marginBottom: "15px",
        border: "3px solid #990000",
    },
    deanName: {
        marginBottom: "5px",
        color: "#990000",
        textAlign: "center",
    },
    deanRole: {
        color: "#555",
        marginBottom: "5px",
        textAlign: "center",
    },
    deanCareer: {
        color: "#777",
        fontSize: "0.9rem",
        textAlign: "center",
    },
};

/* === Tarjetas pequeñas === */
function TinyDashboardCard({ title, value, color }) {
    return (
        <div
            style={{
                backgroundColor: color,
                padding: "15px 20px",
                borderRadius: "14px",
                textAlign: "center",
                boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
                minWidth: "220px",
                flex: "1",
                transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
            <h4 style={{ color: "#333", fontSize: "1rem", marginBottom: "6px", fontWeight: "600" }}>{title}</h4>
            <p style={{ fontSize: "1.6rem", fontWeight: "700", color: "#000" }}>{value}</p>
        </div>
    );
}

/* === Tarjetas grandes === */
function BigDashboardCard({ title, description, color, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: color,
                borderRadius: "18px",
                padding: "30px 25px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
            }}
        >
            <h3 style={{ color: "#990000", marginBottom: "10px" }}>{title}</h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>{description}</p>
        </div>
    );
}
