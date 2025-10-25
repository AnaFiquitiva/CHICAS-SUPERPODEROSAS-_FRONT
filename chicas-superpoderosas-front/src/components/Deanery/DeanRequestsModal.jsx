import React from "react";

export default function DeanRequestModal({ request, onClose, onStatusChange }) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 style={{ color: "#990000" }}>Detalle de Solicitud #{request.id}</h3>
                <p><strong>Estudiante:</strong> {request.student}</p>
                <p><strong>Tipo:</strong> {request.type}</p>
                <p><strong>Descripción:</strong> {request.description}</p>
                <p><strong>Fecha:</strong> {request.date}</p>
                <p><strong>Estado Actual:</strong> {request.status}</p>

                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
                    <button style={approveBtn} onClick={() => onStatusChange(request.id, "Aprobada")}>Aprobar</button>
                    <button style={rejectBtn} onClick={() => onStatusChange(request.id, "Rechazada")}>Rechazar</button>
                    <button style={closeBtn} onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
};

const approveBtn = {
    backgroundColor: "#00b300",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
};

const rejectBtn = {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
};

const closeBtn = {
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
};
