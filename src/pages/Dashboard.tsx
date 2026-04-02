import { Users, Building2, Euro, CalendarDays, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockLeads, mockProperties, stageLabels, stageColors, type LeadStage } from "@/data/mocks";

const summaryCards = [
  { title: "Prospectos Ativos", value: mockLeads.filter(l => !["fechado", "perdido"].includes(l.status)).length, icon: Users, change: "+12%" },
  { title: "Valor Total Pipeline", value: `€${(mockLeads.reduce((a, l) => a + l.valor, 0) / 1000).toFixed(0)}k`, icon: Euro, change: "+8%" },
  { title: "Imóveis à Venda", value: mockProperties.filter(i => i.status === "disponivel").length, icon: Building2, change: "3 novos" },
  { title: "Visitas Agendadas", value: mockLeads.filter(l => l.status === "visita").length, icon: CalendarDays, change: "Esta semana" },
  { title: "Novas Mensagens", value: 7, icon: MessageSquare, change: "3 não lidas" },
];

const pipelineStages: LeadStage[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];
const pipelineClasses: Record<LeadStage, string> = {
  novo: "pipeline-novo", contacto: "pipeline-contacto", visita: "pipeline-visita",
  negociacao: "pipeline-negociacao", fechado: "pipeline-fechado", perdido: "pipeline-perdido",
};

const chartData = [
  { dia: "01 Mar", leads: 3, conversoes: 1 },
  { dia: "05 Mar", leads: 5, conversoes: 2 },
  { dia: "10 Mar", leads: 4, conversoes: 1 },
  { dia: "15 Mar", leads: 7, conversoes: 3 },
  { dia: "20 Mar", leads: 6, conversoes: 2 },
  { dia: "22 Mar", leads: 8, conversoes: 4 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio imobiliário</p>
      </div>

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

      <Card>
        <CardHeader><CardTitle className="text-lg">Pipeline de Vendas</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {pipelineStages.map((stage) => {
              const count = mockLeads.filter(l => l.status === stage).length;
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
        <Card>
          <CardHeader><CardTitle className="text-lg">Últimos 30 Dias</CardTitle></CardHeader>
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

        <Card>
          <CardHeader><CardTitle className="text-lg">Prospectos Recentes</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.slice(0, 5).map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.nome}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{l.imovel}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{stageLabels[l.status]}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold text-primary">€{l.valor.toLocaleString("pt-PT")}</TableCell>
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
