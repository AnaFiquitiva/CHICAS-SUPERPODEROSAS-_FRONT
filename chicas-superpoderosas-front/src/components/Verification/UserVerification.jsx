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

        // Normalizar email: quitar espacios y pasar a minúsculas
        const normalizedEmail = email.trim().toLowerCase();
        const name = getNameFromEmail(normalizedEmail);
        let role = null;

        // ESTUDIANTE
        if (normalizedEmail.includes("@mail.escuelaing.edu.co")) {
            role = "student";
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            localStorage.setItem("email", normalizedEmail);

            setUser({ email: normalizedEmail, name, userType: "student" });
            navigate("/student/dashboard");
        }
        // PROFESOR
        else if (normalizedEmail.includes("@pro.escuelaing.edu.co")) {
            role = "teacher";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, name, userType: "teacher" });
            navigate("/teacher/dashboard");
        }
        // ADMINISTRADOR
        else if (normalizedEmail.includes("@admi.escuelaing.edu.co")) {
            role = "admin";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, name, userType: "admin" });
            navigate("/admin/dashboard");
        }
        // DECANO
        else if (normalizedEmail === "decano@escuelaing.edu.co") {
            role = "dean";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);

            setUser({ email: normalizedEmail, userType: "dean" });
            navigate("/faculty-selection");
        }
        // EMAIL NO RECONOCIDO
        else {
            alert(
                "Correo institucional no reconocido. Usa un dominio válido:\n" +
                "- Estudiantes: @mail.escuelaing.edu.co\n" +
                "- Profesores: @pro.escuelaing.edu.co\n" +
                "- Administradores: @admi.escuelaing.edu.co\n" +
                "- Decanos: decano@escuelaing.edu.co"
            );
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