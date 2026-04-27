import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Pencil, X, MapPin, BedDouble, Maximize, Euro, User, Home } from "lucide-react";
import { USE_MOCKS, mockProperties } from "@/data/mocks";
import { propertiesApi } from "@/api/properties";
import type { Property, PropertyCreate } from "@/types/api";
import { toast } from "sonner";

const statusLabels: Record<string, string> = { disponivel: "Disponível", reservado: "Reservado", vendido: "Vendido" };
const statusVariants: Record<string, "default" | "secondary" | "destructive"> = { disponivel: "default", reservado: "secondary", vendido: "destructive" };

export default function ImovelDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [property, setProperty] = useState<Property | null>(() => {
    if (USE_MOCKS) return mockProperties.find((p) => p.id === Number(id)) ?? null;
    return null;
  });

  const [form, setForm] = useState<Partial<PropertyCreate>>({});

  useState(() => {
    if (!USE_MOCKS && id) {
      setLoading(true);
      propertiesApi.get(Number(id)).then((data) => {
        setProperty(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/imoveis")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <p className="text-muted-foreground">Imóvel não encontrado.</p>
      </div>
    );
  }

  const startEditing = () => {
    setForm({
      titulo: property.titulo,
      endereco: property.endereco,
      tipo: property.tipo,
      valor: property.valor,
      status: property.status,
      proprietario: property.proprietario,
      agente: property.agente,
      quartos: property.quartos,
      area: property.area,
      descricao: property.descricao,
    });
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!USE_MOCKS) {
        const updated = await propertiesApi.update(property.id, form);
        setProperty(updated);
      } else {
        setProperty({ ...property, ...form } as Property);
      }
      setEditing(false);
      toast.success("Imóvel atualizado com sucesso.");
    } catch {
      toast.error("Erro ao atualizar imóvel.");
    }
  };

  const updateField = (key: keyof PropertyCreate, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/imoveis")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{property.titulo}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusVariants[property.status]}>
                {statusLabels[property.status]}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {property.endereco}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                <X className="h-4 w-4 mr-2" /> Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Guardar
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={startEditing}>
                <Pencil className="h-4 w-4 mr-2" /> Edição rápida
              </Button>
              <Button onClick={() => navigate(`/imoveis/${property.id}/editar`)}>
                <Pencil className="h-4 w-4 mr-2" /> Editar completo
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Hero image placeholder */}
      <div className="h-48 bg-secondary rounded-lg flex items-center justify-center">
        <Home className="h-12 w-12 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalhes do Imóvel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  {editing ? (
                    <Input value={form.titulo ?? ""} onChange={(e) => updateField("titulo", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{property.titulo}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  {editing ? (
                    <Select value={form.tipo} onValueChange={(v) => updateField("tipo", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                        <SelectItem value="Moradia">Moradia</SelectItem>
                        <SelectItem value="Terreno">Terreno</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{property.tipo}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Endereço</Label>
                {editing ? (
                  <Input value={form.endereco ?? ""} onChange={(e) => updateField("endereco", e.target.value)} />
                ) : (
                  <p className="text-sm font-medium">{property.endereco}</p>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Euro className="h-4 w-4" /> Valor (€)</Label>
                  {editing ? (
                    <Input type="number" value={form.valor ?? 0} onChange={(e) => updateField("valor", Number(e.target.value))} />
                  ) : (
                    <p className="text-lg font-bold text-primary">€{property.valor.toLocaleString("pt-PT")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><BedDouble className="h-4 w-4" /> Quartos</Label>
                  {editing ? (
                    <Input type="number" value={form.quartos ?? 0} onChange={(e) => updateField("quartos", Number(e.target.value))} />
                  ) : (
                    <p className="text-sm font-medium">{property.quartos}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Maximize className="h-4 w-4" /> Área (m²)</Label>
                  {editing ? (
                    <Input type="number" value={form.area ?? 0} onChange={(e) => updateField("area", Number(e.target.value))} />
                  ) : (
                    <p className="text-sm font-medium">{property.area} m²</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  {editing ? (
                    <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponivel">Disponível</SelectItem>
                        <SelectItem value="reservado">Reservado</SelectItem>
                        <SelectItem value="vendido">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={statusVariants[property.status]}>{statusLabels[property.status]}</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><User className="h-4 w-4" /> Proprietário</Label>
                  {editing ? (
                    <Input value={form.proprietario ?? ""} onChange={(e) => updateField("proprietario", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{property.proprietario}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                {editing ? (
                  <Textarea rows={4} value={form.descricao ?? ""} onChange={(e) => updateField("descricao", e.target.value)} />
                ) : (
                  <p className="text-sm text-muted-foreground">{property.descricao || "Sem descrição."}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">#{property.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor</span>
                <span className="font-bold text-primary">€{property.valor.toLocaleString("pt-PT")}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quartos</span>
                <span className="font-medium">{property.quartos}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Área</span>
                <span className="font-medium">{property.area} m²</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Agente</span>
                <span className="font-medium">{property.agente}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Criado em</span>
                <span className="font-medium">{new Date(property.created_at).toLocaleDateString("pt-PT")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
