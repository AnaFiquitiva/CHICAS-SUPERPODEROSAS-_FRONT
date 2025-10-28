import * as React from "react"; // Necesario para usar React.ElementType
import { InstitutionalHeader } from '../ui/InstitutionalHeader';
import { Calendar, FileText, TrendingUp, BookOpen, ChevronRight, User } from 'lucide-react';
import { Card } from '../ui/card';

interface DashboardAppProps {
    onNavigate: (view: 'schedule' | 'requests' | 'semaforo' | 'gestion') => void;
    onLogout?: () => void;
}

interface DashboardCard {
    id: 'schedule' | 'requests' | 'semaforo' | 'gestion';
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    stats?: {
        label: string;
        value: string;
    };
}

export default function DashboardApp({ onNavigate, onLogout }: DashboardAppProps) {
    const dashboardCards: DashboardCard[] = [
        {
            id: 'schedule',
            title: 'Horario de Clases',
            description: 'Consulta tu horario académico y programación semanal',
            icon: Calendar,
            color: '#990000',
            bgColor: 'bg-red-50',
            stats: {
                label: 'Materias activas',
                value: '6'
            }
        },
        {
            id: 'requests',
            title: 'Solicitudes Académicas',
            description: 'Gestiona tus solicitudes de cambios y trámites académicos',
            icon: FileText,
            color: '#0072F5',
            bgColor: 'bg-blue-50',
            stats: {
                label: 'Solicitudes pendientes',
                value: '2'
            }
        },
        {
            id: 'semaforo',
            title: 'Semáforo Académico',
            description: 'Visualiza tu progreso y malla curricular completa',
            icon: TrendingUp,
            color: '#17C964',
            bgColor: 'bg-green-50',
            stats: {
                label: 'Progreso',
                value: '62%'
            }
        },
        {
            id: 'gestion',
            title: 'Gestión de Materias',
            description: 'Inscribe y administra las materias de tu semestre',
            icon: BookOpen,
            color: '#FFA500',
            bgColor: 'bg-orange-50',
            stats: {
                label: 'Carrito',
                value: '0'
            }
        }
    ];

    const handleCardClick = (cardId: 'schedule' | 'requests' | 'semaforo' | 'gestion') => {
        onNavigate(cardId);
    };

    return (
        <div className="min-h-screen bg-background">
            <InstitutionalHeader onNavigate={onNavigate} onLogout={onLogout} />

            <main className="p-6">
                <div className="max-w-[1400px] mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-foreground mb-2">
                                    ¡Hola, María García!
                                </h1>
                                <p className="text-muted-foreground">
                                    Bienvenida a tu portal académico SIRHA
                                </p>
                            </div>
                            <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">Código</p>
                                    <p className="text-foreground">2020123456</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-card rounded-xl border border-border p-4">
                                <p className="text-sm text-muted-foreground mb-1">Programa</p>
                                <p className="text-foreground">Ingeniería de Sistemas</p>
                            </div>
                            <div className="bg-card rounded-xl border border-border p-4">
                                <p className="text-sm text-muted-foreground mb-1">Semestre Actual</p>
                                <p className="text-foreground">2024-2</p>
                            </div>
                            <div className="bg-card rounded-xl border border-border p-4">
                                <p className="text-sm text-muted-foreground mb-1">Promedio Acumulado</p>
                                <p className="text-foreground">4.09</p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div>
                        <h2 className="text-foreground mb-4">
                            Servicios Académicos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dashboardCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <Card
                                        key={card.id}
                                        className="group cursor-pointer border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                        onClick={() => handleCardClick(card.id)}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div
                                                    className={`p-4 rounded-xl ${card.bgColor} transition-transform duration-300 group-hover:scale-110`}
                                                >
                                                    <Icon
                                                        className="h-8 w-8"
                                                        style={{ color: card.color }}
                                                    />
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-primary text-white p-2 rounded-lg">
                                                        <ChevronRight className="h-5 w-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <h3
                                                    className="text-foreground mb-2 transition-colors duration-300"
                                                    style={{
                                                        color: 'inherit'
                                                    }}
                                                >
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {card.description}
                                                </p>
                                            </div>

                                            {card.stats && (
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            {card.stats.label}
                          </span>
                                                    <span
                                                        className="px-3 py-1 rounded-lg text-sm"
                                                        style={{
                                                            backgroundColor: card.bgColor,
                                                            color: card.color
                                                        }}
                                                    >
                            {card.stats.value}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Quick Actions */}
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h3 className="text-foreground mb-4">
                                Acciones Rápidas
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => onNavigate('requests')}
                                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <FileText className="h-4 w-4 text-[#0072F5]" />
                                        </div>
                                        <span className="text-sm text-foreground">Nueva Solicitud Académica</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                                <button
                                    onClick={() => onNavigate('gestion')}
                                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-50 p-2 rounded-lg">
                                            <BookOpen className="h-4 w-4 text-[#FFA500]" />
                                        </div>
                                        <span className="text-sm text-foreground">Inscribir Materias</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                                <button
                                    onClick={() => onNavigate('schedule')}
                                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-50 p-2 rounded-lg">
                                            <Calendar className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm text-foreground">Ver Horario de Hoy</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h3 className="text-foreground mb-4">
                                Actividad Reciente
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                                    <div className="bg-green-50 p-2 rounded-lg mt-1">
                                        <TrendingUp className="h-4 w-4 text-success" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground mb-1">Solicitud Aprobada</p>
                                        <p className="text-xs text-muted-foreground">
                                            Tu solicitud de cambio de grupo ha sido aprobada
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Hace 2 días</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                                    <div className="bg-orange-50 p-2 rounded-lg mt-1">
                                        <BookOpen className="h-4 w-4 text-[#FFA500]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground mb-1">Materias Inscritas</p>
                                        <p className="text-xs text-muted-foreground">
                                            Se completó la inscripción de 6 materias
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Hace 1 semana</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg mt-1">
                                        <FileText className="h-4 w-4 text-[#0072F5]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground mb-1">Nueva Solicitud</p>
                                        <p className="text-xs text-muted-foreground">
                                            Solicitud de cambio de materia en revisión
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Hace 2 semanas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}