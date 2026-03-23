import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, BedDouble, Maximize } from "lucide-react";
import { mockImoveis } from "@/data/mockData";

const statusLabels: Record<string, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
  disponivel: "default",
  reservado: "secondary",
  vendido: "destructive",
};

export default function Imoveis() {
  const [search, setSearch] = useState("");
  const filtered = mockImoveis.filter((i) =>
    i.titulo.toLowerCase().includes(search.toLowerCase()) ||
    i.endereco.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Imóveis</h1>
          <p className="text-muted-foreground">Gestão de propriedades</p>
        </div>
        <Button>+ Adicionar Imóvel</Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar imóveis..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="disponivel">Disponível</SelectItem>
            <SelectItem value="reservado">Reservado</SelectItem>
            <SelectItem value="vendido">Vendido</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="moradia">Moradia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((imovel) => (
          <Card key={imovel.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
    </div>
  );
}
