import { useState } from "react";

// Mock Services
const DeanGroupsService = {
    getAllGroups: () => [
        {
            id: 1,
            materia: "Programación I",
            codigo: "INGSW101",
            grupo: "Grupo 01",
            profesor: "Dr. Carlos Martínez",
            horario: "L-W-V 08:00-10:00",
            salon: "A-301",
            ocupacion: 83,
            capacidad: 30,
            listaEspera: 0,
            estado: "Disponible",
            semestre: "2024-1"
        },
        {
            id: 2,
            materia: "Programación I",
            codigo: "INGSW101",
            grupo: "Grupo 02",
            profesor: "Dra. Laura González",
            horario: "L-W-V 14:00-16:00",
            salon: "A-302",
            ocupacion: 93,
            capacidad: 30,
            listaEspera: 3,
            estado: "Alerta",
            semestre: "2024-1"
        },
        {
            id: 3,
            materia: "Base de Datos I",
            codigo: "BASDAT101",
            grupo: "Grupo 01",
            profesor: "Dr. Roberto Silva",
            horario: "M-J 10:00-12:00",
            salon: "B-201",
            ocupacion: 88,
            capacidad: 25,
            listaEspera: 1,
            estado: "Disponible",
            semestre: "2024-1"
        },
        {
            id: 4,
            materia: "Algoritmos II",
            codigo: "ALG201",
            grupo: "Grupo 01",
            profesor: "Dr. Miguel Torres",
            horario: "M-J 16:00-18:00",
            salon: "C-101",
            ocupacion: 100,
            capacidad: 35,
            listaEspera: 5,
            estado: "Lleno",
            semestre: "2024-1"
        },
    ],
    getGroupById: (id) => {
        const groups = DeanGroupsService.getAllGroups();
        return groups.find(g => g.id === id);
    }
};

function Sidebar({ user }) {
    return (
        <aside style={{
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
        }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <p style={{ fontSize: "0.75rem", lineHeight: "1.3" }}>
                    ESCUELA COLOMBIANA<br />DE INGENIERÍA<br />JULIO GARAVITO
                </p>
                <p style={{ fontSize: "0.7rem", marginTop: "5px", opacity: 0.9 }}>UNIVERSIDAD</p>
            </div>

            <div style={{ textAlign: "center", marginBottom: "30px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    border: "2px solid white",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    margin: "0 auto 10px"
                }}>
                    👤
                </div>
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
        <div style={{
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
             onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}>
            <span>{icon}</span>
            <span style={{ fontSize: "0.85rem" }}>{text}</span>
        </div>
    );
}

function StatCard({ title, value, color, subtitle }) {
    return (
        <div style={{
            backgroundColor: color,
            padding: "20px 25px",
            borderRadius: "14px",
            minWidth: "200px",
            flex: "1",
            boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
            transition: "transform 0.2s",
        }}
             onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
             onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <h4 style={{ color: "#555", fontSize: "0.9rem", marginBottom: "8px", fontWeight: "600" }}>{title}</h4>
            <p style={{ fontSize: "2rem", fontWeight: "700", color: "#333", margin: 0, marginBottom: "5px" }}>{value}</p>
            {subtitle && <p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>{subtitle}</p>}
        </div>
    );
}

function StatusBadge({ status }) {
    const colors = {
        Disponible: { bg: "#d4edda", text: "#155724" },
        Alerta: { bg: "#fff3cd", text: "#856404" },
        Lleno: { bg: "#f8d7da", text: "#721c24" },
    };
    const style = colors[status] || colors.Disponible;

    return (
        <span style={{
            backgroundColor: style.bg,
            color: style.text,
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "600",
            display: "inline-block",
        }}>
            {status}
        </span>
    );
}

function OccupationBadge({ percentage }) {
    let color = "#28a745";
    if (percentage >= 90) color = "#dc3545";
    else if (percentage >= 80) color = "#ff8c00";

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: color
            }} />
            <span style={{ fontWeight: "600" }}>{percentage}%</span>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>
                {Math.round(percentage * 30 / 100)}/{30}
            </span>
        </div>
    );
}

function GroupDetailModal({ group, onClose }) {
    const estudiantesOcupados = Math.round(group.ocupacion * group.capacidad / 100);
    const cuposLibres = group.capacidad - estudiantesOcupados;

    return (
        <div style={{
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
            padding: "20px"
        }} onClick={onClose}>
            <div style={{
                backgroundColor: "white",
                borderRadius: "16px",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                overflow: "hidden"
            }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    backgroundColor: "#990000",
                    color: "white",
                    padding: "25px 35px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Detalle del Grupo</h2>
                    <button onClick={onClose} style={{
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: "white",
                        padding: "0",
                        width: "30px",
                        height: "30px"
                    }}>✕</button>
                </div>

                {/* Content */}
                <div style={{ padding: "35px" }}>
                    {/* Información del grupo */}
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "25px"
                    }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                            <DetailField label="Materia:" value={group.materia} />
                            <DetailField label="Horario:" value={group.horario} />
                            <DetailField label="Código:" value={group.codigo} />
                            <DetailField label="Salón:" value={group.salon} />
                            <DetailField label="Grupo:" value={group.grupo} />
                            <DetailField label="Semestre:" value={group.semestre} />
                            <DetailField label="Profesor:" value={group.profesor} />
                            <DetailField label="Estado:" value={<StatusBadge status={group.estado} />} />
                        </div>
                    </div>

                    {/* Estadísticas de Ocupación */}
                    <div style={{
                        backgroundColor: "white",
                        border: "2px solid #e9ecef",
                        padding: "20px",
                        borderRadius: "10px"
                    }}>
                        <h3 style={{
                            color: "#28a745",
                            marginBottom: "20px",
                            fontSize: "1.1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <span>📊</span> Estadísticas de Ocupación
                        </h3>

                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                            <StatItem value={estudiantesOcupados} label="Estudiantes" color="#dc3545" />
                            <StatItem value={cuposLibres} label="Cupos Libres" color="#28a745" />
                            <StatItem value={group.listaEspera} label="Lista Espera" color="#ff8c00" />
                        </div>

                        <div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                                fontSize: "0.9rem",
                                fontWeight: "600"
                            }}>
                                <span>Ocupación actual</span>
                                <span>{group.ocupacion}%</span>
                            </div>
                            <div style={{
                                width: "100%",
                                height: "12px",
                                backgroundColor: "#ffe0e0",
                                borderRadius: "6px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    width: `${group.ocupacion}%`,
                                    height: "100%",
                                    backgroundColor: group.ocupacion >= 90 ? "#dc3545" : group.ocupacion >= 80 ? "#ff8c00" : "#28a745",
                                    transition: "width 0.3s ease"
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                        <button style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "#990000",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            transition: "background-color 0.2s"
                        }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                            Editar Grupo
                        </button>
                        <button onClick={onClose} style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            transition: "background-color 0.2s"
                        }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailField({ label, value }) {
    return (
        <div>
            <strong style={{ fontSize: "0.85rem", color: "#666", display: "block", marginBottom: "3px" }}>
                {label}
            </strong>
            <div style={{ fontSize: "0.95rem", color: "#333" }}>{value}</div>
        </div>
    );
}

function StatItem({ value, label, color }) {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: color,
                lineHeight: "1"
            }}>
                {value}
            </div>
            <div style={{
                fontSize: "0.85rem",
                color: "#666",
                marginTop: "5px"
            }}>
                {label}
            </div>
        </div>
    );
}

export default function DeanGroupsPage() {
    const groups = DeanGroupsService.getAllGroups();
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Todos");

    const mockDean = {
        name: "Dr. Carlos Rodríguez",
        career: "Ingeniería de Sistemas",
    };

    const filteredGroups = groups.filter(g => {
        const matchesSearch = g.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.profesor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "Todos" || g.estado === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const pendientes = 8;
    const hoy = 3;
    const alertas = groups.filter(g => g.estado === "Alerta" || g.estado === "Lleno").length;
    const promedioTiempo = "2.5 días";

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

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fffafc" }}>
            <Sidebar user={mockDean} />

            <main style={{ flex: 1, padding: "40px 60px", maxWidth: "1600px" }}>
                {/* Alerta */}
                <div style={{
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
                }}>
                    <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                    <span><strong>¡Atención!</strong> Tienes 2 solicitudes que vencen en menos de 24 horas.</span>
                </div>

                {/* Título */}
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ color: "#990000", marginBottom: "8px", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>📚</span> Gestión de Grupos
                    </h1>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>
                        Administra los grupos académicos y monitorea su estado.
                    </p>
                </div>

                {/* Estadísticas */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
                    <StatCard title="Solicitudes Pendientes" value={pendientes} color="#ffe0e0" />
                    <StatCard title="Solicitudes Hoy" value={hoy} color="#d8fdd8" />
                    <StatCard title="Grupos en Alerta" value={alertas} color="#fff7cc" />
                    <StatCard title="Tiempo Promedio" value={promedioTiempo} color="#e3d5f5" />
                </div>

                {/* Buscador y filtro */}
                <div style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                    alignItems: "center"
                }}>
                    <div style={{
                        flex: "1",
                        minWidth: "300px",
                        position: "relative"
                    }}>
                        <input
                            type="text"
                            placeholder="Buscar por materia, código o profesor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 40px 12px 15px",
                                borderRadius: "8px",
                                border: "2px solid #ddd",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "#990000"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                        />
                        <span style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "1.2rem"
                        }}>🔍</span>
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            padding: "12px 35px 12px 15px",
                            borderRadius: "8px",
                            border: "2px solid #ddd",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            backgroundColor: "white",
                            outline: "none"
                        }}
                    >
                        <option value="Todos">Todos los grupos</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Alerta">Alerta</option>
                        <option value="Lleno">Lleno</option>
                    </select>
                </div>

                {/* Tabla */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#990000", color: "white" }}>
                            <th style={headerStyle}>Materia</th>
                            <th style={headerStyle}>Grupo</th>
                            <th style={headerStyle}>Profesor</th>
                            <th style={headerStyle}>Horario</th>
                            <th style={headerStyle}>Ocupación</th>
                            <th style={headerStyle}>Lista Espera</th>
                            <th style={headerStyle}>Estado</th>
                            <th style={headerStyle}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredGroups.map((group, index) => (
                            <tr key={group.id} style={{
                                backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                                transition: "background-color 0.2s",
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "white")}>
                                <td style={cellStyle}>
                                    <div>
                                        <div style={{ fontWeight: "600" }}>{group.materia}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{group.codigo}</div>
                                    </div>
                                </td>
                                <td style={cellStyle}>{group.grupo}</td>
                                <td style={cellStyle}>{group.profesor}</td>
                                <td style={cellStyle}>
                                    <div>
                                        <div>{group.horario}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{group.salon}</div>
                                    </div>
                                </td>
                                <td style={cellStyle}>
                                    <OccupationBadge percentage={group.ocupacion} />
                                </td>
                                <td style={cellStyle}>
                                    <div style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "50%",
                                        backgroundColor: group.listaEspera > 0 ? "#fff3cd" : "#e9ecef",
                                        color: group.listaEspera > 0 ? "#856404" : "#666",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "600",
                                        fontSize: "0.95rem",
                                        margin: "0 auto",
                                        border: group.listaEspera > 0 ? "2px solid #ffc107" : "none"
                                    }}>
                                        {group.listaEspera}
                                    </div>
                                </td>
                                <td style={cellStyle}>
                                    <StatusBadge status={group.estado} />
                                </td>
                                <td style={cellStyle}>
                                    <button onClick={() => setSelectedGroup(group)} style={{
                                        backgroundColor: "#990000",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 20px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "0.85rem",
                                        fontWeight: "500",
                                        transition: "background-color 0.2s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        margin: "0 auto"
                                    }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                                        <span>👁️</span> Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {selectedGroup && (
                <GroupDetailModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />
            )}
        </div>
    );
}