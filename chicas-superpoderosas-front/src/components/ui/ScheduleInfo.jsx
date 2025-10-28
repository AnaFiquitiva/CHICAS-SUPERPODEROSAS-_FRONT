import { Card } from './card';
import { GraduationCap, BookOpen, Clock, MapPin } from 'lucide-react';
import type { SemesterData } from '../App';

interface ScheduleInfoProps {
    data: SemesterData;
}

export function ScheduleInfo({ data }: ScheduleInfoProps) {
    return (
        <Card className="p-6 bg-white shadow-lg sticky top-4">
            <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg text-gray-900 mb-1">Información del Periodo</h3>
                <p className="text-sm text-gray-600">Detalles académicos actuales</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <Calendar className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Año y Periodo</p>
                        <p className="text-sm text-gray-900">{data.year} - {data.semester}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                        <GraduationCap className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Semestre Cursado</p>
                        <p className="text-sm text-gray-900">{data.currentSemester}° Semestre</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg mt-1">
                        <BookOpen className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Modalidad</p>
                        <p className="text-sm text-gray-900">{data.modality}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg mt-1">
                        <Clock className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Jornada</p>
                        <p className="text-sm text-gray-900">{data.schedule}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg mt-1">
                        <MapPin className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Materias Inscritas</p>
                        <p className="text-sm text-gray-900">
                            {new Set(data.classes.map(c => c.subject)).size} asignaturas
                        </p>
                    </div>
                </div>
            </div>

            {/* Leyenda de colores */}
            {data.classes.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-3">Materias:</p>
                    <div className="space-y-2">
                        {Array.from(new Set(data.classes.map(c => ({ name: c.subject, color: c.color })))).map((subject, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded"
                                    style={{ backgroundColor: subject.color }}
                                />
                                <span className="text-xs text-gray-700">{subject.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}

function Calendar({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}
