import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, GripVertical, Search } from "lucide-react";
import { mockLeads, stageLabels, stageColors, type Lead, type LeadStage } from "@/data/mockData";

const stages: LeadStage[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];

function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <Card className="mb-2 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-1">
          <p className="font-medium text-sm">{lead.nome}</p>
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground mb-2">{lead.imovel}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-primary">€{lead.valor.toLocaleString("pt-PT")}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Phone className="h-3 w-3" />
          <span className="text-xs truncate">{lead.telefone}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mt-1">
          <Mail className="h-3 w-3" />
          <span className="text-xs truncate">{lead.email}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="secondary" className="text-[10px]">{lead.origem}</Badge>
          <span className="text-[10px] text-muted-foreground">{lead.agente}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanView() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const leads = mockLeads.filter((l) => l.etapa === stage);
        return (
          <div key={stage} className="min-w-[260px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${stageColors[stage]}`} />
              <h3 className="text-sm font-semibold">{stageLabels[stage]}</h3>
              <Badge variant="secondary" className="text-xs">{leads.length}</Badge>
            </div>
            <div className="space-y-0 bg-secondary/50 rounded-lg p-2 min-h-[400px]">
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onClick={() => navigate(`/prospectos/${lead.id}`)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListView() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockLeads.filter((l) =>
    l.nome.toLowerCase().includes(search.toLowerCase()) ||
    l.imovel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome ou imóvel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Etapa" />
          </SelectTrigger>
          <SelectContent>
            {stages.map((s) => (
              <SelectItem key={s} value={s}>{stageLabels[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {filtered.map((lead) => (
          <Card key={lead.id} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => navigate(`/prospectos/${lead.id}`)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${stageColors[lead.etapa]}`} />
                <div>
                  <p className="font-medium">{lead.nome}</p>
                  <p className="text-sm text-muted-foreground">{lead.imovel} · {lead.agente}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-primary">€{lead.valor.toLocaleString("pt-PT")}</span>
                <Badge variant="secondary">{stageLabels[lead.etapa]}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Prospectos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prospectos</h1>
          <p className="text-muted-foreground">Gestão do pipeline de vendas</p>
        </div>
        <Button>+ Novo Prospeto</Button>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban" className="mt-4">
          <KanbanView />
        </TabsContent>
        <TabsContent value="lista" className="mt-4">
          <ListView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
