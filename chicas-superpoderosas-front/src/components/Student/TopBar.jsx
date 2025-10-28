    import React from "react";
    import { useNavigate } from "react-router-dom";
    import "./TopBar.css";
    import logoEci from "../../assets/logo-eci.png";
    import defaultAvatar from "../../assets/default-avatar.png"; // 📸 Imagen por defecto

    import {
        ProfileIcon,
        NotificationIcon,
        HomeIcon,
        BackArrowIcon,
        LogoutIcon,
    } from "./Icons";

    const TopBar = ({ onLogout }) => {
        const name = localStorage.getItem("name") || "Usuario";
        const email = localStorage.getItem("email") || "correo@escuelaing.edu.co";
        const codigo = email.match(/\d{9}/)?.[0] || "000000000";

        const navigate = useNavigate();

        const goHome = () => navigate("/student/dashboard");
        const goBack = () => navigate(-1);
        const handleLogout = () => {
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            if (onLogout) onLogout();
            navigate("/login");
        };

        return (
            <header className="topbar">
                {/* 🔙 Lado izquierdo: Logo y botón atrás */}
                <div className="topbar-left">
                    <div className="back-button" onClick={goBack}>
                        <BackArrowIcon size={26} color="#A30000" />
                    </div>
                    <img src={logoEci} alt="Logo ECI" className="topbar-logo" />
                    <div className="topbar-title">
                        <p className="eci-subtitle">Julio Garavito · SIRHA</p>
                    </div>
                </div>


                {/* 🔔 Íconos lado derecho */}

                <nav className="topbar-center">
                    <div className="nav-item" onClick={handleLogout}>
                        <LogoutIcon size={30} color="#990000" />
                    </div>
                    <div className="nav-item">
                        <NotificationIcon size={30} color="#990000" />
                    </div>
                    <div className="nav-item">
                        <ProfileIcon size={30} color="#990000" />
                    </div>
                    <div className="nav-item" onClick={goHome}>
                        <HomeIcon size={30} color="#990000" />
                    </div>
                </nav>
            </header>
        );
    };

    export default TopBar;
