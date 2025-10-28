import React, { useState, useEffect } from "react";
import { Home, User, Bell, ChevronLeft, FileText, Users, BarChart3, Settings } from "lucide-react";

// Mock Service
const DeanRequestService = {
    getAllRequests: () => [
        { id: 1, student: "Juan Pérez", type: "Cambio de grupo", date: "2025-10-20", status: "Pendiente" },
        { id: 2, student: "María López", type: "Extensión de plazo", date: "2025-10-18", status: "Aprobada" },
        { id: 3, student: "Carlos Díaz", type: "Revisión de nota", date: "2025-10-17", status: "Rechazada" },
        { id: 4, student: "Laura Torres", type: "Cambio de asignatura", date: "2025-10-21", status: "Pendiente" },
    ],
};

export default function DeanRequestsPage({ user, onNavigate, onLogout }) {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Todos");
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
    };

    useEffect(() => {
        const data = DeanRequestService.getAllRequests();
        setRequests(data);
    }, []);

    const handleOpenModal = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleStatusChange = (id, newStatus) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        handleCloseModal();
    };

    const filteredRequests = filterStatus === "Todos"
        ? requests
        : requests.filter(r => r.status === filterStatus);

    const pendingCount = requests.filter(r => r.status === "Pendiente").length;
    const approvedCount = requests.filter(r => r.status === "Aprobada").length;
    const rejectedCount = requests.filter(r => r.status === "Rechazada").length;

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

                <nav style={styles.navSection}>
                    <NavItem
                        icon={<Home size={18} />}
                        text="Inicio"
                        onClick={() => onNavigate && onNavigate("dashboard")}
                    />
                    <NavItem
                        icon={<FileText size={18} />}
                        text="Solicitudes"
                        active
                    />
                    <NavItem
                        icon={<Users size={18} />}
                        text="Estudiantes"
                        onClick={() => onNavigate && onNavigate("informacion-estudiantes")}
                    />
                    <NavItem
                        icon={<BarChart3 size={18} />}
                        text="Grupos"
                        onClick={() => onNavigate && onNavigate("monitor-grupos")}
                    />
                    <NavItem
                        icon={<Settings size={18} />}
                        text="Configuración"
                        onClick={() => onNavigate && onNavigate("configuracion")}
                    />
                </nav>

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
                        <button
                            style={styles.backButton}
                            onClick={() => onNavigate && onNavigate("dashboard")}
                            title="Volver"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span style={styles.headerTitle}>Julio Garavito · SIRHA</span>
                    </div>
                    <div style={styles.headerRight}>
                        <button
                            style={styles.iconButton}
                            onClick={() => onNavigate && onNavigate("gestionar-solicitudes")}
                            title="Solicitudes"
                        >
                            <FileText size={20} />
                        </button>
                        <button
                            style={styles.iconButton}
                            onClick={() => alert("Notificaciones - Próximamente")}
                            title="Notificaciones"
                        >
                            <Bell size={20} />
                        </button>
                        <button
                            style={styles.iconButton}
                            onClick={() => alert("Perfil - Próximamente")}
                            title="Perfil"
                        >
                            <User size={20} />
                        </button>
                        <button
                            style={styles.iconButton}
                            onClick={() => onNavigate && onNavigate("dashboard")}
                            title="Inicio"
                        >
                            <Home size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main style={styles.main}>
                    {/* Header con alerta */}
                    <div style={styles.alertBox}>
                        <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                        <span><strong>¡Atención!</strong> Tienes 2 solicitudes que vencen en menos de 24 horas.</span>
                    </div>

                    {/* Título */}
                    <div style={styles.titleSection}>
                        <h1 style={styles.pageTitle}>
                            <FileText size={32} style={{ marginRight: "12px" }} />
                            Gestión de Solicitudes
                        </h1>
                        <p style={styles.pageSubtitle}>
                            Aquí puedes revisar, aprobar o rechazar las solicitudes académicas pendientes.
                        </p>
                    </div>

                    {/* Estadísticas */}
                    <div style={styles.statsGrid}>
                        <StatCard title="Solicitudes Pendientes" value={pendingCount} color="#ffe0e0" />
                        <StatCard title="Solicitudes Hoy" value={approvedCount} color="#d8fdd8" />
                        <StatCard title="Grupos en Alerta" value={rejectedCount} color="#fff7cc" />
                    </div>

                    {/* Filtros */}
                    <div style={styles.filtersContainer}>
                        <FilterButton active={filterStatus === "Todos"} onClick={() => setFilterStatus("Todos")}>
                            Todos
                        </FilterButton>
                        <FilterButton active={filterStatus === "Pendiente"} onClick={() => setFilterStatus("Pendiente")}>
                            Pendientes
                        </FilterButton>
                        <FilterButton active={filterStatus === "Aprobada"} onClick={() => setFilterStatus("Aprobada")}>
                            Aprobadas
                        </FilterButton>
                        <FilterButton active={filterStatus === "Rechazada"} onClick={() => setFilterStatus("Rechazada")}>
                            Rechazadas
                        </FilterButton>
                    </div>

                    {/* Tabla */}
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.headerCell}>ID</th>
                                <th style={styles.headerCell}>Estudiante</th>
                                <th style={styles.headerCell}>Tipo</th>
                                <th style={styles.headerCell}>Fecha</th>
                                <th style={styles.headerCell}>Estado</th>
                                <th style={styles.headerCell}>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRequests.map((request, index) => (
                                <TableRow
                                    key={request.id}
                                    request={request}
                                    index={index}
                                    onOpenModal={handleOpenModal}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {selectedRequest && (
                <RequestModal
                    request={selectedRequest}
                    onClose={handleCloseModal}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
}

function NavItem({ icon, text, active, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.navItem,
                backgroundColor: active ? "rgba(255,255,255,0.2)" : isHovered ? "rgba(255,255,255,0.1)" : "transparent",
                cursor: onClick ? "pointer" : "default",
            }}
        >
            <span style={{ color: "#fff" }}>{icon}</span>
            <span style={styles.navText}>{text}</span>
        </div>
    );
}

function StatCard({ title, value, color }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.statCard,
                backgroundColor: color,
                transform: isHovered ? "translateY(-3px)" : "translateY(0)",
            }}
        >
            <h4 style={styles.statTitle}>{title}</h4>
            <p style={styles.statValue}>{value}</p>
        </div>
    );
}

function FilterButton({ children, active, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.filterButton,
                border: active ? "2px solid #990000" : "2px solid #ddd",
                backgroundColor: active ? "#990000" : "white",
                color: active ? "white" : "#555",
                fontWeight: active ? "600" : "500",
                borderColor: !active && isHovered ? "#990000" : active ? "#990000" : "#ddd",
            }}
        >
            {children}
        </button>
    );
}

function TableRow({ request, index, onOpenModal }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <tr
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.tableRow,
                backgroundColor: isHovered ? "#f0f0f0" : index % 2 === 0 ? "#fafafa" : "white",
            }}
        >
            <td style={styles.tableCell}>{request.id}</td>
            <td style={styles.tableCell}>{request.student}</td>
            <td style={styles.tableCell}>{request.type}</td>
            <td style={styles.tableCell}>{request.date}</td>
            <td style={styles.tableCell}>
                <StatusBadge status={request.status} />
            </td>
            <td style={styles.tableCell}>
                <button
                    onClick={() => onOpenModal(request)}
                    style={styles.detailButton}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}
                >
                    Ver Detalle
                </button>
            </td>
        </tr>
    );
}

function StatusBadge({ status }) {
    const colors = {
        Pendiente: { bg: "#fff3cd", text: "#856404" },
        Aprobada: { bg: "#d4edda", text: "#155724" },
        Rechazada: { bg: "#f8d7da", text: "#721c24" },
    };
    const style = colors[status] || colors.Pendiente;

    return (
        <span
            style={{
                ...styles.statusBadge,
                backgroundColor: style.bg,
                color: style.text,
            }}
        >
            {status}
        </span>
    );
}

function RequestModal({ request, onClose, onStatusChange }) {
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 style={styles.modalTitle}>Detalle de Solicitud</h2>
                <div style={styles.modalBody}>
                    <InfoRow label="ID:" value={request.id} />
                    <InfoRow label="Estudiante:" value={request.student} />
                    <InfoRow label="Tipo:" value={request.type} />
                    <InfoRow label="Fecha:" value={request.date} />
                    <InfoRow label="Estado:" value={<StatusBadge status={request.status} />} />
                </div>

                {request.status === "Pendiente" && (
                    <div style={styles.modalActions}>
                        <button
                            onClick={() => onStatusChange(request.id, "Aprobada")}
                            style={{ ...styles.actionButton, backgroundColor: "#28a745" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            ✓ Aprobar
                        </button>
                        <button
                            onClick={() => onStatusChange(request.id, "Rechazada")}
                            style={{ ...styles.actionButton, backgroundColor: "#dc3545" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            ✗ Rechazar
                        </button>
                    </div>
                )}

                <button onClick={onClose} style={styles.closeButton}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div style={styles.infoRow}>
            <strong style={styles.infoLabel}>{label}</strong>
            <span style={styles.infoValue}>{value}</span>
        </div>
    );
}

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
        gap: "20px",
        color: "#fff",
        position: "sticky",
        top: 0,
        height: "100vh",
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
    navSection: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 15px",
        borderRadius: "8px",
        transition: "all 0.2s",
    },
    navText: {
        fontSize: "14px",
        color: "#fff",
        fontWeight: "500",
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
        padding: "40px 50px",
        overflowY: "auto",
    },
    alertBox: {
        backgroundColor: "#fff3cd",
        color: "#856404",
        padding: "15px 25px",
        borderRadius: "12px",
        marginBottom: "30px",
        fontWeight: "500",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    titleSection: {
        marginBottom: "30px",
    },
    pageTitle: {
        color: "#990000",
        marginBottom: "8px",
        fontSize: "1.8rem",
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
    },
    pageSubtitle: {
        color: "#666",
        fontSize: "0.95rem",
        lineHeight: "1.5",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
    },
    statCard: {
        padding: "20px 25px",
        borderRadius: "14px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
        transition: "transform 0.2s",
    },
    statTitle: {
        color: "#555",
        fontSize: "0.9rem",
        marginBottom: "8px",
        fontWeight: "600",
    },
    statValue: {
        fontSize: "2rem",
        fontWeight: "700",
        color: "#333",
        margin: 0,
    },
    filtersContainer: {
        marginBottom: "25px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
    },
    filterButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s",
    },
    tableContainer: {
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        backgroundColor: "#990000",
        color: "white",
    },
    headerCell: {
        padding: "16px",
        textAlign: "left",
        fontWeight: "600",
        fontSize: "0.9rem",
    },
    tableRow: {
        transition: "background-color 0.2s",
    },
    tableCell: {
        padding: "16px",
        fontSize: "0.9rem",
        color: "#333",
    },
    detailButton: {
        backgroundColor: "#990000",
        color: "white",
        border: "none",
        padding: "8px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: "500",
        transition: "background-color 0.2s",
    },
    statusBadge: {
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "35px",
        maxWidth: "500px",
        width: "90%",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
    modalTitle: {
        color: "#990000",
        marginBottom: "20px",
        fontSize: "1.5rem",
        fontWeight: "600",
    },
    modalBody: {
        marginBottom: "20px",
    },
    infoRow: {
        display: "flex",
        marginBottom: "12px",
        alignItems: "center",
    },
    infoLabel: {
        minWidth: "120px",
        color: "#555",
        fontSize: "0.95rem",
    },
    infoValue: {
        color: "#333",
        fontSize: "0.95rem",
    },
    modalActions: {
        display: "flex",
        gap: "10px",
        marginTop: "25px",
    },
    actionButton: {
        flex: 1,
        padding: "12px",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: "600",
        transition: "opacity 0.2s",
    },
    closeButton: {
        marginTop: "15px",
        width: "100%",
        padding: "12px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: "500",
    },
};