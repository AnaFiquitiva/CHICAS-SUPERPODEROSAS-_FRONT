import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Verification
import UserVerification from "./components/Verification/UserVerification";
import FacultySelection from "./components/Verification/FacultySelection";

// Dashboards
import StudentDashboard from "./components/Student/StudentDashboard";
import DeanDashboard from "./components/Deanery/DeanDashboard";

// Student modules
import StudentSchedule from "./components/Student/StudentSchedule";
import StudentRequests from "./components/Student/StudentRequests";
import StudentSemaphore from "./components/Student/StudentSemaphore";
import StudentGroupManagement from "./components/Student/StudentGroupManagement";

// Dean modules
import DeanRequestsPage from "./components/Deanery/DeanRequestsPage.jsx";
import DeanStudentsPage from "./components/Deanery/DeanStudentsPage.jsx"; // ✅ nuevo import

export default function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

// Componente separado para usar useNavigate
function AppRoutes() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Recuperar usuario del localStorage al iniciar
    useEffect(() => {
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const role = localStorage.getItem("role");
        const faculty = localStorage.getItem("faculty");

        if (email && role) {
            if (role === "student" && name) {
                setUser({ email, name, userType: "student" });
            } else if (role === "dean") {
                setUser({ email, userType: "dean", faculty });
            }
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
        navigate("/");
    };

    // Navegación para estudiantes
    const handleStudentNavigate = (module) => {
        switch (module) {
            case "dashboard":
                navigate("/student/dashboard");
                break;
            case "horario":
                navigate("/student/horario");
                break;
            case "solicitudes":
                navigate("/student/solicitudes");
                break;
            case "semaforo":
                navigate("/student/semaforo");
                break;
            case "gestion-grupos":
                navigate("/student/gestion-grupos");
                break;
            default:
                navigate("/student/dashboard");
        }
    };

    // Navegación para decanos
    const handleDeanNavigate = (module) => {
        switch (module) {
            case "dashboard":
                navigate("/dean/dashboard");
                break;
            case "gestionar-solicitudes":
                navigate("/dean/requests");
                break;
            case "informacion-estudiantes":
                navigate("/dean/students"); // ✅ ahora sí navega correctamente
                break;
            case "monitor-grupos":
                console.log("Navegar a monitor de grupos");
                break;
            case "configuracion":
                console.log("Navegar a configuración");
                break;
            default:
                navigate("/dean/dashboard");
        }
    };

    // Rutas protegidas
    const StudentPrivateRoute = ({ children }) =>
        user && user.userType === "student" ? children : <Navigate to="/" />;

    const DeanPrivateRoute = ({ children }) =>
        user && user.userType === "dean" ? children : <Navigate to="/" />;

    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<UserVerification setUser={setUser} />} />

            {/* Selección de Facultad para Decanos */}
            <Route
                path="/faculty-selection"
                element={
                    user && user.userType === "dean" ? (
                        <FacultySelection />
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />

            {/* ========== RUTAS DE ESTUDIANTE ========== */}
            <Route
                path="/student/dashboard"
                element={
                    <StudentPrivateRoute>
                        <StudentDashboard
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            <Route
                path="/student/horario"
                element={
                    <StudentPrivateRoute>
                        <StudentSchedule
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            <Route
                path="/student/solicitudes"
                element={
                    <StudentPrivateRoute>
                        <StudentRequests
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            <Route
                path="/student/semaforo"
                element={
                    <StudentPrivateRoute>
                        <StudentSemaphore
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            <Route
                path="/student/gestion-grupos"
                element={
                    <StudentPrivateRoute>
                        <StudentGroupManagement
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            {/* ========== RUTAS DE DECANO ========== */}
            <Route
                path="/dean/dashboard"
                element={
                    <DeanPrivateRoute>
                        <DeanDashboard
                            user={user}
                            onNavigate={handleDeanNavigate}
                            onLogout={handleLogout}
                        />
                    </DeanPrivateRoute>
                }
            />

            {/* Solicitudes */}
            <Route
                path="/dean/requests"
                element={
                    <DeanPrivateRoute>
                        <DeanRequestsPage />
                    </DeanPrivateRoute>
                }
            />

            {/* ✅ Nueva ruta: Información de Estudiantes */}
            <Route
                path="/dean/students"
                element={
                    <DeanPrivateRoute>
                        <DeanStudentsPage />
                    </DeanPrivateRoute>
                }
            />

            {/* Redirección para rutas desconocidas */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
