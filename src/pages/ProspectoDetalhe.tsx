import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Phone, PhoneOff, Mail, MessageSquare, Globe,
  UserPlus, CalendarDays, AlertTriangle, Eye,
} from "lucide-react";
import { LoadingState, ErrorState } from "@/components/StateViews";
import { leadsApi } from "@/api/leads";
import { USE_MOCKS, mockLeads, stageLabels } from "@/data/mocks";
import type { Lead, LeadStatus } from "@/types/api";
import { toast } from "sonner";

const stages: LeadStatus[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];

export default function ProspectoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", origem: "", agente: "",
    status: "novo" as LeadStatus, imovel: "", valor: 0, notas: "",
    linguagem: "Português", email2: "", entidadeComercial: "",
    equipaVendas: "", paginaWeb: "", idAnuncio: "",
    dataTelefonema: "", observacoes: "", descricaoAnuncio: "",
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        let data: Lead;
        if (USE_MOCKS) {
          const found = mockLeads.find((l) => String(l.id) === id);
          if (!found) throw new Error("Prospeto não encontrado.");
          data = found;
        } else {
          data = await leadsApi.get(Number(id));
        }
        setLead(data);
        setForm((f) => ({
          ...f,
          nome: data.nome, email: data.email, telefone: data.telefone,
          origem: data.origem, agente: data.agente, status: data.status,
          imovel: data.imovel, valor: data.valor, notas: data.notas,
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSave = async () => {
    if (!lead) return;
    setSaving(true);
    try {
      if (!USE_MOCKS) {
        await leadsApi.update(lead.id, {
          nome: form.nome, email: form.email, telefone: form.telefone,
          origem: form.origem, agente: form.agente, status: form.status,
          imovel: form.imovel, valor: form.valor, notas: form.notas,
        });
      }
      toast.success("Prospeto guardado com sucesso.");
    } catch {
      // error handled by api client
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error || !lead) return <ErrorState message={error ?? "Prospeto não encontrado."} onRetry={() => navigate("/prospectos")} />;

  const actionButtons = [
    { icon: Phone, label: "Telefonema Atendido", variant: "default" as const },
    { icon: PhoneOff, label: "Telefonema Não Atendido", variant: "outline" as const },
    { icon: AlertTriangle, label: "Descartar Prospeto", variant: "outline" as const },
    { icon: UserPlus, label: "Converter Prospeto", variant: "outline" as const },
    { icon: CalendarDays, label: "Agendar Visita", variant: "outline" as const },
    { icon: Globe, label: "Website", variant: "outline" as const },
    { icon: Mail, label: "Email", variant: "outline" as const },
    { icon: MessageSquare, label: "WhatsApp", variant: "outline" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/prospectos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Prospectos /</p>
            <h1 className="text-xl font-bold">{lead.origem}:{lead.id} - {lead.nome} ({lead.imovel})</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/prospectos")}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "A guardar..." : "Guardar"}</Button>
        </div>
      </div>

      {!lead.email && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Prospecto sem e-mail registado.</span>
        </div>
      )}

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">{lead.origem}:{lead.id} - {lead.nome} ({lead.imovel})</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary"><Eye className="h-3 w-3 mr-1" />0 Visitas</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {actionButtons.map((btn) => (
                <Button key={btn.label} variant={btn.variant} size="sm" className="justify-start text-xs">
                  <btn.icon className="h-3.5 w-3.5 mr-1.5" />{btn.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="geral">
        <TabsList>
          <TabsTrigger value="geral">Informação Geral</TabsTrigger>
          <TabsTrigger value="script">Script de Chamada</TabsTrigger>
          <TabsTrigger value="conversas">Conversações</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informação do Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Telemóvel</Label>
                <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Etapa</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as LeadStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {stages.map((s) => (
                      <SelectItem key={s} value={s}>{stageLabels[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <Input value={form.origem} onChange={(e) => setForm({ ...form, origem: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Agente</Label>
                <Input value={form.agente} onChange={(e) => setForm({ ...form, agente: e.target.value })} />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Imóvel e Valor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Imóvel</Label>
                <Input value={form.imovel} onChange={(e) => setForm({ ...form, imovel: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Valor (€)</Label>
                <Input type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })} />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Observações</h3>
            <Textarea
              rows={4}
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              placeholder="Notas sobre este prospeto..."
            />
          </div>
        </TabsContent>

        <TabsContent value="script" className="mt-6">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">Script de chamada não configurado.</p></CardContent></Card>
        </TabsContent>

        <TabsContent value="conversas" className="mt-6">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">Sem conversações registadas.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
