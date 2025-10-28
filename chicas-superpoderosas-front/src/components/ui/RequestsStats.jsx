import { CheckCircle2, Clock, XCircle, FileSearch, FileText } from 'lucide-react';

interface RequestsStatsProps {
    stats: {
        total: number;
        approved: number;
        pending: number;
        rejected: number;
        review: number;
    };
}

export function RequestsStats({ stats }: RequestsStatsProps) {
    const cards = [
        {
            label: 'Total Solicitudes',
            count: stats.total,
            total: stats.total,
            color: '#990000',
            bgColor: 'bg-red-50',
            icon: FileText,
            showPercentage: false
        },
        {
            label: 'En Revisión',
            count: stats.review,
            total: stats.total,
            color: '#0072F5',
            bgColor: 'bg-blue-50',
            icon: FileSearch,
            showPercentage: true
        },
        {
            label: 'Pendientes',
            count: stats.pending,
            total: stats.total,
            color: '#FFA500',
            bgColor: 'bg-orange-50',
            icon: Clock,
            showPercentage: true
        },
        {
            label: 'Rechazadas',
            count: stats.rejected,
            total: stats.total,
            color: '#F31260',
            bgColor: 'bg-pink-50',
            icon: XCircle,
            showPercentage: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => {
                const Icon = card.icon;
                const percentage = card.total > 0 ? Math.round((card.count / card.total) * 100) : 0;
                return (
                    <div
                        key={card.label}
                        className="bg-card rounded-xl border border-border p-5 transition-all hover:shadow-md"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`p-3 rounded-lg ${card.bgColor}`}
                            >
                                <Icon className="h-5 w-5" style={{ color: card.color }} />
                            </div>
                            {card.showPercentage && (
                                <span
                                    className={`text-xs px-2 py-1 rounded ${card.bgColor}`}
                                    style={{ color: card.color }}
                                >
                  {percentage}%
                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-foreground">
                                    {card.count}
                                </p>
                                {card.showPercentage && card.total > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        de {card.total}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
