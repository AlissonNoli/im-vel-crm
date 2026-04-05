import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, AlertTriangle } from "lucide-react";

const agendamentos = [
  { id: "1", lead: "Carla Mendes", imovel: "Moradia V4 Sintra", agente: "João Ferreira", tipo: "Visita", data: "2024-03-23", hora: "10:00", status: "confirmado" },
  { id: "2", lead: "Pedro Santos", imovel: "T2 Centro Lisboa", agente: "Maria Costa", tipo: "Visita", data: "2024-03-23", hora: "14:30", status: "pendente" },
  { id: "3", lead: "Rui Oliveira", imovel: "T4 Oeiras Premium", agente: "Maria Costa", tipo: "Reunião", data: "2024-03-24", hora: "11:00", status: "confirmado" },
  { id: "4", lead: "Ana Silva", imovel: "T3 Cascais - Vista Mar", agente: "João Ferreira", tipo: "Visita", data: "2024-03-25", hora: "16:00", status: "pendente" },
  { id: "5", lead: "Teresa Lopes", imovel: "T3 Almada", agente: "João Ferreira", tipo: "Visita", data: "2024-03-25", hora: "16:30", status: "conflito" },
];

const statusColor: Record<string, "default" | "secondary" | "destructive"> = {
  confirmado: "default",
  pendente: "secondary",
  conflito: "destructive",
};

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function MiniCalendar() {
  const hoje = new Date();
  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i);
    return d;
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {dias.map((d, i) => {
        const count = agendamentos.filter((a) => a.data === d.toISOString().split("T")[0]).length;
        return (
          <div key={i} className={`text-center p-2 rounded-lg ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
            <p className="text-xs">{diasSemana[d.getDay()]}</p>
            <p className="text-lg font-bold">{d.getDate()}</p>
            {count > 0 && <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-1" />}
          </div>
        );
      })}
    </div>
  );
}

export default function Agendamentos() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <p className="text-muted-foreground">Visitas e reuniões agendadas</p>
        </div>
        <Button onClick={() => navigate("/agendamentos/novo")}>+ Novo Agendamento</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Esta Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <MiniCalendar />
        </CardContent>
      </Card>

      {agendamentos.some((a) => a.status === "conflito") && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-medium text-sm">Conflito de horários detectado</p>
              <p className="text-xs text-muted-foreground">Teresa Lopes e João Ferreira têm visitas sobrepostas a 25 Mar 16:00-16:30</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agendamentos.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.lead}</TableCell>
                  <TableCell>{a.imovel}</TableCell>
                  <TableCell>{a.agente}</TableCell>
                  <TableCell>{a.tipo}</TableCell>
                  <TableCell>{a.data}</TableCell>
                  <TableCell>{a.hora}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor[a.status]}>
                      {a.status === "confirmado" ? "Confirmado" : a.status === "pendente" ? "Pendente" : "Conflito"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
