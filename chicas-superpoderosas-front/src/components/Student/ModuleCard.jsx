import React from "react";

export default function ModuleCard({ title, description, icon, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {icon}
            <h3 style={{ marginTop: 10 }}>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

