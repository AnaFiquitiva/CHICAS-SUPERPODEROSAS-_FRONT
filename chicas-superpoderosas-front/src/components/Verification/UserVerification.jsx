import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserVerification.css";
import logoEci from '../../assets/logo-eci.png';
import { getNameFromEmail } from "../Student/utils";

const UserVerification = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        let role = null;
        let name = getNameFromEmail(email);

        if (email.includes("@mail.escuelaing.edu.co")) {
            role = "student";
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);

            // Actualizar el estado en App.js
            setUser({ email, name, userType: "student" });
            navigate("/student/dashboard");
        } else if (email.includes("@pro.escuelaing.edu.co")) {
            role = "teacher";
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);
            setUser({ email, name, userType: "teacher" });
            navigate("/teacher/dashboard");
        } else if (email.includes("@admi.escuelaing.edu.co")) {
            role = "admin";
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);
            setUser({ email, name, userType: "admin" });
            navigate("/admin/dashboard");
        } else if (email.includes("@escuelaing.edu.co")) {
            role = "dean";
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);
            setUser({ email, name, userType: "dean" });
            navigate("/faculty-selection");
        } else {
            alert("Correo institucional no reconocido. Usa un dominio válido.");
        }
    };

    return (
        <div className="login-container">
            <img src={logoEci} alt="Logo institucional ECI" className="eci-logo large" />
            <div className="login-card">
                <h1 className="login-title">Bienvenido a <span>SIRHA</span></h1>
                <p className="login-subtitle">Sistema de Reasignación de Horarios Académicos</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo institucional</label>
                        <input
                            type="email"
                            placeholder="nombre.apellido@dominio.escuelaing.edu.co"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login">Iniciar sesión</button>
                </form>

                <p className="forgot-password">
                    ¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a>
                </p>
            </div>
        </div>
    );
};

export default UserVerification;
