import { useState } from 'react';
import { InstitutionalHeader } from '../ui/InstitutionalHeader';
import { RequestsSidebar } from '../ui/RequestsSidebar';
import { RequestsStats } from '../ui/RequestsStats';
import { RequestsTable } from '../ui/RequestsTable';
import { NewRequestDialog } from '../ui/NewRequestDialog.tsx';
import { RequestDetailsDialog } from '../ui/RequestDetailsDialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { AlertCircle, Plus, Search, Filter, CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data inicial
const initialMockRequests = [
    {
        id: '1',
        radicado: 'RAD-000001',
        student: {
            name: 'María García Pérez',
            code: '2020123456',
            program: 'Ingeniería de Sistemas'
        },
        type: 'Cambio de Grupo',
        created: '15/10/24',
        dueDate: '20/10/24',
        status: 'approved',
        priority: 1,
        description: 'Solicito cambio de grupo debido a conflicto de horarios con otra materia inscrita.',
        currentSubject: 'Estructuras de Datos - Grupo 01',
        suggestedChange: 'Estructuras de Datos - Grupo 02',
        semester: '2024-2',
        statusHistory: [
            { status: 'Solicitud creada', date: '15/10/24 10:30 AM' },
            { status: 'En revisión', date: '16/10/24 02:15 PM', user: 'Coordinación Académica' },
            { status: 'Aprobada', date: '18/10/24 11:00 AM', user: 'Decanatura' }
        ]
    },
    {
        id: '2',
        radicado: 'RAD-000002',
        student: {
            name: 'María García Pérez',
            code: '2020123456',
            program: 'Ingeniería de Sistemas'
        },
        type: 'Cambio de Materia',
        created: '18/10/24',
        dueDate: '25/10/24',
        status: 'pending',
        priority: 2,
        description: 'Solicito cambio de materia electiva por disponibilidad de cupos.',
        currentSubject: 'Inteligencia Artificial',
        suggestedChange: 'Machine Learning',
        semester: '2024-2',
        statusHistory: [
            { status: 'Solicitud creada', date: '18/10/24 09:00 AM' }
        ]
    },
    // ... agrega el resto de solicitudes aquí tal como estaban
];

export default function RequestsApp({ onNavigate }) {
    const [requests, setRequests] = useState(initialMockRequests);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSemester, setSelectedSemester] = useState('2024-2');
    const [currentPage, setCurrentPage] = useState(1);
    const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [connectionError, setConnectionError] = useState(false);

    const simulateConnectionError = false;

    const semesterFilteredRequests = selectedSemester === 'all'
        ? requests
        : requests.filter(req => req.semester === selectedSemester);

    const stats = {
        total: semesterFilteredRequests.length,
        approved: semesterFilteredRequests.filter(r => r.status === 'approved').length,
        pending: semesterFilteredRequests.filter(r => r.status === 'pending').length,
        rejected: semesterFilteredRequests.filter(r => r.status === 'rejected').length,
        review: semesterFilteredRequests.filter(r => r.status === 'review').length
    };

    const filteredRequests = semesterFilteredRequests.filter(req => {
        const matchesSearch =
            (req.radicado && req.radicado.toLowerCase().includes(searchQuery.toLowerCase())) ||
            req.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (req.description && req.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = selectedFilter === 'all' || req.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleCreateRequest = (data) => {
        const newId = (requests.length + 1).toString();
        const radicado = `RAD-${newId.padStart(6, '0')}`;

        const typeMap = {
            'cambio-grupo': 'Cambio de Grupo',
            'cambio-materia': 'Cambio de Materia',
            'adicion-materia': 'Adición de Materia',
            'retiro-materia': 'Retiro de Materia',
            'validacion': 'Validación de Materia'
        };

        const newRequest = {
            id: newId,
            radicado,
            student: {
                name: 'María García Pérez',
                code: '2020123456',
                program: 'Ingeniería de Sistemas'
            },
            type: typeMap[data.type] || data.type,
            created: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: '2-digit' }),
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: '2-digit' }),
            status: 'pending',
            priority: 2,
            description: data.observations,
            currentSubject: data.currentSubject,
            suggestedChange: data.suggestedChange,
            semester: selectedSemester,
            statusHistory: [
                {
                    status: 'Solicitud creada',
                    date: new Date().toLocaleDateString('es-CO') + ' ' + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
                }
            ]
        };

        setRequests([newRequest, ...requests]);
        setIsNewRequestDialogOpen(false);

        toast.success('¡Solicitud enviada con éxito!', {
            description: `Tu solicitud ha sido registrada con el número de radicado ${radicado}`,
            duration: 5000
        });
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsDetailsDialogOpen(true);
    };

    const semesters = ['2024-2', '2024-1', '2023-2', '2023-1'];

    if (simulateConnectionError || connectionError) {
        return (
            <div className="min-h-screen bg-background">
                <InstitutionalHeader onNavigate={onNavigate} />
                <div className="flex items-center justify-center h-[calc(100vh-73px)]">
                    <div className="text-center max-w-md mx-auto p-8">
                        <div className="bg-red-50 border-2 border-destructive rounded-xl p-6 mb-6">
                            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
                            <h2 className="text-foreground mb-2">
                                Error de Conexión
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                No fue posible cargar tus solicitudes. Intenta nuevamente.
                            </p>
                        </div>
                        <Button
                            onClick={() => setConnectionError(false)}
                            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                        >
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <InstitutionalHeader onNavigate={onNavigate} />

            <div className="flex">
                <RequestsSidebar onNavigate={onNavigate} />

                <main className="flex-1 p-6">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-foreground mb-1">
                                        Mis Solicitudes Académicas
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Crea y gestiona tus solicitudes académicas
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setIsNewRequestDialogOpen(true)}
                                    className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva Solicitud
                                </Button>
                            </div>

                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar por radicado, tipo o descripción..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-card border-border rounded-lg"
                                    />
                                </div>
                                <div className="w-[200px]">
                                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                        <SelectTrigger className="bg-card border-border rounded-lg">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Filtrar por semestre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos los semestres</SelectItem>
                                            {semesters.map(sem => (
                                                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <RequestsStats stats={stats} />

                        <div className="mb-6">
                            <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                                <TabsList className="bg-card border border-border p-1 rounded-lg">
                                    <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Todas ({stats.total})
                                    </TabsTrigger>
                                    <TabsTrigger value="pending" className="data-[state=active]:bg-[#FFA500] data-[state=active]:text-white">
                                        Pendientes ({stats.pending})
                                    </TabsTrigger>
                                    <TabsTrigger value="review" className="data-[state=active]:bg-[#0072F5] data-[state=active]:text-white">
                                        En Revisión ({stats.review})
                                    </TabsTrigger>
                                    <TabsTrigger value="approved" className="data-[state=active]:bg-success data-[state=active]:text-white">
                                        Aprobadas ({stats.approved})
                                    </TabsTrigger>
                                    <TabsTrigger value="rejected" className="data-[state=active]:bg-destructive data-[state=active]:text-white">
                                        Rechazadas ({stats.rejected})
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {filteredRequests.length > 0 ? (
                            <RequestsTable
                                requests={filteredRequests}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                onViewDetails={handleViewDetails}
                            />
                        ) : (
                            <div className="bg-card rounded-xl border border-border p-12 text-center">
                                <AlertCircle className="h-12 w-12 text-muted mx-auto mb-3" />
                                <h3 className="text-foreground mb-2">
                                    No se encontraron solicitudes
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera solicitud académica'}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <NewRequestDialog
                open={isNewRequestDialogOpen}
                onClose={() => setIsNewRequestDialogOpen(false)}
                onSubmit={handleCreateRequest}
            />

            <RequestDetailsDialog
                request={selectedRequest}
                open={isDetailsDialogOpen}
                onClose={() => {
                    setIsDetailsDialogOpen(false);
                    setSelectedRequest(null);
                }}
            />
        </div>
    );
}
