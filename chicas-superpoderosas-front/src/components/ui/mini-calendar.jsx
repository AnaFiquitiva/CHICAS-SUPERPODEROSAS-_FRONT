import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { useState } from 'react';

interface MiniCalendarProps {
    selectedDate?: number;
    onDateSelect?: (date: number) => void;
}

const DAYS_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export function MiniCalendar({ selectedDate = 23, onDateSelect }: MiniCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(9); // Octubre = 9
    const [currentYear, setCurrentYear] = useState(2024);

    // Calcular días del mes
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const today = currentMonth === 9 && currentYear === 2024 ? 23 : null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#100F0F]">
                    {MONTHS[currentMonth]} {currentYear}
                </h3>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevMonth}
                        className="h-7 w-7 rounded-lg hover:bg-[#F5F5F5]"
                    >
                        <ChevronLeft className="h-3 w-3 text-[#666666]" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextMonth}
                        className="h-7 w-7 rounded-lg hover:bg-[#F5F5F5]"
                    >
                        <ChevronRight className="h-3 w-3 text-[#666666]" />
                    </Button>
                </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_SHORT.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs text-[#666666] font-normal py-1"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {/* Days */}
                {daysArray.map((day) => {
                    const isToday = day === today;
                    const isSelected = day === selectedDate && currentMonth === 9 && currentYear === 2024;

                    return (
                        <button
                            key={day}
                            onClick={() => onDateSelect?.(day)}
                            className={`aspect-square flex items-center justify-center rounded-lg text-xs transition-all font-normal ${
                                isToday
                                    ? 'bg-[#990000] text-white font-semibold hover:bg-[#7D0000]'
                                    : isSelected
                                        ? 'bg-[#FFD6D6] text-[#100F0F] font-semibold'
                                        : 'text-[#100F0F] hover:bg-[#F5F5F5]'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
