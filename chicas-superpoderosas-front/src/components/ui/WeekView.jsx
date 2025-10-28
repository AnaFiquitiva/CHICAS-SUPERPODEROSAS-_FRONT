import type { ClassEvent } from '../App';

interface WeekViewProps {
    classes: ClassEvent[];
    weekStart: number;
    onEventClick: (event: ClassEvent) => void;
    selectedEventId?: string;
}

const DAYS = [
    { name: 'mon', full: 'Monday' },
    { name: 'tue', full: 'Tuesday' },
    { name: 'wed', full: 'Wednesday' },
    { name: 'thu', full: 'Thursday' },
    { name: 'fri', full: 'Friday' },
    { name: 'sat', full: 'Saturday' },
    { name: 'sun', full: 'Sunday' }
];

const TIME_SLOTS = [
    '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm'
];

export function WeekView({ classes, weekStart, onEventClick, selectedEventId }: WeekViewProps) {
    const getEventPosition = (startTime: string, endTime: string) => {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        const startMinutes = (startHour - 8) * 60 + startMin;
        const endMinutes = (endHour - 8) * 60 + endMin;
        const duration = endMinutes - startMinutes;

        return {
            top: (startMinutes / 60) * 100,
            height: (duration / 60) * 100
        };
    };

    return (
        <div className="p-6">
            {/* Week Header */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-3 mb-4">
                <div></div>
                {DAYS.map((day, idx) => {
                    const date = weekStart + idx;
                    const isToday = date === 20;
                    return (
                        <div
                            key={day.name}
                            className={`text-center rounded-2xl py-3 px-4 ${
                                isToday ? 'bg-white/60 backdrop-blur-sm' : ''
                            }`}
                        >
                            <div className="text-xs text-gray-600 mb-1">{day.name}</div>
                            <div
                                className={`text-2xl ${
                                    isToday
                                        ? 'bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto'
                                        : 'text-gray-900'
                                }`}
                            >
                                {date}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Week Grid */}
            <div className="relative">
                <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-3">
                    {/* Time Column */}
                    <div className="space-y-[100px]">
                        {TIME_SLOTS.map((time) => (
                            <div key={time} className="text-xs text-gray-500 -mt-2">
                                {time}
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    {DAYS.map((day, dayIdx) => {
                        const dayClasses = classes.filter((c) => c.day === dayIdx);

                        return (
                            <div key={day.name} className="relative">
                                {/* Time Grid Lines */}
                                <div className="absolute inset-0 space-y-[100px] pointer-events-none">
                                    {TIME_SLOTS.map((time) => (
                                        <div key={time} className="border-b border-gray-200/40" />
                                    ))}
                                </div>

                                {/* Events */}
                                {dayClasses.map((classEvent) => {
                                    const position = getEventPosition(classEvent.startTime, classEvent.endTime);
                                    const isSelected = selectedEventId === classEvent.id;

                                    return (
                                        <button
                                            key={classEvent.id}
                                            onClick={() => onEventClick(classEvent)}
                                            className={`absolute left-0 right-0 rounded-2xl p-3 text-left transition-all hover:scale-105 hover:shadow-lg ${
                                                isSelected ? 'ring-2 ring-gray-900 shadow-lg' : ''
                                            }`}
                                            style={{
                                                backgroundColor: classEvent.color,
                                                top: `${position.top}px`,
                                                height: `${position.height}px`,
                                                minHeight: '60px'
                                            }}
                                        >
                                            <div className="text-xs text-gray-700 mb-1">
                                                {classEvent.startTime}
                                            </div>
                                            <div className="text-sm text-gray-900 line-clamp-2">
                                                {classEvent.subject}
                                            </div>
                                            {classEvent.professor && (
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {classEvent.professor}
                                                </div>
                                            )}
                                            {classEvent.students && classEvent.students.length > 0 && (
                                                <div className="flex -space-x-1 mt-2">
                                                    {classEvent.students.slice(0, 3).map((student, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-5 h-5 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-[8px] text-white"
                                                        >
                                                            {student[0]}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
