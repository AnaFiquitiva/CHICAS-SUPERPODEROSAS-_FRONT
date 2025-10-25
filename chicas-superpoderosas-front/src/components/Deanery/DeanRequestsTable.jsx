import React from "react";

export default function DeanRequestTable({ requests, onOpenModal }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "Pendiente":
                return "#ffcc00";
            case "Aprobada":
                return "#00b300";
            case "Rechazada":
                return "#ff4d4d";
            default:
                return "#ccc";
        }
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px" }}>
                <thead>
                <tr style={{ backgroundColor: "#990000", color: "#fff" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Estudiante</th>
                    <th style={thStyle}>Tipo</th>
                    <th style={thStyle}>Fecha</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((r) => (
                    <tr key={r.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                        <td style={tdStyle}>{r.id}</td>
                        <td style={tdStyle}>{r.student}</td>
                        <td style={tdStyle}>{r.type}</td>
                        <td style={tdStyle}>{r.date}</td>
                        <td style={{ ...tdStyle, color: getStatusColor(r.status), fontWeight: "600" }}>
                            {r.status}
                        </td>
                        <td style={tdStyle}>
                            <button
                                style={btnStyle}
                                onClick={() => onOpenModal(r)}
                            >
                                Ver Detalle
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const thStyle = {
    padding: "12px 8px",
    fontSize: "0.95rem",
    textAlign: "center",
};

const tdStyle = {
    padding: "10px 8px",
    fontSize: "0.9rem",
    color: "#333",
};

const btnStyle = {
    backgroundColor: "#990000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
};
