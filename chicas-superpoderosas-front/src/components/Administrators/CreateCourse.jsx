import { useState } from "react";

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

function CreateCourseForm({ onCancel }) {
    const [formData, setFormData] = useState({
        codigo: "",
        nombre: "",
        carrera: "",
        creditos: "",
        semestre: "",
        prerequisitos: "",
        descripcion: ""
    });

    const [showSuccess, setShowSuccess] = useState(false);

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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.codigo || !formData.nombre || !formData.carrera ||
            !formData.creditos || !formData.semestre || !formData.descripcion) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
        const nuevoCurso = {
            id: Date.now(),
            ...formData,
            fechaCreacion: new Date().toISOString()
        };

        cursos.push(nuevoCurso);
        localStorage.setItem("cursos", JSON.stringify(cursos));

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setFormData({
                codigo: "",
                nombre: "",
                carrera: "",
                creditos: "",
                semestre: "",
                prerequisitos: "",
                descripcion: ""
            });
        }, 2000);
    };

    const handleCancel = () => {
        if (Object.values(formData).some(val => val !== "")) {
            if (window.confirm("¿Está seguro que desea cancelar? Se perderán los datos ingresados.")) {
                onCancel();
            }
        } else {
            onCancel();
        }
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
            width: "100%",
            maxWidth: "1000px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "40px 50px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
            <div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "25px",
                    marginBottom: "25px"
                }}>
                    <div>
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Código del Curso <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                            placeholder="Ej: IMAT-1001"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Nombre del Curso <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Cálculo Diferencial"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Carrera <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <select
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                cursor: "pointer"
                            }}
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
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Créditos <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="creditos"
                            value={formData.creditos}
                            onChange={handleChange}
                            placeholder="Ej: 3"
                            min="1"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Semestre Recomendado <span style={{ color: "#990000" }}>*</span>
                        </label>
                        <input
                            type="number"
                            name="semestre"
                            value={formData.semestre}
                            onChange={handleChange}
                            placeholder="Ej: 1"
                            min="1"
                            max="10"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: "block",
                            color: "#333",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}>
                            Prerrequisitos
                        </label>
                        <input
                            type="text"
                            name="prerequisitos"
                            value={formData.prerequisitos}
                            onChange={handleChange}
                            placeholder="Ej: IMAT-1000, IFIS-1001"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#990000"}
                            onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <label style={{
                        display: "block",
                        color: "#333",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        marginBottom: "8px"
                    }}>
                        Descripción del Curso <span style={{ color: "#990000" }}>*</span>
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción detallada del contenido y objetivos del curso..."
                        rows="5"
                        style={{
                            ...inputStyle,
                            resize: "vertical",
                            fontFamily: "inherit"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#990000"}
                        onBlur={(e) => e.target.style.borderColor = "#f0e5e5"}
                    />
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px"
                }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            width: "100%",
                            padding: "15px",
                            backgroundColor: "#990000",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#770000";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#990000";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        ✓ Crear Curso
                    </button>

                    <button
                        onClick={handleCancel}
                        style={{
                            width: "100%",
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
                            e.currentTarget.style.color = "#990000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.borderColor = "#e0e0e0";
                            e.currentTarget.style.color = "#666";
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            {showSuccess && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "15px 25px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    fontWeight: "600",
                    zIndex: 1000
                }}>
                    ✓ Curso creado exitosamente
                </div>
            )}
        </div>
    );
}

export default function CreateCourse() {
    const [view, setView] = useState("form");

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
                    maxWidth: "1000px",
                    marginBottom: "40px",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        color: "#990000",
                        fontSize: "2.2rem",
                        marginBottom: "10px",
                        fontWeight: "700"
                    }}>
                        Crear Nuevo Curso
                    </h1>
                    <p style={{
                        color: "#666",
                        fontSize: "1.05rem"
                    }}>
                        Complete todos los campos para registrar un nuevo curso en el sistema
                    </p>
                </div>

                <CreateCourseForm onCancel={handleCancel} />
            </main>
        </div>
    );
}