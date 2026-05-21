import { FileText, Clock, User, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Case {
  id: string;
  number: string;
  client: string;
  type: string;
  status: 'active' | 'pending' | 'archived';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

const cases: Case[] = [
  {
    id: '1',
    number: '001234-56.2024.8.26.0100',
    client: 'João Silva',
    type: 'Homicídio Qualificado',
    status: 'active',
    deadline: '2026-05-25',
    priority: 'high',
  },
  {
    id: '2',
    number: '002345-67.2024.8.26.0100',
    client: 'Maria Santos',
    type: 'Roubo Majorado',
    status: 'active',
    deadline: '2026-06-10',
    priority: 'medium',
  },
  {
    id: '3',
    number: '003456-78.2024.8.26.0100',
    client: 'Pedro Costa',
    type: 'Tráfico de Drogas',
    status: 'pending',
    deadline: '2026-07-15',
    priority: 'medium',
  },
  {
    id: '4',
    number: '004567-89.2024.8.26.0100',
    client: 'Ana Oliveira',
    type: 'Estelionato',
    status: 'active',
    deadline: '2026-05-30',
    priority: 'low',
  },
];

export function CasesTable() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: Case['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
  };

  const getStatusLabel = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'archived':
        return 'Arquivado';
    }
  };

  const getPriorityLabel = (priority: Case['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Casos Ativos</h2>
          <p className="text-muted-foreground">Gerencie todos os seus processos</p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Novo Caso
        </button>
      </div>

      <div className="rounded-2xl backdrop-blur-md border border-border/50 overflow-hidden" style={{ background: 'var(--card)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm text-muted-foreground">Número do Processo</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Cliente</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Tipo</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Prioridade</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Prazo</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((case_) => (
                <tr
                  key={case_.id}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors duration-200"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground font-mono">{case_.number}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{case_.client}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{case_.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(case_.status)}`}>
                      {getStatusLabel(case_.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(case_.priority)}`}>
                      {getPriorityLabel(case_.priority)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {new Date(case_.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-muted/30 transition-colors duration-200" title="Visualizar">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted/30 transition-colors duration-200" title="Editar">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors duration-200" title="Excluir">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
