import React from "react";
import { BellIcon } from "lucide-react";

export default function ProfileCard({ student, notifications, onNotificationClick }) {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                padding: 25,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                height: "100%",
                transition: "all 0.3s ease",
            }}
        >
            {/* Encabezado con imagen y nombre */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 15,
                }}
            >
                <img
                    src={student.image}
                    alt="Foto del estudiante"
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        border: "2px solid #990000",
                        objectFit: "cover",
                    }}
                />
                <div>
                    <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                        {student.name}
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.95rem",
                            color: "#666",
                            fontWeight: 500,
                        }}
                    >
                        {student.career}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#999" }}>
                        ID: {student.id}
                    </p>
                </div>
            </div>

            {/* Sección de notificaciones */}
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                    }}
                >
                    <BellIcon color="#990000" size={20} />
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#100F0F",
                        }}
                    >
                        Notificaciones
                    </h4>
                </div>

                {notifications && notifications.length > 0 ? (
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            overflowY: "auto",
                            maxHeight: "230px",
                        }}
                    >
                        {notifications.map((notif, index) => (
                            <li
                                key={index}
                                onClick={() => onNotificationClick && onNotificationClick(notif.link)}
                                style={{
                                    background: "#F9F9F9",
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    color: "#333",
                                    transition: "all 0.25s ease",
                                    borderLeft: "4px solid transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#FFF5F5";
                                    e.currentTarget.style.borderLeft = "4px solid #990000";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#F9F9F9";
                                    e.currentTarget.style.borderLeft = "4px solid transparent";
                                }}
                            >
                                {notif.text}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#888", fontSize: "0.9rem" }}>
                        No tienes notificaciones recientes.
                    </p>
                )}
            </div>
        </div>
    );
}


