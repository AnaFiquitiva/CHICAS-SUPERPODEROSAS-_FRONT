import React, { useState } from "react";
import { Search, Filter, Clock, CheckCircle, XCircle } from "lucide-react";

export default function RequestManagementPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const requests = [
        { id: 1, student: "Juan Pérez", type: "Cambio de grupo", date: "2025-10-22", status: "pending" },
        { id: 2, student: "Laura Gómez", type: "Cancelación asignatura", date: "2025-10-21", status: "approved" },
        { id: 3, student: "Andrés Silva", type: "Adición asignatura", date: "2025-10-20", status: "rejected" },
    ];

    const filteredRequests = requests.filter((req) => {
        const matchesSearch =
            req.student.toLowerCase().includes(search.toLowerCase()) ||
            req.type.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || req.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <h1 className="text-3xl font-bold text-red-800 mb-8">🗂️ Request Management</h1>

            {/* Search and Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
                <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-md flex-1 min-w-[260px]">
                    <Search className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by student or type..."
                        className="outline-none flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-md">
                    <Filter className="text-gray-500 mr-2" />
                    <select
                        className="outline-none bg-transparent"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-red-900 text-white">
                    <tr>
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Student</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((req) => (
                        <tr key={req.id} className="border-b hover:bg-gray-100">
                            <td className="p-3">{req.id}</td>
                            <td className="p-3 font-medium">{req.student}</td>
                            <td className="p-3">{req.type}</td>
                            <td className="p-3">{req.date}</td>
                            <td className="p-3">
                                {req.status === "pending" && (
                                    <span className="flex items-center text-yellow-600 font-semibold">
                      <Clock size={18} className="mr-1" /> Pending
                    </span>
                                )}
                                {req.status === "approved" && (
                                    <span className="flex items-center text-green-600 font-semibold">
                      <CheckCircle size={18} className="mr-1" /> Approved
                    </span>
                                )}
                                {req.status === "rejected" && (
                                    <span className="flex items-center text-red-600 font-semibold">
                      <XCircle size={18} className="mr-1" /> Rejected
                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredRequests.length === 0 && (
                    <p className="p-6 text-center text-gray-500">No requests found.</p>
                )}
            </div>
        </div>
    );
}
