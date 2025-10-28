import { useState } from "react";

function Sidebar({ user, onNavigate, onLogout }) {
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
                <h4 style={{ fontSize: "0.9rem", marginBottom: "3px" }}>{user?.name || "Usuario"}</h4>
                <p style={{ fontSize: "0.75rem", opacity: 0.9 }}>{user?.career || "Decanatura"}</p>
            </div>

            <nav style={{ width: "100%", flex: 1 }}>
                <NavItem icon="🏠" text="Inicio" onClick={() => onNavigate && onNavigate("dashboard")} />
                <NavItem icon="👤" text="Perfil" />
                <NavItem icon="⚙️" text="Configuración" active />
            </nav>

            {onLogout && (
                <button onClick={onLogout} style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    transition: "background-color 0.2s",
                    marginTop: "20px"
                }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}>
                    🚪 Cerrar sesión
                </button>
            )}
        </aside>
    );
}

function NavItem({ icon, text, active, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 15px",
                marginBottom: "5px",
                borderRadius: "8px",
                cursor: onClick ? "pointer" : "default",
                backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => !active && onClick && (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}>
            <span>{icon}</span>
            <span style={{ fontSize: "0.85rem" }}>{text}</span>
        </div>
    );
}

function TabButton({ children, active, onClick }) {
    return (
        <button onClick={onClick} style={{
            padding: "12px 30px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: active ? "white" : "transparent",
            color: active ? "#333" : "#666",
            cursor: "pointer",
            fontWeight: active ? "600" : "500",
            fontSize: "0.95rem",
            transition: "all 0.2s",
            boxShadow: active ? "0 2px 8px rgba(0,0,0,0.1)" : "none"
        }}>
            {children}
        </button>
    );
}

function ToggleSwitch({ checked, onChange }) {
    return (
        <label style={{
            position: "relative",
            display: "inline-block",
            width: "50px",
            height: "26px",
            cursor: "pointer"
        }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: checked ? "#8B0000" : "#ccc",
                borderRadius: "26px",
                transition: "0.3s"
            }}>
                <span style={{
                    position: "absolute",
                    content: "",
                    height: "20px",
                    width: "20px",
                    left: checked ? "27px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.3s"
                }} />
            </span>
        </label>
    );
}

function PeriodosTab() {
    const [fechaInicio, setFechaInicio] = useState("2024-01-15");
    const [fechaFin, setFechaFin] = useState("2024-02-15");
    const [semestre, setSemestre] = useState("2024-1");
    const [habilitado, setHabilitado] = useState(true);

    return (
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#990000",
                marginBottom: "30px",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>📅</span> Períodos Habilitados para Solicitudes
            </h3>

            <div style={{ marginBottom: "30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                            Fecha de Inicio
                        </label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid #e9ecef",
                                fontSize: "0.95rem",
                                outline: "none"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                            Fecha de Fin
                        </label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid #e9ecef",
                                fontSize: "0.95rem",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                            Semestre Actual
                        </label>
                        <input
                            type="text"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid #e9ecef",
                                fontSize: "0.95rem",
                                outline: "none"
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", paddingTop: "30px" }}>
                        <ToggleSwitch checked={habilitado} onChange={(e) => setHabilitado(e.target.checked)} />
                        <span style={{ fontWeight: "600", color: "#333" }}>Período habilitado</span>
                    </div>
                </div>
            </div>

            <div style={{
                backgroundColor: habilitado ? "#d4edda" : "#f8d7da",
                padding: "15px 20px",
                borderRadius: "8px",
                marginBottom: "25px"
            }}>
                <strong style={{ color: habilitado ? "#155724" : "#721c24" }}>
                    Estado actual: {habilitado ? "Activo" : "Inactivo"}
                </strong>
                <p style={{ margin: "5px 0 0", fontSize: "0.9rem", color: habilitado ? "#155724" : "#721c24" }}>
                    Los estudiantes {habilitado ? "solo pueden" : "no pueden"} crear solicitudes dentro del período habilitado.
                </p>
            </div>

            <button style={{
                backgroundColor: "#990000",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
            }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                Guardar Cambios
            </button>
        </div>
    );
}

function PlazosTab() {
    const [cambioGrupo, setCambioGrupo] = useState(5);
    const [cambioMateria, setCambioMateria] = useState(7);
    const [cancelacion, setCancelacion] = useState(3);
    const [homologacion, setHomologacion] = useState(10);

    return (
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#28a745",
                marginBottom: "30px",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>🕐</span> Plazos de Resolución (Días Hábiles)
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "30px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Cambio de Grupo
                    </label>
                    <input
                        type="number"
                        value={cambioGrupo}
                        onChange={(e) => setCambioGrupo(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none"
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Cambio de Materia
                    </label>
                    <input
                        type="number"
                        value={cambioMateria}
                        onChange={(e) => setCambioMateria(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none"
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Cancelación de Materia
                    </label>
                    <input
                        type="number"
                        value={cancelacion}
                        onChange={(e) => setCancelacion(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none"
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Homologación
                    </label>
                    <input
                        type="number"
                        value={homologacion}
                        onChange={(e) => setHomologacion(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none"
                        }}
                    />
                </div>
            </div>

            <div style={{
                backgroundColor: "#fff3cd",
                padding: "15px 20px",
                borderRadius: "8px",
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <span style={{ color: "#856404" }}>
                    Los plazos se calculan automáticamente excluyendo fines de semana y días festivos.
                </span>
            </div>

            <button style={{
                backgroundColor: "#990000",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
            }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                Guardar Cambios
            </button>
        </div>
    );
}

function CapacidadesTab() {
    const [capacidadMaxima, setCapacidadMaxima] = useState(30);
    const [alertaOcupacion, setAlertaOcupacion] = useState(90);
    const [permitirSobreCapacidad, setPermitirSobreCapacidad] = useState(false);

    return (
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#ff8c00",
                marginBottom: "30px",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>👥</span> Gestión de Capacidades de Grupos
            </h3>

            <div style={{
                backgroundColor: "#fff3cd",
                padding: "15px 20px",
                borderRadius: "8px",
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <span style={{ color: "#856404" }}>
                    No tienes permisos para modificar configuraciones de capacidad.
                </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "30px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Capacidad Máxima por Defecto
                    </label>
                    <input
                        type="number"
                        value={capacidadMaxima}
                        onChange={(e) => setCapacidadMaxima(e.target.value)}
                        disabled
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none",
                            backgroundColor: "#f8f9fa",
                            cursor: "not-allowed"
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
                        Alerta de Ocupación (%)
                    </label>
                    <input
                        type="number"
                        value={alertaOcupacion}
                        onChange={(e) => setAlertaOcupacion(e.target.value)}
                        disabled
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "2px solid #e9ecef",
                            fontSize: "0.95rem",
                            outline: "none",
                            backgroundColor: "#f8f9fa",
                            cursor: "not-allowed"
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "30px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
            }}>
                <ToggleSwitch checked={permitirSobreCapacidad} onChange={() => {}} />
                <div>
                    <strong style={{ display: "block", color: "#666" }}>Permitir inscripciones sobre la capacidad máxima</strong>
                </div>
            </div>

            <div style={{
                backgroundColor: "#fff3cd",
                padding: "15px 20px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span style={{ fontSize: "1.2rem" }}>ℹ️</span>
                <span style={{ color: "#856404" }}>
                    Los grupos mostrarán alerta cuando alcancen el {alertaOcupacion}% de su capacidad.
                </span>
            </div>
        </div>
    );
}

function NotificacionesTab() {
    const [emailNuevas, setEmailNuevas] = useState(true);
    const [alertasProximas, setAlertasProximas] = useState(true);
    const [gruposLlenos, setGruposLlenos] = useState(true);
    const [resumenDiario, setResumenDiario] = useState(true);

    return (
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#7b1fa2",
                marginBottom: "30px",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>⚙️</span> Configuración de Notificaciones
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <NotificationItem
                    title="Notificar solicitudes nuevas por email"
                    description="Recibir email inmediatamente cuando llegue una nueva solicitud"
                    checked={emailNuevas}
                    onChange={(e) => setEmailNuevas(e.target.checked)}
                />
                <NotificationItem
                    title="Alertas de solicitudes próximas a vencer"
                    description="Email diario con solicitudes que vencen en 24 horas"
                    checked={alertasProximas}
                    onChange={(e) => setAlertasProximas(e.target.checked)}
                />
                <NotificationItem
                    title="Alerta de grupos llenos"
                    description="Notificar cuando un grupo alcance el umbral de ocupación"
                    checked={gruposLlenos}
                    onChange={(e) => setGruposLlenos(e.target.checked)}
                />
                <NotificationItem
                    title="Resumen diario"
                    description="Email con estadísticas diarias de solicitudes y grupos"
                    checked={resumenDiario}
                    onChange={(e) => setResumenDiario(e.target.checked)}
                />
            </div>

            <button style={{
                backgroundColor: "#990000",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "30px",
                transition: "background-color 0.2s"
            }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                Guardar Cambios
            </button>
        </div>
    );
}

function NotificationItem({ title, description, checked, onChange }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            border: "2px solid #e9ecef",
            borderRadius: "10px",
            transition: "border-color 0.2s"
        }}
             onMouseEnter={(e) => e.currentTarget.style.borderColor = "#990000"}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e9ecef"}>
            <div style={{ flex: 1 }}>
                <strong style={{ display: "block", marginBottom: "5px", fontSize: "1rem", color: "#333" }}>
                    {title}
                </strong>
                <span style={{ fontSize: "0.9rem", color: "#666" }}>{description}</span>
            </div>
            <ToggleSwitch checked={checked} onChange={onChange} />
        </div>
    );
}

function ValidacionesTab() {
    const [verificarPrerequisitos, setVerificarPrerequisitos] = useState(true);
    const [detectarConflictos, setDetectarConflictos] = useState(true);
    const [validarCupos, setValidarCupos] = useState(true);
    const [permitirCancelaciones, setPermitirCancelaciones] = useState(false);

    return (
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#dc3545",
                marginBottom: "30px",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>✓</span> Validaciones Automáticas
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <ValidationItem
                    title="Verificar prerequisitos académicos"
                    description="Validar que el estudiante cumpla los prerequisitos para cambios"
                    checked={verificarPrerequisitos}
                    onChange={(e) => setVerificarPrerequisitos(e.target.checked)}
                />
                <ValidationItem
                    title="Detectar conflictos de horario"
                    description="Verificar automáticamente conflictos de horario en cambios"
                    checked={detectarConflictos}
                    onChange={(e) => setDetectarConflictos(e.target.checked)}
                />
                <ValidationItem
                    title="Validar cupos disponibles"
                    description="Verificar disponibilidad de cupos antes de aprobar cambios"
                    checked={validarCupos}
                    onChange={(e) => setValidarCupos(e.target.checked)}
                />
                <ValidationItem
                    title="Permitir cancelaciones tardías"
                    description="Permitir cancelación de materias fuera del período regular"
                    checked={permitirCancelaciones}
                    onChange={(e) => setPermitirCancelaciones(e.target.checked)}
                />
            </div>

            <button style={{
                backgroundColor: "#990000",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "30px",
                transition: "background-color 0.2s"
            }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                Guardar Cambios
            </button>
        </div>
    );
}

function ValidationItem({ title, description, checked, onChange }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            border: "2px solid #e9ecef",
            borderRadius: "10px",
            transition: "border-color 0.2s"
        }}
             onMouseEnter={(e) => e.currentTarget.style.borderColor = "#990000"}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e9ecef"}>
            <div style={{ flex: 1 }}>
                <strong style={{ display: "block", marginBottom: "5px", fontSize: "1rem", color: "#333" }}>
                    {title}
                </strong>
                <span style={{ fontSize: "0.9rem", color: "#666" }}>{description}</span>
            </div>
            <ToggleSwitch checked={checked} onChange={onChange} />
        </div>
    );
}

export default function DeanConfigurationPage({ user, onNavigate, onLogout }) {
    const [activeTab, setActiveTab] = useState("periodos");

    const mockDean = user || {
        name: "Dr. Carlos Rodríguez",
        career: "Ingeniería de Sistemas",
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fffafc" }}>
            <Sidebar user={mockDean} onNavigate={onNavigate} onLogout={onLogout} />

            <main style={{ flex: 1, padding: "40px 60px", maxWidth: "1400px" }}>
                {/* Título */}
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ color: "#990000", marginBottom: "8px", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>⚙️</span> Configuración del Sistema
                    </h1>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>
                        Administra los parámetros y configuraciones del sistema académico.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px 20px",
                    borderRadius: "50px",
                    marginBottom: "30px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <TabButton active={activeTab === "periodos"} onClick={() => setActiveTab("periodos")}>
                        Periodos
                    </TabButton>
                    <TabButton active={activeTab === "plazos"} onClick={() => setActiveTab("plazos")}>
                        Plazos
                    </TabButton>
                    <TabButton active={activeTab === "capacidades"} onClick={() => setActiveTab("capacidades")}>
                        Capacidades
                    </TabButton>
                    <TabButton active={activeTab === "notificaciones"} onClick={() => setActiveTab("notificaciones")}>
                        Notificaciones
                    </TabButton>
                    <TabButton active={activeTab === "validaciones"} onClick={() => setActiveTab("validaciones")}>
                        Validaciones
                    </TabButton>
                </div>

                {/* Content */}
                {activeTab === "periodos" && <PeriodosTab />}
                {activeTab === "plazos" && <PlazosTab />}
                {activeTab === "capacidades" && <CapacidadesTab />}
                {activeTab === "notificaciones" && <NotificacionesTab />}
                {activeTab === "validaciones" && <ValidacionesTab />}
            </main>
        </div>
    );
}