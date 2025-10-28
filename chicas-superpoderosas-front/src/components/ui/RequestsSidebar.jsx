import {
    LayoutDashboard,
    FileText,
    BarChart3,
    CreditCard,
    Calendar,
    ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';

interface RequestsSidebarProps {
    onNavigate?: (view: 'schedule' | 'requests' | 'semaforo') => void;
}

export function RequestsSidebar({ onNavigate }: RequestsSidebarProps) {
    return (
        <aside className="w-[240px] bg-card border-r border-border min-h-[calc(100vh-73px)]">
            <div className="p-4">
                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg mb-6">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-white">
                            MG
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">María García</p>
                        <p className="text-xs text-muted-foreground">Administrador</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start bg-primary text-white hover:bg-primary/90 hover:text-white rounded-lg"
                    >
                        <FileText className="h-4 w-4 mr-3" />
                        Solicitudes
                        <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg"
                    >
                        <LayoutDashboard className="h-4 w-4 mr-3" />
                        Panel General
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg"
                    >
                        <BarChart3 className="h-4 w-4 mr-3" />
                        Estadísticas
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg"
                    >
                        <CreditCard className="h-4 w-4 mr-3" />
                        Pagos
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg"
                        onClick={() => onNavigate?.('schedule')}
                    >
                        <Calendar className="h-4 w-4 mr-3" />
                        Horario de Clases
                    </Button>
                </div>

                {/* Theme Toggle */}
                <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 bg-orange-50 text-[#FF8C00] hover:bg-orange-100 hover:text-[#FF8C00] rounded-lg"
                        >
                            ☀️ Claro
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg"
                        >
                            🌙 Oscuro
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}