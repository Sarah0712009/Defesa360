import { FileText, Database, Bot, Globe, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  onClick?: () => void;
}

function GlassCard({ title, description, icon: Icon, count, onClick }: CardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative p-6 rounded-2xl backdrop-blur-md border border-border/50 text-left overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(38, 38, 38, 0.6) 100%)'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {count !== undefined && (
            <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
              <span className="text-sm text-primary">{count}</span>
            </div>
          )}
        </div>

        <h3 className="text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 group-hover:animate-shine" />
      </div>
    </motion.button>
  );
}

export function DashboardCards({ onCardClick }: { onCardClick: (view: string) => void }) {
  const cards = [
    {
      id: 'cases',
      title: 'Casos Ativos',
      description: 'Gerencie seus casos criminais em andamento',
      icon: FileText,
      count: 12,
    },
    {
      id: 'evidence',
      title: 'Evidências',
      description: 'Organize e analise provas processuais',
      icon: Database,
      count: 48,
    },
    {
      id: 'ai-assistant',
      title: 'IA Jurídica',
      description: 'Assistente inteligente para análise legal',
      icon: Bot,
      count: 5,
    },
    {
      id: 'international',
      title: 'Casos Internacionais',
      description: 'Gerencie processos em múltiplos países',
      icon: Globe,
      count: 3,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Dashboard</h2>
          <p className="text-muted-foreground">Visão geral dos seus processos</p>
        </div>

        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">Taxa de sucesso:</span>
              <span className="text-foreground font-medium">87%</span>
            </div>
          </div>

          <div className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Prazos próximos:</span>
              <span className="text-foreground font-medium">4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <GlassCard
            key={card.id}
            {...card}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </div>

      {/* Quick alerts */}
      <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-sm text-foreground">Atenção: Audiência marcada para amanhã às 14h</p>
            <p className="text-xs text-muted-foreground">Processo 001234-56.2024.8.26.0100</p>
          </div>
        </div>
      </div>
    </div>
  );
}
