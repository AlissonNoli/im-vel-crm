import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/FilterBar";
import { PaginationBar } from "@/components/PaginationBar";
import { LoadingState, EmptyState, ErrorState } from "@/components/StateViews";
import { usePaginated } from "@/hooks/usePaginated";
import { clientsApi } from "@/api/clients";
import { USE_MOCKS, mockClients, mockPaginated } from "@/data/mocks";
import type { Client, PaginatedResponse, QueryParams } from "@/types/api";

const fetcher = (params: QueryParams): Promise<PaginatedResponse<Client>> => {
  const onlyBuyers = { ...params, tipo: "comprador" };
  if (USE_MOCKS) {
    const buyers = mockClients.filter((c) => c.tipo === "comprador");
    return Promise.resolve(mockPaginated(buyers, onlyBuyers));
  }
  return clientsApi.list(onlyBuyers);
};

export default function Compradores() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, count, page, setPage, totalPages, loading, error, updateParams, refetch } = usePaginated<Client>({ fetcher });

  const handleSearch = useCallback((v: string) => { setSearch(v); updateParams({ search: v }); }, [updateParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compradores</h1>
          <p className="text-muted-foreground">Gestão de potenciais compradores</p>
        </div>
        <Button>+ Novo Comprador</Button>
      </div>

      <FilterBar
        searchPlaceholder="Pesquisar compradores..."
        searchValue={search}
        onSearchChange={handleSearch}
        filters={[]}
        filterValues={{}}
        onFilterChange={() => {}}
      />

      {data.length === 0 ? (
        <EmptyState message="Nenhum comprador encontrado." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => navigate(`/compradores/${c.id}`)}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.telefone}</TableCell>
                    <TableCell>{c.documento}</TableCell>
                    <TableCell>
                      <Badge variant="default">Comprador</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <PaginationBar page={page} totalPages={totalPages} count={count} onPageChange={setPage} />
    </div>
  );
}
