import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserVerification.css"; // Reutiliza los estilos generales

const FacultySelection = () => {
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState("");

    const faculties = [
        "Ingeniería en Biotecnología",
        "Ingeniería de Inteligencia Artificial",
        "Ingeniería de Ciberseguridad",
        "Ingeniería Civil",
        "Ingeniería Ambiental",
        "Ingeniería Estadística",
        "Ingeniería Eléctrica",
        "Ingeniería de Sistemas",
        "Ingeniería Industrial",
        "Ingeniería Electrónica",
        "Economía",
        "Administración de Empresas",
        "Matemáticas",
        "Ingeniería Mecánica",
        "Ingeniería Biomédica",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!faculty) {
            alert("Por favor selecciona una facultad antes de continuar.");
            return;
        }

        // Simulación: si eres decano o admin, redirige a su dashboard
        setTimeout(() => {
            if (faculty) navigate("/dean/dashboard");
        }, 1000);
    };

    return (
        <div className="login-container">
            {/* Logo institucional */}
            <img
                src="https://scontent.fbog3-3.fna.fbcdn.net/v/t39.30808-6/247262847_4466585430046059_5181816861656944038_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yERMTb-cNyoQ7kNvwEjTyF7&_nc_oc=AdmZaLk3xNTbDNOTzNFylSeMpwTv6Z_U3xiGF3hUHONiR4PKXC8yeq2gQEd7-NZQEmA&_nc_zt=23&_nc_ht=scontent.fbog3-3.fna&_nc_gid=pdVSZcSqx1HFjy_aNIn3lQ&oh=00_AfdNho1H1GNikL0wUwZ9gmOCEVyw0UtXN_Uxw1r17Yw-3A&oe=68FE074E"
                alt="Logo ECI"
                className="eci-logo"
            />

            <div className="login-card">
                <h1 className="login-title">
                    Selecciona tu <span>Facultad</span>
                </h1>
                <p className="login-subtitle">
                    Para continuar al módulo de gestión correspondiente
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Facultad</label>
                        <select
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                fontSize: "14px",
                                backgroundColor: "rgba(255,255,255,0.9)",
                            }}
                        >
                            <option value="">Seleccione una facultad</option>
                            {faculties.map((fac, index) => (
                                <option key={index} value={fac}>
                                    {fac}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-login">
                        Entrar al sistema
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FacultySelection;
