import { FileText, Upload, FileEdit, Calendar, Scale, Shield, Globe, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'new-case', label: 'Nova Defesa', icon: Scale },
    { id: 'import', label: 'Importar Documentos', icon: Upload },
    { id: 'petition', label: 'Gerar Petição', icon: FileEdit },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'international', label: 'Casos Internacionais', icon: Globe },
  ];

  return (
    <aside className="w-64 h-screen backdrop-blur-xl border-r border-border/50 flex flex-col" style={{ background: 'var(--sidebar)' }}>
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">Defesa360</h1>
            <p className="text-xs text-muted-foreground">Advocacia Criminal</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-accent-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
          <div className="flex-1">
            <p className="text-sm text-foreground">Dr. Advogado</p>
            <p className="text-xs text-muted-foreground">OAB 123.456</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
