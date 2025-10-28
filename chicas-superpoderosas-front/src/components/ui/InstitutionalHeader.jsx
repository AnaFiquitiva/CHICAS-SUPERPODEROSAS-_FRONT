import { ArrowLeft, User, Bell, Calendar, FileText, Map, BookOpen } from 'lucide-react';
import { Button } from './button';

interface InstitutionalHeaderProps {
    onNavigate: (view: 'schedule' | 'requests' | 'semaforo' | 'gestion') => void;
    onLogout?: () => void; // agregar esta prop si el header la necesita
}

export function InstitutionalHeader({ onNavigate }: InstitutionalHeaderProps) {
    return (
        <header className="bg-white border-b border-border shadow-sm">
            <div className="max-w-[1600px] mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo y Navegación */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg hover:bg-secondary"
                            onClick={() => alert('Regresar al menú principal')}
                        >
                            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">E</span>
                        </div>
                        <div>
                            <h1 className="text-foreground">
                                Escuela Colombiana de Ingeniería
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Julio Garavito · SIRHA
                            </p>
                        </div>
                    </div>

                    {/* Acciones de Usuario */}
                    <div className="flex items-center gap-3">
                        {onNavigate && (
                            <div className="flex items-center gap-2 mr-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onNavigate('schedule')}
                                    className="rounded-lg hover:bg-secondary"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Horario
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onNavigate('requests')}
                                    className="rounded-lg hover:bg-secondary"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Solicitudes
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onNavigate('semaforo')}
                                    className="rounded-lg hover:bg-secondary"
                                >
                                    <Map className="h-4 w-4 mr-2" />
                                    Semáforo
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onNavigate('gestion')}
                                    className="rounded-lg hover:bg-secondary"
                                >
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Gestión
                                </Button>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg hover:bg-secondary relative"
                        >
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg hover:bg-secondary"
                        >
                            <User className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <div className="text-right">
                            <p className="text-sm text-foreground">María García</p>
                            <p className="text-xs text-muted-foreground">Código: 2020123456</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}