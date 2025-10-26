import React, { useState } from "react";
import TopBar from "./TopBar";
import "./StudentRequests.css";

// ICONOS PERSONALIZADOS
import { CheckIcon, ClockIcon, CrossIcon, HourglassIcon, EyeIcon, DocumentIcon } from "./Icons";

// Colores pastel por estado
const STATUS_COLORS = {
    Pendiente: "#FFE5B4",
    "En Revisión": "#B4DDFE",
    Aprobada: "#B4FEC9",
    Rechazada: "#FEC1C1",
};

// Datos mock iniciales
const initialRequests = [
    {
        id: 1,
        type: "Cambio de grupo",
        status: "Pendiente",
        code: "REQ-2025-001",
        date: "2025-10-20",
        description: "Conflicto de horario con Matemáticas",
        origin: "Grupo A",
        destination: "Grupo B",
        observations: "",
        semester: "2025-1",
    },
    {
        id: 2,
        type: "Cambio de materia",
        status: "Aprobada",
        code: "REQ-2024-023",
        date: "2024-08-15",
        description: "Sugerencia de cambio de Física",
        origin: "Física I",
        destination: "Física II",
        observations: "",
        semester: "2024-2",
    },
];

export default function StudentRequests({ user, onLogout }) {
    const [requests, setRequests] = useState(initialRequests);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ type: "", origin: "", destination: "", observations: "" });
    const [filter, setFilter] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("");

    const today = new Date();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setForm({ type: "", origin: "", destination: "", observations: "" }) || setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.type || !form.origin || !form.destination) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        const newRequest = {
            id: requests.length + 1,
            type: form.type,
            status: "Pendiente",
            code: `REQ-${today.getFullYear()}-${String(requests.length + 1).padStart(3, "0")}`,
            date: today.toISOString().split("T")[0],
            description: form.description || "",
            origin: form.origin,
            destination: form.destination,
            observations: form.observations || "",
            semester: "2025-1",
        };

        setRequests([newRequest, ...requests]);
        handleCloseModal();
        alert("Tu solicitud ha sido enviada con éxito");
    };

    const filteredRequests = requests.filter(
        (r) =>
            (r.type.toLowerCase().includes(filter.toLowerCase()) ||
                r.status.toLowerCase().includes(filter.toLowerCase()) ||
                r.code.toLowerCase().includes(filter.toLowerCase())) &&
            (semesterFilter === "" || r.semester === semesterFilter)
    );

    const semesters = Array.from(new Set(requests.map(r => r.semester))).sort((a, b) => b.localeCompare(a));

    const summary = {
        total: requests.length,
        pendiente: requests.filter(r => r.status === "Pendiente").length,
        revision: requests.filter(r => r.status === "En Revisión").length,
        aprobada: requests.filter(r => r.status === "Aprobada").length,
        rechazada: requests.filter(r => r.status === "Rechazada").length,
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pendiente": return <HourglassIcon size={20} color="#FFA500" />;
            case "En Revisión": return <ClockIcon size={20} color="#1E90FF" />;
            case "Aprobada": return <CheckIcon size={20} color="#17C964" />;
            case "Rechazada": return <CrossIcon size={20} color="#F31260" />;
            default: return null;
        }
    };

    return (
        <div className="student-requests">
            <TopBar onLogout={onLogout} />

            <main className="requests-main">
                <h1>Mis Solicitudes Académicas</h1>

                <button className="btn-new-request" onClick={handleOpenModal}>
                    + Nueva Solicitud
                </button>

                {/* Filtros */}
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Buscar por tipo, estado o código..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)}>
                        <option value="">Todos los semestres</option>
                        {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Resumen */}
                <div className="summary-cards">
                    <SummaryCard title="Total Solicitudes" count={summary.total} icon={<DocumentIcon size={24} />} />
                    <SummaryCard title="Pendientes" count={summary.pendiente} color={STATUS_COLORS.Pendiente} icon={<HourglassIcon />} />
                    <SummaryCard title="En Revisión" count={summary.revision} color={STATUS_COLORS["En Revisión"]} icon={<ClockIcon />} />
                    <SummaryCard title="Aprobadas" count={summary.aprobada} color={STATUS_COLORS.Aprobada} icon={<CheckIcon />} />
                    <SummaryCard title="Rechazadas" count={summary.rechazada} color={STATUS_COLORS.Rechazada} icon={<CrossIcon />} />
                </div>

                {/* Lista de solicitudes */}
                <div className="requests-list">
                    {filteredRequests.map(r => (
                        <div key={r.id} className="request-card">
                            <div>
                                <p className="request-type">{r.type}</p>
                                <p>{r.description}</p>
                                <p className="request-info">Código: {r.code} | Fecha: {r.date} | Semestre: {r.semester}</p>
                                <p className="request-info">Origen: {r.origin} | Destino: {r.destination}</p>
                            </div>
                            <div className="request-actions">
                <span className="status-label" style={{ backgroundColor: STATUS_COLORS[r.status] }}>
                  {getStatusIcon(r.status)} {r.status}
                </span>
                                <button className="btn-view" onClick={() => alert(`Detalles de la solicitud ${r.code}`)}>
                                    <EyeIcon size={18} /> Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredRequests.length === 0 && <p>No se encontraron solicitudes.</p>}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Nueva Solicitud</h2>
                            <form onSubmit={handleSubmit}>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required>
                                    <option value="">Tipo de solicitud</option>
                                    <option value="Cambio de grupo">Cambio de grupo</option>
                                    <option value="Cambio de materia">Cambio de materia</option>
                                </select>
                                <input type="text" placeholder="Materia o grupo actual" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} required />
                                <input type="text" placeholder="Sugerencia de cambio" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required />
                                <textarea placeholder="Observaciones adicionales" value={form.observations} onChange={e => setForm({ ...form, observations: e.target.value })} />
                                <div className="modal-buttons">
                                    <button type="button" onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function SummaryCard({ title, count, color = "#333", icon }) {
    return (
        <div className="summary-card" style={{ color }}>
            {icon && <div className="summary-icon">{icon}</div>}
            <p>{title}</p>
            <p className="summary-count">{count}</p>
        </div>
    );
}
