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
import { ArrowLeft, Save, User, Mail, Phone, FileText, MapPin, Pencil, X } from "lucide-react";
import { USE_MOCKS, mockClients } from "@/data/mocks";
import { clientsApi } from "@/api/clients";
import type { Client, ClientCreate } from "@/types/api";
import { toast } from "sonner";

export default function ClienteDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load client data
  const [client, setClient] = useState<Client | null>(() => {
    if (USE_MOCKS) {
      return mockClients.find((c) => c.id === Number(id)) ?? null;
    }
    return null;
  });

  const [form, setForm] = useState<Partial<ClientCreate>>({});

  // Fetch from API if not using mocks
  useState(() => {
    if (!USE_MOCKS && id) {
      setLoading(true);
      clientsApi.get(Number(id)).then((data) => {
        setClient(data);
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

  if (!client) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/clientes")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <p className="text-muted-foreground">Cliente não encontrado.</p>
      </div>
    );
  }

  const startEditing = () => {
    setForm({
      nome: client.nome,
      email: client.email,
      telefone: client.telefone,
      documento: client.documento,
      tipo: client.tipo,
      endereco: client.endereco ?? "",
      notas: client.notas ?? "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!USE_MOCKS) {
        const updated = await clientsApi.update(client.id, form);
        setClient(updated);
      } else {
        setClient({ ...client, ...form } as Client);
      }
      setEditing(false);
      toast.success("Cliente atualizado com sucesso.");
    } catch {
      toast.error("Erro ao atualizar cliente.");
    }
  };

  const updateField = (key: keyof ClientCreate, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/clientes")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{client.nome}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={client.tipo === "comprador" ? "default" : "secondary"}>
                {client.tipo === "comprador" ? "Comprador" : "Proprietário"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Registado em {new Date(client.created_at).toLocaleDateString("pt-PT")}
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
            <Button onClick={startEditing}>
              <Pencil className="h-4 w-4 mr-2" /> Editar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><User className="h-4 w-4" /> Nome</Label>
                  {editing ? (
                    <Input value={form.nome ?? ""} onChange={(e) => updateField("nome", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{client.nome}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Mail className="h-4 w-4" /> E-mail</Label>
                  {editing ? (
                    <Input type="email" value={form.email ?? ""} onChange={(e) => updateField("email", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{client.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="h-4 w-4" /> Telefone</Label>
                  {editing ? (
                    <Input value={form.telefone ?? ""} onChange={(e) => updateField("telefone", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{client.telefone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><FileText className="h-4 w-4" /> Documento</Label>
                  {editing ? (
                    <Input value={form.documento ?? ""} onChange={(e) => updateField("documento", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{client.documento}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  {editing ? (
                    <Select value={form.tipo} onValueChange={(v) => updateField("tipo", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprador">Comprador</SelectItem>
                        <SelectItem value="proprietario">Proprietário</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{client.tipo === "comprador" ? "Comprador" : "Proprietário"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Endereço</Label>
                  {editing ? (
                    <Input value={form.endereco ?? ""} onChange={(e) => updateField("endereco", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{client.endereco || "—"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                {editing ? (
                  <Textarea rows={4} value={form.notas ?? ""} onChange={(e) => updateField("notas", e.target.value)} />
                ) : (
                  <p className="text-sm text-muted-foreground">{client.notas || "Sem observações."}</p>
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
                <span className="font-medium">#{client.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tipo</span>
                <Badge variant={client.tipo === "comprador" ? "default" : "secondary"}>
                  {client.tipo === "comprador" ? "Comprador" : "Proprietário"}
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Criado em</span>
                <span className="font-medium">{new Date(client.created_at).toLocaleDateString("pt-PT")}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Atualizado em</span>
                <span className="font-medium">{new Date(client.updated_at).toLocaleDateString("pt-PT")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`mailto:${client.email}`)}>
                <Mail className="h-4 w-4 mr-2" /> Enviar E-mail
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`tel:${client.telefone}`)}>
                <Phone className="h-4 w-4 mr-2" /> Ligar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
