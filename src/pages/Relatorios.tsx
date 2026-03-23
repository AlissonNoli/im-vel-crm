import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download } from "lucide-react";

const funnelData = [
  { etapa: "Novo", quantidade: 15 },
  { etapa: "Em Contacto", quantidade: 12 },
  { etapa: "Visita", quantidade: 8 },
  { etapa: "Negociação", quantidade: 5 },
  { etapa: "Fechado", quantidade: 3 },
];

const agenteData = [
  { agente: "João Ferreira", leads: 18, conversoes: 5, taxa: "28%" },
  { agente: "Maria Costa", leads: 15, conversoes: 4, taxa: "27%" },
  { agente: "Carlos Dias", leads: 12, conversoes: 2, taxa: "17%" },
];

const origemData = [
  { name: "Website", value: 35 },
  { name: "Idealista", value: 25 },
  { name: "Referência", value: 20 },
  { name: "Facebook", value: 15 },
  { name: "Outros", value: 5 },
];

const COLORS = [
  "hsl(213, 72%, 44%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(215, 12%, 50%)",
];

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise de desempenho e estatísticas</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Excel
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Taxa de Conversão", value: "24%", detail: "vs 20% mês anterior" },
          { label: "Valor Médio Negócio", value: "€420k", detail: "+15% vs média" },
          { label: "Tempo Médio Fecho", value: "32 dias", detail: "-5 dias vs média" },
          { label: "Leads Este Mês", value: "45", detail: "+12 novos" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm font-medium">{kpi.label}</p>
              <p className="text-xs text-muted-foreground">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="etapa" type="category" fontSize={12} width={100} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(213, 72%, 44%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Origem Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Origem dos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={origemData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {origemData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho da Equipa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agenteData.map((a, i) => (
              <div key={a.agente} className="flex items-center gap-4">
                <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{a.agente}</span>
                    <span className="text-sm text-muted-foreground">{a.leads} leads · {a.conversoes} conversões</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(a.conversoes / a.leads) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-semibold text-primary">{a.taxa}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
