import { Users, Building2, Euro, CalendarDays, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockLeads, mockInteracoes, mockImoveis, chartData, stageLabels, type LeadStage } from "@/data/mockData";

const summaryCards = [
  { title: "Prospectos Ativos", value: mockLeads.filter(l => !["fechado", "perdido"].includes(l.etapa)).length, icon: Users, change: "+12%" },
  { title: "Valor Total Pipeline", value: `€${(mockLeads.reduce((a, l) => a + l.valor, 0) / 1000).toFixed(0)}k`, icon: Euro, change: "+8%" },
  { title: "Imóveis à Venda", value: mockImoveis.filter(i => i.status === "disponivel").length, icon: Building2, change: "3 novos" },
  { title: "Visitas Agendadas", value: mockLeads.filter(l => l.etapa === "visita").length, icon: CalendarDays, change: "Esta semana" },
  { title: "Novas Mensagens", value: 7, icon: MessageSquare, change: "3 não lidas" },
];

const pipelineStages: LeadStage[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];
const pipelineClasses: Record<LeadStage, string> = {
  novo: "pipeline-novo",
  contacto: "pipeline-contacto",
  visita: "pipeline-visita",
  negociacao: "pipeline-negociacao",
  fechado: "pipeline-fechado",
  perdido: "pipeline-perdido",
};

const tipoIcons: Record<string, string> = {
  chamada: "📞",
  email: "📧",
  whatsapp: "💬",
  visita: "🏠",
  sms: "📱",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio imobiliário</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <card.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{card.change}</span>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {pipelineStages.map((stage) => {
              const count = mockLeads.filter(l => l.etapa === stage).length;
              return (
                <div key={stage} className="flex-1 min-w-[100px]">
                  <div className={`${pipelineClasses[stage]} rounded-lg p-3 text-center`}>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs opacity-90">{stageLabels[stage]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Últimos 30 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="dia" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" name="Novos Leads" fill="hsl(213, 72%, 44%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversoes" name="Conversões" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Interactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interações Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Resumo</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInteracoes.slice(0, 5).map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{tipoIcons[i.tipo]}</TableCell>
                    <TableCell className="font-medium">{i.leadNome}</TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{i.resumo}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{i.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
