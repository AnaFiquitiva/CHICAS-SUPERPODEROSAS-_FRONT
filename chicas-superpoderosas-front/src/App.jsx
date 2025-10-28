import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Verification
import UserVerification from "./components/Verification/UserVerification";
import FacultySelection from "./components/Verification/FacultySelection";

// Student modules
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentSchedule from "./components/Student/StudentSchedule";
import StudentRequests from "./components/Student/StudentRequests";
import StudentSemaphore from "./components/Student/StudentSemaphore";
import StudentGroupManagement from "./components/Student/StudentGroupManagement";

// Dean modules
import DeanDashboard from "./components/Deanery/DeanDashboard.jsx";
import DeanRequestsPage from "./components/Deanery/DeanRequestsPage.jsx";
import DeanStudentsPage from "./components/Deanery/DeanStudentsPage.jsx";
//import DeanGroupsPage from "./components/Deanery/DeanGroupsPage.jsx";
//import DeanConfigurationPage from "./components/Deanery/DeanConfigurationPage.jsx";

// Sonner notifications
import { Toaster as Sonner } from "sonner";

export default function App() {
    return (
        <Router>
            <AppRoutes />
            <Sonner position="top-right" richColors />
        </Router>
    );
}

function AppRoutes() {
    const [user, setUser] = useState(null); // JS puro, no <any>
    const navigate = useNavigate();

    // Recuperar usuario del localStorage
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

    const handleStudentNavigate = (module) => {
        switch (module) {
            case "dashboard": navigate("/student/dashboard"); break;
            case "horario": navigate("/student/horario"); break;
            case "solicitudes": navigate("/student/solicitudes"); break;
            case "semaforo": navigate("/student/semaforo"); break;
            case "gestion-grupos": navigate("/student/gestion-grupos"); break;
            default: navigate("/student/dashboard");
        }
    };

    const handleDeanNavigate = (module) => {
        switch (module) {
            case "dashboard": navigate("/dean/dashboard"); break;
            case "gestionar-solicitudes": navigate("/dean/requests"); break;
            case "informacion-estudiantes": navigate("/dean/students"); break;
            default: navigate("/dean/dashboard");
        }
    };

    // Rutas protegidas
    const StudentPrivateRoute = ({ children }) =>
        user?.userType === "student" ? children : <Navigate to="/" />;

    const DeanPrivateRoute = ({ children }) =>
        user?.userType === "dean" ? children : <Navigate to="/" />;

    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<UserVerification setUser={setUser} />} />

            {/* Selección de Facultad */}
            <Route
                path="/faculty-selection"
                element={
                    user?.userType === "dean" ? <FacultySelection /> : <Navigate to="/" />
                }
            />

            {/* Student routes */}
            <Route
                path="/student/dashboard"
                element={
                    <StudentPrivateRoute>
                        <StudentDashboard user={user} onNavigate={handleStudentNavigate} onLogout={handleLogout} />
                    </StudentPrivateRoute>
                }
            />
            <Route
                path="/student/horario"
                element={
                    <StudentPrivateRoute>
                        <StudentSchedule user={user} onNavigate={handleStudentNavigate} onLogout={handleLogout} />
                    </StudentPrivateRoute>
                }
            />
            <Route
                path="/student/solicitudes"
                element={
                    <StudentPrivateRoute>
                        <StudentRequests user={user} onNavigate={handleStudentNavigate} onLogout={handleLogout} />
                    </StudentPrivateRoute>
                }
            />
            <Route
                path="/student/semaforo"
                element={
                    <StudentPrivateRoute>
                        <StudentSemaphore user={user} onNavigate={handleStudentNavigate} onLogout={handleLogout} />
                    </StudentPrivateRoute>
                }
            />
            <Route
                path="/student/gestion-grupos"
                element={
                    <StudentPrivateRoute>
                        <StudentGroupManagement user={user} onNavigate={handleStudentNavigate} onLogout={handleLogout} />
                    </StudentPrivateRoute>
                }
            />

            {/* Dean routes */}
            <Route
                path="/dean/dashboard"
                element={
                    <DeanPrivateRoute>
                        <DeanDashboard user={user} onNavigate={handleDeanNavigate} onLogout={handleLogout} />
                    </DeanPrivateRoute>
                }
            />
            <Route
                path="/dean/requests"
                element={
                    <DeanPrivateRoute>
                        <DeanRequestsPage />
                    </DeanPrivateRoute>
                }
            />
            <Route
                path="/dean/students"
                element={
                    <DeanPrivateRoute>
                        <DeanStudentsPage />
                    </DeanPrivateRoute>
                }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
