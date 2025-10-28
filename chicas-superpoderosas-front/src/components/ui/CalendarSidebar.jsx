import { MiniCalendar } from './mini-calendar';
import { Badge } from './badge';
import { Clock, MapPin } from 'lucide-react';
import type { ClassEvent } from './App';

interface CalendarSidebarProps {
    selectedDate?: number;
    onDateSelect?: (date: number) => void;
    upcomingClasses?: ClassEvent[];
}

export function CalendarSidebar({ selectedDate, onDateSelect, upcomingClasses = [] }: CalendarSidebarProps) {
    return (
        <div className="space-y-6">
            {/* Mini Calendar */}
            <MiniCalendar selectedDate={selectedDate} onDateSelect={onDateSelect} />

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-4">
                <h3 className="text-sm font-semibold text-[#100F0F] mb-4">
                    Próximas Clases
                </h3>

                {upcomingClasses.length > 0 ? (
                    <div className="space-y-3">
                        {upcomingClasses.slice(0, 4).map((cls) => (
                            <div
                                key={cls.id}
                                className="p-3 rounded-lg border border-[rgba(0,0,0,0.08)] hover:shadow-sm transition-shadow cursor-pointer"
                                style={{ borderLeftWidth: '3px', borderLeftColor: cls.color }}
                            >
                                <p className="text-sm font-semibold text-[#100F0F] mb-2 line-clamp-1">
                                    {cls.subject}
                                </p>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-[#666666] font-normal">
                                        <Clock className="h-3 w-3" />
                                        <span>{cls.startTime} - {cls.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#666666] font-normal">
                                        <MapPin className="h-3 w-3" />
                                        <span>{cls.room}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-[#666666] font-normal text-center py-4">
                        No hay clases próximas
                    </p>
                )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-4">
                <h3 className="text-sm font-semibold text-[#100F0F] mb-4">
                    Resumen Semanal
                </h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#666666] font-normal">Total de clases</span>
                        <Badge className="bg-[#F5F5F5] text-[#100F0F] border-0 font-semibold">
                            {upcomingClasses.length}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#666666] font-normal">Horas semanales</span>
                        <Badge className="bg-[#F5F5F5] text-[#100F0F] border-0 font-semibold">
                            {upcomingClasses.reduce((acc, cls) => {
                                const [startH, startM] = cls.startTime.split(':').map(Number);
                                const [endH, endM] = cls.endTime.split(':').map(Number);
                                const hours = (endH - startH) + (endM - startM) / 60;
                                return acc + hours;
                            }, 0).toFixed(0)}h
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#666666] font-normal">Materias activas</span>
                        <Badge className="bg-[#F5F5F5] text-[#100F0F] border-0 font-semibold">
                            {new Set(upcomingClasses.map(c => c.subject.split(' - ')[0])).size}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Color Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-4">
                <h3 className="text-sm font-semibold text-[#100F0F] mb-4">
                    Categorías
                </h3>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#FFD6D6]"></div>
                        <span className="text-xs text-[#666666] font-normal">Ingeniería</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#D3F9D8]"></div>
                        <span className="text-xs text-[#666666] font-normal">Matemáticas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#E0E7FF]"></div>
                        <span className="text-xs text-[#666666] font-normal">Ciencias</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#E9D5FF]"></div>
                        <span className="text-xs text-[#666666] font-normal">Complementarias</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
