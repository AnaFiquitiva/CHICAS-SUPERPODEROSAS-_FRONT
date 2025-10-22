import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Verification
import UserVerification from "./components/Verification/UserVerification";

// Dashboards
import StudentDashboard from "./components/Student/StudentDashboard";

// Student modules
import StudentSchedule from "./components/Student/StudentSchedule";
import StudentRequests from "./components/Student/StudentRequests";
import StudentSemaphore from "./components/Student/StudentSemaphore";
import StudentGroupManagement from "./components/Student/StudentGroupManagement";

// Utils
import { getNameFromEmail } from "./components/Student/utils";

export default function App() {
    const [user, setUser] = useState(null);

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
    };

    // Ruta protegida
    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<UserVerification setUser={setUser} />}
                />

                <Route
                    path="/student/dashboard"
                    element={
                        <PrivateRoute>
                            <StudentDashboard user={user} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/student/horario"
                    element={
                        <PrivateRoute>
                            <StudentSchedule user={user} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/student/solicitudes"
                    element={
                        <PrivateRoute>
                            <StudentRequests user={user} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/student/semaforo"
                    element={
                        <PrivateRoute>
                            <StudentSemaphore user={user} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/student/gestion-grupos"
                    element={
                        <PrivateRoute>
                            <StudentGroupManagement user={user} />
                        </PrivateRoute>
                    }
                />

                {/* Redirección para rutas desconocidas */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
