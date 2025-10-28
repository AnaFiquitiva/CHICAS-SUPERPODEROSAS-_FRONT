
import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function NewRequest({ user, onNavigate, onLogout, onRequestCreated }) {
    const [form, setForm] = useState({
        type: "",
        origin: "",
        destination: "",
        observations: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        // Validación de campos obligatorios
        if (!form.type || !form.origin || !form.destination) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);

        try {
            // Simulación de envío al backend
            setTimeout(() => {
                const radicado = `REQ-${Math.floor(Math.random() * 9000 + 1000)}`;
                const newRequest = {
                    ...form,
                    radicado,
                    status: "Pendiente",
                    createdAt: new Date().toISOString().split("T")[0],
                };

                // Llamar callback para actualizar lista de solicitudes en StudentRequests
                if (onRequestCreated) onRequestCreated(newRequest);

                alert("Tu solicitud ha sido enviada con éxito");
                // Limpiar formulario
                setForm({ type: "", origin: "", destination: "", observations: "" });
                setLoading(false);
                // Volver a la lista de solicitudes
                onNavigate("solicitudes");
            }, 500);
        } catch (error) {
            alert("No fue posible enviar tu solicitud. Intenta nuevamente.");
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F8F8" }}>
            {/* Barra lateral */}
            <Sidebar user={user} onNavigate={onNavigate} onLogout={onLogout} />

            <main style={{ flex: 1, padding: "40px 60px", backgroundColor: "#FAFAFA" }}>
                <h1 style={{ color: "#990000", marginBottom: 30 }}>Nueva Solicitud de Cambio</h1>

                <div
                    style={{
                        padding: 20,
                        border: "1px solid #E0E0E0",
                        borderRadius: 12,
                        backgroundColor: "#fff",
                        maxWidth: 600,
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        <label>
                            Tipo de solicitud*:
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="">Selecciona tipo</option>
                                <option value="Cambio de grupo">Cambio de grupo</option>
                                <option value="Cambio de materia">Cambio de materia</option>
                            </select>
                        </label>

                        <label>
                            Materia o grupo actual*:
                            <input
                                name="origin"
                                value={form.origin}
                                placeholder="Materia o grupo actual"
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Sugerencia de cambio*:
                            <input
                                name="destination"
                                value={form.destination}
                                placeholder="Materia o grupo destino"
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Observaciones adicionales:
                            <textarea
                                name="observations"
                                value={form.observations}
                                placeholder="Opcional"
                                onChange={handleChange}
                            />
                        </label>

                        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor: "#990000",
                                    color: "#fff",
                                    padding: "8px 16px",
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                                disabled={loading}
                            >
                                {loading ? "Enviando..." : "Enviar"}
                            </button>

                            <button
                                onClick={() => onNavigate("solicitudes")}
                                style={{
                                    backgroundColor: "#ccc",
                                    color: "#100F0F",
                                    padding: "8px 16px",
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
