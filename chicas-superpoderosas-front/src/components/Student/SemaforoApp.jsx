import { useState } from 'react';
import { InstitutionalHeader } from '../ui/InstitutionalHeader';
import { Search, Filter, CheckCircle2, Lock, Circle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import { Separator } from '../ui/separator';

interface Subject {
    id: string;
    code: string;
    name: string;
    credits: number;
    status: 'approved' | 'current' | 'available' | 'locked' | 'failed';
    semester: number;
    prerequisites?: string[];
    grade?: number;
    period?: string;
}

interface SemaforoAppProps {
    onNavigate: (view: 'schedule' | 'requests' | 'semaforo') => void;
}

// Mock data
const mockSubjects: Subject[] = [
    // Solo algunos ejemplos por simplicidad
    { id: '1', code: 'MAT-1101', name: 'Cálculo Diferencial', credits: 4, status: 'approved', semester: 1, grade: 4.2, period: '2020-1' },
    { id: '2', code: 'FIS-1101', name: 'Física I', credits: 4, status: 'approved', semester: 1, grade: 3.8, period: '2020-1' },
    { id: '26', code: 'SIS-3104', name: 'Ingeniería de Software II', credits: 4, status: 'current', semester: 6, prerequisites: ['21'] },
];

export default function SemaforoApp({ onNavigate }: SemaforoAppProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const getStatusConfig = (status: Subject['status']) => {
        switch (status) {
            case 'approved':
                return { label: 'Aprobada', className: 'bg-green-50 border-success text-success', icon: CheckCircle2 };
            case 'current':
                return { label: 'Cursando', className: 'bg-blue-50 border-[#0072F5] text-[#0072F5]', icon: Circle };
            case 'available':
                return { label: 'Disponible', className: 'bg-orange-50 border-[#FFA500] text-[#FFA500]', icon: Circle };
            case 'locked':
                return { label: 'Bloqueada', className: 'bg-gray-100 border-muted-foreground text-muted-foreground', icon: Lock };
            case 'failed':
                return { label: 'Reprobada', className: 'bg-pink-50 border-destructive text-destructive', icon: XCircle };
        }
    };

    const subjectsBySemester: Record<number, Subject[]> = mockSubjects.reduce(
        (acc, subject) => {
            if (!acc[subject.semester]) acc[subject.semester] = [];
            acc[subject.semester].push(subject);
            return acc;
        },
        {}
    );


    const semesters = Object.keys(subjectsBySemester).map(Number).sort();

    const filteredSubjects = mockSubjects.filter(subject => {
        const matchesSearch =
            subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'all' || subject.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const handleSubjectClick = (subject: Subject) => {
        setSelectedSubject(subject);
        setIsDetailsOpen(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <InstitutionalHeader onNavigate={onNavigate} />

            <main className="p-6">
                <div className="max-w-[1600px] mx-auto">
                    {/* Search & Filter */}
                    <div className="flex gap-3 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar materia por nombre o código..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border rounded-lg"
                            />
                        </div>
                        <div className="w-[200px]">
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="bg-card border-border rounded-lg">
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="approved">Aprobadas</SelectItem>
                                    <SelectItem value="current">Cursando</SelectItem>
                                    <SelectItem value="available">Disponibles</SelectItem>
                                    <SelectItem value="locked">Bloqueadas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Malla Curricular */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {semesters.map((semester) => (
                            <div key={semester} className="flex flex-col">
                                <div className="bg-primary text-white rounded-lg p-3 mb-4 text-center">
                                    <p className="text-sm">Semestre {semester}</p>
                                    <p className="text-xs opacity-90 mt-1">
                                        {subjectsBySemester[semester].reduce((sum, s) => sum + s.credits, 0)} créditos
                                    </p>
                                </div>
                                <div className="space-y-3 flex-1">
                                    {subjectsBySemester[semester]
                                        .filter(subject => filteredSubjects.includes(subject))
                                        .map(subject => {
                                            const statusConfig = getStatusConfig(subject.status);
                                            const StatusIcon = statusConfig.icon;
                                            return (
                                                <button
                                                    key={subject.id}
                                                    onClick={() => handleSubjectClick(subject)}
                                                    className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md ${statusConfig.className}`}
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <p className="text-xs">{subject.code}</p>
                                                        <StatusIcon className="h-4 w-4 flex-shrink-0" />
                                                    </div>
                                                    <p className="text-sm mb-1 line-clamp-2">{subject.name}</p>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span>{subject.credits} créditos</span>
                                                        {subject.grade && (
                                                            <span className="px-2 py-0.5 bg-white/50 rounded">
                                {subject.grade.toFixed(1)}
                              </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Dialog Detalles */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-2xl">
                    {selectedSubject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-foreground">
                                    Detalles de la Materia
                                </DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    {selectedSubject.code} - {selectedSubject.name}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Estado</span>
                                    <Badge variant="outline" className={getStatusConfig(selectedSubject.status).className}>
                                        {getStatusConfig(selectedSubject.status).label}
                                    </Badge>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Código</p>
                                        <p className="text-sm text-foreground">{selectedSubject.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Créditos</p>
                                        <p className="text-sm text-foreground">{selectedSubject.credits}</p>
                                    </div>
                                    {selectedSubject.grade && (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Calificación</p>
                                            <p className="text-sm text-foreground">{selectedSubject.grade.toFixed(1)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
