import React, { useState, useEffect } from "react";

// Mock Sidebar Component
function Sidebar({ user, onLogout }) {
    return (
        <aside
            style={{
                width: "200px",
                backgroundColor: "#8B0000",
                color: "white",
                padding: "30px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                height: "100vh",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <img
                    src="https://via.placeholder.com/80x80/fff/990000?text=ECIJG"
                    alt="Logo"
                    style={{ width: "80px", marginBottom: "10px" }}
                />
                <p style={{ fontSize: "0.75rem", lineHeight: "1.3" }}>
                    ESCUELA COLOMBIANA<br />DE INGENIERÍA<br />JULIO GARAVITO
                </p>
                <p style={{ fontSize: "0.7rem", marginTop: "5px", opacity: 0.9 }}>UNIVERSIDAD</p>
            </div>

            <div style={{ textAlign: "center", marginBottom: "30px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                <img
                    src={user.image}
                    alt="Usuario"
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                        border: "2px solid white",
                    }}
                />
                <h4 style={{ fontSize: "0.9rem", marginBottom: "3px" }}>{user.name}</h4>
                <p style={{ fontSize: "0.75rem", opacity: 0.9 }}>{user.career}</p>
            </div>

            <nav style={{ width: "100%", flex: 1 }}>
                <NavItem icon="🏠" text="Inicio" />
                <NavItem icon="👤" text="Perfil" />
                <NavItem icon="⚙️" text="Configuración" active />
            </nav>
        </aside>
    );
}

function NavItem({ icon, text, active }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 15px",
                marginBottom: "5px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => !active && (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <span>{icon}</span>
            <span style={{ fontSize: "0.85rem" }}>{text}</span>
        </div>
    );
}

// Mock Service
const DeanRequestService = {
    getAllRequests: () => [
        { id: 1, student: "Juan Pérez", type: "Cambio de grupo", date: "2025-10-20", status: "Pendiente" },
        { id: 2, student: "María López", type: "Extensión de plazo", date: "2025-10-18", status: "Aprobada" },
        { id: 3, student: "Carlos Díaz", type: "Revisión de nota", date: "2025-10-17", status: "Rechazada" },
        { id: 4, student: "Laura Torres", type: "Cambio de asignatura", date: "2025-10-21", status: "Pendiente" },
    ],
};

// Main Component
export default function DeanRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Todos");

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
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fffafc" }}>
            <Sidebar user={mockDean} />

            {/* Contenido principal */}
            <main style={{ flex: 1, padding: "40px 60px", maxWidth: "1400px" }}>
                {/* Header con alerta */}
                <div
                    style={{
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
                    }}
                >
                    <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                    <span><strong>¡Atención!</strong> Tienes 2 solicitudes que vencen en menos de 24 horas.</span>
                </div>

                {/* Título */}
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ color: "#990000", marginBottom: "8px", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>🗂️</span> Gestión de Solicitudes
                    </h1>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>
                        Aquí puedes revisar, aprobar o rechazar las solicitudes académicas pendientes.
                    </p>
                </div>

                {/* Estadísticas */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
                    <StatCard title="Solicitudes Pendientes" value={pendingCount} color="#ffe0e0" />
                    <StatCard title="Solicitudes Hoy" value={approvedCount} color="#d8fdd8" />
                    <StatCard title="Grupos en Alerta" value={rejectedCount} color="#fff7cc" />
                </div>

                {/* Filtros */}
                <div style={{ marginBottom: "25px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#990000", color: "white" }}>
                            <th style={headerStyle}>ID</th>
                            <th style={headerStyle}>Estudiante</th>
                            <th style={headerStyle}>Tipo</th>
                            <th style={headerStyle}>Fecha</th>
                            <th style={headerStyle}>Estado</th>
                            <th style={headerStyle}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr
                                key={request.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                                    transition: "background-color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "white")}
                            >
                                <td style={cellStyle}>{request.id}</td>
                                <td style={cellStyle}>{request.student}</td>
                                <td style={cellStyle}>{request.type}</td>
                                <td style={cellStyle}>{request.date}</td>
                                <td style={cellStyle}>
                                    <StatusBadge status={request.status} />
                                </td>
                                <td style={cellStyle}>
                                    <button
                                        onClick={() => handleOpenModal(request)}
                                        style={{
                                            backgroundColor: "#990000",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 20px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontSize: "0.85rem",
                                            fontWeight: "500",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}
                                    >
                                        Ver Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

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

function StatCard({ title, value, color }) {
    return (
        <div
            style={{
                backgroundColor: color,
                padding: "20px 25px",
                borderRadius: "14px",
                minWidth: "200px",
                flex: "1",
                boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
                transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
            <h4 style={{ color: "#555", fontSize: "0.9rem", marginBottom: "8px", fontWeight: "600" }}>{title}</h4>
            <p style={{ fontSize: "2rem", fontWeight: "700", color: "#333", margin: 0 }}>{value}</p>
        </div>
    );
}

function FilterButton({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: active ? "2px solid #990000" : "2px solid #ddd",
                backgroundColor: active ? "#990000" : "white",
                color: active ? "white" : "#555",
                cursor: "pointer",
                fontWeight: active ? "600" : "500",
                fontSize: "0.9rem",
                transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
                if (!active) {
                    e.currentTarget.style.borderColor = "#990000";
                    e.currentTarget.style.color = "#990000";
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    e.currentTarget.style.borderColor = "#ddd";
                    e.currentTarget.style.color = "#555";
                }
            }}
        >
            {children}
        </button>
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
                backgroundColor: style.bg,
                color: style.text,
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                display: "inline-block",
            }}
        >
            {status}
        </span>
    );
}

function RequestModal({ request, onClose, onStatusChange }) {
    return (
        <div
            style={{
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
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "35px",
                    maxWidth: "500px",
                    width: "90%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ color: "#990000", marginBottom: "20px" }}>Detalle de Solicitud</h2>
                <div style={{ marginBottom: "20px" }}>
                    <InfoRow label="ID:" value={request.id} />
                    <InfoRow label="Estudiante:" value={request.student} />
                    <InfoRow label="Tipo:" value={request.type} />
                    <InfoRow label="Fecha:" value={request.date} />
                    <InfoRow label="Estado:" value={<StatusBadge status={request.status} />} />
                </div>

                {request.status === "Pendiente" && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                        <button
                            onClick={() => onStatusChange(request.id, "Aprobada")}
                            style={actionButtonStyle("#28a745")}
                        >
                            ✓ Aprobar
                        </button>
                        <button
                            onClick={() => onStatusChange(request.id, "Rechazada")}
                            style={actionButtonStyle("#dc3545")}
                        >
                            ✗ Rechazar
                        </button>
                    </div>
                )}

                <button
                    onClick={onClose}
                    style={{
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
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}>
            <strong style={{ minWidth: "120px", color: "#555" }}>{label}</strong>
            <span style={{ color: "#333" }}>{value}</span>
        </div>
    );
}

const headerStyle = {
    padding: "16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.9rem",
};

const cellStyle = {
    padding: "16px",
    fontSize: "0.9rem",
    color: "#333",
};

const actionButtonStyle = (color) => ({
    flex: 1,
    padding: "12px",
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "opacity 0.2s",
});
