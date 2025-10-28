import { useState } from "react";

function StatCard({ title, value, icon, color }) {
    return (
        <div style={{
            backgroundColor: "white",
            padding: "20px 25px",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "transform 0.2s",
            border: "2px solid transparent"
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.transform = "translateY(-3px)";
                 e.currentTarget.style.borderColor = color;
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.transform = "translateY(0)";
                 e.currentTarget.style.borderColor = "transparent";
             }}>
            <div>
                <h4 style={{
                    color: "#555",
                    fontSize: "0.85rem",
                    marginBottom: "5px",
                    fontWeight: "500"
                }}>
                    {title}
                </h4>
                <p style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: color,
                    margin: 0
                }}>
                    {value}
                </p>
            </div>
            <div style={{
                fontSize: "2rem",
                opacity: 0.6
            }}>
                {icon}
            </div>
        </div>
    );
}

function CarreraCard({ carrera, onEdit, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);

    const getCodigoCarrera = (nombre) => {
        const palabras = nombre.split(' ');
        if (palabras.length >= 2) {
            return `ING-${palabras[palabras.length - 1].substring(0, 3).toUpperCase()}`;
        }
        return `${palabras[0].substring(0, 3).toUpperCase()}-${palabras[palabras.length - 1].substring(0, 3).toUpperCase()}`;
    };

    const getFacultad = (nombre) => {
        if (nombre.toLowerCase().includes('ingeniería')) return 'Ingeniería';
        if (nombre.toLowerCase().includes('economía')) return 'Economía';
        if (nombre.toLowerCase().includes('administración')) return 'Administración';
        if (nombre.toLowerCase().includes('matemáticas')) return 'Ciencias';
        return 'Ingeniería';
    };

    const codigo = getCodigoCarrera(carrera.nombre);
    const facultad = getFacultad(carrera.nombre);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "25px",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? "0 6px 20px rgba(0,0,0,0.12)" : "0 2px 10px rgba(0,0,0,0.08)",
                borderColor: isHovered ? "#990000" : "transparent"
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <span style={{
                            backgroundColor: "#ffebee",
                            color: "#990000",
                            padding: "4px 12px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "600"
                        }}>
                            {codigo}
                        </span>
                        <span style={{
                            backgroundColor: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "4px 12px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "600"
                        }}>
                            Presencial
                        </span>
                    </div>

                    <h3 style={{
                        color: "#990000",
                        fontSize: "1.15rem",
                        marginBottom: "5px",
                        fontWeight: "600"
                    }}>
                        {carrera.nombre}
                    </h3>

                    <p style={{
                        color: "#666",
                        fontSize: "0.9rem",
                        margin: 0
                    }}>
                        {facultad}
                    </p>
                </div>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                paddingTop: "15px",
                borderTop: "1px solid #f0f0f0"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>Duración:</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333" }}>
                        {carrera.duracion} semestres
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>Créditos:</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333" }}>
                        {carrera.creditos}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>👥 Estudiantes:</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333" }}>
                        {carrera.estudiantes}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>📚 Cursos:</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333" }}>
                        {carrera.cursos}
                    </span>
                </div>
            </div>

            <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                paddingTop: "15px",
                borderTop: "1px solid #f0f0f0"
            }}>
                <button onClick={() => onEdit(carrera)} style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#990000",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    transition: "background-color 0.2s"
                }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7a0000")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                    ✏️ Editar
                </button>

                <button onClick={() => onDelete(carrera)} style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    color: "#d32f2f",
                    border: "1px solid #ffcdd2",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    transition: "all 0.2s"
                }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffebee";
                            e.currentTarget.style.borderColor = "#d32f2f";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#f5f5f5";
                            e.currentTarget.style.borderColor = "#ffcdd2";
                        }}>
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}

export default function ViewCareers() {
    const [carreras, setCarreras] = useState([
        { id: 1, nombre: "Ingeniería en Biotecnología", duracion: 10, creditos: 165, estudiantes: 120, cursos: 48 },
        { id: 2, nombre: "Ingeniería de Inteligencia Artificial", duracion: 10, creditos: 168, estudiantes: 95, cursos: 45 },
        { id: 3, nombre: "Ingeniería de Ciberseguridad", duracion: 10, creditos: 162, estudiantes: 85, cursos: 44 },
        { id: 4, nombre: "Ingeniería Civil", duracion: 10, creditos: 165, estudiantes: 380, cursos: 45 },
        { id: 5, nombre: "Ingeniería Ambiental", duracion: 10, creditos: 160, estudiantes: 145, cursos: 43 },
        { id: 6, nombre: "Ingeniería Estadística", duracion: 10, creditos: 158, estudiantes: 92, cursos: 42 },
        { id: 7, nombre: "Ingeniería Eléctrica", duracion: 10, creditos: 167, estudiantes: 210, cursos: 46 },
        { id: 8, nombre: "Ingeniería de Sistemas", duracion: 10, creditos: 160, estudiantes: 450, cursos: 42 },
        { id: 9, nombre: "Ingeniería Industrial", duracion: 10, creditos: 163, estudiantes: 320, cursos: 44 },
        { id: 10, nombre: "Ingeniería Electrónica", duracion: 10, creditos: 165, estudiantes: 285, cursos: 45 },
        { id: 11, nombre: "Economía", duracion: 10, creditos: 150, estudiantes: 175, cursos: 40 },
        { id: 12, nombre: "Administración de Empresas", duracion: 10, creditos: 152, estudiantes: 245, cursos: 41 },
        { id: 13, nombre: "Matemáticas", duracion: 10, creditos: 155, estudiantes: 68, cursos: 38 },
        { id: 14, nombre: "Ingeniería Mecánica", duracion: 10, creditos: 166, estudiantes: 295, cursos: 46 },
        { id: 15, nombre: "Ingeniería Biomédica", duracion: 10, creditos: 164, estudiantes: 135, cursos: 44 }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCarreras, setFilteredCarreras] = useState(carreras);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = carreras.filter(carrera =>
            carrera.nombre.toLowerCase().includes(term) ||
            getFacultad(carrera.nombre).toLowerCase().includes(term)
        );
        setFilteredCarreras(filtered);
    };

    const getFacultad = (nombre) => {
        if (nombre.toLowerCase().includes('ingeniería')) return 'Ingeniería';
        if (nombre.toLowerCase().includes('economía')) return 'Economía';
        if (nombre.toLowerCase().includes('administración')) return 'Administración';
        if (nombre.toLowerCase().includes('matemáticas')) return 'Ciencias';
        return 'Ingeniería';
    };

    const handleEdit = (carrera) => {
        alert(`Editar: ${carrera.nombre}`);
    };

    const handleDelete = (carrera) => {
        setDeleteConfirm(carrera);
    };

    const confirmDelete = () => {
        if (deleteConfirm) {
            const nuevasCarreras = carreras.filter(c => c.id !== deleteConfirm.id);
            setCarreras(nuevasCarreras);
            setFilteredCarreras(nuevasCarreras);
            setDeleteConfirm(null);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    const totalEstudiantes = carreras.reduce((sum, c) => sum + c.estudiantes, 0);
    const totalCursos = carreras.reduce((sum, c) => sum + c.cursos, 0);

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#fffafc"
        }}>
            {/* Sidebar */}
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
                    <h4 style={{ fontSize: "0.9rem", marginBottom: "3px" }}>Admin Principal</h4>
                    <p style={{ fontSize: "0.75rem", opacity: 0.9 }}>Administrador del Sistema</p>
                </div>

                <nav style={{ width: "100%", flex: 1 }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 15px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s",
                    }}>
                        <span>🏠</span>
                        <span style={{ fontSize: "0.85rem" }}>Inicio</span>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 15px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s",
                    }}>
                        <span>📚</span>
                        <span style={{ fontSize: "0.85rem" }}>Cursos</span>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 15px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        transition: "background-color 0.2s",
                    }}>
                        <span>🎓</span>
                        <span style={{ fontSize: "0.85rem" }}>Carreras</span>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 15px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s",
                    }}>
                        <span>⚙️</span>
                        <span style={{ fontSize: "0.85rem" }}>Configuración</span>
                    </div>
                </nav>

                <button style={{
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

            <main style={{
                flex: 1,
                padding: "40px 60px",
            }}>
                {/* Header Section */}
                <div style={{
                    marginBottom: "35px"
                }}>
                    <h1 style={{
                        color: "#990000",
                        fontSize: "2rem",
                        marginBottom: "8px",
                        fontWeight: "700"
                    }}>
                        Carreras Existentes
                    </h1>
                    <p style={{
                        color: "#666",
                        fontSize: "1rem"
                    }}>
                        Gestiona y consulta todas las carreras del sistema académico
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    marginBottom: "35px"
                }}>
                    <StatCard title="Carreras" value={carreras.length} icon="🎓" color="#ff6b6b" />
                    <StatCard title="Estudiantes" value={totalEstudiantes} icon="👥" color="#4ecdc4" />
                    <StatCard title="Cursos" value={totalCursos} icon="📚" color="#a78bfa" />
                    <StatCard title="Resultados" value={filteredCarreras.length} icon="🔍" color="#ffa500" />
                </div>

                {/* Search Bar */}
                <div style={{
                    marginBottom: "30px",
                    backgroundColor: "white",
                    padding: "15px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                }}>
                    <span style={{ fontSize: "1.2rem", color: "#999" }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por código, nombre o facultad..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "0.95rem",
                            color: "#333"
                        }}
                    />
                </div>

                {/* Carreras Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
                    gap: "25px"
                }}>
                    {filteredCarreras.map(carrera => (
                        <CarreraCard
                            key={carrera.id}
                            carrera={carrera}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {filteredCarreras.length === 0 && (
                    <div style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                    }}>
                        <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
                        <h3 style={{ color: "#666", fontSize: "1.2rem", marginBottom: "10px" }}>
                            No se encontraron carreras
                        </h3>
                        <p style={{ color: "#999", fontSize: "0.95rem" }}>
                            Intenta con otros términos de búsqueda
                        </p>
                    </div>
                )}

                {/* Modal de confirmación de eliminación */}
                {deleteConfirm && (
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
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "30px",
                            maxWidth: "450px",
                            width: "90%",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
                        }}>
                            <h3 style={{
                                color: "#990000",
                                fontSize: "1.3rem",
                                marginBottom: "15px",
                                fontWeight: "600"
                            }}>
                                ⚠️ Confirmar Eliminación
                            </h3>
                            <p style={{
                                color: "#666",
                                fontSize: "1rem",
                                marginBottom: "25px",
                                lineHeight: "1.5"
                            }}>
                                ¿Estás seguro de eliminar la carrera <strong>"{deleteConfirm.nombre}"</strong>? Esta acción no se puede deshacer.
                            </p>
                            <div style={{
                                display: "flex",
                                gap: "12px"
                            }}>
                                <button onClick={cancelDelete} style={{
                                    flex: 1,
                                    padding: "12px",
                                    backgroundColor: "#f5f5f5",
                                    color: "#666",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    transition: "all 0.2s"
                                }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "#e0e0e0";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "#f5f5f5";
                                        }}>
                                    Cancelar
                                </button>
                                <button onClick={confirmDelete} style={{
                                    flex: 1,
                                    padding: "12px",
                                    backgroundColor: "#d32f2f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    transition: "background-color 0.2s"
                                }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "#b71c1c";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "#d32f2f";
                                        }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}