import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react';

const caseData = [
  { month: 'Jan', casos: 12, vitorias: 9 },
  { month: 'Fev', casos: 15, vitorias: 11 },
  { month: 'Mar', casos: 18, vitorias: 14 },
  { month: 'Abr', casos: 14, vitorias: 12 },
  { month: 'Mai', casos: 20, vitorias: 17 },
];

const caseTypeData = [
  { name: 'Homicídio', value: 35, color: '#dc2626' },
  { name: 'Furto/Roubo', value: 25, color: '#7f1d1d' },
  { name: 'Tráfico', value: 20, color: '#fca5a5' },
  { name: 'Outros', value: 20, color: '#991b1b' },
];

const performanceMetrics = [
  { label: 'Taxa de Sucesso', value: '87%', change: '+5%', trend: 'up', icon: Award },
  { label: 'Casos Ativos', value: '12', change: '+3', trend: 'up', icon: TrendingUp },
  { label: 'Prazos Próximos', value: '4', change: '-2', trend: 'down', icon: AlertCircle },
  { label: 'Média de Tempo', value: '45d', change: '-7d', trend: 'down', icon: TrendingDown },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up' ? metric.label.includes('Taxa') || metric.label.includes('Casos') : metric.label.includes('Prazos') || metric.label.includes('Tempo');

          return (
            <div
              key={metric.label}
              className="p-4 rounded-xl backdrop-blur-md border border-border/50"
              style={{ background: 'var(--card)' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-amber-500'}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl text-foreground mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases Over Time */}
        <div className="p-6 rounded-2xl backdrop-blur-md border border-border/50" style={{ background: 'var(--card)' }}>
          <h3 className="text-foreground mb-4">Casos por Mês</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.1)" />
              <XAxis dataKey="month" stroke="#a3a3a3" />
              <YAxis stroke="#a3a3a3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: '#f5f5f5',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="casos" stroke="#dc2626" strokeWidth={2} name="Total de Casos" />
              <Line type="monotone" dataKey="vitorias" stroke="#fca5a5" strokeWidth={2} name="Vitórias" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Case Types Distribution */}
        <div className="p-6 rounded-2xl backdrop-blur-md border border-border/50" style={{ background: 'var(--card)' }}>
          <h3 className="text-foreground mb-4">Distribuição por Tipo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={caseTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {caseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: '#f5f5f5',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Performance */}
        <div className="p-6 rounded-2xl backdrop-blur-md border border-border/50 lg:col-span-2" style={{ background: 'var(--card)' }}>
          <h3 className="text-foreground mb-4">Performance Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.1)" />
              <XAxis dataKey="month" stroke="#a3a3a3" />
              <YAxis stroke="#a3a3a3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: '#f5f5f5',
                }}
              />
              <Legend />
              <Bar dataKey="casos" fill="#dc2626" name="Total de Casos" radius={[8, 8, 0, 0]} />
              <Bar dataKey="vitorias" fill="#7f1d1d" name="Vitórias" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
