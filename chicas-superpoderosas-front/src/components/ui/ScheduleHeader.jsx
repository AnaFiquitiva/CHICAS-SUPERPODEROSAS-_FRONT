import { Calendar } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';
import { Card } from './card';

interface ScheduleHeaderProps {
    periods: string[];
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}

export function ScheduleHeader({ periods, selectedPeriod, onPeriodChange }: ScheduleHeaderProps) {
    return (
        <Card className="mb-6 p-6 bg-white shadow-lg border-l-4 border-l-[#003876]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#003876] p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl text-gray-900">Horario de Clases</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Consulta tu horario académico por periodo
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label htmlFor="period-select" className="text-sm text-gray-700 whitespace-nowrap">
                        Periodo académico:
                    </label>
                    <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                        <SelectTrigger id="period-select" className="w-[180px] bg-white">
                            <SelectValue placeholder="Seleccionar periodo" />
                        </SelectTrigger>
                        <SelectContent>
                            {periods.map((period) => (
                                <SelectItem key={period} value={period}>
                                    {period}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    );
}
