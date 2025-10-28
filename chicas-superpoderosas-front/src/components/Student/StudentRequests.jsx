import React, { useState } from "react";
import "./StudentRequests.css";
import TopBar from "./TopBar";
import {
    CheckIcon,
    ClockIcon,
    HourglassIcon,
    CrossIcon,
    DocumentIcon,
} from "./Icons";

const StudentRequests = () => {
    const [filter, setFilter] = useState("Todas");
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [requests, setRequests] = useState([
        {
            id: "RAD-000001",
            type: "Cambio de Grupo",
            description:
                "Solicito cambio de grupo debido a conflicto de horarios con otra materia inscrita.",
            observations: "El coordinador aprobó el cambio solicitado.",
            date: "15/10/24",
            status: "Aprobada",
        },
        {
            id: "RAD-000002",
            type: "Cambio de Materia",
            description:
                "Solicito cambio de materia electiva por disponibilidad de cupos.",
            observations: "Pendiente de revisión por parte del área académica.",
            date: "18/10/24",
            status: "Pendiente",
        },
        {
            id: "RAD-000003",
            type: "Validación de Materia",
            description: "Solicito validación de materia cursada en otra institución.",
            observations: "Rechazada por falta de soporte documental.",
            date: "10/10/24",
            status: "Rechazada",
        },
        {
            id: "RAD-000004",
            type: "Retiro de Materia",
            description: "Solicito retiro de materia por motivos personales de salud.",
            observations: "En proceso de revisión médica.",
            date: "22/10/24",
            status: "En Revisión",
        },
    ]);

    const filteredRequests =
        filter === "Todas" ? requests : requests.filter((r) => r.status === filter);

    const counts = {
        total: requests.length,
        aprobadas: requests.filter((r) => r.status === "Aprobada").length,
        pendientes: requests.filter((r) => r.status === "Pendiente").length,
        rechazadas: requests.filter((r) => r.status === "Rechazada").length,
        revision: requests.filter((r) => r.status === "En Revisión").length,
    };

    const handleNewRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const newReq = {
            id: `RAD-${(requests.length + 1).toString().padStart(6, "0")}`,
            type: form.type.value,
            description: form.description.value,
            observations: form.observations.value,
            date: new Date().toLocaleDateString("es-CO"),
            status: "Pendiente",
        };
        setRequests([newReq, ...requests]);
        setShowForm(false);
        alert("✅ Solicitud creada correctamente");
    };

    return (
        <>
            <TopBar />

            <div className="requests-container">
                <div className="requests-header">
                    <div>
                        <h2>Mis Solicitudes Académicas</h2>
                        <p>Crea y gestiona tus solicitudes académicas</p>
                    </div>
                    <button className="btn-new" onClick={() => setShowForm(true)}>
                        + Nueva Solicitud
                    </button>
                </div>

                {/* === Cards resumen === */}
                <div className="requests-cards">
                    <div className="card">
                        <div className="card-icon total">
                            <DocumentIcon size={32} color="#003876" />
                        </div>
                        <p>Total Solicitudes</p>
                        <h3>{counts.total}</h3>
                    </div>

                    <div className="card">
                        <div className="card-icon revision">
                            <ClockIcon size={32} color="#0072f5" />
                        </div>
                        <p>En Revisión</p>
                        <h3>
                            {counts.revision} de {counts.total}
                        </h3>
                    </div>

                    <div className="card">
                        <div className="card-icon pendiente">
                            <HourglassIcon size={32} color="#ffa500" />
                        </div>
                        <p>Pendientes</p>
                        <h3>
                            {counts.pendientes} de {counts.total}
                        </h3>
                    </div>

                    <div className="card">
                        <div className="card-icon rechazada">
                            <CrossIcon size={32} color="#ff4c4c" />
                        </div>
                        <p>Rechazadas</p>
                        <h3>
                            {counts.rechazadas} de {counts.total}
                        </h3>
                    </div>
                </div>

                {/* === Tabs === */}
                <div className="requests-tabs">
                    {["Todas", "Pendiente", "En Revisión", "Aprobada", "Rechazada"].map(
                        (tab) => (
                            <button
                                key={tab}
                                className={`tab ${filter === tab ? "active" : ""}`}
                                onClick={() => setFilter(tab)}
                            >
                                {tab === "Todas"
                                    ? `Todas (${counts.total})`
                                    : `${tab}s (${
                                        requests.filter((r) => r.status === tab).length
                                    })`}
                            </button>
                        )
                    )}
                </div>

                {/* === Tabla de solicitudes === */}
                <table className="requests-table">
                    <thead>
                    <tr>
                        <th>N° Radicado</th>
                        <th>Tipo de Solicitud</th>
                        <th>Descripción</th>
                        <th>Observaciones</th>
                        <th>Fecha Creación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((req) => (
                        <tr key={req.id}>
                            <td>
                                <span className="radicado">{req.id}</span>
                            </td>
                            <td>{req.type}</td>
                            <td>{req.description}</td>
                            <td>{req.observations}</td>
                            <td>{req.date}</td>
                            <td>
                                    <span
                                        className={`status ${req.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {req.status}
                                    </span>
                            </td>
                            <td>
                                <button
                                    className="details-btn"
                                    onClick={() => setShowDetails(req)}
                                >
                                    👁 Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* === Modal Nueva Solicitud === */}
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Nueva Solicitud Académica</h3>
                        <form onSubmit={handleNewRequest}>
                            <label>Tipo de Solicitud</label>
                            <select name="type" required>
                                <option value="">Seleccionar...</option>
                                <option value="Cambio de Grupo">Cambio de Grupo</option>
                                <option value="Cambio de Materia">Cambio de Materia</option>
                                <option value="Retiro de Materia">Retiro de Materia</option>
                                <option value="Validación de Materia">
                                    Validación de Materia
                                </option>
                            </select>

                            <label>Descripción</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder="Describe brevemente el motivo..."
                                required
                            ></textarea>

                            <label>Observaciones</label>
                            <textarea
                                name="observations"
                                rows="2"
                                placeholder="Añade observaciones adicionales (opcional)"
                            ></textarea>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="cancel-btn"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* === Modal Detalles === */}
            {showDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Detalles de la Solicitud</h3>
                        <p><b>N° Radicado:</b> {showDetails.id}</p>
                        <p><b>Tipo:</b> {showDetails.type}</p>
                        <p><b>Descripción:</b> {showDetails.description}</p>
                        <p><b>Observaciones:</b> {showDetails.observations}</p>
                        <p><b>Estado:</b> {showDetails.status}</p>
                        <p><b>Fecha de Creación:</b> {showDetails.date}</p>
                        <div className="modal-actions">
                            <button
                                onClick={() => setShowDetails(null)}
                                className="btn-primary"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentRequests;
