import { useState } from 'react';
import { InstitutionalHeader } from '../ui/InstitutionalHeader';
import { WeekCalendar } from '../ui/WeekCalendar';
import { SemesterSelector } from '../ui/SemesterSelector';
import { ClassDetails } from '../ui/ClassDetails';
import { CalendarSidebar } from '../ui/CalendarSidebar';
import { Button } from '../ui/button';
import type { ClassEvent } from '../App';
import {ScheduleIcon} from "../ui/Icons";
import { ChevronLeft, ChevronRight} from 'lucide-react';
// Tipos de datos
export interface SemesterData {
    period: string;
    year: number;
    semester: number;
    modality: string;
    schedule: string;
    currentSemester: number;
    classes: ClassEvent[];
}

// Datos mock
const mockSemesters: SemesterData[] = [
    {
        period: '2024-2',
        year: 2024,
        semester: 2,
        modality: 'Presencial',
        schedule: 'Diurna',
        currentSemester: 5,
        classes: [
            {
                id: '1',
                subject: 'Estructuras de Datos',
                code: 'ICOM-2031',
                startTime: '08:00',
                endTime: '10:00',
                room: 'H-201',
                day: 0,
                color: '#FFD6D6',
                professor: 'Dr. García Rodríguez',
                credits: 3
            },
            {
                id: '2',
                subject: 'Base de Datos',
                code: 'ICOM-2045',
                startTime: '10:00',
                endTime: '12:00',
                room: 'H-305',
                day: 0,
                color: '#FFE8CC',
                professor: 'Dra. Martínez López',
                credits: 3
            },
            {
                id: '3',
                subject: 'Cálculo Vectorial',
                code: 'MATE-2201',
                startTime: '08:00',
                endTime: '10:00',
                room: 'H-102',
                day: 1,
                color: '#D3F9D8',
                professor: 'Dr. López Pérez',
                credits: 4
            },
            {
                id: '4',
                subject: 'Estructuras de Datos - Lab',
                code: 'ICOM-2031L',
                startTime: '11:00',
                endTime: '13:00',
                room: 'Lab-401',
                day: 1,
                color: '#FFD6D6',
                professor: 'Dr. García Rodríguez',
                credits: 1
            },
            {
                id: '5',
                subject: 'Física II',
                code: 'FISI-2101',
                startTime: '14:00',
                endTime: '16:00',
                room: 'H-208',
                day: 2,
                color: '#E0E7FF',
                professor: 'Dr. Rodríguez Santos',
                credits: 3
            },
            {
                id: '6',
                subject: 'Base de Datos - Lab',
                code: 'ICOM-2045L',
                startTime: '09:00',
                endTime: '11:00',
                room: 'Lab-302',
                day: 2,
                color: '#FFE8CC',
                professor: 'Dra. Martínez López',
                credits: 1
            },
            {
                id: '7',
                subject: 'Ingeniería de Software I',
                code: 'ICOM-3011',
                startTime: '08:00',
                endTime: '10:00',
                room: 'H-401',
                day: 3,
                color: '#E9D5FF',
                professor: 'Dr. Ramírez Castro',
                credits: 3
            },
            {
                id: '8',
                subject: 'Cálculo Vectorial',
                code: 'MATE-2201',
                startTime: '13:00',
                endTime: '15:00',
                room: 'H-102',
                day: 3,
                color: '#D3F9D8',
                professor: 'Dr. López Pérez',
                credits: 4
            },
            {
                id: '9',
                subject: 'Física II - Lab',
                code: 'FISI-2101L',
                startTime: '08:00',
                endTime: '10:00',
                room: 'Lab-205',
                day: 4,
                color: '#E0E7FF',
                professor: 'Dr. Rodríguez Santos',
                credits: 1
            },
            {
                id: '10',
                subject: 'Ingeniería de Software I',
                code: 'ICOM-3011',
                startTime: '14:00',
                endTime: '16:00',
                room: 'H-401',
                day: 4,
                color: '#E9D5FF',
                professor: 'Dr. Ramírez Castro',
                credits: 3
            }
        ]
    },
    {
        period: '2024-1',
        year: 2024,
        semester: 1,
        modality: 'Presencial',
        schedule: 'Diurna',
        currentSemester: 4,
        classes: [
            {
                id: '11',
                subject: 'Programación Orientada a Objetos',
                code: 'ICOM-2020',
                startTime: '08:00',
                endTime: '10:00',
                room: 'H-301',
                day: 0,
                color: '#FFD6D6',
                professor: 'Ing. Torres',
                credits: 3
            },
            {
                id: '12',
                subject: 'Matemáticas Discretas',
                code: 'MATE-2101',
                startTime: '10:00',
                endTime: '12:00',
                room: 'H-205',
                day: 0,
                color: '#D3F9D8',
                professor: 'Dr. Silva',
                credits: 3
            }
        ]
    }
];

interface ScheduleAppProps {
    onNavigate: (view: 'schedule' | 'requests' | 'semaforo') => void;
}

export default function ScheduleApp({ onNavigate }: ScheduleAppProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('2024-2');
    const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);
    const [selectedDate, setSelectedDate] = useState(23);
    const [currentWeek, setCurrentWeek] = useState({ start: 21, month: 'Octubre', year: 2024 });

    const currentSemesterData = mockSemesters.find(s => s.period === selectedPeriod);

    // Get today's classes for sidebar
    const todayClasses = currentSemesterData?.classes.filter(c => {
        const dayOfWeek = new Date(2024, 9, selectedDate).getDay();
        return c.day === (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    }) || [];

    const handlePrevWeek = () => {
        setCurrentWeek(prev => ({
            ...prev,
            start: Math.max(1, prev.start - 7)
        }));
    };

    const handleNextWeek = () => {
        setCurrentWeek(prev => ({
            ...prev,
            start: Math.min(25, prev.start + 7)
        }));
    };

    const handleToday = () => {
        setCurrentWeek({ start: 21, month: 'Octubre', year: 2024 });
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* Header Institucional */}
            <InstitutionalHeader onNavigate={onNavigate} />

            {/* Contenedor Principal */}
            <div className="max-w-[1600px] mx-auto px-6 py-6">
                {/* Título y Selector de Periodo */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#990000] p-3 rounded-xl">
                            <ScheduleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#100F0F]">Horario de Clases</h1>
                            <p className="text-sm text-[#666666] font-normal">
                                Consulta tu horario académico
                            </p>
                        </div>
                    </div>

                    <SemesterSelector
                        periods={mockSemesters.map(s => s.period)}
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={setSelectedPeriod}
                        semesterData={currentSemesterData}
                    />
                </div>

                {/* Barra de Navegación */}
                <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-[#100F0F]">
                                {currentWeek.month} {currentWeek.year}
                            </h2>
                            <Button
                                onClick={handleToday}
                                className="bg-[#990000] hover:bg-[#7D0000] text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Hoy
                            </Button>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handlePrevWeek}
                                    className="h-9 w-9 rounded-lg hover:bg-[#F5F5F5]"
                                >
                                    <ChevronLeft className="h-5 w-5 text-[#666666]" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleNextWeek}
                                    className="h-9 w-9 rounded-lg hover:bg-[#F5F5F5]"
                                >
                                    <ChevronRight className="h-5 w-5 text-[#666666]" />
                                </Button>
                            </div>
                        </div>

                        <div className="text-sm text-[#666666] font-normal">
                            {currentSemesterData && (
                                <span>
                  {currentSemesterData.classes.length > 0
                      ? `${new Set(currentSemesterData.classes.map(c => c.subject.split(' - ')[0])).size} materias inscritas`
                      : 'Sin materias inscritas'}
                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vista de Calendario */}
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_380px] gap-6">
                    {/* Sidebar con Mini Calendario */}
                    <div className="hidden lg:block">
                        <CalendarSidebar
                            selectedDate={selectedDate}
                            onDateSelect={setSelectedDate}
                            upcomingClasses={todayClasses}
                        />
                    </div>

                    {/* Calendario Principal */}
                    <div>
                        {currentSemesterData && currentSemesterData.classes.length > 0 ? (
                            <WeekCalendar
                                classes={currentSemesterData.classes}
                                weekStart={currentWeek.start}
                                onEventClick={setSelectedEvent}
                                selectedEventId={selectedEvent?.id}
                            />
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <ScheduleIcon className="h-16 w-16 text-[#E5E5E5] mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-[#100F0F] mb-2">
                                        No tienes clases registradas
                                    </h3>
                                    <p className="text-sm text-[#666666] font-normal">
                                        No hay materias inscritas para el periodo {selectedPeriod}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Panel de Detalles */}
                    {selectedEvent ? (
                        <ClassDetails
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                        />
                    ) : (
                        <div className="hidden lg:block">
                            <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-8 text-center">
                                <ScheduleIcon className="h-12 w-12 text-[#E5E5E5] mx-auto mb-3" />
                                <p className="text-sm text-[#666666] font-normal">
                                    Selecciona una clase para ver los detalles
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
