import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { leadsApi } from "@/api/leads";
import { USE_MOCKS } from "@/data/mocks";
import { toast } from "sonner";
import type { LeadStatus } from "@/types/api";

export default function LeadNovo() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", origem: "",
    agente: "", status: "novo" as LeadStatus,
    imovel: "", valor: 0, notas: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      toast.error("Nome e email são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      if (!USE_MOCKS) {
        await leadsApi.create(form);
      }
      toast.success("Prospeto criado com sucesso.");
      navigate("/prospectos");
    } catch {
      // handled by api client
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/prospectos")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Novo Prospeto</h1>
          <p className="text-muted-foreground">Criar um novo lead</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome *</Label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Telemóvel</Label>
                <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <Input value={form.origem} onChange={(e) => setForm({ ...form, origem: e.target.value })} placeholder="Website, Referência..." />
              </div>
              <div className="space-y-2">
                <Label>Agente</Label>
                <Input value={form.agente} onChange={(e) => setForm({ ...form, agente: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Etapa</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as LeadStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="contacto">Em Contacto</SelectItem>
                    <SelectItem value="visita">Visita Agendada</SelectItem>
                    <SelectItem value="negociacao">Negociação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Imóvel</Label>
                <Input value={form.imovel} onChange={(e) => setForm({ ...form, imovel: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Valor (€)</Label>
                <Input type="number" value={form.valor || ""} onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notas</Label>
              <Textarea value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} rows={3} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/prospectos")}>Cancelar</Button>
              <Button type="submit" disabled={saving}>{saving ? "A criar..." : "Criar Prospeto"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
