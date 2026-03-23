import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";

const compradores = [
  { id: "1", nome: "Ana Silva", email: "ana@email.com", telefone: "+351 912 345 678", orcamento: 500000, interesse: "T3 Cascais", status: "ativo" },
  { id: "2", nome: "Pedro Santos", email: "pedro@email.com", telefone: "+351 923 456 789", orcamento: 350000, interesse: "T2 Lisboa", status: "ativo" },
  { id: "3", nome: "Carla Mendes", email: "carla@email.com", telefone: "+351 934 567 890", orcamento: 600000, interesse: "Moradia Sintra", status: "ativo" },
  { id: "4", nome: "Sofia Rodrigues", email: "sofia@email.com", telefone: "+351 956 789 012", orcamento: 300000, interesse: "T1 Alfama", status: "concluido" },
  { id: "5", nome: "Miguel Costa", email: "miguel@email.com", telefone: "+351 967 890 123", orcamento: 250000, interesse: "T2 Amadora", status: "inativo" },
];

export default function Compradores() {
  const [search, setSearch] = useState("");
  const filtered = compradores.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compradores</h1>
          <p className="text-muted-foreground">Gestão de potenciais compradores</p>
        </div>
        <Button>+ Novo Comprador</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar compradores..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Interesse</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer hover:bg-secondary/50">
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.telefone}</TableCell>
                  <TableCell>€{c.orcamento.toLocaleString("pt-PT")}</TableCell>
                  <TableCell>{c.interesse}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "ativo" ? "default" : "secondary"}>
                      {c.status === "ativo" ? "Ativo" : c.status === "concluido" ? "Concluído" : "Inativo"}
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
