import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Phone, Mail, UserCheck } from "lucide-react";
import { useState } from "react";

const proprietarios = [
  { id: "1", nome: "Manuel Sousa", email: "manuel@email.com", telefone: "+351 911 111 111", documento: "12345678", imoveis: 2 },
  { id: "2", nome: "Fernanda Lima", email: "fernanda@email.com", telefone: "+351 922 222 222", documento: "23456789", imoveis: 1 },
  { id: "3", nome: "António Pereira", email: "antonio@email.com", telefone: "+351 933 333 333", documento: "34567890", imoveis: 3 },
  { id: "4", nome: "Luísa Martins", email: "luisa@email.com", telefone: "+351 944 444 444", documento: "45678901", imoveis: 1 },
  { id: "5", nome: "José Gomes", email: "jose@email.com", telefone: "+351 955 555 555", documento: "56789012", imoveis: 2 },
];

export default function Proprietarios() {
  const [search, setSearch] = useState("");
  const filtered = proprietarios.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gestão de proprietários de imóveis</p>
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
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Imóveis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-secondary/50">
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.telefone}</TableCell>
                  <TableCell>{p.documento}</TableCell>
                  <TableCell>{p.imoveis}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
