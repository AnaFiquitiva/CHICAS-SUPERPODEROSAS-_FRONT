// DeanStudentsTable.jsx
import React from "react";

const DeanStudentsTable = ({ students }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-xl bg-white">
            <table className="min-w-full border-collapse">
                <thead className="bg-red-700 text-white">
                <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Código</th>
                    <th className="px-4 py-2 text-left">Programa</th>
                    <th className="px-4 py-2 text-left">Promedio</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                </tr>
                </thead>
                <tbody>
                {students.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{s.nombre}</td>
                        <td className="px-4 py-2">{s.codigo}</td>
                        <td className="px-4 py-2">{s.programa}</td>
                        <td className="px-4 py-2">{s.promedio}</td>
                        <td className="px-4 py-2">{s.estado}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeanStudentsTable;
