// EventDetails.tsx
import { X, MapPin, Calendar, Clock, User } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import type { ClassEvent } from './App';

interface EventDetailsProps {
    event: ClassEvent;
    onClose: () => void;
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
    return (
        <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-gray-200/50 p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl text-gray-900">{event.subject}</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-full hover:bg-gray-200/50"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Category Badge */}
            {event.category && (
                <div className="mb-6">
                    <Badge
                        className="rounded-full px-3 py-1 text-xs"
                        style={{ backgroundColor: event.color, color: '#1f2937' }}
                    >
                        {event.category}
                    </Badge>
                </div>
            )}

            {/* Event Details */}
            <div className="space-y-4">
                {/* Time */}
                <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                        <div className="text-sm text-gray-900">
                            {event.startTime} - {event.endTime}
                        </div>
                    </div>
                </div>

                {/* Room */}
                <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                        <div className="text-sm text-gray-900">{event.room}</div>
                        <div className="text-xs text-gray-500">Ubicación</div>
                    </div>
                </div>

                {/* Professor */}
                {event.professor && (
                    <div className="flex items-start gap-3">
                        <User className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                            <div className="text-sm text-gray-900">{event.professor}</div>
                            <div className="text-xs text-gray-500">Profesor</div>
                        </div>
                    </div>
                )}

                {/* Description */}
                {event.description && (
                    <div className="pt-4 border-t border-gray-200/50">
                        <div className="text-sm text-gray-900 mb-2">Descripción</div>
                        <div className="text-xs text-gray-600">{event.description}</div>
                    </div>
                )}

                {/* Students */}
                {event.students && event.students.length > 0 && (
                    <div className="pt-4 border-t border-gray-200/50">
                        <div className="text-xs text-gray-500 mb-3">Compañeros</div>
                        <div className="flex -space-x-2">
                            {event.students.map((student, idx) => (
                                <div
                                    key={idx}
                                    className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-xs text-white"
                                >
                                    {student[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
