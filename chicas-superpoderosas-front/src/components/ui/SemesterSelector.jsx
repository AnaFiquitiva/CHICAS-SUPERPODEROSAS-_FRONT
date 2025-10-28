import { GraduationCap, BookOpen, Calendar, Clock } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';
import type { SemesterData } from '../App';

interface SemesterSelectorProps {
    periods: string[];
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    semesterData?: SemesterData;
}

export function SemesterSelector({
                                     periods,
                                     selectedPeriod,
                                     onPeriodChange,
                                     semesterData
                                 }: SemesterSelectorProps) {
    return (
        <div className="flex items-center gap-4">
            {/* Info del semestre */}
            {semesterData && (
                <div className="hidden md:flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] rounded-lg">
                        <GraduationCap className="h-4 w-4 text-[#990000]" />
                        <span className="text-[#666666] font-normal">{semesterData.currentSemester}° Semestre</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] rounded-lg">
                        <Clock className="h-4 w-4 text-[#990000]" />
                        <span className="text-[#666666] font-normal">{semesterData.schedule}</span>
                    </div>
                </div>
            )}

            {/* Selector de periodo */}
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                <SelectTrigger className="w-[200px] bg-white border-[rgba(0,0,0,0.08)] font-semibold">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#990000]" />
                        <SelectValue placeholder="Seleccionar periodo" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {periods.map((period) => (
                        <SelectItem key={period} value={period}>
                            Periodo {period}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
