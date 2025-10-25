import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserVerification.css";
import logoEci from '../../assets/logo-eci.png';

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

        // Guardar la facultad seleccionada en localStorage
        localStorage.setItem("faculty", faculty);

        // Redirigir al dashboard del decano
        navigate("/dean/dashboard");
    };

    return (
        <div className="login-container">
            {/* Logo institucional */}
            <img
                src={logoEci}
                alt="Logo institucional ECI"
                className="eci-logo large"
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
                                fontFamily: "Work Sans, sans-serif"
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