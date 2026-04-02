import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, GripVertical } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { PaginationBar } from "@/components/PaginationBar";
import { LoadingState, EmptyState, ErrorState } from "@/components/StateViews";
import { usePaginated } from "@/hooks/usePaginated";
import { leadsApi } from "@/api/leads";
import { USE_MOCKS, mockLeads, mockPaginated, stageLabels, stageColors } from "@/data/mocks";
import type { Lead, LeadStatus, PaginatedResponse, QueryParams } from "@/types/api";

const stages: LeadStatus[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];

const statusFilters = stages.map((s) => ({ label: stageLabels[s], value: s }));

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

const fetcher = (params: QueryParams): Promise<PaginatedResponse<Lead>> => {
  if (USE_MOCKS) {
    return Promise.resolve(mockPaginated(mockLeads, params));
  }
  return leadsApi.list(params);
};

export default function Prospectos() {
  const navigate = useNavigate();
  const { data: leads, count, page, setPage, totalPages, loading, error, params, updateParams, refetch } = usePaginated<Lead>({
    fetcher,
    initialParams: { ordering: "-created_at" },
  });

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    updateParams({ search: value });
  }, [updateParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const kanbanLeads = USE_MOCKS ? mockLeads : leads;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prospectos</h1>
          <p className="text-muted-foreground">Gestão do pipeline de vendas</p>
        </div>
        <Button onClick={() => navigate("/leads/new")}>+ Novo Prospeto</Button>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-4">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageLeads = kanbanLeads.filter((l) => l.status === stage);
              return (
                <div key={stage} className="min-w-[260px] flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${stageColors[stage]}`} />
                    <h3 className="text-sm font-semibold">{stageLabels[stage]}</h3>
                    <Badge variant="secondary" className="text-xs">{stageLeads.length}</Badge>
                  </div>
                  <div className="space-y-0 bg-secondary/50 rounded-lg p-2 min-h-[400px]">
                    {stageLeads.map((lead) => (
                      <LeadCard key={lead.id} lead={lead} onClick={() => navigate(`/prospectos/${lead.id}`)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="lista" className="mt-4 space-y-4">
          <FilterBar
            searchPlaceholder="Pesquisar por nome ou imóvel..."
            searchValue={search}
            onSearchChange={handleSearch}
            filters={[{ key: "status", label: "Etapa", options: statusFilters }]}
            filterValues={{ status: (params.status as string) ?? "" }}
            onFilterChange={(key, value) => updateParams({ [key]: value })}
          />

          {leads.length === 0 ? (
            <EmptyState message="Nenhum prospeto encontrado." />
          ) : (
            <div className="space-y-2">
              {leads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => navigate(`/prospectos/${lead.id}`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${stageColors[lead.status]}`} />
                      <div>
                        <p className="font-medium">{lead.nome}</p>
                        <p className="text-sm text-muted-foreground">{lead.imovel} · {lead.agente}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-primary">€{lead.valor.toLocaleString("pt-PT")}</span>
                      <Badge variant="secondary">{stageLabels[lead.status]}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <PaginationBar page={page} totalPages={totalPages} count={count} onPageChange={setPage} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
