import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Verification
import UserVerification from "./components/Verification/UserVerification";
import FacultySelection from "./components/Verification/FacultySelection";

// Dashboards
import DashboardApp from "./components/Student/DashboardApp.tsx";
import DeanDashboard from "./components/Deanery/DeanDashboard";
import AdminDashboard from "./components/Administrators/AdminDashboard";

// Admin modules
import CreateCourse from "./components/Administrators/CreateCourse";
import CreateCareer from "./components/Administrators/CreateCareer";
import ViewCourses from "./components/Administrators/ViewCourses";
import ViewCareers from "./components/Administrators/ViewCareers";

// Student modules
import ScheduleApp from "./components/Student/ScheduleApp.tsx";
import RequestsApp from "./components/Student/RequestsApp";
import GestionMateriasApp from "./components/Student/GestionMateriasApp";
import SemaforoApp from "./components/Student/SemaforoApp";

// Dean modules
import DeanRequestsPage from "./components/Deanery/DeanRequestsPage.jsx";
import DeanStudentsPage from "./components/Deanery/DeanStudentsPage.jsx";
import DeanGroupsPage from "./components/Deanery/DeanGroupsPage.jsx";
import DeanConfigurationPage from "./components/Deanery/DeanConfigurationPage.jsx";

export default function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

function AppRoutes() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 🔁 Restaurar sesión previa
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
            } else if (role === "admin") {
                setUser({ email, name, userType: "admin" });
            }
        }
    }, []);

    // 🔓 Cerrar sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
        navigate("/");
    };

    // 📚 Navegación: Estudiante
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

    // 🎓 Navegación: Decano
    const handleDeanNavigate = (module) => {
        switch (module) {
            case "dashboard":
                navigate("/dean/dashboard");
                break;
            case "gestionar-solicitudes":
                navigate("/dean/requests");
                break;
            case "informacion-estudiantes":
                navigate("/dean/students");
                break;
            case "monitor-grupos":
                navigate("/dean/groups");
                break;
            case "configuracion":
                navigate("/dean/configuration");
                break;
            default:
                navigate("/dean/dashboard");
        }
    };

    // 🧑‍💼 Navegación: Administrador
    const handleAdminNavigate = (module) => {
        switch (module) {
            case "dashboard":
                navigate("/admin/dashboard");
                break;
            case "crear-curso":
                navigate("/admin/create-course");
                break;
            case "crear-carrera":
                navigate("/admin/create-career");
                break;
            case "ver-cursos":
                navigate("/admin/courses");
                break;
            case "ver-carreras":
                navigate("/admin/careers");
                break;
            default:
                navigate("/admin/dashboard");
        }
    };

    // 🔐 Rutas privadas
    const StudentPrivateRoute = ({ children }) =>
        user && user.userType === "student" ? children : <Navigate to="/" />;

    const DeanPrivateRoute = ({ children }) =>
        user && user.userType === "dean" ? children : <Navigate to="/" />;

    const AdminPrivateRoute = ({ children }) =>
        user && user.userType === "admin" ? children : <Navigate to="/" />;

    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<UserVerification setUser={setUser} />} />

            {/* Selección de Facultad */}
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

            {/* === ESTUDIANTE === */}
            <Route
                path="/student/dashboard"
                element={
                    <StudentPrivateRoute>
                        <DashboardApp
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
                        <ScheduleApp
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
                        <RequestsApp
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
                        <SemaforoApp
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
                        <GestionMateriasApp
                            user={user}
                            onNavigate={handleStudentNavigate}
                            onLogout={handleLogout}
                        />
                    </StudentPrivateRoute>
                }
            />

            {/* === DECANO === */}
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
            <Route path="/dean/requests" element={<DeanPrivateRoute><DeanRequestsPage /></DeanPrivateRoute>} />
            <Route path="/dean/students" element={<DeanPrivateRoute><DeanStudentsPage /></DeanPrivateRoute>} />
            <Route path="/dean/groups" element={<DeanPrivateRoute><DeanGroupsPage /></DeanPrivateRoute>} />
            <Route path="/dean/configuration" element={<DeanPrivateRoute><DeanConfigurationPage /></DeanPrivateRoute>} />

            {/* === ADMIN === */}
            <Route
                path="/admin/dashboard"
                element={
                    <AdminPrivateRoute>
                        <AdminDashboard
                            admin={user}
                            onNavigate={handleAdminNavigate}
                            onLogout={handleLogout}
                        />
                    </AdminPrivateRoute>
                }
            />
            <Route path="/admin/create-course" element={<AdminPrivateRoute><CreateCourse admin={user} onNavigate={handleAdminNavigate} onLogout={handleLogout} /></AdminPrivateRoute>} />
            <Route path="/admin/create-career" element={<AdminPrivateRoute><CreateCareer admin={user} onNavigate={handleAdminNavigate} onLogout={handleLogout} /></AdminPrivateRoute>} />
            <Route path="/admin/courses" element={<AdminPrivateRoute><ViewCourses admin={user} onNavigate={handleAdminNavigate} onLogout={handleLogout} /></AdminPrivateRoute>} />
            <Route path="/admin/careers" element={<AdminPrivateRoute><ViewCareers admin={user} onNavigate={handleAdminNavigate} onLogout={handleLogout} /></AdminPrivateRoute>} />

            {/* Redirección */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
