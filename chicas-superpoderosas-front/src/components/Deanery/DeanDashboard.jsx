import React, { useState } from "react";
import { Home, User, Bell, ChevronLeft, FileText, Users, BarChart3, Settings } from "lucide-react";

export default function ImprovedDeanDashboard({ user, onNavigate, onLogout }) {
    const [notifications] = useState([
        { id: 1, text: "Nueva solicitud aprobada", read: false },
        { id: 2, text: "Recordatorio: entregar proyecto final", read: false },
        { id: 3, text: "Cambio de horario de Matemáticas", read: true }
    ]);

    const mockDean = {
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

    const handleCardClick = (module) => {
        if (onNavigate) {
            onNavigate(module);
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Panel - Panel del Decano */}
            <aside style={styles.leftPanel}>
                <div style={styles.logoSection}>
                    <div style={styles.logoBox}>
                        <span style={styles.logoText}>ESCUELA</span>
                        <span style={styles.logoText}>COLOMBIANA</span>
                        <span style={styles.logoText}>DE INGENIERÍA</span>
                        <span style={styles.logoSubtext}>JULIO GARAVITO</span>
                    </div>
                    <div style={styles.universityLabel}>UNIVERSIDAD</div>
                </div>

                <div style={styles.profileSection}>
                    <img
                        src={mockDean.image}
                        alt="Avatar"
                        style={styles.avatar}
                    />
                    <h3 style={styles.userName}>{mockDean.name}</h3>
                    <p style={styles.userRole}>{mockDean.career}</p>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.notificationsSection}>
                    <div style={styles.notificationsHeader}>
                        <Bell size={16} color="#fff" />
                        <span style={styles.notificationsTitle}>Notificaciones</span>
                    </div>
                    <div style={styles.notificationsList}>
                        {notifications.map((notif) => (
                            <div key={notif.id} style={styles.notificationItem}>
                                <span style={styles.notificationText}>{notif.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div style={styles.contentWrapper}>
                {/* Header */}
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button style={styles.backButton}>
                            <ChevronLeft size={20} />
                        </button>
                        <span style={styles.headerTitle}>Julio Garavito · SIRHA</span>
                    </div>
                    <div style={styles.headerRight}>
                        <button style={styles.iconButton}>
                            <FileText size={20} />
                        </button>
                        <button style={styles.iconButton}>
                            <Bell size={20} />
                        </button>
                        <button style={styles.iconButton}>
                            <User size={20} />
                        </button>
                        <button style={styles.iconButton}>
                            <Home size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main style={styles.main}>
                    {/* Tarjetas principales grandes - Estilo SIRHA */}
                    <section style={styles.bigCardsGrid}>
                        <BigCard
                            icon={<FileText size={48} />}
                            title="Gestión de Solicitudes"
                            description="Revisa, aprueba o rechaza las solicitudes académicas pendientes."
                            onClick={() => handleCardClick("gestionar-solicitudes")}
                        />
                        <BigCard
                            icon={<Users size={48} />}
                            title="Información Estudiantes"
                            description="Consulta los datos y progreso de los estudiantes."
                            onClick={() => handleCardClick("informacion-estudiantes")}
                        />
                        <BigCard
                            icon={<BarChart3 size={48} />}
                            title="Gestión de Grupos"
                            description="Administra los grupos académicos y monitorea su estado."
                            onClick={() => handleCardClick("monitor-grupos")}
                        />
                        <BigCard
                            icon={<Settings size={48} />}
                            title="Configuración"
                            description="Ajustes generales del sistema académico."
                            onClick={() => handleCardClick("configuracion")}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
}

/* Tarjeta grande principal - Estilo SIRHA */
function BigCard({ icon, title, description, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.bigCard,
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                boxShadow: isHovered
                    ? "0 10px 25px rgba(0,0,0,0.15)"
                    : "0 3px 10px rgba(0,0,0,0.08)",
            }}
        >
            <div style={styles.cardIconWrapper}>{icon}</div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardDescription}>{description}</p>
        </div>
    );
}

/* Styles */
const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
    },
    leftPanel: {
        width: "260px",
        backgroundColor: "#8B0000",
        padding: "30px 20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        color: "#fff",
    },
    logoSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "10px",
    },
    logoBox: {
        border: "2px solid #fff",
        padding: "15px 10px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        marginBottom: "8px",
        width: "100%",
    },
    logoText: {
        fontSize: "11px",
        fontWeight: "700",
        color: "#fff",
        letterSpacing: "0.5px",
        textAlign: "center",
    },
    logoSubtext: {
        fontSize: "9px",
        fontWeight: "600",
        color: "#fff",
        letterSpacing: "0.3px",
        marginTop: "4px",
        textAlign: "center",
    },
    universityLabel: {
        fontSize: "10px",
        fontWeight: "600",
        color: "#fff",
        letterSpacing: "1px",
        textAlign: "center",
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        marginBottom: "12px",
        border: "3px solid #fff",
        backgroundColor: "#fff",
    },
    userName: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#fff",
        marginBottom: "4px",
        textAlign: "center",
        lineHeight: "1.3",
    },
    userRole: {
        fontSize: "13px",
        color: "#ffcccc",
        textAlign: "center",
        lineHeight: "1.3",
    },
    divider: {
        height: "1px",
        backgroundColor: "rgba(255,255,255,0.3)",
        margin: "5px 0",
    },
    notificationsSection: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    notificationsHeader: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "4px",
    },
    notificationsTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#fff",
    },
    notificationsList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    notificationItem: {
        padding: "10px 12px",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: "8px",
        borderLeft: "3px solid #fff",
    },
    notificationText: {
        fontSize: "12px",
        color: "#fff",
        lineHeight: "1.4",
    },
    contentWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    header: {
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e5e5",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    backButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "8px",
        color: "#990000",
        borderRadius: "6px",
        transition: "background-color 0.2s",
    },
    headerTitle: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#333",
    },
    headerRight: {
        display: "flex",
        gap: "8px",
    },
    iconButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#990000",
        transition: "background-color 0.2s",
    },
    main: {
        flex: 1,
        padding: "50px 40px",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    bigCardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "30px",
        maxWidth: "1000px",
        width: "100%",
    },
    bigCard: {
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "40px 30px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: "1px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "240px",
        justifyContent: "center",
    },
    cardIconWrapper: {
        color: "#990000",
        marginBottom: "20px",
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: "12px",
        lineHeight: "1.3",
    },
    cardDescription: {
        fontSize: "14px",
        color: "#666",
        lineHeight: "1.6",
        maxWidth: "280px",
    },
};