import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Maximize } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { PaginationBar } from "@/components/PaginationBar";
import { LoadingState, EmptyState, ErrorState } from "@/components/StateViews";
import { usePaginated } from "@/hooks/usePaginated";
import { propertiesApi } from "@/api/properties";
import { USE_MOCKS, mockProperties, mockPaginated } from "@/data/mocks";
import type { Property, PaginatedResponse, QueryParams } from "@/types/api";

const statusLabels: Record<string, string> = { disponivel: "Disponível", reservado: "Reservado", vendido: "Vendido" };
const statusVariants: Record<string, "default" | "secondary" | "destructive"> = { disponivel: "default", reservado: "secondary", vendido: "destructive" };

const fetcher = (params: QueryParams): Promise<PaginatedResponse<Property>> => {
  if (USE_MOCKS) return Promise.resolve(mockPaginated(mockProperties, params));
  return propertiesApi.list(params);
};

export default function Imoveis() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, count, page, setPage, totalPages, loading, error, params, updateParams, refetch } = usePaginated<Property>({ fetcher });

  const handleSearch = useCallback((v: string) => { setSearch(v); updateParams({ search: v }); }, [updateParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Imóveis</h1>
          <p className="text-muted-foreground">Gestão de propriedades</p>
        </div>
        <Button>+ Adicionar Imóvel</Button>
      </div>

      <FilterBar
        searchPlaceholder="Pesquisar imóveis..."
        searchValue={search}
        onSearchChange={handleSearch}
        filters={[
          { key: "status", label: "Status", options: [{ label: "Disponível", value: "disponivel" }, { label: "Reservado", value: "reservado" }, { label: "Vendido", value: "vendido" }] },
          { key: "tipo", label: "Tipo", options: [{ label: "Apartamento", value: "apartamento" }, { label: "Moradia", value: "moradia" }] },
        ]}
        filterValues={{ status: (params.status as string) ?? "", tipo: (params.tipo as string) ?? "" }}
        onFilterChange={(key, value) => updateParams({ [key]: value })}
      />

      {data.length === 0 ? (
        <EmptyState message="Nenhum imóvel encontrado." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((imovel) => (
            <Card key={imovel.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/imoveis/${imovel.id}`)}>
              <div className="h-40 bg-secondary rounded-t-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{imovel.titulo}</h3>
                  <Badge variant={statusVariants[imovel.status]}>{statusLabels[imovel.status]}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{imovel.endereco}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" /> {imovel.quartos}Q</span>
                  <span className="flex items-center gap-1"><Maximize className="h-3 w-3" /> {imovel.area}m²</span>
                  <span>{imovel.tipo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">€{imovel.valor.toLocaleString("pt-PT")}</span>
                  <span className="text-xs text-muted-foreground">{imovel.agente}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PaginationBar page={page} totalPages={totalPages} count={count} onPageChange={setPage} />
    </div>
  );
}
