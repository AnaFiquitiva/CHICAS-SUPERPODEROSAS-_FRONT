import { useState, useEffect } from "react";

function Sidebar({ user, onLogout, onNavigate }) {
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
                <NavItem icon="🏠" text="Inicio" active onClick={() => onNavigate("dashboard")} />
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

function NavItem({ icon, text, active, onClick }) {
    return (
        <div onClick={onClick} style={{
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

function EditCourseModal({ course, onClose, onSave }) {
    const [formData, setFormData] = useState(course);

    const carrerasBase = [
        "Ingeniería en Biotecnología",
        "Ingeniería de Inteligencia Artificial",
        "Ingeniería de Ciberseguridad",
        "Ingeniería Civil",
        "Ingeniería Ambiental",
        "Ingeniería Estadística",
        "Ingeniería Eléctrica",
        "Ingeniería de Sistemas",
        "Ingeniería Industrial",
        "Ingeniería Electrónica",
        "Economía",
        "Administración de Empresas",
        "Matemáticas",
        "Ingeniería Mecánica",
        "Ingeniería Biomédica"
    ];

    const carrerasCreadas = JSON.parse(localStorage.getItem("carreras") || "[]");
    const nombresCarrerasCreadas = carrerasCreadas.map(c => c.nombre);
    const carreras = [...carrerasBase, ...nombresCarrerasCreadas];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.codigo || !formData.nombre || !formData.carrera ||
            !formData.creditos || !formData.semestre || !formData.descripcion) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }
        onSave(formData);
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 15px",
        border: "2px solid #f0e5e5",
        borderRadius: "8px",
        fontSize: "0.95rem",
        backgroundColor: "#fffafc",
        outline: "none",
        transition: "border-color 0.2s",
        boxSizing: "border-box"
    };

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
            zIndex: 1000
        }} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "40px",
                maxWidth: "800px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto"
            }}>
                <h2 style={{ color: "#990000", marginBottom: "30px", fontSize: "1.8rem" }}>
                    Editar Curso
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "20px"
                }}>
                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Código del Curso <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Nombre del Curso <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Carrera <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <select
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleChange}
                            style={{ ...inputStyle, cursor: "pointer" }}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        >
                            <option value="">Seleccione carrera</option>
                            {carreras.map((carrera, index) => (
                                <option key={index} value={carrera}>{carrera}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Créditos <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="creditos"
                            value={formData.creditos}
                            onChange={handleChange}
                            min="1"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Semestre Recomendado <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="semestre"
                            value={formData.semestre}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                            Prerrequisitos
                        </label>
                        <input
                            type="text"
                            name="prerequisitos"
                            value={formData.prerequisitos}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                        Descripción del Curso <span style={{ color: "#990000" }}>*</span>
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="4"
                        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                        onFocus={(e) => e.target.style.borderColor = "#990000"}
                        onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                    />
                </div>

                <div style={{ display: "flex", gap: "15px" }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            flex: 1,
                            padding: "15px",
                            backgroundColor: "#990000",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#770000"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#990000"}
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: "15px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "2px solid #e0e0e0",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f5f5f5";
                            e.currentTarget.style.borderColor = "#990000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.borderColor = "#e0e0e0";
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

function ViewCoursesContent({ onCancel }) {
    const [cursos, setCursos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("");
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        loadCursos();
    }, []);

    const loadCursos = () => {
        const cursosGuardados = JSON.parse(localStorage.getItem("cursos") || "[]");
        setCursos(cursosGuardados);
    };

    const carrerasBase = [
        "Ingeniería en Biotecnología",
        "Ingeniería de Inteligencia Artificial",
        "Ingeniería de Ciberseguridad",
        "Ingeniería Civil",
        "Ingeniería Ambiental",
        "Ingeniería Estadística",
        "Ingeniería Eléctrica",
        "Ingeniería de Sistemas",
        "Ingeniería Industrial",
        "Ingeniería Electrónica",
        "Economía",
        "Administración de Empresas",
        "Matemáticas",
        "Ingeniería Mecánica",
        "Ingeniería Biomédica"
    ];

    const carrerasCreadas = JSON.parse(localStorage.getItem("carreras") || "[]");
    const nombresCarrerasCreadas = carrerasCreadas.map(c => c.nombre);
    const todasLasCarreras = [...new Set([...carrerasBase, ...nombresCarrerasCreadas])];

    const carrerasEnCursos = [...new Set(cursos.map(c => c.carrera))];

    const cursosFiltrados = cursos.filter(curso => {
        const matchSearch = curso.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCarrera = !selectedCarrera || curso.carrera === selectedCarrera;
        return matchSearch && matchCarrera;
    });

    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar este curso?")) {
            const nuevosCursos = cursos.filter(c => c.id !== id);
            localStorage.setItem("cursos", JSON.stringify(nuevosCursos));
            setCursos(nuevosCursos);
        }
    };

    const handleSave = (updatedCourse) => {
        const nuevosCursos = cursos.map(c => c.id === updatedCourse.id ? updatedCourse : c);
        localStorage.setItem("cursos", JSON.stringify(nuevosCursos));
        setCursos(nuevosCursos);
        setEditingCourse(null);
    };

    return (
        <div style={{ width: "100%", maxWidth: "1400px" }}>
            <div style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                alignItems: "center"
            }}>
                <div style={{ flex: 1, position: "relative" }}>
                    <span style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "1.2rem"
                    }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por código o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px 15px 15px 50px",
                            border: "2px solid #f0e5e5",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            backgroundColor: "white",
                            outline: "none",
                            transition: "border-color 0.2s",
                            boxSizing: "border-box"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#990000"}
                        onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                    />
                </div>

                <select
                    value={selectedCarrera}
                    onChange={(e) => setSelectedCarrera(e.target.value)}
                    style={{
                        padding: "15px 20px",
                        border: "2px solid #f0e5e5",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        backgroundColor: "white",
                        cursor: "pointer",
                        outline: "none",
                        minWidth: "250px"
                    }}
                >
                    <option value="">Todas las carreras</option>
                    {carrerasEnCursos.map((carrera, index) => (
                        <option key={index} value={carrera}>{carrera}</option>
                    ))}
                </select>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "30px"
            }}>
                <div style={{
                    backgroundColor: "#ffe0e0",
                    padding: "25px",
                    borderRadius: "12px",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", color: "#990000" }}>
                        {cursos.length}
                    </h3>
                    <p style={{ margin: 0, color: "#666", fontWeight: "600" }}>Cursos Totales</p>
                </div>

                <div style={{
                    backgroundColor: "#d4edda",
                    padding: "25px",
                    borderRadius: "12px",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", color: "#28a745" }}>
                        {carrerasEnCursos.length}
                    </h3>
                    <p style={{ margin: 0, color: "#666", fontWeight: "600" }}>Carreras</p>
                </div>

                <div style={{
                    backgroundColor: "#e8d5f5",
                    padding: "25px",
                    borderRadius: "12px",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", color: "#7c3aed" }}>
                        {cursosFiltrados.length}
                    </h3>
                    <p style={{ margin: 0, color: "#666", fontWeight: "600" }}>Resultados</p>
                </div>
            </div>

            <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f8f9fa" }}>
                        <th style={thStyle}>Código</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Carrera</th>
                        <th style={thStyle}>Créditos</th>
                        <th style={thStyle}>Semestre</th>
                        <th style={thStyle}>Prerrequisitos</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cursosFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{
                                textAlign: "center",
                                padding: "40px",
                                color: "#999"
                            }}>
                                No se encontraron cursos
                            </td>
                        </tr>
                    ) : (
                        cursosFiltrados.map((curso) => (
                            <tr key={curso.id} style={{
                                borderBottom: "1px solid #f0f0f0",
                                transition: "background-color 0.2s"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fffafc"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}>
                                <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: "#ffe0e0",
                                            padding: "5px 12px",
                                            borderRadius: "6px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            color: "#990000"
                                        }}>
                                            {curso.codigo}
                                        </span>
                                </td>
                                <td style={tdStyle}>{curso.nombre}</td>
                                <td style={tdStyle}>{curso.carrera}</td>
                                <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: "#d4edda",
                                            padding: "5px 12px",
                                            borderRadius: "6px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            color: "#28a745"
                                        }}>
                                            {curso.creditos}
                                        </span>
                                </td>
                                <td style={tdStyle}>{curso.semestre}°</td>
                                <td style={tdStyle}>{curso.prerequisitos || "Ninguno"}</td>
                                <td style={tdStyle}>
                                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                        <button
                                            onClick={() => setEditingCourse(curso)}
                                            style={{
                                                padding: "8px 12px",
                                                backgroundColor: "#fff",
                                                border: "2px solid #990000",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "1rem",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#990000";
                                                e.currentTarget.style.color = "white";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#fff";
                                                e.currentTarget.style.color = "inherit";
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(curso.id)}
                                            style={{
                                                padding: "8px 12px",
                                                backgroundColor: "#fff",
                                                border: "2px solid #dc3545",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "1rem",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#dc3545";
                                                e.currentTarget.style.color = "white";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#fff";
                                                e.currentTarget.style.color = "inherit";
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {editingCourse && (
                <EditCourseModal
                    course={editingCourse}
                    onClose={() => setEditingCourse(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

const thStyle = {
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    color: "#333",
    fontSize: "0.9rem"
};

const tdStyle = {
    padding: "15px",
    fontSize: "0.9rem",
    color: "#555"
};

export default function ViewCourses() {
    const [view, setView] = useState("list");

    const mockAdmin = {
        name: "Admin Principal",
        role: "Administrador del Sistema",
        email: "admin@escuelaing.edu.co"
    };

    const handleCancel = () => {
        setView("dashboard");
    };

    const handleLogout = () => {
        console.log("Cerrar sesión");
    };

    if (view === "dashboard") {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <p>Volver al Dashboard</p>
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#fffafc"
        }}>
            <Sidebar user={mockAdmin} onLogout={handleLogout} onNavigate={setView} />

            <main style={{
                flex: 1,
                padding: "50px 80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: "1400px",
                    marginBottom: "40px",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        color: "#990000",
                        fontSize: "2.2rem",
                        marginBottom: "10px",
                        fontWeight: "700"
                    }}>
                        Ver Cursos Existentes
                    </h1>
                    <p style={{
                        color: "#666",
                        fontSize: "1.05rem"
                    }}>
                        Consulta, edita y gestiona todos los cursos registrados en el sistema
                    </p>
                </div>

                <ViewCoursesContent onCancel={handleCancel} />
            </main>
        </div>
    );
}