import { useState } from "react";

// Mock Services
const DeanStudentsService = {
    getAllStudents: () => [
        {
            id: 1,
            codigo: "2020115789",
            nombre: "Juan Sebastián Fonseca",
            programa: "Ingeniería de Sistemas",
            estado: "Activo",
            semestre: 5,
            semaforoAcademico: "Verde",
            promedio: 3.8,
            creditos: 88,
            totalCreditos: 160,
            avance: 55,
            solicitudes: 1,
            email: "juan.sfonseca@escuelaing.edu.co",
            telefono: "310-555-0123",
            fechaIngreso: "31/1/2020",
            idUsuario: "juan.sfonseca",
            materiasAprobadas: 22,
            materiasPerdidas: 1
        },
        {
            id: 2,
            codigo: "2022334567",
            nombre: "María Patricia García",
            programa: "Ingeniería Civil",
            estado: "Activo",
            semestre: 3,
            semaforoAcademico: "Azul",
            promedio: 3.5,
            creditos: 52,
            totalCreditos: 160,
            avance: 33,
            solicitudes: 1,
            email: "maria.garcia@escuelaing.edu.co",
            telefono: "320-555-0456",
            fechaIngreso: "15/8/2022",
            idUsuario: "maria.garcia",
            materiasAprobadas: 18,
            materiasPerdidas: 2
        },
        {
            id: 3,
            codigo: "2021223456",
            nombre: "Carlos Javier Rodríguez",
            programa: "Ingeniería Industrial",
            estado: "Condicional",
            semestre: 4,
            semaforoAcademico: "Rojo",
            promedio: 2.8,
            creditos: 45,
            totalCreditos: 160,
            avance: 28,
            solicitudes: 0,
            email: "carlos.rodriguez@escuelaing.edu.co",
            telefono: "315-555-0789",
            fechaIngreso: "20/1/2021",
            idUsuario: "carlos.rodriguez",
            materiasAprobadas: 15,
            materiasPerdidas: 5
        },
    ],
    getStudentById: (id) => {
        const students = DeanStudentsService.getAllStudents();
        return students.find(s => s.id === id);
    },
    getStudentSchedule: (studentId) => {
        const schedules = {
            1: [
                { materia: "Programación I", codigo: "INGSW101", grupo: "Grupo 01", horario: "L-W-V 08:00-10:00", salon: "A-301" },
                { materia: "Cálculo Diferencial", codigo: "CALC201", grupo: "Grupo 01", horario: "M-J 10:00-12:00", salon: "B-201" },
                { materia: "Álgebra Lineal", codigo: "ALG101", grupo: "Grupo 02", horario: "L-W-V 14:00-16:00", salon: "C-101" },
                { materia: "Física I", codigo: "FIS101", grupo: "Grupo 01", horario: "M-J 08:00-10:00", salon: "D-301" },
            ],
            2: [
                { materia: "Estructuras I", codigo: "CIVIL201", grupo: "Grupo 01", horario: "L-W 10:00-12:00", salon: "E-201" },
                { materia: "Resistencia Materiales", codigo: "CIVIL102", grupo: "Grupo 02", horario: "M-J 14:00-16:00", salon: "E-105" },
            ],
            3: [
                { materia: "Estadística", codigo: "STAT101", grupo: "Grupo 01", horario: "L-W-V 08:00-10:00", salon: "F-201" },
                { materia: "Procesos Industriales", codigo: "IND201", grupo: "Grupo 01", horario: "M-J 10:00-12:00", salon: "G-301" },
            ]
        };
        return schedules[studentId] || [];
    },
    getStudentHistory: (studentId) => {
        const histories = {
            1: [
                { semestre: "2023-2", materias: 6, creditos: 18, promedio: 3.9, estado: "Aprobado" },
                { semestre: "2023-1", materias: 5, creditos: 15, promedio: 3.7, estado: "Aprobado" },
                { semestre: "2022-2", materias: 6, creditos: 18, promedio: 3.8, estado: "Aprobado" },
                { semestre: "2022-1", materias: 5, creditos: 15, promedio: 3.6, estado: "Aprobado" },
            ],
            2: [
                { semestre: "2023-2", materias: 5, creditos: 15, promedio: 3.6, estado: "Aprobado" },
                { semestre: "2023-1", materias: 5, creditos: 15, promedio: 3.5, estado: "Aprobado" },
                { semestre: "2022-2", materias: 4, creditos: 12, promedio: 3.4, estado: "Aprobado" },
            ],
            3: [
                { semestre: "2023-2", materias: 4, creditos: 12, promedio: 2.9, estado: "Aprobado" },
                { semestre: "2023-1", materias: 4, creditos: 12, promedio: 2.8, estado: "Aprobado" },
                { semestre: "2022-2", materias: 3, creditos: 9, promedio: 2.7, estado: "Aprobado" },
            ]
        };
        return histories[studentId] || [];
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

function StatCard({ title, value, color }) {
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
            <p style={{ fontSize: "2rem", fontWeight: "700", color: "#333", margin: 0 }}>{value}</p>
        </div>
    );
}

function FilterButton({ children, active, onClick }) {
    return (
        <button onClick={onClick} style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: active ? "2px solid #990000" : "2px solid #ddd",
            backgroundColor: active ? "#990000" : "white",
            color: active ? "white" : "#555",
            cursor: "pointer",
            fontWeight: active ? "600" : "500",
            fontSize: "0.9rem",
            transition: "all 0.2s",
        }}
                onMouseEnter={(e) => {
                    if (!active) {
                        e.currentTarget.style.borderColor = "#990000";
                        e.currentTarget.style.color = "#990000";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!active) {
                        e.currentTarget.style.borderColor = "#ddd";
                        e.currentTarget.style.color = "#555";
                    }
                }}>
            {children}
        </button>
    );
}

function SemaforoIcon({ color }) {
    const colors = {
        Verde: "#28a745",
        Azul: "#007bff",
        Amarillo: "#ffc107",
        Rojo: "#dc3545"
    };

    return (
        <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: colors[color] || "#6c757d",
            display: "inline-block",
            marginRight: "8px"
        }} />
    );
}

function StatusBadge({ status }) {
    const colors = {
        Activo: { bg: "#d4edda", text: "#155724" },
        Inactivo: { bg: "#f8d7da", text: "#721c24" },
        Condicional: { bg: "#fff3cd", text: "#856404" },
    };
    const style = colors[status] || colors.Activo;

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

function DeanStudentsModal({ student, onClose }) {
    const [activeTab, setActiveTab] = useState("personal");
    const schedule = DeanStudentsService.getStudentSchedule(student.id);
    const history = DeanStudentsService.getStudentHistory(student.id);

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
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{
                    backgroundColor: "white",
                    padding: "25px 35px",
                    borderBottom: "2px solid #e9ecef",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "16px 16px 0 0"
                }}>
                    <h2 style={{ color: "#990000", margin: 0, fontSize: "1.5rem" }}>{student.nombre}</h2>
                    <button onClick={onClose} style={{
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: "#666",
                        padding: "0",
                        width: "30px",
                        height: "30px"
                    }}>✕</button>
                </div>

                <div style={{
                    backgroundColor: "white",
                    padding: "0 35px",
                    display: "flex",
                    gap: "30px",
                    borderBottom: "1px solid #e9ecef"
                }}>
                    <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                        Datos Personales
                    </TabButton>
                    <TabButton active={activeTab === "academico"} onClick={() => setActiveTab("academico")}>
                        Semáforo Académico
                    </TabButton>
                    <TabButton active={activeTab === "horario"} onClick={() => setActiveTab("horario")}>
                        Horario de Clases
                    </TabButton>
                    <TabButton active={activeTab === "historial"} onClick={() => setActiveTab("historial")}>
                        Historial Académico
                    </TabButton>
                </div>

                <div style={{ padding: "35px" }}>
                    {activeTab === "personal" && <PersonalDataSection student={student} />}
                    {activeTab === "academico" && <AcademicoSection student={student} />}
                    {activeTab === "horario" && <HorarioSection schedule={schedule} />}
                    {activeTab === "historial" && <HistorialSection history={history} />}
                </div>
            </div>
        </div>
    );
}

function TabButton({ children, active, onClick }) {
    return (
        <button onClick={onClick} style={{
            background: "none",
            border: "none",
            padding: "15px 0",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: active ? "600" : "500",
            color: active ? "#990000" : "#666",
            borderBottom: active ? "3px solid #990000" : "3px solid transparent",
            transition: "all 0.2s"
        }}>
            {children}
        </button>
    );
}

function PersonalDataSection({ student }) {
    return (
        <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#990000",
                marginBottom: "25px",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>👤</span> Datos Personales
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <InfoField label="Nombre Completo:" value={student.nombre} />
                <InfoField label="Semestre Actual:" value={student.semestre} />
                <InfoField label="Código Estudiantil:" value={student.codigo} />
                <InfoField label="Email:" value={student.email} />
                <InfoField label="ID Usuario:" value={student.idUsuario} />
                <InfoField label="Teléfono:" value={student.telefono} />
                <InfoField label="Carrera:" value={student.programa} />
                <InfoField label="Fecha de Ingreso:" value={student.fechaIngreso} />
            </div>
        </div>
    );
}

function AcademicoSection({ student }) {
    const progressPercent = (student.creditos / student.totalCreditos) * 100;

    return (
        <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}>
            <h3 style={{
                color: "#28a745",
                marginBottom: "25px",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>✓</span> Semáforo Académico
            </h3>

            <div style={{ display: "flex", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
                <MiniCard value={student.promedio.toFixed(1)} label="Promedio Acumulado" color="#e3f2fd" textColor="#1976d2" />
                <MiniCard value={student.materiasAprobadas} label="Materias Aprobadas" color="#e8f5e9" textColor="#388e3c" />
                <MiniCard value={student.materiasPerdidas} label="Materias Perdidas" color="#ffebee" textColor="#d32f2f" />
                <MiniCard value={`${student.avance}%`} label="Avance Carrera" color="#f3e5f5" textColor="#7b1fa2" />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "0.9rem",
                    fontWeight: "600"
                }}>
                    <span>Progreso académico</span>
                    <span>{student.creditos}/{student.totalCreditos} créditos</span>
                </div>
                <div style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "6px",
                    overflow: "hidden"
                }}>
                    <div style={{
                        width: `${progressPercent}%`,
                        height: "100%",
                        backgroundColor: "#dc3545",
                        transition: "width 0.3s ease"
                    }} />
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginTop: "20px"
            }}>
                <strong style={{ marginRight: "15px" }}>Estado del Semáforo:</strong>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <SemaforoIcon color={student.semaforoAcademico} />
                    <span style={{ fontWeight: "600", fontSize: "1rem" }}>{student.semaforoAcademico}</span>
                    <span style={{ marginLeft: "10px", color: "#666", fontSize: "0.9rem" }}>(En curso normal)</span>
                </div>
            </div>
        </div>
    );
}

function HorarioSection({ schedule }) {
    return (
        <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#28a745",
                marginBottom: "25px",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>📅</span> Horario de Clases Semestre Actual
            </h3>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                        <th style={scheduleHeaderStyle}>Materia</th>
                        <th style={scheduleHeaderStyle}>Código</th>
                        <th style={scheduleHeaderStyle}>Grupo</th>
                        <th style={scheduleHeaderStyle}>Horario</th>
                        <th style={scheduleHeaderStyle}>Salón</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedule.map((clase, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
                            <td style={scheduleCellStyle}>{clase.materia}</td>
                            <td style={scheduleCellStyle}>{clase.codigo}</td>
                            <td style={scheduleCellStyle}>{clase.grupo}</td>
                            <td style={scheduleCellStyle}>{clase.horario}</td>
                            <td style={scheduleCellStyle}>{clase.salon}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function HistorialSection({ history }) {
    return (
        <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{
                color: "#dc3545",
                marginBottom: "25px",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>📊</span> Historial Académico por Semestre
            </h3>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                        <th style={scheduleHeaderStyle}>Semestre</th>
                        <th style={scheduleHeaderStyle}>Materias</th>
                        <th style={scheduleHeaderStyle}>Créditos</th>
                        <th style={scheduleHeaderStyle}>Promedio</th>
                        <th style={scheduleHeaderStyle}>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((record, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
                            <td style={scheduleCellStyle}>{record.semestre}</td>
                            <td style={scheduleCellStyle}>{record.materias}</td>
                            <td style={scheduleCellStyle}>{record.creditos}</td>
                            <td style={{...scheduleCellStyle, color: "#28a745", fontWeight: "600"}}>
                                {record.promedio.toFixed(1)}
                            </td>
                            <td style={scheduleCellStyle}>{record.estado}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <strong style={{ color: "#555", fontSize: "0.85rem", display: "block", marginBottom: "5px" }}>{label}</strong>
            <span style={{ color: "#333", fontSize: "0.95rem" }}>{value}</span>
        </div>
    );
}

function MiniCard({ value, label, color, textColor }) {
    return (
        <div style={{
            backgroundColor: color,
            padding: "20px",
            borderRadius: "10px",
            flex: "1",
            minWidth: "140px",
            textAlign: "center"
        }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: textColor, marginBottom: "5px" }}>{value}</div>
            <div style={{ fontSize: "0.8rem", color: "#666", fontWeight: "500" }}>{label}</div>
        </div>
    );
}

const scheduleHeaderStyle = {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.85rem",
    color: "#495057"
};

const scheduleCellStyle = {
    padding: "12px 16px",
    fontSize: "0.9rem",
    color: "#333"
};

export default function DeanStudentsPage() {
    const students = DeanStudentsService.getAllStudents();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Todos");

    const mockDean = {
        name: "Dr. Carlos Rodríguez",
        career: "Ingeniería de Sistemas",
    };

    const filteredStudents = filterStatus === "Todos"
        ? students
        : students.filter(s => s.estado === filterStatus);

    const activeCount = students.filter(s => s.estado === "Activo").length;
    const inactiveCount = students.filter(s => s.estado === "Inactivo").length;
    const avgPromedio = (students.reduce((sum, s) => sum + s.promedio, 0) / students.length).toFixed(2);

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

            <main style={{ flex: 1, padding: "40px 60px", maxWidth: "1400px" }}>
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ color: "#990000", marginBottom: "8px", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>📚</span> Información de Estudiantes
                    </h1>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>
                        Aquí puedes consultar y gestionar la información académica de los estudiantes.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
                    <StatCard title="Estudiantes Activos" value={activeCount} color="#d8fdd8" />
                    <StatCard title="Estudiantes Inactivos" value={inactiveCount} color="#ffe0e0" />
                    <StatCard title="Promedio General" value={avgPromedio} color="#fff7cc" />
                </div>

                <div style={{ marginBottom: "25px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <FilterButton active={filterStatus === "Todos"} onClick={() => setFilterStatus("Todos")}>Todos</FilterButton>
                    <FilterButton active={filterStatus === "Activo"} onClick={() => setFilterStatus("Activo")}>Activos</FilterButton>
                    <FilterButton active={filterStatus === "Inactivo"} onClick={() => setFilterStatus("Inactivo")}>Inactivos</FilterButton>
                    <FilterButton active={filterStatus === "Condicional"} onClick={() => setFilterStatus("Condicional")}>Condicionales</FilterButton>
                </div>

                <div style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#990000", color: "white" }}>
                            <th style={headerStyle}>Estudiante</th>
                            <th style={headerStyle}>Semestre</th>
                            <th style={headerStyle}>Estado</th>
                            <th style={headerStyle}>Semáforo Académico</th>
                            <th style={headerStyle}>Promedio</th>
                            <th style={headerStyle}>Avance</th>
                            <th style={headerStyle}>Solicitudes</th>
                            <th style={headerStyle}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={student.id} style={{
                                backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                                transition: "background-color 0.2s",
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "white")}>
                                <td style={cellStyle}>
                                    <div>
                                        <div style={{ fontWeight: "600" }}>{student.nombre}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{student.codigo}</div>
                                    </div>
                                </td>
                                <td style={cellStyle}>{student.semestre}</td>
                                <td style={cellStyle}><StatusBadge status={student.estado} /></td>
                                <td style={cellStyle}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <SemaforoIcon color={student.semaforoAcademico} />
                                        <span>{student.semaforoAcademico}</span>
                                    </div>
                                </td>
                                <td style={cellStyle}>{student.promedio.toFixed(1)}</td>
                                <td style={cellStyle}>
                                    <div>
                                        <div style={{ fontWeight: "600" }}>{student.avance}%</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{student.creditos}/{student.totalCreditos} créditos</div>
                                    </div>
                                </td>
                                <td style={cellStyle}>
                                    <div style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundColor: student.solicitudes > 0 ? "#dc3545" : "#e9ecef",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        margin: "0 auto"
                                    }}>
                                        {student.solicitudes}
                                    </div>
                                </td>
                                <td style={cellStyle}>
                                    <button onClick={() => setSelectedStudent(DeanStudentsService.getStudentById(student.id))} style={{
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
                                        gap: "5px"
                                    }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#770000")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#990000")}>
                                        <span>👤</span> Ver Perfil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {selectedStudent && (
                <DeanStudentsModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
            )}
        </div>
    );
}