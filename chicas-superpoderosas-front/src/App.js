import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserVerification from "./components/Verification/UserVerification";
import FacultySelection from "./components/Verification/FacultySelection";
import AdminDashboard from "./components/Administrators/AdminDashboard";
import DeanDashboard from "./components/Deanery/DeanDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
import ProfessorDashboard from "./components/Professor/ProfessorDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserVerification />} />
                <Route path="/faculty-selection" element={<FacultySelection />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dean/dashboard" element={<DeanDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/teacher/dashboard" element={<ProfessorDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
