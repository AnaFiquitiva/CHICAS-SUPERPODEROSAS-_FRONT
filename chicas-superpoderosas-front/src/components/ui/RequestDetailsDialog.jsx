import {
    Calendar,
    FileText,
    User,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { Separator } from './separator';
import type { AcademicRequest } from '../Student/RequestsApp';

interface RequestDetailsDialogProps {
    request: AcademicRequest | null;
    open: boolean;
    onClose: () => void;
}

export function RequestDetailsDialog({ request, open, onClose }: RequestDetailsDialogProps) {
    if (!request) return null;

    const getStatusConfig = (status: AcademicRequest['status']) => {
        switch (status) {
            case 'approved':
                return {
                    label: 'Aprobada',
                    className: 'bg-green-50 text-success border-success',
                    icon: CheckCircle2,
                    color: '#17C964'
                };
            case 'pending':
                return {
                    label: 'Pendiente',
                    className: 'bg-orange-50 text-[#FFA500] border-[#FFA500]',
                    icon: Clock,
                    color: '#FFA500'
                };
            case 'rejected':
                return {
                    label: 'Rechazada',
                    className: 'bg-pink-50 text-destructive border-destructive',
                    icon: XCircle,
                    color: '#F31260'
                };
            case 'review':
                return {
                    label: 'En Revisión',
                    className: 'bg-blue-50 text-[#0072F5] border-[#0072F5]',
                    icon: AlertCircle,
                    color: '#0072F5'
                };
        }
    };

    const statusConfig = getStatusConfig(request.status);
    const StatusIcon = statusConfig.icon;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                        Detalles de la Solicitud
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header con Estado */}
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className="p-2 rounded-lg"
                                    style={{ backgroundColor: `${statusConfig.color}20` }}
                                >
                                    <StatusIcon
                                        className="h-5 w-5"
                                        style={{ color: statusConfig.color }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Número de Radicado</p>
                                    <p className="text-foreground">
                                        {request.radicado || `RAD-${request.id.padStart(6, '0')}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${statusConfig.className} border px-4 py-1`}
                        >
                            {statusConfig.label}
                        </Badge>
                    </div>

                    <Separator />

                    {/* Información del Estudiante */}
                    <div className="space-y-3">
                        <h3 className="text-foreground flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Información del Estudiante
                        </h3>
                        <div className="grid grid-cols-2 gap-4 bg-secondary rounded-lg p-4">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Nombre Completo</p>
                                <p className="text-sm text-foreground">{request.student.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Código Estudiantil</p>
                                <p className="text-sm text-foreground">{request.student.code}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-muted-foreground mb-1">Programa Académico</p>
                                <p className="text-sm text-foreground">{request.student.program}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Tipo de Solicitud */}
                    <div className="space-y-3">
                        <h3 className="text-foreground flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Tipo de Solicitud
                        </h3>
                        <div className="bg-secondary rounded-lg p-4">
                            <p className="text-sm text-foreground">{request.type}</p>
                        </div>
                    </div>

                    {/* Detalles del Cambio */}
                    {request.currentSubject && request.suggestedChange && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <h3 className="text-foreground">Detalle del Cambio Solicitado</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-pink-50 border border-destructive rounded-lg p-4">
                                        <p className="text-xs text-muted-foreground mb-1">Origen</p>
                                        <p className="text-sm text-foreground">
                                            {request.currentSubject}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    <div className="flex-1 bg-green-50 border border-success rounded-lg p-4">
                                        <p className="text-xs text-muted-foreground mb-1">Destino</p>
                                        <p className="text-sm text-foreground">
                                            {request.suggestedChange}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Observaciones */}
                    {request.description && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <h3 className="text-foreground">Observaciones</h3>
                                <div className="bg-secondary rounded-lg p-4">
                                    <p className="text-sm text-foreground whitespace-pre-wrap">
                                        {request.description}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Fechas */}
                    <Separator />
                    <div className="space-y-3">
                        <h3 className="text-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Fechas Importantes
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary rounded-lg p-4">
                                <p className="text-xs text-muted-foreground mb-1">Fecha de Creación</p>
                                <p className="text-sm text-foreground">{request.created}</p>
                            </div>
                            <div className="bg-secondary rounded-lg p-4">
                                <p className="text-xs text-muted-foreground mb-1">Fecha Límite</p>
                                <p className="text-sm text-foreground">{request.dueDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Motivo de Rechazo (si aplica) */}
                    {request.status === 'rejected' && request.rejectionReason && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <h3 className="text-destructive flex items-center gap-2">
                                    <XCircle className="h-4 w-4" />
                                    Motivo del Rechazo
                                </h3>
                                <div className="bg-pink-50 border border-destructive rounded-lg p-4">
                                    <p className="text-sm text-foreground">
                                        {request.rejectionReason}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Historial de Estados */}
                    {request.statusHistory && request.statusHistory.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <h3 className="text-foreground flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Historial de Estados
                                </h3>
                                <div className="space-y-2">
                                    {request.statusHistory.map((history, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-secondary rounded-lg p-3"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                            <div className="flex-1">
                                                <p className="text-sm text-foreground">
                                                    {history.status}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {history.date} {history.user && `- ${history.user}`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}