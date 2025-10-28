// StudentGroupManagement.jsx
import { useState } from "react";
import { Search, Users, BookOpen, User, CheckCircle2, Circle, ShoppingCart, ChevronDown } from "lucide-react";
import TopBar from "./TopBar";
import './StudentGroupManagement.css';

// Datos de ejemplo basados en la imagen
const materiasData = [
    {
        id: "1",
        codigo: "IMAT-101",
        nombre: "Cálculo Diferencial",
        descripcion: "Límites, derivadas y aplicaciones",
        creditos: 4,
        semestre: 1,
        estado: "Activa",
        color: "#4ADE80",
        inscrita: true,
        grupoInscrito: "G01",
        grupos: [
            { id: "g1", codigo: "G01", horario: "7:00-9:00", cupos: 35, cuposDisponibles: 5, docente: "Prof. García", aula: "G-310-SIST", dias: "Lun-Mie" },
            { id: "g2", codigo: "G02", horario: "14:00-16:00", cupos: 35, cuposDisponibles: 0, docente: "Prof. Rodríguez", aula: "C3-206", dias: "Mar-Jue" }
        ]
    },
    {
        id: "2",
        codigo: "ISOF-102",
        nombre: "Programación I",
        descripcion: "Fundamentos de programación y algoritmos",
        creditos: 3,
        semestre: 1,
        estado: "Activa",
        color: "#A78BFA",
        inscrita: true,
        grupoInscrito: "G02",
        grupos: [
            { id: "g4", codigo: "G01", horario: "9:00-11:00", cupos: 30, cuposDisponibles: 3, docente: "Prof. López", aula: "D-211", dias: "Mar-Jue" },
            { id: "g5", codigo: "G02", horario: "14:00-16:00", cupos: 30, cuposDisponibles: 8, docente: "Prof. Martínez", aula: "B1-ABICO", dias: "Lun-Mie" }
        ]
    },
    {
        id: "3",
        codigo: "IELE-201",
        nombre: "Circuitos Eléctricos",
        descripcion: "Análisis de circuitos básicos",
        creditos: 4,
        semestre: 2,
        estado: "Activa",
        color: "#60A5FA",
        inscrita: true,
        grupoInscrito: "G01",
        grupos: [
            { id: "g6", codigo: "G01", horario: "10:00-12:00", cupos: 25, cuposDisponibles: 2, docente: "Prof. Vargas", aula: "F-104", dias: "Lun-Mie" },
            { id: "g7", codigo: "G02", horario: "16:00-18:00", cupos: 25, cuposDisponibles: 7, docente: "Prof. Gómez", aula: "C3-205", dias: "Mar-Jue" }
        ]
    },
    {
        id: "4",
        codigo: "IIND-301",
        nombre: "Investigación de Operaciones",
        descripcion: "Métodos cuantitativos para la toma de decisiones",
        creditos: 3,
        semestre: 3,
        estado: "Activa",
        color: "#FBBF24",
        inscrita: false,
        grupos: [
            { id: "g8", codigo: "G01", horario: "14:00-17:00", cupos: 40, cuposDisponibles: 15, docente: "Prof. Ramírez", aula: "H-301", dias: "Vie" }
        ]
    },
    {
        id: "5",
        codigo: "ICIV-205",
        nombre: "Mecánica de Fluidos",
        descripcion: "Estudio de fluidos en reposo y movimiento",
        creditos: 4,
        semestre: 2,
        estado: "Activa",
        color: "#22D3EE",
        inscrita: false,
        grupos: [
            { id: "g9", codigo: "G01", horario: "8:00-10:00", cupos: 30, cuposDisponibles: 4, docente: "Prof. Torres", aula: "L-102", dias: "Lun-Mie" },
            { id: "g10", codigo: "G02", horario: "10:00-12:00", cupos: 30, cuposDisponibles: 10, docente: "Prof. Castro", aula: "K-205", dias: "Mar-Jue" }
        ]
    },
    {
        id: "6",
        codigo: "IMEC-304",
        nombre: "Termodinámica",
        descripcion: "Principios de termodinámica aplicada",
        creditos: 3,
        semestre: 3,
        estado: "Activa",
        color: "#F472B6",
        inscrita: true,
        grupoInscrito: "G02",
        grupos: [
            { id: "g11", codigo: "G01", horario: "15:00-17:00", cupos: 35, cuposDisponibles: 6, docente: "Prof. Díaz", aula: "M-203", dias: "Lun-Mie" },
            { id: "g12", codigo: "G02", horario: "9:00-12:00", cupos: 35, cuposDisponibles: 14, docente: "Prof. Ruiz", aula: "N-105", dias: "Vie" }
        ]
    },
    {
        id: "7",
        codigo: "IQUI-202",
        nombre: "Química General",
        descripcion: "Conceptos fundamentales de química",
        creditos: 3,
        semestre: 2,
        estado: "Inactiva",
        color: "#94A3B8",
        inscrita: false,
        grupos: []
    },
    {
        id: "8",
        codigo: "ISOF-401",
        nombre: "Arquitectura de Software",
        descripcion: "Patrones y diseño de arquitecturas escalables",
        creditos: 4,
        semestre: 4,
        estado: "Activa",
        color: "#A78BFA",
        inscrita: false,
        grupos: [
            { id: "g13", codigo: "G01", horario: "7:00-9:00", cupos: 25, cuposDisponibles: 1, docente: "Prof. Morales", aula: "P-401", dias: "Mar-Jue" },
            { id: "g14", codigo: "G02", horario: "16:00-18:00", cupos: 25, cuposDisponibles: 5, docente: "Prof. Herrera", aula: "Q-302", dias: "Lun-Mie" }
        ]
    },
    {
        id: "9",
        codigo: "IMAT-301",
        nombre: "Ecuaciones Diferenciales",
        descripcion: "Solución de ecuaciones diferenciales ordinarias",
        creditos: 4,
        semestre: 3,
        estado: "Activa",
        color: "#EF4444",
        inscrita: false,
        grupos: [
            { id: "g15", codigo: "G01", horario: "12:00-14:00", cupos: 40, cuposDisponibles: 18, docente: "Prof. Sánchez", aula: "R-201", dias: "Lun-Mie" },
            { id: "g16", codigo: "G02", horario: "14:00-16:00", cupos: 40, cuposDisponibles: 22, docente: "Prof. Pérez", aula: "S-104", dias: "Mar-Jue" }
        ]
    }
];

export default function StudentGroupManagement({ onLogout }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewFilter, setViewFilter] = useState("todas");
    const [semestreFilter, setSemestreFilter] = useState("todos");
    const [expandedCard, setExpandedCard] = useState(null);

    // Filtrar materias
    const filteredMaterias = materiasData.filter((materia) => {
        const matchesSearch =
            materia.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            materia.codigo.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesView = viewFilter === "todas" || (viewFilter === "inscritas" && materia.inscrita);
        const matchesSemestre = semestreFilter === "todos" || materia.semestre.toString() === semestreFilter;

        return matchesSearch && matchesView && matchesSemestre;
    });

    // Estadísticas
    const materiasInscritas = materiasData.filter(m => m.inscrita).length;
    const creditosInscritos = materiasData.filter(m => m.inscrita).reduce((acc, m) => acc + m.creditos, 0);
    const materiasDisponibles = materiasData.filter(m => m.estado === "Activa" && !m.inscrita).length;
    const totalCatalogo = materiasData.length;

    // Distribución por semestre
    const distribucionSemestre = [
        { semestre: 1, count: materiasData.filter(m => m.semestre === 1 && m.estado === "Activa").length },
        { semestre: 2, count: materiasData.filter(m => m.semestre === 2 && m.estado === "Activa").length },
        { semestre: 3, count: materiasData.filter(m => m.semestre === 3 && m.estado === "Activa").length },
        { semestre: 4, count: materiasData.filter(m => m.semestre === 4 && m.estado === "Activa").length }
    ];
    const maxCount = Math.max(...distribucionSemestre.map(d => d.count), 1);

    return (
        <div className="sgm-page">
            {/* TopBar */}
            <TopBar onLogout={onLogout} />

            {/* Container */}
            <div className="sgm-container">
                {/* Header */}
                <div className="sgm-header-wrapper">
                    <div className="sgm-header">
                        <div>
                            <h1 className="sgm-title">Catálogo de Materias</h1>
                            <p className="sgm-subtitle">Consulta las materias disponibles y tus materias inscritas</p>
                        </div>
                        <button className="sgm-cart-button">
                            <ShoppingCart className="sgm-icon" />
                            Carrito de Inscripción
                        </button>
                    </div>
                </div>

                <div className="sgm-main-wrapper">
                    <div className="sgm-layout">
                        {/* Main Content */}
                        <div className="sgm-content">
                            {/* Filters */}
                            <div className="sgm-filter-card">
                                {/* Tabs */}
                                <div className="sgm-tabs">
                                    <button
                                        onClick={() => setViewFilter("todas")}
                                        className={`sgm-tab ${viewFilter === "todas" ? "sgm-tab-active" : ""}`}
                                    >
                                        Todas las Materias
                                    </button>
                                    <button
                                        onClick={() => setViewFilter("inscritas")}
                                        className={`sgm-tab ${viewFilter === "inscritas" ? "sgm-tab-active" : ""}`}
                                    >
                                        Mis Materias
                                        <span className="sgm-tab-badge">{materiasInscritas}</span>
                                    </button>
                                </div>

                                {/* Search and Filters Row */}
                                <div className="sgm-filters-row">
                                    <div className="sgm-search-wrapper">
                                        <Search className="sgm-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Buscar materia por nombre o código..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="sgm-search-input"
                                        />
                                    </div>
                                    <select
                                        value={semestreFilter}
                                        onChange={(e) => setSemestreFilter(e.target.value)}
                                        className="sgm-select"
                                    >
                                        <option value="todos">Todos los semestres</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                                            <option key={sem} value={sem.toString()}>
                                                Semestre {sem}
                                            </option>
                                        ))}
                                    </select>
                                    <select className="sgm-select">
                                        <option>Todos los estados</option>
                                        <option>Activa</option>
                                        <option>Inactiva</option>
                                    </select>
                                </div>

                                <div className="sgm-filter-footer">
                                    <span className="sgm-count">
                                        <span className="sgm-count-number">{filteredMaterias.length}</span>{" "}
                                        {filteredMaterias.length === 1 ? "materia" : "materias"}
                                    </span>
                                </div>
                            </div>

                            {/* Materias Grid */}
                            <div className="sgm-grid">
                                {filteredMaterias.map((materia) => (
                                    <div key={materia.id} className="sgm-card">
                                        {/* Header */}
                                        <div className="sgm-card-header">
                                            <div
                                                className="sgm-card-icon"
                                                style={{ backgroundColor: `${materia.color}20` }}
                                            >
                                                <BookOpen className="sgm-book-icon" style={{ color: materia.color }} />
                                                {materia.inscrita && (
                                                    <div className="sgm-check-badge">
                                                        <CheckCircle2 className="sgm-check-icon" />
                                                    </div>
                                                )}
                                            </div>
                                            {materia.inscrita && (
                                                <span className="sgm-badge sgm-badge-inscrita">Inscrita</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <h3 className="sgm-card-title">{materia.nombre}</h3>
                                        <p className="sgm-card-code">{materia.codigo}</p>
                                        <p className="sgm-card-description">{materia.descripcion}</p>

                                        {/* Badges */}
                                        <div className="sgm-card-badges">
                                            <span className={`sgm-badge ${materia.estado === "Activa" ? "sgm-badge-activa" : "sgm-badge-inactiva"}`}>
                                                {materia.estado}
                                            </span>
                                            <span className="sgm-badge-text">Semestre {materia.semestre}</span>
                                            {materia.inscrita && materia.grupoInscrito && (
                                                <span className="sgm-badge-text">• Grupo {materia.grupoInscrito}</span>
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="sgm-card-stats">
                                            <div className="sgm-stat">
                                                <Users className="sgm-stat-icon" />
                                                <span className="sgm-stat-text">{materia.grupos.length}</span>
                                            </div>
                                            <div className="sgm-stat">
                                                <BookOpen className="sgm-stat-icon" />
                                                <span className="sgm-stat-text">{materia.creditos} créditos</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => setExpandedCard(expandedCard === materia.id ? null : materia.id)}
                                            disabled={materia.grupos.length === 0}
                                            className="sgm-view-groups-btn"
                                        >
                                            <Users className="sgm-icon" />
                                            Ver Grupos {materia.grupos.length > 0 && `(${materia.grupos.length})`}
                                            {materia.grupos.length > 0 && (
                                                <ChevronDown className={`sgm-chevron ${expandedCard === materia.id ? "sgm-chevron-up" : ""}`} />
                                            )}
                                        </button>

                                        {/* Expanded Groups */}
                                        {expandedCard === materia.id && (
                                            <div className="sgm-groups-expanded">
                                                {materia.grupos.map((grupo) => (
                                                    <div key={grupo.id} className="sgm-group-card">
                                                        <div className="sgm-group-header">
                                                            <div>
                                                                <div className="sgm-group-title-row">
                                                                    <span className="sgm-group-title">Grupo {grupo.codigo}</span>
                                                                    <span className={`sgm-badge ${grupo.cuposDisponibles > 0 ? "sgm-badge-disponible" : "sgm-badge-lleno"}`}>
                                                                        {grupo.cuposDisponibles > 0 ? "Disponible" : "Lleno"}
                                                                    </span>
                                                                </div>
                                                                <div className="sgm-group-details">
                                                                    <p className="sgm-group-detail">
                                                                        <span className="sgm-group-label">{grupo.dias}:</span> {grupo.horario}
                                                                    </p>
                                                                    <p className="sgm-group-detail">
                                                                        <User className="sgm-group-icon" />
                                                                        {grupo.docente}
                                                                    </p>
                                                                    <p className="sgm-group-detail">Aula: {grupo.aula}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sgm-group-cupos">
                                                            <div className="sgm-cupos-header">
                                                                <span className="sgm-cupos-label">Cupos disponibles</span>
                                                                <span className="sgm-cupos-value">
                                                                    {grupo.cuposDisponibles} / {grupo.cupos}
                                                                </span>
                                                            </div>
                                                            <div className="sgm-progress-bar">
                                                                <div
                                                                    className="sgm-progress-fill"
                                                                    style={{
                                                                        width: `${((grupo.cupos - grupo.cuposDisponibles) / grupo.cupos) * 100}%`,
                                                                        backgroundColor: grupo.cuposDisponibles > 0 ? "#4ADE80" : "#EF4444"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {filteredMaterias.length === 0 && (
                                <div className="sgm-empty-state">
                                    <BookOpen className="sgm-empty-icon" />
                                    <p className="sgm-empty-text">No se encontraron materias con los filtros seleccionados</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="sgm-sidebar">
                            {/* Mi Resumen */}
                            <div className="sgm-sidebar-card">
                                <h3 className="sgm-sidebar-title">Mi Resumen</h3>
                                <div className="sgm-sidebar-stats">
                                    <div className="sgm-sidebar-stat">
                                        <span className="sgm-sidebar-label">Materias inscritas</span>
                                        <span className="sgm-sidebar-value sgm-value-green">{materiasInscritas}</span>
                                    </div>
                                    <div className="sgm-sidebar-stat">
                                        <span className="sgm-sidebar-label">Créditos inscritos</span>
                                        <span className="sgm-sidebar-value sgm-value-red">{creditosInscritos}</span>
                                    </div>
                                    <div className="sgm-sidebar-stat">
                                        <span className="sgm-sidebar-label">Materias disponibles</span>
                                        <span className="sgm-sidebar-value sgm-value-dark">{materiasDisponibles}</span>
                                    </div>
                                    <div className="sgm-sidebar-stat">
                                        <span className="sgm-sidebar-label">Total en catálogo</span>
                                        <span className="sgm-sidebar-value sgm-value-gray">{totalCatalogo}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mis Materias Actuales */}
                            <div className="sgm-sidebar-card">
                                <h3 className="sgm-sidebar-title">Mis Materias Actuales</h3>
                                <div className="sgm-materias-list">
                                    {materiasData
                                        .filter((m) => m.inscrita)
                                        .map((materia) => (
                                            <div key={materia.id} className="sgm-materia-item">
                                                <div className="sgm-materia-content">
                                                    <Circle className="sgm-materia-dot" />
                                                    <div className="sgm-materia-info">
                                                        <p className="sgm-materia-name">{materia.nombre}</p>
                                                        <p className="sgm-materia-code">
                                                            {materia.codigo} • Grupo {materia.grupoInscrito}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Por Semestre */}
                            <div className="sgm-sidebar-card">
                                <h3 className="sgm-sidebar-title">Por Semestre</h3>
                                <div className="sgm-semestre-list">
                                    {distribucionSemestre.map((item) => (
                                        <div key={item.semestre} className="sgm-semestre-item">
                                            <div className="sgm-semestre-header">
                                                <span className="sgm-semestre-label">Semestre {item.semestre}</span>
                                                <span className="sgm-semestre-count">{item.count}</span>
                                            </div>
                                            <div className="sgm-progress-bar">
                                                <div
                                                    className="sgm-progress-fill sgm-progress-red"
                                                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}