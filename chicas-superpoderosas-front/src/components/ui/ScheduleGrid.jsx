import { Card } from './card';
import type { ClassBlock } from '../App';

interface ScheduleGridProps {
    classes: ClassBlock[];
}

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
];

export function ScheduleGrid({ classes }: ScheduleGridProps) {
    // Función para calcular la posición y altura del bloque
    const getBlockPosition = (startTime: string, endTime: string) => {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);

        const startSlot = TIME_SLOTS.findIndex(slot => {
            const slotHour = parseInt(slot.split(':')[0]);
            return slotHour === startHour;
        });

        const startOffset = startMinute / 60;
        const duration = (endHour - startHour) + (endMinute - startMinute) / 60;

        return {
            top: startSlot + startOffset,
            height: duration
        };
    };

    return (
        <Card className="bg-white shadow-lg overflow-hidden">
            {/* Vista Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[800px] p-4">
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-1">
                        {/* Header con días */}
                        <div className="bg-gray-50 p-2"></div>
                        {DAYS.map((day) => (
                            <div
                                key={day}
                                className="bg-[#003876] text-white p-3 text-center rounded-t-lg"
                            >
                                <span className="text-sm">{day}</span>
                            </div>
                        ))}

                        {/* Filas de tiempo */}
                        {TIME_SLOTS.map((time, timeIdx) => (
                            <div key={time} className="contents">
                                {/* Columna de tiempo */}
                                <div className="bg-gray-50 p-2 text-xs text-gray-600 text-right border-r border-gray-200 flex items-start">
                                    {time}
                                </div>

                                {/* Columnas de días */}
                                {DAYS.map((day, dayIdx) => (
                                    <div
                                        key={`${day}-${time}`}
                                        className="relative border border-gray-200 bg-gray-50/50 min-h-[60px]"
                                        style={{ gridRow: timeIdx + 2 }}
                                    >
                                        {/* Renderizar bloques de clases */}
                                        {timeIdx === 0 &&
                                            classes
                                                .filter((cls) => cls.day === dayIdx)
                                                .map((cls) => {
                                                    const position = getBlockPosition(cls.startTime, cls.endTime);
                                                    return (
                                                        <div
                                                            key={cls.id}
                                                            className="absolute left-0 right-0 mx-1 rounded-lg p-2 shadow-md border-l-4 overflow-hidden"
                                                            style={{
                                                                backgroundColor: cls.color,
                                                                borderLeftColor: cls.color,
                                                                top: `${position.top * 60}px`,
                                                                height: `${position.height * 60 - 4}px`,
                                                                zIndex: 10,
                                                            }}
                                                        >
                                                            <div className="text-white">
                                                                <p className="text-xs line-clamp-2">{cls.subject}</p>
                                                                <p className="text-[10px] mt-1 opacity-90">
                                                                    {cls.startTime} - {cls.endTime}
                                                                </p>
                                                                <p className="text-[10px] opacity-90 flex items-center gap-1 mt-1">
                                                                    <MapPin className="h-3 w-3" />
                                                                    {cls.room}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vista Mobile - Lista de clases por día */}
            <div className="md:hidden p-4 space-y-4">
                {DAYS.map((day, dayIdx) => {
                    const dayClasses = classes.filter((cls) => cls.day === dayIdx);

                    if (dayClasses.length === 0) return null;

                    return (
                        <div key={day} className="space-y-2">
                            <div className="bg-[#003876] text-white px-4 py-2 rounded-lg">
                                <h3 className="text-sm">{day}</h3>
                            </div>
                            <div className="space-y-2">
                                {dayClasses
                                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                    .map((cls) => (
                                        <div
                                            key={cls.id}
                                            className="p-3 rounded-lg border-l-4 shadow-sm"
                                            style={{
                                                backgroundColor: `${cls.color}15`,
                                                borderLeftColor: cls.color,
                                            }}
                                        >
                                            <p className="text-sm text-gray-900">{cls.subject}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                            {cls.startTime} - {cls.endTime}
                        </span>
                                                <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                                                    {cls.room}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function MapPin({ className }: { className?: string }) {
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function Clock({ className }: { className?: string }) {
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
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
