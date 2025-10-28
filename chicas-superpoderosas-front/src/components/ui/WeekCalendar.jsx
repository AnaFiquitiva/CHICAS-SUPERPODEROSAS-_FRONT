import type { ClassEvent } from '../App';

interface WeekCalendarProps {
    classes: ClassEvent[];
    weekStart: number;
    onEventClick: (event: ClassEvent) => void;
    selectedEventId?: string;
}

const DAYS = [
    { short: 'LUN', full: 'Lunes', abbr: 'L' },
    { short: 'MAR', full: 'Martes', abbr: 'M' },
    { short: 'MIÉ', full: 'Miércoles', abbr: 'X' },
    { short: 'JUE', full: 'Jueves', abbr: 'J' },
    { short: 'VIE', full: 'Viernes', abbr: 'V' },
    { short: 'SÁB', full: 'Sábado', abbr: 'S' }
];

const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
];

export function WeekCalendar({ classes, weekStart, onEventClick, selectedEventId }: WeekCalendarProps) {
    const getEventPosition = (startTime: string, endTime: string) => {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        const baseHour = 6;
        const startMinutes = (startHour - baseHour) * 60 + startMin;
        const endMinutes = (endHour - baseHour) * 60 + endMin;
        const duration = endMinutes - startMinutes;

        return {
            top: (startMinutes / 60) * 70,
            height: (duration / 60) * 70
        };
    };

    const today = 23;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[900px]">
                    {/* Header */}
                    <div className="grid grid-cols-[70px_repeat(6,1fr)] border-b border-[rgba(0,0,0,0.08)] bg-[#FAFAFA]">
                        <div className="p-3"></div>
                        {DAYS.map((day, idx) => {
                            const date = weekStart + idx;
                            const isToday = date === today;
                            return (
                                <div
                                    key={day.short}
                                    className="p-3 text-center"
                                >
                                    <div className="text-xs text-[#666666] mb-1 font-normal">{day.short}</div>
                                    <div
                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-colors ${
                                            isToday
                                                ? 'bg-[#990000] text-white'
                                                : 'text-[#100F0F]'
                                        }`}
                                    >
                                        {date}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-[70px_repeat(6,1fr)]">
                            {/* Time Column */}
                            <div className="border-r border-[rgba(0,0,0,0.08)]">
                                {TIME_SLOTS.map((time) => (
                                    <div
                                        key={time}
                                        className="h-[70px] px-3 py-2 text-xs text-[#666666] font-normal border-b border-[rgba(0,0,0,0.08)]"
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>

                            {/* Day Columns */}
                            {DAYS.map((day, dayIdx) => {
                                const dayClasses = classes.filter((c) => c.day === dayIdx);

                                return (
                                    <div key={day.short} className="relative border-r border-[rgba(0,0,0,0.08)]">
                                        {/* Time Grid Lines */}
                                        {TIME_SLOTS.map((time) => (
                                            <div
                                                key={time}
                                                className="h-[70px] border-b border-[rgba(0,0,0,0.08)]"
                                            />
                                        ))}

                                        {/* Events */}
                                        <div className="absolute inset-0 p-1">
                                            {dayClasses.map((classEvent) => {
                                                const position = getEventPosition(classEvent.startTime, classEvent.endTime);
                                                const isSelected = selectedEventId === classEvent.id;

                                                return (
                                                    <button
                                                        key={classEvent.id}
                                                        onClick={() => onEventClick(classEvent)}
                                                        className={`absolute left-1 right-1 rounded-lg p-2 text-left transition-all hover:shadow-md group ${
                                                            isSelected ? 'ring-2 ring-[#990000] shadow-lg scale-[1.02]' : 'hover:scale-[1.01]'
                                                        }`}
                                                        style={{
                                                            backgroundColor: classEvent.color,
                                                            top: `${position.top}px`,
                                                            height: `${position.height}px`,
                                                            minHeight: '50px'
                                                        }}
                                                    >
                                                        <div className="text-xs text-[#100F0F] font-semibold mb-1 line-clamp-2">
                                                            {classEvent.subject}
                                                        </div>
                                                        <div className="text-[10px] text-[#666666] font-normal">
                                                            {classEvent.startTime} - {classEvent.endTime}
                                                        </div>
                                                        <div className="text-[10px] text-[#666666] font-normal flex items-center gap-1 mt-1">
                                                            <span>📍</span>
                                                            {classEvent.room}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-4">
                {DAYS.map((day, dayIdx) => {
                    const dayClasses = classes.filter((c) => c.day === dayIdx);

                    if (dayClasses.length === 0) return null;

                    const date = weekStart + dayIdx;
                    const isToday = date === today;

                    return (
                        <div key={day.short} className="space-y-2">
                            <div className="flex items-center gap-2 pb-2 border-b border-[rgba(0,0,0,0.08)]">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                                        isToday ? 'bg-[#990000] text-white' : 'bg-[#F5F5F5] text-[#100F0F]'
                                    }`}
                                >
                                    {date}
                                </div>
                                <span className="text-sm font-semibold text-[#100F0F]">{day.full}</span>
                            </div>
                            <div className="space-y-2">
                                {dayClasses
                                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                    .map((cls) => (
                                        <button
                                            key={cls.id}
                                            onClick={() => onEventClick(cls)}
                                            className="w-full p-3 rounded-lg text-left transition-all hover:shadow-md"
                                            style={{ backgroundColor: cls.color }}
                                        >
                                            <p className="text-sm font-semibold text-[#100F0F] mb-1">
                                                {cls.subject}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-[#666666] font-normal">
                                                <span>🕐 {cls.startTime} - {cls.endTime}</span>
                                                <span>📍 {cls.room}</span>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
