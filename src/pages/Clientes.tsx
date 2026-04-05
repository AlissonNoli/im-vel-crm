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
  if (USE_MOCKS) return Promise.resolve(mockPaginated(mockClients, params));
  return clientsApi.list(params);
};

export default function Clientes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, count, page, setPage, totalPages, loading, error, params, updateParams, refetch } = usePaginated<Client>({ fetcher });

  const handleSearch = useCallback((v: string) => { setSearch(v); updateParams({ search: v }); }, [updateParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gestão de compradores e proprietários</p>
        </div>
        <Button>+ Novo Cliente</Button>
      </div>

      <FilterBar
        searchPlaceholder="Pesquisar clientes..."
        searchValue={search}
        onSearchChange={handleSearch}
        filters={[
          { key: "tipo", label: "Tipo", options: [{ label: "Comprador", value: "comprador" }, { label: "Proprietário", value: "proprietario" }] },
        ]}
        filterValues={{ tipo: (params.tipo as string) ?? "" }}
        onFilterChange={(key, value) => updateParams({ [key]: value })}
      />

      {data.length === 0 ? (
        <EmptyState message="Nenhum cliente encontrado." />
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
                  <TableRow key={c.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => navigate(`/clientes/${c.id}`)}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.telefone}</TableCell>
                    <TableCell>{c.documento}</TableCell>
                    <TableCell>
                      <Badge variant={c.tipo === "comprador" ? "default" : "secondary"}>
                        {c.tipo === "comprador" ? "Comprador" : "Proprietário"}
                      </Badge>
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
