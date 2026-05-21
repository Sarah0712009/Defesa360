import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardCards } from './components/DashboardCards';
import { AIChat } from './components/AIChat';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { InternationalCases } from './components/InternationalCases';
import { CasesTable } from './components/CasesTable';
import { Notebook } from './components/Notebook';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <DashboardCards onCardClick={setActiveView} />
            <AnalyticsDashboard />
          </div>
        );
      case 'cases':
        return <CasesTable />;
      case 'ai-assistant':
        return (
          <div className="h-[calc(100vh-8rem)]">
            <AIChat />
          </div>
        );
      case 'international':
        return <InternationalCases />;
      case 'new-case':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Nova Defesa</h2>
              <p className="text-muted-foreground">Registre um novo caso criminal</p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md border border-border/50" style={{ background: 'var(--card)' }}>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-foreground mb-2">Número do Processo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="000000-00.0000.0.00.0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Cliente</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Nome completo do cliente"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Tipo de Crime</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Homicídio</option>
                    <option>Furto/Roubo</option>
                    <option>Tráfico de Drogas</option>
                    <option>Estelionato</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Descrição do Caso</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Descreva os detalhes do caso..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-foreground mb-2">Data do Fato</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Prazo</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                  >
                    Registrar Caso
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView('dashboard')}
                    className="px-6 py-3 rounded-lg bg-muted/30 text-foreground hover:bg-muted/50 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case 'petition':
        return (
          <div className="h-[calc(100vh-8rem)]">
            <Notebook />
          </div>
        );
      case 'import':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Importar Documentos</h2>
              <p className="text-muted-foreground">Faça upload de arquivos processuais</p>
            </div>
            <div className="p-12 rounded-2xl backdrop-blur-md border-2 border-dashed border-border/50 text-center" style={{ background: 'var(--card)' }}>
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-foreground mb-2">Arraste arquivos aqui</h3>
                <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar</p>
                <button className="px-6 py-3 rounded-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-200">
                  Selecionar Arquivos
                </button>
                <p className="text-xs text-muted-foreground mt-4">Formatos aceitos: PDF, DOC, DOCX, JPG, PNG</p>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Calendário Processual</h2>
              <p className="text-muted-foreground">Gerencie prazos e audiências</p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md border border-border/50 text-center" style={{ background: 'var(--card)' }}>
              <p className="text-muted-foreground">Calendário em desenvolvimento</p>
            </div>
          </div>
        );
      case 'evidence':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Evidências</h2>
              <p className="text-muted-foreground">Organize e analise provas processuais</p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {['Prova Documental', 'Prova Testemunhal', 'Prova Pericial'].map((type) => (
                <div key={type} className="p-6 rounded-2xl backdrop-blur-md border border-border/50" style={{ background: 'var(--card)' }}>
                  <h3 className="text-foreground mb-4">{type}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Nenhuma evidência cadastrada</p>
                  <button className="w-full px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-200">
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="size-full flex bg-background dark">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}