import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Verification
import UserVerification from "./components/Verification/UserVerification";

// Dashboards
import StudentDashboard from "./components/Student/StudentDashboard";

// Student modules
import StudentSchedule from "./components/Student/StudentSchedule";
import StudentRequests from "./components/Student/StudentRequests";
import StudentSemaphore from "./components/Student/StudentSemaphore";
import StudentGroupManagement from "./components/Student/StudentGroupManagement";

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
        if (email && name && role === "student") {
            setUser({ email, name, userType: "student" });
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
        navigate("/");
    };

    const handleNavigate = (module) => {
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

    // Ruta protegida
    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Routes>
            <Route path="/" element={<UserVerification setUser={setUser} />} />

            {/* Dashboard */}
            <Route
                path="/student/dashboard"
                element={
                    <PrivateRoute>
                        <StudentDashboard
                            user={user}
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    </PrivateRoute>
                }
            />

            {/* Módulos de estudiante */}
            <Route
                path="/student/horario"
                element={
                    <PrivateRoute>
                        <StudentSchedule
                            user={user}
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    </PrivateRoute>
                }
            />

            <Route
                path="/student/solicitudes"
                element={
                    <PrivateRoute>
                        <StudentRequests
                            user={user}
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    </PrivateRoute>
                }
            />

            <Route
                path="/student/semaforo"
                element={
                    <PrivateRoute>
                        <StudentSemaphore
                            user={user}
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    </PrivateRoute>
                }
            />

            <Route
                path="/student/gestion-grupos"
                element={
                    <PrivateRoute>
                        <StudentGroupManagement
                            user={user}
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    </PrivateRoute>
                }
            />

            {/* Redirección para rutas desconocidas */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
