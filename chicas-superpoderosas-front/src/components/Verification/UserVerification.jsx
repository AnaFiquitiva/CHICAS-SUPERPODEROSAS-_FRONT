import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserVerification.css";
import logoEci from "../../assets/logo-eci.png";
import { getNameFromEmail } from "../ui/utils";
import { User } from "../../types";

interface Props {
    setUser: (user: User) => void;
}

const UserVerification: React.FC<Props> = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const name = getNameFromEmail(normalizedEmail);
        let role: User["userType"] | null = null;

        if (normalizedEmail.includes("@mail.escuelaing.edu.co")) {
            role = "student";
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, name, userType: "student" });
            navigate("/student/dashboard");
        } else if (normalizedEmail.includes("@pro.escuelaing.edu.co")) {
            role = "teacher";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, name, userType: "teacher" });
            navigate("/teacher/dashboard");
        } else if (normalizedEmail.includes("@admi.escuelaing.edu.co")) {
            role = "admin";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, name, userType: "admin" });
            navigate("/admin/dashboard");
        } else if (normalizedEmail === "decano@escuelaing.edu.co") {
            role = "dean";
            localStorage.setItem("role", role);
            localStorage.setItem("email", normalizedEmail);
            setUser({ email: normalizedEmail, userType: "dean" });
            navigate("/faculty-selection");
        } else {
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
                <h1 className="login-title">
                    Bienvenido a <span>SIRHA</span>
                </h1>
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

                    <button type="submit" className="btn-login">
                        Iniciar sesión
                    </button>
                </form>

                <p className="forgot-password">
                    ¿Olvidaste tu contraseña? <button className="link-button">Recupérala aquí</button>
                </p>
            </div>
        </div>
    );
};

export default UserVerification;
