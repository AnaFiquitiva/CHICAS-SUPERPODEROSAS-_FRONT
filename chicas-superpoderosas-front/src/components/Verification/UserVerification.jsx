import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserVerification.css";

const UserVerification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        // Normalizamos el correo (por si el usuario escribe mayúsculas)
        const normalizedEmail = email.toLowerCase();

        // Validaciones según dominio del correo
        if (normalizedEmail.endsWith("@mail.escuelaing.edu.co")) {
            // Estudiante
            navigate("/student/dashboard");

        } else if (normalizedEmail.endsWith("@pro.escuelaing.edu.co")) {
            // Profesor
            navigate("/teacher/dashboard");

        } else if (normalizedEmail.endsWith("@admi.escuelaing.edu.co")) {
            // Administrador
            navigate("/admin/dashboard");

        } else if (
            normalizedEmail.endsWith("@escuelaing.edu.co") &&
            !normalizedEmail.includes("@admi.") &&
            !normalizedEmail.includes("@pro.") &&
            !normalizedEmail.includes("@mail.")
        ) {
            // Decano (solo este dominio puro pasa a selección de facultad)
            navigate("/faculty-selection");

        } else {
            alert("Correo institucional no reconocido. Usa un dominio válido.");
        }
    };

    return (
        <div className="login-container">
            {/* Logo ECI (doble tamaño, esquina superior derecha) */}
            <img
                src="https://scontent.fbog3-3.fna.fbcdn.net/v/t39.30808-6/247262847_4466585430046059_5181816861656944038_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yERMTb-cNyoQ7kNvwEjTyF7&_nc_oc=AdmZaLk3xNTbDNOTzNFylSeMpwTv6Z_U3xiGF3hUHONiR4PKXC8yeq2gQEd7-NZQEmA&_nc_zt=23&_nc_ht=scontent.fbog3-3.fna&_nc_gid=pdVSZcSqx1HFjy_aNIn3lQ&oh=00_AfdNho1H1GNikL0wUwZ9gmOCEVyw0UtXN_Uxw1r17Yw-3A&oe=68FE074E"
                alt="Logo ECI"
                className="eci-logo large"
            />

            <div className="login-card">
                <h1 className="login-title">
                    Bienvenido a <span>SIRHA</span>
                </h1>
                <p className="login-subtitle">
                    Sistema de Reasignación de Horarios Académicos
                </p>

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
                    ¿Olvidaste tu contraseña?{" "}
                    <a href="#">Recupérala aquí</a>
                </p>
            </div>
        </div>
    );
};

export default UserVerification;
