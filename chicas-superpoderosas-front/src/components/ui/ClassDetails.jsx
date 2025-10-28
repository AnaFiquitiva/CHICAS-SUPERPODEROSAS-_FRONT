import { X, MapPin, Clock, User, BookOpen, Hash } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import type { ClassEvent } from './src/App';

interface ClassDetailsProps {
    event: ClassEvent;
    onClose: () => void;
}

export function ClassDetails({ event, onClose }: ClassDetailsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[rgba(0,0,0,0.08)] overflow-hidden h-fit sticky top-6">
            {/* Header */}
            <div className="bg-[#FAFAFA] border-b border-[rgba(0,0,0,0.08)] p-4 flex items-center justify-between">
                <h3 className="font-semibold text-[#100F0F]">Detalles de la Clase</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-lg hover:bg-white"
                >
                    <X className="h-4 w-4 text-[#666666]" />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Subject Name */}
                <div>
                    <h2 className="text-lg font-bold text-[#100F0F] mb-1">{event.subject}</h2>
                    {event.code && (
                        <p className="text-sm text-[#666666] font-normal">{event.code}</p>
                    )}
                </div>

                {/* Color Badge */}
                <div
                    className="h-2 w-full rounded-full"
                    style={{ backgroundColor: event.color }}
                />

                {/* Details Grid */}
                <div className="space-y-3">
                    {/* Time */}
                    <div className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                        <div className="mt-0.5">
                            <Clock className="h-4 w-4 text-[#990000]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#666666] font-normal mb-1">Horario</p>
                            <p className="text-sm font-semibold text-[#100F0F]">
                                {event.startTime} - {event.endTime}
                            </p>
                        </div>
                    </div>

                    {/* Room */}
                    <div className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                        <div className="mt-0.5">
                            <MapPin className="h-4 w-4 text-[#990000]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#666666] font-normal mb-1">Ubicación</p>
                            <p className="text-sm font-semibold text-[#100F0F]">{event.room}</p>
                        </div>
                    </div>

                    {/* Professor */}
                    {event.professor && (
                        <div className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                            <div className="mt-0.5">
                                <User className="h-4 w-4 text-[#990000]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-[#666666] font-normal mb-1">Profesor</p>
                                <p className="text-sm font-semibold text-[#100F0F]">{event.professor}</p>
                            </div>
                        </div>
                    )}

                    {/* Credits */}
                    {event.credits && (
                        <div className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                            <div className="mt-0.5">
                                <BookOpen className="h-4 w-4 text-[#990000]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-[#666666] font-normal mb-1">Créditos</p>
                                <p className="text-sm font-semibold text-[#100F0F]">
                                    {event.credits} {event.credits === 1 ? 'crédito' : 'créditos'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
                    <p className="text-xs text-[#666666] font-normal mb-3">Información adicional</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-[#666666] font-normal">Tipo</span>
                            <Badge
                                variant="outline"
                                className="bg-white border-[rgba(0,0,0,0.08)] text-[#100F0F] font-semibold"
                            >
                                {event.subject.includes('Lab') ? 'Laboratorio' : 'Teórica'}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-[#666666] font-normal">Modalidad</span>
                            <Badge
                                variant="outline"
                                className="bg-white border-[rgba(0,0,0,0.08)] text-[#100F0F] font-semibold"
                            >
                                Presencial
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[rgba(0,0,0,0.08)] space-y-2">
                    <Button
                        className="w-full bg-[#990000] hover:bg-[#7D0000] text-white font-semibold rounded-lg"
                    >
                        Ver detalles completos
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-[rgba(0,0,0,0.08)] text-[#100F0F] font-semibold rounded-lg hover:bg-[#F5F5F5]"
                    >
                        Añadir a favoritos
                    </Button>
                </div>

                {/* Footer Note */}
                <div className="pt-3 border-t border-[rgba(0,0,0,0.08)]">
                    <p className="text-xs text-[#666666] font-normal text-center">
                        Sistema de Información y Registro SIRHA
                    </p>
                </div>
            </div>
        </div>
    );
}
