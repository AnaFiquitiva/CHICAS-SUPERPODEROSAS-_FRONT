// src/components/Deanery/DeanStudentsPage.jsx
import { useState } from "react";
import { getAllStudents, getStudentById } from "./DeanStudentsService";
import DeanStudentsModal from "./DeanStudentsModal";

const DeanStudentsPage = () => {
    const students = getAllStudents();
    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Información de Estudiantes</h1>

            <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
                <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="p-2 border">Código</th>
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Programa</th>
                    <th className="p-2 border">Estado</th>
                    <th className="p-2 border">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {students.map((s) => (
                    <tr key={s.id} className="text-center hover:bg-blue-50">
                        <td className="p-2 border">{s.codigo}</td>
                        <td className="p-2 border">{s.nombre}</td>
                        <td className="p-2 border">{s.programa}</td>
                        <td className="p-2 border">{s.estado}</td>
                        <td className="p-2 border">
                            <button
                                onClick={() => setSelectedStudent(getStudentById(s.id))}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Ver Perfil
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedStudent && (
                <DeanStudentsModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
};

export default DeanStudentsPage;
