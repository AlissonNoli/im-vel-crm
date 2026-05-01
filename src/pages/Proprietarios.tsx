import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Building2, MapPin, Euro } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { PaginationBar } from "@/components/PaginationBar";
import { LoadingState, EmptyState, ErrorState } from "@/components/StateViews";
import { usePaginated } from "@/hooks/usePaginated";
import { clientsApi } from "@/api/clients";
import { USE_MOCKS, mockClients, mockPaginated } from "@/data/mocks";
import type { Client, PaginatedResponse, QueryParams } from "@/types/api";

interface Imovel {
  id: string;
  referencia: string;
  titulo: string;
  tipo: string;
  localizacao: string;
  valor: number;
  status: "disponivel" | "reservado" | "vendido" | "em_avaliacao";
}

const mockImoveisByOwner: Record<number, Imovel[]> = {
  2: [
    { id: "101", referencia: "IMV-001", titulo: "Apartamento T3 Cascais", tipo: "Apartamento", localizacao: "Cascais, Lisboa", valor: 450000, status: "disponivel" },
    { id: "102", referencia: "IMV-002", titulo: "Moradia T4 Sintra", tipo: "Moradia", localizacao: "Sintra, Lisboa", valor: 680000, status: "reservado" },
  ],
  4: [
    { id: "103", referencia: "IMV-003", titulo: "Loja Centro Porto", tipo: "Comercial", localizacao: "Porto", valor: 320000, status: "disponivel" },
  ],
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  disponivel: { label: "Disponível", variant: "default" },
  reservado: { label: "Reservado", variant: "secondary" },
  vendido: { label: "Vendido", variant: "outline" },
  em_avaliacao: { label: "Em avaliação", variant: "secondary" },
};

const fetcher = (params: QueryParams): Promise<PaginatedResponse<Client>> => {
  const onlyOwners = { ...params, tipo: "proprietario" };
  if (USE_MOCKS) {
    const owners = mockClients.filter((c) => c.tipo === "proprietario");
    return Promise.resolve(mockPaginated(owners, onlyOwners));
  }
  return clientsApi.list(onlyOwners);
};

export default function Proprietarios() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const { data, count, page, setPage, totalPages, loading, error, updateParams, refetch } = usePaginated<Client>({ fetcher });

  const handleSearch = useCallback((v: string) => { setSearch(v); updateParams({ search: v }); }, [updateParams]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const items = useMemo(() => data, [data]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gestão de proprietários e os seus imóveis</p>
        </div>
        <Button>+ Novo Proprietário</Button>
      </div>

      <FilterBar
        searchPlaceholder="Pesquisar proprietários..."
        searchValue={search}
        onSearchChange={handleSearch}
        filters={[]}
        filterValues={{}}
        onFilterChange={() => {}}
      />

      {items.length === 0 ? (
        <EmptyState message="Nenhum proprietário encontrado." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead className="text-center">Imóveis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p) => {
                  const isExpanded = expandedIds.has(p.id);
                  const imoveis = mockImoveisByOwner[p.id] ?? [];
                  return (
                    <>
                      <TableRow
                        key={p.id}
                        className="cursor-pointer hover:bg-secondary/50"
                        onClick={() => toggleExpand(p.id)}
                      >
                        <TableCell className="text-center">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell
                          className="font-medium text-primary hover:underline"
                          onClick={(e) => { e.stopPropagation(); navigate(`/proprietarios/${p.id}`); }}
                        >
                          {p.nome}
                        </TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>{p.telefone}</TableCell>
                        <TableCell>{p.documento}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">{imoveis.length}</Badge>
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`${p.id}-imoveis`}>
                          <TableCell colSpan={6} className="p-0 bg-muted/30">
                            <div className="p-4 space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Imóveis de {p.nome}
                              </p>
                              {imoveis.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Sem imóveis associados.</p>
                              ) : (
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {imoveis.map((imv) => {
                                    const st = statusConfig[imv.status];
                                    return (
                                      <Card
                                        key={imv.id}
                                        className="cursor-pointer hover:shadow-md transition-shadow border border-border"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/imoveis/${imv.id}`);
                                        }}
                                      >
                                        <CardContent className="p-4 space-y-2">
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                              <Building2 className="h-4 w-4 text-primary shrink-0" />
                                              <span className="font-medium text-sm">{imv.titulo}</span>
                                            </div>
                                            <Badge variant={st.variant} className="text-xs shrink-0">{st.label}</Badge>
                                          </div>
                                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            {imv.localizacao}
                                          </div>
                                          <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">{imv.referencia} · {imv.tipo}</span>
                                            <span className="font-semibold flex items-center gap-0.5">
                                              <Euro className="h-3 w-3" />
                                              {imv.valor.toLocaleString("pt-PT")}
                                            </span>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <PaginationBar page={page} totalPages={totalPages} count={count} onPageChange={setPage} />
    </div>
  );
}
