import { Badge } from './badge';
import { Button } from './button';
import { Eye, Calendar, FileText } from 'lucide-react';
import { AcademicRequest } from '../Student/RequestsApp';

interface RequestsTableProps {
    requests: AcademicRequest[];
    currentPage: number;
    onPageChange: (page: number) => void;
    onViewDetails: (request: AcademicRequest) => void;
}

export function RequestsTable({
                                  requests,
                                  currentPage,
                                  onPageChange,
                                  onViewDetails
                              }: RequestsTableProps) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRequests = requests.slice(startIndex, endIndex);

    const getStatusConfig = (status: AcademicRequest['status']) => {
        switch (status) {
            case 'approved':
                return {
                    label: 'Aprobada',
                    className: 'bg-green-50 border-success text-success'
                };
            case 'pending':
                return {
                    label: 'Pendiente',
                    className: 'bg-orange-50 border-[#FFA500] text-[#FFA500]'
                };
            case 'rejected':
                return {
                    label: 'Rechazada',
                    className: 'bg-pink-50 border-destructive text-destructive'
                };
            case 'review':
                return {
                    label: 'En Revisión',
                    className: 'bg-blue-50 border-[#0072F5] text-[#0072F5]'
                };
        }
    };

    const getPriorityConfig = (priority: number) => {
        if (priority === 1) {
            return {
                label: 'Alta',
                className: 'bg-red-100 text-red-700 border-red-300'
            };
        } else if (priority === 2) {
            return {
                label: 'Media',
                className: 'bg-yellow-100 text-yellow-700 border-yellow-300'
            };
        } else {
            return {
                label: 'Baja',
                className: 'bg-gray-100 text-gray-700 border-gray-300'
            };
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                    <tr>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Radicado
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Tipo
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Asunto
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Fecha
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Vencimiento
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Prioridad
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Estado
                        </th>
                        <th className="text-left p-4 text-sm text-muted-foreground">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {currentRequests.map((request) => {
                        const statusConfig = getStatusConfig(request.status);
                        const priorityConfig = getPriorityConfig(request.priority);
                        return (
                            <tr key={request.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-foreground">
                        {request.radicado}
                      </span>
                                    </div>
                                </td>
                                <td className="p-4">
                    <span className="text-sm text-foreground">
                      {request.type}
                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="max-w-[200px]">
                                        <p className="text-sm text-foreground truncate">
                                            {request.currentSubject}
                                        </p>
                                        {request.suggestedChange && (
                                            <p className="text-xs text-muted-foreground truncate">
                                                → {request.suggestedChange}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {request.created}
                                    </div>
                                </td>
                                <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {request.dueDate}
                    </span>
                                </td>
                                <td className="p-4">
                                    <Badge
                                        variant="outline"
                                        className={`border ${priorityConfig.className}`}
                                    >
                                        {priorityConfig.label}
                                    </Badge>
                                </td>
                                <td className="p-4">
                                    <Badge
                                        variant="outline"
                                        className={`border-2 ${statusConfig.className}`}
                                    >
                                        {statusConfig.label}
                                    </Badge>
                                </td>
                                <td className="p-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onViewDetails(request)}
                                        className="hover:bg-primary/10 rounded-lg"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ver
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-t border-border p-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {startIndex + 1} - {Math.min(endIndex, requests.length)} de {requests.length} solicitudes
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg"
                        >
                            Anterior
                        </Button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => onPageChange(page)}
                                    className={`rounded-lg ${
                                        currentPage === page
                                            ? 'bg-primary text-white hover:bg-primary/90'
                                            : ''
                                    }`}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-lg"
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
