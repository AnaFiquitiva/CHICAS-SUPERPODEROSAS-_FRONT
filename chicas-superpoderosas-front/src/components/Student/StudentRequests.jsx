import React, { useState } from "react";
import Sidebar from "./Sidebar";

// Colores por estado
const STATUS_COLORS = {
    Pendiente: "#FFD166",
    "En Revisión": "#F4A261",
    Aprobada: "#17C964",
    Rechazada: "#F31260",
};

// Fechas habilitadas para solicitudes (mock)
const startDate = new Date("2025-10-01");
const endDate = new Date("2025-11-30");

// Materias canceladas (mock)
const cancelledSubjects = ["Historia", "Inglés"];

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

export default function StudentRequests({ user, onNavigate, onLogout }) {
    const [requests, setRequests] = useState(initialRequests);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        type: "",
        origin: "",
        destination: "",
        observations: "",
    });
    const [filter, setFilter] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("");

    const today = new Date();

    const handleOpenModal = () => {
        if (today < startDate || today > endDate) {
            alert("No es posible generar solicitudes fuera del periodo habilitado.");
            return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setForm({ type: "", origin: "", destination: "", observations: "" });
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.type || !form.origin || !form.destination) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }
        if (cancelledSubjects.includes(form.origin)) {
            alert("No puedes generar solicitud para una materia cancelada.");
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
            semester: "2025-1", // se puede ajustar dinámicamente según el semestre actual
        };

        setRequests([newRequest, ...requests]);
        handleCloseModal();
        alert("Tu solicitud ha sido enviada con éxito");
    };

    // Filtro por palabra clave y semestre
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

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
            <Sidebar user={user} onNavigate={onNavigate} onLogout={onLogout} />

            <main style={{ flex: 1, padding: "40px 60px" }}>
                <h1 style={{ color: "#990000", marginBottom: 20 }}>Mis Solicitudes Académicas</h1>

                <button
                    onClick={handleOpenModal}
                    style={{
                        backgroundColor: "#990000",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                        marginBottom: 20,
                    }}
                >
                    + Nueva Solicitud
                </button>

                {/* Filtros */}
                <div style={{ display: "flex", gap: 15, marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder="Buscar por tipo, estado o código..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", flex: 2 }}
                    />
                    <select
                        value={semesterFilter}
                        onChange={(e) => setSemesterFilter(e.target.value)}
                        style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", flex: 1 }}
                    >
                        <option value="">Todos los semestres</option>
                        {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Resumen */}
                <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                    <SummaryCard title="Total Solicitudes" count={summary.total} color="#100F0F" />
                    <SummaryCard title="Pendientes" count={summary.pendiente} color={STATUS_COLORS.Pendiente} />
                    <SummaryCard title="En Revisión" count={summary.revision} color={STATUS_COLORS["En Revisión"]} />
                    <SummaryCard title="Aprobadas" count={summary.aprobada} color={STATUS_COLORS.Aprobada} />
                    <SummaryCard title="Rechazadas" count={summary.rechazada} color={STATUS_COLORS.Rechazada} />
                </div>

                {/* Lista de solicitudes */}
                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                    {filteredRequests.map(r => (
                        <div key={r.id} style={{ background: "#fff", padding: 15, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <p><strong>{r.type}</strong> - {r.description}</p>
                                <p>Código: {r.code} | Fecha: {r.date} | Semestre: {r.semester}</p>
                                <p>Origen: {r.origin} | Destino: {r.destination}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <span style={{ backgroundColor: STATUS_COLORS[r.status], padding: "4px 10px", borderRadius: 6, fontWeight: 600 }}>
                                    {r.status}
                                </span>
                                <br />
                                <button
                                    style={{ marginTop: 8, backgroundColor: "#990000", color: "white", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer" }}
                                    onClick={() => alert(`Detalles de la solicitud ${r.code}`)}
                                >
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredRequests.length === 0 && <p>No se encontraron solicitudes.</p>}
                </div>

                {/* Modal para nueva solicitud */}
                {showModal && (
                    <div style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{ background: "#fff", padding: 30, borderRadius: 8, width: 400 }}>
                            <h2 style={{ marginBottom: 15 }}>Nueva Solicitud</h2>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required>
                                    <option value="">Tipo de solicitud</option>
                                    <option value="Cambio de grupo">Cambio de grupo</option>
                                    <option value="Cambio de materia">Cambio de materia</option>
                                </select>
                                <input type="text" placeholder="Materia o grupo actual" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} required />
                                <input type="text" placeholder="Sugerencia de cambio" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required />
                                <textarea placeholder="Observaciones adicionales" value={form.observations} onChange={e => setForm({ ...form, observations: e.target.value })} />
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                                    <button type="button" onClick={handleCloseModal} style={{ padding: "6px 12px", borderRadius: 6 }}>Cancelar</button>
                                    <button type="submit" style={{ backgroundColor: "#990000", color: "white", border: "none", padding: "6px 12px", borderRadius: 6 }}>Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function SummaryCard({ title, count, color }) {
    return (
        <div style={{
            flex: 1,
            background: "#fff",
            padding: 15,
            borderRadius: 8,
            textAlign: "center",
            fontWeight: 600,
            color,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}>
            <p>{title}</p>
            <p style={{ fontSize: "1.5rem", marginTop: 5 }}>{count}</p>
        </div>
    );
}
