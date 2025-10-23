import React from "react";
import {
    HomeIcon,
    ProfileIcon,
    SettingsIcon,
    LogoutIcon,
} from "./Icons";
import logoEci from "../../assets/logo-eci.png";

export default function Sidebar({ user, onNavigate, onLogout }) {
    const studentName = user.name || user.email.split("@")[0];
    const mockStudent = {
        name: studentName,
        career: "Ingeniería de Sistemas",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    return (
        <aside
            style={{
                width: 250,
                backgroundColor: "#990000",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "25px 20px",
            }}
        >
            <div>
                <img src={logoEci} alt="Logo ECI" style={{ width: 140, marginBottom: 30 }} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 30,
                        gap: 12,
                    }}
                >
                    <img
                        src={mockStudent.image}
                        alt="Estudiante"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "2px solid white",
                        }}
                    />
                    <div>
                        <p style={{ fontWeight: 600, fontSize: "1rem" }}>{mockStudent.name}</p>
                        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{mockStudent.career}</p>
                    </div>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <SidebarItem icon={<HomeIcon size={22} />} label="Inicio" onClick={() => onNavigate("dashboard")} />
                    <SidebarItem icon={<ProfileIcon size={22} />} label="Perfil" onClick={() => onNavigate("perfil")} />
                    <SidebarItem icon={<SettingsIcon size={22} />} label="Configuración" onClick={() => onNavigate("configuracion")} />
                </nav>
            </div>

            <button
                onClick={onLogout}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                }}
            >
                <LogoutIcon size={20} />
                Cerrar sesión
            </button>
        </aside>
    );
}

function SidebarItem({ icon, label, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B30000";
                e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            {icon}
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{label}</span>
        </div>
    );
}
