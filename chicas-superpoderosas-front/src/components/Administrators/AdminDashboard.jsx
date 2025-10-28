import { useState } from "react";

function Sidebar({ user, onLogout }) {
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
                <p style={{ fontSize: "0.75rem", opacity: 0.9 }}>{user.role}</p>
            </div>

            <nav style={{ width: "100%", flex: 1 }}>
                <NavItem icon="🏠" text="Inicio" active />
                <NavItem icon="📚" text="Cursos" />
                <NavItem icon="🎓" text="Carreras" />
                <NavItem icon="⚙️" text="Configuración" />
            </nav>

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
                marginTop: "auto"
            }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}>
                🚪 Cerrar sesión
            </button>
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

function AdminCard({ number, title, description, icon, color, onClick }) {
    return (
        <div onClick={onClick} style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "35px 30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            border: "2px solid transparent"
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.transform = "translateY(-8px)";
                 e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                 e.currentTarget.style.borderColor = "#990000";
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.transform = "translateY(0)";
                 e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                 e.currentTarget.style.borderColor = "transparent";
             }}>
            <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                fontSize: "2rem"
            }}>
                {icon}
            </div>

            <h3 style={{
                color: "#990000",
                fontSize: "1.1rem",
                marginBottom: "10px",
                fontWeight: "600"
            }}>
                {number}. {title}
            </h3>

            <p style={{
                color: "#666",
                fontSize: "0.95rem",
                lineHeight: "1.5"
            }}>
                {description}
            </p>
        </div>
    );
}

export default function AdminDashboard({ admin, onNavigate, onLogout }) {
    const mockAdmin = admin || {
        name: "Admin Principal",
        role: "Administrador del Sistema",
        email: "admin@escuelaing.edu.co"
    };

    const handleCardClick = (option) => {
        switch (option) {
            case "crear-curso":
                onNavigate("crear-curso");
                break;
            case "crear-carrera":
                onNavigate("crear-carrera");
                break;
            case "ver-cursos":
                onNavigate("ver-cursos");
                break;
            case "ver-carreras":
                onNavigate("ver-carreras");
                break;
            default:
                break;
        }
    };

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#fffafc"
        }}>
            <Sidebar user={mockAdmin} onLogout={onLogout} />

            <main style={{
                flex: 1,
                padding: "50px 80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {/* Header */}
                <div style={{
                    width: "100%",
                    maxWidth: "1200px",
                    marginBottom: "50px",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        color: "#990000",
                        fontSize: "2.2rem",
                        marginBottom: "10px",
                        fontWeight: "700"
                    }}>
                        Panel de Administración
                    </h1>
                    <p style={{
                        color: "#666",
                        fontSize: "1.05rem"
                    }}>
                        Gestiona cursos, carreras y configuraciones del sistema académico
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "30px",
                    width: "100%",
                    maxWidth: "900px"
                }}>
                    <AdminCard
                        number={1}
                        title="Crear nuevo curso"
                        description="Crear y configurar nuevos cursos"
                        icon="📖"
                        color="#ffe0e0"
                        onClick={() => handleCardClick("crear-curso")}
                    />

                    <AdminCard
                        number={2}
                        title="Crear nueva carrera"
                        description="Crear y configurar nuevas carreras"
                        icon="🎓"
                        color="#ffe0e0"
                        onClick={() => handleCardClick("crear-carrera")}
                    />

                    <AdminCard
                        number={3}
                        title="Ver cursos existentes"
                        description="Consultar y editar cursos existentes"
                        icon="📋"
                        color="#ffe0e0"
                        onClick={() => handleCardClick("ver-cursos")}
                    />

                    <AdminCard
                        number={4}
                        title="Ver carreras existentes"
                        description="Consultar y editar carreras existentes"
                        icon="📋"
                        color="#ffe0e0"
                        onClick={() => handleCardClick("ver-carreras")}
                    />
                </div>

                {/* Stats Section */}
                <div style={{
                    width: "100%",
                    maxWidth: "1200px",
                    marginTop: "50px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px"
                }}>
                    <StatCard title="Cursos Activos" value="45" color="#d4edda" />
                    <StatCard title="Carreras Activas" value="8" color="#d8fdd8" />
                    <StatCard title="Estudiantes" value="1,234" color="#fff7cc" />
                    <StatCard title="Profesores" value="87" color="#e3d5f5" />
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div style={{
            backgroundColor: color,
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            textAlign: "center",
            transition: "transform 0.2s"
        }}
             onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
             onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <h4 style={{
                color: "#555",
                fontSize: "0.9rem",
                marginBottom: "8px",
                fontWeight: "600"
            }}>
                {title}
            </h4>
            <p style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#333",
                margin: 0
            }}>
                {value}
            </p>
        </div>
    );
}