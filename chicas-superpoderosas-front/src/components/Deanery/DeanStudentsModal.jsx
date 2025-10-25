// src/components/Deanery/DeanStudentsModal.jsx
import { useState } from "react";

const DeanStudentsModal = ({ student, onClose }) => {
    const [tab, setTab] = useState("info");

    if (!student) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[700px] p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Perfil de Estudiante
                </h2>

                {/* Tabs */}
                <div className="flex justify-around border-b mb-4">
                    {[
                        { key: "info", label: "Información General" },
                        { key: "estado", label: "Estado Académico" },
                        { key: "horario", label: "Horario Actual" },
                        { key: "historial", label: "Historial Académico" },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`pb-2 border-b-4 ${
                                tab === t.key
                                    ? "border-blue-600 text-blue-600 font-semibold"
                                    : "border-transparent text-gray-500"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Contenido */}
                <div className="max-h-[400px] overflow-y-auto">
                    {tab === "info" && (
                        <div>
                            <p><strong>Nombre:</strong> {student.nombre}</p>
                            <p><strong>Código:</strong> {student.codigo}</p>
                            <p><strong>Programa:</strong> {student.programa}</p>
                            <p><strong>Correo:</strong> {student.correo}</p>
                            <p><strong>Teléfono:</strong> {student.telefono}</p>
                            <p><strong>Estado:</strong> {student.estado}</p>
                            <p><strong>Semestre:</strong> {student.semestre}</p>
                        </div>
                    )}

                    {tab === "estado" && (
                        <div>
                            <p><strong>Promedio actual:</strong> {student.promedio}</p>
                            <p>
                                <strong>Estado académico:</strong>{" "}
                                {student.promedio >= 4 ? "Excelente" : "Regular"}
                            </p>
                        </div>
                    )}

                    {tab === "horario" && (
                        <div>
                            {student.horarioActual.length > 0 ? (
                                <ul>
                                    {student.horarioActual.map((h, i) => (
                                        <li key={i}>
                                            <strong>{h.materia}</strong> — {h.dia}, {h.hora}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tiene horario asignado actualmente.</p>
                            )}
                        </div>
                    )}

                    {tab === "historial" && (
                        <div>
                            <ul>
                                {student.historial.map((h, i) => (
                                    <li key={i}>
                                        <strong>Periodo:</strong> {h.periodo} — Promedio: {h.promedio}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Botón cerrar */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeanStudentsModal;
