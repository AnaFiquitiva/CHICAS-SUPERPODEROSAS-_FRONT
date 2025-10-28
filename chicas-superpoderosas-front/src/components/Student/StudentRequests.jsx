import React, { useState } from "react";
import {
    DocumentIcon,
    EyeIcon,
    ClockIcon,
    CrossIcon,
    HourglassIcon,
} from "./Icons";
import "./StudentRequests.css";
import TopBar from "./TopBar";

const mockRequests = [
    {
        id: "RAD-000001",
        type: "Cambio de Grupo",
        subject: "Estructuras de Datos - Grupo 3",
        subjectCode: "ICOM-2045",
        requestDate: "15/10/24",
        deadline: "20/10/24",
        priority: "Alta",
        status: "Pendiente",
        description:
            "El estudiante solicita cambio de grupo debido a conflicto de horario con otra asignatura obligatoria.",
    },
    {
        id: "RAD-000002",
        type: "Cambio de Materia",
        subject: "Inteligencia Artificial",
        subjectCode: "ICOM-3050",
        requestDate: "18/10/24",
        deadline: "25/10/24",
        priority: "Media",
        status: "Tramitada",
        description:
            "Se solicita el cambio de materia por disponibilidad de horarios en el nuevo curso de Machine Learning.",
    },
    {
        id: "RAD-000003",
        type: "Validación de Materia",
        subject: "Cálculo Diferencial - Universidad X",
        subjectCode: "MATE-1001",
        requestDate: "20/10/24",
        deadline: "15/11/24",
        priority: "Baja",
        status: "Rechazada",
        description:
            "El estudiante busca validar la materia cursada en otra universidad. La solicitud fue rechazada por falta de equivalencia en los contenidos.",
    },
    {
        id: "RAD-000004",
        type: "Retiro de Materia",
        subject: "Física II",
        subjectCode: "FISI-2002",
        requestDate: "22/10/24",
        deadline: "27/10/24",
        priority: "Alta",
        status: "En Revisión",
        description:
            "El estudiante desea retirar la materia por motivos personales. La solicitud se encuentra en proceso de revisión.",
    },
];

const stats = [
    {
        label: "Total Solicitudes",
        value: 4,
        icon: <DocumentIcon size={28} color="#990000" />,
        color: "#990000",
    },
    {
        label: "En Revisión",
        value: "1 de 4",
        icon: <ClockIcon size={28} color="#3B82F6" />,
        color: "#3B82F6",
        percentage: "25%",
    },
    {
        label: "Pendientes",
        value: "1 de 4",
        icon: <HourglassIcon size={28} color="#F59E0B" />,
        color: "#F59E0B",
        percentage: "25%",
    },
    {
        label: "Rechazadas",
        value: "1 de 4",
        icon: <CrossIcon size={28} color="#EF4444" />,
        color: "#EF4444",
        percentage: "25%",
    },
];

export default function StudentRequests() {
    const [activeTab, setActiveTab] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("2024-2");
    const [selectedRequest, setSelectedRequest] = useState(null);

    const tabs = [
        { name: "Todas", count: 4 },
        { name: "Pendientes", count: 1 },
        { name: "En Revisión", count: 1 },
        { name: "Aprobadas", count: 1 },
        { name: "Rechazadas", count: 1 },
    ];

    const filteredRequests = mockRequests.filter((req) => {
        const matchesSearch =
            req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === "Todas") return matchesSearch;
        return matchesSearch && req.status === activeTab.slice(0, -1);
    });

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "Alta":
                return "priority-high";
            case "Media":
                return "priority-medium";
            case "Baja":
                return "priority-low";
            default:
                return "";
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pendiente":
                return "status-pending";
            case "Tramitada":
                return "status-approved";
            case "Rechazada":
                return "status-rejected";
            case "En Revisión":
                return "status-review";
            default:
                return "";
        }
    };

    return (
        <div className="requests-container">
            <TopBar />

            {/* Header */}
            <div className="requests-header">
                <div className="header-content">
                    <h1 className="header-title">Mis Solicitudes Académicas</h1>
                    <p className="header-subtitle">
                        Crea y gestiona tus solicitudes académicas
                    </p>
                </div>
                <button className="btn-new-request">+ Nueva Solicitud</button>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div
                            className="stat-icon"
                            style={{ backgroundColor: `${stat.color}15` }}
                        >
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">{stat.value}</div>
                            {stat.percentage && (
                                <div
                                    className="stat-percentage"
                                    style={{ color: stat.color }}
                                >
                                    {stat.percentage}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#666"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por radicado, tipo o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-controls">
                    <select
                        className="period-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="2024-2">2024-2</option>
                        <option value="2024-1">2024-1</option>
                        <option value="2023-2">2023-2</option>
                    </select>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`tab ${activeTab === tab.name ? "tab-active" : ""}`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.name} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="requests-table">
                    <thead>
                    <tr>
                        <th>Radicado</th>
                        <th>Tipo</th>
                        <th>Asunto</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((request) => (
                        <tr key={request.id}>
                            <td>
                                <div className="cell-with-icon">
                                    <DocumentIcon size={18} color="#666" />
                                    <span>{request.id}</span>
                                </div>
                            </td>
                            <td>{request.type}</td>
                            <td>
                                <div className="subject-cell">
                                    <div className="subject-name">{request.subject}</div>
                                    {request.subjectCode && (
                                        <div className="subject-code">
                                            {request.subjectCode}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>{request.requestDate}</td>
                            <td>{request.deadline}</td>
                            <td>
                                    <span
                                        className={`priority-badge ${getPriorityClass(
                                            request.priority
                                        )}`}
                                    >
                                        {request.priority}
                                    </span>
                            </td>
                            <td>
                                    <span
                                        className={`status-badge ${getStatusClass(
                                            request.status
                                        )}`}
                                    >
                                        {request.status}
                                    </span>
                            </td>
                            <td>
                                <button
                                    className="btn-view"
                                    onClick={() => setSelectedRequest(request)}
                                >
                                    <EyeIcon size={16} color="#666" /> Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 🧾 Panel de Detalle */}
            {selectedRequest && (
                <div className="request-panel-overlay">
                    <div className="request-panel">
                        <button
                            className="close-panel"
                            onClick={() => setSelectedRequest(null)}
                        >
                            ✕
                        </button>
                        <h2>Detalles de la Solicitud</h2>
                        <div className="request-detail">
                            <p><strong>Radicado:</strong> {selectedRequest.id}</p>
                            <p><strong>Tipo:</strong> {selectedRequest.type}</p>
                            <p><strong>Materia:</strong> {selectedRequest.subject}</p>
                            <p><strong>Código:</strong> {selectedRequest.subjectCode}</p>
                            <p><strong>Fecha de Solicitud:</strong> {selectedRequest.requestDate}</p>
                            <p><strong>Vencimiento:</strong> {selectedRequest.deadline}</p>
                            <p><strong>Prioridad:</strong> {selectedRequest.priority}</p>
                            <p><strong>Estado:</strong> {selectedRequest.status}</p>
                            <p><strong>Descripción:</strong> {selectedRequest.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
