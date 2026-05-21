import { useState } from 'react';
import { Globe, MapPin, Scale, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Case {
  id: string;
  title: string;
  country: string;
  flag: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  deadline: string;
}

const internationalCases: Case[] = [
  {
    id: '1',
    title: 'Extradição - Caso Martinez',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    status: 'active',
    progress: 65,
    deadline: '2026-06-15',
  },
  {
    id: '2',
    title: 'Cooperação Jurídica Internacional',
    country: 'Portugal',
    flag: '🇵🇹',
    status: 'pending',
    progress: 30,
    deadline: '2026-07-20',
  },
  {
    id: '3',
    title: 'Processo Transnacional',
    country: 'Argentina',
    flag: '🇦🇷',
    status: 'active',
    progress: 80,
    deadline: '2026-05-30',
  },
];

export function InternationalCases() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'pending':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'completed':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getStatusLabel = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'Em Andamento';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-1 flex items-center gap-2">
            <Globe className="w-7 h-7 text-primary" />
            Casos Internacionais
          </h2>
          <p className="text-muted-foreground">Gerencie processos em múltiplos países</p>
        </div>

        <div className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Países ativos:</span>
            <span className="text-foreground font-medium">3</span>
          </div>
        </div>
      </div>

      {/* World Map Visualization */}
      <div className="p-8 rounded-2xl backdrop-blur-md border border-border/50 relative overflow-hidden" style={{ background: 'var(--card)' }}>
        <div className="absolute inset-0 opacity-10">
          <Globe className="w-full h-full text-primary" />
        </div>

        <div className="relative z-10">
          <h3 className="text-foreground mb-6 text-center">Mapa de Jurisdições</h3>

          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {internationalCases.map((case_) => (
              <motion.button
                key={case_.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCountry(case_.country)}
                className={`
                  p-4 rounded-xl border transition-all duration-200
                  ${selectedCountry === case_.country
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-muted/30 border-border/50 hover:border-primary/30'
                  }
                `}
              >
                <div className="text-4xl mb-2">{case_.flag}</div>
                <p className="text-sm text-foreground">{case_.country}</p>
                <p className="text-xs text-muted-foreground mt-1">{case_.status === 'active' ? 'Ativo' : 'Pendente'}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {internationalCases.map((case_) => (
          <motion.div
            key={case_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-200"
            style={{ background: 'var(--card)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{case_.flag}</div>
                <div>
                  <h4 className="text-foreground mb-1">{case_.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {case_.country}
                  </p>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(case_.status)}`}>
                {case_.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                {getStatusLabel(case_.status)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progresso do caso</span>
                <span className="text-foreground">{case_.progress}%</span>
              </div>
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${case_.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Prazo: {new Date(case_.deadline).toLocaleDateString('pt-BR')}</span>
              </div>

              <button className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-200 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Ver Detalhes
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
