import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronRight, Building2, MapPin, Euro } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Imovel {
  id: string;
  referencia: string;
  titulo: string;
  tipo: string;
  localizacao: string;
  valor: number;
  status: "disponivel" | "reservado" | "vendido" | "em_avaliacao";
}

interface Proprietario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  imoveis: Imovel[];
}

const proprietarios: Proprietario[] = [
  {
    id: "1", nome: "Manuel Sousa", email: "manuel@email.com", telefone: "+351 911 111 111", documento: "12345678",
    imoveis: [
      { id: "101", referencia: "IMV-001", titulo: "Apartamento T3 Cascais", tipo: "Apartamento", localizacao: "Cascais, Lisboa", valor: 450000, status: "disponivel" },
      { id: "102", referencia: "IMV-002", titulo: "Moradia T4 Sintra", tipo: "Moradia", localizacao: "Sintra, Lisboa", valor: 680000, status: "reservado" },
    ],
  },
  {
    id: "2", nome: "Fernanda Lima", email: "fernanda@email.com", telefone: "+351 922 222 222", documento: "23456789",
    imoveis: [
      { id: "103", referencia: "IMV-003", titulo: "Loja Centro Porto", tipo: "Comercial", localizacao: "Porto", valor: 320000, status: "disponivel" },
    ],
  },
  {
    id: "3", nome: "António Pereira", email: "antonio@email.com", telefone: "+351 933 333 333", documento: "34567890",
    imoveis: [
      { id: "104", referencia: "IMV-004", titulo: "Apartamento T2 Alfama", tipo: "Apartamento", localizacao: "Alfama, Lisboa", valor: 390000, status: "vendido" },
      { id: "105", referencia: "IMV-005", titulo: "Terreno Ericeira", tipo: "Terreno", localizacao: "Ericeira, Mafra", valor: 150000, status: "disponivel" },
      { id: "106", referencia: "IMV-006", titulo: "Apartamento T1 Expo", tipo: "Apartamento", localizacao: "Parque das Nações, Lisboa", valor: 280000, status: "em_avaliacao" },
    ],
  },
  {
    id: "4", nome: "Luísa Martins", email: "luisa@email.com", telefone: "+351 944 444 444", documento: "45678901",
    imoveis: [
      { id: "107", referencia: "IMV-007", titulo: "Moradia T3 Oeiras", tipo: "Moradia", localizacao: "Oeiras, Lisboa", valor: 520000, status: "disponivel" },
    ],
  },
  {
    id: "5", nome: "José Gomes", email: "jose@email.com", telefone: "+351 955 555 555", documento: "56789012",
    imoveis: [
      { id: "108", referencia: "IMV-008", titulo: "Apartamento T2 Faro", tipo: "Apartamento", localizacao: "Faro, Algarve", valor: 260000, status: "disponivel" },
      { id: "109", referencia: "IMV-009", titulo: "Moradia T5 Vilamoura", tipo: "Moradia", localizacao: "Vilamoura, Algarve", valor: 950000, status: "reservado" },
    ],
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  disponivel: { label: "Disponível", variant: "default" },
  reservado: { label: "Reservado", variant: "secondary" },
  vendido: { label: "Vendido", variant: "outline" },
  em_avaliacao: { label: "Em avaliação", variant: "secondary" },
};

export default function Proprietarios() {
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const filtered = proprietarios.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gestão de proprietários e os seus imóveis</p>
        </div>
        <Button>+ Novo Proprietário</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar proprietários..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

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
              {filtered.map((p) => {
                const isExpanded = expandedIds.has(p.id);
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
                      <TableCell className="font-medium">{p.nome}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.telefone}</TableCell>
                      <TableCell>{p.documento}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{p.imoveis.length}</Badge>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow key={`${p.id}-imoveis`}>
                        <TableCell colSpan={6} className="p-0 bg-muted/30">
                          <div className="p-4 space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                              Imóveis de {p.nome}
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {p.imoveis.map((imv) => {
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
    </div>
  );
}
